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
        </div>
    </div>
</template>

<script>


export default {
    name: 'chatPanel',
    data() {
        return {
            info: 3,
        };
    },
    mounted() {
        if(localStorage.getItem("news")){
            this.form=JSON.parse(localStorage.getItem("news"))
            this.checked=true
        }
    },
    methods:{
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
