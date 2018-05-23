<template>
  <div class="wdyj">
    <div :class="{'showzz':!editableTabs2.length}"></div>
    <div class="titlebtn">
      <el-button size="mini" type="primary" @click="dialogaddVisible=true">添加机柜</el-button>
    </div>
    <el-tabs class="tabswdyj" v-model="editableTabsValue2" type="border-card" closable @tab-remove="removedata">
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
                <span>低于</span> 设置温度值时机器报警
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
              <!--               <el-checkbox-group v-model="wformline[editableTabsValue2].gzms" size="mini">
                <el-checkbox-button label="1">制冷</el-checkbox-button>
                <el-checkbox-button label="2">制热</el-checkbox-button>
                <el-checkbox-button label="3">恒温</el-checkbox-button>
              </el-checkbox-group> -->
            </el-form-item>
            <el-form-item label="工作温度">
              <el-input v-model="wformline[editableTabsValue2].mbwd"></el-input>
              <span style="padding:0 5px;color:#F78989">°C</span>
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
    <!-- 添加机柜 -->
    <el-dialog title="添加机柜" append-to-body :visible.sync="dialogaddVisible" width="35%">
      <div class="smain addjg">
        <el-form status-icon :model="formaddjg" :rules="rules1" size="small" ref="formaddjg" class="demo-form-inline" label-width="80px" label-position="left">
          <el-form-item label="添加机柜" prop="addjg">
            <el-select v-model="formaddjg.addjg" clearable placeholder="请选择">
              <el-option v-for="item in optionsjg" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="info" class="btnesc" @click="dialogaddVisible=false">取消</el-button>
            <el-button type="primary" class="btnesc" @click="addTab">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
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
    var validdlmc = (rule, value, callback) => { //必填
      if (typeof value == 'number') return callback();
      if (!value) {
        return callback(new Error('内容不能为空'));
      } else {
        value = value.replace(/(^\s*)|(\s*$)/g, ''); //去首尾空格
        if (!value) {
          return callback(new Error('内容不能为空'));
        }
      }
      setTimeout(() => {
        callback();
      }, 400);
    };
    return {
      loading: false,
      tableData: [],
      editableTabsValue2: '',
      editableTabs2: [], //已添加的tabs
      dialogaddVisible: false, // 添加机柜
      optionsjg: [ //未添加的tabs
        { label: '主机', value: 0, disabled: false },
        { label: '副机1', value: 1, disabled: false },
        { label: '副机2', value: 2, disabled: false },
        { label: '副机3', value: 3, disabled: false },
        { label: '副机4', value: 4, disabled: false },
      ],
      formaddjg: {
        addjg: '',
      },
      rules1: {
        addjg: [{ validator: validdlmc, trigger: 'blur', required: true }],
      },
      wformline: [],
      mbid: '',
    };
  },
  created: function() {
    // this.initialize();
  },
  watch: {
    wdyjshow: function(data, olddata) {
      this.mbid = this.mbxx.mbid;
      this.wformline = []; //初始化机柜
      this.editableTabs2 = []; //初始化参数
      for (let item in this.mbxx.wdList) { //添加机柜
        this.optionsjg[item].disabled = true;
        this.editableTabs2.push({
          title: this.optionsjg[item].label,
          name: item,
        });
        this.editableTabsValue2 = item;
        this.wformline.push(this.mbxx.wdList[item]);
      }
    },
    // showNum: function(data, olddata) {
    //   this.initialize();
    // },
    dialogaddVisible: function(data, olddata) {
      if (data) {
        this.addjg = '';
      }
      this.initializenow(data);
    },
  },
  methods: {
    removedata(targetName) { //删除机柜
      this.$confirm('此操作删除该机柜,是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
        if (this.editableTabs2.length <= 1) { return this.$message({ message: '温度设置必须保留一个机柜', type: 'warning' }); }
        this.optionsjg[targetName].disabled = false;
        let tabs = this.editableTabs2;
        let activeName = this.editableTabsValue2;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name; //清除数组中的元素
                this.tableData.splice(targetName, 1);
              }
            }
          });
        }
        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
        this.$message({ type: 'success', message: '删除成功!' });
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' });
      });
    },
    addTab() { //添加机柜
      this.$refs['formaddjg'].validate((valid) => {
        if (valid) {
          this.optionsjg.filter(item => {
            if (item.value === this.formaddjg.addjg) {
              item.disabled = true;
            }
          });
          let newTabName = this.formaddjg.addjg + '';
          this.editableTabs2.push({
            title: this.optionsjg[this.formaddjg.addjg].label,
            name: newTabName,
          });
          this.editableTabsValue2 = newTabName;
          this.$set(this.wformline, newTabName, { zdwd: '', zgwd: '', gzms: '', mbwd: '', time1: '', time2: '', time3: '' });
          this.dialogaddVisible = false;
        } else {
          this.$message({ message: '表单验证未通过', type: 'error' });
          return false;
        }
      });
    },
    initializenow(val) { //弹框初始化 
      if (!val) {
        this.$refs.formaddjg.resetFields();
      } else {
        for (let i = 0; i < this.optionsjg.length; i++) {
          if (!this.optionsjg[i].disabled) {
            this.formaddjg.addjg = this.optionsjg[i].value;
            break;
          } else {
            this.formaddjg.addjg = '';
          }
        }
      }
    },
    restwdyj(val) { //重置
      this.wformline[val] = { zdwd: '', zgwd: '', gzms: '', mbwd: '', time1: '', time2: '', time3: '' };
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
      // this.wformline = {};
      // this.wformline2 = {};
      // this.mbid = this.mbxx.mbid;
      // this.tableData = [];
      // this.editableTabs2 = []; //已添加的tabs
      // this.optionsjg.filter(item => { item.disabled = false; });
      // if (this.mbxx.mbid) {
      //   for (var key in this.mbxx.wdList) {
      //     var jgbh = this.mbxx.wdList[key].jgbh;
      //     this.optionsjg.filter(item => { if (item.value == jgbh) { item.disabled = true; } });
      //     let newTabName = jgbh + '';
      //     this.editableTabs2.push({
      //       title: this.optionsjg[jgbh].label,
      //       name: newTabName,
      //     });
      //     if (!this.editableTabs2[0].name) { this.editableTabs2.splice(0, 1); }
      //     // this.editableTabsValue2 = newTabName;
      //     var tabsdata = this.mbxx.wdList[key];

      //     this.wformline.zdwd = this.mbxx.wdList[key].zdwd;
      //     this.wformline.zgwd = this.mbxx.wdList[key].zgwd;
      //     this.wformline2.gzms = this.mbxx.wdList[key].gzms;
      //     this.wformline2.mbwd = this.mbxx.wdList[key].mbwd;
      //     this.wformline2.time1 = this.mbxx.wdList[key].time1;
      //     this.wformline2.time2 = this.mbxx.wdList[key].time2;
      //     this.wformline2.time3 = this.mbxx.wdList[key].time3;

      //     this.$set(this.tableData, newTabName, tabsdata);
      //   }
      // }
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
