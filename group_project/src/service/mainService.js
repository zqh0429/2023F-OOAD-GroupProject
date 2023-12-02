import axios from 'axios';

const dataServerUrl = 'http://127.0.0.1:8082';

function loadRoomInfo(param, callback) {
    /*
        param: username, password
    */
    const url = `${dataServerUrl}/api/main/v1/loadRoomInfo`;
    axios.get(url, param)
        .then(resp => {
            callback(resp);
        })
        .catch(errResp => {
            console.log(errResp);
        });
}
function listComment(param, callback) {
    /*
    param:
    */
    const url = `${dataServerUrl}/api/main/v1/comments`
    axios.get(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function addComment(param, callback) {
    /*
    param: username, comment
    */
    const url = `${dataServerUrl}/api/main/v1/addComment`
    axios.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

export default {
    loadRoomInfo,
    listComment,
    addComment
};
