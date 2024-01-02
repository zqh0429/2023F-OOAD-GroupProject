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
//     loginCheck(context) {
//         loginService.loginCheck(context.state.form, resp => {
//             if (resp.data.code === 0) {
//                 context.commit("changeAccountStatus", true)
//                 console.log(context.state.form)
//                 // context.commit("getUser", resp.data.data)
//             }
//         })
//     }
    loginCheck(context, callback) {
        loginService.loginCheck(context.state.form, resp => {
          if (resp.data.code === 0) {
            context.commit("changeAccountStatus", true)
            console.log(context.state.form)
            callback() // 异步操作成功，调用回调函数
          } else {
            callback(new Error('Login check failed')) // 异步操作失败，调用回调函数并传入错误信息
          }
        })
      },
      reset(context){
        context.commit("reset")
      }
}
const mutations = {
    changeAccountStatus(state, status) {
        state.accountValid = status
        console.log(state.accountValid)
    },
    reset(state){
      state.accountValid=false
      state.form.accountNum=""
      state.form.password=""
    }
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}