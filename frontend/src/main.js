import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'

Vue.prototype.$http = Axios;
Vue.config.productionTip = false

new Vue({
  router,
  data: {
    test_data: "Bhathiya"
  },
  render: h => h(App)
}).$mount('#app')
