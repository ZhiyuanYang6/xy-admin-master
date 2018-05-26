<template>
  <el-card class="full-card" v-loading="loading">
    <el-form :rules="rules" ref="ruleForm" :model="form" label-width="85px">
      <el-form-item label="所属组织" prop="orgidCope">
        <el-cascader style="width: 100%" :options="organizationData" v-model="form.orgidCope" :change-on-select=true :props="props">
        </el-cascader>
      </el-form-item>
      <el-form-item label="账号" prop="accountname">
        <el-input v-model.trim="form.accountname" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="username">
        <el-input v-model.trim="form.username"></el-input>
      </el-form-item>
      <el-form-item label="权限级别" prop="authlevel">
        <el-select size="small" v-model="form.authlevelName" placeholder="选择权限级别" style="width: 100%">
          <el-option v-for="(value,key) in qxjbopt" :key="key" :label="value.label" :value="value.label"></el-option>
        </el-select>
        <!-- <el-input v-model.trim="form.authlevelName"></el-input> -->
      </el-form-item>
      <el-form-item label="用户岗位" prop="job">
        <el-select size="small" v-model="form.job" placeholder="选择用户岗位" style="width: 100%">
          <el-option v-for="(value,key) in JOBDATA" :key="key" :label="value" :value="Number(key)"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="办公电话" prop="telephone">
        <el-input v-model.trim="form.telephone"></el-input>
      </el-form-item>
      <el-form-item label="E-mail" prop="email">
        <el-input v-model.trim="form.email"></el-input>
      </el-form-item>
      <el-form-item label="封锁标志" prop="lockflag" v-if="isEdit">
        <el-select size="small" v-model="form.lockflag" placeholder="选择封锁标志">
          <el-option v-for="(value,key) in LOCKFLAGALLDATA" :key="key" :label="value" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封锁原因" prop="lockreason" v-if="isEdit">
        <el-input v-model.trim="form.lockreason"></el-input>
      </el-form-item>
      <el-form-item class="submit-row">
        <el-button class="submit-btn" :loading="loading" type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { getMyOrgTree, getDicts, getUserInfoById, editUserInfo, saveUserInfo } from '@/api/file'
import request from '@/utils/request'
import { Message, MessageBox } from 'element-ui'
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) return callback(new Error('手机号不能为空'))
      setTimeout(() => {
        // if (!(/^1[34578]\d{9}$/.test(value))) {
        // return callback(new Error('请输入正确的手机号'));
        // } else {
        callback()
        // }
      }, 500);

    };
    return {
      organizationData: [], // 组织 源数据
      JOBDATA: [], // 用户岗位 源数据
      LOCKFLAGALLDATA: [], // 封锁标志 源数据
      loading: false,
      form: {
        accountname: '', // 账户名
        username: '', // 姓名
        authlevel: '3', // 权限级别
        authlevelName: '',
        job: null, //用户岗位
        telephone: '', // 办公电话
        email: '', // E-mail
        orgidCope: [], // 所属组织
        lockflag: '', // 封锁标志
        lockreason: '', // 封锁原因
        datagroup: '', // 数据权限
      },
      qxjbopt: [
        { value: '2', label: '应用管理员' },
        { value: '3', label: '普通用户' },
      ],
      props: {
        value: 'nodeId',
        label: 'nodeName',
        children: 'childList',
      },
      rules: {
        accountname: [
          { required: true, validator: checkPhone, trigger: 'blur' },
        ],
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
        ],
        orgidCope: [
          { type: "array", required: true, message: '请选择所属组织', trigger: 'change' }
        ],
        job: [
          { type: "number", required: true, message: '请选择岗位', trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    isEdit() {
      return this.$route.meta.isEdit; // 根据meta判断
    }
  },
  mounted() { // 查询并且初始化页面数据
    this.form.userid = this.$route.query.userid; //获取本页面的userid
    this.initData();
    if (this.isEdit) {
      this.getUserMsg();
    }
  },
  methods: {
    initData() { //获取组织服务源数据
      request({ url: '/sram/archives/getMyOrgTree', method: 'post' }).then(response => {
        if (response.code) {
          Message.error(response.msg);
        } else {
          this.organizationData = response;
        }
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
      //获取封锁标志和用户岗位 源数据
      request({ url: '/sram/config/dict/getDicts', method: 'get', params: { dictNames: 'job,LOCKFLAG' } }).then(response => {
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          this.LOCKFLAGALLDATA = response.LOCKFLAG;
          this.JOBDATA = response.job;
        }
      }).catch(error => {
        console.log(error.data);
      });
    },
    getUserMsg() { // 根据传入id 查询用户信息
      this.loading = true;
      request({ url: '/sram/archives/getUserInfoById', method: 'get', params: { id: this.form.userid } }).then(response => {
        this.loading = false;
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          this.form = response;
          this.form.orgidCope = response.orgids.split(',').map(s => +s);
        }
      }).catch(error => {
        this.loading = false;
        console.log(error.data);
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.orgids = this.form.orgidCope.join();
          const orgid = this.form.orgidCope;
          this.form.orgid = orgid.length > 0 ? orgid[orgid.length - 1] : null;
          if (this.isEdit) {
            this.submitEdit();
          } else {
            this.submitAdd();
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitEdit() {
      this.loading = true;
      editUserInfo(this.form).then(response => {
        this.loading = false;
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          this.$message({ message: '编辑成功！', type: 'success' });
          this.$router.push('wdtd');
        }
      }).catch(error => {
        this.loading = false;
        console.log(error.data);
      });
    },
    submitAdd() {
      this.loading = true;
      saveUserInfo(this.form).then(response => {
        this.loading = false;
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          this.$message({
            duration: 0,
            showClose: true,
            message: ' 添加成功! 初始密码为: ' + response.pass + ' 已发送至该用户手机 ',
            type: 'success'
          });
          this.form.accountname = '';
          this.form.telephone = '';
          this.form.email = '';
          this.$router.push({ path: 'management', query: { userid: response.userid, username: this.form.username } });
        }
      }).catch(error => {
        this.loading = false;
        console.log(error.data);
      });
    }
  }
};

</script>
<style scoped>
.el-form {
  width: 500px;
}

</style>
