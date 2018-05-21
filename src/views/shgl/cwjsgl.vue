<template>
  <div class="dwsmain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.jqbh" style="width: 150px;" placeholder="机器编号/名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="formInline.ftime" type="daterange" value-format="HH:mm:ss" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
        </el-date-picker>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item class="rightitem">
        <el-button type="primary" @click="onloadtable">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div class="stable">
      <el-table :data="tableData1" style="width:100%" border>
        <el-table-column prop="jqbh" label="机器编号" width="200" align="center"> </el-table-column>
        <el-table-column prop="jqmc" label="机器名称" width="200" align="center"> </el-table-column>
        <el-table-column prop="jsrq" label="日期" align="center"> </el-table-column>
        <el-table-column prop="je" label="金额" align="center"> </el-table-column>
        <el-table-column prop="sy" label="结算状态" align="center"> </el-table-column>
        <el-table-column label="详情" align="center">
          <template slot-scope="scope">
            <el-button @click="detilecwjs(scope.row)" type="text">详 情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message, MessageBox } from 'element-ui'
export default {
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
    this.onloadtable();
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      // this.onloadtable();
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      // this.onloadtable();
    },
    onloadtable() { //
      var queryData = {
        orderBy: 'jqbh',
        jqbh: this.formInline.jqbh,
        time: this.formInline.ftime,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        shbh: 0,
      }
      request({ url: 'service-order/jqjymx/queryjyjs', method: 'post', data: queryData }).then(response => {
          console.log(response);
          this.tableData1 = response.data;
          this.listQuery.totalCount = response.total;
          console.log(response.data);
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        })
    },
    detilecwjs(row) {
      console.log(row);
    }
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
