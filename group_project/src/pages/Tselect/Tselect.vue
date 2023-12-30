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
                  <el-button class="button" @click="Export">导出信息</el-button>
                  <el-button class="button" @click="Filterate">过滤</el-button>
                  <!-- <el-button class="button" text>Operation button</el-button> -->
                </div>
              </template>
              <div>


                <el-table :data="memberData" style="width: 100%">
                  <el-table-column prop="room_level" label="Level"  />
                  <el-table-column prop="room_gender" label="Gender"  />
                  <el-table-column prop="room_type" label="Type"  />
                  <el-table-column prop="room_locate" label="Address"  />
                  <el-table-column prop="Student1" label="Student1" />
                  <el-table-column prop="Student2" label="Student2" />
                  <el-table-column prop="Student3" label="Student3" />
                  <el-table-column prop="Student4" label="Student4" />

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
// import axios from 'axios'
export default {
  name: 'userPanel',
  data() {
    return {
      begin1 : ref(''),
      end1 :  ref(''),
      begin2 : ref(''),
      end2 :  ref(''),

      isEditing: false
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
    Export() {

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
    }
  },

}
</script>

<style>
.el-descriptions {
  margin-top: 20px;
}
</style>