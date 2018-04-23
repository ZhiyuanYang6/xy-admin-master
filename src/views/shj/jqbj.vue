<template>
  <div class="smain">
    <!-- 警告类别 -->
    <div v-for="lbitem in jglb" style="float:left;padding:0 5px 5px 5px">
      <el-button size="small" type="danger" @click="lookerror(lbitem.lx)">{{lbitem.value}}({{lbitem.num}})</el-button>
    </div>
    <div class="maclx"></div>
    <!-- 表格 -->
    <div class="stable">
      <el-table :data="tableData1" style="width:100%" @sort-change="sortChange" v-loading="loading" border>
        <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
        <el-table-column prop="lx" label="类型" align="center"> </el-table-column>
        <el-table-column prop="jqbh" label="机器编号" align="center"> </el-table-column>
        <el-table-column prop="jqmc" label="机器名称" align="center"> </el-table-column>
        <el-table-column prop="ywry" label="运维人员" align="center"> </el-table-column>
        <el-table-column prop="spbm" label="商品编码" align="center"> </el-table-column>
        <el-table-column prop="hd" label="货道" align="center"> </el-table-column>
        <el-table-column prop="rl" label="容量" align="center"> </el-table-column>
        <el-table-column prop="sl" label="数量" align="center"> </el-table-column>
        <el-table-column prop="sj" label="时间" fixed="right"> </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      jglb: [
        { lx: "kc", value: '库存不足', num: 10, },
        { lx: "gw", value: '高温', num: 2, },
        { lx: "hdgz", value: '货到故障', num: 10, },
        { lx: "lx", value: '离线', num: 10, },
        { lx: "lq", value: '零钱不足', num: 1, },
        { lx: "sbgz", value: '设备故障', num: 10, },
        { lx: "rjgz", value: '软件故障', num: 10, },
        { lx: "ewm", value: '二维码', num: 10, },
        { lx: "jqsz", value: '机器设置', num: 10, },
        { lx: "wy", value: '位移', num: 10, },
        { lx: "kgm", value: '开关门', num: 10, }
      ],
      listQuery: {
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 100,
      },
      tableData1: [{
        lx: "货道库存不足",
        jqbh: '1605600001',
        jqmc: '商学院正门',
        ywry: '张三',
        spbm: '0001',
        hd: '12',
        rl: '10',
        sl: '2',
        sj: "2017-11-25"
      }, {
        lx: "货道库存不足",
        jqbh: '1605600001',
        jqmc: '商学院正门',
        ywry: '张三',
        spbm: '0002',
        hd: '21',
        rl: '10',
        sl: '2',
        sj: "2017-11-25"
      }, {
        lx: "商品库存不足",
        jqbh: '1605600001',
        jqmc: '商学院正门',
        ywry: '张三',
        spbm: '0003',
        hd: [13, ',', 15],
        rl: '10',
        sl: '2',
        sj: "2017-11-25"
      }],
      loading: true,
    }
  },
  created: function() {
    this.onloadtable();
  },
  methods: {
    sleSubmit() { //查询
      console.log("查询")
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      this.onloadtable();
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
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
    onloadtable() { //报警查询
      var queryShjData = {
        orderBy: this.orderBy,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
      }
      this.loading = false;
      console.log(queryShjData);
      // axios.post('http://192.168.1.112:8092/Shjgl/queryShj', queryShjData)
      // .then(response => {
      // this.loading = false;
      // this.tableData1 = response.data.data;
      // console.log(response.data);
      // })
      // .catch(error => {
      // Message.error("error：" + "请检查网络是否连接");
      // })
    },
  }
}

</script>
<style>
/*scoped*/

.smain {
  padding: 10px;
}

.smainFright {
  position: absolute;
  right: 0;
}

.maclx {
  width: 100%;
  padding: 5px;
  margin-top: 40px;
  margin-bottom: 20px;
  border-top: 1px solid #dcdfe6;
}

</style>
