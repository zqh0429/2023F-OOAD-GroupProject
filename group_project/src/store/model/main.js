import mainService from "@/service/mainService";

const state = () => ({
    selectedRoom:{
        area: "",
        building: "",
        floor: "",
        room: "",
    },
    roomInfo: {
        roomID: "",
        area: "",
        building: "",
        floor: "",
        room: "",
        like:"",
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
    errorMsg: null
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
                context.commit("addComment", context.state.commentLine)
                // context.dispatch("listComment")
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    listComment(context) {
        mainService.listComment(
            context.state.roomInfo.roomID, resp => {
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
    addReply(context, commentID) {
        mainService.addReply(context.state.replyLine,commentID, resp => {
            console.log("add record", resp)
            if (resp.data.code === 0) {
                context.dispatch("listComment")
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },

}
const mutations = {
    changeLocation(state, data) {
        state.roomInfo = data
        // console.log(state.roomInfo);
    },
    updateComment(state, data) {
        state.comments = data
    },
    addComment(state, data) {
        state.comments.push(data)
    },
    getBuildingInfo(state,data) {
        state.buildingInfo = data
    }
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}