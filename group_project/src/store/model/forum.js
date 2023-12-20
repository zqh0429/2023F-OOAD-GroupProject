import forumService from "@/service/forumService";

const state = () => ({
    postOverviewData: null,
    groupOverviewData: null,
    postInfo: {
        id:null,
        title:null,
        user: null,
        sleep: null,
        wake: null,
        content: null,
        comments:null
    },
    newPostInfo: {
        title:null,
        user: null,
        sleep: null,
        wake: null,
        content: null,
    },
    newGroupInfo: {
        groupName:"",
        leader: "",
        members: "",
        sleep: "",
        wake: "",
        content: "",
    },
    groupInfo: {
        id:null,
        groupName:"",
        leader: "",
        members: "",
        sleep: "",
        wake: "",
        content: "",
        comments: null
    },
    commentLine: {
        id:null,
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
    comments: null,
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
    addPost(context) {
        forumService.addPost(context.state.newPostInfo, resp => {
            if (resp.data.code === 0) {
                alert("Add Post Succeed")
                context.dispatch("loadPost")
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    addGroup(context) {
        forumService.addGroup(context.state.newGroupInfo, resp => {
            if (resp.data.code === 0) {
                alert("Add Group Succeed")
                context.dispatch("loadGroup")
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    listPostComment(context) {
        forumService.listPostComment(
            context.state.postInfo.id, resp => {
                console.log(resp)
                if (resp.data.code === 0) {
                    context.commit("updatePostComment", resp.data.data)
                } else {
                    context.state.errorMsg = resp.data.msg
                }
            }
        )
    },
    listGroupComment(context) {
        forumService.listGroupComment(
            context.state.groupInfo.id, resp => {
                console.log(resp)
                if (resp.data.code === 0) {
                    context.commit("updateGroupComment", resp.data.data)
                } else {
                    context.state.errorMsg = resp.data.msg
                }
            }
        )
    },
    addPostComment(context) {
        forumService.addPostComment(context.state.commentLine,context.state.postInfo.id, resp => {
            console.log("add record", resp)
            if (resp.data.code === 0) {
                context.commit("addComment", context.state.commentLine)
                // context.dispatch("listPostComment")
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    addGroupComment(context) {
        forumService.addGroupComment(context.state.commentLine,context.state.groupInfo.id, resp => {
            console.log("add record", resp)
            if (resp.data.code === 0) {
                context.commit("addComment", context.state.commentLine)
                // context.dispatch("listGroupComment")
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    addReply(context) {
        forumService.addReply(context.state.replyLine, resp => {
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
    updatePostComment(state, data) {
        state.comments = data
    },
    updateGroupComment(state, data) {
        state.comments = data
    },
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}