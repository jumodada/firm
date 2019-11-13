const hljs = require('highlight.js')

// markdown-it 插件
const emoji = require('markdown-it-emoji')
const anchor = require('markdown-it-anchor')


const md = require('markdown-it')({
    html: true,
    highlight(str, lang){
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>'
            } catch (__) {}
        }

        return '<pre v-pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    }
})
    .use(emoji)
    // 使用 anchor 插件为标题元素添加锚点
    .use(anchor, {
        permalink: true,
        permalinkBefore: true,
        permalinkSymbol: '#'
    })


module.exports = function (src) {
    // const isProd = process.env.NODE_ENV === 'production'
    //
    // const file = this.resourcePath

    const html = md.render(src)

    const res = (
        `<template>\n` +
        `<div class="content">${html}</div>\n` +
        `</template>\n`
    )
    return res
}
