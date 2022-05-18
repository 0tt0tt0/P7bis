import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import axios from 'axios';
//Vue.prototype.$http = axios;
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue'


createApp(App).use(store).use(router).use(router).use(BootstrapIconsPlugin).mount('#app')


