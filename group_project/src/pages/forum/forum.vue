<template>
    <div class="body">
        <div class="data">
            <div>
                <el-button @click="showContent('button1')" @click.prevent="loadPost">Post</el-button>
                <el-button @click="showContent('button2')" @click.prevent="loadGroup">Group Info</el-button>
                <div>
                    <div v-if="activeButton === 'button1'">
                        <el-container>
                            <el-header>
                                <el-row :gutter="10">
                                    <el-select v-model="searchBy" class="m-2" placeholder="Select">
                                        <el-option
                                            v-for="item in searchMethods"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        />
                                    </el-select>
                                    <div class="demo-time-range" v-if="searchBy === 'WakeUp' || searchBy === 'Sleep'">
                                        <el-time-select v-model="startTime"  class="mr-4"
                                                        placeholder="Start time" start="00:00" step="00:15" end="24:00"/>
                                        <el-time-select v-model="endTime" placeholder="End time"
                                                        start="00:00" step="00:15" end="24:00"/>
                                    </div>
                                    <el-select-v2
                                        v-if="searchBy ==='Tag'" v-model="tagValue" :options="tagOptions" placeholder="Please select"
                                        style="width: 240px" multiple/>
                                    <el-button @click="searchPostByOption">Search</el-button>
                                    <el-button type="primary" @click="openDialog"> + </el-button>
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
                                        <label>{{this.postInfo.title}}</label>
                                        <el-descriptions direction="vertical" :column="3" border>
                                            <el-descriptions-item label="User" :span="1">{{ postInfo.user }}</el-descriptions-item>
                                            <el-descriptions-item label="Time to Sleep" :span="1">{{ postInfo.sleep }}</el-descriptions-item>
                                            <el-descriptions-item label="Time to Wake Up" :span="1">{{ postInfo.wake }}</el-descriptions-item>
                                        </el-descriptions>
                                        <el-descriptions direction="vertical" :column="1" border>
                                            <el-descriptions-item label="Tags">
                                                <el-row>
                                                    <div v-for="(tag,index) in postInfo.tags" :key="index">
                                                        <el-tag size="small">{{ tag }}</el-tag>
                                                    </div>
                                                </el-row>
                                            </el-descriptions-item>
                                            <el-descriptions-item label="Description">
                                                {{ postInfo.content }}
                                            </el-descriptions-item>
                                            <el-descriptions-item label="Comments">
                                                <el-collapse accordion>
                                                    <el-collapse-item v-for="(comment, index) in commentsPost" :key="index"
                                                                      :title="comment.user+': '+comment.content" :name="index.toString()"
                                                                      @click=replyComment(comment)>
                                                        <div v-if="comment.replies && comment.replies.length > 0" >
                                                            <div v-for="(reply, i) in comment.replies" :key="i" :title="reply.user">
                                                                {{reply.user}} RE @{{reply.repliedUser}}: {{reply.content}}
                                                            </div>
                                                        </div>
                                                    </el-collapse-item>
                                                </el-collapse>
                                            </el-descriptions-item>
                                        </el-descriptions>
                                        <el-input v-model="inputComment" placeholder="Please input" v-if="!isReplyingComment"/>
                                        <el-input v-model="inputComment" :placeholder=replyPlaceholder v-if="isReplyingComment"/>
                                        <el-button type="primary" @click.prevent="addPostCommentOrReply">Comment</el-button>
                                    </el-main>
                                    <el-footer>
                                    </el-footer>
                                </el-container>
                            </el-container>
                        </el-container>
                        <div>
                            <el-dialog v-model="dialogVisible" title="New Post">
                                <label><el-input v-model="editedPostInfo.title" placeholder="Title"/></label>
                                <el-descriptions
                                    direction="vertical"
                                    :column="1"
                                    border
                                >
                                    <el-descriptions-item label="User">{{ userInfo.username }}</el-descriptions-item>
                                    <el-descriptions-item label="Rest Time">
                                        <el-time-select v-model="editedPostInfo.wake" class="mr-4"
                                                        placeholder="Start time" start="00:00" step="00:15" end="24:00"/>
                                        <el-time-select v-model="editedPostInfo.sleep" placeholder="End time"
                                                        start="00:00" step="00:15" end="24:00"/>
                                    </el-descriptions-item>
                                    <el-descriptions-item label="Tags">
                                        <el-select-v2 v-model="editedPostInfo.tags" :options="tagOptions" placeholder="Please select"
                                            style="width: 240px" multiple/>
                                    </el-descriptions-item>
                                    <el-descriptions-item label="Description">
                                        <el-input v-model="editedPostInfo.content" />
                                    </el-descriptions-item>
                                </el-descriptions>
                                <el-button type="primary" @click="addPost"> Post </el-button>
                            </el-dialog>
                        </div>
                    </div>
                    <div v-if="activeButton === 'button2'">
                        <el-container>
                            <el-header>
                                <el-row :gutter="10">
                                    <el-select v-model="searchBy" class="m-2" placeholder="Select">
                                        <el-option
                                            v-for="item in searchMethods"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        />
                                    </el-select>
                                    <div class="demo-time-range" v-if="searchBy === 'WakeUp' || searchBy === 'Sleep'">
                                        <el-time-select v-model="startTime"  class="mr-4"
                                            placeholder="Start time" start="00:00" step="00:15" end="24:00"/>
                                        <el-time-select v-model="endTime" placeholder="End time"
                                            start="00:00" step="00:15" end="24:00"/>
                                    </div>
                                    <el-select-v2
                                        v-if="searchBy ==='Tag'" v-model="tagValue" :options="tagOptions" placeholder="Please select"
                                        style="width: 240px" multiple/>
                                    <el-button @click="searchGroupByOption">Search</el-button>
                                    <el-button type="primary" @click="openDialogGroup"> + </el-button>
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
                                        <label>{{ this.groupInfo.groupName }}</label>
                                        <el-descriptions
                                            direction="vertical" :column="4" border>
                                            <el-descriptions-item label="Leader">{{ groupInfo.leader }}</el-descriptions-item>
                                            <el-descriptions-item label="Time to Sleep">{{ groupInfo.sleep }}</el-descriptions-item>
                                            <el-descriptions-item label="Time to Wake Up" :span="2">{{ groupInfo.wake }}</el-descriptions-item>
                                            <el-descriptions-item label="Members">{{ groupInfo.members }}</el-descriptions-item>
                                        </el-descriptions>
                                        <el-descriptions direction="vertical" :column="1" border>
                                            <el-descriptions-item label="Tags">
                                                <el-row>
                                                    <div v-for="(tag,index) in groupInfo.tags" :key="index">
                                                        <el-tag size="small">{{ tag }}</el-tag>
                                                    </div>
                                                </el-row>
                                            </el-descriptions-item>
                                            <el-descriptions-item label="Description">
                                                {{ groupInfo.content }}
                                            </el-descriptions-item>
                                          <el-descriptions-item label="Comments">
                                            <el-collapse accordion>
                                              <el-collapse-item v-for="(comment, index) in commentsGroup" :key="index"
                                                                :title="comment.user+': '+comment.content" :name="index.toString()"
                                                                @click=replyComment(comment)>
                                                <div v-if="comment.replies && comment.replies.length > 0" >
                                                  <div v-for="(reply, i) in comment.replies" :key="i" :title="reply.user">
                                                    {{reply.user}} RE @{{reply.repliedUser}}: {{reply.content}}
                                                  </div>
                                                </div>
                                              </el-collapse-item>
                                            </el-collapse>
                                          </el-descriptions-item>
                                        </el-descriptions>
                                        <el-input v-model="inputComment" placeholder="Please input" v-if="!isReplyingComment"/>
                                        <el-input v-model="inputComment" :placeholder=replyPlaceholder v-if="isReplyingComment"/>
                                        <el-button type="primary" @click.prevent="addGroupCommentOrReply">Comment</el-button>
                                    </el-main>
                                    <el-footer>
                                        <el-button type="primary" @click="joinGroup">Join</el-button>

                                    </el-footer>
                                </el-container>
                            </el-container>
                            <div>
                                <el-dialog v-model="dialogVisibleGroup" title="New Group">
                                    <label><el-input v-model="editedGroupInfo.groupName" placeholder="Group Name"/></label>
                                    <el-descriptions
                                        direction="vertical"
                                        :column="2"
                                        border
                                    >
                                        <el-descriptions-item label="Leader">{{userInfo.username}}</el-descriptions-item>
                                        <el-descriptions-item label="Members"></el-descriptions-item>
                                        <el-descriptions-item label="Rest Time">
                                            <el-time-select v-model="editedGroupInfo.wake" class="mr-4"
                                                            placeholder="Start time" start="00:00" step="00:15" end="24:00"/>
                                            <el-time-select v-model="editedGroupInfo.sleep" placeholder="End time"
                                                            start="00:00" step="00:15" end="24:00"/>
                                        </el-descriptions-item>
                                        <el-descriptions-item label="Tags">
                                            <el-select-v2 v-model="editedGroupInfo.tags" :options="tagOptions" placeholder="Please select"
                                                          style="width: 240px" multiple/>
                                        </el-descriptions-item>
                                        <el-descriptions-item label="Description">
                                            <el-input v-model="editedGroupInfo.content" />
                                        </el-descriptions-item>
                                    </el-descriptions>
                                    <el-button type="primary" @click="addGroup"> Release </el-button>
                                </el-dialog>
                            </div>
                        </el-container>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ref} from "vue";
// import {Search} from '@element-plus/icons-vue'
import {mapState} from "vuex";
import MapComponent from "@/pages/main/MapComponent.vue";

export default {
    name: 'forumPanel',
    setup() {
    },
    data() {
        return {
            info: 3,
            activeButton: 'button1',
            searchBy: ref(''),
            searchMethods:[{ value: 'WakeUp', label: 'WakeUp',},{ value: 'Sleep', label: 'Sleep',},
                { value: 'Tag', label: 'Tag',}],
            groupID: null,
            postID: null,
            dialogVisible:false,
            dialogVisibleGroup:false,
            editedPostInfo: {
                title:null,
                user: null,
                sleep: null,
                wake: null,
                tags:null,
                content: null,
            },
            editedGroupInfo: {
                groupName:"",
                leader: "",
                members: "",
                sleep: "",
                wake: "",
                tags:null,
                content: "",
            },
            isLeavingComment: false,
            inputComment: ref(''),
            currentComponent: MapComponent,
            isReplyingComment:false,
            currentCommentID:null,
            currentRepliedUser:null,
            replyPlaceholder:null,
            startTime: null,
            endTime: null,
            tagValue: null,
            tagOptions:[{ value: 'sports', label: '爱运动',},{ value: 'study', label: '卷王',},
                { value: 'outgoing', label: '社牛',},{ value: 'introversion', label: '社恐',},]
        }
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
          console.log(this.postInfo)
        },
        searchGroup(selection){
            this.groupID = selection.id
            this.$store.dispatch("forum/searchGroup",selection.id)
        },
        searchPostByOption(){
            if (this.searchBy === 'Tag'){
                console.log(this.tagValue)
                this.$store.dispatch("forum/searchPostByTag",this.tagValue)
            }else if (this.searchBy === 'WakeUp'){
              console.log(this.startTime+" "+this.endTime)
              const time = {startTime: this.startTime, endTime: this.endTime}
                this.$store.dispatch("forum/searchPostByWake",time)

            }else if (this.searchBy === 'Sleep'){
              const time = {startTime: this.startTime, endTime: this.endTime}
                this.$store.dispatch("forum/searchPostBySleep",time)
            }
        },
        searchGroupByOption(){
            if (this.searchBy === 'Tag'){
                console.log(this.tagValue)
                this.$store.dispatch("forum/searchGroupByTag",this.tagValue)
            }else if (this.searchBy === 'WakeUp'){
                const time = {startTime: this.startTime, endTime: this.endTime}
                this.$store.dispatch("forum/searchGroupByWake",time)
            }else if (this.searchBy === 'Sleep'){
                const time = {startTime: this.startTime, endTime: this.endTime}
                this.$store.dispatch("forum/searchGroupBySleep",time)
            }
        },
        joinGroup(){
            const info = {groupID: this.groupID, studentID: this.userInfo.studentID}
            this.$store.dispatch("forum/joinGroup",info)
        },
        openDialog(){
            this.dialogVisible = true;
        },
        addGroup(){
            this.newGroupInfo.leader = this.userInfo.studentID
            this.newGroupInfo.wake = this.editedGroupInfo.wake
            this.newGroupInfo.sleep = this.editedGroupInfo.sleep
            this.newGroupInfo.content = this.editedGroupInfo.content
            this.newGroupInfo.members = this.editedGroupInfo.members
            this.newGroupInfo.groupName = this.editedGroupInfo.groupName
          this.newGroupInfo.tags = this.editedGroupInfo.tags
            this.editedGroupInfo.wake = null
            this.editedGroupInfo.groupName = null
            this.editedGroupInfo.content = null
            this.editedGroupInfo.leader = null
            this.editedGroupInfo.members = null
            this.editedGroupInfo.sleep = null
          this.editedGroupInfo.tags = null
            this.dialogVisibleGroup = false
            this.$store.dispatch("forum/addGroup")
        },
        openDialogGroup(){
          this.dialogVisibleGroup = true
        },
        addPost(){
            this.newPostInfo.title = this.editedPostInfo.title
            this.newPostInfo.user = this.userInfo.studentID
            this.newPostInfo.wake = this.editedPostInfo.wake
            this.newPostInfo.sleep = this.editedPostInfo.sleep
            this.newPostInfo.content = this.editedPostInfo.content
          this.newPostInfo.tags = this.editedPostInfo.tags
            this.editedPostInfo.title = null
            this.editedPostInfo.user = null
            this.editedPostInfo.wake = null
            this.editedPostInfo.sleep = null
            this.editedPostInfo.content = null
          this.editedPostInfo.tags = null
            this.dialogVisible = false
            this.$store.dispatch("forum/addPost")
        },
        addGroupCommentOrReply() {
            if (this.inputComment.trim() !== ""){
                if (!this.isReplyingComment){
                    this.commentLineGroup.id = this.groupID
                    this.commentLineGroup.user = this.userInfo.studentID
                    this.commentLineGroup.content = this.inputComment
                    console.log(this.commentLineGroup);
                    this.$store.dispatch("forum/addGroupComment")
                }else {
                    this.replyLineGroup.commentID = this.currentCommentID
                    this.replyLineGroup.user = this.userInfo.studentID
                    this.replyLineGroup.repliedUser = this.currentRepliedUser
                    this.replyLineGroup.reply = this.inputComment
                    console.log(this.replyLineGroup);
                    this.$store.dispatch("forum/addGroupReply")
                }

            }else {
                alert("Please input comment")
            }
        },
        addPostCommentOrReply() {
            if (this.inputComment.trim() !== ""){
                if (!this.isReplyingComment){
                    this.commentLinePost.id = this.postID
                    this.commentLinePost.user = this.userInfo.studentID
                    this.commentLinePost.content = this.inputComment
                    console.log(this.commentLinePost);
                    this.$store.dispatch("forum/addPostComment")
                }else {
                    this.replyLinePost.commentID = this.currentCommentID
                    this.replyLinePost.user = this.userInfo.studentID
                    this.replyLinePost.repliedUser = this.currentRepliedUser
                    this.replyLinePost.reply = this.inputComment
                    console.log(this.replyLinePost);
                    this.$store.dispatch("forum/addPostReply")
                }

            }else {
                alert("Please input comment")
            }
        },
        replyComment(comment){
          this.isReplyingComment = !this.isReplyingComment
          this.currentRepliedUser = comment.user
            this.currentCommentID = comment.id
            this.replyPlaceholder = "RE @"+this.currentRepliedUser
        },
        replyReply(reply,comment){
            this.currentRepliedUser = reply.user
            this.currentCommentID = comment.id
            this.replyPlaceholder = "RE @"+reply.user
            console.log(this.replyPlaceholder)
        },
    },
    computed: {
        ...mapState('forum', {
            postOverviewData: state => state.postOverviewData,
            groupOverviewData: state => state.groupOverviewData,
            postInfo: state => state.postInfo,
            groupInfo: state => state.groupInfo,
            newPostInfo: state => state.newPostInfo,
            newGroupInfo: state => state.newGroupInfo,
            commentsPost: state => state.commentsPost,
            commentsGroup: state => state.commentsGroup,
            replyLinePost: state => state.replyLinePost,
            commentLineGroup: state => state.commentLineGroup,
            replyLineGroup: state => state.replyLineGroup,
            commentLinePost: state => state.commentLinePost,
        }),
        ...mapState('DataProcess', {
            userInfo: state => state.userInfo,
        })
    },
    // components: {
    //     Search
    // }
}
</script>

<style>

</style>
