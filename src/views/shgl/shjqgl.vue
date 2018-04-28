<template>
  <div class="dwsmain">
    <!-- 商户树结构 -->
    <el-card class="clearfixcard" shadow="hover" :body-style="{ padding: '0' ,'margin-bottom': '-2px'}">
      <div slot="header" class="clearfix">
        <span>商户树</span>
        <el-button style=" padding: 3px 10px 3px 20px" type="text" @click="bdjqclick">绑定机器</el-button>
        <el-button style=" padding: 3px 0" type="text">解绑机器</el-button>
      </div>
      <el-input placeholder="输入商户编号或名称" v-model="filterText"></el-input>
      <el-tree v-if="!filterText" :expand-on-click-node="false" ref="tree2" class="treetenant" :props="props" :load="loadNode" @node-click="treeClick" lazy></el-tree v-show="filterText">
      <el-table v-show="!!filterText" highlight-current-row @current-change="handleChange" :data="dllist" style="width:100%; cursor:pointer;">
        <el-table-column prop="fshmc" label="父商户名称"></el-table-column>
        <el-table-column prop="shmc" label="商户名称"></el-table-column>
      </el-table>
    </el-card>
    <!-- 表格 -->
    <el-card class="stablecard" shadow="hover" :body-style="{ padding: '0' ,'margin-bottom': '-2px'}">
      <div class="stable">
        <el-table :data="tableData" style="width:100%" @selection-change="handleSelectionChange" ref="tableref
" border>
          <el-table-column type="selection" align="center"> </el-table-column>
          <el-table-column prop="shmc" label="所属商户" align="center"> </el-table-column>
          <el-table-column prop="jqbh" label="机器编号" align="center"> </el-table-column>
          <el-table-column prop="jqmc" label="机器名称" align="center"> </el-table-column>
          <el-table-column prop="dwmc" label="点位" align="center"> </el-table-column>
          <el-table-column prop="remark" label="备注" align="center"> </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination class="pageina" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
        </el-pagination>
      </div>
      <!-- 商户机器绑定 -->
      <el-dialog title="商户机器绑定" :visible.sync="dialogVisible" width="45%">
        <shjqglform :listrow="rows" :dialogVisible="dialogVisible" @dialog1Changed="childchanged($event)"></shjqglform>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import request from '@/utils/request'
import shjqglform from './components/shjqglform'
import { Message, MessageBox } from 'element-ui'
export default {
  components: { shjqglform },
  data() {
    return {
      listQuery: {
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 100,
      },
      dllist: [],
      tableData: [],
      loading: false,
      rows: [],
      dialogVisible: false,
      props: {
        label: 'shmc',
        children: 'zones',
        isLeaf: 'leaf'
      },
      filterText: '',
      clickshbh: '0000',
    }
  },
  watch: {
    filterText(val) {
      //发起请求，查找指定的
      request({ url: '/shdagl/shdaglMatchingQuery', method: 'post', data: { fshbh: '0000', shxx: val } }).then(response => {
        this.dllist = response;
      })
      //this.$refs.tree2.filter(val);
    }
  },
  created: function() {
    this.onloadtable("0000");
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      // this.onloadtable();
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      // this.onloadtable();
    },
    onloadtable(shbh) { //机器查询
      var queryData = {
        orderBy: '',
        shbh: shbh,
        fshbh: "0000",
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
      }
      request({ url: '/shjqgl/shjqglQuery', method: 'post', data: queryData }).then(response => {
          console.log(response.data);
          this.tableData = response.data;
          this.listQuery.totalCount = response.total;
          //     console.log(response.data);
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        })
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ shmc: '超级管理员', shbh: "0000" }]);
      }
      request({ url: '/shdagl/shdaglTreeQuery', method: 'post', data: { shbh: node.data.shbh } }).then(response => {
        resolve(response)
      })
    },
    treeClick(node, resolve) {
      this.clickshbh = node.shbh;
      this.onloadtable(node.shbh);
    },
    handleChange(val) {
      this.clickshbh = val.shbh;
      this.onloadtable(val.shbh);
    },
    bdjqclick() { //绑定
      if (this.rows.length > 0) {
        this.dialogVisible = true;
      } else {
        this.$message({ type: 'error', message: "请先选择需要绑定的机器！" });
      }
    },
    handleSelectionChange(val) {
      this.rows = val;
    },
    childchanged(childdata) { //接收子组件参数
      debugger;
      this.dialogVisible = false;
      this.onloadtable(this.clickshbh);
    },
  }
}

</script>
<style scoped>
div.dwsmain {
  padding: 5px;
}

.clearfixcard {
  /*position: relative;*/
  float: left;
  width: 25%;
}

.stablecard {
  position: relative;
  left: 1%;
  width: 76%;
  padding: 5px;
}

.clearfix {
  margin: -5px;
}

.treetenant {
  padding: 5px;
}

.clearfixcard {
  /*//清除浮动*/
  display: inline-block;
}

div.el-input {
  padding: 5px 2px;
}

</style>
