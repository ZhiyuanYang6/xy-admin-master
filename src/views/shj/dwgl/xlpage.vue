<template>
  <div class="dwsmain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.dwid" style="width: 150px;" placeholder="线路BH/名称"></el-input>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item class="rightitem">
        <el-button type="primary" @click="onloadtable">查询</el-button>
        <el-button type="primary" @click="addxlsubmit()">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div class="stable">
      <el-table :data="tableData1" style="width:100%" border>
        <el-table-column prop="jqmc" label="线路编号" width="200" align="center"> </el-table-column>
        <el-table-column prop="dw" label="线路名称" width="200" align="center"> </el-table-column>
        <el-table-column prop="xl" label="点位数量" align="center"> </el-table-column>
        <el-table-column prop="qy" label="机器数量" align="center"> </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="sleSubmit(scope.row)" type="text">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
      </el-pagination>
      <!-- 新增线路 -->
      <el-dialog title="新增线路" :visible.sync="dialogVisible" width="30%">
        <addolade :listrow="row" :dialogVisible="dialogVisible" @dialog1Changed="childchanged($event)"></addolade>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message, MessageBox } from 'element-ui'
import addolade from './components/addolade'
export default {
  components: { addolade },
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
      tableData1: [
        {}
      ],
      loading: false,
      row: {},
      dialogVisible: false,
    }
  },
  created: function() {
    // this.onloadtable();
  },
  methods: {
    addxlsubmit() { //添加线路
      this.row.xlbh = true;
      this.row.xlmc = true;
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      this.onloadtable();
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      this.onloadtable();
    },
    onloadtable() { //订单状态查询
      var queryDdxxData = {
        orderBy: 'jqbh',
        ddbh: "1",
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
      }
      queryDdxxData = {
        "name": "admin",
        "age": "30"
      }
      request({ url: 'test', method: 'post', data: queryDdxxData }).then(response => {
          console.log(response.data);
          //     this.tableData = response.data.data;
          //     console.log(response.data);
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        })
    },
    childchanged(childdata) { //接收子组件参数
      this.dialogVisible = false;
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
