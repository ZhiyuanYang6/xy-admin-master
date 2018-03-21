<template>
  <div class="smain">
    <el-table :data="tableData1" @sort-change="sortChange" style="width:90%" border>
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column prop="hdh" sortable='custom' label="货道号" align="center"> </el-table-column>
      <el-table-column prop="spmc" label="商品名称" align="center"> </el-table-column>
      <el-table-column prop="spbh" label="商品编号" align="center"> </el-table-column>
      <el-table-column prop="hdrl" label="货道容量" align="center"> </el-table-column>
      <el-table-column prop="yjrl" label="预警容量" align="center"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData1: [{
        hdh: "1",
        spmc: "可口可乐",
        spbh: "0001",
        hdrl: "20",
        yjrl: "3"
      }, {
        hdh: "2",
        spmc: "可口可乐",
        spbh: "0001",
        hdrl: "20",
        yjrl: "3"
      }]
    }
  },
  methods: {
    sortChange(column) { //服务器端排序
      if (column.order == "ascending") {
        this.orderBy1 = column.prop + " asc";
      } else if (column.order == "descending") {
        this.orderBy1 = column.prop + " desc";
      }
      this.onloadtable1();
    },
  }
}

</script>
<style scoped>


</style>
