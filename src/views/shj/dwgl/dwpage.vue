<template>
  <div class="dwsmain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.dwid" style="width: 150px;" placeholder="点位ID/名称/类型"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.sfbd" placeholder="请选择" clearable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item class="rightitem">
        <el-button type="primary" @click="onloadtable">查询</el-button>
        <el-button type="primary" @click="addxlsubmit()">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div class="stable">
      <!-- @sort-change="sortChange"v-loading="loading" -->
      <el-table :data="tableData" style="width:100%" border>
        <el-table-column prop="dwid" label="点位编号" width="200" align="center"> </el-table-column>
        <el-table-column prop="dwmc" label="点位名称" width="200" align="center"> </el-table-column>
        <el-table-column prop="showdwlx" label="点位类型" align="center"> </el-table-column>
        <el-table-column prop="dwdz" label="点位地址" align="center"> </el-table-column>
        <el-table-column prop="jqsl" label="机器数量" align="center"> </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="bindSubmit(scope.row,'bind')" type="text">绑 定</el-button>
            <el-button @click="bindSubmit(scope.row)" type="text">解 绑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
      </el-pagination>
    </div>
    <!-- 新增点位 -->
    <el-dialog title="新增点位" :visible.sync="dialogVisible" width="30%">
      <addolade :listrow="row" :dialogVisible="dialogVisible" @dialog1Changed="childchanged($event)"></addolade>
    </el-dialog>
    <!-- 绑定、解绑机器 -->
    <el-dialog :title="listrow.title" :visible.sync="dialogVisiblebind" width="60%">
      <bindmach :listrow="listrow" :dialogVisiblebind="dialogVisiblebind" @dialog1Changed="childchanged($event)"></bindmach>
    </el-dialog>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message, MessageBox } from 'element-ui'
import addolade from './components/addolade'
import bindmach from './components/bindmach'
export default {
  components: { addolade, bindmach },
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
      listrow: {},
      dialogVisible: false,
      dialogVisiblebind: false,
    }
  },
  created: function() {
    this.onloadtable();
  },
  methods: {
    addxlsubmit() { //添加点位
      request({ url: '/dwxx/dwDicQuery', method: 'post', data: { dkh: '8081' } }).then(response => { //请求点位类型
        this.row.dwlx = [];
        for (var i = 0; i < response.length; i++) {
          var data = { value: response[i].value, label: response[i].valuename };
          this.row.dwlx.push(data);
        }
      });
      this.row.dwbh = true;
      this.row.dwmc = true;
      this.dialogVisible = true;
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
    onloadtable() { //订单状态查询
      var queryDdxxData = {
        dwid: this.formInline.dwid,
        sfbd: this.formInline.sfbd,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        dkh: '8081'
      }
      request({ url: "/dwxx/queryDwxx", method: 'post', data: queryDdxxData })
        .then(response => {
          this.tableData = response.list;
          this.listQuery.totalCount = response.total;
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        })
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
