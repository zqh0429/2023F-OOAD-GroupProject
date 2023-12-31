import axios from 'axios';

const dataServerUrl = 'http://127.0.0.1:8082';



function searchPost(param, callback) {
    /*
        param: postID
    */
    const url = `${dataServerUrl}/api/forum/post/searchPost`;
    // const url = `api/forum/post/searchPost`;
    const params = {
        postID: param
    };
    console.log(param)
    axios.get(url, {params})
        .then(resp => {
            callback(resp);
        })
        .catch(errResp => {
            console.log(errResp);
        });
}
function searchGroup(param, callback) {
    /*
        param: groupID
    */
    const url = `${dataServerUrl}/api/team/show`;
    // const url = `api/forum/group/searchGroup`;
    const params = {
        team_id: param
    };
    console.log(param)
    axios.get(url, {params})
        .then(resp => {
            callback(resp);
        })
        .catch(errResp => {
            console.log(errResp);
        });
}
function searchPostByTag(param, callback) {
    /*
        param: tagValue (array)
    */
    // const url = `${dataServerUrl}/api/post/v1/searchPost`;
    const url = `${dataServerUrl}/api/forum/post/searchPostByTag`;
    console.log(param)
    const params = {
        gender:param.gender,
        level:param.level,
        tags:param.tags
    };
    console.log(params)
    axios.post(url, params)
        .then(resp => {
            callback(resp);
        })
        .catch(errResp => {
            console.log(errResp);
        });
}
function searchPostByWake(time, callback) {
    /*
        param: startTime,endTime
    */
    // const url = `${dataServerUrl}/api/post/v1/searchPost`;
    const url = `${dataServerUrl}/api/forum/post/searchPostByWake`;
    const params = {
        gender:time.gender,
        level:time.level,
        startTime: time.startTime,
        endTime: time.endTime
    };
    console.log(params)
    axios.post(url, params)
        .then(resp => {
            callback(resp);
        })
        .catch(errResp => {
            console.log(errResp);
        });
}
function searchPostBySleep(time, callback) {
    /*
        param: startTime,endTime
    */
    // const url = `${dataServerUrl}/api/post/v1/searchPost`;
    const url = `${dataServerUrl}/api/forum/post/searchPostBySleep`;
    const params = {
        gender:time.gender,
        level:time.level,
        startTime: time.startTime,
        endTime: time.endTime
    };
    console.log(params)
    axios.post(url, params)
        .then(resp => {
            callback(resp);
        })
        .catch(errResp => {
            console.log(errResp);
        });
}
function searchGroupByTag(param, callback) {
    /*
        param: tagValue (array)
    */
    const url = `${dataServerUrl}/api/team/searchByTag`;
    // const url = `api/forum/group/searchGroupByTag`;
    const params = {
        gender:param.gender,
        level:param.level,
        team_tags:param.tags
    };
    console.log(param)
    axios.post(url, params)
        .then(resp => {
            callback(resp);
        })
        .catch(errResp => {
            console.log(errResp);
        });
}
function searchGroupByWake(time, callback) {
    /*
        param: startTime,endTime
    */
    const url = `${dataServerUrl}/api/team/searchByWake`;
    // const url = `api/forum/group/searchGroupByWake`;
    const params = {
        gender:time.gender,
        level:time.level,
        startTime: time.startTime,
        endTime: time.endTime
    };
    console.log(time)
    axios.get(url, {params})
        .then(resp => {
            callback(resp);
        })
        .catch(errResp => {
            console.log(errResp);
        });
}
function searchGroupBySleep(time, callback) {
    /*
        param: startTime,endTime
    */
    const url = `${dataServerUrl}/api/team/searchBySleep`;
    // const url = `api/forum/group/searchGroupBySleep`;
    const params = {
        gender:time.gender,
        level:time.level,
        startTime: time.startTime,
        endTime: time.endTime
    };
    console.log(time)
    axios.get(url, {params})
        .then(resp => {
            callback(resp);
        })
        .catch(errResp => {
            console.log(errResp);
        });
}
function loadPost(param, callback) {
    /*
        param:
    */
    const url = `${dataServerUrl}/api/forum/post/loadPost`;
    // const url = `api/forum/post/loadPost`;
    axios.get(url, param)
        .then(resp => {
            callback(resp);
        })
        .catch(errResp => {
            console.log(errResp);
        });
}
function loadGroup(param, callback) {
    /*
        param:
    */
    // const url = `${dataServerUrl}/api/forum/group/loadGroup`;
    const url = `${dataServerUrl}/api/team/load`;
    axios.get(url)
        .then(resp => {
            callback(resp);
        })
        .catch(errResp => {
            console.log(errResp);
        });
}
function joinGroup(param, callback) {
    /*
        param: groupID,studentID
    */
    const url = `${dataServerUrl}/api/team/join`;
    // const url = `api/forum/group/searchGroup`;
    const params = {
        team_id: param.groupID,
        student_id: param.studentID
    };
    console.log(param.groupID)
    console.log(param.studentID)
    axios.get(url, {params})
        .then(resp => {
            callback(resp);
        })
        .catch(errResp => {
            console.log(errResp);
        });
}
function addPost(param, callback) {
    /*
        param: title, user, sleep, wake, content
    */
    // const url = `${dataServerUrl}/api/post/v1/searchGroup`;
    const url = `${dataServerUrl}/api/forum/post/addPost`;
    const params = {
        title:param.title,
        user:param.user,
        gender:param.gender,
        level:param.level,
        sleep:param.sleep,
        wake:param.wake,
        content:param.content,
        tags:param.tags
    };
    console.log(param)
    axios.post(url, params)
        .then(resp => {
            callback(resp);
        })
        .catch(errResp => {
            console.log(errResp);
        });
}
function addGroup(param, callback) {
    /*
        param: groupName:"",
        leader: "",
        members: "",
        sleep: "",
        wake: "",
        content: "",
    */
    // const url = `${dataServerUrl}/api/post/v1/searchGroup`;
    const url = `${dataServerUrl}/api/team/create`;
    const params = {
        creatorId: param.leader,
        team_name: param.groupName,
        team_description: param.content,
        sleep_time: param.sleep,
        wake_time: param.wake,
        team_tags: param.tags,
        gender:param.gender,
        level:param.level,
    };
    console.log(param)
    axios.post(url, params)
        .then(resp => {
            callback(resp);
        })
        .catch(errResp => {
            console.log(errResp);
        });
}
function listPostComment(param, callback) {
    /*
        param:
    */
    // const url = `${dataServerUrl}/api/forum/post/loadPost`;
    const url = `${dataServerUrl}/api/forum/post/listPostComment`;

    console.log(param)
    const params = {
        postid:param
    };
    console.log(params)

    axios.get(url, {params})
        .then(resp => {
            callback(resp);
        })
        .catch(errResp => {
            console.log(errResp);
        });
}
function listGroupComment(param, callback) {
    /*
        param:
    */
    // const url = `${dataServerUrl}/api/forum/group/loadGroup`;
    const url = `${dataServerUrl}/api/team/listGroupComment`;
    console.log(param)
    const params = {
        postid:param
    };

    axios.get(url, {params})
        .then(resp => {
            callback(resp);
        })
        .catch(errResp => {
            console.log(errResp);
        });
}
function addPostComment(param, callback) {
    /*
    param: username, comment, id
    */
    // const url = `${dataServerUrl}/api/main/v1/addComment`
    const params = {
        content:param.content,
        user:param.user,

        reply_post:param.id
    };

    const url = `${dataServerUrl}/api/forum/post/addPostComment`
    axios.post(url, params)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}
function addGroupComment(param, callback) {
    /*
    param: username, comment, id
    */
    // const url = `${dataServerUrl}/api/main/v1/addComment`
    const params = {

        content:param.content,
        user:param.user,
        reply_post:param.id

    };
    console.log(params)
    const url = `${dataServerUrl}/api/team/addGroupComment`
    axios.post(url, params)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}
function addPostReply(param, callback) {
    /*
    param:
    replyLine: {
        commentID:null,
        user:null,
        repliedUser:null,
        reply:null,
    },
    */
    // const url = `${dataServerUrl}/api/main/v1/addComment`
    const params = {
        id:param.commentID,
        user:param.user,
        repliedUser:param.repliedUser,
        content:param.reply

    };
    const url = `${dataServerUrl}/api/forum/post/addReply`

    axios.post(url, params)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}
function addGroupReply(param, callback) {
    /*
    param:
    replyLine: {
        commentID:null,
        user:null,
        repliedUser:null,
        reply:null,
    },
    */
    // const url = `${dataServerUrl}/api/main/v1/addComment`
    const params = {
        id:param.commentID,
        user:param.user,
        repliedUser:param.repliedUser,
        content:param.reply

    };
    console.log(params)
    const url = `${dataServerUrl}/api/team/addGroupReply`
    axios.post(url, params)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}
export default {
    searchPost,
    searchGroup,
    loadPost,
    loadGroup,
    searchPostByTag,
    searchPostByWake,
    searchPostBySleep,
    searchGroupByTag,
    searchGroupByWake,
    searchGroupBySleep,
    joinGroup,
    addPost,
    addGroup,
    listPostComment,
    listGroupComment,
    addPostComment,
    addGroupComment,
    addPostReply,
    addGroupReply
};