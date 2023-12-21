<template>
    <div class="userbody">
        <div class="userdata">
            <div class="common-layout">
                <el-container>

                    <el-main>
                        <el-card class="box-card-bookmark" :height="10">
                            <template #header>
                                <div class="card-header">
                                    <span style="margin-right: 50px;">学生信息一览</span>
                                    <el-button class="button" @click="handleAdd">Add</el-button>
                                    <el-button class="button" @click="Import">导入</el-button>
                                    <!-- <el-button class="button" text>Operation button</el-button> -->
                                </div>
                            </template>
                            <div>
                                <el-table :data="userData" style="width: 100%">
                                    <el-table-column prop="accountNum" label="学号" width="180" />
                                    <el-table-column prop="username" label="用户名" width="180">
                                        <template v-slot="scope">
                                            <span v-if="!scope.row.editable">{{ scope.row.username }}</span>
                                            <el-input v-else v-model="edit_username">{{ scope.row.username }}</el-input>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="password" label="密码" width="180">
                                        <template v-slot="scope">
                                            <span v-if="!scope.row.editable">{{ scope.row.password }}</span>
                                            <el-input v-else v-model="edit_password">{{ scope.row.password }}</el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="hometown" label="家乡" width="180">
                                        <template v-slot="scope">
                                            <span v-if="!scope.row.editable">{{ scope.row.hometown }}</span>
                                            <el-input v-else v-model="edit_hometown">{{ scope.row.hometown }}</el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="restTime" label="作息时间">
                                        <template v-slot="scope">
                                            <span v-if="!scope.row.editable">{{ scope.row.restTime }}</span>
                                            <el-input v-else v-model="edit_restTime">{{ scope.row.restTime }}</el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="description" label="个人描述">
                                        <template v-slot="scope">
                                            <span v-if="!scope.row.editable">{{ scope.row.description }}</span>
                                            <el-input v-else v-model="edit_description">{{ scope.row.description
                                            }}</el-input>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="操作">
                                        <template v-slot="scope">
                                            <el-button v-if="!scope.row.editable"
                                                @click="handleEdit(scope.row)">Edit</el-button>
                                            <el-button v-else @click="handleCancel(scope.row)">Cancel</el-button>
                                            <el-button v-if="scope.row.editable"
                                                @click="handleSubmit(scope.row)">Submit</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>

                            </div>
                        </el-card>

                    </el-main>
                </el-container>
            </div>
        </div>
    </div>

    <div>
        <el-dialog v-model="dialogVisible" title="Add New Student">
            <el-descriptions direction="vertical" :column="4" border>
                <el-descriptions-item label="账号"><input v-model="edit_accountNum" /></el-descriptions-item>
                <el-descriptions-item label="用户名"><input v-model="edit_username" /></el-descriptions-item>
                <el-descriptions-item label="起始密码"><input v-model="edit_password" /></el-descriptions-item>
                <el-descriptions-item label="家乡"><input v-model="edit_hometown" /></el-descriptions-item>
            </el-descriptions>
            <el-button type="primary" @click.prevent="Submit">Submit</el-button>
        </el-dialog>
    </div>
</template>




<script>
import { mapState } from "vuex";
// import axios from 'axios'
export default {
    name: 'userPanel',
    data() {
        return {
            isEditing: false,
            edit_accountNum: "",
            edit_username: "",
            edit_password: "",
            edit_restTime: "",
            edit_description: "",
            edit_hometown: "",
            dialogVisible: false
        };
    },
    computed: {
        ...mapState('DataProcess', {
            userData: state => state.userData,
        })
    },
    mounted() {
        this.$store.dispatch("DataProcess/getUserData");
        // if(localStorage.getItem("news")){
        //     this.form=JSON.parse(localStorage.getItem("news"))
        //     this.checked=true
        // }
    },
    methods: {
        Import() {

        },
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
        },

        handleEdit(row) {
            this.edit_username = row.username;
            this.edit_hometown = row.hometown;
            this.edit_restTime = row.restTime;
            this.edit_password = row.password;
            this.edit_description = row.description;
            row.editable = true; // Set the row to editable
        },
        handleCancel(row) {
            row.editable = false;// Set the row back to non-editable
        },
        handleSubmit(row) {
            // Submit the changes for the row
            // ... (your submit logic here)

            row.username = this.edit_username;
            row.hometown = this.edit_hometown;
            row.restTime = this.edit_restTime;
            row.password = this.edit_password;
            row.description = this.edit_description;
            const info = {
                accountNum: row.accountNum,
                username: row.username,
                password: row.password,
                hometown: row.hometown,
                restTime: row.restTime,
                description: row.description,
            }
            this.$store.dispatch("DataProcess/editUser", info);
            row.editable = false;// Set the row back to non-editable after submitting
        },
        Submit() {
            const info = {
                accountNum: this.edit_accountNum,
                username: this.edit_username,
                password: this.edit_password,
                hometown: this.edit_hometown
            }
            this.edit_accountNum = ""
            this.edit_username = ""
            this.edit_password = ""
            this.edit_restTime = ""
            this.edit_description = ""
            this.edit_hometown = ""
            this.dialogVisible = false
            console.log(info)
            this.$store.dispatch("DataProcess/addUser", info);
        },
        handleAdd() {
            this.dialogVisible = true
        }

    }
}

</script>

<style>
.el-descriptions {
    margin-top: 20px;
}
</style>
