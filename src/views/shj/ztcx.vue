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
        <el-input v-model="formInline.ftime" style="width: 120px;" placeholder="商户名称/编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.ftime" style="width: 120px;" placeholder="点位/区域/线路"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.ftime" style="width: 120px;" placeholder="标识"></el-input>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item>
        <el-button type="warning" @click="onloadtable">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div class="stable">
      <el-table :data="tableData" @sort-change="sortChange" v-loading="loading" style="width:100%" border>
        <el-table-column prop="xh" type="index" label="序号" width="50" align="center"> </el-table-column>
        <el-table-column prop="jqbh" sortable='custom' label="机器编号" align="center"> </el-table-column>
        <el-table-column prop="jqmc" label="机器名称" align="center"> </el-table-column>
        <el-table-column prop="showjqlx" label="机器类型" align="center"> </el-table-column>
        <el-table-column prop="shmc" label="商户名称" align="center"> </el-table-column>
        <el-table-column prop="shid" label="商户编号" align="center"> </el-table-column>
        <el-table-column prop="jgs" label="机柜数" align="center"> </el-table-column>
        <el-table-column prop="mzt" label="门状态" align="center"> </el-table-column>
        <el-table-column prop="wl" label="网络" width="50" align="center"> </el-table-column>
        <el-table-column prop="wd" label="温度" width="50" align="center"> </el-table-column>
        <el-table-column prop="khd" label="空货道" align="center"> </el-table-column>
        <el-table-column prop="kh" label="卡货" width="50" align="center"> </el-table-column>
        <el-table-column prop="clgz" label="齿轮故障" align="center"> </el-table-column>
        <el-table-column prop="ybq" label="硬币器" align="center"> </el-table-column>
        <el-table-column prop="zbq" label="纸币器" align="center"> </el-table-column>
        <el-table-column prop="lq" label="零钱" width="50" align="center"> </el-table-column>
        <el-table-column prop="ll" label="流量" width="50" align="center"> </el-table-column>
        <el-table-column prop="zhsbsj" label="最后上报时间" width="110" align="center"> </el-table-column>
        <!-- <el-table-column prop="operation" label="操作" fixed="right"></el-table-column> -->
      </el-table>
      <!-- 分页 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'jqztcx',
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
      tableData: [],
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
    sortChange(column) { //服务器端排序
      if (column.order == "ascending") {
        this.orderBy1 = column.prop + " asc";
      } else if (column.order == "descending") {
        this.orderBy1 = column.prop + " desc";
      }
      this.onloadtable();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      this.onloadtable();
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      this.onloadtable();
    },
    onloadtable() { //机器状态查询
      var queryMachinesStatusData = {
        // orderBy: 'jqbh',
        jqbh: "1378720456",
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        // xl: this.formInline.xl,
        // jqbh: this.formInline.jqbh,
        // shbh: this.formInline.shbh,
        // lx: this.formInline.lx
      }
      console.log(queryMachinesStatusData);
      axios.post('http://192.168.1.9:8092/Jqzt/queryMachinesStatus', queryMachinesStatusData)
        .then(response => {
          this.loading = false;
          this.tableData = response.data.data;
          console.log(response.data);
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
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
