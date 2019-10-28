import Vue from 'vue'
import X from '../src/index.js'
import App from './app'
import router from './router'

Vue.use(X)

new Vue({
   ...App,
   router
}).$mount('#app')
