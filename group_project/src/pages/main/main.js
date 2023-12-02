import { createApp } from 'vue'
import Main from './main.vue'
import router from '../../../router.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Vuex from "vuex";
import store from '@/store'
import '../../mock/index.js'

createApp(Main).use(router).use(ElementPlus).use(Vuex).use(store).mount('#mainPanel')
