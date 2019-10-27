import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'view-design'
import { setToken, getToken, canTurnTo } from '@/libs/util'
import config from '@/config'
const { homeName } = config

Vue.use(Router)
const router = new Router({
    routes,
    mode: 'hash'
})


router.beforeEach((to, from, next) => {
   // todo startLoadingBar
})

router.afterEach(to => {
    iView.LoadingBar.finish()
    window.scrollTo(0, 0)
})

export default router
