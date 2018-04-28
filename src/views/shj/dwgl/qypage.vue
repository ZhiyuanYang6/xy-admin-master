<template>
  <div class="dwsmain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.qybh" style="width: 150px;" placeholder="区域BH/名称"></el-input>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item class="rightitem">
        <el-button type="primary" @click="onloadtable">查询</el-button>
        <el-button type="primary" @click="addxlsubmit('','add')">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div class="stable">
      <el-table :data="tableData" style="width:100%" border>
        <el-table-column prop="qybh" label="区域编号" width="200" align="center"> </el-table-column>
        <el-table-column prop="qymc" label="区域名称" width="200" align="center"> </el-table-column>
        <el-table-column prop="xlsl" label="线路数量" align="center"> </el-table-column>
        <el-table-column prop="jqsl" label="机器数量" align="center"> </el-table-column>
        <el-table-column prop="remark" label="备注" align="center"> </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button @click="bindSubmit(scope.row,'bind')" type="text">绑 定</el-button>
            <el-button @click="bindSubmit(scope.row)" type="text">解 绑</el-button>
            <el-button @click="addxlsubmit(scope.row)" type="text">修 改</el-button>
            <el-button @click="delclick(scope.row)" type="text">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
      </el-pagination>
    </div>
    <!-- 新增区域 -->
    <el-dialog title="新增区域" :visible.sync="dialogVisible" width="30%">
      <addolade :listrow="row" :dialogVisible="dialogVisible" @dialog1Changed="childchanged($event)"></addolade>
    </el-dialog>
    <!-- 绑定、解绑机器 -->
    <el-dialog :title="listrow.title" :visible.sync="dialogVisiblebind" width="60%">
      <bindqy :listrow="listrow" :dialogVisiblebind="dialogVisiblebind" @dialogxlChanged="childxlchanged($event)"></bindqy>
    </el-dialog>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message, MessageBox } from 'element-ui'
import addolade from './components/addolade'
import bindqy from './components/bindqy'
export default {
  components: { addolade, bindqy },
  data() {
    return {
      formInline: {
        jqbh: '',
        jqmc: '',
        ftime: '',
      },
      options: [
        { value: 0, label: "已绑定" },
        { value: 1, label: "未绑定" },
      ],
      listQuery: {
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 100,
      },
      tableData: [],
      loading: false,
      row: {},
      listrow: {},
      dialogVisible: false,
      dialogVisiblebind: false,
    }
  },
  created: function() {
    this.onloadtable();
  },
  methods: {
    addxlsubmit(row, val) { //添加区域
      if (val == "add") {
        this.row.qygl = true;
        this.row.dwgl = false;
        this.row.xlgl = false;
        this.dialogVisible = true;
        this.row.title = '添加区域';
        this.row.btn = '添加';
      } else {
        this.row = row;
        this.row.qygl = true;
        this.row.dwgl = false;
        this.row.xlgl = false;
        this.dialogVisible = true;
        this.row.title = '修改区域';
        this.row.btn = '修改';
      }
    },
    bindSubmit(row, val) { //绑定或解绑机器
      this.listrow = row;
      if (val == "bind") { //绑定
        this.listrow.title = "绑定机器";
        this.listrow.btn = "绑定";
        this.listrow.bind = true;
      } else {
        this.listrow.bind = '';
        this.listrow.title = "解绑机器";
        this.listrow.btn = "解绑";
      }
      this.dialogVisiblebind = true;
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      this.onloadtable();
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      this.onloadtable();
    },
    onloadtable() { //查询
      var queryQyxxData = {
        qybh: this.formInline.qybh,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        dkh: '8081'
      }
      request({ url: '/dwxx/queryQyxx', method: 'post', data: queryQyxxData }).then(response => {
          this.tableData = response.data;
          this.listQuery.totalCount = response.total;
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        })
    },
    delclick(row) { //删除
      var qyxx = {
        qyid: row.qyid,
        dkh: '8081'
      }
      this.$confirm('是否删除该条区域信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({ url: '/dwxx/deleteQyxx', method: 'post', data: qyxx }).then(response => {
            this.$message({ type: 'success', message: '成功!' });
            this.onloadtable(); //刷新数据
          })
          .catch((error) => {
            Message.error("error：" + "请检查网络是否连接");
          })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' });
      });
    },
    childchanged(childdata) { //接收子组件参数
      this.dialogVisible = false;
      this.dialogVisiblebind = false;
      this.onloadtable();
    },
  }
}

</script>
<style scoped>
div.dwsmain {
  padding: 5px;
}

div.rightitem {
  /*float: right;*/
  /*padding-right: 100px;*/
}

</style>
