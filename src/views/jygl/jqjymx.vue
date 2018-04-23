<template>
  <div class="smain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.jqmc" style="width: 150px;" placeholder="机器名称/编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.jqlx" style="width: 120px;" placeholder="机器类型"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.shmc" style="width: 120px;" placeholder="商户名称/编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.dwmc" style="width: 120px;" placeholder="点位/区域/线路"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.chzt" style="width: 120px;" placeholder="出货状态"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="formInline.ftime" type="daterange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
        </el-date-picker>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item>
        <el-button type="warning" @click="sleSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div class="stable">
      <!-- @sort-change="sortChange"v-loading="loading" -->
      <el-table :data="tableData" style="width:100%" border>
        <el-table-column prop="jyid" label="交易编号" width="80" align="center"> </el-table-column>
        <el-table-column prop="jqbh" label="机器编号" align="center"> </el-table-column>
        <el-table-column prop="jqmc" label="机器名称" width="100" align="center"> </el-table-column>
        <el-table-column prop="jqlx" label="机器类型" align="center"> </el-table-column>
        <el-table-column prop="dwmc" label="点位" width="100" align="center"> </el-table-column>
        <el-table-column prop="xsje" label="销售额" align="center"> </el-table-column>
        <el-table-column prop="ddbh" label="订单号" align="center"> </el-table-column>
        <el-table-column prop="spmc" label="商品" width="90" align="center"> </el-table-column>
        <el-table-column prop="spsl" label="数量" width="50" align="center"> </el-table-column>
        <el-table-column prop="zffs" label="支付方式" width="80" align="center"> </el-table-column>
        <el-table-column prop="zfje" label="支付金额" width="80" align="center"> </el-table-column>
        <el-table-column prop="yhje" label="优惠金额" width="80" align="center"> </el-table-column>
        <el-table-column prop="chzt" label="出货" width="50" align="center"> </el-table-column>
        <el-table-column prop="zt" label="状态" width="50" align="center"> </el-table-column>
        <el-table-column prop="zl" label="找零" width="50" align="center"> </el-table-column>
        <el-table-column prop="tkje" label="退款" width="50" align="center"> </el-table-column>
        <el-table-column prop="jysj" label="时间" width="100" align="center"> </el-table-column>
        <!-- <el-table-column prop="operation" label="操作" fixed="right"></el-table-column> -->
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
    </el-pagination>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      formInline: {
        jqbh: '',
        jqmc: '',
        ftime: '',
      },
      listQuery: {
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 100,
      },
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      tableData: [],
      // loading: true,
    }
  },
  created: function() {
    this.onloadtable();
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      this.onloadtable();
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      this.onloadtable();
    },
    sleSubmit() { //查询
      this.onloadtable();
    },
    onloadtable() { //机器交易明细查询
      var queryJqjymxData = {
        // orderBy: 'jqbh',
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        jqmc: this.formInline.jqmc,
        dwmc: this.formInline.dwmc,
        jqlx: this.formInline.jqlx,
        shmc: this.formInline.shmc,
        chzt: this.formInline.chzt
      }
      console.log(queryJqjymxData);
      axios.post('http://192.168.1.9:8092/jqjymx/queryJqjymx', queryJqjymxData)
        .then(response => {
          console.log(response);
          this.tableData = response.data.data.list;
          this.listQuery.totalCount = response.data.data.total;
          console.log(this.tableData);
        })
        .catch(error => {
          // Message.error("error： " + "请检查网络是否连接 ");
        })
    },
  }
}

</script>
<style>
/*scoped*/

.smain {
  padding: 10px;
}

</style>
