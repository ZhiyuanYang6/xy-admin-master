<template>
  <div class="dwsmain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="jqbsxxdata" label-position="left" size="small" class="demo-form-inline" label-width="96px">
      <el-form-item label="机器编号">
        <el-input v-model="formInline.jqbh" disabled class="inpxq"></el-input>
      </el-form-item>
      <el-form-item label="机器名称" style="margin-right: 28px;">
        <el-input v-model="formInline.jqmc" c ss="inpxq"></el-input>
      </el-form-item>
      <el-form-item label="机器类别">
        <el-select v-model="formInline.jqlb" placeholder="请选择" clearable>
          <el-option v-for="item in lboption" :key="item.value" :label="item.valuename" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      </el-form-item>
      <el-form-item label="区域">
        <el-select v-model="formInline.qyid" placeholder="请选择" filterable @change="selelx('xl',formInline.qyid)">
          <el-option v-for="item in qyoptions" :key="item.value" :label="item.qymc" :value="item.qyid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="线路">
        <el-select v-model="formInline.xlid" placeholder="请选择" filterable @change="selelx('dw',formInline.xlid,'clear')">
          <el-option v-for="item in xloption" :key="item.value" :label="item.xlmc" :value="item.xlid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="点位">
        <el-select v-model="formInline.dwid" placeholder="请选择" filterable>
          <el-option v-for="item in dwoption" :key="item.value" :label="item.dwmc" :value="item.dwid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在国家">
        <el-select v-model="formInline.szgj" placeholder="请选择" clearable>
          <el-option v-for="item in gjoptions4" :key="item.value" :label="item.valuename" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在时区">
        <el-select v-model="formInline.szsq" placeholder="请选择" clearable>
          <el-option v-for="item in sqoptions5" :key="item.value" :label="item.valuename" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="当前状态">
        <el-select v-model="formInline.dqzt" placeholder="请选择" clearable>
          <el-option v-for="item in ztoptions6" :key="item.value" :label="item.valuename" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部署人员账号">
        <el-input v-model="formInline.bsryzh" class="inpxq"></el-input>
      </el-form-item>
      <el-form-item label="部署人员姓名">
        <el-input v-model="formInline.bsryxm" class="inpxq"></el-input>
      </el-form-item>
      <el-form-item label="部署时间">
        <div class="block">
          <el-date-picker v-model="formInline.bssj" style="  width: 200px;" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>
        <!--  <el-input v-model="formInline.bssj" class="inpxq"></el-input> -->
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" style="min-height: 69px;height: 69px;width: 536px;" :autosize="{ minRows: 4, maxRows: 6}" v-model="formInline.remark" class="inpxq"></el-input>
      </el-form-item>
      <el-form-item v-show="showbtn">
        <el-button style="margin-left:950%;" @click="submitsetdetil" type="primary">修 改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  props: ['jqbsxxdata', 'qyoptions', 'showbtn'],
  data() {
    return {
      ztoptions6: [],
      sqoptions5: [],
      gjoptions4: [],
      lboption: [],
      xloption: [],
      dwoption: [],
      qyoption: [],
      formInline: {},
    };
  },
  watch: {
    qyoptions: function(data, olddata) {
      this.dictSelect("1003", 'ztoptions6');
      this.dictSelect('1006', 'sqoptions5');
      this.dictSelect('1007', 'gjoptions4');
      this.dictSelect('1000', 'lboption');
    },
    jqbsxxdata: function(data, olddata) {
      this.formInline = this.jqbsxxdata;
      if (this.jqbsxxdata.qyid) this.selelx('xl', this.jqbsxxdata.qyid);
    },
    xloption: function(data, olddata) {
      if (data) this.selelx('dw', this.jqbsxxdata.xlid);
      // this.formInline.xlid = this.formInline.xlid ? this.formInline.xlid : '';
    }
  },
  methods: {
    submitsetdetil: function() {
      request({ url: 'service-machine/shjgl/EditJqbsxx', method: 'post', data: this.formInline })
        .then(response => {
          this.loading = false;
          //this.tableData = response.list;
          this.$message({ type: 'success', message: response.Msg });
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        });
    },

    selelx(val, id, clear) {
      this.jqbsxxdata.dwid = clear ? '' : this.jqbsxxdata.dwid;
      if (val === "xl") { //请求线路opt
        var queryQyxx = { qyid: id };
        var url = 'service-machine/shjgl/queryXlxxbyqyid';
      } else if (val === 'dw') { //请求点位opt
        var queryQyxx = { xlid: id };
        var url = 'service-machine/shjgl/queryXlxxbyxlid';
      }
      request({ url: url, method: 'post', data: queryQyxx }).then(response => {
        if (val === "xl") { //请求线路opt;
          this.xloption = response;
        } else if (val === 'dw') { //请求点位opt
          this.dwoption = response;
        }
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },
    dictSelect(type, valuename) {
      var queryType = { type: type };
      request({ url: 'service-machine/shjgl/queryDict', method: 'post', data: queryType }).then(response => {
        if (valuename === 'ztoptions6') { this.ztoptions6 = response; }
        if (valuename === 'sqoptions5') { this.sqoptions5 = response; }
        if (valuename === 'gjoptions4') { this.gjoptions4 = response; }
        if (valuename === 'lboption') { this.lboption = response; }
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },
  }
}

</script>
<style scoped>
div.dwsmain {
  padding: 0px;
}

div.rightitem {
  /*float: right;*/
  /*padding-right: 100px;*/
}

.inpxq {
  width: 200px;
  margin-right: 20px;
}

.el-select {
  width: 200px;
  margin-right: 20px;
}

</style>
