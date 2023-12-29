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
        accountNum : param
    };
    axios.get('/api/user/Room',{params})
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
    axios.get('/api/Tstudent/userData')
        .then(resp => {
            console.log(resp.data)
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function setUserInfo(info,callback){  //更新修改后的个人信息

    axios.post('/api/Tstudent/setUserData',{info})
        .then(resp => {
            console.log(resp.data)
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })

}

function addUser(info,callback){

    axios.post('/api/Tstudent/addUser',{info})
        .then(resp => {
            console.log(resp.data)
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function askMemberData(callback){
    axios.get(`${dataServerUrl}/api/main/v1/listdormitoryselection`)
        .then(resp => {
            console.log(resp.data)
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function setBeginTime1(beginTime1,callback){
    const params = {
        begintime1 : beginTime1,
    };
    axios.post('/api/Tselect/setBegin1',{params})
        .then(resp => {
            console.log(resp.data)
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })

}

function setEndTime1(endTime1,callback){
    const params = {
        endtime1 : endTime1,
    };
    axios.post('/api/Tselect/setEnd1',{params})
        .then(resp => {
            console.log(resp.data)
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })

}


function setBeginTime2(beginTime2,callback){
    const params = {
        begintime2 : beginTime2,
    };
    axios.post('/api/Tselect/setBegin2',{params})
        .then(resp => {
            console.log(resp.data)
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })

}

function setEndTime2(endTime2,callback){
    const params = {
        endtime2 : endTime2,
    };
    axios.post('/api/Tselect/setEnd2',{params})
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

    axios.get(`${dataServerUrl}/api/main/v1/listfilterdormitoryselection`)
    .then(resp => {
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
    setBeginTime1,
    setEndTime1,
    setBeginTime2,
    setEndTime2,
    quit,
    filter

}