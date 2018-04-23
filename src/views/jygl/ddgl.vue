<template>
  <div class="smain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input size="mini" v-model="formInline.jqmc" style="width: 110px;" placeholder="机器名称/编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="mini" v-model="formInline.dwmc" style="width: 110px;" placeholder="点位/区域/线路"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="mini" v-model="formInline.jyid" style="width: 150px;" placeholder="交易单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="mini" v-model="formInline.ddbh" style="width: 150px;" placeholder="商户单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="mini" v-model="formInline.ddzt" style="width: 100px;" placeholder="订单状态"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker size="mini" style="width:310px;" v-model="formInline.ftime" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00', '12:00:00']">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input size="mini" v-model="formInline.zfzh" style="width: 80px;" placeholder="付款人"></el-input>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item>
        <el-button size="mini" type="warning" @click="onloadtable">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="success" @click="sleSubmit">>Excel</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div class="stable">
      <!-- @sort-change="sortChange"v-loading="loading" -->
      <el-table :data="tableData" style="width:100%" border>
        <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
        <el-table-column prop="ddbh" label="商户单号" align="center"> </el-table-column>
        <el-table-column prop="shmc" label="商户名称" align="center"> </el-table-column>
        <el-table-column prop="jqbh" label="机器编号" align="center"> </el-table-column>
        <el-table-column prop="jqmc" label="机器名称" align="center"> </el-table-column>
        <el-table-column prop="spzj" label="订单原价" align="center"> </el-table-column>
        <el-table-column prop="yhje" label="优惠金额" align="center"> </el-table-column>
        <el-table-column prop="ddzj" label="付款金额" align="center"> </el-table-column>
        <el-table-column prop="spmc" label="商品名称" width="80" align="center"> </el-table-column>
        <el-table-column prop="showspdj" label="商品单价" width="80" align="center"> </el-table-column>
        <el-table-column prop="showspsl" label="商品数量" width="80" align="center"> </el-table-column>
        <el-table-column prop="zfzh" label="付款人" align="center"> </el-table-column>
        <el-table-column prop="showddzt" label="当前状态" align="center"> </el-table-column>
        <el-table-column prop="zfsj" label="支付时间" align="center"> </el-table-column>
        <el-table-column prop="jyid" label="交易单号" align="center"> </el-table-column>
        <el-table-column prop="showpjdj" label="评价" width="50" align="center"> </el-table-column>
        <el-table-column prop="dwmc" label="点位" width="50" align="center"> </el-table-column>
        <el-table-column prop="xlmc" label="线路" align="center"> </el-table-column>
        <el-table-column prop="qymc" label="区域" align="center"> </el-table-column>
        <el-table-column label="详情" width="100" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="btnDetails" size="mini">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogDetailVisible" title="订单详情" class="ddgl
" width="90%">
      <Ddetails></Ddetails>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import Ddetails from './ddgl/components/details'
export default {
  components: { Ddetails },
  data() {
    return {
      dialogDetailVisible: false,
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
      loading: true,
    }
  },
  created: function() {
    this.onloadtable();
  },
  methods: {
    sleSubmit() { //查询
      console.log(" 查询 ")
    },
    btnDetails() { //查看详情
      this.dialogDetailVisible = true;
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      this.loadTable();
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      this.loadTable();
    },
    onloadtable() { //订单状态查询
      var queryDdxxData = {
        // orderBy: 'jqbh',
        ddbh: 1,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        jqmc: this.formInline.jqmc,
        dwmc: this.formInline.dwmc,
        jyid: this.formInline.jyid,
        ddbh: this.formInline.ddbh,
        ddzt: this.formInline.ddzt,
        zfzh: this.formInline.zfzh
      }
      console.log(queryDdxxData);
      axios.post('http://192.168.1.9:8092/ddxx/queryDdxx', queryDdxxData)
        .then(response => {
          this.tableData = response.data.data.list;
          this.listQuery.totalCount = response.data.data.total;
          // console.log(response.data);
        })
        .catch(error => {
          // Message.error("error： " + "请检查网络是否连接 ");
        })
    },
  }
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
