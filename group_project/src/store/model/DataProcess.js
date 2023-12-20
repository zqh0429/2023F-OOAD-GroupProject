import dataService from "@/service/dataService";

const state = () => ({

    accountNum: 12345678, //账号
    password: "",          //密码

    userInfo: {          //主页个人信息
        username: "",
        studentID: '',
        level: "",
        circleUrl: '',
        restTime: "",
        hometown: "",
        description: ""
    },


    msgOverviewData: [],
    msgID: "",
    msgInfo: {},

    roomData: [],      //收藏房间信息

    roommateData: [],  //组队队友信息

    memberData: [],

    beginTime : "",
    endTime : ""



})

const actions = {


    getUserInfo(context) {//初始化个人信息
        console.log(context.state.accountNum)
        dataService.askUserInfo(context.state.accountNum, resp => {

            context.commit("setUserInfo", resp.data.data)

        })
    },

    saveUserInfo(context) {
        dataService.updateUserInfo(context.state.accountNum, context.state.userInfo, resp => {
            console.log(resp.message)
        })
    },

    getRoomData(context) {
        dataService.askRoomData(context.state.accountNum, resp => {
            context.commit("setRoomData", resp.data.data)
        })
    },

    getRoommateData(context) {
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


    getMsgOverview(context) {
        dataService.askMsgOverviewData(context.state.accountNum, resp => {
            context.commit("setMsgOverviewData", resp.data.data)
        })
    },

    getMsg(context, ID) {
        dataService.askMsgData(ID, context.state.accountNum, resp => {
            context.commit("setMsgData", resp.data.data)
        })
    },
    setUser(context, accountNum) {
        console.log(accountNum)
        context.commit("setUser", accountNum)
        console.log(context.state.accountNum)
    },

    getUserData(context) {
        dataService.askUserData(resp => {
            context.commit("setUserData", resp.data.data)
        })
    },

    editUser(context, info) {
        dataService.setUserInfo(info, resp => {
            console.log(resp.data)
        })

    },

    addUser(context, info) {
        dataService.addUser(info, resp => {
            console.log(resp.data)
        })
    },

    getMemberData(context) {
        dataService.askMemberData(resp => {
            context.commit("setMemberData", resp.data.data)
        })
    },
    setBeginTime(context,param) {
        context.commit("setBegin",param)

        dataService.setBeginTime(context.state.beginTime,resp => {
            console.log(resp.data)
        })
    },
    setEndTime(context,param) {
        context.commit("setEnd",param)
        dataService.setEndTime(context.state.endTime,resp => {
            console.log(resp.data)
        })
    }





}
const mutations = {


    setUserInfo(state, userInfo) {

        // const { username,studentID, level,circleUrl,restTime, hometown,description} = userInfo; // 使用对象解构获取需要的属性
        // state.userInfo = { username,studentID, level,circleUrl,restTime, hometown,description }; // 将获取到的属性赋值给state.userInfo

        state.userInfo = userInfo
    },

    setRoomData(state, roomData) {
        state.roomData = roomData
    },

    setRoommateData(state, roommateData) {
        state.roommateData = roommateData
    },

    setMsgOverviewData(state, data) {
        state.msgOverviewData = data
    },

    setMsgData(state, data) {
        state.msgInfo = data
    },
    setUser(state, data) {
        state.accountNum = data
    },
    setUserData(state, data) {
        state.userData = data
    },
    setMemberData(state, data) {
        state.memberData = data
    },
    setBegin(state,data){
        state.beginTime=data
    },
    setEnd(state,data){
        state.endTime=data
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