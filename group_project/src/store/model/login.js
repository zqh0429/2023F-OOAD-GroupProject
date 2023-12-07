import loginService from "@/service/loginService";

const state = () => ({
    form: {
        accountNum: null,
        password: null,
        // "emailAddress": null,
        // "verifyCode": null
    },
    // user:"",
    accountValid: false,
    errorMsg: null
})

const actions = {
    loginCheck(context) {
        loginService.loginCheck(context.state.form, resp => {
            if (resp.data.code === 0) {
                context.commit("changeAccountStatus", true)
                console.log(context.state.form)
                // context.commit("getUser", resp.data.data)
            }
        })
    },
}
const mutations = {
    changeAccountStatus(state, status) {
        state.accountValid = status
    },
    // getUser(state,data) {
    //     state.user = data
    //     console.log(state.user)
    // }
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}