import Mock from 'mockjs'

// Mock.mock(RegExp("http://127.0.0.1:8082/api/user/updateinfo" + ".*"), 'post', function(config){
//     console.log(config);
//     return{
//         message: "提交成功！"
//     }

// });

// Mock.mock(RegExp("http://127.0.0.1:8082/api/groupChat/load" + ".*"), 'get', function(config){
//     console.log(config);
//     return{
//         code:0,
//         data:[{ id:1,sender_id: "1111", circle_url: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png", content: "666", type: "text",sender_name :"1"},
//         { id:2,sender_id: "2222", circle_url: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png", content: "6", type: "text",sender_name:"杨一轩" }]
//     }

// });
// Mock.mock(RegExp("http://127.0.0.1:8082/api/user/login/" + ".*"), 'get', function(){
//     return {
//         code: 0
//     }

// });

// Mock.mock(RegExp("http://127.0.0.1:8082/api/student/information/show/" + ".*"), 'get', function(config){
//     //不同账号返回不同参数
//     const param = config.url.split('?')[1]; // 通过config.url获取GET请求的参数
//     const accountNum = param.split('=')[1];
//     console.log(accountNum);
//     if(accountNum === '1111'){
//         return {
//             data: {
//                 username : "Student 1",
//                 studentID: '12330849',
//                 teacher: false,
//                 level: "硕士",
//                 circleUrl:
//                     'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
//                 restTime: "23:00 - 9:00",
//                 hometown: "广东深圳",
//                 description: "本科就读于南方科技大学，喜欢看书听音乐，不吵闹" // 使用前端传入的account参数
//             }
//         }}else if (accountNum === '2222') {
//         return {
//             data: {
//                 username : "Teacher 1",
//                 studentID: '12330849',
//                 teacher: true,
//                 level: "博士",
//                 circleUrl:
//                     'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
//                 restTime: "23:00 - 9:00",
//                 hometown: "广东深圳",
//                 description: "本科就读于清华，喜欢看书听音乐，不吵闹" // 使用前端传入的account参数
//             }
//         };
//     }
// });


// Mock.mock(RegExp("http://127.0.0.1:8082/api/main/v1/loadRoomInfo" + ".*"), 'get', function(config) {
//     const param = config.url.split('?')[1];
//     console.log(param);
//     console.log("进入了 loadRoomInfo 拦截方法");
//     return {
//         code:0,
//         data: {
//             roomId: 1,
//             room_region: "一期",
//             room_building: "8",
//             room_floor: "2",
//             room_number: "3",
//             room_star:"4",
//             room_type:"4",
//             room_gender:"男",
//             room_level:"硕士",
//             comments:""
//         },
//     };
// });


//
//
//
//
//
// Mock.mock(RegExp("/api/user/roommate" + ".*"), 'get', { data: [
//         { username: "杨一轩1", studentID: "12000000", restTime: "23:00 - 9:00"},
//         { username: "杨一轩2", studentID: "12000000", restTime: "23:00 - 9:00"},
//         { username: "杨一轩3", studentID: "12000000", restTime: "23:00 - 9:00"},
//         { username: "杨一轩4", studentID: "12000000", restTime: "23:00 - 9:00"}
//     ]
// });
//
// Mock.mock(RegExp("/api/user/Room" + ".*"), 'get', { data: [
//         { area: "二期", building: "17栋", floor: "3楼", room: "304" },
//         { area: "二期", building: "17栋", floor: "3楼", room: "304" },
//         { area: "二期", building: "17栋", floor: "3楼", room: "304" }
//     ]
// });
// Mock.mock(RegExp("/api/user/login/" + ".*"), 'get', function(){
//     return {
//         code: 0
//     }
//
// });

// Mock.mock(RegExp("api/main/v1/addComment" + ".*"), 'post', function(config){
//     console.log(config);
//     console.log("进入了 add 拦截方法");
//     return{
//         code: 0
//     }
// });
// Mock.mock(RegExp("api/main/v1/comments" + ".*"), 'get', function() {
//     console.log("进入了 comments 拦截方法");
//     return {
//         code:0,
//         data: [
//             { id: 1, user: "Student1", comment: "1111",
//                 replies:[{user:"Student 3", repliedUser:"Student 1",content: "aaa"},
//                     {user:"Student 4", repliedUser:"Student 3" ,content: "bbb"}]},
//             { id: 2, user: "Student2", comment: "22222"},
//         ]
//     };
// });
// Mock.mock(RegExp("api/main/v1/getBuildingInfo" + ".*"), 'get', function(options) {
//     const id = options.url.split('=')[1];
//     if (id === '1'){
//         return {
//             code:0,
//             data: { location: "学生宿舍二期17栋", comments: "1111",
//                 img:'../../assets/background.png',
//             rooms:[{id:1, room: 101, type: 4, gender: "male", star: 2, level: "master"},
//                 {id:1, room: 102, type: 4, gender: "male", star: 2, level: "master"},
//                 {id:1, room: 103, type: 4, gender: "male", star: 3, level: "master"},
//                 {id:1, room: 104, type: 4, gender: "male", star: 1, level: "master"}]}
//         };
//     }else if (id === '2'){
//         return {
//             code:0,
//             data: { location: "学生宿舍二期10栋", comments: "222" }
//         };
//     }else if (id === '3'){
//         return {
//             code:0,
//             data: { location: "学生宿舍二期9栋", comments: "222" }
//         };
//     }else if (id === '4'){
//         return {
//             code:0,
//             data: { location: "荔园", comments: "222" }
//         };
//     }
//
// });
// Mock.mock(RegExp("api/forum/post/loadPost" + ".*"), 'get', function() {
//     console.log("进入了 loadPost 拦截方法");
//     return {
//         code:0,
//         data: [
//             { id: 1, title: "1111"},
//             { id: 2, title: "2222"},
//         ]
//     };
// });
// Mock.mock(RegExp("api/forum/group/loadGroup" + ".*"), 'get', function() {
//     console.log("进入了 loadGroup 拦截方法");
//     return {
//         code:0,
//         data: [
//             { id: 1, groupName: "Group 1"},
//             { id: 2, groupName: "Group 2"},
//         ]
//     };
// });
// Mock.mock(RegExp("api/forum/post/listPostComment" + ".*"), 'get', function() {
//     console.log("进入了 loadGroup 拦截方法");
//     return {
//         code:0,
//         data: [
//             { id: 3, user: "Student1", comment: "post",
//                 replies:[{user:"Student 3", repliedUser:"Student 1",content: "aaa"},
//                     {user:"Student 4", repliedUser:"Student 3" ,content: "bbb"}]},
//             { id: 4, user: "Student2", comment: "22222"},
//         ]
//     };
// });
// Mock.mock(RegExp("api/forum/group/listGroupComment" + ".*"), 'get', function() {
//     console.log("进入了 loadGroup 拦截方法");
//     return {
//         code:0,
//         data: [
//             { id: 5, user: "Student1", comment: "group",
//                 replies:[{user:"Student 3", repliedUser:"Student 1",content: "aaa"},
//                     {user:"Student 4", repliedUser:"Student 3" ,content: "bbb"}]},
//             { id: 6, user: "Student2", comment: "22222"},
//         ]
//     };
// });
// Mock.mock(RegExp("api/forum/post/searchPost" + ".*"), 'get', function(options) {
//     // 从请求参数中获取groupID
//     const postID = options.url.split('=')[1];
//     // 根据不同的groupID返回不同的模拟数据
//     let responseData;
//     if (postID === '1') {
//         responseData = {
//             code: 0,
//             data: {
//                 title: "Title1",
//                 user: "Student1",
//                 sleep: "23:00",
//                 wake: "9:00",
//                 tags:["爱运动","社牛"],
//                 content: "null"
//             }
//         };
//     } else if (postID === '2') {
//         responseData = {
//             code: 0,
//             data: {
//                 title: "Title2",
//                 user: "Student2",
//                 sleep: "00:00",
//                 wake: "10:00",
//                 tags:["社恐"],
//                 content: "null",
//             },
//         };
//     } else {
//         // 处理未知的groupID
//         responseData = {
//             code: -1,
//             msg: "Unknown postID",
//         };
//     }
//
//     return responseData;
// });
// Mock.mock(RegExp("api/forum/group/searchGroup" + ".*"), 'get', function(options) {
//     // 从请求参数中获取groupID
//     const groupID = options.url.split('=')[1];
//     console.log(options.url)
//     console.log("进入了 searchGroup 拦截方法，groupID:", groupID);
//     // 根据不同的groupID返回不同的模拟数据
//     let responseData;
//     if (groupID === '1') {
//         responseData = {
//             code: 0,
//             data: {
//                 groupName: "Group 1",
//                 leader: "Student 1",
//                 members: "Student 1, Student 2",
//                 sleep: "23:00",
//                 wake: "9:00",
//                 tags:["社恐"],
//                 content: "Group 1 Data",
//             },
//         };
//     } else if (groupID === '2') {
//         responseData = {
//             code: 0,
//             data: {
//                 groupName: "Group 2",
//                 leader: "Student 3",
//                 members: "Student 3, Student 4",
//                 sleep: "22:30",
//                 wake: "8:30",
//                 tags:["早起"],
//                 content: "Group 2 Data",
//             },
//         };
//     } else {
//         // 处理未知的groupID
//         responseData = {
//             code: -1,
//             msg: "Unknown groupID",
//         };
//     }
//
//     return responseData;
// });
// Mock.mock(RegExp("api/forum/post/addPost" + ".*"), 'get', function(config){
//     console.log(config);
//     console.log("进入了 add 拦截方法");
//     return{
//         code: 0
//     }
// });
// Mock.mock(RegExp("api/forum/group/addGroup" + ".*"), 'get', function(config){
//     console.log(config);
//     console.log("进入了 add 拦截方法");
//     return{
//         code: 0
//     }
// });
// Mock.mock(RegExp("api/chat/message/MsgOverview" + ".*"), 'get', function() {
//     console.log("进入了 MsgOverview 拦截方法");
//     return {
//         code:0,
//         data: [
//             { id: 111, type: "组队信息"},
//             { id: 222, type: "帖子信息"},
//             { id: 333, type: "宿舍信息"},
//         ]
//     };
// });

// Mock.mock(RegExp("/api/chat/message/MsgDataTeam" + ".*"), 'get', function(config) {
//     console.log(config.url);
//     const param = config.url.split('?')[1]; // 通过config.url获取GET请求的参数
//     console.log(param)
//
//
//
//         return {
//             code:0,
//             data:
//             [
//                     { sender: 'Sender 1', title: 'Team', content: 'Content 1' },
//                     { sender: 'Sender 2', title: 'Title 2', content: 'Content 2' }
//                     // 添加更多的消息信息
//                 ]
//
//
//         };
//
//
// });
//
// Mock.mock(RegExp("/api/chat/message/MsgDataDom" + ".*"), 'get', function(config) {
//     console.log(config.url);
//     const param = config.url.split('?')[1]; // 通过config.url获取GET请求的参数
//     console.log(param)
//
//
//
//         return {
//             code:0,
//             data:
//             [
//                     { sender: 'Sender 1', title: 'Dom', content: 'Content 1' },
//                     { sender: 'Sender 2', title: 'Title 2', content: 'Content 2' }
//                     // 添加更多的消息信息
//                 ]
//
//
//         }
//
//
// });
//
// Mock.mock(RegExp("/api/chat/message/MsgDataPost" + ".*"), 'get', function(config) {
//     console.log(config.url);
//     const param = config.url.split('?')[1]; // 通过config.url获取GET请求的参数
//     console.log(param)
//
//
//
//         return {
//             code:0,
//             data:
//             [
//                     { sender: 'Sender 1', title: 'Post', content: 'Content 1' },
//                     { sender: 'Sender 2', title: 'Title 2', content: 'Content 2' }
//                     // 添加更多的消息信息
//                 ]
//
//
//         }
//
//
// });

//教师端宿舍管理
// Mock.mock(RegExp("/api/main/v1/deleteRoom" + ".*"), 'post', function() {
//     console.log("进入了 deleteRoom 拦截方法");
//     return {
//         code:0,
//         data: {
//             roomID: "",
//             area: "",
//             building: "",
//             floor: "",
//             room: "",
//             like:"",
//             comments:""
//         }
//     };
// });




// Mock.mock(RegExp("/api/Tstudent/userData" + ".*"), 'get', function() {
//     console.log("进入了 deleteRoom 拦截方法");
//     return {
//         code:0,
//         data: [
//             {accountNum:12011429, username:"Gordon", password:"666",gender:"男",level:"硕士", address:"一期八栋3楼5号房间", editable: false},
//             {accountNum:12011429, username:"Gordon", password:"666",gender:"男",level:"硕士", address:"一期八栋3楼5号房间", editable: false},
//             {accountNum:12011429, username:"Gordon", password:"666",gender:"男",level:"硕士", address:"一期八栋3楼5号房间", editable: false},
//             {accountNum:12011429, username:"Gordon", password:"666",gender:"男",level:"硕士", address:"一期八栋3楼5号房间", editable: false}
//         ]
//     };
// });
//
//
//
//
// Mock.mock(RegExp("/api/Tstudent/setUserData" + ".*"), 'post', function(config) {
//     console.log(config);
//     return {
//         code:0
//     };
// });
//
//
// Mock.mock(RegExp("/api/Tstudent/addUser" + ".*"), 'post', function(config) {
//     console.log(config);
//     return {
//         code:0
//     };
// });
// Mock.mock(RegExp("/api/Tselect/memberData" + ".*"), 'get', function() {
//     console.log("进入了 memberData 拦截方法");
//     return {
//         code:0,
//         data: [
//             {room_gender:"男",room_level:"博士",room_locate:"二期13栋2楼2号房间" , room_type: "4", Student1:"杨一轩" , Student2:"杨一轩", Student3:"杨一轩", Student4:"杨一轩"},
//             {room_gender:"男",room_level:"博士",room_locate:"二期13栋2楼2号房间" , room_type: "4", Student1:"杨一轩" , Student2:"杨一轩", Student3:"杨一轩", Student4:"杨一轩"},
//             {room_gender:"男",room_level:"博士",room_locate:"二期13栋2楼2号房间" , room_type: "4", Student1:"杨一轩" , Student2:"杨一轩", Student3:"杨一轩", Student4:"杨一轩"},
//             {room_gender:"男",room_level:"博士",room_locate:"二期13栋2楼2号房间" , room_type: "4", Student1:"杨一轩" , Student2:"杨一轩", Student3:"杨一轩", Student4:"杨一轩"},
//             {room_gender:"男",room_level:"博士",room_locate:"二期13栋2楼2号房间" , room_type: "4", Student1:"杨一轩" , Student2:"杨一轩", Student3:"杨一轩", Student4:"杨一轩"}
//         ]
//     };
// });
//
// Mock.mock(RegExp("/api/main/v1/editRoom" + ".*"), 'post', function(config) {
//     console.log(config);
//     return {
//         code:0
//     };
// });

Mock.mock(RegExp("/api/Tselect/setEnd1" + ".*"), 'post', function(config) {
    console.log(config);
    return {
        code:0
    };
});

Mock.mock(RegExp("/api/Tselect/setBegin1" + ".*"), 'post', function(config) {
    console.log(config);
    return {
        code:0
    };
});


Mock.mock(RegExp("/api/Tselect/setEnd2" + ".*"), 'post', function(config) {
    console.log(config);
    return {
        code:0
    };
});

Mock.mock(RegExp("/api/Tselect/setBegin2" + ".*"), 'post', function(config) {
    console.log(config);
    return {
        code:0
    };
});

// Mock.mock(RegExp("/api/main/v1/addRoom" + ".*"), 'post', function(config) {
//     console.log(config);
//     return {
//         code:0
//     };
// });

// Mock.mock(RegExp("/api/main/v1/chooseRoom" + ".*"), 'post', function(config) {
//     console.log(config);
//     return {
//         code:0,
//         msg:"添加成功！"
//     };
// });


export default Mock;