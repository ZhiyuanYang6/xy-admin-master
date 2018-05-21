<template>
  <div class="smain">
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.jqmc" style="width: 120px;" placeholder="运营人员"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.jqbh" style="width: 150px;" placeholder="机器名称/机器编号"></el-input>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item>
        <el-button type="warning" @click="onloadtable()">查询</el-button>
        <el-button type="warning" @click="sleSubmit" style="padding:9px 25px;"> + </el-button>
      </el-form-item>
    </el-form>
    <div class="stable">
      <el-table :data="tableData1" v-loading="loading" @sort-change="sortChange" style="width:100%" border>
        <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
        <el-table-column prop="jqbh" sortable='custom' label="机器编号" align="center"> </el-table-column>
        <el-table-column prop="jqmc" label="机器名称" align="center"> </el-table-column>
        <el-table-column prop="xm" label="项目" align="center"> </el-table-column>
        <el-table-column prop="nr" label="内容" align="center"> </el-table-column>
        <el-table-column prop="fj" label="附件" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="dialogtable1(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="czy" label="操作员" align="center"> </el-table-column>
        <el-table-column prop="sj" label="时间" align="center"> </el-table-column>
        <el-table-column prop="bz" label="备注" fixed="right"> </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
      </el-pagination>
    </div>
    <!-- 对话框 -->
    <el-dialog center title="保养维修" :visible.sync="dialogFormVisible" width="42%">
      <hr>
      <el-form size="small" class="bywx" :model="formInline1" label-width="70px" label-position="left">
        <el-form-item label="机器编号">
          <el-input v-model="formInline1.jqbh" placeholder="机器编号" style="width:292px;"></el-input>
        </el-form-item>
        <el-form-item label="项目类型">
          <el-checkbox-group v-model="formInline1.typeOptions" size="small">
            <el-checkbox label="维修" border></el-checkbox>
            <el-checkbox label="保养" border></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="详细内容">
          <el-input type="textarea" class="bywxtart" v-model="formInline1.xxlr"></el-input>
        </el-form-item>
        <el-form-item label="上传附件" class="bywxtart">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
            <el-dialog :visible.sync="dialogVisible1">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-upload>
        </el-form-item>
      </el-form>
      <hr>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'bywx',
  data() {
    return {
      dialogFormVisible: false,
      dialogVisible1: false,
      dialogImageUrl: '',
      formInline: {
        jqbh: '',
        jqmc: '',
        ftime: '',
      },
      formInline1: {
        typeOptions: ['维修'],
        jqbh: '',
        xxlr: '',
      },
      listQuery: {
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 100,
      },
      tableData1: [{
        jqbh: '1605600001',
        jqmc: '商学院正门',
        xm: '保养',
        nr: '打机油',
        czy: '张三',
        sj: '2017-11-25'
      }, {
        jqbh: '1605600001',
        jqmc: '商学院正门',
        xm: '保养',
        nr: '打机油',
        czy: '张三',
        sj: '2017-11-25'
      }],
      loading: true,
    }
  },
  created: function() {
    this.onloadtable();
  },
  methods: {
    sleSubmit() { //查询
      this.dialogFormVisible = true;
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
    dialogtable1() {
      this.dialogTableVisible1 = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}

</script>
<style>
/*scoped*/

.smain {
  padding: 10px;
}

.bywx .el-dialog__body form {
  padding: 0 80px;
}

hr {
  border-top: #DCDFE6;
}

.dialog-footer .el-button--medium {
  padding: 10px 50px;
}

.dialog-footer .el-button+.el-button {
  margin-left: 30px;
}

.bywxtart .el-textarea__inner {
  height: 90px;
  width: 292px;
}

div.el-upload--picture-card {
  width: 100px;
  height: 100px;
}

div.el-upload--picture-card i {
  top: -20px;
  position: relative;
  font-size: 20px;
}

.el-upload-list--picture-card .el-upload-list__item {
  width: 100px;
  height: 100px;
}

</style>
