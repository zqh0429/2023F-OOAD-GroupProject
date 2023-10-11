import { createRouter, createWebHistory } from 'vue-router';
import Login from './src/pages/loginPanel/loginPanel.vue';
import Main from './src/pages/main/main.vue';

const routes = [
    {
        path: '/',
        redirect: '/loginPanel', // 重定向到登录页面
    },
    {
        path: '/loginPanel',
        name: 'Login',
        component: Login,
    },
    {
        path: '/main',
        name: 'Main',
        component: Main,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    base: '/',
});

export default router;
