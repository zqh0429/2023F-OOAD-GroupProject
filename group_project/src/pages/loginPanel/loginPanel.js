import { createApp } from 'vue'
import Login from './loginPanel.vue'
import router from '../../../router.js'


createApp(Login).use(router).mount('#loginPanel')
