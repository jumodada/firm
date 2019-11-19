import Vue from 'vue'
import X from '../src/index.js'
import App from './app'
import router from './router'
import demoCard from './components/demo-card'
import highlightJs from 'highlight.js'
import './assets/styles/hightlight.scss'

Vue.use(X)
Vue.component(demoCard.name, demoCard)


router.afterEach(route => {
   Vue.nextTick(() => document.querySelectorAll('pre code').forEach(block=>highlightJs.highlightBlock(block)))
})

new Vue({
   ...App,
   router
}).$mount('#app')
