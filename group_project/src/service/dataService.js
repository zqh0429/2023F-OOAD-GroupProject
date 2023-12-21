import axios from 'axios';

// const dataServerUrl = "http://127.0.0.1:8082";



function askUserInfo(param,callback){  //请求个人信息
    const params = {
        param
      };
    axios.get('/api/user/info',{params})
    .then(resp => {
        console.log(resp.data)
        callback(resp)
    }, errResp => {
        console.log(errResp)
    })
}

function updateUserInfo(param,information,callback){  //更新修改后的个人信息
    const params = {
        accountNum : param,
        userInfo : information
      };
    axios.post('/api/user/updateinfo',{params})
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
        accountNum : param
      };
      axios.get('/api/user/roommate',{params})
      .then(resp => {
          console.log(resp.data)
          callback(resp)
      }, errResp => {
          console.log(errResp)
      })
}




function askMsgOverviewData(param,callback){
   
   
    const params = {
        accountNum : param
      };
      axios.get('/api/chat/message/MsgOverview',{params})
      .then(resp => {
          console.log(resp.data)
          callback(resp)
      }, errResp => {
          console.log(errResp)
      })
    
}

 function askMsgData(ID,accountNum, callback){
    const params = {
        accountNum : accountNum,
        msgID : ID
      };
      axios.get('/api/chat/message/MsgData',{params})
      .then(resp => {
          console.log(resp.data)
          callback(resp)
      }, errResp => {
          console.log(errResp)
      })     
 }

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
    axios.get('/api/Tselect/memberData')
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
export default {
    askUserInfo,
    updateUserInfo,
    askRoomData,
    askRoommateData,
    askMsgOverviewData,
    askMsgData,
    askUserData,
    setUserInfo,
    addUser,
    askMemberData,
    setBeginTime1,
    setEndTime1,
    setBeginTime2,
    setEndTime2
    
}