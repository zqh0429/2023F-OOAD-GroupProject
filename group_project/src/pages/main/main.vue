<template>
    <div class="mainbody">
        <div class="maindata">
            <div class="searchRoom">
                <el-select v-model="value_area" class="m-2" placeholder="Area" @change="select_building()">
                    <el-option v-for="item in options_area" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-select v-model="value_building" class="m-2" placeholder="Building" @change="select_floor()"
                    :disabled=!area_selected>
                    <el-option v-for="item in options_building" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-select v-model="value_floor" class="m-2" placeholder="Floor" @change="select_room()"
                    :disabled=!building_selected>
                    <el-option v-for="item in options_floor" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-select v-model="value_room" class="m-2" placeholder="Room" :disabled=!floor_selected>
                    <el-option v-for="item in options_room" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-button @click="loadRoomInfo" type="primary">
                    Search
                </el-button>
            </div>
            <div>
                <el-dialog v-model="dialogVisible" title="Room Information" @opened="handleDialogOpened">
                    <el-descriptions direction="vertical" :column="4" border>
                        <el-descriptions-item label="Area">{{ roomInfo.area }}</el-descriptions-item>
                        <el-descriptions-item label="Location">{{ roomInfo.building }}-{{ roomInfo.room
                        }}</el-descriptions-item>
                        <el-descriptions-item label="❤" :span="2">{{ roomInfo.like }}</el-descriptions-item>
                        <el-descriptions-item label="Comments">
                            <el-collapse accordion>
                                <el-collapse-item v-for="(comment, index) in comments" :key="index"
                                    :title="comment.user + ': ' + comment.comment" :name="index.toString()"
                                    @click=replyComment(comment)>
                                    <div v-if="comment.replies && comment.replies.length > 0">
                                        <div v-for="(reply, i) in comment.replies" :key="i" :title="reply.user">
                                            {{ reply.user }} RE @{{ reply.repliedUser }}: {{ reply.content }}
                                        </div>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </el-descriptions-item>
                    </el-descriptions>
                    <el-input v-model="inputComment" placeholder="Please input" v-if="!isReplyingComment" />
                    <el-input v-model="inputComment" :placeholder=replyPlaceholder v-if="isReplyingComment" />
                    <el-button type="primary" @click.prevent="addCommentOrReply">Comment</el-button>
                    <el-button type="primary" @click.prevent="choose">choose</el-button>
                </el-dialog>
            </div>
            <div>
                <transition name="fade">
                    <div v-if="showMsg" class="message-box">
                        <p>{{ msg }}</p>
                    </div>
                </transition>
            </div>
            <div>
                <component :is="currentComponent"></component>
            </div>

        </div>
    </div>
</template>


<script>

import { ref } from "vue";
import { mapState } from "vuex";
import MapComponent from './MapComponent.vue';


export default {
    name: 'mainPanel',
    // props: ['user'],
    data() {
        return {
            showMsg: false,
            info: 3,
            value_area: ref(''),
            options_area: [{ value: '一期宿舍', label: '一期宿舍', },
            { value: '二期宿舍', label: '二期宿舍', }
            ],
            value_building: ref(''),
            options_building: [{ value: '8栋', label: '8栋', },
            { value: '9栋', label: '9栋', },
            { value: '10栋', label: '10栋', },
            { value: '17栋', label: '17栋', }
            ],
            value_floor: ref(''),
            options_floor: [{ value: '一楼', label: '一楼', },
            { value: '二楼', label: '二楼', }
            ],
            value_room: ref(''),
            options_room: [{ value: '1', label: '1', },
            { value: '2', label: '2', }
            ],
            dialogVisible: false,
            isLeavingComment: false,
            inputComment: ref(''),
            currentComponent: MapComponent,
            isReplyingComment: false,
            currentCommentID: null,
            currentRepliedUser: null,
            replyPlaceholder: null,
        };
    },
    mounted() {
        // if(localStorage.getItem("news")){
        //     this.form=JSON.parse(localStorage.getItem("news"))
        //     this.checked=true
        // }

    },
    methods: {
        select_building() {
            //TODO: load information from database
        },
        select_floor() {
            //TODO: load information from database
        },
        select_room() {
            //TODO: load information from database
        },
        loadRoomInfo() {
            this.dialogVisible = true;
            this.selectedRoom.room = this.value_room;
            this.selectedRoom.area = this.value_area;
            this.selectedRoom.floor = this.value_floor;
            this.selectedRoom.building = this.value_building;
        },
        handleDialogOpened() {
            // 在对话框打开时调用的方法
            this.$store.dispatch("main/loadRoomInfo")
            this.$store.dispatch("main/listComment")
            console.log(this.roomInfo);
            console.log(this.commentLine)
        },
        addCommentOrReply() {
            if (this.inputComment.trim() !== "") {
                if (!this.isReplyingComment) {
                    console.log(this.user)
                    this.commentLine.user = this.user
                    this.commentLine.comment = this.inputComment
                    console.log(this.commentLine);
                    this.$store.dispatch("main/addComment")
                } else {
                    this.replyLine.commentID = this.currentCommentID
                    this.replyLine.user = this.user
                    this.replyLine.repliedUser = this.currentRepliedUser
                    this.replyLine.reply = this.inputComment
                    console.log(this.replyLine);
                    this.$store.dispatch("main/addReply")
                }

            } else {
                alert("Please input comment")
            }
        },
        replyComment(comment) {
            this.isReplyingComment = !this.isReplyingComment
            this.currentRepliedUser = comment.user
            this.currentCommentID = comment.id
            this.replyPlaceholder = "RE @" + this.currentRepliedUser
        },
        choose() {
            const info = {
                accountNum: this.accountNum,
                area: this.roomInfo.area,
                building: this.roomInfo.building,
                floor: this.roomInfo.floor,
                room: this.roomInfo.room

            }
            this.$store.dispatch("main/choose", info)
            this.showMessage()
        },
        showMessage() {
            this.showMsg = true;
            setTimeout(() => {
                this.showMsg = false;
            }, 3000); // 3秒后自动消失
        }
    },
    computed: {
        ...mapState('main', {
            roomInfo: state => state.roomInfo,
            commentLine: state => state.commentLine,
            selectedRoom: state => state.selectedRoom,
            comments: state => state.comments,
            replyLine: state => state.replyLine,
            accountNum: state => state.accountNum,
            msg: state => state.msg
            // inputComment: state => state.inputComment,
            // inputUser: state => state.inputUser
        }),
        ...mapState('DataProcess', {
            user: state => state.userInfo.username
        }),
        area_selected() {
            return !!this.value_area;
        },
        building_selected() {
            return !!this.value_building;
        },
        floor_selected() {
            return !!this.value_floor;
        },
        leavingComments() {
            return !!this.isLeavingComment;
        }
    },
}
</script>

<style>
.searchRoom {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
