import Vue from 'vue'
import X from '../src/index.js'
import App from './app'

Vue.use(X)

new Vue({
   ...App
}).$mount('#app')
