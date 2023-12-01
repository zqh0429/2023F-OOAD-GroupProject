import mainService from "@/service/mainService";

const state = () => ({
    location: {
        "area": null,
        "building": null,
        "floor": null,
        "room": null,
        "like":null,
        "comments":null
    },
    inputComment:null,
    inputUser:null,
    commentLine: {
        "user":null,
        "comment":null
    },
    comments:null,
    locationValid: false,
    errorMsg: null
})

const actions = {
    loadRoomInfo(context) {
        mainService.loadRoomInfo(context.state.location, resp => {
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
                if (resp.data.code === 0) {
                    context.commit("updateRowData", resp.data.data)
                } else {
                    context.state.errorMsg = resp.data.msg
                }
            }
        )
    },

}
const mutations = {
    changeLocation(state, data) {
        state.location = data
    },
    updateRowData(state, data) {
        state.comments = data
    },
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}