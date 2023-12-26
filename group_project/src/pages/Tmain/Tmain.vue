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
                <el-button :disabled=!building_selected @click="addRoom" type="primary">
                    Add
                </el-button>
                <el-button @click="loadRoomInfo" type="primary">
                    Search
                </el-button>
            </div>
            <div>
                <el-dialog v-model="dialogVisible" title="Room Information" @opened="handleDialogOpened">
                    <el-descriptions direction="vertical" :column="4" border>
                        <el-descriptions-item v-if="!isEditing" label="Area">{{ roomInfo.room_region  }}</el-descriptions-item>
                        <el-descriptions-item v-else label="Area"><el-select v-model="region" class="m-2" placeholder="Area"
                                @change="select_building()">
                                <el-option v-for="item in options_area" :key="item.value" :label="item.label"
                                    :value="item.value" /></el-select></el-descriptions-item>

                        <el-descriptions-item v-if="!isEditing" label="Location">{{ roomInfo.room_building }}-{{ roomInfo.room
                        }}</el-descriptions-item>
                        <el-descriptions-item v-else label="Location"><el-select v-model="building" class="m-2"
                                placeholder="Building" @change="select_floor()" :disabled=!area_selected>
                                <el-option v-for="item in options_building" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select></el-descriptions-item>
                        <el-descriptions-item v-if="!isEditing" label="❤" :span="2">{{ roomInfo.room_star
                        }}</el-descriptions-item>
                        <el-descriptions-item v-else label="Room"><el-input v-model="room" /></el-descriptions-item>
                        <el-descriptions-item label="Comments">
                            <el-table :data="comments" style="width: 100%">
                                <el-table-column prop="user" width="180" />
                                <el-table-column prop="comment" width="180" />
                            </el-table>
                        </el-descriptions-item>
                    </el-descriptions>
                    <el-button v-if="!isEditing" type="primary" @click.prevent="Edit">Edit</el-button>
                    <el-button v-else type="primary" @click.prevent="Submit">Submit</el-button>
                    <el-button v-if="!isEditing" type="primary" @click.prevent="deleteRoom">Delete</el-button>
                    <el-button v-else type="primary" @click.prevent="Cancel">Cancel</el-button>
                </el-dialog>
            </div>

        </div>
    </div>

    <div>
        <el-dialog v-model="Visible" title="Add New Room">
            <el-descriptions direction="vertical" :column="4" border>
                <el-descriptions-item label="Area">{{ value_area }}</el-descriptions-item>
                <el-descriptions-item label="Building">{{ value_building }}</el-descriptions-item>
                <el-descriptions-item label="Room"><input v-model="roomID" /></el-descriptions-item>
            </el-descriptions>
            <el-button type="primary" @click.prevent="ConfirmAdd">ConfirmAdd</el-button>
        </el-dialog>
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
            Visible: false,
            info: 3,
            value_area: ref(''),
            options_area: [{ value: '一期', label: '一期宿舍', },
            { value: '二期', label: '二期宿舍', }
            ],
            value_building: ref(''),
            options_building: [{ value: '8', label: '8栋', },
            { value: '9', label: '9栋', },
            { value: '10', label: '10栋', },
            { value: '17', label: '17栋', }
            ],
            value_floor: ref(''),
            options_floor: [{ value: '1', label: '一楼', },
            { value: '2', label: '二楼', }
            ],
            value_room: ref(''),
            options_room: [{ value: '1', label: '1', },
            { value: '2', label: '2', }
            ],
            dialogVisible: false,
            isEditing: false,
            isLeavingComment: false,
            inputComment: ref(''),
            currentComponent: MapComponent,
            area: "",
            building: "",
            room: "",
            roomID : ""
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
        addComment() {
            if (this.inputComment.trim() !== "") {
                console.log(this.user)
                this.commentLine.user = this.user
                this.commentLine.comment = this.inputComment
                console.log(this.commentLine);
                this.$store.dispatch("main/addComment")
            } else {
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
        },
        deleteRoom() {
            this.$store.dispatch("main/deleteRoom")
        },
        Edit() {
            this.isEditing = true
        },
        Cancel() {
            this.isEditing = false
        },
        Submit() {
            this.isEditing = false
            const info = {
                previous_area: this.selectedRoom.area,
                previous_building: this.selectedRoom.building,
                previous_room: this.roomInfo.room,
                new_area: this.area,
                new_building: this.building,
                new_room: this.room
            }
            this.$store.dispatch("main/EditRoom", info)
            this.roomInfo.area = this.area
            this.roomInfo.building = this.building
            this.roomInfo.room = this.room


        },
        ConfirmAdd(){
            
            this.selectedRoom.area = this.value_area;
            
            this.selectedRoom.building = this.value_building;
          const info = {
            area: this.selectedRoom.area,
            building: this.selectedRoom.building,
            room: this.roomID
          } 
          this.$store.dispatch("main/AddRoom", info) 
          this.Visible = false
        },
        addRoom(){
            this.Visible = true
        }

    },
    computed: {
        ...mapState('main', {
            roomInfo: state => state.roomInfo,
            commentLine: state => state.commentLine,
            selectedRoom: state => state.selectedRoom,
            comments: state => state.comments,
            user: state => state.user
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
</style>
