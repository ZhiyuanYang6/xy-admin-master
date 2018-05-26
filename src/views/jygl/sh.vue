<template>
  <div class="smain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input size="mini" v-model="formInline.jqmc" style="width: 110px;" placeholder="机器名称/编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="mini" v-model="formInline.spmc" style="width: 150px;" placeholder="商品名称/编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="mini" v-model="formInline.ddbh" style="width: 150px;" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker size="mini" style="width:310px;" v-model="formInline.ftime" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00', '12:00:00']">
        </el-date-picker>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item>
        <el-button size="mini" type="warning" @click="sleSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="success" @click="sleSubmit">>Excel</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div class="stable">
      <!-- @sort-change="sortChange"v-loading="loading" -->
      <el-table :data="tableData" style="width:100%" border>
        <el-table-column prop="jqbh" label="机器编号" align="center"> </el-table-column>
        <el-table-column prop="jqmc" label="机器名称" align="center"> </el-table-column>
        <el-table-column prop="spbh" label="商品编号" align="center"> </el-table-column>
        <el-table-column prop="spmc" label="商品名称" align="center"> </el-table-column>
        <el-table-column prop="ddbh" label="订单号" align="center"> </el-table-column>
        <el-table-column prop="cjsj" label="创建时间" align="center"> </el-table-column>
        <el-table-column prop="btkje" label="退款金额" align="center"> </el-table-column>
        <el-table-column prop="showtkfs" label="退款方式" align="center"> </el-table-column>
        <el-table-column prop="skzh" label="收款账号" align="center"> </el-table-column>
        <el-table-column prop="tkzh" label="付款账号" align="center"> </el-table-column>
        <el-table-column prop="tkry" label="退款人员" align="center"> </el-table-column>
        <el-table-column prop="remark" label="备注" align="center"> </el-table-column>
        <el-table-column label="操作" width="100" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="refund(scope.row)" size="mini">退款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
    </el-pagination>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message, MessageBox } from 'element-ui'
import axios from 'axios'
export default {
  name: 'sh',
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
      loading: true,
      orderBy: 'cjsj desc',
    }
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
    sortChange(column) { //服务器端排序
      if (column.order == "ascending") {
        this.orderBy = column.prop + " asc";
      } else if (column.order == "descending") {
        this.orderBy = column.prop + " desc";
      }
      this.onloadtable();
    },
    created: function() {
      this.onloadtable();
    },
    onloadtable() { //机器交易明细查询
      var queryRefundData = {
        orderBy: this.orderBy,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        jqmc: this.formInline.jqmc,
        spmc: this.formInline.spmc,
        ddbh: this.formInline.ddbh,
        starttime: this.formInline.ftime[0],
        endtime: this.formInline.ftime[1],
      }
      request({ url: 'service-order/refund/queryRefund', method: 'post', data: queryRefundData })
        .then(response => {
          this.tableData = response.data;
          this.listQuery.totalCount = response.total;
        })
        .catch(error => {
          // Message.error("error： " + "请检查网络是否连接 ");
        })
    },
    refund(row) { //删除点位
      var refundData = {
        spid: row.jlid,
        ddbh: row.ddbh,
        remark: row.remark,
        tkje: row.tkje,
        tkry: row.tkry,
      }
      this.$confirm('是否手动退款?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({ url: 'service-order/refund/externalRefund', method: 'post', data: refundData }).then(response => {
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
    /*refund(row) { //机器交易明细查询
      var refundData = {
        spid: row.jlid,
        ddbh: row.ddbh,
        remark: row.remark,
        tkje: row.tkje,
        tkry: row.tkry,
      }
      request({ url: 'service-order/refund/externalRefund', method: 'post', data: refundData })
        .then(response => {
          this.tableData = response.data;
          this.listQuery.totalCount = response.total;
        })
        .catch(error => {
          // Message.error("error： " + "请检查网络是否连接 ");
        })
    },*/
  },
  created: function() {
    this.onloadtable();
  },

}

</script>
<style scoped>
/**/

.smain {
  padding: 10px;
}

form.el-form--inline div.el-form-item {
  margin-right: 5px;
}

.el-form-item {
  margin-bottom: 10px;
}

</style>
