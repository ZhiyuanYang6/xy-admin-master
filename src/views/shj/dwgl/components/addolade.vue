<template>
  <div @mouseover="Moveradd()">
    <el-form ref="form" class="addsublime" style="padding:30px 10px 10px 0;" :model="form" label-width="80px">
      <el-form-item label="线路名称" v-show="listrow.xlgl">
        <el-input v-model="form.xlmc"></el-input><span class="mostval">*</span>
      </el-form-item>
      <el-form-item label="线路编号" v-show="listrow.xlgl">
        <el-input v-model="form.xlbh"></el-input><span class="mostval">*</span>
      </el-form-item>
      <el-form-item label="区域名称" v-show="listrow.qygl">
        <el-input v-model="form.qymc"></el-input><span class="mostval">*</span>
      </el-form-item>
      <el-form-item label="区域编号" v-show="listrow.qygl">
        <el-input v-model="form.qybh"></el-input><span class="mostval">*</span>
      </el-form-item>
      <el-form-item label="点位名称" v-show="listrow.dwgl">
        <el-input v-model="form.dwmc"></el-input><span class="mostval">*</span>
      </el-form-item>
      <el-form-item label="点位编号" v-show="listrow.dwgl">
        <el-input v-model="form.dwbh"></el-input><span class="mostval">*</span>
      </el-form-item>
      <el-form-item label="点位地址" v-show="listrow.dwgl">
        <el-input v-model="form.dwdz"></el-input>
      </el-form-item>
      <el-form-item label="点位类型" v-show="listrow.dwgl">
        <el-select v-model="form.dwlx" placeholder="请选择" clearable>
          <el-option v-for="item in dwoptions" :key="item.value" :label="item.valuename" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="点位标识" v-show="listrow.dwgl">
        <el-input v-model="form.dwbs"></el-input>
      </el-form-item>
      <el-form-item label="点位经度" v-show="listrow.dwgl">
        <el-input v-model="form.dwjd"></el-input>
      </el-form-item>
      <el-form-item label="点位纬度" v-show="listrow.dwgl">
        <el-input v-model="form.dwwd"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remark" row="4"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">{{listrow.btn}}</el-button>
        <el-button @click="resetForm('form')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message } from 'element-ui'
export default {
  props: ['listrow', "dialogVisible"],
  data() {
    return {
      form: {
        xlmc: '',
        qymc: '',
        dwmc: '',
        xlbh: '',
        qybh: '',
        dwbh: '',
        remark: '',
        dwlx: '',
        dwdz: '',
        dwjd: '',
        dwwd: '',
        dwbs: '',
      },
      options: [],
      fromline: {
        bh: "",
        mc: "",
      },
      onceover: true,
      dwoptions: [],
    }
  },
  watch: {
    dialogVisible: function(data, olddata) {
      if (data) {
        this.onceover = data;
      }
    },
    qyoptions: function(data, olddata) {
      this.dictSelect("1017", 'dwoptions');
    },
  },
  created: function() {
    this.dictSelect("1017", 'dwoptions');
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.listrow)
          if (this.listrow.title == "添加线路" || this.listrow.title == "修改线路") {
            this.addxl();
            return;
          } else if ((this.listrow.title == "添加区域" || this.listrow.title == "修改区域")) {
            this.addqy();
            return
          } else {
            this.adddw();
            return
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$emit("dialog1Changed", 0); //发送参数到父组件 事件名，参数
    },
    addxl() {
      if (this.validator(this.form.xlmc, "线路名称")) { return }
      if (this.validator(this.form.xlbh, "线路编号")) { return }
      if (this.listrow.title == "添加线路") {
        this.onload("service-machine/dwxx/addXlxx", {
          xlmc: this.form.xlmc,
          xlbh: this.form.xlbh,
          remark: this.form.remark
        })
      } else {
        this.onload("service-machine/dwxx/updateXlxx", {
          xlmc: this.form.xlmc,
          xlbh: this.form.xlbh,
          remark: this.form.remark,
          xlid: this.listrow.xlid
        })
      }

    },
    addqy() {
      debugger;
      if (this.validator(this.form.qymc, "区域名称")) { return }
      if (this.validator(this.form.qybh, "区域编号")) { return }
      if (this.listrow.title == "添加区域") {
        this.onload("service-machine/dwxx/addQyxx", {
          qymc: this.form.qymc,
          qybh: this.form.qybh,
          remark: this.form.remark,
        })
      } else {
        this.onload("service-machine/dwxx/updateQyxx", {
          qymc: this.form.qymc,
          qybh: this.form.qybh,
          remark: this.form.remark,
          qyid: this.listrow.qyid
        })
      }
    },
    adddw() {
      if (this.validator(this.form.dwmc, "点位名称")) { return }
      if (this.validator(this.form.dwbh, "点位编号")) { return }
      if (this.listrow.title == "增加点位") {
        this.onload("service-machine/dwxx/addDwxx", this.form)
      } else {
        this.form.dwid = this.listrow.dwid;
        console.log(this.form);
        this.onload("service-machine/dwxx/updateDwxx", this.form)
      }
    },
    validator(val, type) {
      if (!val) {
        Message.warning(type + "不能为空");
        return true
      }
    },
    onload(url, data) {
      if (this.listrow.btn == "修改") {
        request({ url: url, method: 'post', data: data }).then(response => {
            Message.success(this.listrow.title + "成功");
            this.$emit("dialog1Changed", 0); //发送参数到父组件 事件名，参数
          })
          .catch(error => {
            Message.error("error：" + "请检查网络是否连接");
          })
      } else {
        request({ url: url, method: 'post', data: data }).then(response => {
            Message.success(this.listrow.title + "成功");
            this.$emit("dialog1Changed", 0); //发送参数到父组件 事件名，参数
          })
          .catch(error => {
            Message.error("error：" + "请检查网络是否连接");
          })
      }
    },

    Moveradd() { ////////////////////////进入初始化
      if (this.onceover) {
        if (this.listrow.btn == "修改") {
          this.form.xlmc = this.listrow.xlmc;
          this.form.qymc = this.listrow.qymc;
          this.form.dwmc = this.listrow.dwmc;
          this.form.xlbh = this.listrow.xlbh;
          this.form.qybh = this.listrow.qybh;
          this.form.dwbh = this.listrow.dwbh;
          this.form.remark = this.listrow.remark;
          this.form.dwlx = this.listrow.dwlx;
          this.form.dwdz = this.listrow.dwdz;
          this.form.dwjd = this.listrow.dwjd;
          this.form.dwwd = this.listrow.dwwd;
          this.form.dwbs = this.listrow.dwbs;
        } else {
          this.form = { xlmc: '', qymc: '', dwmc: '', xlbh: '', qybh: '', dwbh: '', remark: '', dwlx: '', dwdz: '', dwjd: '', dwwd: '', dwbs: '' }
        }
        this.whether();
        if (!this.options.length) this.options = this.listrow.options ? this.listrow.options : "";
        this.onceover = false;
      }
    },
    whether() {
      if (this.listrow.title == "添加线路") {
        this.form = { qymc: '1', dwmc: '1', qybh: '1', dwbh: '1' }
      } else {}
    },
    dictSelect(type, valuename) {
      var queryType = { type: type };
      request({ url: 'service-machine/shjgl/queryDict', method: 'post', data: queryType }).then(response => {
        if (valuename == 'dwoptions') { this.dwoptions = response; }
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },

  },

}

</script>
<style scoped>
/*scoped*/

.smain {
  padding: 10px;
}

.el-form,
.addsublime {
  padding: 20px 0;
}

div.el-form-item {
  margin-bottom: 20px;
}

.el-select {
  width: 100%;
}

.mostval {
  position: absolute;
  color: #f00;
  font-size: 20px;
  right: -15px;
  top: 3px;
}

</style>
