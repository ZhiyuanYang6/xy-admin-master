<template>
  <div class="hdys wdyj">
    <el-tabs type="card" @tab-click="handleClick" v-model="showtabs">
      <el-tab-pane v-for="item in tabslx" :key="item.key" :label="item.label" :name="item.key">
        <div class="wdbj">
          <i class="iconfont icon-wenkongqi"></i>
          <span>温度报警设置</span>
          <hr>
          <el-form ref="form" :model="wformline" label-width="70px" size="mini">
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
          <el-form ref="form" :model="wformline2" label-position="left" label-width="80px" max="1" size="mini">
            <el-form-item label="工作模式">
              <el-radio-group v-model="wformline2.gzms" size="mini">
                <el-radio-button label="1">制冷</el-radio-button>
                <el-radio-button label="2">制热</el-radio-button>
                <el-radio-button label="3">恒温</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="工作温度">
              <el-input v-model="wformline2.mbwd"></el-input>
              <span style="padding:0 5px;color:#F78989">°C</span>
            </el-form-item>
            <el-form-item label="工作时段1">
              <el-time-picker is-range v-model="wformline2.time1" value-format="HH:mm:ss" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
              </el-time-picker>
            </el-form-item>
            <el-form-item label="工作时段2">
              <el-time-picker is-range v-model="wformline2.time2" value-format="HH:mm:ss" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
            </el-form-item>
            <el-form-item label="工作时段3">
              <el-time-picker is-range v-model="wformline2.time3" value-format="HH:mm:ss" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="副机1">副机1</el-tab-pane>
      <el-tab-pane label="副机2">副机2</el-tab-pane> -->
    </el-tabs>
    <hr>
    <div class="frommain">
      <el-button type="primary" size="small" @click="onloadwdyj()">保存</el-button>
      <el-button type="primary" style="margin: 10px 20px;" v-show="showtabs!=='0'" size="small" @click="copydate()">复制主机设置</el-button>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  props: ['listrow', "dialogwdyj"],
  data() {
    return {
      tabslx: [],
      tabeldates: [],
      oldtab: "主机",
      activeName2: 'first',
      wformline: {
        zdwd: "0",
        zgwd: "100"
      },
      showtabs: '0',
      wformline2: {
        gzms: "1",
        mbwd: "0",
        typeOptions: ['制冷'],
        time1: ['00:00:00', '23:59:59'],
        time2: ['00:00:00', '23:59:59'],
        time3: ['00:00:00', '23:59:59']
      }
    };
  },
  created: function() {
    var tabname = new Array();
    tabname[0] = { key: "0", label: "主机" }
    for (var i = 1; i < this.listrow.jgsl; i++) {
      tabname[i] = { value: 'i', label: "副机" + i }
    }
    this.wformline2 = {
    };
    this.wformline = {
    }
    this.tabslx = tabname;
    console.log(this.listrow)
    this.onloadtable()
    //this.wformline = this.listrow;
  },
  watch: {
    dialogwdyj: function(data, olddata) {
      if (data) {
        this.wformline2 = {
        };
        this.wformline = {
        }
        this.onloadtable();
        var tabname = new Array();
        tabname[0] = { key: "0", label: "主机" }
        for (var i = 1; i < this.listrow.jgsl; i++) {
          tabname[i] = { value: 'i', label: "副机" + i }
        }
        this.tabslx = tabname;
        console.log(this.listrow)
        this.onloadtable()
      }
    }
  },
  methods: {
    handleClick(tab, event) { //选中的 机器 类型 （主副机）
      for (var i = 0; i < this.listrow.jgsl; i++) {
        if (tab.label == "副机" + i) {
          if (this.tabeldates[i] != undefined) {
            this.wformline = this.tabeldates[i];
            this.wformline2 = this.tabeldates[i];
          } else {
            this.wformline = {};
            this.wformline2 = {};
          }
          this.oldtab = "副机" + i;
          break;
        } else if (tab.label == "主机") {
          if (this.tabeldates[0] != undefined) {
            this.wformline2 = this.tabeldates[0];
            this.wformline = this.tabeldates[0];
          }
          this.oldtab = "主机" + i;
          break;
        }
      }
      this.onloadtable();
    },
    copydate() {
      this.wformline = this.tabeldates[0];
      this.wformline2 = this.tabeldates[0];
    },
    onloadtable() {
      var url = 'service-machine/shjgl/queryjqwdbj';
      request({ url: url, method: 'post', data: { jqbh: this.listrow.jqbh } }).then(response => {
        this.tabeldates = response;
        for (var i = 0; i < this.listrow.jgsl; i++) {
          if (this.oldtab == "副机" + i) {
            if (this.tabeldates[i] != undefined) {
              this.wformline = this.tabeldates[i];
              this.wformline2 = this.tabeldates[i];
            }


            this.oldtab = "副机" + i;
            break;
          } else if (this.oldtab == "主机") {
            if (this.tabeldates[0] != undefined) {
              this.wformline2 = this.tabeldates[0];
              this.wformline = this.tabeldates[0];
            }

            this.oldtab = "主机";
            break;
          }
        }
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      })
    },
    onloadwdyj() {
      console.log(this.wformline2)
      var jgbh;
      if (this.oldtab == "主机") {
        jgbh = 0;
      } else {
        jgbh = this.oldtab.substring(2);
      }
      this.wformline.jqbh = this.listrow.jqbh;
      this.wformline.jgbh = jgbh;
      var editjqwd = {
        wd: this.wformline,
        sj: this.wformline2

      }
      request({ url: 'service-machine/shjgl/editjqwdbj', method: 'post', data: editjqwd }).then(response => {
        this.$message({ type: 'success', message: response.Msg });
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接2");
      });
    }
  }
};

</script>
<style scoped>
.hdys {
  padding: 5px;
  padding-top: 15px;
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

.frommain:before,
.frommain:after,
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
  clear: both
}

.frommain button {
  float: right;
  position: relative;
  margin: 10px 0;
}

</style>
