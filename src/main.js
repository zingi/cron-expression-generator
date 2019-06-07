import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRecognizer from 'vue-recognizer'
import VuePressure from 'vue-pressure'

Vue.use(VueRecognizer)
Vue.use(VuePressure)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
