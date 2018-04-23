<template>
  <div class="smain">
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.mbmc" style="width: 240px;" placeholder="模板名称"></el-input>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item>
        <el-button type="warning" @click="onloadtable()">查询</el-button>
        <el-button type="warning" @click="addSubmit" style="padding:9px 25px;"> + </el-button>
      </el-form-item>
    </el-form>
    <div class="stable">
      <el-table :data="tableData1" v-loading="loading" @sort-change="sortChange" style="width:100%" border>
        <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
        <el-table-column prop="mbmc" sortable='custom' label="模板名称" align="center"> </el-table-column>
        <el-table-column prop="cjsj" label="创建时间" align="center"> </el-table-column>
        <el-table-column prop="cz" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="dialogtable1(scope.$index, scope.row)">删除</el-button>
            <el-button type="text" size="mini" @click="dialogtable1(scope.$index, scope.row)">修改</el-button>
            <el-button type="text" size="mini" @click="dialogtable1(scope.$index, scope.row)">指派机器</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="bz" label="备注" align="center"> </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
      </el-pagination>
    </div>
    <!-- el-dialog -->
    <el-dialog title="机器模板设置" :visible.sync="dialogTableVisible" width="90%">
      <shj-mbsz></shj-mbsz>
    </el-dialog>
  </div>
</template>
<script>
import shjMbsz from './components/shjMbsz'

export default {
  components: { shjMbsz },
  data() {
    return {
      formInline: {
        mbmc: ''
      },
      listQuery: {
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 100, //总页数
      },
      tableData1: [{
        mbmc: '商学院正门',
        cjsj: '2017-11-25',
        cz: '保养',
        bz: '打机油',
      }],
      loading: true,
      dialogTableVisible: false
    }
  },
  created: function() {
    this.onloadtable();
  },
  methods: {
    addSubmit() { //添加模板界面
      this.dialogTableVisible = true;
      // var a = docuemnt.getElementByClass('el-dialog__header')
      // console.log(a)
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
    onloadtable() { //模板查询
      var queryShjData = {
        orderBy: this.orderBy,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        mbmc: this.formInline.mbmc,
      }
      this.loading = false;
      // console.log(queryShjData);
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
    dialogtable1() {
      this.dialogTableVisible1 = true;
    },
  }
}

</script>
<style scoped>
/**/

.smain {
  padding: 10px;
}

div.el-form-item {
  margin-bottom: 15px;
}

</style>
