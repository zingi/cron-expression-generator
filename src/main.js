import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRecognizer from 'vue-recognizer'
import VuePressure from 'vue-pressure'
import Clipboard from 'v-clipboard'
import Toasted from 'vue-toasted'
import VueAnime from 'vue-animejs'

Vue.use(VueRecognizer)
Vue.use(VuePressure)
Vue.use(Clipboard)
Vue.use(Toasted, { position: 'top-center', duration: 5000, singleton: true })
Vue.use(VueAnime)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
