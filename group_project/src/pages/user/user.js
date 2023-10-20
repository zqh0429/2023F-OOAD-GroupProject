import { createApp } from 'vue'
import User from './user.vue'
import router from '../../../router.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ElIcon } from 'element-plus';


createApp(User).use(router).use(ElementPlus).use(ElIcon).mount('#userPanel')