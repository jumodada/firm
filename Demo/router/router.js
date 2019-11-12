import Main from '../components/main/main.vue'
import Component from '../components/component'


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
        component: Component,
        meta: {
            notCache: true
        },
        children: [
            {
                path: '/install',
                name: 'index.vue',
                meta: {
                    name: '安装',
                    type: 'compass'
                },
                component: () => import('../view/components/install')
            },
            {
                path: '/start',
                name: 'start',
                meta: {
                    name: '快速开始',
                    type: 'compass'
                },
                component: () => import('../view/components/start')
            },
            {
                path: '/button',
                name: 'button',
                meta: {
                    name: '按钮',
                    type: 'component'
                },
                component: () => import('../view/components/Button')
            },
            {
                path: '/Layout',
                name: 'Layout',
                meta: {
                    name: '布局',
                    type: 'component'
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
