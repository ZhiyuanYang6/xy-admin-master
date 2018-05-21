<template>
  <div class="login-container">
    <!--     <video id="v1" autoplay muted loop style="width: 100%">
      <source src="../../assets/backlogin.mp4">
    </video> -->
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="title-container">
        <h3 class="title">{{$t('login.title')}}</h3>
        <lang-select class="set-language"></lang-select>
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <i class="iconfont icon-user"></i>
        </span>
        <el-input name="username" type="text" v-model.trim="loginForm.username" autoComplete="off" placeholder="请输入登录账号" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="iconfont icon-et-change-password"></i>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="请输入登录密码"></el-input>
        <span class="show-pwd" @click="showPwd"><i :class="{'iconfont':true,'icon-web__kejian':eyeshow, 'icon-web__bukejian':!eyeshow}"></i>
          <!-- <svg-icon icon-class="eye" /> -->
        </span>
      </el-form-item>
      <el-form-item class="yzmitem" v-if="verificaCodeCount > 1">
        <span class="svg-container">
          <i class="iconfont icon-et-change-password"></i>
        </span>
        <el-input class="yzm" maxlength="4" @keyup.enter.native="handleLogin" v-model.number="loginForm.verificaCode" placeholder="验证码"> </el-input>
        <span class="verifica-code-img" @click="replaceCode()">{{initverificaCode}}</span>
      </el-form-item>
      <div class="save-password">
        <el-checkbox v-model="savePassword">记住密码</el-checkbox>
        <el-tooltip placement="right" effect="light" content="请联系系统管理员">
          <p class="forgot-password pointer">忘记密码？</p>
        </el-tooltip>
      </div>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          {{$t('login.logIn')}}
        </el-button>
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;">{{$t('login.username')}}: admin</span>
        <span> {{$t('login.password')}}: 000000</span>
      </div>
    </el-form>
  </div>
</template>
<script>
import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import { getReplaceCode } from '@/api/login'
import md5 from 'js-md5';
export default {
  components: {
    LangSelect
  },
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (!value) { callback(new Error('请输入密码')) } else {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'));
        } else {
          callback();
        }
      }

    };
    return {
      savePassword: true,
      loginForm: {
        username: this.$globalApi.getLocalStorage('AccountNumber') ? this.$globalApi.getLocalStorage('AccountNumber') : 'admin', // 读取用户账号
        password: this.$globalApi.getLocalStorage('AccountPassword') ? this.$globalApi.getLocalStorage('AccountPassword') : '000000', // 读取用户密码
        verificaCode: '',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      eyeshow: true,
      initverificaCode: '',
      verificaCodeCount: 0 //第一次不显示验证码
    }
  },
  created: function() {
    this.replaceCode();
  },
  methods: {
    showPwd() {
      this.eyeshow = !this.eyeshow;
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          let password = md5(this.loginForm.username + this.loginForm.password);
          password = md5(`${this.loginForm.username}${password}${this.loginForm.verificaCode}`);
          this.$store.dispatch('Login', { password, account: this.loginForm.username, checkCode: this.loginForm.verificaCode }).then(res => {
            if (res.code) {
              this.replaceCode();
            } else {
              this.loading = false;
              this.$globalApi.setLocalStorage('AccountNumber', this.loginForm.username); // 储存用户账号
              this.savePassword ? this.$globalApi.setLocalStorage('AccountPassword', this.loginForm.password) : this.$globalApi.removeLocalStorage('AccountPassword');
              this.$message({ message: '登录成功！', type: 'success' });
              this.$router.push({ path: '/' });
            }
          }).catch((error) => {
            this.loading = false;
            this.replaceCode();
            // this.$message({ message: error.data, type: 'error' });
            console.log('登录失败');
          });
        } else {

          console.log('error submit!!')
          return false
        }
      })
    },
    replaceCode() { //获取验证码
      getReplaceCode().then(response => {
        this.initverificaCode = response;
        if (this.verificaCodeCount === 0) {
          this.loginForm.verificaCode = response;
        } else {
          this.loginForm.verificaCode = null;
        }
        this.verificaCodeCount++;
      }).catch(error => {
        // console.log(error.data) 
        this.initverificaCode = '0000';
        if (this.verificaCodeCount === 0) {
          this.loginForm.verificaCode = '0000';
        } else {
          this.loginForm.verificaCode = null;
        }
        this.verificaCodeCount++;
      })

    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss">
.verifica-code-img {
  display: inline-block;
  width: 105px;
  float: right;
  height: 47px;
  margin-left: 0px;
  line-height: 47px;
  text-align: center; // border-radius: 3px;
  background-color: #BFEEFE;
  font-size: 16px;
  cursor: pointer;
  letter-spacing: 7px;
  color: #0300FF;
}


$bg:#2d3a4b;
$light_gray:#ecf5ff;
.login-container {
  div.yzm {
    width: 50%;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .login-container .yzmitem .el-form-item__content {}
  .el-form-item {
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>
<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    .iconfont {
      font-size: 22px;
    }
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}

.save-password {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #acacac;
  font-size: 14px;
  margin-top: -10px;
  justify-content: space-between;
}

.save-password .forgot-password {
  position: relative;
  top: -1px;
}

.save-password .forgot-password:hover {
  color: #20a0ff;
}

.el-checkbox,
.el-checkbox.is-checked {
  color: #acacac;
}

</style>
