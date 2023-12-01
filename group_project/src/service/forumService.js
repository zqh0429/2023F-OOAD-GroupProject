import axios from 'axios';

const dataServerUrl = 'http://127.0.0.1:8082';

function searchPost(param, callback) {
    /*
        param: postID
    */
    const url = `${dataServerUrl}/api/post/v1/searchPost`;
    axios.post(url, param)
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
    const url = `${dataServerUrl}/api/post/v1/searchGroup`;
    axios.post(url, param)
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
    const url = `${dataServerUrl}/api/post/v1/loadPost`;
    axios.post(url, param)
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
    const url = `${dataServerUrl}/api/post/v1/loadGroup`;
    axios.post(url, param)
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
    searchGroup
};
