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
        name:11,
        comments:null
    },
    comments:null,
    replies: null,
    locationValid: false,
    user:null,
    errorMsg: null,
    msg : ""
})

const actions = {
    loadRoomInfo(context) {
        mainService.loadRoomInfo(context.state.selectedRoom, resp => {
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
    getBuildingInfo(context,id) {
        console.log(id)
        mainService.getBuildingInfo(id, resp => {
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
        mainService.deleteRoom(context.state.roomInfo.roomID, resp => {
            if (resp.data.code === 0) {
                context.commit("deleteData", resp.data.data)
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
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },

    AddRoom(context,info){
        mainService.AddRoom(info, resp => {
            if (resp.data.code === 0) {
                console.log(resp.data.data)
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },

    choose(context,info){
        mainService.ChooseRoom(info, resp => {
            if (resp.data.code === 0) {
                context.state.msg = resp.data.msg
                console.log(resp.data.msg)
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    }

}
const mutations = {
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
    }

}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}