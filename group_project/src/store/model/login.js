import loginService from "@/service/loginService";

const state = () => ({
    form: {
        username: null,
        password: null,
        // "emailAddress": null,
        // "verifyCode": null
    },
    user:"",
    accountValid: false,
    errorMsg: null
})

const actions = {
    loginCheck(context) {
        loginService.loginCheck(context.state.form, resp => {
            if (resp.data.code === 0) {
                context.commit("changeAccountStatus", true)
                context.commit("getUser", resp.data.data)
                //返回数据状态码为0，表示插入成功，使用changeAccountStatus
            }
        })
    },
}
const mutations = {
    changeAccountStatus(state, status) {
        state.accountValid = status
    },
    getUser(state,data) {
        state.user = data
        console.log(state.user)
    }
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}