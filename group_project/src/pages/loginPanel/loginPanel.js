import { createApp } from 'vue';
import Login from './loginPanel.vue';
import router from '../../../router.js';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import Vuex from 'vuex';
import store from '@/store';

const app = createApp(Login);

app.use(router)
    .use(ElementPlus)
    .use(Vuex)
    .use(store);

app.mount('#loginPanel');
