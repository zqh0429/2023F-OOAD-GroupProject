import Vue from 'vue'
import Login from './login.vue'
import router from "group_project/router.js";


new Vue({
    render: h => h(Login),
    router,
}).mount('#LoginPanel')