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
export default Mock;

