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
                            <template v-if="!ifChat">
                                <el-descriptions v-for="(message, index) in msgInfo" :key="index" direction="vertical"
                                    :column="4" :size="size" border>
                                    <el-descriptions-item label="Sender">{{ message.sender }}</el-descriptions-item>
                                    <el-descriptions-item label="Time">{{ message.time }}</el-descriptions-item>
                                    <el-descriptions-item label="Content">{{ message.content }}</el-descriptions-item>
                                </el-descriptions>
                            </template>
                            <template v-if="ifChat">
                                <div v-if="ifChat" style="display: flex; align-items: flex-start">
                                    <div v-if="ifChat"
                                        style="width: 200px;  margin-right: 10px; border: 1px solid #ddd; border-radius: 5px;">
                                        <div v-if="ifChat"
                                            style="padding: 20px 10px; border-bottom: 1px solid #ddd; color: #000; background-color: #eee">
                                            小组成员</div>
                                        <div v-if="ifChat" class="user-list-box">
                                            <div class="user-list-item" v-for="(item, index) in users" :key="index">
                                                <img :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
                                                    style="width: 30px; height: 30px; border-radius: 50%">
                                                <span style="margin-left: 10px">{{ item.username }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--  中间部分  -->
                                    <div v-if="ifChat"
                                        style="width: 50%; border: 1px solid #ddd; border-radius: 5px; background-color: #f1f1f1;">
                                        <div v-if="ifChat"
                                            style="padding: 20px 0; text-align: center; border-bottom: 1px solid #ddd; color: #000; background-color: #eee">
                                            聊天室</div>
                                        <div v-if="ifChat" class="im-message-box">
                                            <div v-for="item in messages" :key="item.id">
                                                <!--  右边的气泡 -->
                                                <div style="display: flex; flex-direction: row-reverse; align-items: flex-start"
                                                    v-if="item.sender_id === userInfo.studentID">
                                                    <img :src="item.circle_url" alt=""
                                                        style="width: 40px; height: 40px; border-radius: 50%; margin-left: 10px">
                                                    <div class="im-message im-message-right" v-html="item.content"
                                                        v-if="item.type === 'text'"></div>
                                                </div>
                                                <!--  左边的气泡 -->
                                                <div style="display: flex; align-items: flex-start" v-else>
                                                    <img :src="item.circle_url" alt=""
                                                        style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px">
                                                    <div style="width: 100%; ">
                                                        <div
                                                            style="color: #888; font-size: 12px; width: 50% ;text-align: left;">
                                                            {{ item.sender_name }}</div>
                                                        <div class="im-message im-message-left" v-html="item.content"
                                                            v-if="item.type === 'text'"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 输入区域 -->
                                        <div
                                            style="padding: 10px 5px; border-top: 1px solid #ddd; display: flex; align-items: center; width: 100%;">
                                            <el-popover placement="top" width="300" trigger="click">
                                                <div class="emoji-box">
                                                    <span v-for="(item, index) in emojis" :key="index"
                                                        style="margin-right: 5px; font-size: 20px; cursor: pointer"
                                                        v-html="item" @click="clickEmoji(item)"></span>
                                                </div>

                                                <template #reference>
                                                    <i class="fa fa-smile-o" style="font-size: 22px; color: #666;"></i>

                                                    <!-- <el-button style="margin-right: 16px">Click to activate</el-button> -->
                                                </template>

                                            </el-popover>


                                            <div id="im-content" contenteditable
                                                style="flex: 1; background-color: #fff; margin: 0 5px; padding: 10px; border: 1px solid #ddd; border-radius: 2px; outline: none; font-size: 14px;">
                                            </div>
                                            <el-button type="primary" @click="send" style="border: none">发送</el-button>
                                        </div>
                                    </div>
                                    <!--  中间部分结束  -->
                                </div>
                            </template>
                        </el-main>
                    </el-container>
                </el-container>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from "vuex";
import emojis from "@/assets/emoji";
let client
export default {
    name: 'chatPanel',
    data() {
        return {
            msgOverviewData: [
                { id: "", type: "组队信息" },
                { id: "", type: "帖子信息" },
                { id: "", type: "宿舍信息" },
                { id: "", type: "队伍聊天室" }

            ],
            ifChat: false,
            emojis: [],
            messages: []
        };
    },
    computed: {
        ...mapState('DataProcess', {
            // msgOverviewData: state => state.msgOverviewData,
            msgInfo: state => state.msgInfo,
            users: state => state.roommateData,
            userInfo: state => state.userInfo
            // msgID: state => state.msgID
        })
    },
    mounted() {
        this.$store.dispatch("DataProcess/getRoommateData");
        console.log(this.userInfo)
        this.emojis = emojis.split(',')//表情包加载
        let accountNum = window.btoa(encodeURI(this.userInfo.accountNum))
        let circlr_url = window.btoa(encodeURI(this.userInfo.circle_url))
        client = new WebSocket(`ws://localhost:8082/imserver/${accountNum}/${circlr_url}`)
        client.onopen = () => {
            console.log('websocket open')
        }
        client.onclose = () => {  // 页面刷新的时候和后台websocket服务关闭的时候
            console.log('websocket close')
        }
        client.onmessage = (msg) => {
            if (msg.data) {
                let json = JSON.parse(msg.data)
                if (json.sender_name && json.content) {  // 聊天消息
                    this.messages.push(json)

                }
                // if (json.users && json.users.length) {
                //     this.users = json.users
                //     console.log('onmessage', this.users)
                // }
            }
            console.log(msg)
        }
        // 加载聊天数据
        this.load()

    },
    methods: {
        clickEmoji(emoji) {
            document.getElementById('im-content').innerHTML += emoji
        },
        searchMsg(selection) {
            // this.msgID = selection.id;
            // console.log(this.msgID)
            if (selection.type === "组队信息") {
                this.ifChat = false;
                console.log(this.isChat)
                this.$store.dispatch("DataProcess/getMsgTeam")
            }
            else if (selection.type === "宿舍信息") {
                this.ifChat = false
                this.$store.dispatch("DataProcess/getMsgDom")
            }
            else if (selection.type === "帖子信息") {
                this.ifChat = false
                this.$store.dispatch("DataProcess/getMsgPost")
            }
            else if (selection.type === "队伍聊天室") {
                console.log(this.isChat)
                this.ifChat = true
                this.$message.success('欢迎进入群组聊天室')

            }

        },
        load() {
            const dataServerUrl = "http://127.0.0.1:8082";
            const url = `${dataServerUrl}/api/groupChat/load`;
            axios.get(url)
                .then(resp => {
                    console.log(resp.data)
                    this.messages = resp.data.data
                }, errResp => {
                    console.log(errResp)
                })
        },
        send() {
            let inputBox = document.getElementById('im-content')
            const content = inputBox.innerHTML
            if (!content) {
                this.$notify.error('请输入聊天内容')
                return
            }
            if (client) {
                let message = {
                    type: "text",
                    leader_id: this.users[0].studentID,
                    sender_id: this.userInfo.studentID,
                    sender_name: this.userInfo.username,
                    content: content
                }
                client.send(JSON.stringify(message))
            }
            inputBox.innerHTML = ''  // 清空输入框
        },

    }

}
</script>

<style>
.im-message-box {
    height: 50vh;
    padding: 10px;
    overflow-y: auto;
    background-color: white;
}

.emoji-box {
    height: 200px;
    overflow-y: scroll;
    line-height: 30px;
}

.user-list-box {
    height: calc(50vh + 60px);
    overflow-y: scroll;
    background-color: #f8f8ff;
}

.im-message-box::-webkit-scrollbar,
.emoji-box::-webkit-scrollbar,
.user-list-box::-webkit-scrollbar {
    width: 4px;
}

.im-message-box::-webkit-scrollbar-thumb,
.emoji-box::-webkit-scrollbar-thumb,
.user-list-box::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
}

.im-message-box::-webkit-scrollbar-track,
.emoji-box::-webkit-scrollbar-track,
.user-list-box::-webkit-scrollbar-track {
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
}

.im-message {
    font-size: 14px;
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    color: #000;
    max-width: 50%;
    line-height: 20px;
    width: fit-content;
}

.im-message-left {
    background-color: #DBEDFF;
}

.im-message-right {
    background-color: #26d470;
}

.im-message-download {
    background-color: #DBEDFF;
    cursor: pointer;
}

.user-list-item {
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    cursor: default;
    font-size: 14px;
}

.user-list-item:nth-last-child(1) {
    border: none;
}
</style>
