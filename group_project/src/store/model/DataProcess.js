import dataService from "@/service/dataService";

const state = () => ({

    accountNum: 12345678, //账号
    password: "",          //密码

    userInfo: {          //主页个人信息
        username: "",
        studentID: '',
        isTeacher:false,
        level: "",
        circleUrl: '',
        restTime: "",
        hometown: "",
        description: "",
        gender : ""
    },


    msgOverviewData: [],
    msgID: "",
    msgInfo: [],

    roomData: [],      //收藏房间信息

    roommateData: [],  //组队队友信息

    memberData: [{room_id:"1001",room_gender:"男",room_level:"硕士",room_locate:"一期八栋10楼2号房间"},
        {room_id:"1003",room_gender:"男",room_level:"硕士",room_locate:"一期八栋10楼3号房间"},
        {room_id:"1002",room_gender:"男",room_level:"硕士",room_locate:"一期八栋10楼2号房间"}
    ],

    beginTime1 : "2023-12-26 00:00:00",
    endTime1 : "2023-12-29 00:00:00",
    beginTime2 : "",
    endTime2 : ""



})

const actions = {

    getMsgTeam(context) {
        dataService.askMsgDataTeam( context.state.accountNum, resp => {
            context.commit("setMsgData", resp.data.data)
        })
    },

    getMsgDom(context) {
        dataService.askMsgDataDom( context.state.accountNum, resp => {
            context.commit("setMsgData", resp.data.data)
        })
    },

    getMsgPost(context) {
        dataService.askMsgDataPost( context.state.accountNum, resp => {
            context.commit("setMsgData", resp.data.data)
        })
    },

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


    setUser(context, accountNum) {
        console.log(accountNum)
        context.commit("setUser", accountNum)
        context.dispatch("getUserInfo");
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
    setBeginTime1(context,param) {
        context.commit("setBegin1",param)

        // dataService.setBeginTime1(context.state.beginTime1,resp => {
        //     console.log(resp.data)
        // })
    },
    setEndTime1(context,param) {
        context.commit("setEnd1",param)
        // dataService.setEndTime1(context.state.endTime1,resp => {
        //     console.log(resp.data)
        // })
    },
    setBeginTime2(context,param) {
        context.commit("setBegin2",param)

        // dataService.setBeginTime2(context.state.beginTime2,resp => {
        //     console.log(resp.data)
        // })
    },
    setEndTime2(context,param) {
        context.commit("setEnd2",param)
        // dataService.setEndTime2(context.state.endTime2,resp => {
        //     console.log(resp.data)
        // })
    },

    quit(context){
        dataService.quit(context.state.accountNum)
        context.commit("quit")


    },
    filter(context){
        dataService.filter(resp => {
            context.commit("resetMemberData", resp.data.data)
        })
    },
    kick(context,info){
        dataService.kick(info,resp => {
            context.commit("kick", resp.data.data)
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
    setBegin1(state,data){
        state.beginTime1=data
    },
    setEnd1(state,data){
        state.endTime1=data
    },
    setBegin2(state,data){
        state.beginTime2=data
    },
    setEnd2(state,data){
        state.endTime2=data
    },
    quit(state){
        const data = []
        state.roommateData = data
    },
    resetMemberData(state,data){
        state.memberData =data
    },
    kick(state,data){
        state.roommateData =data
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