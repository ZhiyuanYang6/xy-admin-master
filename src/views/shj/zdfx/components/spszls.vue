<template>
  <div>
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.bhmc" style="width: 240px;" placeholder="机器编号/机器名称"></el-input>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item>
        <el-button type="warning" @click="addSubmit()">体检</el-button>
      </el-form-item>
    </el-form>
    <div class="stable">
      <el-table :data="tableData1" style="width:60%" border>
        <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
        <el-table-column prop="time" label="时间" align="center"> </el-table-column>
        <el-table-column prop="szfs" label="设置方式" align="center"></el-table-column>
        <el-table-column label="详情" align="center" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="addSubmit">查看</el-button>
          </template>
        </el-table-column>
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
      formInline: {
        bhmc: ''
      },
      listQuery: {
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 100, //总页数
      },
      tableData1: [{
        szfs: '后台下发',
        time: '2017-11-25 12:11:114'
      }],
    }
  },
  methods: {
    addSubmit() { //添加模板界面
      this.dialogTableVisible = true;
      // var a = docuemnt.getElementByClass('el-dialog__header')
      // console.log(a)
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      // this.onloadtable();
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      // this.onloadtable();
    },

  }
}

</script>
<style scoped>
/*scoped*/

</style>
