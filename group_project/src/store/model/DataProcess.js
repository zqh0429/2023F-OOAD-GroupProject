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

    roomData:[],      //收藏房间信息

    roommateData:[]  //组队队友信息



})

const actions = {


    getUserInfo(context){   //初始化个人信息
        dataService.askUserInfo(context.state.accountNum, resp => {

                context.commit("setUserInfo", resp.data.userInfo)
            
        })
    },

    saveUserInfo(context){
        dataService.updateUserInfo(context.state.accountNum,context.state.userInfo, resp => {
            console.log(resp.message)
    })
    },

    getRoomData(context){
        dataService.askRoomData(context.state.accountNum, resp => {
            context.commit("setRoomData", resp.data.roomData)
    })
    },

    getRoommateData(context){
        dataService.askRoommateData(context.state.accountNum, resp => {
            context.commit("setRoommateData", resp.data.roommateData)
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
    }
   
}


   

export default {
    namespaced: true,
    state,
    actions,
    mutations
}