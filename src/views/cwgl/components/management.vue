<template>
  <el-card class="full-card">
    <div class="top-tool">
      <el-form size="medium" :model="form" :inline="true" ref="ruleForm">
        <el-form-item>
          <el-select v-model="form.roletype" placeholder="请选择角色类型" clearable>
            <el-option v-for="(value, key) in roleTypeData" :key="key" :label="value" :value="Number(key)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="top-button" icon="el-icon-search" :loading="loading" type="primary" @click="searchForm">查&nbsp;询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <span style="float:right;padding-right:20px;padding-bottom:10px;font-size:14px;">当前用户：{{username}}</span>
    <el-table ref="multipleTable" :data="tableData" border highlight-current-row stripe v-loading="loading" element-loading-text="加载中..." @selection-change="handleSelectionChange" @select="handleSelect">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="roleid" label="角色编号" width="100"> </el-table-column>
      <el-table-column prop="name" label="角色名称"> </el-table-column>
      <el-table-column prop="roletypeName" label="角色类型"> </el-table-column>
      <el-table-column prop="description" label="角色描述" show-overflow-tooltip> </el-table-column>
      <el-table-column label="授权类型" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-select size="small" v-model="scope.row.privilegetype" placeholder="请选择">
            <el-option v-for="(value,key) in AUTHORIZEData" :key="key" :label="value" :value="Number(key)"></el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-block">
      <el-button-group>
        <el-button @click="handlePreserve" :loading="loading" type="primary">保存</el-button>
        <el-button @click="goLastPath" type="primary">返回</el-button>
      </el-button-group>
    </div>
  </el-card>
</template>
<script>
import { findUserrole, setUserRole } from '@/api/file'
import { getDicts } from '@/api/index'

export default {
  data() {
    return {
      username: '',
      tableData: [],
      multipleSelection: [],
      loading: false,
      toData: {
        userid: null,
        userRoleList: [],
      },
      form: {
        userid: null,
        roletype: null
      },
      roleTypeData: {}, // 角色类型数据
      AUTHORIZEData: [],
    }
  },
  created() {
    this.toData.userid = Number(this.$route.query.userid);
    this.form.userid = Number(this.$route.query.userid);
  },
  mounted() { //获取角色名称
    this.username = this.$route.query.username;
    this.getManagementData();
    this.initData();
  },
  methods: {
    handleSelect(selection, row) { // 处理默认选择
      if (selection.includes(row)) {
        row.privilegetype = 1;
      } else {
        row.privilegetype = null;
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    initData() { //获取授权类型源数据
      let self = this;
      getDicts('roleType,privilegeType').then(response => {
        if (response.code) {
          self.$message.error(response.data.msg);
        } else {
          self.AUTHORIZEData = response.privilegeType;
          self.roleTypeData = response.roleType;
        }
      }).catch(error => {
        console.log(error.data);
      });
    },
    getManagementData() { // 获取所有表格数据
      this.loading = true;
      findUserrole(this.toData).then(response => {
        this.loading = false;
        if (response.code) {
          this.tableData = [];
          this.total = 0;
          this.$message.error(response.data.msg);
        } else {
          this.tableData = response;
          this.$nextTick(() => {
            this.filterCheckedRows();
          });
        }
      }).catch(error => {
        this.loading = false;
        console.log(error.data);
      });
    },
    getRoleTypeData() { // 查询角色类型
      this.loading = true;
      findUserrole(this.form).then(response => {
        this.loading = false;
        if (response.code) {
          this.tableData = [];
          this.total = 0;
          this.$message.error(response.data.msg);
        } else {
          this.tableData = response;
          this.$nextTick(() => {
            this.filterCheckedRows();
          });
        }
      }).catch(error => {
        this.loading = false;
        console.log(error);
      });
    },
    handlePreserve() {
      this.loading = true;
      this.toData.userRoleList = this.multipleSelection.map(function(s) {
        let obj = { roleid: '', privilegetype: '' };
        obj.roleid = s.roleid;
        obj.privilegetype = s.privilegetype;
        return obj;
      });
      setUserRole(this.toData).then(response => {
        this.loading = false;
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          this.$message({ message: '保存成功！', type: 'success' });
          console.log(response);
        }
      }).catch(error => {
        this.loading = false;
        console.log(error.data);
      });
    },
    goLastPath() {
      this.$router.go(-1);
    },
    filterCheckedRows() {
      this.tableData.filter(s => s.grantFlag === 1).forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row);
      });
    },
    searchForm() {
      this.getRoleTypeData();
    }
  },
}

</script>
