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
                                    <el-button class="button" @click="Export">导出</el-button>
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
                                    <el-table-column prop="gender" label="性别" width="150">
                                        <template v-slot="scope">
                                            <span v-if="!scope.row.editable">{{ scope.row.gender }}</span>
                                            <el-select v-else v-model="edit_gender"> <el-option label="male"
                                                    value="male"></el-option> <el-option label="female"
                                                    value="female"></el-option> </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="level" label="学历" width="150">
                                        <template v-slot="scope">
                                            <span v-if="!scope.row.editable">{{ scope.row.level }}</span>
                                            <el-select v-else v-model="edit_level"> <el-option label="master"
                                                    value="master"></el-option> <el-option label="doctor"
                                                    value="doctor"></el-option> </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="address" label="宿舍地址">
                                        <template v-slot="scope">
                                            <span v-if="!scope.row.editable">{{ scope.row.address }}</span>

                                            <el-select v-else v-model="edit_address" class="m-2" placeholder="请选择一个空宿舍"
                                                @change="select_dormitory()">
                                                <el-option v-for="item in options_dormitory" :key="item.roomId"
                                                    :label="item.room_level + ' ' + item.room_gender + ' ' + item.room_locate"
                                                    :value="item.roomId" />
                                            </el-select>
                                        </template>
                                    </el-table-column>



                                    <el-table-column label="操作">
                                        <template v-slot="scope">
                                            <el-button v-if="!scope.row.editable"
                                                @click="handleEdit(scope.row)">Edit</el-button>


                                            <el-button v-if="!scope.row.editable"
                                                @click="handleDelete(scope.row)">Delete</el-button>
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
                <el-descriptions-item label="性别"><el-select v-model="edit_gender"> <el-option label="male"
                            value="male"></el-option> <el-option label="female" value="female"></el-option> </el-select>
                </el-descriptions-item>
                <el-descriptions-item label="学历"><el-select v-model="edit_level"> <el-option label="master"
                            value="master"></el-option> <el-option label="doctor" value="doctor"></el-option> </el-select>
                </el-descriptions-item>
            </el-descriptions>
            <el-button type="primary" @click.prevent="Submit">Submit</el-button>
        </el-dialog>
    </div>

    <div>
        <el-dialog v-model="uploadDialog">
            <el-upload class="upload-demo" drag :before-upload="handleBeforeUpload" action="dummy-action" multiple>
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        jpg/png files with a size less than 500kb
                    </div>
                </template>
            </el-upload>
        </el-dialog>
    </div>
</template>




<script>
import { mapState } from "vuex";
import { UploadFilled } from "@element-plus/icons-vue";
import axios from "axios";
import Papa from "papaparse";
// import axios from 'axios'
export default {
    name: 'userPanel',
    components: { UploadFilled },
    data() {
        return {
            isEditing: false,
            edit_accountNum: "",
            edit_username: "",
            edit_password: "",
            edit_gender: "",
            edit_level: "",
            edit_roomID: "",
            dialogVisible: false,
            uploadDialog: false,
        };
    },
    computed: {
        ...mapState('DataProcess', {
            userData: state => state.userData,
            options_dormitory: state => state.memberData
        })
    },
    mounted() {
        this.$store.dispatch("DataProcess/getUserData");
        this.$store.dispatch("DataProcess/filter");
    },
    methods: {
        handleDelete(row) {
            const accountNum = row.accountNum
            this.$store.dispatch("DataProcess/deleteStu", accountNum);
        },
        Import() {
            this.uploadDialog = true
            console.log(this.uploadDialog)
        },
        Export() {
            this.$store.dispatch("DataProcess/exportStudentInfo");
        },
        select_dormitory() {

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
            this.edit_accountNum = row.accountNum;
            this.edit_username = row.username;
            this.edit_hometown = row.hometown;
            this.edit_restTime = row.restTime;
            this.edit_password = row.password;
            this.edit_description = row.description;
            this.edit_gender = row.gender;
            this.edit_level = row.level;
            row.editable = true; // Set the row to editable
        },
        handleCancel(row) {
            row.editable = false;// Set the row back to non-editable
            this.edit_accountNum = ""
            this.edit_level = ""
            this.edit_password = ""
            this.edit_gender = ""
            this.edit_description = ""
            this.edit_username = ""
        },
        handleSubmit(row) {
            // Submit the changes for the row
            // ... (your submit logic here)
            const info = {
                accountNum: this.edit_accountNum,
                room_id: this.edit_roomID,
                username: this.edit_username,
                password: this.edit_password,
                gender: this.edit_gender,
                level: this.edit_level,

            }
            this.edit_accountNum = ""
            this.edit_level = ""
            this.edit_password = ""
            this.edit_gender = ""
            this.edit_description = ""
            this.edit_username = ""
            this.$store.dispatch("DataProcess/editUser", info);
            row.editable = false;// Set the row back to non-editable after submitting

        },
        Submit() {
            const info = {
                accountNum: this.edit_accountNum,
                username: this.edit_username,
                password: this.edit_password,
                level: this.edit_level,
                gender: this.edit_gender
            }


            this.edit_accountNum = ""
            this.edit_level = ""
            this.edit_password = ""
            this.edit_gender = ""
            this.edit_description = ""
            this.edit_username = ""
            this.dialogVisible = false
            console.log(info)
            this.$store.dispatch("DataProcess/addUser", info);
        },
        handleAdd() {
            this.dialogVisible = true
        },
        async handleBeforeUpload(file) {
            const fileContent = await this.readFileContent(file);

            // 解析 CSV 文件内容
            const parsedData = this.parseCsv(fileContent);

            // 在这里，parsedData 就是实际的数据，你可以进一步处理或传递给后端

            console.log(parsedData);
            console.log(fileContent);
            await this.sendDataToBackend(fileContent);
            // 阻止上传过程
            return false;
        },
        readFileContent(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => resolve(event.target.result);
                reader.onerror = (error) => reject(error);
                reader.readAsText(file);
            });
        },
        parseCsv(fileContent) {
            return new Promise((resolve) => {
                // 使用 papaparse 解析 CSV 文件内容
                Papa.parse(fileContent, {
                    header: true,  // 如果 CSV 文件有标题行，请设置为 true
                    complete: (result) => {
                        resolve(result.data);
                    },
                });
            });
        },
        async sendDataToBackend(parsedData) {
            try {
                console.log(parsedData)
                const params = {
                    data: parsedData
                }
                // 使用 Axios 发送 POST 请求到后端
                const response = await axios.get('http://127.0.0.1:8082/api/teacher/uploadStudentFile', { params });

                // 处理后端返回的响应
                console.log(response.data);
            } catch (error) {
                console.error('Error sending data to backend:', error);
            }
        },
    }
}

</script>

<style>
.el-descriptions {
    margin-top: 20px;
}
</style>
