<template>
  <div class="smain">
    <!-- 左侧表单 -->
    <el-form :inline="true" label-width="80px" label-position="left" :model="formInline" :rules="rules2" ref="form" size="small" class="demo-form-inline">
      <el-form-item label="登录账号" prop="accountname" v-show="accountnameVisible">
        <el-input v-model="formInline.accountname" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="商户名称" prop="shmc">
        <el-input v-model="formInline.shmc" :disabled='!accountnameVisible' maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input v-model="formInline.gsmc" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label=" 联 系 人">
        <el-input v-model="formInline.lxr" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="formInline.lxdh" :disabled='!accountnameVisible' maxlength="30"></el-input>
      </el-form-item>
      <!--       <el-form-item label="开户账号">
  <el-input v-model="formInline.khzh" maxlength="30"></el-input>
</el-form-item>
<el-form-item label="开户银行">
  <el-input v-model="formInline.khyh" maxlength="40"></el-input>
</el-form-item> -->
      <el-form-item label="是否收款">
        <el-select style="width:200px;margin-right:20px" v-model="formInline.sfksk" placeholder="请选择" clearable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商户地址">
        <el-input v-model="formInline.shdz" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" :rows="4" v-model="formInline.remark" placeholder="" maxlength="80"></el-input>
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
    var validaccountname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('登录账号不能为空'));
      } else {
        value = value.replace(/(^\s*)|(\s*$)/g, ''); //去首尾空格
        if (!value) {
          return callback(new Error('登录账号不能为空'));
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
        accountname: [{ validator: validaccountname, trigger: 'blur' }],
      },
      options: [
        { value: '1', label: "可收款" },
        { value: '0', label: "不可收款" },
      ],
      accountnameVisible: '',
    }
  },
  created: function() {
    this.initialize();
    // this.onloadtable();
  },
  watch: {
    dialogVisible: function(data, olddata) {
      if (data) {
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
            url = "service-machine/shdagl/shdaglEdit";
          } else {
            url = "service-machine/shdagl/shdaglRegist";
          }
          //console.log(this.formInline);
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
        //this.formInline = this.listrow;
        this.accountnameVisible = false;
        this.formInline = {
          shbh: this.listrow.shbh,
          shmc: this.listrow.shmc,
          oldshmc: this.listrow.shmc,
          shdz: this.listrow.shdz,
          lxdh: this.listrow.lxdh,
          gsmc: this.listrow.gsmc,
          lxr: this.listrow.lxr,
          khzh: this.listrow.khzh,
          khyh: this.listrow.khyh,
          sfksk: this.listrow.sfksk,
          remark: this.listrow.remark,
          userid: this.listrow.userid
        }
        //console.log(this.listrow);
        // this.listrow = this.form;
      } else {
        this.accountnameVisible = true;
        this.formInline = {
          shmc: '',
          shdz: '',
          lxdh: '',
          gsmc: '',
          lxr: '',
          khzh: '',
          khyh: '',
          sfksk: '',
          remark: ''
        }
      }
    },
    ADSubmit() {
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
  /*margin-left: 24px;*/
  /*margin-bottom: 35px;*/
  width: 520px;
}

.subbtn {
  margin-left: 520px;
  /*float: right;*/
  /*position: relative;*/
  /*top: 100px;*/
  /*right: -230px;*/
}

</style>
