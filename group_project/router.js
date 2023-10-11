import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './src/module/login/login.vue';
import Main from './src/module/main/App.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Login },
    { path: '/about', component: Main },
];

const router = new VueRouter({
    routes,
});

export default router;
