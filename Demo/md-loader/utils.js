const { compileTemplate } = require('@vue/component-compiler-utils');
const compiler = require('vue-template-compiler')

function stripScript(content) {
    const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
    return result && result[2] ? result[2].trim() : '';
}

function stripStyle(content) {
    const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
    return result && result[2] ? result[2].trim() : '';
}

function stripTemplate(content) {
    content = content.trim();
    if (!content) {
        return content;
    }
    return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim();
}

function pad(source) {
    return source
        .split(/\r?\n/)
        .map(line => `  ${line}`)
        .join('\n');
}

function genInlineComponentText(template, script) {
    const options = {
        source: `<div>${template}</div>`,
        filename: 'content',
        compiler
    }
    const compiled = compileTemplate(options)
    let demoComponentContent = `${compiled.code}`;
    script = script.trim()
    if (script) {
        script = script.replace(/export\s+default/, 'const componentExport =');
    } else {
        script = 'const componentExport = {}';
    }
    demoComponentContent = `(function() {
    ${demoComponentContent}
    ${script}
    return {
      render,
      staticRenderFns,
      ...componentExport
    }
  })()`
    return demoComponentContent;
}

module.exports = {
    stripScript,
    stripStyle,
    stripTemplate,
    genInlineComponentText
};
