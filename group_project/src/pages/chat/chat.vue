<template>
    <div class="chatbody">
        <div class="chatdata">
            <div class="chattext">
                <h2>SUSTech Dormitory Selection</h2>
            </div>
            <div class="menus">
                <el-button type="primary" @click.prevent="goToUser">个人中心</el-button>
                <el-button @click.prevent="goToMain">主页</el-button>
                <el-button @click.prevent="goToForum">论坛</el-button>
                <el-badge class="item">
                    <el-button>消息通知</el-button>
                </el-badge>
            </div>
            <div class="common-layout">
                <el-container>
                    <el-aside width="200px">
                        <el-table
                            ref="singleTableRef"
                            :data="msgOverviewData"
                            highlight-current-row
                            style="width: 100%"
                            @current-change="loadMessage"
                        >
                            <el-table-column property="name" @click.prevent="getChatName"/>
                        </el-table>
                    </el-aside>
                    <el-main>
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span>{{ chatName }}</span>
                                    <el-button class="button" text>Operation button</el-button>
                                </div>
                            </template>
                            <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
                            <el-divider />
                            <el-space direction="vertical">
                                <el-input v-model="inputMessage"
                                          placeholder="Please input"
                                          :style="{ width: '350px', height: '100px' }"
                                />
                                <el-button type="primary" class="button"
                                           @click.prevent="sendMessage">Send</el-button>
                            </el-space>
                        </el-card>
                    </el-main>
                </el-container>
            </div>
        </div>
    </div>
</template>

<script>


import {ref} from "vue";

export default {
    name: 'chatPanel',
    data() {
        return {
            info: 3,
            msgOverviewData:[
                {name: "Student 2"}
            ],
            chatName : "Student 2",
            inputMessage:ref(''),
        };
    },
    mounted() {
        if(localStorage.getItem("news")){
            this.form=JSON.parse(localStorage.getItem("news"))
            this.checked=true
        }
    },
    methods:{
        sendMessage(){
            //TODO:发送消息
        },
        getChatName(){

        },
        goToForum() {
            // 导航到/forum页面
            this.$router.push('/forum');
        },
        goToUser() {
            // 导航到/user页面
            this.$router.push('/user');
        },
        goToMain() {
            // 导航到/main页面
            this.$router.push('/main');
        }
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
