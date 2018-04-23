<template>
  <div @click="update()">
    <el-form ref="form" class="addsublime" style="padding:30px 10px 10px 0;" :model="form" label-width="80px">
      <el-form-item label="线路名称" v-show="listrow.xlmc">
        <el-input v-model="form.xlmc"></el-input><span class="mostval">*</span>
      </el-form-item>
      <el-form-item label="线路编号" v-show="listrow.xlmc">
        <el-input v-model="form.xlbh"></el-input><span class="mostval">*</span>
      </el-form-item>
      <el-form-item label="区域名称" v-show="listrow.qymc">
        <el-input v-model="form.qymc"></el-input><span class="mostval">*</span>
      </el-form-item>
      <el-form-item label="区域编号" v-show="listrow.qymc">
        <el-input v-model="form.qybh"></el-input><span class="mostval">*</span>
      </el-form-item>
      <el-form-item label="点位名称" v-show="listrow.dwmc">
        <el-input v-model="form.dwmc"></el-input><span class="mostval">*</span>
      </el-form-item>
      <el-form-item label="点位编号" v-show="listrow.dwmc">
        <el-input v-model="form.dwbh"></el-input><span class="mostval">*</span>
      </el-form-item>
      <el-form-item label="点位地址" v-show="listrow.dwbh">
        <el-input v-model="form.dwdz"></el-input>
      </el-form-item>
      <el-form-item label="点位类型" v-show="listrow.dwbh">
        <el-select v-model="form.dwlx" placeholder="请选择" clearable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="点位标识" v-show="listrow.dwbh">
        <el-input v-model="form.dwbs"></el-input>
      </el-form-item>
      <el-form-item label="点位经度" v-show="listrow.dwbh">
        <el-input v-model="form.dwjd"></el-input>
      </el-form-item>
      <el-form-item label="点位纬度" v-show="listrow.dwbh">
        <el-input v-model="form.dwwd"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remark" row="4"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
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
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.listrow.xlmc) {
            this.addxl();
            return;
          } else if (this.listrow.qymc) {
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
      this.onload("url", { xlmc: this.form.xlmc, xlbh: this.form.xlmc })
    },
    addqy() {
      if (this.validator(this.form.qymc, "区域名称")) { return }
      if (this.validator(this.form.qybh, "区域编号")) { return }
      this.onload("url", { xlmc: this.form.xlmc, qybh: this.form.qymc })
    },
    adddw() {
      // debugger;
      if (this.validator(this.form.dwmc, "点位名称")) { return }
      if (this.validator(this.form.dwbh, "点位编号")) { return }
      this.onload("url", this.form)
    },
    validator(val, type) {
      if (!val) {
        Message.warning(type + "不能为空");
        return true
      }
    },
    onload(url, data) {
      // request({ url: url, method: 'post', data: data }).then(response => {
      Message.success("添加成功");
      this.$emit("dialog1Changed", 0); //发送参数到父组件 事件名，参数
      // })
      // .catch(error => {
      // Message.error("error：" + "请检查网络是否连接");
      // })
    },
    update() {
      this.options = this.listrow.dwlx ? this.listrow.dwlx : "";
    }
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
