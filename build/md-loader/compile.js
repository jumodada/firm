const { compileTemplate } = require('@vue/component-compiler-utils');
const compiler = require('vue-template-compiler')


function generateRender(template, script) {
    const finalOptions = {
        source: `<div>${template}</div>`,
        filename: 'content-component',
        compiler
    }
    const compiled = compileTemplate(finalOptions)
    let demoComponentContent = `${compiled.code}`
    script = script.trim()
    script = script ? script.replace(/export\s+default/, 'const scriptExport =') : 'const scriptExport = {}'
    demoComponentContent = `(function() {
    ${demoComponentContent}
    ${script}
    return {
      render,
      staticRenderFns,
      ...scriptExport
    }
  })()`
    return demoComponentContent
}
