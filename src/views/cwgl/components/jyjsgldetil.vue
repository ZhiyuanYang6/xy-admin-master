<template>
  <div class="smain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="formInline.zffs" placeholder="请选择" clearable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item>
        <el-button type="warning" @click="onloadtable">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table size="mini" :data="tableData" class="table1" border>
      <el-table-column type="index" label="序号" align="center"> </el-table-column>
      <el-table-column prop="ddh" label="订单号" align="center"> </el-table-column>
      <el-table-column prop="shddh" label="商户订单号" align="center"> </el-table-column>
      <el-table-column prop="zffs" label="支付方式" align="center"> </el-table-column>
      <el-table-column prop="jysj" sortable='custom' label="交易时间" align="center"> </el-table-column>
      <el-table-column prop="xsje" label="销售金额" align="center"> </el-table-column>
      <el-table-column prop="tkje" label="退款金额" align="center"> </el-table-column>
      <el-table-column label="详情" width="100" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" v-show="scope.row.ddh">订单详情</el-button>
          <span v-show="!scope.row.ddh">合计</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        jqbh: '',
        jqmc: '',
        ftime: '',
      },
      tableData: [],
      options: [
        { value: 0, label: "微信" },
        { value: 1, label: "支付宝" },
      ],
      listQuery: {
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 100,
      },
    }
  },
  created: function() {
    this.tableData = [{ shddh: "Galaxy S9", ddh: "false", sl: "1", xsje: "9999", tkje: "200", jysj: "暂无", zffs: "微信" }];
    // debugger;
    this.tableData.push({ shddh: "fasdf", xsje: "9999", tkje: "200", jysj: "暂无", zffs: "微信" })
    // this.onloadtable();
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
    onloadtable() { //交易结算明细查询
      var queryJqjytjData = {
        // orderBy: 'jqbh',
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        jqmc: this.formInline.jqmc,
        dwmc: this.formInline.dwmc,
        dkh: '8092',
      }
      request({ url: "/jqjytj/queryJqjytj", method: 'post', data: queryJqjytjData })
        .then(response => {
          this.tableData = response.list;
          this.listQuery.totalCount = response.total;
        })
        .catch(error => {
          Message.error("error： " + "请检查网络是否连接 ");
        })
    },
  },
}

</script>
<style scoped>


</style>
