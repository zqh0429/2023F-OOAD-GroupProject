import mainService from "@/service/mainService";

const state = () => ({
    selectedRoom:{
        area: "",
        building: "",
        floor: "",
        room: "",
    },
    roomInfo: {
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
        user:null,
        comment:null
    },
    comments:null,
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
        mainService.addComment(context.state.commentLine, resp => {
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
            {}, resp => {
                console.log(resp)
                if (resp.data.code === 0) {
                    context.commit("updateComment", resp.data.data)
                } else {
                    context.state.errorMsg = resp.data.msg
                }
            }
        )
    },
    getUser(context,data) {
        context.commit("getUser", data)
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
    getUser(state,data) {
        state.commentLine.user = data
        console.log(state.commentLine)
    }
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}