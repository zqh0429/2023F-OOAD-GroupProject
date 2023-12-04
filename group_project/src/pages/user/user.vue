<template>
    <div class="userbody">
        <div class="userdata">
            <div class="usertext">
                <h2>SUSTech Dormitory Selection</h2>
            </div>
            <div class="menus">
                <el-button type="primary">个人中心</el-button>
                <el-button @click.prevent="goToMain">主页</el-button>
                <el-button @click.prevent="goToForum">论坛</el-button>
                <!-- <el-badge :value="userInfo.info" class="item"> -->
                <el-badge  class="item">
                    <el-button @click.prevent="goToChat">消息通知</el-button>
                </el-badge>
            </div>
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
                                                <el-avatar :size="50" :src="userInfo.circleUrl" />
                                            </div>
                                        </div>
                                            <el-col :span="30">
                                                <h2 v-if="!isEditing">{{ userInfo.username }}</h2>
                                                <input v-else v-model="editedUserInfo.username">
                                                <!-- <h2>{{ userInfo.username }}</h2> -->
                                                <h3>{{ userInfo.studentID }}
                                                    <el-tag size="small">{{ userInfo.level }}</el-tag>
                                                </h3>
                                            </el-col>
                                        </el-space>
                                    </el-row>
                                </div>
                            </template>
                            <el-descriptions
                                :column="2"
                                direction="vertical"
                            >
                                <el-descriptions-item label="休息时间" v-if="!isEditing">{{ userInfo.restTime }}</el-descriptions-item>
                                <el-descriptions-item label="休息时间" v-else><el-input v-model="editedUserInfo.restTime" /></el-descriptions-item>
                                <el-descriptions-item label="家乡" v-if="!isEditing">{{ userInfo.hometown }}</el-descriptions-item>
                                <el-descriptions-item label="家乡" v-else><el-input v-model="editedUserInfo.hometown" /></el-descriptions-item>
                                <el-descriptions-item v-if="!isEditing">{{ userInfo.description }}</el-descriptions-item>
                                <el-descriptions-item v-else><el-input v-model="editedUserInfo.description" /></el-descriptions-item>
                            
                            </el-descriptions>
                            <div v-if="isEditing">
                                <el-button @click="saveEdit">确认修改</el-button>
                                <el-button @click="cancelEdit">取消</el-button>
                            </div>
                            <div v-else>
                                <el-button @click="startEdit">编辑个人信息</el-button>
                            </div>
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
                                    <el-table-column prop="room" label="房间号" />
                                </el-table>
                            </div>
                        </el-card>
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span>我的组队</span>
                                    <!-- <el-button class="button" text>Operation button</el-button> -->
                                </div>
                            </template>
                            <div>
                                <el-table :data="roommateData" style="width: 100%">
                                    <el-table-column prop="username" label="名称" width="180" />
                                    <el-table-column prop="studentID" label="学号" width="180" />
                                    <el-table-column prop="restTime" label="作息时间" width="180" />
                                </el-table>
                            </div>
                        </el-card>
                    </el-main>
                </el-container>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
// import axios from 'axios'
export default {
    name: 'userPanel',
    data() {
        return {
            editedUserInfo: {
                restTime: '',
                hometown: '',
                description: '',
                username:''
            },
            isEditing: false
        };
    },
  computed: {
    ...mapState('DataProcess', {
        userInfo: state => state.userInfo,
        accountNum: state => state.accountNum,
        roomData:state => state.roomData,
        roommateData:state => state.roommateData.$router
    })
  },
    mounted() {
        this.$store.dispatch("DataProcess/getUserInfo");
        this.$store.dispatch("DataProcess/getRoomData");
        this.$store.dispatch("DataProcess/getRoommateData");
        // if(localStorage.getItem("news")){
        //     this.form=JSON.parse(localStorage.getItem("news"))
        //     this.checked=true
        // }
    },
    methods:{
        startEdit() {  //“开始编辑”
        this.editedUserInfo.restTime = this.userInfo.restTime;
        this.editedUserInfo.hometown = this.userInfo.hometown;
        this.editedUserInfo.description = this.userInfo.description;
        this.editedUserInfo.username = this.userInfo.username;
        this.isEditing = true;
    },
        saveEdit() {
        this.userInfo.restTime = this.editedUserInfo.restTime;
        this.userInfo.hometown = this.editedUserInfo.hometown;
        this.userInfo.description = this.editedUserInfo.description;
        this.userInfo.username = this.editedUserInfo.username;
        this.isEditing = false;
        this.$store.dispatch("DataProcess/saveUserInfo");
    },
        cancelEdit() {  //“取消”
      this.isEditing = false;
    },
      
        goToMain() {
            // 导航到/main页面
            this.$router.push('/main');
        },
        goToForum() {
            // 导航到/forum页面
            this.$router.push('/forum');
        },
        goToChat() {
            // 导航到/forum页面
            this.$router.push('/chat');
        }
    },

}
</script>

<style>
.el-descriptions {
    margin-top: 20px;
}
</style>
