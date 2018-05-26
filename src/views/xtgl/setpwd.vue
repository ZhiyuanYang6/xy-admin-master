<template>
  <div class="smain" v-loading="loading">
    <section class="form-page">
      <el-form :rules="rules" ref="ruleForm" :model="form" label-width="80px">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="checkCode">
          <el-input v-model="form.checkCode" style="width: 200px"></el-input>
          <el-button size="mini" :loading="loading" type="primary" :disabled="yzmdis" @click="getCheckCodebtn()">获取验证码</el-button>
        </el-form-item>
        <el-form-item label="新 密 码" prop="pass">
          <el-input v-model="form.pass" type="password" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="apwd">
          <el-input v-model="form.apwd" type="password" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button-group class="btn-group">
            <el-button size="medium" :loading="loading" type="primary" @click="$router.go(-1)">返回</el-button>
            <el-button size="medium" :loading="loading" type="primary" @click="submitEdit('ruleForm')">保存</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
// import request from '@/utils/request'
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import { getCheckCode, resetPass } from '@/api/login'
import { validatephone } from '@/utils/validate'
import md5 from 'js-md5';
export default {
  name: 'hyzlgl',
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  data() {
    var validpass = (rule, value, callback) => {
      if (!value && value !== 0 || value.length > 20) {
        return callback(new Error('请输入20位以内的数字、字母、符合组合'));
      } else {
        setTimeout(() => {
          callback();
        }, 400);
      }
    };
    var validapwd = (rule, value, callback) => {
      if (this.form.pass !== value || !value) {
        return callback(new Error('密码不一致'));
      } else {
        setTimeout(() => {
          callback();
        }, 400);
      }
    };
    var validphone = (rule, value, callback) => {
      if (validatephone(value)) {
        this.yzmdis = true;
        return callback(new Error('请输入正确的手机号'));
      } else {
        this.yzmdis = false;
        setTimeout(() => {
          callback();
        }, 400);
      }
    };
    var validcheckCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入验证码'));
      } else {
        setTimeout(() => {
          callback();
        }, 400);
      }
    };
    return {
      usermate: this.$globalApi.getSessionStorage('userInfo'),
      loading: false,
      form: {
        phone: '',
        checkCode: '',
        pass: '', // 密码
        apwd: '', // 确认密码
      },
      rules: {
        phone: [{ required: true, validator: validphone, trigger: 'blur' }],
        pass: [{ required: true, validator: validpass, trigger: 'blur' }],
        apwd: [{ required: true, validator: validapwd, trigger: 'blur' }],
        checkCode: [{ required: true, validator: validcheckCode, trigger: 'blur' }],
      },
      yzmdis: true,
    };
  },
  created: function() { //初始化
    console.log(this.usermate); //用户账号信息
  },
  methods: {
    submitEdit(formName) { //修改密码
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          let data = {
            checkCode: this.form.checkCode,
            phone: this.form.phone,
            pass: md5(this.form.phone + this.form.pass), //只进行一次加密
          };
          resetPass(data).then(response => {
            this.loading = false;
            if (response.code) {
              this.$message.error(response.data.msg);
            } else {
              // this.$message({ message: '操作成功！', type: 'success' });
              // this.$router.push('ptzygl');
            }
          }).catch(error => {
            this.loading = false;
            console.log(error.data);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getCheckCodebtn() {
      if (!validatephone(this.form.phone)) {
        this.loading = true;
        getCheckCode(this.form.phone.toString()).then(response => {
          this.loading = false;
          console.log(response);
          if (response.code) {

          } else {
            this.$message({ message: '验证码已发送到您的手机，请注意查看！', type: 'success' });
          }
        }).catch(error => {
          this.loading = false;
          console.log(error.data);
        });
      } else {
        this.$message({ message: '请输入正确的手机号', type: 'warning' });
      }
    },
  }
};

</script>
<style scoped>
.smain {
  padding: 50px;
}

</style>
