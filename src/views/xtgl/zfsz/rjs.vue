<template>
  <div class="smain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="formInline.ne" clearable placeholder="请选择">
          <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="formInline.sn" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item>
        <el-button type="warning" @click="onloadtable1()">查询</el-button>
        <el-button type="warning" @click="dialogFormVisible = true">添加</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div class="stable">
      <!-- @sort-change="sortChange" -->
      <el-table :data="tableData" max-height="398" @sort-change="sortChange" v-loading="loading" style="width:100%" border>
        <el-table-column prop="id" label="ID" align="center"> </el-table-column>
        <el-table-column prop="payType" label="支付类型" align="center"> </el-table-column>
        <el-table-column prop="mchId" label="服务帐号" align="center"> </el-table-column>
        <el-table-column prop="shbh" label="商户编号" align="center"> </el-table-column>
        <el-table-column prop="jqbh" label="机器编号" align="center"> </el-table-column>
        <el-table-column prop="gmtCrate" label="建立时间" align="center"> </el-table-column>
        <el-table-column prop="payFee" label="金额(分)" align="center"> </el-table-column>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button  type="text" size="mini" @click="ck(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="查询" style="margin-left:170px" width="80%" :visible.sync="dialogFormVisible">
 <el-table :data="tableDatas" max-height="398" @sort-change="sortChange" v-loading="loading" style="width:100%" border>
         <el-table-column prop="payType" label="支付类型" align="center"> </el-table-column>
        <el-table-column prop="mchId" label="服务帐号" align="center"> </el-table-column>
        <el-table-column prop="shbh" label="商户编号" align="center"> </el-table-column>
        <el-table-column prop="jqbh" label="机器编号" align="center"> </el-table-column>
        <el-table-column prop="outTradeNo" label="订单号" align="center"> </el-table-column>
        <el-table-column prop="gmtCreate" label="建立时间" align="center"> </el-table-column>
        <el-table-column prop="gmtPay" label="支付时间" align="center"> </el-table-column>
        <el-table-column prop="payFee" label="金额" align="center"> </el-table-column>
 </el-table>

<el-pagination background @size-change="handleSizeChanges" @current-change="handleCurrentChanges" :current-page="listQuerys.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuerys.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuerys.totalCount">
    </el-pagination>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
     
    <!-- 分页 -->
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
    </el-pagination>
  </div>
</template>
<script>
import axios from 'axios'
import { Message } from 'element-ui'
import request from '@/utils/request'
import '@/utils/qrcode'
export default {
  name: 'index',
  data() {
    return {
      formInline: {
        sn: '',
        ne: ''
      },
      listQuery: {
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 100
      },
       listQuerys: {
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 100
      },
      tableData: [{
        title: '以上架'
      }],

      tableDatas: [{
        title: '以上架'
      }],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      orderBy: '',
      lisrrow:'',
      loading: false,
      options: [{
        value: 'shbh',
        label: '商户编号'
      }, {
        value: 'jqbh',
        label: '机器编号'
      }]
    };
  },
  created: function() {
    this.onloadtable1();
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      this.onloadtable1();
    },

    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      this.onloadtable1();
    },
    handleSizeChanges(val) {
      this.listQuerys.pageSize = val; //修改每页数据量
      this.Jschargehall();
    },
    handleCurrentChanges(val) { //跳转第几页
      this.listQuerys.pageNum = val;
      this.Jschargehall();
    },
    sortChange(column) { //服务器端排序
      if (column.order === "ascending") {
        this.orderBy = column.prop + " asc";
      } else if (column.order === "descending") {
        this.orderBy = column.prop + " desc";
      }
      this.onloadtable1();
    },
    ck(index,row){
      this.lisrrow=row;
    this.Jschargehall();
    },
    Jschargehall(){
  var txmxcxData={
        pageNum: this.listQuerys.pageNum,
        pageSize: this.listQuerys.pageSize,
        jqbh:this.lisrrow.jqbh,
        shbh:this.lisrrow.shbh,
        payType:this.lisrrow.payType,
        mchId:this.lisrrow.mchId,
        gmtCreate:this.lisrrow.gmtCrate
      };
      this.dialogFormVisible = true;
       request({ url: 'service-pay/pay/api/config/Jschargehselect', method: 'post', data: txmxcxData })
        .then(response => {
          this.loading = false;
          this.tableDatas = response.list;
          this.listQuerys.totalCount = response.total;
          console.log(response.data);
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        });
    },
    onloadtable1() { //查询
      var txmxcxData = {
        orderBy: this.orderBy,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        sn: this.formInline.sn,
        ne: this.formInline.ne
      };

      //axios.post('http://127.0.0.1:8083/pay/api/config/jyclientselect', txmxcxData)
      request({ url: 'service-pay/pay/api/config/Jsdayselect', method: 'post', data: txmxcxData })
        .then(response => {
          this.loading = false;
          this.tableData = response.list;
          this.listQuery.totalCount = response.total;
          console.log(response.data);
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        });
    },
    moneyData(money) { //不能用过滤器，很难受 金额
      return (money / 100).toFixed(2);
    },
  }
}

</script>
<style scoped>
/**/

.smain {
  padding: 10px;
}

.stable .el-button {
  /*padding: 10px 30px;*/
}

.smainFright {
  position: absolute;
  right: 0;
}

div.el-dialog--center div.el-dialog__body {
  padding-top: 5px;
  padding-bottom: 5px;
}

</style>
