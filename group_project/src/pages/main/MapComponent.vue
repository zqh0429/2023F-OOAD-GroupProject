<template>
    <div id="container"></div>
    <el-dialog v-model="dialogVisible" title="Building Information">
        <el-form :data="buildingInfo" label-width="80px">
            <el-form-item label="Name">{{ buildingInfo.name }}</el-form-item>
            <el-form-item label="Comments">{{ buildingInfo.comments }}</el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import AMapLoader from "@amap/amap-jsapi-loader";
// import { mapState } from 'vuex';
import {ref} from "vue";
import store from "@/store";
import {computed} from "vue-demi";

const dialogVisible = ref(false);
const  buildingInfo = computed(() => store.state.main.buildingInfo)
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
                { position: [114.000957, 22.60277], id:1},
                { position: [113.998537, 22.601819], id:2},
                { position: [113.998269, 22.601784], id:3},
                { position: [114.000846, 22.60451], id:4}
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
                    store.dispatch("main/getBuildingInfo",point.id)
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