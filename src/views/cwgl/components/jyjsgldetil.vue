<template>
  <div class="smain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="formInline.zffs" placeholder="请选择" clearable>
          <el-option v-for="item in options" :key="item.value" :label="item.valuename" :value="item.value">
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
      <el-table-column prop="shdh" label="商户订单号" align="center"> </el-table-column>
      <el-table-column prop="zfsf" label="支付方式" align="center"> </el-table-column>
      <el-table-column prop="jysj" sortable='custom' label="交易时间" align="center"> </el-table-column>
      <el-table-column prop="xsje" label="销售金额" align="center"> </el-table-column>
      <el-table-column prop="tkje" label="退款金额" align="center"> </el-table-column>
      <el-table-column label="详情" width="100" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="getdetil(scope.row)">明细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-card class="box-card">
  <div  class="text item">

            <p  style="display: inline;    margin-right: 166px;margin-buttom: 20px;" v-for="(val, key, index) in zje">{{val.zffs}}:<b>{{val.zje}}元</b></p>
     <!-- <span>微信总金额:</span> <span id="wx">{{ wx }}</span><br>
      <span>支付宝总金额:</span><span id="zfb">{{ zfb }}</span><br>
      <span>现金总金额</span><span id="xj">{{ xj }}</span><br>
      <span>银联总金额</span><span id="yl">{{ yl }}</span><br> -->
  </div>

</el-card>
    </div>
    <!-- 分页 -->
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
    </el-pagination>
  </div>
</template>
<script>
import request from '@/utils/request'

export default {
  props: ['xqcx', 'dialogVisiblebind'],
  data() {
    return {
      wx:0,
      zfb:0,
      xj:0,
      yl:0,
      formInline: {
        jqbh: '',
        jqmc: '',
        ftime: '',
      },
      tableData: [],
       zje: [
       
      ],
      options: [
        { value: 2, label: "微信" },
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
  watch: {
    dialogVisiblebind: function(data, olddata) {
      if (data) {
        this.dictSelect();
        this.onloadtable();
      }
    }
    /*,
        dialogwdyj: function(data, olddata) {
          if (data) {
            this.wformline = this.listrow;
          }
        }*/
  },
  created: function() {
            this.dictSelect();

    this.tableData = [];
    console.log(this.xqcx);
    debugger;
    //this.tableData.push()
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
    dictSelect() {
      var type="1016";
      var queryType = { type: type };
      request({ url: 'service-goods/goods/querySjzd', method: 'post', data: queryType }).then(response => {
         this.options = response; 
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },
    onloadtable() { //交易结算明细查询
      var queryData = {
        orderBy: 'jqbh',
        jqbh: this.xqcx.jqbh,
        jyqssj: this.xqcx.jyqssj,
        jyjssj: this.xqcx.jyjssj,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        zffs: this.formInline.zffs,
        shbh: 0,
      }
      request({ url: 'service-order/jqjymx/queryjyjsxq', method: 'post', data: queryData }).then(response => {
          console.log(response);
          this.tableData = response.data;
          debugger
          this.zje=response.zje,
          /* this.wx=response.wxzje,
      this.zfb=response.zfbzje,
      this.xj=response.xjzje,
      this.yl=response.ylzje,*/
          this.listQuery.totalCount = response.total;
          console.log(response.data);
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        })
    },

    getdetil(val) { //交易结算明细查询
      var queryData = {
        ddbh: val.ddh,
      }
      request({ url: 'service-order/ddxx/ddxxDetails', method: 'post', data: queryData }).then(response => {
          console.log(response);
          // this.tableData = response.data;
          // this.listQuery.totalCount=response.total;
          // console.log(response.data);
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        })
    },
  },
}

</script>
<style scoped>


</style>
