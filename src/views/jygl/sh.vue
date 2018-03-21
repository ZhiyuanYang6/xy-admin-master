<template>
  <div class="smain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input size="mini" v-model="formInline.jqbh" style="width: 110px;" placeholder="机器名称/编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="mini" v-model="formInline.jqmc" style="width: 110px;" placeholder="点位/区域/线路"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="mini" v-model="formInline.jqmc" style="width: 150px;" placeholder="交易单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="mini" v-model="formInline.jqmc" style="width: 150px;" placeholder="商户单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="mini" v-model="formInline.jqmc" style="width: 100px;" placeholder="订单状态"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker size="mini" style="width:310px;" v-model="formInline.ftime" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00', '12:00:00']">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input size="mini" v-model="formInline.jqmc" style="width: 80px;" placeholder="付款人"></el-input>
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
      <el-table :data="tableData1" style="width:100%" border>
        <el-table-column prop="xh" label="序号" width="50" align="center"> </el-table-column>
        <el-table-column prop="xh" label="类型" width="50" align="center"> </el-table-column>
        <el-table-column prop="sp" label="商品" width="50" align="center"> </el-table-column>
        <el-table-column prop="fkje" label="星评" align="center"> </el-table-column>
        <el-table-column prop="fkr" label="评价" align="center"> </el-table-column>
        <el-table-column prop="dqzt" label="付款人" align="center"> </el-table-column>
        <el-table-column prop="spmc" label="问题" align="center"> </el-table-column>
        <el-table-column prop="zfsj" label="支付时间" align="center"> </el-table-column>
        <el-table-column prop="jydh" label="支付方式" align="center"> </el-table-column>
        <el-table-column prop="shdh" label="交易单号" align="center"> </el-table-column>
        <el-table-column prop="pj" label="商户单号" width="50" align="center"> </el-table-column>
        <el-table-column prop="jqbh" label="机器编号" align="center"> </el-table-column>
        <el-table-column prop="jqmc" label="机器名称" align="center"> </el-table-column>
        <el-table-column prop="dw" label="点位" width="50" align="center"> </el-table-column>
        <el-table-column prop="xl" label="线路" align="center"> </el-table-column>
        <el-table-column prop="qy" label="区域" align="center"> </el-table-column>
        <el-table-column label="操作" width="100" fixed="right" align="center">
          <template slot-scope="scope">
            <a href="#">退款</a>
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
        xh: '1',
        sp: '可乐',
        fkje: '2',
        fkr: '张三',
        dqzt: '已出货',
        shmc: '喵星人',
      }, {
        xh: '2',
        sp: '可乐',
        fkje: '2',
        fkr: '张三',
        dqzt: '已退款',
        shmc: '喵星人',
      }, {
        xh: '3',
        sp: '可乐',
        fkje: '2',
        fkr: '张三',
        dqzt: '退款',
        shmc: '喵星人',
      }, {
        xh: '4',
        sp: '可乐',
        fkje: '2',
        fkr: '张三',
        dqzt: '售后处理',
        shmc: '喵星人',
      }, {
        xh: '5',
        sp: '可乐',
        fkje: '2',
        fkr: '张三',
        dqzt: '已出货',
        shmc: '喵星人',
      }, ],
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
