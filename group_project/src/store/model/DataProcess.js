import dataService from "@/service/dataService";

const state = () => ({

    accountNum: '12345678', //账号
    password : "",          //密码

    userInfo : {          //主页个人信息
    username : "",
    studentID: '',
    level: "",
    circleUrl: '',
    restTime: "",
    hometown: "",
    description: ""},


    msgOverviewData:[],
    msgID: "",
    msgInfo: {},

    roomData:[],      //收藏房间信息

    roommateData:[]  //组队队友信息



})

const actions = {


    getUserInfo(context){   //初始化个人信息
        dataService.askUserInfo(context.state.accountNum, resp => {

                context.commit("setUserInfo", resp.data.data)
            
        })
    },

    saveUserInfo(context){
        dataService.updateUserInfo(context.state.accountNum,context.state.userInfo, resp => {
            console.log(resp.message)
    })
    },

    getRoomData(context){
        dataService.askRoomData(context.state.accountNum, resp => {
            context.commit("setRoomData", resp.data.data)
    })
    },

    getRoommateData(context){
        dataService.askRoommateData(context.state.accountNum, resp => {
            context.commit("setRoommateData", resp.data.data)
    })
    },

    registerAccount(context) {
        console.log(context.state.form)
        dataService.registerAccount({
            "username": context.state.form.username,
            "password": context.state.form.password,
            "confirmPassword": context.state.form.confirmPassword,
        }, resp => {
            console.log(resp)
            if (resp.data.code === 0) {
                context.commit("changeAccountStatus", true)
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },


    getMsgOverview(context){
        dataService.askMsgOverviewData(context.state.accountNum, resp => {
            context.commit("setMsgOverviewData", resp.data.data)
    })
},

    getMsg(context,ID){
        dataService.askMsgData(ID,context.state.accountNum,resp => {
            context.commit("setMsgData", resp.data.data)
    })
    }






}
const mutations = {


    setUserInfo(state, userInfo){
        
        // const { username,studentID, level,circleUrl,restTime, hometown,description} = userInfo; // 使用对象解构获取需要的属性
        // state.userInfo = { username,studentID, level,circleUrl,restTime, hometown,description }; // 将获取到的属性赋值给state.userInfo

        state.userInfo = userInfo
    },

    setRoomData(state,roomData){
        state.roomData = roomData
    },

    setRoommateData(state,roommateData){
        state.roommateData = roommateData
    },

    setMsgOverviewData(state,data){
        state.msgOverviewData = data
    },

    setMsgData(state,data){
        state.msgInfo = data
    }
   
}

const getters = {
    // getters
  }
   

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}