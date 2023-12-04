import { createApp } from 'vue'
import Chat from './chat.vue'
import router from '../../../router.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ElIcon } from 'element-plus';
import Vuex from "vuex";
import store from "@/store";
import '../../mock/index.js'

createApp(Chat).use(router).use(ElementPlus).use(ElIcon).use(Vuex).use(store).mount('#chatPanel')


