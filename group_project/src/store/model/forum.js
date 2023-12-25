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
        tags:null,
        content: null,
        comments:null
    },
    newPostInfo: {
        title:null,
        user: null,
        sleep: null,
        wake: null,
        tags:null,
        content: null,
    },
    newGroupInfo: {
        groupName:"",
        leader: "",
        members: "",
        sleep: "",
        wake: "",
        tags:null,
        content: "",
    },
    groupInfo: {
        id:null,
        groupName:"",
        leader: "",
        members: "",
        sleep: "",
        wake: "",
        tags:null,
        content: "",
        comments: null
    },
    commentLine: {
        id:null,
        user:null,
        content:null,
        replies:[]
    },
    replyLine: {
        commentID:null,
        user:null,
        repliedUser:null,
        reply:null,
    },
    tagValue:null,
    comments: null,
    errorMsg: null,
    joinGroupValid:false,
})

const actions = {
    searchPost(context,id) {
        forumService.searchPost(id, resp => {
            if (resp.data.code === 0) {
                context.commit("searchPost", resp.data.data)
                console.log(resp.data.data)
                context.dispatch("listPostComment")
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
    searchPostByTag(context,tagValue) {
        forumService.searchPostByTag(tagValue, resp => {
            if (resp.data.code === 0) {
                context.commit("loadPostOverviewData", resp.data.data)
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    searchPostByWake(context,time) {
        console.log(time)
        forumService.searchPostByWake(time, resp => {

            if (resp.data.code === 0) {
                context.commit("loadPostOverviewData", resp.data.data)
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    searchPostBySleep(context,time) {
        forumService.searchPostBySleep(time, resp => {
            if (resp.data.code === 0) {
                context.commit("loadPostOverviewData", resp.data.data)
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    searchGroupByTag(context,tagValue) {
        forumService.searchGroupByTag(tagValue, resp => {
            if (resp.data.code === 0) {
                context.commit("loadGroupOverviewData", resp.data.data)
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    searchGroupByWake(context,startTime,endTime) {
        forumService.searchGroupByWake(startTime,endTime, resp => {
            if (resp.data.code === 0) {
                context.commit("loadGroupOverviewData", resp.data.data)
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    searchGroupBySleep(context,startTime,endTime) {
        forumService.searchGroupBySleep(startTime,endTime, resp => {
            if (resp.data.code === 0) {
                context.commit("loadGroupOverviewData", resp.data.data)
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
    joinGroup(context,id,studentID) {
        forumService.joinGroup(id, studentID,resp => {
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
        forumService.addPostComment(context.state.commentLine, resp => {
            console.log("add record", resp)
            if (resp.data.code === 0) {
                // context.commit("addComment", context.state.commentLine)
                context.dispatch("listPostComment")
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    addGroupComment(context) {
        forumService.addGroupComment(context.state.commentLine, resp => {
            console.log("add record", resp)
            if (resp.data.code === 0) {
                // context.commit("addComment", context.state.commentLine)
                context.dispatch("listGroupComment")
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    addPostReply(context) {
        forumService.addPostReply(context.state.replyLine, resp => {
            console.log("add record", resp)
            if (resp.data.code === 0) {
                context.dispatch("listPostComment")
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
    addGroupReply(context) {
        forumService.addGroupReply(context.state.replyLine, resp => {
            console.log("add record", resp)
            if (resp.data.code === 0) {
                context.dispatch("listGroupComment")
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