import axios from 'axios';

// const dataServerUrl = 'http://127.0.0.1:8082';

function searchPost(param, callback) {
    /*
        param: postID
    */
    // const url = `${dataServerUrl}/api/post/v1/searchPost`;
    const url = `api/forum/post/searchPost`;
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
function loadPost(param, callback) {
    /*
        param:
    */
    // const url = `${dataServerUrl}/api/forum/post/loadPost`;
    const url = `api/forum/post/loadPost`;
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
    const url = `api/forum/post/addPost`;
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
export default {
    loadPost,
    loadGroup,
    searchPost,
    searchGroup,
    joinGroup,
    addPost,
    addGroup
};
