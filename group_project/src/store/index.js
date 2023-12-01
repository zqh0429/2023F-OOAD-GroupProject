import { createStore } from 'vuex';
import login from "./model/login.js";
import main from "./model/main.js";
import forum from "./model/forum.js";


export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        login,
        main,
        forum
    },
    strict: false,
});
