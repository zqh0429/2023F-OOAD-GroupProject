import forumService from "@/service/forumService";

const state = () => ({
    postOverviewColumns: ["index", "title"],
    groupOverviewColumns: ["groupID", "groupName"],
    postOverviewData: null,
    groupOverviewData: null,
    postInfo: {
        'user': null,
        'sleep': null,
        'wake': null,
        'content': null,
    },
    groupInfo: {
        'leader': null,
        'members': null,
        'sleep': null,
        'wake': null,
        'content': null,
    },
    postID:null,
    groupID:null,
    errorMsg: null
})

const actions = {
    searchPost(context) {
        forumService.searchPost(context.state.postID, resp => {
            if (resp.data.code === 0) {
                context.commit("searchPost", resp.data.data)
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    searchGroup(context) {
        forumService.searchGroup(context.state.groupID, resp => {
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
}
const mutations = {
    searchPost(state, data) {
        state.postInfo = data
    },
    searchGroup(state, data) {
        state.groupInfo = data
    },
    loadPost(state, data) {
        state.postOverviewData = data
    },
    loadGroupOverviewData(state, data) {
        state.groupOverviewData = data
    },
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}