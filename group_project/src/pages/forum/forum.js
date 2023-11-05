import { createApp } from 'vue'
import Login from './forum.vue'
import router from '../../../router.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ElIcon } from 'element-plus';


createApp(Login).use(router).use(ElementPlus).use(ElIcon).mount('#forum')