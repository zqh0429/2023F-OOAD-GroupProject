import Mock from 'mockjs'
 


Mock.mock(RegExp("api/user/info" + ".*"), 'get', function(config){
    //不同账号返回不同参数
    const param = config.url.split('?')[1]; // 通过config.url获取GET请求的参数
    const accountNum = param.split('=')[1];
    console.log(accountNum);
      if(accountNum === '12345678'){
      return {
        data: {
          username : "Student 1",
          studentID: '12330849',
          level: "硕士",
          circleUrl:
              'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          restTime: "23:00 - 9:00",
          hometown: "广东深圳",
          description: "本科就读于南方科技大学，喜欢看书听音乐，不吵闹" // 使用前端传入的account参数
        }
    }}else if (accountNum === '12011429') {
        return {
    
          data: {
            username : "Student 1",
            studentID: '12330849',
            level: "博士",
            circleUrl:
                'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            restTime: "23:00 - 9:00",
            hometown: "广东深圳",
            description: "本科就读于清华，喜欢看书听音乐，不吵闹" // 使用前端传入的account参数
          }
        };
      } 
    });


Mock.mock(RegExp("/api/user/updateinfo" + ".*"), 'post', function(config){
        console.log(config);
        return{
            message: "提交成功！"
        }

});


Mock.mock(RegExp("/api/user/roommate" + ".*"), 'get', { data: [
    { username: "杨一轩1", studentID: "12000000", restTime: "23:00 - 9:00"},
    { username: "杨一轩2", studentID: "12000000", restTime: "23:00 - 9:00"},
    { username: "杨一轩3", studentID: "12000000", restTime: "23:00 - 9:00"},
    { username: "杨一轩4", studentID: "12000000", restTime: "23:00 - 9:00"}
    ]
    });

Mock.mock(RegExp("/api/user/Room" + ".*"), 'get', { data: [
    { area: "二期", building: "17栋", floor: "3楼", room: "304" },
    { area: "二期", building: "17栋", floor: "3楼", room: "304" },
    { area: "二期", building: "17栋", floor: "3楼", room: "304" }
    ]
    });
Mock.mock(RegExp("api/login/v1/login" + ".*"), 'get', function(){
    return {
        code: 0,
        data: "Student 1"
    }

});
Mock.mock(RegExp("api/main/v1/loadRoomInfo" + ".*"), 'get', function(config) {
    const param = config.url.split('?')[1];
    console.log(param);
    console.log("进入了 loadRoomInfo 拦截方法");
    return {
        code:0,
        data: {
            roomID: 1,
            area: "二期",
            building: "17栋",
            floor: "3",
            room: "312",
            like: "2",
            comments: "11111"
        },
    };
});
Mock.mock(RegExp("api/main/v1/addComment" + ".*"), 'post', function(config){
    console.log(config);
    console.log("进入了 add 拦截方法");
    return{
        code: 0
    }
});
Mock.mock(RegExp("api/main/v1/comments" + ".*"), 'get', function() {
    console.log("进入了 comments 拦截方法");
    return {
        code:0,
        data: [
            { user: "Student1", comment: "1111"},
            { user: "Student2", comment: "22222"},
        ]
    };
});
Mock.mock(RegExp("api/forum/post/loadPost" + ".*"), 'get', function() {
    console.log("进入了 loadPost 拦截方法");
    return {
        code:0,
        data: [
            { id: 1, title: "1111"},
            { id: 2, title: "2222"},
        ]
    };
});
Mock.mock(RegExp("api/forum/group/loadGroup" + ".*"), 'get', function() {
    console.log("进入了 loadGroup 拦截方法");
    return {
        code:0,
        data: [
            { id: 1, groupName: "Group 1"},
            { id: 2, groupName: "Group 2"},
        ]
    };
});
Mock.mock(RegExp("api/forum/post/searchPost" + ".*"), 'get', function(options) {
    // 从请求参数中获取groupID
    const postID = options.url.split('=')[1];
    // 根据不同的groupID返回不同的模拟数据
    let responseData;
    if (postID === '1') {
        responseData = {
            code: 0,
            data: {
                user: "Student1",
                sleep: "23:00",
                wake: "9:00",
                content: "null",
            },
        };
    } else if (postID === '2') {
        responseData = {
            code: 0,
            data: {
                user: "Student2",
                sleep: "00:00",
                wake: "10:00",
                content: "null",
            },
        };
    } else {
        // 处理未知的groupID
        responseData = {
            code: -1,
            msg: "Unknown postID",
        };
    }

    return responseData;
});
Mock.mock(RegExp("api/forum/group/searchGroup" + ".*"), 'get', function(options) {
    // 从请求参数中获取groupID
    const groupID = options.url.split('=')[1];
    console.log(options.url)
    console.log("进入了 searchGroup 拦截方法，groupID:", groupID);
    // 根据不同的groupID返回不同的模拟数据
    let responseData;
    if (groupID === '1') {
        responseData = {
            code: 0,
            data: {
                leader: "Student 1",
                members: "Student 1, Student 2",
                sleep: "23:00",
                wake: "9:00",
                content: "Group 1 Data",
            },
        };
    } else if (groupID === '2') {
        responseData = {
            code: 0,
            data: {
                leader: "Student 3",
                members: "Student 3, Student 4",
                sleep: "22:30",
                wake: "8:30",
                content: "Group 2 Data",
            },
        };
    } else {
        // 处理未知的groupID
        responseData = {
            code: -1,
            msg: "Unknown groupID",
        };
    }

    return responseData;
});


Mock.mock(RegExp("api/chat/message/MsgOverview" + ".*"), 'get', function() {
    console.log("进入了 MsgOverview 拦截方法");
    return {
        code:0,
        data: [
            { id: 111, type: "组队信息"},
            { id: 222, type: "帖子信息"},
        ]
    };
});

Mock.mock(RegExp("/api/chat/message/MsgData" + ".*"), 'get', function(config) {
    console.log(config.url);
    const param = config.url.split('?')[1]; // 通过config.url获取GET请求的参数
    const msgID = param.split('=')[2];

    if (msgID === '111') {
    return {
        code:0,
        data: 
                {
                  sender: '系统',
                  title: '组队通知',
                  content: 'Student2已经加入了你的队伍'
                }
              
        
    };}
    else if (msgID === '222') {
        return {
            code:0,
            data: 
                    {
                      sender: 'Student2',
                      title: '求组队啊啊啊',
                      content: '我觉得很不错'
                    }
                  
            
        };}
    
});


export default Mock;

