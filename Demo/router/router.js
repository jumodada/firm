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
                    type: 'button'
                },
                component: () => import('../view/components/Button')
            },
            {
                path: '/components/Layout',
                name: 'Layout',
                meta: {
                    name: '布局',
                    type: 'button'
                },
                component: () => import('../view/components/Layout')
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
