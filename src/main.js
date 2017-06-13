import Vue from 'vue'
import App from './App.vue'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

new Vue({
  el: '#app',
  render: h => h(App)
})
