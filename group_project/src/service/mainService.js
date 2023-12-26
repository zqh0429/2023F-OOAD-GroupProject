import axios from 'axios';

const dataServerUrl = 'http://127.0.0.1:8082';

function loadRoomInfo(param, callback) {
    /*
        param: area,building,floor,room
    */
    const url = `${dataServerUrl}/api/main/v1/loadRoomInfo`;
    const params = {
        area:param.area,
        building:param.building,
        floor:param.floor,
        room:param.room

    };
    // const url = `api/main/v1/loadRoomInfo`;
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
    const url = `${dataServerUrl}/api/main/v1/comments`
    const params = {
        roomID: param
    };
    // const url = `api/main/v1/comments`
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
    const url = `${dataServerUrl}/api/main/v1/addComment`
    const params = {
        content:param.comment,
        user:param.user,
        comment_room:param.roomID
    };
    console.log(params)
    // const url = `api/main/v1/addComment`
    axios.post(url, params)
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
function deleteRoom(param,callback){
    const params = {
        param
    };
    const url ='/api/main/v1/deleteRoom'
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
        reply_comment:param.commentID,
        user:param.user,
        repliedUser:param.repliedUser,
        content:param.reply
    };
    const url = `${dataServerUrl}/api/main/v1/addReply`
    axios.post(url, params)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function EditRoom(param,callback){

    const url ='/api/main/v1/editRoom'
    axios.post(url, {param})
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function AddRoom(param,callback){
    const url ='/api/main/v1/addRoom'
    axios.post(url, {param})
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function ChooseRoom(param,callback){
    const url ='/api/main/v1/chooseRoom'
    axios.post(url, {param})
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
    deleteRoom,
    addReply,
    EditRoom,
    AddRoom,
    ChooseRoom
};