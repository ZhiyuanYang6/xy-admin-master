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
      <el-table :data="tableData" v-loading="loading" style="width:100%" border>
        <el-table-column prop="shbh" label="商户编号" width="100" align="center"> </el-table-column>
        <el-table-column prop="shmc" label="商户名称" width="100" align="center"> </el-table-column>
        <el-table-column prop="jqbh" label="机器编号" width="100" align="center"> </el-table-column>
        <el-table-column prop="jqmc" label="机器名称" width="100" align="center"> </el-table-column>
        <el-table-column prop="showjqlx" label="机器类型" align="center"> </el-table-column>
        <el-table-column prop="dwmc" label="点位" width="100" align="center"> </el-table-column>
        <el-table-column prop="xlmc" label="线路" align="center"> </el-table-column>
        <el-table-column prop="qymc" label="区域" align="center"> </el-table-column>
        <el-table-column prop="sy" label="收益" align="center"> </el-table-column>
        <el-table-column prop="chsl" label="出货数量" align="center"> </el-table-column>
        <el-table-column prop="bchje" label="出货金额" align="center"> </el-table-column>
        <el-table-column prop="bwxje" label="微信金额" align="center"> </el-table-column>
        <el-table-column prop="bzfbje" label="支付宝金额" width="100" align="center"> </el-table-column>
        <el-table-column prop="bhykje" label="会员卡金额" width="100" align="center"> </el-table-column>
        <el-table-column prop="bqtje" label="其他收款金额" width="110" align="center"> </el-table-column>
        <el-table-column prop="byhje" label="优惠金额" align="center"> </el-table-column>
        <el-table-column prop="tbje" label="吞币金额" align="center"> </el-table-column>
        <el-table-column prop="rq" label="日期" width="100" align="center"> </el-table-column>
        <el-table-column label="明细" width="100" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">明细</el-button>
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
import { Message } from 'element-ui'
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
      loading: false,
    };
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
      var queryJqjytjData = {
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        jqmc: this.formInline.jqmc,
        dwmc: this.formInline.dwmc,
        jqlx: this.formInline.jqlx,
        shmc: this.formInline.shmc,
        starttime: this.formInline.ftime[0],
        endtime: this.formInline.ftime[1],
      };
      this.loading = true;
      request({ url: "service-order/jqjytj/queryJqjytj", method: 'post', data: queryJqjytjData })
        .then(response => {
          this.loading = false;
          this.tableData = response.data;
          this.listQuery.totalCount = response.total;
        })
        .catch(error => {
          Message.error("error： " + "请检查网络是否连接 ");
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
