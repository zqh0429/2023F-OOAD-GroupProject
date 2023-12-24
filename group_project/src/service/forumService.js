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
    // const url = `${dataServerUrl}/api/post/v1/searchGroup`;
    const url = `api/forum/group/searchGroup`;
    const params = {
        param
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
    const url = `api/forum/post/searchPostByTag`;
    const params = {
        param
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
function searchPostByWake(param, callback) {
    /*
        param: startTime,endTime
    */
    // const url = `${dataServerUrl}/api/post/v1/searchPost`;
    const url = `api/forum/post/searchPostByWake`;
    const params = {
        param
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
function searchPostBySleep(param, callback) {
    /*
        param: startTime,endTime
    */
    // const url = `${dataServerUrl}/api/post/v1/searchPost`;
    const url = `api/forum/post/searchPostBySleep`;
    const params = {
        param
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
function searchGroupByTag(param, callback) {
    /*
        param: tagValue (array)
    */
    // const url = `${dataServerUrl}/api/Group/v1/searchGroup`;
    const url = `api/forum/group/searchGroupByTag`;
    const params = {
        param
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
function searchGroupByWake(param, callback) {
    /*
        param: startTime,endTime
    */
    // const url = `${dataServerUrl}/api/Group/v1/searchGroup`;
    const url = `api/forum/group/searchGroupByWake`;
    const params = {
        param
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
function searchGroupBySleep(param, callback) {
    /*
        param: startTime,endTime
    */
    // const url = `${dataServerUrl}/api/Group/v1/searchGroup`;
    const url = `api/forum/group/searchGroupBySleep`;
    const params = {
        param
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
    const url = `api/forum/group/loadGroup`;
    axios.get(url, param)
        .then(resp => {
            callback(resp);
        })
        .catch(errResp => {
            console.log(errResp);
        });
}
function joinGroup(param, callback) {
    /*
        param: groupID
    */
    // const url = `${dataServerUrl}/api/post/v1/searchGroup`;
    const url = `api/forum/group/searchGroup`;
    const params = {
        param
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
function addPost(param, callback) {
    /*
        param: title, user, sleep, wake, content
    */
    // const url = `${dataServerUrl}/api/post/v1/searchGroup`;
    const url = `${dataServerUrl}/api/forum/post/addPost`;
    const params = {
        title:param.title,
        user:param.user,
        sleep:param.sleep,
        wake:param.wake,
        content:param.content
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
    const url = `api/forum/group/addGroup`;
    const params = {
        param
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
function listPostComment(param, callback) {
    /*
        param:
    */
    // const url = `${dataServerUrl}/api/forum/post/loadPost`;
    const url = `api/forum/post/listPostComment`;
    axios.get(url, param)
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
    const url = `api/forum/group/listGroupComment`;
    axios.get(url, param)
        .then(resp => {
            callback(resp);
        })
        .catch(errResp => {
            console.log(errResp);
        });
}
function addPostComment(param, postID, callback) {
    /*
    param: username, comment, id
    */
    // const url = `${dataServerUrl}/api/main/v1/addComment`
    const params = {
        param,postID
    };
    const url = `api/forum/Post/addPostComment`
    axios.post(url, {params})
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}
function addGroupComment(param, groupID, callback) {
    /*
    param: username, comment, id
    */
    // const url = `${dataServerUrl}/api/main/v1/addComment`
    const params = {
        param,groupID
    };
    const url = `api/forum/group/addGroupComment`
    axios.post(url, {params})
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}
function addReply(param, callback) {
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
        param
    };
    const url = `api/main/v1/addReply`
    axios.post(url, {params})
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
    addReply
};