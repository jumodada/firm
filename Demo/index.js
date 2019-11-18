import Vue from 'vue'
import X from '../src/index.js'
import App from './app'
import router from './router'
import demoCard from './components/demo-card'

Vue.use(X)
Vue.component(demoCard.name, demoCard)

new Vue({
   ...App,
   router
}).$mount('#app')
