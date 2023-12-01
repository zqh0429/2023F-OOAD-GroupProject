import loginService from "@/service/loginService";

const state = () => ({
    purchaseColumns: ["date", "description", "money", "type", "username"],

    rowData: null,

    idToRecord: {},

    form: {
        "username": null,
        "password": null,
        // "emailAddress": null,
        // "verifyCode": null
    },
    accountValid: false,
    errorMsg: null
})

const actions = {
    loginCheck(context) {
        loginService.loginCheck(context.state.form, resp => {
            if (resp.data.code === 0) {
                context.commit("changeAccountStatus", true)
                //返回数据状态码为0，表示插入成功，使用changeAccountStatus
            }
        })
    },



}
const mutations = {
    changeAccountStatus(state, status) {
        state.accountValid = status
    }
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}