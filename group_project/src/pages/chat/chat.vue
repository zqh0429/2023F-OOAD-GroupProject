<template>
    <div class="chatbody">
        <div class="chatdata">
            <div class="chattext">
                <h2>SUSTech Dormitory Selection</h2>
            </div>
            <div class="menus">
                <el-button type="primary" @click.prevent="goToUser">个人中心</el-button>
                <el-button @click.prevent="goToMain">主页</el-button>
                <el-button @click.prevent="goToForum">论坛</el-button>
                <el-badge class="item">
                    <el-button>消息通知</el-button>
                </el-badge>
            </div>
            <div >
                            <el-container>
                                <el-aside width="200px">
                                    <el-table
                                        ref="singleTableRef"
                                        :data="msgOverviewData"
                                        highlight-current-row
                                        style="width: 100%"
                                        @current-change="searchMsg"
                                    >
                                        <el-table-column prop="id" label="" width="70"/>
                                        <el-table-column prop="type" label="Type" />
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
                                            <el-descriptions-item label="Sender">{{ msgInfo.sender }}</el-descriptions-item>
                                            <el-descriptions-item label="Title">{{ msgInfo.title }}</el-descriptions-item>
                                            <el-descriptions-item label="Content">
                                                {{ msgInfo.content }}
                                            </el-descriptions-item>
                                        </el-descriptions>
                                    </el-main>
                                </el-container>
                            </el-container>
                        
            </div>
        </div>
    </div>
</template>

<script>

import {mapState} from "vuex";

export default {
    name: 'chatPanel',
    data() {
        return {
            info: 3,
            chatName : "Student 2",
            inputMessage:''
        //     msgOverviewData:[
        //     { id: 111, title: "组队信息"},
        //     { id: 222, title: "帖子信息"},
        // ]
        };
    },
    computed: {
    ...mapState('DataProcess', {
        msgOverviewData: state => state.msgOverviewData,
        msgInfo: state => state.msgInfo,
        msgID:state => state.msgID
    })
  },
    mounted() {
        this.$store.dispatch("DataProcess/getMsgOverview");
        // if(localStorage.getItem("news")){
        //     this.form=JSON.parse(localStorage.getItem("news"))
        //     this.checked=true
        // }
    },
    methods:{
        searchMsg(selection){
            // this.msgID = selection.id;
            // console.log(this.msgID)
            this.$store.dispatch("DataProcess/getMsg",selection.id)
        },
        sendMessage(){
            //TODO:发送消息
        },
        getChatName(){

        },
        goToForum() {
            // 导航到/forum页面
            this.$router.push('/forum');
        },
        goToUser() {
            // 导航到/user页面
            this.$router.push('/user');
        },
        goToMain() {
            // 导航到/main页面
            this.$router.push('/main');
        }
    }

}
</script>

<style>

</style>
