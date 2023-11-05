<template>
    <div class="userbody">
        <div class="userdata">
            <div class="usertext">
                <h2>SUSTech Dormitory Selection</h2>
            </div>
            <div class="menus">
                <el-button type="primary">个人中心</el-button>
                <el-button @click.prevent="goToMain">主页</el-button>
                <el-button @click.prevent="goToForum">论坛</el-button>
                <el-badge :value="info" class="item">
                    <el-button @click.prevent="goToChat">消息通知</el-button>
                </el-badge>
            </div>
            <div class="common-layout">
                <el-container>
                    <el-aside width="400px">
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <el-row class="demo-avatar demo-basic">
                                        <el-space wrap :size="25">
                                        <div class="demo-basic--circle">
                                            <div class="block">
                                                <el-avatar :size="50" :src="circleUrl" />
                                            </div>
                                        </div>
                                            <el-col :span="30">
                                                <h2>{{ username }}</h2>
                                                <h3>{{ studentID }}
                                                    <el-tag size="small">{{ level }}</el-tag>
                                                </h3>
                                            </el-col>
                                        </el-space>
                                    </el-row>
                                </div>
                            </template>
                            <el-descriptions
                                :column="2"
                                direction="vertical"
                            >
                                <el-descriptions-item label="休息时间" >{{ restTime }}</el-descriptions-item>
                                <el-descriptions-item label="家乡">{{ hometown }}</el-descriptions-item>
                                <el-descriptions-item>{{ description }}</el-descriptions-item>
                            </el-descriptions>
                        </el-card>
                    </el-aside>
                    <el-main>
                        <el-card class="box-card-bookmark" :height="10">
                            <template #header>
                                <div class="card-header">
                                    <span>收藏的房间</span>
                                    <el-button class="button" text>Operation button</el-button>
                                </div>
                            </template>
                            <div>
                                <el-table :data="tableData" style="width: 100%">
                                    <el-table-column prop="area" label="区划" width="180" />
                                    <el-table-column prop="building" label="楼栋" width="180" />
                                    <el-table-column prop="floor" label="楼层" />
                                    <el-table-column prop="room" label="房间号" />
                                </el-table>
                            </div>
                        </el-card>
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span>我的组队</span>
                                    <el-button class="button" text>Operation button</el-button>
                                </div>
                            </template>
                            <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
                        </el-card>
                    </el-main>
                </el-container>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'userPanel',
    data() {
        return {
            username : "Student 1",
            studentID: 12330849,
            level: "硕士",
            info: 3,
            circleUrl:
                'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            restTime: "23:00 - 9:00",
            hometown: "广东深圳",
            description: "本科就读于南方科技大学，喜欢看书听音乐，不吵闹",
            tableData:[
                {area:"二期",building:"17栋",floor:"3楼",room:"304"},
                {area:"二期",building:"17栋",floor:"3楼",room:"304"},
                {area:"二期",building:"17栋",floor:"3楼",room:"304"}

            ]
        };
    },
    mounted() {
        if(localStorage.getItem("news")){
            this.form=JSON.parse(localStorage.getItem("news"))
            this.checked=true
        }
    },
    methods:{
        goToMain() {
            // 导航到/main页面
            this.$router.push('/main');
        },
        goToForum() {
            // 导航到/forum页面
            this.$router.push('/forum');
        },
        goToChat() {
            // 导航到/forum页面
            this.$router.push('/chat');
        }
    },
    computed: {

    },
}
</script>

<style>
.el-descriptions {
    margin-top: 20px;
}
</style>
