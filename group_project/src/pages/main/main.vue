<template>
    <div class="mainbody">
        <div class="logindata">
            <div class="logintext">
                <h2>SUSTech Dormitory Selection</h2>
            </div>
            <div class="menus">
                <el-button type="primary">个人中心</el-button>
                <el-button>论坛</el-button>
                <el-button>消息通知</el-button>
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
                <el-button text @click="dialogVisible = true">
                    Search
                </el-button>
            </div>
            <div>
                <el-dialog v-model="dialogVisible" title="Room Information">
                    <el-descriptions
                        direction="vertical"
                        :column="4"
                        :size="size"
                        border
                    >
                        <el-descriptions-item label="Area">二期宿舍</el-descriptions-item>
                        <el-descriptions-item label="Location">17栋-202</el-descriptions-item>
                        <el-descriptions-item label="❤" :span="2">12</el-descriptions-item>
                        <el-descriptions-item label="Comments">
                            Student1: I love it!
                        </el-descriptions-item>
                    </el-descriptions>
                    <el-button type="primary">Comment</el-button> <!--click to add comments-->

                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>

import {ref} from "vue";

export default {
    name: 'mainPanel',
    data() {
        return {
            form: {
                password: "",
                username: "",
            },
            checked: false,
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    { max: 10, message: "不能大于10个字符", trigger: "blur" },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { max: 10, message: "不能大于10个字符", trigger: "blur" },
                ],
            },
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
            dialogVisible: ref(false)
        };
    },
    mounted() {
        if(localStorage.getItem("news")){
            this.form=JSON.parse(localStorage.getItem("news"))
            this.checked=true
        }
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
        showDialog() {
            this.dialogVisible = true; // 打开弹出窗口
        },
        closeDialog() {
            this.dialogVisible = false; // 关闭弹出窗口
        },
    },
    computed: {
        area_selected() {
            return !!this.value_area;
        },
        building_selected() {
            return !!this.value_building;
        },
        floor_selected() {
            return !!this.value_floor;
        },
    },
}
</script>

<style>

</style>
