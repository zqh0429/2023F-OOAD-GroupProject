<template>
  <div class="userbody">
    <div class="userdata">
      <div class="common-layout">
        <el-container>

          <el-main>
            <el-card class="box-card-bookmark" :height="10">
              <template #header>
                <div class="card-header">
                  <span style="display: block; margin-right: 50px; line-height: 2;">选宿舍情况一览</span>

                  本科生
                  <el-date-picker v-model="begin1" type="datetime" placeholder="设置抢宿舍开始时间"
                                  value-format="YYYY-MM-DD HH:mm:ss" @change="beginDate1"></el-date-picker>
                  <el-date-picker v-model="end1" type="datetime" placeholder="设置抢宿舍结束时间"
                                  value-format="YYYY-MM-DD HH:mm:ss" @change="endDate1"></el-date-picker>
                  博士生
                  <el-date-picker v-model="begin2" type="datetime" placeholder="设置抢宿舍开始时间"
                                  value-format="YYYY-MM-DD HH:mm:ss" @change="beginDate2"></el-date-picker>
                  <el-date-picker v-model="end2" type="datetime" placeholder="设置抢宿舍结束时间" style="margin-right: 50px;"
                                  value-format="YYYY-MM-DD HH:mm:ss" @change="endDate2"></el-date-picker>
                    <el-button class="button" @click.prevent="Import">导入</el-button>
                  <el-button class="button" @click="Export">导出信息</el-button>
                  <el-button class="button" @click="Filterate">过滤</el-button>
                  <!-- <el-button class="button" text>Operation button</el-button> -->
                    <el-dialog v-model="uploadDialog">
                        <el-upload
                            class="upload-demo"
                            drag
                            :before-upload="handleBeforeUpload"
                            action="dummy-action"
                            multiple
                        >
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
              <div>


                <el-table :data="memberData" style="width: 100%">
                  <el-table-column prop="room_level" label="Level"  />
                  <el-table-column prop="room_gender" label="Gender"  />
                  <el-table-column prop="room_type" label="Type"  />
                  <el-table-column prop="room_locate" label="Address"  />
                  <el-table-column prop="student1" label="Student1" />
                  <el-table-column prop="student2" label="Student2" />
                  <el-table-column prop="student3" label="Student3" />
                  <el-table-column prop="student4" label="Student4" />

                </el-table>

              </div>
            </el-card>

          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>




<script>
import {ref} from "vue";
import { mapState } from "vuex";
import {UploadFilled} from "@element-plus/icons-vue";
import axios from "axios";
import Papa from 'papaparse';
export default {
  name: 'userPanel',
    components: {UploadFilled},
  data() {
    return {
      begin1 : ref(''),
      end1 :  ref(''),
      begin2 : ref(''),
      end2 :  ref(''),

      isEditing: false,
        uploadDialog:false,
    };
  },
  computed: {
    ...mapState('DataProcess', {
      memberData: state => state.memberData,
      beginTime1: state => state.beginTime1,
      endTime1: state => state.endTime1,
      beginTime2: state => state.beginTime2,
      endTime2: state => state.endTime2

    })
  },
  mounted() {
    this.$store.dispatch("DataProcess/getMemberData");
  },
  methods: {
      Import(){
          this.uploadDialog = true
          console.log(this.uploadDialog)
      },
    Export() {
        this.$store.dispatch("DataProcess/export");
    },
    beginDate1() {

      console.log(this.begin1);
      this.$store.dispatch("DataProcess/setBeginTime1",this.begin1);
    },
    endDate1() {
      console.log(this.end1);
      this.$store.dispatch("DataProcess/setEndTime1",this.end1);

    },
    beginDate2() {

      console.log(this.begin2);
      this.$store.dispatch("DataProcess/setBeginTime2",this.begin2);
    },
    endDate2() {

      this.$store.dispatch("DataProcess/setEndTime2",this.end2);

    },
    Filterate(){
      this.$store.dispatch("DataProcess/filter");
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
              const params = {
                data: parsedData
              }
              console.log(params)
              // 使用 Axios 发送 POST 请求到后端
              const response = await axios.get('http://127.0.0.1:8082/api/teacher/uploadRoomFile', {params});

              // 处理后端返回的响应
              console.log(response.data);
          } catch (error) {
              console.error('Error sending data to backend:', error);
          }
      },
  },

}
</script>

<style>
.el-descriptions {
  margin-top: 20px;
}
</style>