<template>
  <el-card class="full-card">
    <el-form :rules="rules" ref="ruleForm" :model="form" label-width="80px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model.trim="form.name" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="角色类型" prop="roletype">
        <el-select v-model="form.roletype" placeholder="请选择" style="width: 300px">
          <el-option v-for="(value, key) in roleTypeData" :key="key" :label="value" :value="Number(key)">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input type="textarea" v-model.trim="form.description" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" :loading="loading" @click="onSubmit('ruleForm')">保存</el-button>
        <el-button size="medium" type="primary" @click="$router.go(-1)">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { getRoleById, newRoleinfo, editRoleinfo } from '@/api/authority'
import { getDicts } from '@/api/index'

export default {
  data() {
    return {
      loading: false,
      form: {
        name: '',
        roletype: null,
        description: '',
        id: '',
      },
      roleTypeData: {}, // 角色类型
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        roletype: [
          { type: 'number', required: true, message: '请选择角色类型', trigger: 'change' }
        ]
      }
    }

  },
  computed: { //计算属性的使用 判断是否是编辑状态
    isEdit() {
      return this.$route.meta.isEdit; // 根据meta判断
    }
  },
  mounted() {
    this.initData(); //初始化页面信息
    this.form.roleid = this.$route.query.roleid; //根据id查看角色信息
    if (this.isEdit) {
      this.tableData();
    }
  },
  methods: {
    initData() {
      getDicts('roleType').then(response => {
        if (!response.code) {
          this.roleTypeData = response.roleType;
        }
      });
    },
    tableData() { //获取角色列表
      this.loading = true;
      getRoleById(this.form.roleid).then(response => {
        this.loading = false;
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          this.form = response;
          this.form.id = response.roleid;
        }
      }).catch(error => {
        this.loading = false;
        console.log(error);
      });
    },
    onSubmit(formName) { //提交
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
    submitEdit() { //编辑
      this.loading = true;
      editRoleinfo(this.form).then(response => {
        this.loading = false;
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          this.$message({ message: '操作成功！', type: 'success' });
          this.$router.push('jsgl');
        }
      }).catch(error => {
        this.loading = false;
        console.log(error);
      });
    },

    submitAdd: function() { //添加
      this.loading = true;
      newRoleinfo(this.form).then(response => {
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          this.loading = false;
          this.$message({ message: '操作成功！', type: 'success' });
          this.$router.push('jsgl');
        }
      }).catch(error => {
        this.loading = false;
        console.log(error);
      });
    }
  }
}

</script>
<style scoped>


</style>
