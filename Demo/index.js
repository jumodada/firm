import Vue from 'vue'
import X from '../src/index.js'
import App from './app'
import VueRouter from 'vue-router'
import routes from './router'

Vue.use(X)
Vue.use(VueRouter)


const router = new VueRouter({
   mode: 'hash',
   base: __dirname,
   routes
});

new Vue({
   ...App,
   router
}).$mount('#app')
