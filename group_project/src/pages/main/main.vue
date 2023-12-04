<template>
    <div class="mainbody">
        <div class="maindata">
            <div class="maintext">
                <h2>SUSTech Dormitory Selection</h2>
            </div>
            <div class="maintext">
                <h2>{{user}}</h2>
            </div>
            <div class="menus">
                <el-button type="primary" @click.prevent="goToUser">个人中心</el-button>
                <el-button>主页</el-button>
                <el-button @click.prevent="goToForum">论坛</el-button>
                <el-badge :value="info" class="item">
                    <el-button @click.prevent="goToChat">消息通知</el-button>
                </el-badge>
            </div>
            <div class="searchRoom">
                <el-select v-model="value_area" class="m-2" placeholder="Area" @change="select_building()">
                    <el-option
                        v-for="item in options_area"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
                <el-select v-model="value_building" class="m-2" placeholder="Building" @change="select_floor()"
                           :disabled = !area_selected>
                    <el-option
                        v-for="item in options_building"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
                <el-select v-model="value_floor" class="m-2" placeholder="Floor" @change="select_room()"
                           :disabled = !building_selected>
                    <el-option
                        v-for="item in options_floor"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
                <el-select v-model="value_room" class="m-2" placeholder="Room"
                           :disabled = !floor_selected>
                    <el-option
                        v-for="item in options_room"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
                <el-button @click="loadRoomInfo" type="primary" >
                    Search
                </el-button>
            </div>
            <div>
                <el-dialog v-model="dialogVisible" title="Room Information" @opened="handleDialogOpened">
                    <el-descriptions
                        direction="vertical"
                        :column="4"
                        border
                    >
                        <el-descriptions-item label="Area">{{ roomInfo.area }}</el-descriptions-item>
                        <el-descriptions-item label="Location">{{ roomInfo.building }}-{{ roomInfo.room }}</el-descriptions-item>
                        <el-descriptions-item label="❤" :span="2">{{ roomInfo.like }}</el-descriptions-item>
                        <el-descriptions-item label="Comments">
                            <el-table :data="comments" style="width: 100%">
                                <el-table-column prop="user" width="180" />
                                <el-table-column prop="comment" width="180" />
                            </el-table>
                        </el-descriptions-item>
                    </el-descriptions>
                    <el-input v-model="inputComment" placeholder="Please input" />
                    <el-button type="primary" @click.prevent="addComment">Comment</el-button>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>

import {ref} from "vue";
import {mapState} from "vuex";

export default {
    name: 'mainPanel',
    // props: ['user'],
    data() {
        return {
            info: 3,
            value_area: ref(''),
            options_area:[{value: '一期宿舍', label: '一期宿舍',},
                {value: '二期宿舍', label: '二期宿舍',}
            ],
            value_building: ref(''),
            options_building:[{value: '8栋', label: '8栋',},
                {value: '9栋', label: '9栋',},
                {value: '10栋', label: '10栋',},
                {value: '17栋', label: '17栋',}
            ],
            value_floor: ref(''),
            options_floor:[{value: '一楼', label: '一楼',},
                {value: '二楼', label: '二楼',}
            ],
            value_room: ref(''),
            options_room:[{value: '1', label: '1',},
                {value: '2', label: '2',}
            ],
            dialogVisible:false,
            isLeavingComment: false,
            inputComment: ref(''),

        };
    },
    mounted() {
        // if(localStorage.getItem("news")){
        //     this.form=JSON.parse(localStorage.getItem("news"))
        //     this.checked=true
        // }

    },
    methods:{
        select_building(){
            //TODO: load information from database
        },
        select_floor(){
            //TODO: load information from database
        },
        select_room(){
            //TODO: load information from database
        },
        loadRoomInfo(){
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
        addComment() {
            if (this.inputComment.trim() !== ""){
                console.log(this.user)
                this.commentLine.user = this.user
                this.commentLine.comment = this.inputComment
                console.log(this.commentLine);
                this.$store.dispatch("main/addComment")
            }else {
                alert("Please input comment")
            }
        },
        goToForum() {
            // 导航到/forum页面
            this.$router.push('/forum');
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
    computed: {
        ...mapState('main', {
            roomInfo: state => state.roomInfo,
            commentLine: state => state.commentLine,
            selectedRoom: state => state.selectedRoom,
            comments: state => state.comments,
            user:state => state.user
            // inputComment: state => state.inputComment,
            // inputUser: state => state.inputUser
        }),
        ...mapState('DataProcess', {
            user:state => state.userInfo.username
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
        leavingComments(){
            return !!this.isLeavingComment;
        }
    },
}
</script>

<style>

</style>
