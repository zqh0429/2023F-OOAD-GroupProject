import { createApp } from 'vue'
import Main from './main.vue'
import router from '../../../router.js'

createApp(Main).use(router).mount('#mainPanel')
