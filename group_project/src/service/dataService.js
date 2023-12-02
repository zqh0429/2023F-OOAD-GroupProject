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


export default {
    askUserInfo,
    updateUserInfo,
    askRoomData,
    askRoommateData
    
}