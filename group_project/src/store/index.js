import { createStore } from 'vuex';
import login from "./model/login.js";
import main from "./model/main.js";

export default createStore({
    modules: {
        login,
        main
    },
    strict: false,
});
