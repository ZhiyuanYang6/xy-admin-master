<template>
  <div class="hdys wdyj">
    <el-tabs type="card">
      <el-tab-pane label="主机">
        <div class="wdbj">
          <i class="iconfont icon-wenkongqi"></i>
          <span>温度报警设置</span>
          <hr>
          <el-form ref="form" :model="wformline" label-width="70px" size="mini">
            <el-form-item label="低温报警">
              <el-input v-model="wformline.dw"></el-input>
              <div class="deil">
                <span style="padding:0 5px;">°C</span>温度
                <span>低于</span> 设置温度值时机器报警
              </div>
            </el-form-item>
            <el-form-item label="高温报警">
              <el-input v-model="wformline.gw"></el-input>
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
          <el-form ref="form" :model="wformline2" label-position="left" label-width="80px" size="mini">
            <el-form-item label="工作模式">
              <el-checkbox-group v-model="wformline2.typeOptions" size="mini">
                <el-checkbox-button label="制冷">制冷</el-checkbox-button>
                <el-checkbox-button label="制热">制热</el-checkbox-button>
                <el-checkbox-button label="恒温">恒温</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="工作温度">
              <el-input v-model="wformline2.gw"></el-input>
              <span style="padding:0 5px;color:#F78989">°C</span>
            </el-form-item>
            <el-form-item label="工作时段1">
              <el-time-picker is-range v-model="wformline2.time1" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
              </el-time-picker>
            </el-form-item>
            <el-form-item label="工作时段2">
              <el-time-picker is-range v-model="wformline2.time2" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
            </el-form-item>
            <el-form-item label="工作时段3">
              <el-time-picker is-range v-model="wformline2.time3" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="副机1">副机1</el-tab-pane>
      <el-tab-pane label="副机2">副机2</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName2: 'first',
      wformline: {
        dw: "2",
        gw: "10"
      },
      wformline2: {
        dw: "2",
        gw: "10",
        typeOptions: ['制冷'],
        time1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        time2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        time3: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
      }
    };
  },
  creader: function() {
    console.log("creader")
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};

</script>
<style scoped>
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






















/*表单*/

div.el-input {
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
















































/********copy**********/

.time {
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

</style>
