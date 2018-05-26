<template>
  <el-card class="full-card">
    <div v-loading="loading">
      <section class="form-page">
        <el-form :rules="rules" ref="ruleForm" :model="form" label-width="85px">
          <!--           <el-form-item label="资源类型" prop="resourcetype">
            <el-select v-model="form.resourcetype" placeholder="选择资源类型" style="width: 300px">
              <el-option v-for="(value,key) in RESOURCETYPEAllData" :key="key" :label="value" :value="key"></el-option>
            </el-select>
          </el-form-item> -->
          <!--           <el-form-item label="系统名称" prop="systemid">
            <el-select v-model="form.systemid" placeholder="选择系统名称" style="width: 300px">
              <el-option v-for="(value,key) in ALLSYSTEMAllData" :key="key" :label="value" :value="key"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="分组菜单" prop="orgidCope">
            <el-cascader v-model.trim="form.orgidCope" style="width: 300px" clearable :options="organizationData" :props="props" placeholder="选择所属组织" :change-on-select=true></el-cascader>
          </el-form-item>
          <el-form-item label="资源名称" prop="name">
            <el-input v-model.trim="form.name" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="资源" prop="url">
            <el-input v-model.trim="form.url" style="width: 300px"></el-input>
          </el-form-item>
          <el-button-group class="btn-group">
            <el-button size="medium" :loading="loading" type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button size="medium" :loading="loading" type="primary" @click="$router.go(-1)">返回</el-button>
          </el-button-group>
        </el-form>
      </section>
    </div>
  </el-card>
</template>
<script>
import { getResourceInfoById, editResourceInfo, saveResourceInfo } from '@/api/resource'
import { getDicts } from '@/api/index'
import request from '@/utils/request'

export default {
  data() {
    return {
      loading: false,
      // RESOURCETYPEAllData: [], //保存资源类型   源数据
      // ALLSYSTEMAllData: [], //保存系统名称   源数据
      organizationData: [], // 组织源数据
      form: {
        name: '', // 资源名称
        url: '', // 资源
        resourcetype: this.$store.state.user.resourcetype, // 资源类型
        orgidCope: [],
        systemid: this.$store.state.user.systemid, // 系统类型
        resourceid: '', // 资源id
      },
      rules: {
        name: [
          { required: true, message: '资源名称不能为空', trigger: 'blur' },
        ],
      },
      props: {
        value: 'nodeId',
        label: 'nodeName',
        children: 'childList'
      },
    };
  },
  computed: {
    isEdit() {
      return this.$route.meta.isEdit; // 根据meta判断
    }
  },
  mounted() { // 查询并且初始化页面数据
    this.form.resourceid = this.$route.query.resourceid; //获取本页面的resourceid
    this.initData();
    if (this.isEdit) {
      this.getUserMsg();
    }
  },
  methods: {
    initData() {
      request({ url: '/sram/archives/getMyOrgTree', method: 'post' }).then(response => {
        this.organizationData = response;
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
      //////////////////////////////
      // getDicts('commResourceType,ALLSYSTEM').then(function(response) {
      //   if (response.code) {
      //     this.$message.error(response.data.msg);
      //   } else {
      //     this.RESOURCETYPEAllData = response.data.commResourceType;
      //     this.ALLSYSTEMAllData = response.data.ALLSYSTEM;
      // this.RESOURCETYPEAllData = [];
      // this.ALLSYSTEMAllData = [];
      //   }
      // }).catch(function(error) {
      //   console.log(error.data);
      // });
    },
    getUserMsg() { // 根据传入id 查询普通资源信息
      this.loading = true;
      getResourceInfoById(this.form.resourceid).then(response => { // 获取普通资源信息
        this.loading = false;
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          this.form = response;
        }
      }).catch(function(error) {
        console.log(error.data);
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
    submitEdit() { //编辑普通资源
      self.loading = true;
      editResourceInfo(this.form).then(response => {
        this.loading = false;
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          this.$message({ message: '操作成功！', type: 'success' });
          this.$router.push('ptzygl');
        }
      }).catch(error => {
        this.loading = false;
        console.log(error.data);
      });
    },
    submitAdd() { //添加普通资源
      this.loading = true;
      saveResourceInfo(this.form).then(response => {
        this.loading = false;
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          this.$message({ message: '操作成功！', type: 'success' });
          this.form.name = '';
          this.form.orgidCope = [];
          this.form.url = '';
        }
      }).catch(error => {
        this.loading = false;
        console.log(error.data);
      });
    }
  }
};

</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
// .form-page
//   max-width 960px
// .btn-group
//   margin-left 150px

</style>
