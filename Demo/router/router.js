import Main from '@/components/main'


export default [
    {
        path: '/',
        name: '_home',
        redirect: '/home',
        component: Main,
        meta: {
            notCache: true
        },
        children: []
    },

    {
        path: '/500',
        name: 'error_500',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/view/error-page/500.vue')
    },
    {
        path: '*',
        name: 'error_404',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/view/error-page/404.vue')
    }
]
