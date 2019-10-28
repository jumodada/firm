import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router)
const router = new Router({
    routes,
    mode: 'history'
})


router.beforeEach((to, from, next) => {
   // todo startLoadingBar
})

router.afterEach(to => {
    //todo endLoadingBar
    window.scrollTo(0, 0)
})

export default router
