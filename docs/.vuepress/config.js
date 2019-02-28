module.exports = {
    base:'/My-Vue-Wheel/',
    title: 'Xin',
    description: '灵活易用的组件库',
    themeConfig: {
      //  sidebar:'auto',
        sidebar: [
            '/install/',
            {
                title:'组件',
                children:[ '/components/button/',
                    '/components/icon/',
                    '/components/input/'

                ]

            },

        ]
    }
}
