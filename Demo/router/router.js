import Main from '../components/main/main.vue'
import Content from '../components/content'


export default [
    {
        path: '/',
        name: 'home',
        component: Main,
        meta: {
            notCache: true
        },
        children: []
    },

    {
        path: '/components',
        name: 'components',
        component: Content,
        redirect:'/components/install',
        children: [
            {
                path: '/components/install',
                name: 'install',
                meta: {
                    name: '安装',
                    type: 'compass'
                },
                component: () => import('../view/components/install/index.md')
            },
            {
                path: '/components/start',
                name: 'start',
                meta: {
                    name: '快速开始',
                    type: 'compass'
                },
                component: () => import('../view/components/start')
            },
            {
                path: '/components/Button',
                name: 'button',
                meta: {
                    name: '按钮',
                    type: 'component'
                },
                component: () => import('../view/components/Button/index.md')
            },
            {
                path: '/components/Layout',
                name: 'Layout',
                meta: {
                    name: '布局',
                    type: 'component'
                },
                component: () => import('../view/components/Layout/index.md')
            },
            {
                path: '/components/Table',
                name: 'Table',
                meta: {
                    name: '表格',
                    type: 'component'
                },
                component: () => import('../view/components/Table/index.md')
            }
        ]
    },
    {
        path: '/500',
        name: 'error_500',
        meta: {
            hideInMenu: true
        },
        component: () => import('../view/error-page/500.vue')
    },
    {
        path: '*',
        name: 'error_404',
        meta: {
            hideInMenu: true
        },
        component: () => import('../view/error-page/404.vue')
    }
]
