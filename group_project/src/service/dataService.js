import axios from 'axios';

const dataServerUrl = "http://127.0.0.1:8082";



function askMsgDataTeam(accountNum, callback){
    const params = {
        accountNum : accountNum,
    };
    const url = `${dataServerUrl}/api/chat/message/MsgDataTeam`;
    axios.get(url,{params})
        .then(resp => {
            console.log(resp.data)
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function askMsgDataDom(accountNum, callback){
    const params = {
        accountNum : accountNum,
    };
    const url = `${dataServerUrl}/api/chat/message/MsgDataDom`;
    axios.get(url,{params})
        .then(resp => {
            console.log(resp.data)
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function askMsgDataPost(accountNum, callback){
    const params = {
        accountNum : accountNum,
    };
    const url = `${dataServerUrl}/api/chat/message/MsgDataPost`;
    axios.get(url,{params})
        .then(resp => {
            console.log(resp.data)
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}


function askUserInfo(param,callback){  //请求个人信息
    const params = {
        studentId: param
    };
    const url = `${dataServerUrl}/api/student/information/show/`;
    axios.get(url,{params})
        .then(resp => {
            console.log(resp.data)
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function updateUserInfo(param,information,callback){  //更新修改后的个人信息
    const params = {
        studentId: param,
        studentName: information.username,
        gender: information.gender,
        degree: information.level,
        major: null,
        undergraduateSchool: null,
        studentDescription: information.description,
        sleepTime: information.restTime.split(" ")[0],
        wakeTime: information.restTime.split(" ")[2],
        homeTown: information.hometown,
        circleUrl: information.circleUrl
    };
    const url = `${dataServerUrl}/api/student/information/modify/`;
    axios.post(url,params)
        .then(resp => {
            console.log(resp.data)
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })

}

function askRoomData(param,callback){
    const params = {
        student_id: param
    };
    const url = `${dataServerUrl}/api/main/v1/loadStarRoom`;
    axios.get(url,{params})
        .then(resp => {
            console.log(resp.data)
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function askRoommateData(param,callback){
    const params = {
        student_id: param
    };
    const url = `${dataServerUrl}/api/team/loadTeammate`;
    axios.get(url,{params})
        .then(resp => {
            console.log(resp.data)
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}




// function askMsgOverviewData(param,callback){


//     const params = {
//         accountNum : param
//     };
//     axios.get('/api/chat/message/MsgOverview',{params})
//         .then(resp => {
//             console.log(resp.data)
//             callback(resp)
//         }, errResp => {
//             console.log(errResp)
//         })

// }



function askUserData(callback){
    const url = `${dataServerUrl}/api/teacher/loadAllStudents`;
    axios.get(url)
        .then(resp => {
            console.log(resp.data)
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function setUserInfo(info,callback){  //更新修改后的个人信息
    const params = {
        accountNum: info.accountNum,
        username: info.username,
        password: info.password,
        gender: info.gender,
        level: info.level,
        room_id: info.room_id,
        address: null,
        editable: null
    }
    console.log(info)
    const url = `${dataServerUrl}/api/teacher/updateAccount`;
    axios.post(url,params)
        .then(resp => {
            console.log(resp.data)
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })

}

function addUser(info,callback){
    const url = `${dataServerUrl}/api/teacher/addAccount`;
    const params = {
        accountNum: info.accountNum,
        username: info.username,
        password: info.password,
        gender: info.gender,
        level: info.level,
        room_id: null,
        address: null,
        editable: null
    }
    axios.post(url,params)
        .then(resp => {
            console.log(resp.data)
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function askMemberData(callback){
    axios.get(`${dataServerUrl}/api/teacher/listdormitoryselection`)
        .then(resp => {
            console.log(resp.data)
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}



function quit(accountNum) {
    const params = {
        student_id : accountNum,
    };
    const url = `${dataServerUrl}/api/team/quit`;
    axios.get(url,{params})

}

function filter(callback){
    axios.get(`${dataServerUrl}/api/teacher/listfilterdormitoryselection`)//
        .then(resp => {
            console.log(resp.data)
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}


function kick(info, callback){
    const params = {
        studentID : info.studentID,
        accountNum :info.accountNum
    };
    const url = `${dataServerUrl}/api/team/expelTeammate`;
    axios.get(url,{params})
        .then(resp => {
            console.log(resp.data)
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}
function getUserAvatar(info, callback){
    const params = {
        studentID : info,
    };
    const url = `${dataServerUrl}/api/user/getUserAvatar`;
    axios.get(url,{params})
        .then(resp => {
            console.log(resp.data)
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })




}

function deleteStu(accountNum,callback) {
    const params = {
        accountNum : accountNum,
    };
    const url = `${dataServerUrl}/api/teacher/deleteAccount`;
    axios.get(url,{params}) .then(resp => {
        console.log(resp.data)
        callback(resp)
    }, errResp => {
        console.log(errResp)
    })

}

function exportInfo(callback) {
    const url = `${dataServerUrl}/api/teacher/deleteAccount`;
    axios.get(url) .then(resp => {
        console.log(resp.data)
        callback(resp)
    }, errResp => {
        console.log(errResp)
    })

}

export default {
    askUserInfo,
    updateUserInfo,
    askRoomData,
    askRoommateData,
    // askMsgOverviewData,
    askMsgDataTeam,
    askMsgDataDom,
    askMsgDataPost,
    askUserData,
    setUserInfo,
    addUser,
    askMemberData,
    quit,
    filter,
    kick,
    getUserAvatar,
    deleteStu,
    exportInfo

}