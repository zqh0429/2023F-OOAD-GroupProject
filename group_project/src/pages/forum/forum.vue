<template>
    <div class="forumbody">
        <div class="forumdata">
            <div class="forumtext">
                <h2>SUSTech Dormitory Selection</h2>
            </div>
            <div class="menus">
                <el-button type="primary" @click.prevent="goToUser">个人中心</el-button>
                <el-button @click.prevent="goToMain">主页</el-button>
                <el-button>论坛</el-button>
                <el-badge :value="info" class="item">
                    <el-button @click.prevent="goToChat">消息通知</el-button>
                </el-badge>
            </div>
            <div>
                <el-button @click="showContent('button1')">Post</el-button>
                <el-button @click="showContent('button2')">Group Info</el-button>
                <el-button @click="showContent('button3')">My Group</el-button>
                <div>
                    <div v-if="activeButton === 'button1'">
                        <el-container>
                            <el-header>
                                <el-row :gutter="10">
                                    <el-col :span="16">
                                        <el-input v-model="input_post" class="" placeholder="Type something">
                                            <template #prefix>
                                                <el-icon class="el-input__icon"><search /></el-icon>
                                            </template>
                                        </el-input>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-button @click="searchPost">Search</el-button>
                                    </el-col>
                                </el-row>
                            </el-header>
                            <el-container>
                                <el-aside width="200px">
                                    <el-table
                                        ref="singleTableRef"
                                        :data="postOverviewData"
                                        highlight-current-row
                                        style="width: 100%"
                                        @current-change="loadPost"
                                    >
                                        <el-table-column property="index" label="" width="70"/>
                                        <el-table-column property="title" label="Title" />
                                    </el-table>
                                </el-aside>
                                <el-container>
                                    <el-main>
                                        <el-descriptions
                                            direction="vertical"
                                            :column="4"
                                            :size="size"
                                            border
                                        >
                                            <el-descriptions-item label="User">Student1</el-descriptions-item>
                                            <el-descriptions-item label="Time to Sleep">00:00</el-descriptions-item>
                                            <el-descriptions-item label="Time to Wake Up" :span="2">9:30</el-descriptions-item>
                                            <el-descriptions-item label="Description">
                                                喜欢打篮球，不吵闹，生活作息良好，求组队！
                                            </el-descriptions-item>
                                        </el-descriptions>
                                    </el-main>
                                    <el-footer>
                                        <div class="pagination-block">
                                            <el-pagination layout="prev, pager, next" :total="50" />
                                        </div>
                                    </el-footer>
                                </el-container>
                            </el-container>
                        </el-container>
                    </div>
                    <div v-if="activeButton === 'button2'">
                        <el-container>
                            <el-header>
                                <el-row :gutter="10">
                                    <el-col :span="16">
                                        <el-input v-model="input_groupInfo" class="" placeholder="Type something">
                                            <template #prefix>
                                                <el-icon class="el-input__icon"><search /></el-icon>
                                            </template>
                                        </el-input>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-button @click="searchGroup">Search</el-button>
                                    </el-col>
                                </el-row>
                            </el-header>
                            <el-container>
                                <el-aside width="200px">
                                    <el-table
                                        ref="singleTableRef"
                                        :data="groupOverviewData"
                                        highlight-current-row
                                        style="width: 100%"
                                        @current-change="loadGroup"
                                    >
                                        <el-table-column property="groupID" label="" width="70"/>
                                        <el-table-column property="groupName" label="Group Name" />
                                    </el-table>
                                </el-aside>
                                <el-container>
                                    <el-main>
                                        <el-descriptions
                                            direction="vertical"
                                            :column="4"
                                            :size="size"
                                            border
                                        >
                                            <el-descriptions-item label="Leader">Student2</el-descriptions-item>
                                            <el-descriptions-item label="Time to Sleep">00:00</el-descriptions-item>
                                            <el-descriptions-item label="Time to Wake Up" :span="2">9:30</el-descriptions-item>
                                            <el-descriptions-item label="Members">Student3,Student4</el-descriptions-item>
                                            <el-descriptions-item label="Description">
                                                欢迎大家加入！
                                            </el-descriptions-item>
                                        </el-descriptions>
                                    </el-main>
                                    <el-footer>
                                        <div class="pagination-block">
                                            <el-pagination layout="prev, pager, next" :total="50" />
                                        </div>
                                    </el-footer>
                                </el-container>
                            </el-container>
                        </el-container>
                    </div>
                    <div v-if="activeButton === 'button3'"> <el-container>
                        <el-header class="centered-text">
                            早睡不起队
                        </el-header>
                        <el-container>
                            <el-container>
                                <el-main>
                                    <el-descriptions
                                        direction="vertical"
                                        :column="4"
                                        :size="size"
                                        border
                                    >
                                        <el-descriptions-item label="Leader">Student2</el-descriptions-item>
                                        <el-descriptions-item label="Time to Sleep">00:00</el-descriptions-item>
                                        <el-descriptions-item label="Time to Wake Up" :span="2">9:30</el-descriptions-item>
                                        <el-descriptions-item label="Members">Student3,Student4</el-descriptions-item>
                                        <el-descriptions-item label="Description">
                                            欢迎大家加入！
                                        </el-descriptions-item>
                                    </el-descriptions>
                                </el-main>
                                <el-aside width="400px">
                                    <el-card class="box-card">
                                        <template #header>
                                            <div class="card-header">
                                                <span>Messages</span>
                                            </div>
                                        </template>
                                        <div class="text item">
                                            {{ myGroupMessageData }}
                                        </div>
                                        <el-divider />
                                        <el-space direction="vertical">
                                            <el-input v-model="input_groupMessage"
                                                      placeholder="Please input"
                                                      :style="{ width: '350px', height: '100px' }"
                                                      />
                                            <el-button type="primary" class="button">Send</el-button>
                                        </el-space>
                                    </el-card>
                                </el-aside>
                            </el-container>
                        </el-container>
                    </el-container>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ref} from "vue";
import {Search} from '@element-plus/icons-vue'

export default {
    name: 'forumPanel',
    setup() {
    },
    data() {
        return {
            info: 3,
            activeButton: 'button1',
            input_post : ref(''),
            input_groupInfo: ref(''),
            input_myGroup:ref(''),
            input_groupMessage:ref(''),
            postOverviewData:[
                {index:'01', title:'11'},
                {index:'02', title:'2222'},
            ],
            groupOverviewData:[
                {groupID: '01', groupName: '一定早睡'}
            ],
            myGroupMessageData: "Student2: hi" //TODO: load the message data
        };
    },
    mounted() {
        if(localStorage.getItem("news")){
            this.form=JSON.parse(localStorage.getItem("news"))
            this.checked=true
        }
    },
    methods: {
        showContent(button) {
            this.activeButton = button;
        },
        searchPost(){
            //TODO: load post data from database
        },
        searchGroup(){
            //TODO: load post data from database
        },
        loadPost(){
            //TODO: load a particular post
        },
        loadGroup(){
            //TODO: load a particular group
        },
        goToMain() {
            // 导航到/main页面
            this.$router.push('/main');
        },
        goToUser() {
            // 导航到/user页面
            this.$router.push('/user');
        },
        goToChat() {
            // 导航到/forum页面
            this.$router.push('/chat');
        }
    },
    components: {
        Search
    }
}
</script>

<style>
.centered-text {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px; /* 这个高度可以根据你的需求来调整 */
}
</style>
