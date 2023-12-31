import axios from 'axios';

const dataServerUrl = 'http://127.0.0.1:8082';
function starCurrentRoom(param, callback) {
    /*
        param: roomID,studentID
    */
    const url = `${dataServerUrl}/api/main/v1/star`;
    const params = {
        roomID:param.roomID,
        studentID:param.studentID
    };
    // const url = `api/main/v1/loadRoomInfo`;
    axios.post(url, params)
        .then(resp => {
            callback(resp);
        })
        .catch(errResp => {
            console.log(errResp);
        });
}

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
            console.log(resp.data)
        })
        .catch(errResp => {
            console.log(errResp);
        });
}
function loadRoomInfoByID(param, callback) {
    /*
        param: roomID
    */
    const url = `${dataServerUrl}/api/main/v1/loadRoomInfoByID`;
    const params = {
        param
    };
    // const url = `api/main/v1/loadRoomInfo`;
    axios.get(url, {params})
        .then(resp => {
            callback(resp);
            console.log(resp.data)
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
       roomId: param
    };
    const url =`${dataServerUrl}/api/teacher/deleteRoom`
    axios.get(url, {params})
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
    console.log(param)

    const url =`${dataServerUrl}/api/teacher/editRoom`
    axios.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function AddRoom(param,callback){
    const url =`${dataServerUrl}/api/teacher/addRoom`
    console.log(param)
    axios.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function ChooseRoom(param,callback){

    const url = `${dataServerUrl}/api/main/v1/chooseRoom`
    const params = {
        accountNum:param.accountNum,
        roomId:param.roomId

    };
    console.log(params)
    axios.get(url, {params})
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

export default {
    starCurrentRoom,
    loadRoomInfo,
    listComment,
    addComment,
    getBuildingInfo,
    deleteRoom,
    addReply,
    EditRoom,
    AddRoom,
    ChooseRoom,
    loadRoomInfoByID
};