module.exports = {
    base:'/vueXin/',
    title: 'Xin',
    head: [
        ['link', { rel: 'shortcut icon', type: "image/x-icon", href: "/xin.jpeg" }]
    ],

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
