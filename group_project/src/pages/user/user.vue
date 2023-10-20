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
                <el-button>消息通知</el-button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'userPanel',
    data() {
        return {

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
        }
    },
    computed: {

    },
}
</script>

<style>

</style>
