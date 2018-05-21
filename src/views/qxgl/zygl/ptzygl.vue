<template>
  <el-card class="full-card">
    <div class="top-tool">
      <el-form size="medium" :model="toData" :inline="true" ref="ruleForm">
        <!--         <el-form-item>
          <el-select clearable class="form-item-width" v-model="toData.systemid" placeholder="系统名称">
            <el-option v-for="(value,key) in ALLSYSTEMAllData" :key="key" :label="value" :value="key"></el-option>
          </el-select>
        </el-form-item> -->
        <!--         <el-form-item>
          <el-select clearable class="form-item-width" v-model="toData.resourcetype" placeholder="资源类型">
            <el-option v-for="(value,key) in RESOURCETYPEAllData" :key="key" :label="value" :value="key"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-input class="form-item-width" type="input" placeholder="资源名称" v-model.trim="toData.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="top-button" icon="el-icon-search" :loading="loading" type="primary" @click="searchForm">查&nbsp;询</el-button>
        </el-form-item>
        <el-form-item>
          <router-link :to="{ path:'xzptzy'}">
            <el-button class="top-button" type="success" icon="el-icon-edit-outline">新增资源</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border highlight-current-row stripe v-loading="loading" element-loading-text="加载中...">
      <el-table-column label="编号" prop="resourceid" width="70px"></el-table-column>
      <el-table-column label="资源名称" prop="name"></el-table-column>
      <el-table-column label="资源" prop="url"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="toData.page" :page-sizes="[10,20, 50, 100]" :page-size="toData.size" layout="total, sizes, prev, pager, next" :total="total">
      </el-pagination>
    </div>
  </el-card>
</template>
<script>
import { getDicts, getDict } from '@/api/index';
import { findResourceInfo } from '@/api/file';
import { delResourceInfo } from '@/api/resource';

export default {
  data() {
    return {
      firstIn: false,
      tableData: [], // 储存整个table数据
      loading: false,
      RESOURCETYPEAllData: [], //保存资源类型   源数据
      ALLSYSTEMAllData: [], //系统名称   源数据
      total: 0, //总体条数
      toData: { // 查询表单传入的数据
        page: 1, // 页码
        size: 20, //页面大小
        systemid: this.$store.state.user.systemid, //系统名称
        resourcetype: this.$store.state.user.resourcetype, //资源类型
        name: '', //资源名称可选
      },
    }
  },
  activated() {
    if (this.firstIn) {
      this.getTableData();
    }
    this.firstIn = true;
  },
  mounted() {    // 初始化页面调用函数
    this.initData();
    this.getTableData();
  },
  methods: {
    initData() { // 获取资源类型和系统类型数据
      getDicts('commResourceType,ALLSYSTEM').then(function(response) {
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          this.RESOURCETYPEAllData = response.commResourceType;
          this.ALLSYSTEMAllData = response.ALLSYSTEM;
          // console.log('资源类型', this.RESOURCETYPEAllData);
          // console.log('系统名称', this.ALLSYSTEMAllData);
        }
      }).catch(function(error) {
        console.log(error.data);
      });
    },
    getTableData() { //获取资源数据
      this.loading = true;
      findResourceInfo(this.toData).then(response => {
        if (response.code) {
          this.$message.error(response.data.msg);
          this.tableData = [];
          this.total = 0;
        } else {
          this.tableData = response.content;
          this.total = response.totalElements;
          this.loading = false;
        }
      }).catch(function(error) {
        console.log(error);
        this.tableData = [];
        this.total = 0;
        this.loading = false;
      });
    },
    // 搜索
    searchForm() {
      this.toData.page = 1;
      this.getTableData();
    },
    //编辑
    handleEdit(index, row) {
      let resourceid = row.resourceid;
      this.$router.push({ path: 'bjptzy', query: { resourceid: row.resourceid } });
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该资源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delResourceInfo(row.resourceid).then(response => {
          if (response.code) {
            this.$message.error(response.data.msg);
          } else {
            this.$message({ message: '删除成功！', type: 'success' });
            this.getTableData();
          }
        }).catch(function(error) {
          console.log(error.data);
        });
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' });
      });
    },

    handleSizeChange(val) { //页面大小变动时
      this.toData.size = val;
      this.getTableData();
    },
    handleCurrentChange(val) { //当前页变动时
      this.toData.page = val;
      this.getTableData();
    }
  }
};

</script>
<style scoped>


</style>
