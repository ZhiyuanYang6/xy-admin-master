<template>
  <div class="dwsmain">
    <!-- 商户树结构 -->
    <el-card class="clearfixcard" shadow="hover" :body-style="{ padding: '0' ,'margin-bottom': '-2px'}">
      <div slot="header" class="clearfix">
        <span>商户树</span>
        <el-button style=" padding: 3px 10px 3px 20px" type="text" @click="bdjqclick('bd')">绑定机器</el-button>
        <!-- <el-button style=" padding: 3px 0" type="text" @click="bdjqclick">解绑机器</el-button> -->
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
        <el-table :data="tableData" style="width:100%" @selection-change="handleSelectionChange" :ref="tableData" border>
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
      <el-dialog :title="rows.title" :visible.sync="dialogVisible" width="30%">
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
      clickshbh: '0', // 点击树商户编号 默认赋值当前登录用户商户编号
      usershbh: '0', //当前登录用户商户编号
      username: '超级管理员', //当前登录用户商户名称
    }
  },
  watch: {
    filterText: function(val, oldval) {
      //发起请求，查找指定的
      request({ url: 'service-machine/shdagl/shdaglMatchingQuery', method: 'post', data: { shxx: val } }).then(response => {
        this.dllist = response;
      })
      //this.$refs.tree2.filter(val);
    }
  },
  created: function() {
    this.onloadtable(this.usershbh
);
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      this.onloadtable(this.clickshbh);
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      this.onloadtable(this.clickshbh)
    },
    onloadtable(shbh) { //机器查询
      var queryData = {
        orderBy: '',
        shbh: shbh,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
      }

      request({ url: 'service-machine/shjqgl/shjqglQuery', method: 'post', data: queryData }).then(response => {
        this.tableData = response.data;
        this.listQuery.totalCount = response.total;
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      })
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ shmc: this.username, shbh: this.usershbh }]);
      }
      request({ url: 'service-machine/shdagl/shdaglTreeQuery', method: 'post', data: { shbh: node.data.shbh } }).then(response => {
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
    bdjqclick(val) { //绑定 解绑
      if (this.rows.length > 0) {
        if (val == 'bd') {
          this.rows.title = "商户机器绑定";
          this.rows.btn = "绑定";
        } else {
          this.rows.title = "商户机器解绑";
          this.rows.btn = "解绑";
        }
        this.dialogVisible = true;
      } else {
        this.$message({ type: 'warning', message: "请先选择需要绑定的机器！" });
      }


    },
    handleSelectionChange(val) {
      this.rows = val;
    },
    childchanged(childdata) { //接收子组件参数
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
  width: 74%;
  padding: 5px;
}

.clearfix {
  margin: -5px;
}

.dwsmain:before,
.dwsmain:after {
  display: table;
  content: "";
  clear: both
}

.treetenant {
  padding: 5px;
}

.clearfixcard {
  display: inline-block;
}

div.el-input {
  padding: 5px 2px;
}

</style>
