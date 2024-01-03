<template>
    <div class="userbody">
        <div class="userdata">
            <div class="common-layout">
                <el-container>
                    <el-aside width="400px">
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <el-row class="demo-avatar demo-basic">
                                        <el-space wrap :size="25">
                                            <div class="demo-basic--circle">
                                                <div class="block">



                                                    <el-avatar :size="50" :src="getUserAvatarUrl()"
                                                        @click="showAvatarDialog" />
                                                </div>
                                            </div>
                                            <el-col :span="30">
                                                <h2 v-if="!isEditing">{{ userInfo.username }}</h2>
                                                <input v-else v-model="editedUserInfo.username">
                                                <!-- <h2>{{ userInfo.username }}</h2> -->
                                                <h3>{{ userInfo.studentID }}
                                                    <el-tag size="small" style=" margin-right: 10px;">{{ userInfo.gender
                                                    }}</el-tag>
                                                    <el-tag size="small">{{ userInfo.level }}</el-tag>
                                                </h3>
                                            </el-col>
                                        </el-space>
                                    </el-row>
                                </div>
                            </template>
                            <el-descriptions :column="2" direction="vertical">
                                <el-descriptions-item label="休息时间" v-if="!isEditing">{{ userInfo.restTime
                                }}</el-descriptions-item>
                                <el-descriptions-item label="休息时间" v-else>
                                    <div class="time">
                                        <el-time-select v-model="startTime" class="mr-4" placeholder="Start time"
                                            start="00:00" step="00:15" end="24:00" />
                                        <el-time-select v-model="endTime" placeholder="End time" start="00:00" step="00:15"
                                            end="24:00" />
                                    </div>

                                    <!-- <el-input
                                        v-model="editedUserInfo.restTime" /> -->
                                </el-descriptions-item>
                                <el-descriptions-item label="家乡" v-if="!isEditing">{{ userInfo.hometown
                                }}</el-descriptions-item>
                                <el-descriptions-item label="家乡" v-else><el-input
                                        v-model="editedUserInfo.hometown" /></el-descriptions-item>
                                <el-descriptions-item v-if="!isEditing">{{ userInfo.description }}</el-descriptions-item>
                                <el-descriptions-item v-else><el-input
                                        v-model="editedUserInfo.description" /></el-descriptions-item>

                            </el-descriptions>
                            <div v-if="isEditing">
                                <el-button @click="saveEdit">确认修改</el-button>
                                <el-button @click="cancelEdit">取消</el-button>
                            </div>
                            <div v-else>
                                <el-button @click="startEdit">编辑个人信息</el-button>
                            </div>
                        </el-card>
                        <el-card>
                            <el-steps :active="2" align-center>
                                <el-step title="研究生选房" :description="beginTime1 + ' - ' + endTime1" />
                                <el-step title="博士生选房" :description="beginTime2 + ' - ' + endTime2" />
                                <el-step title="候补调剂" description="Some description" />
                            </el-steps>
                        </el-card>
                    </el-aside>
                    <el-main>
                        <el-card class="box-card-bookmark" :height="10">
                            <template #header>
                                <div class="card-header">
                                    <span>收藏的房间</span>
                                    <!-- <el-button class="button" text>Operation button</el-button> -->
                                </div>
                            </template>
                            <div>
                                <el-table :data="roomData" style="width: 100%">
                                    <el-table-column prop="area" label="区划" width="180" />
                                    <el-table-column prop="building" label="楼栋" width="180" />
                                    <el-table-column prop="floor" label="楼层" />
                                    <el-table-column prop="number" label="房间号" />
                                    <el-table-column prop="room_star" label="收藏数" />
                                    <el-table-column label="操作">
                                        <template v-slot="scope">

                                            <el-button @click="check(scope.row)">查看</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                        <el-card class="box-card-bookmark" :height="15">
                            <template #header>
                                <div class="card-header">
                                    <span>我的组队</span>
                                    <el-button size="small" @click="quit">退出（解散）队伍</el-button>
                                    <!-- <el-button class="button" text>Operation button</el-button> -->
                                </div>
                            </template>
                            <div>
                                <el-table :data="roommateData" style="width: 100%" table-layout='auto'>
                                    <el-table-column label="用户名" width="180">
                                        <template v-slot="scope">
                                            <a href="javascript:void(0)" @click="see(scope.row)"
                                                style="text-decoration: underline">
                                                {{ scope.row.username }}
                                            </a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="studentID" label="学号" width="180" />
                                    <el-table-column prop="restTime" label="作息时间" width="180" />
                                    <el-table-column label="操作">
                                        <template v-slot="scope">

                                            <el-button @click="Kick(scope.row)">踢掉</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                    </el-main>
                </el-container>
            </div>

            <div>
                <el-dialog v-model="dialogVisible" title="Room Information" @opened="handleDialogOpened">
                    <el-descriptions direction="vertical" :column="4" border>
                        <el-descriptions-item label="Area">{{ roomInfo.room_region }}</el-descriptions-item>
                        <el-descriptions-item label="Location">{{ roomInfo.room_building }}栋</el-descriptions-item>
                        <el-descriptions-item label="❤" :span="2">{{ roomInfo.room_star }}</el-descriptions-item>
                        <el-descriptions-item label="Gender">{{ roomInfo.room_gender }}</el-descriptions-item>
                        <el-descriptions-item label="Level"><el-tag>{{ roomInfo.room_level
                        }}</el-tag></el-descriptions-item>
                    </el-descriptions>
                    <el-descriptions direction="vertical" :column="3" border>
                        <el-descriptions-item label="Description">{{ roomInfo.room_description }}</el-descriptions-item>
                    </el-descriptions>
                    <el-descriptions direction="vertical" :column="3" border>
                        <el-descriptions-item label="Comments">

                            <el-collapse accordion>
                                <el-collapse-item v-for="(comment, index) in comments" :key="index"
                                    :title="comment.user + ': ' + comment.comment" :name="index.toString()">
                                    <div v-if="comment.replies && comment.replies.length > 0">
                                        <div v-for="(reply, i) in comment.replies" :key="i" :title="reply.user">
                                            {{ reply.user }} RE @{{ reply.repliedUser }}: {{ reply.content }}
                                        </div>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </el-descriptions-item>
                    </el-descriptions>
                    <el-button type="primary" @click.prevent="choose">choose</el-button>
                </el-dialog>
            </div>
            <div>
                <el-dialog v-model="avatarDialogVisible" title="大头像" width="30%">
                    <el-avatar :size="150" :src="getUserAvatarUrl()" />
                    <el-upload class="avatar-uploader" action="http://127.0.0.1:8082/api/student/information/uploadAvatar"
                        :show-file-list="false" :data="{ student_id: accountNum }" :accept="'image/*'"
                        @on-success="handleUploadSuccess">
                        <el-button size="small" type="primary">更换头像</el-button>
                    </el-upload>
                </el-dialog>
            </div>
            <div>
                <transition name="fade">
                    <div v-if="showMsg" class="message-box">
                        <p>{{ msgChoose }}</p>
                    </div>
                </transition>
            </div>
            <div>
                <el-dialog v-model="InfoVisible" title="队友信息" width="30%">
                    <div class="block"> <el-avatar :size="50" :src="friend_url" /></div>
                    <el-descriptions direction="vertical" :column="4" border>
                        <el-descriptions-item label="Name">{{ Friend.username }}</el-descriptions-item>
                        <el-descriptions-item label="From">{{ Friend.hometown }}</el-descriptions-item>
                        <el-descriptions-item label="Description" :span="2">{{ Friend.description }}</el-descriptions-item>

                    </el-descriptions>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import axios from 'axios'
export default {
    name: 'userPanel',
    data() {
        return {
            showMsg: false,
            editedUserInfo: {
                restTime: "",
                hometown: "",
                description: "",
                username: ""
            },
            isEditing: false,
            dialogVisible: false,
            avatarDialogVisible: false,
            startTime: "",
            endTime: "",
            pic: null,
            InfoVisible: false,
            friend_url: null,
            Friend:{
                username:"",
                hometown:"",
                description:""
            }
        };
    },
    computed: {
        ...mapState('DataProcess', {
            userInfo: state => state.userInfo,
            accountNum: state => state.accountNum,
            roomData: state => state.roomData,
            roommateData: state => state.roommateData,
            beginTime1: state => state.beginTime1,
            endTime1: state => state.endTime1,
            beginTime2: state => state.beginTime2,
            endTime2: state => state.endTime2,
            avatar: state => state.avatar,
            // Friend:state => state.Friend
            // pic_url:state => state.pic_url
            // avatar:state => state.avatar
        }),
        ...mapState('main', {
            roomInfo: state => state.roomInfo,
            selectedRoom: state => state.selectedRoom,
            comments: state => state.comments,
            msg: state => state.msg,
            msgChoose: state => state.msgChoose
        }),

    },
    mounted() {
        this.$store.dispatch("DataProcess/getUserInfo");
        this.$store.dispatch("DataProcess/getRoomData");
        this.$store.dispatch("DataProcess/getRoommateData");
        this.$store.dispatch("DataProcess/getUserAvatar");



        // if(localStorage.getItem("news")){
        //     this.form=JSON.parse(localStorage.getItem("news"))
        //     this.checked=true
        // }
    },
    methods: {
        handleUploadSuccess() {
            this.$store.dispatch("DataProcess/getUserAvatar");
        },
        startEdit() {  //“开始编辑”
            this.editedUserInfo.restTime = this.userInfo.restTime;
            this.editedUserInfo.hometown = this.userInfo.hometown;
            this.editedUserInfo.description = this.userInfo.description;
            this.editedUserInfo.username = this.userInfo.username;
            this.isEditing = true;
        },
        getUserAvatarUrl() {

            console.log(this.userInfo.circleUrl)

            const avatarData = this.avatar;

            // 创建头像的 Data URL
            // const imageUrl = 'data:image/png;base64,' + avatarData;
            const imageUrl = 'data:image/png;base64,' + avatarData;
            console.log(imageUrl)
            return imageUrl
        },


        saveEdit() {

            let time = `${this.startTime} - ${this.endTime}`;
            console.log(time);
            this.editedUserInfo.restTime = time
            this.userInfo.restTime = this.editedUserInfo.restTime;
            this.userInfo.hometown = this.editedUserInfo.hometown;
            this.userInfo.description = this.editedUserInfo.description;
            this.userInfo.username = this.editedUserInfo.username;
            this.isEditing = false;

            if (
                this.startTime === "" ||
                this.endTime === "" ||
                this.editedUserInfo.hometown === "" ||
                this.editedUserInfo.description === "" ||
                this.editedUserInfo.username === "") {

                alert("Please full-enter the values");
            }

            else (
                this.$store.dispatch("DataProcess/saveUserInfo"))
        },
        cancelEdit() {  //“取消”
            this.isEditing = false;
        },
        showAvatarDialog() {
            this.avatarDialogVisible = true;
        },

        check(row) {
            this.dialogVisible = true
            this.selectedRoom.area = row.area
            this.selectedRoom.building = row.building
            this.selectedRoom.floor = row.floor
            this.selectedRoom.room = row.room


        },
        handleDialogOpened() {
            this.$store.dispatch("main/loadRoomInfo")
            this.$store.dispatch("main/listComment")
        },
        see(row) {
            console.log(row.studentID)
            const ID =row.studentID
            console.log(ID)
            const dataServerUrl = "http://127.0.0.1:8082";
            const params = {
                studentId: ID
            };

            // const params = {
            //     student_id  : ID
            // };
            const url1 = `${dataServerUrl}/api/student/information/downloadAvatar`;
            axios.get(url1, {params:{student_id  : ID}})
                .then(resp => {
                    console.log(resp.data)
                   this.friend_url='data:image/png;base64,' + resp.data.data
                }, errResp => {
                    console.log(errResp)
                })

            const url = `${dataServerUrl}/api/student/information/show/`;
            axios.get(url, { params })
                .then(resp => {
                    console.log(resp.data)
                    this.Friend = resp.data.data
                    this.InfoVisible = true
                }, errResp => {
                    console.log(errResp)
                })

            console.log(ID)
        },
        choose() {
            const info = {
                accountNum: this.accountNum,
                roomId: this.roomInfo.roomId

            }
            console.log(this.roomInfo)
            this.$store.dispatch("main/choose", info)
            this.showMessage()
        },
        showMessage() {
            this.showMsg = true;
            setTimeout(() => {
                this.showMsg = false;
            }, 3000); // 3秒后自动消失
        },
        quit() {
            this.$store.dispatch("DataProcess/quit")
        },
        Kick(row) {
            const info = {
                studentID: row.studentID,
                accountNum: this.userInfo.studentID
            }
            if (this.userInfo.studentID !== this.roommateData[0].studentID) {
                this.$message.success('你不是队长不能踢人')
            }
            this.$store.dispatch("DataProcess/kick", info)
        }
    }



}
</script>

<style>
.el-descriptions {
    margin-top: 20px;
}

.message-box {
    position: fixed;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    background-color: #2486b740;
    color: white;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 9999;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
