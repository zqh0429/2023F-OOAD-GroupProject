<template>
    <div class="chatbody">
        <div class="chatdata">
            <div>
                <el-container>
                    <el-aside width="200px">
                        <el-table ref="singleTableRef" :data="msgOverviewData" highlight-current-row style="width: 100%"
                            @current-change="searchMsg">
                            <el-table-column prop="id" label="" width="70" />
                            <el-table-column prop="type" label="Type" />
                        </el-table>
                    </el-aside>
                    <el-container>
                        <el-main>
                            <!-- <el-descriptions
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
                                        </el-descriptions> -->
                            <el-descriptions v-for="(message, index) in msgInfo" :key="index" direction="vertical"
                                :column="4" :size="size" border>
                                <el-descriptions-item label="Sender">{{ message.sender }}</el-descriptions-item>
                                <el-descriptions-item label="Title">{{ message.title }}</el-descriptions-item>
                                <el-descriptions-item label="Content">{{ message.content }}</el-descriptions-item>
                            </el-descriptions>
                        </el-main>
                    </el-container>
                </el-container>

            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from "vuex";

export default {
    name: 'chatPanel',
    data() {
        return {
            info: 3,
            chatName: "Student 2",
            inputMessage: '',
                msgOverviewData:[
                { id: "", type: "组队信息"},
                { id: "", type: "帖子信息"},
                { id: "", type: "宿舍信息"}
                
            ],

            // msgInfo: [
            //     { sender: 'Sender 1', title: 'Title 1', content: 'Content 1' },
            //     { sender: 'Sender 2', title: 'Title 2', content: 'Content 2' },
            //     // 添加更多的消息信息
            // ]
        };
    },
    computed: {
        ...mapState('DataProcess', {
            // msgOverviewData: state => state.msgOverviewData,
            msgInfo: state => state.msgInfo
            // msgID: state => state.msgID
        })
    },
    mounted() {
        // this.$store.dispatch("DataProcess/getMsgOverview");
        // if(localStorage.getItem("news")){
        //     this.form=JSON.parse(localStorage.getItem("news"))
        //     this.checked=true
        // }
    },
    methods: {
        searchMsg(selection) {
            // this.msgID = selection.id;
            // console.log(this.msgID)
             if(selection.type === "组队信息"){
                this.$store.dispatch("DataProcess/getMsgTeam")
             }
             else if(selection.type === "宿舍信息"){
                this.$store.dispatch("DataProcess/getMsgDom")
             }
             if(selection.type === "帖子信息"){
                this.$store.dispatch("DataProcess/getMsgPost")
             }
            
        },
        sendMessage() {
            //TODO:发送消息
        },
        getChatName() {

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

<style></style>
