import BootstrapVue from 'bootstrap-vue'
import Vue from 'vue'
import axios from 'axios'
import router from './router'
import App from './App.vue'

Vue.prototype.$axios = axios
Vue.use(BootstrapVue)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
