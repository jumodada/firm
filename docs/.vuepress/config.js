module.exports = {
    base:'/vueXin/',
    title: 'Xin',
    head: [
        ['link', { rel: 'shortcut icon', type: "image/x-icon", href: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555351283409&di=53e6b2a5772c596541e435918c4c7029&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F3fbff47c0e762c2f5033f16c61a0ced3c2bfb386.jpg" }]
    ],
    resolve: {
        alias: {
            '@alias': 'path/to/some/dir'
        }
    },
    description: '灵活易用的组件库',
    themeConfig: {
      //  sidebar:'auto',
        sidebar: [
            '/install/',
            {
                title:'组件',
                children:[ '/components/button/',
                    '/components/input/',
                    '/components/grid/',
                    '/components/toast/',
                    '/components/popover/',
                    '/components/collapse/',
                    '/components/cascader/',
                    '/components/carousel/',
                    '/components/tabs/',
                    '/components/menu/',
                    '/components/pagination/',
                    '/components/table/',
                ]
            },
        ]
    }
}
