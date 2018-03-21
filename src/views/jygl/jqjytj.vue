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
        <el-table-column prop="jqbh" label="机器编号" width="100" align="center"> </el-table-column>
        <el-table-column prop="jqmc" label="机器名称" width="100" align="center"> </el-table-column>
        <el-table-column prop="dw" label="点位" width="100" align="center"> </el-table-column>
        <el-table-column prop="xl" label="线路" align="center"> </el-table-column>
        <el-table-column prop="qy" label="区域" align="center"> </el-table-column>
        <el-table-column prop="sy" label="收益" align="center"> </el-table-column>
        <el-table-column prop="chsl" label="出货数量" align="center"> </el-table-column>
        <el-table-column prop="chje" label="出货金额" align="center"> </el-table-column>
        <el-table-column prop="wxje" label="微信金额" align="center"> </el-table-column>
        <el-table-column prop="zfbje" label="支付宝金额" width="100" align="center"> </el-table-column>
        <el-table-column prop="hykje" label="会员卡金额" width="100" align="center"> </el-table-column>
        <el-table-column prop="qtskje" label="其他收款金额" width="110" align="center"> </el-table-column>
        <el-table-column prop="yhje" label="优惠金额" align="center"> </el-table-column>
        <el-table-column prop="tbje" label="吞币金额" align="center"> </el-table-column>
        <el-table-column prop="rq" label="日期" width="100" align="center"> </el-table-column>
        <el-table-column label="明细" width="100" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">明细</el-button>
          </template>
        </el-table-column>
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
        jqbh: '1605600001',
        jqmc: '商学院北门',
        dw: '商学院北门',
        xl: '1',
        qy: '岳麓区',
        sy: '1',
        chsl: '1',
        chje: '2',
        wxje: '0',
        zfbje: '2',
        hykje: '0',
        qtskje: '0',
        yhje: '0',
        tbje: '0',
        rq: '2014-02-21',
      }, {
        jqbh: '1605600001',
        jqmc: '商学院北门',
        dw: '商学院北门',
        xl: '1',
        qy: '岳麓区',
        sy: '1',
        chsl: '1',
        chje: '2',
        wxje: '0',
        zfbje: '2',
        hykje: '0',
        qtskje: '0',
        yhje: '0',
        tbje: '0',
        rq: '2014-02-21',
      }, {
        jqbh: '1605600001',
        jqmc: '商学院北门',
        dw: '商学院北门',
        xl: '1',
        qy: '岳麓区',
        sy: '1',
        chsl: '1',
        chje: '2',
        wxje: '0',
        zfbje: '2',
        hykje: '0',
        qtskje: '0',
        yhje: '0',
        tbje: '0',
        rq: '2014-02-21',
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
