import axios from 'axios';

// const dataServerUrl = 'http://127.0.0.1:8082';

function loadRoomInfo(param, callback) {
    /*
        param: area,building,floor,room
    */
    // const url = `${dataServerUrl}/api/main/v1/loadRoomInfo`;
    const params = {
        param
    };
    const url = `api/main/v1/loadRoomInfo`;
    axios.get(url, {params})
        .then(resp => {
            callback(resp);
        })
        .catch(errResp => {
            console.log(errResp);
        });
}
function listComment(param, callback) {
    /*
    param: roomID
    */
    // const url = `${dataServerUrl}/api/main/v1/comments`
    const params = {
        param
    };
    const url = `api/main/v1/comments`
    axios.get(url, {params})
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function addComment(param, roomID, callback) {
    /*
    param: roomID, username, comment
    */
    // const url = `${dataServerUrl}/api/main/v1/addComment`
    const params = {
        param,roomID
    };
    const url = `api/main/v1/addComment`
    axios.post(url, {params})
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function getBuildingInfo(param,callback) {
    /*
    param: roomID, username, comment
    */
    // const url = `${dataServerUrl}/api/main/v1/addComment`
    const params = {
        param
    };
    const url = `api/main/v1/getBuildingInfo`
    axios.get(url, {params})
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function addReply(param, commentID, callback) {
    /*
    param: username, reply, commentID
    */
    // const url = `${dataServerUrl}/api/main/v1/addComment`
    const params = {
        param,commentID
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
    loadRoomInfo,
    listComment,
    addComment,
    getBuildingInfo,
    addReply
};
