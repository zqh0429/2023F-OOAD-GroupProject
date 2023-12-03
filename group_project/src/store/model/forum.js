import forumService from "@/service/forumService";

const state = () => ({
    postOverviewData: null,
    groupOverviewData: null,
    postInfo: {
        user: null,
        sleep: null,
        wake: null,
        content: null,
    },
    groupInfo: {
        leader: "",
        members: "",
        sleep: "",
        wake: "",
        content: "",
    },
    errorMsg: null,
    joinGroupValid:false,
})

const actions = {
    searchPost(context,id) {
        forumService.searchPost(id, resp => {
            if (resp.data.code === 0) {
                context.commit("searchPost", resp.data.data)
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    searchGroup(context,id) {
        forumService.searchGroup(id, resp => {
            if (resp.data.code === 0) {
                context.commit("searchGroup", resp.data.data)
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    loadPost(context) {
        forumService.loadPost(context.state.postInfo, resp => {
            if (resp.data.code === 0) {
                context.commit("loadPostOverviewData", resp.data.data)
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    loadGroup(context) {
        forumService.loadGroup(context.state.groupInfo, resp => {
            if (resp.data.code === 0) {
                context.commit("loadGroupOverviewData", resp.data.data)
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    joinGroup(context,id) {
        forumService.joinGroup(id, resp => {
            if (resp.data.code === 0) {
                context.commit("joinGroup", true)
                console.log(context.state.joinGroupValid)
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
}
const mutations = {
    searchPost(state, data) {
        state.postInfo = data
    },
    searchGroup(state, data) {
        state.groupInfo = data
    },
    loadPostOverviewData(state, data) {
        state.postOverviewData = data
    },
    loadGroupOverviewData(state, data) {
        state.groupOverviewData = data
    },
    joinGroup(state, status) {
        state.joinGroupValid = status
    },
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}