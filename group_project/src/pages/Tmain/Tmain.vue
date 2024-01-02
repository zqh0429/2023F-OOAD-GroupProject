<template>
  <div class="mainbody">
    <div class="maindata">
      <div class="searchRoom" style="margin-bottom: 20px;">
  

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
            <el-descriptions-item v-if="!isEditing" label="Area">{{ roomInfo.room_region
              }}</el-descriptions-item>
            <el-descriptions-item v-else label="Area"><el-select v-model="roomRegion"
                                                                 v-bind:placeholder="roomRegion" class="m-2" @change="select_building()">
              <el-option v-for="item in options_area" :key="item.value" :label="item.label"
                         :value="item.value" /></el-select></el-descriptions-item>

            <el-descriptions-item v-if="!isEditing" label="Location">{{ roomInfo.room_building }}栋
            </el-descriptions-item>
            <el-descriptions-item v-else label="Location"><el-select v-model="roomBuilding" class="m-2"
                                                                     v-bind:placeholder="roomBuilding" @change="select_floor()" :disabled=!area_selected>
              <el-option v-for="item in options_building" :key="item.value" :label="item.label"
                         :value="item.value" />
            </el-select></el-descriptions-item>
            <el-descriptions-item v-if="!isEditing" label="❤" :span="2">{{ roomInfo.room_star
              }}</el-descriptions-item>
            <el-descriptions-item v-else label="Floor"><el-input v-model="roomFloor"
                                                                 @input="FloorValidateInput" /></el-descriptions-item>
            <el-descriptions-item v-if="isEditing" label="Number"><el-input v-model="roomNumber"
                                                                            @input="RoomValidateInput" /></el-descriptions-item>
            <el-descriptions-item v-if="!isEditing" label="Gender">{{ roomInfo.room_gender
              }}</el-descriptions-item>
            <el-descriptions-item v-else label="Gender"><el-select v-model="roomGender"> <el-option label="male"
                                                                                                    value="male"></el-option> <el-option label="female" value="female"></el-option> </el-select>
            </el-descriptions-item>
            <el-descriptions-item v-if="isEditing" label="Type"><el-select v-bind:placeholder="roomType"
                                                                           v-model="roomType"> <el-option label="单人间" value="1"></el-option> <el-option label="双人间"
                                                                                                                                                           value="2"></el-option><el-option label="三人间" value="3"></el-option><el-option
                label="四人间" value="3"></el-option> </el-select></el-descriptions-item>
            <el-descriptions-item v-else label="Capacity">{{ roomInfo.room_type }}</el-descriptions-item>
            <el-descriptions-item v-if="!isEditing" label="Level"><el-tag>{{ roomInfo.room_level
              }}</el-tag></el-descriptions-item>
            <el-descriptions-item v-else label="Level"><el-select v-bind:placeholder="roomGender"
                                                                  v-model="roomLevel"> <el-option label="master" value="master"></el-option> <el-option label="doctor"
                                                                                                                                                    value="doctor"></el-option> </el-select> </el-descriptions-item>
          </el-descriptions>

          <el-descriptions v-if="!isEditing" direction="vertical" :column="3" border>
            <el-descriptions-item label="Description">
              {{ roomInfo.room_description }}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions v-if="isEditing" direction="vertical" :column="3" border>
            <el-descriptions-item label="Description">
              <el-input v-model="roomDescription" />
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions v-if="!isEditing" direction="vertical" :column="3" border>
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


        <el-card class="box-card-bookmark" :height="10">
              <template #header>
                <div class="card-header">
                  <span style="margin-right: 50px;">宿舍信息一览</span>               
                </div>
              </template>
              <div>
                <el-table :data="allRoom" style="width: 100%">
                  <el-table-column prop="room_region" label="宿舍区域" />
                  
                  <el-table-column prop="room_building" label="楼栋">
                  </el-table-column>

                  <el-table-column prop="room_floor" label="楼层">
                  </el-table-column>
                  <el-table-column prop="room_number" label="房间">
                  </el-table-column>
                  <el-table-column prop="room_gender" label="性别" width="80">

                  </el-table-column>
                  <el-table-column prop="room_level" label="学历" width="80">

                  </el-table-column>
                  <el-table-column prop="room_type" label="房间容量">

                  </el-table-column>


                 
                  <el-table-column label="操作">
                    <template v-slot="scope">
                    
                      <el-button v-if="isCancel" @click="firstDelete(scope.row)">删除</el-button>
                      <el-button v-if="!isCancel" @click="deleteRoom(scope.row)">确定删除</el-button>
                      <el-button v-if="!isCancel" @click="cancelFirstDelete">取消</el-button>
                    </template>
                  </el-table-column>
                </el-table>

              </div>
            </el-card>

      </div>
      
    </div>




    
  </div>

  <div>
    <el-dialog v-model="Visible" title="Add New Room">
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="Gender"><el-select v-model="roomGender"> <el-option label="male"
                                                                                         value="male"></el-option> <el-option label="female" value="female"></el-option> </el-select>
        </el-descriptions-item>
        <el-descriptions-item label="Level"><el-select v-model="roomLevel"> <el-option label="master"
                                                                                       value="master"></el-option> <el-option label="doctor" value="doctor"></el-option> </el-select>
        </el-descriptions-item>

        <el-descriptions-item label="Type"><el-select v-model="roomType"> <el-option label="单人间"
                                                                                     value="1"></el-option> <el-option label="双人间" value="2"></el-option><el-option label="三人间"
                                                                                                                                                                       value="3"></el-option><el-option label="四人间" value="4"></el-option>
        </el-select></el-descriptions-item>
        <el-descriptions-item label="Area">{{ value_area }}</el-descriptions-item>
        <el-descriptions-item label="Building">{{ value_building }}</el-descriptions-item>
        <el-descriptions-item label="Floor"><input v-model="roomFloor"
                                                   @input="FloorValidateInput" /></el-descriptions-item>
        <el-descriptions-item label="Room"><input v-model="roomNumber"
                                                  @input="RoomValidateInput" /></el-descriptions-item>
        <el-descriptions-item label="Description"><input v-model="roomDescription" /></el-descriptions-item>
      </el-descriptions>
      <el-button type="primary" @click.prevent="ConfirmAdd">ConfirmAdd</el-button>
    </el-dialog>
  </div>
</template>

<script>

import { ref } from "vue";
import { mapState } from "vuex";




export default {
  name: 'mainPanel',
  // props: ['user'],
  data() {
    return {
      Visible: false,
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
      isEditing: false,
      isLeavingComment: false,
      inputComment: ref(''),
      area: "",
      building: "",
      room: "",
      roomID: "",
      roomGender: "",
      roomLevel: "",
      roomType: "",
      roomFloor: "",
      roomNumber: "",
      roomDescription: "",
      roomRegion: "",
      roomBuilding: "",
      isCancel:true
    };
  },
  mounted() {
    // if(localStorage.getItem("news")){
    //     this.form=JSON.parse(localStorage.getItem("news"))
    //     this.checked=true
    // }
    this.$store.dispatch("main/listRoom")

  },
  methods: {
    firstDelete(row){this.isCancel = false
    this.roomInfo.roomId = row.roomId
    },
    cancelFirstDelete(){
      this.isCancel = true
    },
    deleteRoom(row) {
      this.roomInfo.roomId = row.roomId
      console.log(this.roomInfo.roomId)
      this.$store.dispatch("main/deleteRoom")
      // this.$store.dispatch("DataProcess/listRoom")
      
      this.isCancel=true

    },
    select_building() {
      //TODO: load information from database
    },
    select_floor() {
      //TODO: load information from database
    },
    select_room() {
      //TODO: load information from database
    },
    FloorValidateInput() {
      if (this.roomFloor !== '' && (isNaN(this.roomFloor) || this.roomFloor < 1 || this.roomFloor > 20 || !Number.isInteger(Number(this.roomFloor)))) {
        this.roomFloor = '';
        this.$message.success('请输入1-20以内的数字')
      }
    },
    RoomValidateInput() {
      if (this.roomNumber !== '' && (isNaN(this.roomNumber) || this.roomNumber < 1 || this.roomNumber > 30 || !Number.isInteger(Number(this.roomNumber)))) {
        this.roomNumber = '';
        this.$message.success('请输入1-30以内的数字')
      }
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
      //   this.$store.dispatch("main/listComment")
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
    Edit() {
      this.isEditing = true
      this.roomRegion = this.roomInfo.room_region
      this.roomBuilding = this.roomInfo.room_building
      this.roomLevel = this.roomInfo.room_level
      this.roomGender = this.roomInfo.room_gender
      this.roomDescription = this.roomInfo.room_description
      this.roomFloor = this.roomInfo.room_floor
      this.roomNumber = this.roomInfo.room_number
      this.roomType = this.roomInfo.room_type
    },
    Cancel() {
      this.isEditing = false
    },
    Submit() {
      this.isEditing = false
      const info = {
        roomId: this.roomInfo.roomId,
        room_region: this.roomRegion,
        room_building: this.roomBuilding,
        room_floor: this.roomFloor,
        room_number: this.roomNumber,
        room_gender: this.roomGender,
        room_level: this.roomLevel,
        room_description: this.roomDescription,
        room_type: this.roomType
      }
      this.$store.dispatch("main/EditRoom", info)
      this.roomInfo.area = this.area
      this.roomInfo.building = this.building
      this.roomInfo.room = this.room


    },
    ConfirmAdd() {

      this.selectedRoom.area = this.value_area;

      this.selectedRoom.building = this.value_building;
      const info = {
        room_region: this.selectedRoom.area,
        room_building: this.selectedRoom.building,
        room_floor: this.roomFloor,
        room_number: this.roomNumber,
        room_gender: this.roomGender,
        room_level: this.roomLevel,
        room_description: this.roomDescription,
        room_type: this.roomType,
      }
      this.$store.dispatch("main/AddRoom", info)
      this.Visible = false
    },
    addRoom() {
      this.Visible = true
    }

  },
  computed: {
    ...mapState('main', {
      roomInfo: state => state.roomInfo,
      commentLine: state => state.commentLine,
      selectedRoom: state => state.selectedRoom,
      comments: state => state.comments,
      user: state => state.user,
      allRoom:state => state.allRoom
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
}</style>