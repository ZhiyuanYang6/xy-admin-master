<template>
  <div class="hdys wdyj">
    <div class="titlebtn">
      <el-button size="mini" type="primary" @click="dialogaddVisible=true">添加机柜</el-button>
    </div>
    <el-tabs v-model="editableTabsValue2" type="border-card" closable @tab-remove="removedata">
      <el-tab-pane v-for="(item, index) in editableTabs2" :key="item.name" :label="item.title" :name="item.name">
        <div class="wdbj">
          <i class="iconfont icon-wenkongqi"></i>
          <span>温度报警设置</span>
          <hr>
          <el-form label-width="70px" size="mini" :model="wformline">
            <el-form-item label="低温报警">
              <el-input v-model="wformline.zdwd"></el-input>
              <div class="deil">
                <span style="padding:0 5px;">°C</span>温度
                <span>低于</span> 设置温度值时机器报警
              </div>
            </el-form-item>
            <el-form-item label="高温报警">
              <el-input v-model="wformline.zgwd"></el-input>
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
          <el-form label-position="left" label-width="80px" max="1" size="mini" :model="wformline2">
            <el-form-item label="工作模式">
              <el-checkbox-group v-model="wformline2.gzms" size="mini">
                <el-checkbox-button label="1">制冷</el-checkbox-button>
                <el-checkbox-button label="2">制热</el-checkbox-button>
                <el-checkbox-button label="3">恒温</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="工作温度">
              <el-input v-model="wformline2.mbwd"></el-input>
              <span style="padding:0 5px;color:#F78989">°C</span>
            </el-form-item>
            <el-form-item label="工作时段1">
              <el-time-picker is-range v-model="wformline2.time1" range-separator="~" value-format="HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
              </el-time-picker>
            </el-form-item>
            <el-form-item label="工作时段2">
              <el-time-picker is-range v-model="wformline2.time2" range-separator="~" value-format="HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
            </el-form-item>
            <el-form-item label="工作时段3">
              <el-time-picker is-range v-model="wformline2.time3" range-separator="~" value-format="HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <div class="submitboton" v-show="tableData.length">
        <el-button size="smain" type="success" @click="wdyjSave">保存设置</el-button>
      </div>
    </el-tabs>
    <!-- 添加机柜 -->
    <el-dialog title="添加机柜" append-to-body :visible.sync="dialogaddVisible" width="30%">
      <div class="smain addjg">
        <el-form status-icon :model="formaddjg" size="small" ref="formaddjg" class="demo-form-inline" label-width="100px" label-position="left">
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
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message } from 'element-ui'
export default {
  props: ['mbxx', 'wdyjshow', 'showNum'],
  data() {
    return {
      tableData: [],
      editableTabsValue2: '-1',
      editableTabs2: [{}], //已添加的tabs
      dialogaddVisible: false,
      // 添加机柜
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
      wformline: {},
      wformline2: {},
      mbid: '',
    };
  },
  creader: function() {
    console.log("creader")
  },
  created: function() {
    this.initialize();
  },
  watch: {
    wdyjshow: function(data, olddata) {
      if (data) {
        this.initialize();
      }
    },
    showNum: function(data, olddata) {
      this.initialize();
    },
    dialogaddVisible: function(data, olddata) {
      if (data) {
        this.addjg = '';
      }
      this.initializenow(data);
    },
    editableTabsValue2: function(data, olddata) {
      if (olddata != '-1') {
        //前一个tab的数据保存及现在的tab数据赋值
        if (this.tableData[olddata]) {
          this.tableData[olddata].zdwd = this.wformline.zdwd;
          this.tableData[olddata].zgwd = this.wformline.zgwd;
          this.tableData[olddata].gzms = this.wformline2.gzms;
          this.tableData[olddata].mbwd = this.wformline2.mbwd;
          this.tableData[olddata].time1 = this.wformline2.time1;
          this.tableData[olddata].time2 = this.wformline2.time2;
          this.tableData[olddata].time3 = this.wformline2.time3;
        }

        this.wformline.zdwd = this.tableData[data].zdwd;
        this.wformline.zgwd = this.tableData[data].zgwd;
        this.wformline2.gzms = this.tableData[data].gzms;
        this.wformline2.mbwd = this.tableData[data].mbwd;
        this.wformline2.time1 = this.tableData[data].time1;
        this.wformline2.time2 = this.tableData[data].time2;
        this.wformline2.time3 = this.tableData[data].time3;

        //如果新tab 无机柜编号  则为新增 赋值机柜编号
        if (!this.tableData[data].jgbh) {
          this.tableData[data].jgbh = data;
        }
      } else {
        //新增第一个机柜时
        if (!this.tableData[data].jgbh) {
          this.tableData[data].jgbh = data;
        }
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    removedata(value) {
      this.$confirm('此操作删除该机柜,是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
        this.$message({ type: 'success', message: '删除成功!' });
        this.removeTab(value);
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' });
      });
    },
    addTab() { //添加机柜
      var jg = false;
      //需要加上空值判断
      if (this.formaddjg.addjg) {
        jg = true;
      } else if (this.formaddjg.addjg == 0) {
        jg = true;
      }

      if (jg) {
        if (!this.editableTabs2[0].name) { this.editableTabs2.splice(0, 1); }
        this.optionsjg.filter(item => { if (item.value == this.formaddjg.addjg) { item.disabled = true; } });
        let newTabName = this.formaddjg.addjg + '';
        this.editableTabs2.push({
          title: this.optionsjg[this.formaddjg.addjg].label,
          name: newTabName,
        });
        this.editableTabsValue2 = newTabName;
        var tabsdata = [];
        this.$set(this.tableData, newTabName, tabsdata);
        // this.tableData[newTabName] = tabsdata;
        this.dialogaddVisible = false;
      } else {
        this.$message({ message: '请选择机柜', type: 'error' });
        return false;
      }
    },
    removeTab(targetName) { //删除机柜
      var sfsc = 0;
      for (var key in this.tableData) {
        if (key && this.tableData[key]) {
          sfsc++;
        }
      }
      if (sfsc <= 1) { return this.$message({ message: '货道设置必须保留一个机柜', type: 'warning' }); }
      this.optionsjg[targetName].disabled = false;
      let tabs = this.editableTabs2;
      let activeName = this.editableTabsValue2;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              //清除数组中的元素
              this.tableData.splice(targetName, 1);
            }
          }
        });
      }
      this.editableTabsValue2 = activeName;
      this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      if (this.editableTabs2.length == 0) { this.editableTabs2 = [{}]; }
    },
    initializenow(val) { //弹框初始化 
      if (!val) {
        this.$refs.formaddjg.resetFields();
      } else {
        //添加机柜 默认选择下一个未添加机柜
        var nextselect = -1;
        for (let i = 0; i < this.optionsjg.length; i++) {
          if (!this.optionsjg[i].disabled) {
            nextselect = this.optionsjg[i].value;
            break;
          }
        }
        if (nextselect != -1) {
          this.formaddjg.addjg = nextselect;
        } else {
          this.formaddjg.addjg = '';
        }
      }
    },
    wdyjSave() {
      //先保存当前页数据
      this.tableData[this.editableTabsValue2].zdwd = this.wformline.zdwd;
      this.tableData[this.editableTabsValue2].zgwd = this.wformline.zgwd;
      this.tableData[this.editableTabsValue2].gzms = this.wformline2.gzms;
      this.tableData[this.editableTabsValue2].mbwd = this.wformline2.mbwd;
      this.tableData[this.editableTabsValue2].time1 = this.wformline2.time1;
      this.tableData[this.editableTabsValue2].time2 = this.wformline2.time2;
      this.tableData[this.editableTabsValue2].time3 = this.wformline2.time3;

      var wdList = [];
      for (var key in this.tableData) {
        var data = this.tableData[key];
        wdList.push({ jgbh: key, zdwd: data.zdwd, zgwd: data.zgwd, gzms: data.gzms, mbwd: data.mbwd, time1: data.time1, time2: data.time2, time3: data.time3 });
      }

      var Data = {
        mbid: this.mbid,
        wdList: wdList
      }
      request({ url: 'service-machine/mbgl/wdyjcz', method: 'post', data: Data }).then(response => {
          this.$message({ type: 'success', message: response.msg });
          if (!this.mbxx.mbid) {
            this.mbxx.mbid = response.mbid;
            this.mbid = response.mbid;
          }
          this.mbxx.hdList = this.tableData;
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        })
    },
    initialize() { //进入温度界面进行初始化
      this.wformline = {};
      this.wformline2 = {};
      this.mbid = this.mbxx.mbid;
      this.tableData = [];
      this.editableTabs2 = [{}]; //已添加的tabs
      this.optionsjg.filter(item => { item.disabled = false; });
      if (this.mbxx.mbid) {
        for (var key in this.mbxx.wdList) {
          var jgbh = this.mbxx.wdList[key].jgbh;
          this.optionsjg.filter(item => { if (item.value == jgbh) { item.disabled = true; } });
          let newTabName = jgbh + '';
          this.editableTabs2.push({
            title: this.optionsjg[jgbh].label,
            name: newTabName,
          });
          if (!this.editableTabs2[0].name) { this.editableTabs2.splice(0, 1); }
          this.editableTabsValue2 = newTabName;
          var tabsdata = this.mbxx.wdList[key];

          this.wformline.zdwd = this.mbxx.wdList[key].zdwd;
          this.wformline.zgwd = this.mbxx.wdList[key].zgwd;
          this.wformline2.gzms = this.mbxx.wdList[key].gzms;
          this.wformline2.mbwd = this.mbxx.wdList[key].mbwd;
          this.wformline2.time1 = this.mbxx.wdList[key].time1;
          this.wformline2.time2 = this.mbxx.wdList[key].time2;
          this.wformline2.time3 = this.mbxx.wdList[key].time3;

          this.$set(this.tableData, newTabName, tabsdata);
        }
      }
    }
  }
};

</script>
<style scoped>
.smain {
  padding: 10px;
  padding-left: 0px;
  margin-left: -5px;
}

.titlebtn {
  z-index: 10;
  position: absolute;
  top: 55px;
  right: 40px;
  /*padding: 13px;*/
}

.el-table {
  border-bottom: 1px solid #ebeef5;
}

.titlebtn .el-button {
  float: left;
  margin: 0 10px;
}

.mbbtn {
  float: right;
  margin-top: -60px;
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
  /*position: relative;*/
  /*left: 10px;*/
  float: right;
  margin: 5px 0 0 0;
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

.el-tab-pane div.hdys {
  padding-left: 0;
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
  margin-bottom: 10px;
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
