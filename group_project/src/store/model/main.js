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
    comments:[],
    locationValid: false,
    errorMsg: null
})

const actions = {
    loadRoomInfo(context) {
        mainService.loadRoomInfo(context.state.selectedRoom, resp => {
            // if (resp.data.code === 0) {
            //     context.commit("changeLocation", resp.data.data)
            // } else {
            //     context.state.errorMsg = resp.data.msg
            // }
            context.commit("changeLocation", resp.data.roomInfo)
        })
    },
    addComment(context) {
        mainService.addComment(context.state.commentLine, resp => {
            console.log("add record", resp)
            if (resp.data.code === 0) {
                context.dispatch("listComment")
                // context.commit("addRecord", context.state.newRecord)
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    listComment(context) {
        mainService.listComment(
            {}, resp => {
                console.log(resp)
                context.commit("updateComment", resp.data.data)
                // if (resp.data.code === 0) {
                //
                // } else {
                //     context.state.errorMsg = resp.data.msg
                // }
            }
        )
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
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}