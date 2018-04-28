<template>
  <div class="smain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" :rules="rules2" ref="form" size="small" class="demo-form-inline">
      <el-form-item label="商户名称" prop="shmc">
        <el-input v-model="formInline.shmc"></el-input>
      </el-form-item>
      <el-form-item label="商户地址">
        <el-input v-model="formInline.shdz"></el-input>
      </el-form-item>
      <el-form-item label="公司电话">
        <el-input v-model="formInline.gsdh"></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input v-model="formInline.gsmc"></el-input>
      </el-form-item>
      <el-form-item label="公司传真">
        <el-input v-model="formInline.gscz"></el-input>
      </el-form-item>
      <el-form-item label="开户账号">
        <el-input v-model="formInline.khzh"></el-input>
      </el-form-item>
      <el-form-item label="开户银行">
        <el-input v-model="formInline.khyh"></el-input>
      </el-form-item>
      <el-form-item label="是否收款">
        <el-select style="width:200px;" v-model="formInline.sfksk" placeholder="请选择" clearable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" :rows="4" v-model="formInline.remark" placeholder=""></el-input>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item>
        <el-button class="subbtn" type="warning" @click="onloadtable('form')">{{listrow.btn}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  props: ['listrow', "dialogVisible"],
  data() {
    var validshmc = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('商户名称不能为空'));
      } else {
        value = value.replace(/(^\s*)|(\s*$)/g, ''); //去首尾空格
        if (!value) {
          return callback(new Error('商户名称不能为空'));
        }
      }
      setTimeout(() => {
        callback();
      }, 400);
    };
    return {
      formInline: {},
      rules2: {
        shmc: [{ validator: validshmc, trigger: 'blur' }],
      },
      options: [
        { value: 1, label: "可收款" },
        { value: 0, label: "不可收款" },
      ],
    }
  },
  created: function() {
    this.initialize();
    // this.onloadtable();
  },
  watch: {
    dialogVisible: function(data, olddata) {
      if (data) {
        this.onceover = data;
        this.initialize();
      }
    }
  },
  methods: {
    onloadtable(formName) { //保存修改
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = '';
          if (this.listrow.btn == "修改") {
            url = "/shdagl/shdaglEdit";
          } else {
            this.formInline.fshbh = '0000';
            this.formInline.fshid = 107036;
            this.formInline.szcj = 1;
            url = "/shdagl/shdaglRegist";
          }
          request({ url: url, method: 'post', data: this.formInline })
            .then(response => {
              //成功时 消息不为空
              if (response.msg) {
                this.$message({ type: 'success', message: response.msg });
                //新增商户返回编号
                if (this.listrow.btn == "添加") {
                  this.formInline.shbh = response.shbh;
                }
                this.ADSubmit();
              }
            })
            .catch(error => {
              Message.error("error： " + "请检查网络是否连接 ");
            })
        } else {
          this.$message({ message: '表单验证未通过', type: 'error' });
          return false;
        }
      })
    },
    initialize() { ////////////////////////进入初始化
      if (this.listrow.btn == "修改") {
        this.formInline = this.listrow;
        console.log(this.listrow);
        // this.listrow = this.form;
      } else {
        this.formInline = {
          shmc: '',
          shdz: '',
          gsdh: '',
          gsmc: '',
          gscz: '',
          khzh: '',
          khyh: '',
          sfksk: '',
          remark: ''
        }
      }
    },
    ADSubmit() {
      this.onceover = true;
      this.$emit("dialog1Changed", this.formInline); //发送参数到父组件 事件名，参数
    },
  },
}

</script>
<style scoped>
.smain {
  padding: 10px 0;
}

div.el-input {
  width: 200px;
  margin-right: 20px;
}

div.el-textarea {
  margin-left: 24px;
  margin-bottom: 35px;
  width: 238%;
}

.subbtn {
  position: relative;
  top: 100px;
  right: -230px;
}

</style>
