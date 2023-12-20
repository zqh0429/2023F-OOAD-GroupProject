import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/loginPanel/loginPanel.vue';
import Main from './pages/main/main.vue';
import Forum from './pages/forum/forum.vue';
import User from './pages/user/user.vue';
import Chat from './pages/chat/chat.vue';
import Tmain from './pages/Tmain/Tmain.vue';
import Tstudent from './pages/Tstudent/Tstudent.vue'; 
import Tselect from './pages/Tselect/Tselect.vue'; 
import store from "@/store";

const routes = [
    {
        path: '/',
        alias: '/loginPanel',
        component: Login
    },
    {
        path: '/main',
        name: 'Main',
        component: Main,
        meta: { requiresAuth: true },
    },
    {
        path: '/forum',
        name: 'Forum',
        component: Forum,
        meta: { requiresAuth: true },
    },
    {
        path: '/user',
        name: 'User',
        component: User,
        meta: { requiresAuth: true },
    },
    {
        path: '/chat',
        name: 'Chat',
        component: Chat,
        meta: { requiresAuth: true },
    },
    {
        path: '/Tmain',
        name: 'Tmain',
        component: Tmain,
        meta: { requiresAuth: true },
    },
    {
        path: '/Tstudent',
        name: 'Tstudent',
        component: Tstudent,
        meta: { requiresAuth: true },
    },
    {
        path: '/Tselect',
        name: 'Tselect',
        component: Tselect,
        meta: { requiresAuth: true },
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 判断路由是否需要身份验证
        if (!store.state.login.accountValid) {
            // 如果未登录，重定向到登录界面
            next('/loginPanel');
        } else {
            next(); // 已登录，继续导航
        }
    } else {
        next(); // 不需要身份验证的路由直接导航
    }
});
