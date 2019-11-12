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
                path:`start`,
                name:'快速开始',
                component: () => import('../view/components/start')
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
