<template>
    <div id="app">
        <h2>
            <span class="font-bold text-lg">SUSTech Dormitory Selection</span>
        </h2>
        <el-container class="h-full">
            <el-aside width="200px">
                <el-menu
                    theme="light"
                    style="margin-right: 20px"
                    height="100%"
                    @select="changeHandler"
                    v-if="!accountValid"
                >
                    <el-menu-item index="main">
                        <el-icon><Position /></el-icon>登录
                    </el-menu-item>
                </el-menu>
                <el-menu
                    theme="light"
                    style="margin-right: 20px"
                    default-active="main"
                    height="100%"
                    @select="changeHandler"
                    v-if="accountValid"
                >
                    <el-menu-item index="main">
                        <el-icon><OfficeBuilding /></el-icon>宿舍信息
                    </el-menu-item>
                    <el-menu-item index="forum">
                        <el-icon><ChatDotRound /></el-icon>论坛区
                    </el-menu-item>
                    <el-menu-item index="chat">
                        <el-icon><Bell /></el-icon>消息通知
                    </el-menu-item>
                    <el-menu-item index="user">
                        <el-icon><User /></el-icon>个人中心
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { useRouter } from "vue-router";
import {Bell, ChatDotRound, OfficeBuilding, Position, User} from "@element-plus/icons-vue";
import {computed} from "vue-demi";
import store from "@/store";


export default {
    name: "App",
    components: {Position, OfficeBuilding, ChatDotRound, Bell, User},
    setup() {
        const router = useRouter();
        const accountValid = computed(() => store.state.login.accountValid)
        const changeHandler = (index) => {
            router.push({ path: "/" + index });
        };

        return {
            changeHandler,
            accountValid
        };

    },
};
</script>

<style>
html, body {
    height: 100%;
    margin: 0;
    padding: 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
}
</style>
