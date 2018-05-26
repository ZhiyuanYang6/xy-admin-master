<template>
  <div class="smain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.shmc" style="width: 120px;" placeholder="商户名称/编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.jqmc" style="width: 150px;" placeholder="机器名称/编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.ddbh" style="width: 120px;" placeholder="订单编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.jqlx" style="width: 150px;" placeholder="机器类型" clearable @change="onloadtable">
          <el-option v-for="item in jqlxoptions" :key="item.value" :label="item.valuename" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.chzt" style="width: 150px;" placeholder="出货状态" clearable @change="onloadtable">
          <el-option v-for="item in chztoptions" :key="item.value" :label="item.valuename" :value="item.value">
          </el-option>
        </el-select>
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
      <el-table :data="tableData" @sort-change="sortChange" v-loading="loading" style="width:100%" border>
        <el-table-column prop="shbh" label="商户编号" width="100" align="center"> </el-table-column>
        <el-table-column prop="shmc" label="商户名称" width="100" align="center"> </el-table-column>
        <el-table-column prop="jqbh" sortable='custom' label="机器编号" align="center"> </el-table-column>
        <el-table-column prop="jqmc" label="机器名称" width="100" align="center"> </el-table-column>
        <el-table-column prop="showjqlx" label="机器类型" align="center"> </el-table-column>
        <el-table-column prop="jyid" label="交易编号" width="80" align="center"> </el-table-column>
        <el-table-column prop="bddzj" label="销售额" align="center"> </el-table-column>
        <el-table-column prop="ddbh" label="订单编号" align="center"> </el-table-column>
        <el-table-column prop="spmc" label="商品" width="90" align="center"> </el-table-column>
        <el-table-column prop="showzffs" label="支付方式" width="80" align="center"> </el-table-column>
        <el-table-column prop="bzfje" label="支付金额" width="80" align="center"> </el-table-column>
        <el-table-column prop="byhje" label="优惠金额" width="80" align="center"> </el-table-column>
        <el-table-column prop="showchzt" label="出货状态" width="80" align="center"> </el-table-column>
        <el-table-column prop="btkje" label="退款" width="50" align="center"> </el-table-column>
        <el-table-column prop="jysj" sortable='custom' label="时间" width="100" align="center"> </el-table-column>
        <!-- <el-table-column prop="operation" label="操作" fixed="right"></el-table-column> -->
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
    </el-pagination>
  </div>
</template>
<script>
import request from '@/utils/request'
import axios from 'axios'
import { Message } from 'element-ui'
export default {
  name: 'jqjymx',
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
      loading: false,
      orderBy: 'jysj desc',
      jqlxoptions: [],
      chztoptions: [],
    };
  },
  created: function() {
    this.onloadtable();
    this.dictSelect("1023", 'jqlxoptions');
    this.dictSelect("exportStatus", 'chztoptions');
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
    onloadtable() { //机器交易明细查询
      var queryJqjymxData = {
        orderBy: this.orderBy,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        jqmc: this.formInline.jqmc,
        jqlx: this.formInline.jqlx,
        shmc: this.formInline.shmc,
        ddbh: this.formInline.ddbh,
        chzt: this.formInline.chzt,
        starttime: this.formInline.ftime[0],
        endtime: this.formInline.ftime[1],
      };
      this.loading = true;
      request({ url: 'service-order/jqjymx/queryJqjymx', method: 'post', data: queryJqjymxData })
        .then(response => {
          this.loading = false;
          this.tableData = response.data;
          this.listQuery.totalCount = response.total;
          console.log(this.tableData);
        })
        .catch(error => {
          // Message.error("error： " + "请检查网络是否连接 ");
        });
    },
    dictSelect(type, valuename) {
      var queryType = { type: type };
      request({ url: 'service-machine/shjgl/queryDict', method: 'post', data: queryType }).then(response => {
        if (valuename === 'jqlxoptions') { this.jqlxoptions = response; }
        if (valuename === 'chztoptions') { this.chztoptions = response; }
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
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
