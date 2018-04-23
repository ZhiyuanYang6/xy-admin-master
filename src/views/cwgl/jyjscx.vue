<template>
  <div class="smain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.jqbh" style="width: 250px;" placeholder="机器名称/编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="formInline.ftime" type="daterange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
        </el-date-picker>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item>
        <el-button type="warning" @click="onloadtable">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div class="stable">
      <!-- @sort-change="sortChange"v-loading="loading" -->
      <el-table :data="tableData" style="width:100%" border>
        <el-table-column prop="jqbh" label="机器编号" align="center"> </el-table-column>
        <el-table-column prop="jqmc" label="金额" width="100" align="center"> </el-table-column>
        <el-table-column prop="dwmc" label="结算日期" align="center"> </el-table-column>
        <el-table-column prop="xlmc" label="交易起始时间" align="center"> </el-table-column>
        <el-table-column prop="qymc" label="交易结束时间" align="center"> </el-table-column>
        <el-table-column prop="sy" label="交易记录数" align="center"> </el-table-column>
        <el-table-column label="明细" width="100" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="getdetil(scope.row)">明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
    </el-pagination>
    <!-- 明细 -->
    <el-dialog title="交易结算明细" :visible.sync="dialogVisiblemx" width="60%">
      <jyjsgldetil :dialogVisiblebind="dialogVisiblemx" @dialog1Changed="childchanged($event)"></jyjsgldetil>
    </el-dialog>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message } from 'element-ui'
import jyjsgldetil from './components/jyjsgldetil'
export default {
  components: { jyjsgldetil },
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
      tableData: [{}],
      loading: false,
      dialogVisiblemx: false,
    }
  },
  created: function() {
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
    getdetil() { //查询
      this.dialogVisiblemx = true;
    },
    onloadtable() { //机器交易明细查询
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

  }
}

</script>
<style>
/*scoped*/

.smain {
  padding: 10px;
}

</style>
