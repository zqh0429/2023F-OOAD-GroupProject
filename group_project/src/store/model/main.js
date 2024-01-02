import mainService from "@/service/mainService";

const state = () => ({
    selectedRoom:{
        area: "",
        building: "",
        floor: "",
        room: "",
    },
    roomInfo: {
        roomId: null,
        room_region: "",
        room_building: "",
        room_floor: "",
        room_number: "",
        room_star:"",
        room_type:"",
        room_gender:"",
        room_level:"",
        comments:""
    },
    inputComment:null,
    inputUser:null,
    commentLine: {
        roomID:null,
        user:null,
        comment:null,
        replies:[]
    },
    replyLine: {
        commentID:null,
        user:null,
        repliedUser:null,
        reply:null,
    },
    buildingInfo:{
        location:11,
        img:'',
        comments:null,
        rooms:null,
    },
    comments:null,
    replies: null,
    locationValid: false,
    user:null,
    errorMsg: null,
    msg : "",
    allRoom:[],
    msgChoose:""
})

const actions = {

    listRoom(context){
        mainService.listRoom( resp => {
            if (resp.data.code === 0) {
                context.commit("listRoom",resp.data.data)
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    starCurrentRoom(context,param) {
        mainService.starCurrentRoom(param, resp => {
            if (resp.data.code === 0) {
                context.dispatch("loadRoomInfo")
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    loadRoomInfo(context,callback) {
        mainService.loadRoomInfo(context.state.selectedRoom, resp => {
            if (resp.data.code === 0) {
                context.commit("setWinMsg")
                context.commit("changeLocation", resp.data.data)
                callback()
               
            } else {
                context.state.roomInfo = {
                    roomId: null,
                    room_region: "",
                    room_building: "",
                    room_floor: "",
                    room_number: "",
                    room_star:"",
                    room_type:"",
                    room_gender:"",
                    room_level:"",
                    comments:""
                }
             
                context.commit("setMsg", resp.data.msg)
                callback()
            }
        })
    },
    // loadRoomInfo(context) {
    //     mainService.loadRoomInfo(context.state.selectedRoom, resp => {
    //         if (resp.data.code === 0) {
    //             context.commit("changeLocation", resp.data.data)
    //         } else {
    //             context.state.errorMsg = resp.data.msg
    //         }
    //     })
    // },
    loadRoomInfoByID(context,id) {
        mainService.loadRoomInfoByID(id, resp => {
            if (resp.data.code === 0) {
                context.commit("changeLocation", resp.data.data)
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    addComment(context) {
        mainService.addComment(context.state.commentLine,context.state.roomInfo.roomID, resp => {
            console.log("add record", resp)
            if (resp.data.code === 0) {
                // context.commit("addComment", context.state.commentLine)
                context.dispatch("listComment")
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    listComment(context) {
        mainService.listComment(
            context.state.roomInfo.roomId, resp => {
                console.log(resp)
                if (resp.data.code === 0) {
                    context.commit("updateComment", resp.data.data)
                } else {
                    context.state.errorMsg = resp.data.msg
                }
            }
        )
    },
    getBuildingInfo(context,params) {
        console.log(params)
        mainService.getBuildingInfo(params, resp => {
                console.log(resp)
                if (resp.data.code === 0) {
                    context.commit("getBuildingInfo", resp.data.data)
                } else {
                    context.state.errorMsg = resp.data.msg
                }
            }
        )
    },
    deleteRoom(context){
        mainService.deleteRoom(context.state.roomInfo.roomId, resp => {
            if (resp.data.code === 0) {
                context.commit("deleteData", resp.data.data)
                context.dispatch("listRoom")
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },

    addReply(context) {
        mainService.addReply(context.state.replyLine, resp => {
            console.log("add record", resp)
            if (resp.data.code === 0) {
                context.dispatch("listComment")
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },

    EditRoom(context,info){
        mainService.EditRoom(info, resp => {
            if (resp.data.code === 0) {
                console.log(resp.data.data)
                context.dispatch("listRoom")
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },

    AddRoom(context,info){
        mainService.AddRoom(info, resp => {
            if (resp.data.code === 0) {
                console.log(resp.data.data)
                context.dispatch("listRoom")
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },

    choose(context,info){
        mainService.ChooseRoom(info, resp => {
            if (resp.data.code === 0) {
                context.commit("setMsgChoose", resp.data.msg)
                console.log(resp.data.msg)
                
            } else {
                context.commit("setMsgChoose", resp.data.msg)
                console.log(resp.data.msg)
                
            }
        })
    }

}
const mutations = {
    setMsgChoose(state,data){
        state.msgChoose =data
    },
    setWinMsg(state){
        state.msg = "搜索成功"
    },
    setMsg(state,data){
        state.msg = data
    },
    changeLocation(state, data) {
        state.roomInfo = data
        // console.log(state.roomInfo);
    },
    updateComment(state, data) {
        state.comments = data
    },
    // addComment(state, data) {
    //     state.comments.push(data)
    // },
    getBuildingInfo(state,data) {
        state.buildingInfo = data
    },
    deleteData(state,data){
        state.roomInfo = data
        state.comments = null
    },
    listRoom(state,data){
        state.allRoom=data
    }

}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}