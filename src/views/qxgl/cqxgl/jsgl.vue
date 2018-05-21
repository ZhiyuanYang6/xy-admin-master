<template>
  <el-card class="full-card">
    <div class="top-tool">
      <el-form size="medium" :model="toData" :inline="true" ref="ruleForm">
        <el-form-item>
          <el-input class="form-item-width" v-model.trim="toData.name" placeholder="请输入角色"></el-input>
        </el-form-item>
        <!--         <el-form-item>
          <el-select v-model="toData.roletype" placeholder="请选择角色类型" clearable>
            <el-option v-for="(value, key) in roleTypeData" :key="key" :label="value" :value="Number(key)"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-date-picker v-model="toData.sj" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:400px;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="top-button" icon="el-icon-search" :loading="loading" type="primary" @click="searchForm">查&nbsp;询</el-button>
        </el-form-item>
        <el-form-item>
          <router-link :to="{ path:'xzjs'}">
            <el-button class="top-button" type="success" icon="el-icon-edit-outline">新增角色</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border highlight-current-row stripe v-loading="loading" element-loading-text="加载中...">
      <el-table-column label="编号" prop="roleid" width="70px"></el-table-column>
      <el-table-column label="角色名称" prop="name"></el-table-column>
      <el-table-column label="角色类型" prop="roletypeName"></el-table-column>
      <el-table-column label="描述" prop="description"></el-table-column>
      <el-table-column label="创建时间" prop="gentime"></el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="handleDetails(scope.$index, scope.row),dialogFormVisible = true" type="text" size="small">查看</el-button>
          <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="handleresource(scope.$index, scope.row)" type="text" size="small">资源管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="toData.page" :page-sizes="[10,20, 50, 100]" :page-size="toData.size" layout="total, sizes, prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="角色信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <ul class="list">
        <li> <span class="right">角 色 名 称：</span> {{ detailData.name }}</li>
        <li> <span class="right">角 色 类 型：</span> {{ detailData.roletypeName }}</li>
        <li> <span class="right">角 色 描 述：</span> {{ detailData.description }}</li>
        <li> <span class="right">创 建 时 间：</span> {{ detailData.gentime }}</li>
      </ul>
    </el-dialog>
  </el-card>
</template>
<script>
import { queryRoleinfo, editRoleinfo, addRoleinfo, delRoleinfo } from '@/api/authority'
import { getDicts } from '@/api/index'

export default {
  data() {
    return {
      firstIn: '', //判断是否为第一次进入
      loading: false, //加载状态
      total: 0, // 总体条数
      tableData: [{}], //查询树形资源数据
      detailData: {}, // 详情数据
      roleTypeData: {}, // 角色类型数据
      toData: { //查询所需字段
        size: 20,
        page: 1,
        name: '',
        sj: ['', ''],
        roletype: null
      },
      dialogFormVisible: false,
    };
  },
  activated() {
    if (this.firstIn) {
      this.getTableData();
    }
    this.firstIn = true;
  },
  mounted() { //初始化页面调用函数
    this.initData();
    this.getTableData();
  },
  methods: {
    initData() {
      getDicts('roleType').then(response => {
        if (!response.code) {
          this.roleTypeData = response.roleType;
        }
      })
    },
    searchForm() { //处理搜索功能
      this.toData.page = 1;
      this.getTableData();
    },
    handleDetails(index, row) { // 查看角色详情功能
      this.detailData = row;
    },
    handleEdit(index, row) { // 处理编辑功能
      this.$router.push({ path: 'bjjs', query: { roleid: row.roleid } });
    },
    getTableData() { //处理获取角色列表功能
      this.loading = true;
      if (this.toData.sj[0]) {
        let sy = this.toData.sj[0].getFullYear();
        let sm = this.toData.sj[0].getMonth();
        let sd = this.toData.sj[0].getDate();
        let ey = this.toData.sj[1].getFullYear();
        let em = this.toData.sj[1].getMonth();
        let ed = this.toData.sj[1].getDate();
        this.toData.startTime = sy + '-' + (sm + 1 < 10 ? '0' + (sm + 1) : sm + 1) + '-' + (sd < 10 ? '0' + sd : sd);
        this.toData.endTime = ey + '-' + (em + 1 < 10 ? '0' + (em + 1) : em + 1) + "-" + (ed < 10 ? '0' + ed : ed);
      } else {
        this.toData.startTime = '';
        this.toData.endTime = '';
      }
      queryRoleinfo(this.toData).then(response => {
        this.loading = false;
        if (response.code) {
          this.tableData = [];
          this.total = 0;
          this.$message.error(response.data.msg);
        } else {
          this.tableData = response.content;
          this.total = response.totalElements;
        }
      }).catch(error => {
        this.loading = false;
        console.log(error.data);
      });
    },
    handleSizeChange(val) { //处理改变页面显示条数功能
      this.toData.size = val;
      this.toData.page = 1;
      this.getTableData();
    },
    handleCurrentChange(val) { //处理跳转至目标页功能
      this.toData.page = val;
      this.getTableData();
    },
    handleDelete(index, row) { //处理删除功能
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRoleinfo(row.roleid).then(response => {
          if (response.code) {
            this.$message.error(response.data.msg);
          } else {
            this.$message({ message: '删除成功！', type: 'success' });
            this.getTableData();
          }
        }).catch(error => {
          console.log(error.data);
        });
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' });
      });
    },
    handleresource(index, row) { //处理普通资源权限跳转
      this.$router.push({ path: 'jszyqx', query: { roleid: row.roleid, name: row.name } });
    },
  }
}

</script>
<style lang="stylus" scoped>
.right
  display inline-block
  width 120px
  text-align right
ul
  list-style none
  font-size 15px
  padding-bottom: 10px;
  li
    margin-bottom 8px

</style>
