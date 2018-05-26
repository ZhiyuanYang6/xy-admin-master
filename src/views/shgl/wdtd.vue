<template>
  <el-card class="full-carduser">
    <div class="top-tool">
      <el-form size="medium" :model="toData" :inline="true" ref="ruleForm">
        <el-form-item>
          <el-input type="input" placeholder="姓名" v-model.trim="toData.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="input" placeholder="账号" v-model.trim="toData.accountname"></el-input>
        </el-form-item>
        <el-form-item>
          <el-cascader v-model.trim="toData.orgidCope" clearable :options="organizationData" :props="props" placeholder="选择所属组织" :change-on-select=true></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" :loading="loading" type="primary" @click="searchForm">
            查&nbsp;询
          </el-button>
        </el-form-item>
        <el-form-item>
          <router-link :to="{ path:'xzyh'}">
            <el-button type="success" icon="el-icon-edit-outline">新增用户</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border highlight-current-row stripe v-loading="loading" element-loading-text="加载中...">
      <el-table-column label="用户编号" prop="userid" width="100px"></el-table-column>
      <el-table-column label="账号" prop="accountname" width="130px"></el-table-column>
      <el-table-column label="姓名" prop="username" width="190px"></el-table-column>
      <el-table-column label="用户岗位" prop="jobName" width="150px"></el-table-column>
      <el-table-column label="权限级别" prop="authlevelName" width="150px"></el-table-column>
      <el-table-column label="锁定标志" prop="lockflagName" width="150px"></el-table-column>
      <el-table-column label="所属组织" prop="orgName" width="150px"></el-table-column>
      <el-table-column label="创建人" prop="creatorName" width="150px"></el-table-column>
      <el-table-column label="创建时间" prop="registtime" width="200px"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="230px">
        <template slot-scope="scope">
          <el-button @click="handleManagement(scope.$index, scope.row)" type="text" size="mini">角色管理</el-button>
          <el-button @click="handleDetails(scope.$index, scope.row),dialogFormVisible = true" type="text" size="mini">
            查看
          </el-button>
          <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="mini">编辑</el-button>
          <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="toData.page" :page-sizes="[10,20, 50, 100]" :page-size="toData.size" layout="total, sizes, prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <ul class="list">
        <li><span class="right">账 号：</span> {{ detailData.accountname }}</li>
        <li><span class="right">姓 名：</span> {{ detailData.username }}</li>
        <li><span class="right">用 户 岗 位：</span> {{ detailData.jobName }}</li>
        <li><span class="right">权 限 级 别：</span> {{ detailData.authlevelName }}</li>
        <li><span class="right">办 公 电 话：</span> {{ detailData.telephone }}</li>
        <li><span class="right">E-mail：</span> {{ detailData.email }}</li>
        <li><span class="right">所 属 组 织：</span> {{ detailData.orgName }}</li>
        <li><span class="right">封 锁 标 志：</span> {{ detailData.lockflagName }}</li>
        <li><span class="right">封 锁 原 因：</span> {{ detailData.lockreason }}</li>
      </ul>
    </el-dialog>
  </el-card>
</template>
<script>
import request from '@/utils/request'
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'yhgl',
  data() {
    return {
      firstIn: false,
      detailData: {}, // 详情数据
      tableData: [{ userid: '001' }], // 储存整个table数据
      loading: false,
      organizationData: [], // 组织源数据
      total: 0, // 总体条数
      toData: { // 查询表单传入的数据
        page: 1,
        size: 20,
        username: '',
        accountname: '',
        orgidCope: []
      },
      props: {
        value: 'nodeId',
        label: 'nodeName',
        children: 'childList'
      },
      dialogFormVisible: false,
    };
  },
  activated() { //代替 created 操作 keep-alive 组件激活时调用
    if (this.firstIn) {
      this.getTableData();
    }
    this.firstIn = true;
  },
  // created() {
  //   console.log('created被调用了')
  // },
  mounted() { // 初始化页面调用函数
    this.initData();
    this.getTableData();
  },
  methods: {
    initData() { //获取组织服务源数据
      request({ url: '/sram/archives/getMyOrgTree', method: 'post' }).then(response => {
        this.organizationData = response;
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },
    getTableData() { // 获取用户列表
      const orgid = this.toData.orgidCope;
      this.toData.orgid = orgid.length > 0 ? orgid[orgid.length - 1] : '';
      this.loading = true;
      request({ url: '/sram/archives/queryUserInfoAll', method: 'post', data: this.toData }).then(response => {
        this.loading = false;
        if (response.code) {
          this.tableData = [];
          this.total = 0;
        } else {
          this.tableData = response.content;
          this.total = response.totalElements;
        }
      }).catch(error => {
        this.loading = false;
        Message.error("error：" + "请检查网络是否连接");
      });
    },
    // 搜索
    searchForm() {
      if (this.toData.page === 1) {
        this.getTableData();
      } else {
        this.toData.page = 1;
      }
    },
    handleSizeChange(val) {
      this.toData.size = val;
      this.toData.page = 1;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.toData.page = val;
      this.getTableData();
    },
    // 查看详情
    handleDetails(index, row) {
      this.detailData = row;
    },
    // 编辑
    handleEdit(index, row) {
      this.$router.push({ path: 'bjyh', query: { userid: row.userid } });
    },
    //管理
    handleManagement(index, row) {
      this.$router.push({ path: 'management', query: { userid: row.userid, username: row.username } });
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除 "' + row.username + '", 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({ url: '/sram/archives/delUserInfo', method: 'get', params: { id: row.userid } }).then(response => {
          // delUserInfo(row.userid).then(response => {
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
      })
    },
  }
};

</script>
<style scoped>
.right {
  display: inline-block;
  width: 120px;
  text-align: right;
}

ul {
  list-style: none;
  font-size: 15px;
  padding-bottom: 10px;
}

ul li {
  margin-bottom: 8px;
}

</style>
