import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import toast from 'components/common/toast/index.js'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(toast)
Vue.use(VueLazyLoad,{
})
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
