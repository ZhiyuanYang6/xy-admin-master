<template>
  <div class="smain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input size="mini" v-model="formInline.spbh" style="width: 110px;" placeholder="商品编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="mini" v-model="formInline.spmc" style="width: 110px;" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="mini" v-model="formInline.ppmc" style="width: 150px;" placeholder="品牌名称"></el-input>
      </el-form-item>
      <!--  <el-form-item>
       <el-input size="mini" v-model="formInline.ddbh" style="width: 150px;" placeholder="商户单号"></el-input>
     </el-form-item>
     <el-form-item>
       <el-input size="mini" v-model="formInline.ddzt" style="width: 100px;" placeholder="订单状态"></el-input>
     </el-form-item> -->
      <!-- 右侧按钮 -->
      <el-form-item>
        <el-button size="mini" type="warning" @click="onloadtable">查询</el-button>
        <el-button size="mini" type="warning" @click="upspshglform('','add')">添加</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="success" @click="sleSubmit">>Excel</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div class="stable">
      <!-- @sort-change="sortChange"v-loading="loading" -->
      <el-table :data="tableData" style="width:100%" border>
        <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
        <el-table-column prop="fjlj"  label="图片" align="center">
          <template slot-scope="scope">
            <img :src="imgurl+scope.row.fjlj" width="40" height="40" class="head_pic" />
          </template>
        </el-table-column>
        <el-table-column prop="spbh" label="商品编号" align="center"> </el-table-column>
        <el-table-column prop="dsfspbh" label="第三方商品编号" align="center"> </el-table-column>
        <el-table-column prop="spmc" label="名称" align="center"> </el-table-column>
        <el-table-column prop="ppmc" label="品牌(路径)" align="center"> </el-table-column>
        <el-table-column prop="remark" label="备注" align="center"> </el-table-column>
        <el-table-column label="操作" width="100" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="upspshglform(scope.row)" size="mini">修改</el-button>
            <el-button type="text" @click="delectspxx(scope.row)" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogDetailVisible" :title="listrow.title" class="ddgl" width="52%">
      <uploadshspgl :listrow="listrow" :dialogDetailVisible="dialogDetailVisible" @dialog1Changed="childchanged($event)"></uploadshspgl>
    </el-dialog>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message, MessageBox } from 'element-ui'
import { mapGetters } from 'vuex'
import uploadshspgl from './components/uploadshspgl'

export default {
  components: { uploadshspgl },
  data() {
    return {
      dialogDetailVisible: false,
      formInline: {
        spbh: '',
        spmc: '',
        ppmc: '',
      },
      listQuery: {
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 100,
      },
      tableData: [{ imgurl: '001' }],
      loading: true,
      listrow: {},
      isadd: true,
    }
  },
  created: function() {
    this.onloadtable();
  },
   computed: {
    ...mapGetters([
      'imgurl'
    ]),

  },
  methods: {
    sleSubmit() { //查询
      console.log(" 查询 ")
    },
    btnDetails() { //查看详情
      this.dialogDetailVisible = true;
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      this.onloadtable();
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      this.onloadtable();
    },
    onloadtable() { //查询
      var queryDdxxData = {
        spbh: this.formInline.spbh,
        spmc: this.formInline.spmc,
        ppmc: this.formInline.ppmc,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
      };
      request({ url: 'service-goods/goods/queryShGoodsByShbh', method: 'post', data: queryDdxxData }).then(response => {
        this.tableData = response.list;
        this.listQuery.totalCount = response.total;
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },
    queryspbh() { //添加商品
      request({ url: 'service-goods/goods/queryspbh', method: 'post', data: { shbh: "0000000001" } }).then(response => {
        this.listrow.dsfspbh = response.dsdspbh;
        this.listrow.spbh = response.spbh;
        this.dialogDetailVisible = true;
        // console.log()
        // debugger;
      })
    },
    delectspxx(value) { //删除商品
      this.$confirm('确认删除商品？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var delectsp = { spid: value.spid };
        request({ url: 'service-goods/goods/delectSpxx', method: 'post', data: delectsp }).then(response => {
          this.$message({ message: '商品删除成功', type: 'success' });
/*          this.$message({ type: 'success', message: response.Msg });
*/          this.onloadtable()
        }).catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        });

      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' });
      });

    },
   
    upspshglform(row, add) {
      if (add == "add") {
        this.listrow.btn = "添加";
        this.listrow.title = "添加商品";
        this.queryspbh();
      } else {
        this.listrow = row;
        this.listrow.btn = "修改";
        this.listrow.title = "修改商品";
        this.isadd = false;
        this.dialogDetailVisible = true;
      }
    },
    childchanged(childdata) { //接收子组件参数
      this.dialogDetailVisible = false;
      this.onloadtable();
    },
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
