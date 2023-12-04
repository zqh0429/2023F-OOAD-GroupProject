<template>
    <div class="body">
        <div class="data">
            <div class="forumtext">
                <h2>SUSTech Dormitory Selection</h2>
            </div>
            <div class="menus">
                <el-button type="primary" @click.prevent="goToUser">个人中心</el-button>
                <el-button @click.prevent="goToMain">主页</el-button>
                <el-button>论坛</el-button>
                <el-badge :value="info" class="item">
                    <el-button @click.prevent="goToChat">消息通知</el-button>
                </el-badge>
            </div>
            <div>
                <el-button @click="showContent('button1')" @click.prevent="loadPost">Post</el-button>
                <el-button @click="showContent('button2')" @click.prevent="loadGroup">Group Info</el-button>
                <div>
                    <div v-if="activeButton === 'button1'">
                        <el-container>
                            <el-header>
                                <el-row :gutter="10">
                                    <el-col :span="16">
                                        <el-input v-model="input_post" class="" placeholder="Type Post ID">
                                            <template #prefix>
                                                <el-icon class="el-input__icon"><search /></el-icon>
                                            </template>
                                        </el-input>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-button @click="searchPostByInput">Search</el-button>
                                    </el-col>
                                </el-row>
                            </el-header>
                            <el-container>
                                <el-aside width="200px">
                                    <el-table
                                        ref="singleTableRef"
                                        :data="postOverviewData"
                                        highlight-current-row
                                        style="width: 100%"
                                        @current-change="searchPost"
                                    >
                                        <el-table-column prop="id" label="" width="70"/>
                                        <el-table-column prop="title" label="Title" />
                                    </el-table>
                                </el-aside>
                                <el-container>
                                    <el-main>
                                        <el-descriptions
                                            direction="vertical"
                                            :column="4"
                                            :size="size"
                                            border
                                        >
                                            <el-descriptions-item label="User">{{ postInfo.user }}</el-descriptions-item>
                                            <el-descriptions-item label="Time to Sleep">{{ postInfo.sleep }}</el-descriptions-item>
                                            <el-descriptions-item label="Time to Wake Up" :span="2">{{ postInfo.wake }}</el-descriptions-item>
                                            <el-descriptions-item label="Description">
                                                {{ postInfo.content }}
                                            </el-descriptions-item>
                                        </el-descriptions>
                                    </el-main>
                                    <el-footer>
                                        <el-button type="primary" @click="addPost"> + </el-button>
                                        <div class="pagination-block">
                                            <el-pagination layout="prev, pager, next" :total="50" />
                                        </div>
                                    </el-footer>
                                </el-container>
                            </el-container>
                        </el-container>
                    </div>
                    <div v-if="activeButton === 'button2'">
                        <el-container>
                            <el-header>
                                <el-row :gutter="10">
                                    <el-col :span="16">
                                        <el-input v-model="input_group" class="" placeholder="Type Group ID">
                                            <template #prefix>
                                                <el-icon class="el-input__icon"><search /></el-icon>
                                            </template>
                                        </el-input>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-button @click="searchGroupByInput">Search</el-button>
                                    </el-col>
                                </el-row>
                            </el-header>
                            <el-container>
                                <el-aside width="200px">
                                    <el-table
                                        ref="singleTableRef"
                                        :data="groupOverviewData"
                                        highlight-current-row
                                        style="width: 100%"
                                        @current-change="searchGroup"
                                    >
                                        <el-table-column prop="id" label="" width="70"/>
                                        <el-table-column prop="groupName" label="Group Name" />
                                    </el-table>
                                </el-aside>
                                <el-container>
                                    <el-main>
                                        <el-descriptions
                                            direction="vertical"
                                            :column="4"
                                            border
                                        >
                                            <el-descriptions-item label="Leader">{{ groupInfo.leader }}</el-descriptions-item>
                                            <el-descriptions-item label="Time to Sleep">{{ groupInfo.sleep }}</el-descriptions-item>
                                            <el-descriptions-item label="Time to Wake Up" :span="2">{{ groupInfo.wake }}</el-descriptions-item>
                                            <el-descriptions-item label="Members">{{ groupInfo.members }}</el-descriptions-item>
                                            <el-descriptions-item label="Description">
                                                {{ groupInfo.content }}
                                            </el-descriptions-item>
                                        </el-descriptions>
                                    </el-main>
                                    <el-footer>
                                        <el-button type="primary" @click="joinGroup">Join</el-button>
                                        <div class="pagination-block">
                                            <el-pagination layout="prev, pager, next" :total="50" />
                                        </div>
                                    </el-footer>
                                </el-container>
                            </el-container>
                        </el-container>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ref} from "vue";
import {Search} from '@element-plus/icons-vue'
import {mapState} from "vuex";

export default {
    name: 'forumPanel',
    setup() {
    },
    data() {
        return {
            info: 3,
            activeButton: 'button1',
            input_post : ref(''),
            input_group: ref(''),
            groupID: null,
            postID: null
        };
    },
    mounted() {
        this.$store.dispatch("forum/loadPost")
        this.$store.dispatch("forum/loadGroup")
    },
    methods: {
        showContent(button) {
            this.activeButton = button;
        },
        loadPost(){
            this.$store.dispatch("forum/loadPost")
            console.log(this.postOverviewData)
        },
        loadGroup(){
            this.$store.dispatch("forum/loadGroup")
        },
        searchPost(selection){
            this.postID = selection.id
            this.$store.dispatch("forum/searchPost",selection.id)
        },
        searchGroup(selection){
            this.groupID = selection.id
            this.$store.dispatch("forum/searchGroup",selection.id)
        },
        searchPostByInput(){
            this.$store.dispatch("forum/searchPost",this.input_post)
        },
        searchGroupByInput(){
            this.$store.dispatch("forum/searchGroup",this.input_group)
        },
        joinGroup(){
            this.$store.dispatch("forum/joinGroup",this.groupID)
        },
        addPost(){
          //TODO:add new post
        },
        goToMain() {
            // 导航到/main页面
            this.$router.push('/main');
        },
        goToUser() {
            // 导航到/user页面
            this.$router.push('/user');
        },
        goToChat() {
            // 导航到/forum页面
            this.$router.push('/chat');
        }
    },
    computed: {
        ...mapState('forum', {
            postOverviewData: state => state.postOverviewData,
            groupOverviewData: state => state.groupOverviewData,
            postInfo: state => state.postInfo,
            groupInfo: state => state.groupInfo
            // postID: state => state.postID,
            // groupID: state => state.groupID
        })
    },
    components: {
        Search
    }
}
</script>

<style>
.centered-text {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px; /* 这个高度可以根据你的需求来调整 */
}
</style>
