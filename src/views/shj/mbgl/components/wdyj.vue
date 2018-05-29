<template>
  <div class="wdyj">
    <div :class="{'showzz':!editableTabs2.length}"></div>
    <el-tabs class="tabswdyj" v-model="editableTabsValue2" type="border-card">
      <el-tab-pane v-for="(item, index) in editableTabs2" :key="item.name" :label="item.title" :name="item.name">
        <div class="wdbj">
          <i class="iconfont icon-wenkongqi"></i>
          <span>温度报警设置</span>
          <hr>
          <el-form label-width="70px" size="mini" :model="wformline[editableTabsValue2]">
            <el-form-item label="低温报警">
              <el-input v-model="wformline[editableTabsValue2].zdwd"></el-input>
              <div class="deil">
                <span style="padding:0 5px;">°C</span>温度
                <span>低于</span> 设置温度值时机器报警
              </div>
            </el-form-item>
            <el-form-item label="高温报警">
              <el-input v-model="wformline[editableTabsValue2].zgwd"></el-input>
              <div class="deil">
                <span style="padding:0 5px;">°C</span>温度
                <span>高于</span> 设置温度值时机器报警
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="wky">
          <i class="iconfont icon-icon-cable"></i>
          <span>温控仪设置</span>
          <hr>
          <el-form label-position="left" label-width="80px" max="1" size="mini" :model="wformline[editableTabsValue2]">
            <el-form-item label="工作模式">
              <el-radio-group v-model="wformline[editableTabsValue2].gzms" size="mini">
                <el-radio-button label="1">制冷</el-radio-button>
                <el-radio-button label="2">制热</el-radio-button>
                <el-radio-button label="3">恒温</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="工作温度">
              <el-input v-model="wformline[editableTabsValue2].mbwd"></el-input>
              <div class="deil">
                <span style="padding:0 5px;">°C</span>温度
                <span>介于</span> 最低温度和最高温度之间
              </div>
            </el-form-item>
            <el-form-item label="工作时段1">
              <el-time-picker is-range v-model="wformline[editableTabsValue2].time1" range-separator="~" value-format="HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
              </el-time-picker>
            </el-form-item>
            <el-form-item label="工作时段2">
              <el-time-picker is-range v-model="wformline[editableTabsValue2].time2" range-separator="~" value-format="HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
            </el-form-item>
            <el-form-item label="工作时段3">
              <el-time-picker is-range v-model="wformline[editableTabsValue2].time3" range-separator="~" value-format="HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="submitboton" v-show="editableTabs2.length">
      <el-button-group class="btnCenter">
        <el-button :loading="loading" style="padding: 10px 40px;" type="primary" @click="restwdyj(editableTabsValue2)">重置</el-button>
        <el-button style="padding: 10px 40px;" type="primary" @click="wdyjSave">保存</el-button>
      </el-button-group>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message } from 'element-ui'
export default {
  props: ['mbxx', 'wdyjshow', 'showNum'],
  data() {
    return {
      editableTabsValue2: '',
      editableTabs2: [],
      loading: false,
      wformline: [],
      mbid: '',
    };
  },
  created: function() {
    this.initialize();
  },
  watch: {
    wdyjshow: function(data, olddata) {
      this.mbid = this.mbxx.mbid;
      this.wformline = [];
      this.editableTabs2 = this.mbxx.editableTabs2 ? this.mbxx.editableTabs2 : []; //初始化机柜
      this.editableTabsValue2 = this.mbxx ? this.mbxx.editableTabsValue2 : '';
      let wdlistrowdata = [];
      this.mbxx.wdList = this.mbxx.wdList ? this.mbxx.wdList : [];
      for (let i = 0; i < this.editableTabs2.length; i++) { //添加机柜
        wdlistrowdata = this.mbxx.wdList[i] ? this.mbxx.wdList[i] : { gzms: "", mbwd: "", time1: '', time2: '', time3: '', zdwd: "", zgwd: "" };
        this.wformline.push(wdlistrowdata);
      }
      this.mbxx.wdList = this.wformline;
    },
  },
  methods: {
    restwdyj(val) { //重置
      this.$set(this.wformline, this.editableTabsValue2, { gzms: "", mbwd: "", time1: '', time2: '', time3: '', zdwd: "", zgwd: "" });
    },
    wdyjSave() { //保存温度预警
      var Data = {
        mbid: this.mbid,
        wdList: this.wformline
      };
      request({ url: 'service-machine/mbgl/wdyjcz', method: 'post', data: Data }).then(response => {
        this.$message({ type: 'success', message: response.msg });
        if (!this.mbxx.mbid) {
          this.mbxx.mbid = response.mbid;
          this.mbid = response.mbid;
        }
        this.mbxx.wdList = this.wformline;
        // console.log(this.mbxx);
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },
    initialize() { //进入温度界面进行初始化
      // this.editableTabsValue2 = this.mbxx ? this.mbxx.editableTabsValue2 : '';
      // this.editableTabs2 = this.mbxx.editableTabs2 ? this.mbxx.editableTabs2 : [];
      // this.editableTabs2 = this.mbxx.editableTabs2;
    }
  }
};

</script>
<style scoped>
.showzz {
  width: 100%;
  z-index: 3;
  background: #F5F7FA;
  position: absolute;
  height: 40px;
}

.titlebtn {
  z-index: 10;
  position: absolute;
  top: 40px;
  right: 25px;
  /*padding: 13px;*/
}

.el-tab-pane div.wdyj {
  position: relative;
  padding: 35px 0 10px 0;
  margin-left: -5px;
}



.el-table {
  border-bottom: 1px solid #ebeef5;
}

.titlebtn .el-button {
  float: left;
  margin: 0 10px;
}

.wky {
  margin-bottom: 40px;
}

.mbbtn {
  float: right;
  margin-top: -60px;
}

.addjg {
  padding: 20px 1px 1px 1px;
}

.addjg div.el-input {
  width: 300px;
}

.addjg div.el-select {
  width: 300px;
}

.btnesc {
  margin-right: 40px;
  padding: 10px 30px;
}

.submitboton {
  /*margin: 20px 0;*/
  position: absolute;
  bottom: 20px;
  left: 20px;
  /*margin: 5px 0 0 0;*/
}

.submitboton .el-button {
  padding: 10px 30px;
}

.dialogadd {
  margin-top: 20px;
}

.wdyj hr {
  border: 0;
  border-top: 1px solid #D1DBE5;
  margin-top: 3px;
}

.wdyj .iconfont {
  font-size: 20px;
  color: #FF0000;
  position: relative;
  top: 2px;
}

div.el-input {
  /********************表单************************/
  width: 80px;
  float: left;
}

.deil span {
  color: #F78989;
}

.deil {
  float: left;
  width: 250px;
}

div.el-form-item {
  margin-bottom: 20px;
}


.time {
  /**********************cope*****************/
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
  border: 0;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.frommain {
  /*position: absolute;*/
  /*bottom: 25px;*/
  /*right: 30px;*/
}

</style>
