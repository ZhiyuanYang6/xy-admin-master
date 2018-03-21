<template>
  <div class="smain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.jqbh" style="width: 150px;" placeholder="机器名称/编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.jqmc" style="width: 120px;" placeholder="机器类型"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.jqmc" style="width: 120px;" placeholder="商户名称/编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.jqmc" style="width: 120px;" placeholder="点位/区域/线路"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.jqmc" style="width: 120px;" placeholder="出货状态"></el-input>
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
      <el-table :data="tableData1" style="width:100%" border>
        <el-table-column prop="jybh" label="交易编号" width="80" align="center"> </el-table-column>
        <el-table-column prop="jqbh" label="机器编号" align="center"> </el-table-column>
        <el-table-column prop="jqmc" label="机器名称" width="100" align="center"> </el-table-column>
        <el-table-column prop="dw" label="点位" width="100" align="center"> </el-table-column>
        <el-table-column prop="xse" label="销售额" align="center"> </el-table-column>
        <el-table-column prop="ddh" label="订单号" align="center"> </el-table-column>
        <el-table-column prop="sp" label="商品" width="90" align="center"> </el-table-column>
        <el-table-column prop="sl" label="数量" width="50" align="center"> </el-table-column>
        <el-table-column prop="zffs" label="支付方式" width="80" align="center"> </el-table-column>
        <el-table-column prop="zfje" label="支付金额" width="80" align="center"> </el-table-column>
        <el-table-column prop="yhje" label="优惠金额" width="80" align="center"> </el-table-column>
        <el-table-column prop="ch" label="出货" width="50" align="center"> </el-table-column>
        <el-table-column prop="zt" label="状态" width="50" align="center"> </el-table-column>
        <el-table-column prop="zl" label="找零" width="50" align="center"> </el-table-column>
        <el-table-column prop="tk" label="退款" width="50" align="center"> </el-table-column>
        <el-table-column prop="sj" label="时间" width="100" align="center"> </el-table-column>
        <!-- <el-table-column prop="operation" label="操作" fixed="right"></el-table-column> -->
      </el-table>
    </div>
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
      tableData1: [{
        jybh: '0000001',
        jqbh: '1605600001',
        jqmc: '商学院北门',
        dw: '商学院北门',
        xse: '3',
        ddh: 'AA13234',
        sp: '可乐100ml',
        sl: '1',
        zffs: '微信',
        zfje: '3',
        yhje: '0',
        ch: '1',
        zt: '出货',
        zl: '0',
        tk: '0',
        sj: '2001-11-11 12:11:11',
      }, {
        jybh: '0000002',
        jqbh: '1605600001',
        jqmc: '商学院北门',
        dw: '商学院北门',
        xse: '3',
        ddh: 'AA13234',
        sp: '可乐100ml',
        sl: '1',
        zffs: '微信',
        zfje: '3',
        yhje: '0',
        ch: '1',
        zt: '出货',
        zl: '0',
        tk: '0',
        sj: '2001-11-11 12:11:11',
      }, {
        jybh: '0000003',
        jqbh: '1605600001',
        jqmc: '商学院北门',
        dw: '商学院北门',
        xse: '3',
        ddh: 'AA13234',
        sp: '可乐100ml',
        sl: '1',
        zffs: '微信',
        zfje: '3',
        yhje: '0',
        ch: '1',
        zt: '出货',
        zl: '0',
        tk: '0',
        sj: '2001-11-11 12:11:11',
      }, {
        jybh: '0000004',
        jqbh: '1605600001',
        jqmc: '商学院北门',
        dw: '商学院北门',
        xse: '3',
        ddh: 'AA13234',
        sp: '可乐100ml',
        sl: '1',
        zffs: '微信',
        zfje: '3',
        yhje: '0',
        ch: '1',
        zt: '出货',
        zl: '0',
        tk: '0',
        sj: '2001-11-11 12:11:11',
      }, {
        jybh: '0000001',
        jqbh: '1605600001',
        jqmc: '商学院北门',
        dw: '商学院北门',
        xse: '3',
        ddh: 'AA13234',
        sp: '可乐100ml',
        sl: '1',
        zffs: '微信',
        zfje: '3',
        yhje: '0',
        ch: '1',
        zt: '出货',
        zl: '0',
        tk: '0',
        sj: '2001-11-11 12:11:11',
      }],
      // loading: true,
    }
  },

  methods: {
    sleSubmit() { //查询
      console.log("查询")
    }
  }
}

</script>
<style>
/*scoped*/

.smain {
  padding: 10px;
}

</style>
