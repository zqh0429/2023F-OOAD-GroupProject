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
                    <el-descriptions direction="vertical" :column="3" border>
                        <el-descriptions-item label="Area">{{ roomInfo.room_region }}</el-descriptions-item>
                        <el-descriptions-item label="Location">{{ roomInfo.room_building }}-{{ roomInfo.room_number }}</el-descriptions-item>
                        <el-descriptions-item label="❤" :span="2">{{ roomInfo.room_star }}</el-descriptions-item>
                        <el-descriptions-item label="Gender">{{ roomInfo.room_gender }}</el-descriptions-item>
                        <el-descriptions-item label="Level"><el-tag>{{ roomInfo.room_level }}</el-tag></el-descriptions-item>
                    </el-descriptions>
                    <el-descriptions direction="vertical" :column="3" border>
                        <el-descriptions-item label="Comments">
                            <el-collapse accordion>
                                <el-collapse-item v-for="(comment, index) in comments" :key="index"
                                                  :title="comment.user + ': ' + comment.content" :name="index.toString()"
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
                    <el-button type="primary" @click.prevent="star">❤</el-button>
                    <el-button type="primary" @click.prevent="addCommentOrReply">Comment</el-button>
                    <el-button type="primary" :disabled="!isTimeInRange" @click.prevent="choose">choose</el-button>
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
                <component :is="currentComponent"></component>
            </div>
        </div>
    </div>
</template>


<script>
import { ref, computed } from "vue";
import { mapState, useStore } from "vuex";
import MapComponent from './MapComponent.vue';


export default {
    name: 'mainPanel',
    // props: ['user'],
    data() {
        return {
            showMsg: false,
            info: 3,
            value_area: ref(''),
            options_area: [{ value: '一期', label: '一期宿舍' },
            { value: '二期', label: '二期宿舍' },
            { value: 'hupan', label: '湖畔宿舍' }
            ],
            value_building: ref(''),
            options_building: [{ value: '1', label: '1栋', },
            { value: '2', label: '2栋', },
            { value: '3', label: '3栋', },
            { value: '4', label: '4栋', },
            { value: '5', label: '5栋', },
            { value: '6', label: '6栋', },
            { value: '7', label: '7栋', },
            { value: '8', label: '8栋', },
            { value: '9', label: '9栋', },
            { value: '10', label: '10栋', },
            { value: '11', label: '11栋', },
            { value: '12', label: '12栋', },
            { value: '13', label: '13栋', },
            { value: '14', label: '14栋', },
            { value: '15', label: '15栋', },
            { value: '16', label: '16栋', },
            { value: '17', label: '17栋', }
            ],
            value_floor: ref(''),
            options_floor: Array.from({ length: 20 }, (_, index) => ({
                value: (index + 1).toString(),
                label: (index + 1) + '楼'
            })),
            value_room: ref(''),
            options_room: Array.from({ length: 35 }, (_, index) => ({
                value: (index + 1).toString(),
                label: (index + 1) + '号房间'
            })),
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

    },setup() {
        // const beginTime = new Date('2023-12-25 08:00:00');
        // const endTime = new Date('2023-12-25 17:00:00');

        const store = useStore();

        const currentTime = ref(new Date());

        const isTimeInRange = computed(() => {
            if (store.state.DataProcess.userInfo.level ==="master"){
                const begin1 = new Date(store.state.DataProcess.beginTime1);
            const end1 = new Date(store.state.DataProcess.endTime1);
            console.log(begin1)
            console.log(currentTime)
            return currentTime.value >= begin1 && currentTime.value <= end1;
            }
            else if (store.state.DataProcess.userInfo.level ==="doctor"){
                const begin2 = new Date(store.state.DataProcess.beginTime2);
            const end2 = new Date(store.state.DataProcess.endTime2);
            console.log(begin2)
            console.log(currentTime)
            return currentTime.value >= begin2 && currentTime.value <= end2;
            }
         
            return true
        });

        return {
            isTimeInRange
        };
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
            this.$store.dispatch("main/listComment")

            this.$store.dispatch("main/loadRoomInfo", () => {
                // listComment执行完成后的操作

                this.$message.success(this.msg);
            })
            console.log(this.roomInfo);
            console.log(this.commentLine)
        },
        star(){
            const params = {roomID:this.roomInfo.roomId,studentID:this.userID}
            console.log(params)
            this.$store.dispatch("main/starCurrentRoom",params)
        },
        addCommentOrReply() {
            if (this.inputComment.trim() !== "") {
                if (!this.isReplyingComment) {
                    console.log(this.user)
                    this.commentLine.roomID = this.roomInfo.roomId
                    this.commentLine.user = this.userID
                    this.commentLine.comment = this.inputComment
                    console.log(this.commentLine);
                    this.$store.dispatch("main/addComment")
                } else {
                    this.replyLine.commentID = this.currentCommentID
                    this.replyLine.user = this.userID
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
                accountNum: this.userID,
              roomId:this.roomInfo.roomId

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
            msg: state => state.msg,
            msgChoose : state => state.msgChoose
            // inputComment: state => state.inputComment,
            // inputUser: state => state.inputUser
        }),
        ...mapState('DataProcess', {
            userID: state => state.userInfo.studentID
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
