const hljs = require('highlight.js')
const md = require('markdown-it')({
    html: true,
    highlight(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>'
            } catch (__) {
            }
        }

        return '<pre v-pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    }
})
   // todo md添加highlight配置 尚未成功


module.exports = (mdSource) => {
    const html = md.render(mdSource)
    console.log(html)
    return `<template>
        <div class="firm-main-content">${html}</div>
        </template>`
}
