import { createApp } from 'vue'
import Main from './main.vue'
import router from '../../../router.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(Main).use(router).use(ElementPlus).mount('#mainPanel')
