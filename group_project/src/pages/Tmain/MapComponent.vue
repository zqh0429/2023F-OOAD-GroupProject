<template>
    <div id="container"></div>
    <el-dialog v-model="dialogVisible" :title="buildingInfo.name" width="1000px">
        <el-tabs tab-position="left" style="height: 400px" class="demo-tabs">
            <el-tab-pane label="Info">
                <el-form :data="buildingInfo" label-width="10px">
                    <el-form-item><el-icon><Location /></el-icon>{{ buildingInfo.location }}</el-form-item>
                    <el-form-item><el-icon><Comment /></el-icon>{{ buildingInfo.comments }}</el-form-item>
                    <el-form-item>
                        <img :src="buildingInfo.img" width="600" height="350" alt="">
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="Floor">
                <el-row>
                    <el-card v-for="item in buildingInfo.rooms" :key="item.id" shadow="hover">
                        <h3>
                            <a @click="handleUserClick(item)">{{ item.room_region }}</a>
                        </h3>
                        <el-button @click="choose">Choose</el-button>
                    </el-card>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
    <div>
        <el-dialog v-model="checkRoomInfo" title="Room Information">
            <el-descriptions direction="vertical" :column="3" border>
                <el-descriptions-item label="Area">{{ curRoom.room_region }}</el-descriptions-item>
                <el-descriptions-item label="Location">{{ curRoom.room_type}}</el-descriptions-item>
                <el-descriptions-item label="❤" :span="2">{{ curRoom.room_star }}</el-descriptions-item>
                <el-descriptions-item label="Gender">{{ curRoom.room_gender }}</el-descriptions-item>
                <el-descriptions-item label="Level"><el-tag>{{ curRoom.room_level }}</el-tag></el-descriptions-item>
            </el-descriptions>
        </el-dialog>
    </div>
</template>

<script setup>
import AMapLoader from "@amap/amap-jsapi-loader";
// import { mapState } from 'vuex';
import {ref} from "vue";
import store from "@/store";
import {computed} from "vue-demi";
import {Comment, Location} from "@element-plus/icons-vue";

const dialogVisible = ref(false);
const checkRoomInfo= ref(false);
const  buildingInfo = computed(() => store.state.main.buildingInfo)
const userID = computed(() => store.state.DataProcess.userInfo.studentID)
const curRoom = {room_region: "102", room_type: 4, room_gender: "male", room_star: 2, room_level: "master"}
function choose() {
    const info = {
        accountNum: userID,
        roomId:this.roomInfo.roomId
    }
    store.dispatch("main/choose", info)
    this.showMessage()
}
function handleUserClick(room) {
  console.log(room)
  curRoom.room_region = room.room_region
  curRoom.room_gender = room.room_gender
  curRoom.room_star = room.room_star
  curRoom.room_type = room.room_type
  curRoom.room_level = room.room_level
    checkRoomInfo.value = true;
}
//进行地图初始化
function initMap() {
    AMapLoader.load({
        key: "e7a82015e4c7b5c80f33b7845c4ca9e8", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    })
        .then((AMap) => {
            const map = new AMap.Map("container", {
                viewMode: "3D",//设置地图容器id
                zoom: 18, //初始化地图级别
                center: [114.000411, 22.602982], //初始化地图中心点位置
                layers: [//只显示默认图层的时候，layers可以缺省
                    new AMap.TileLayer()//高德默认标准图层
                ],
            });
            AMap.plugin(["AMap.ToolBar", "AMap.Scale", "AMap.Geolocation","AMap.MapType","AMap.MouseTool"], function () {
                //异步同时加载多个插件
                // 添加地图插件
                map.addControl(new AMap.ToolBar()); // 工具条控件;范围选择控件
                map.addControl(new AMap.Scale()); // 显示当前地图中心的比例尺
                map.addControl(new AMap.Geolocation()); // 定位当前位置
                map.addControl(new AMap.MapType()); // 实现默认图层与卫星图,实时交通图层之间切换

                // 以下是鼠标工具插件
                // const mouseTool = new AMap.MouseTool(map);
                // mouseTool.rule();// 用户手动绘制折线图,测量距离
                // mouseTool.measureArea(); // 测量面积
            });
            const points = [
                { position: [114.000957, 22.60277], area:"二期",building: 17},
                { position: [113.998537, 22.601819], area:"二期",building: 10},
                { position: [113.998269, 22.601784], area:"二期",building: 9},
                { position: [114.000846, 22.60451], area:"荔园",building: 7}
            ];

            points.forEach(point => {
                const circle = new AMap.Circle({
                    center: point.position,  // 圆心位置
                    radius: 10,   // 半径，单位：米
                    strokeColor: '#FF33FF',  // 线条颜色
                    strokeWeight: 2,         // 线条宽度
                    fillColor: '#FF99FF',    // 填充颜色
                    fillOpacity: 0.2,        // 填充透明度
                });
                circle.setMap(map);  // 将圆形标记添加到地图上
                // 添加点击事件监听
                circle.on('click', function () {
                    dialogVisible.value = true; // 打开对话框
                    const params = {area: point.area, building: point.building}
                    store.dispatch("main/getBuildingInfo",params)
                    console.log(buildingInfo)
                });
            });

        })
        .catch((e) => {
            console.log(e);
        });
}
initMap();
</script>

<style scoped>
#container {
    padding: 0;
    margin: 0;
    width: 100%;
    height: calc(100vh - 50px);
}
</style>