<template>
  <div class="dwsmain">
    <!-- 商户树结构 -->
    <el-card class="clearfixcard" shadow="hover" :body-style="{ padding: '0' ,'margin-bottom': '-2px'}">
      <div slot="header" class="clearfix">
        <span>商户树</span>
        <el-button style=" padding: 3px 10px 3px 60px; float:right;" type="text" @click="addshclick">添加商户</el-button>
      </div>
      <el-input placeholder="输入商户编号或名称" v-model="filterText"></el-input>
      <el-tree v-if="!filterText" :expand-on-click-node="false" node-key="shbh" ref="tree2" class="treetenant" :props="props" :load="loadNode" @node-click="treeClick" lazy></el-tree v-show="filterText">
      <el-table v-show="!!filterText" highlight-current-row @current-change="handleChange" :data="dllist" style="width:100%; cursor:pointer;">
        <el-table-column prop="fshmc" label="父商户名称"></el-table-column>
        <el-table-column prop="shmc" label="商户名称"></el-table-column>
      </el-table>
    </el-card>
    <!-- 表格 -->
    <el-card class="stablecard" shadow="hover" :body-style="{ padding: '0' ,'margin-bottom': '-2px'}">
      <div class="stable">
        <el-table :data="tableData" style="width:100%" border>
          <el-table-column type="index" label="序号" align="center"> </el-table-column>
          <el-table-column prop="shbh" label="商户编号" align="center"> </el-table-column>
          <el-table-column prop="shmc" label="商户名称" align="center"> </el-table-column>
          <el-table-column prop="fshmc" label="上级商户名称" alig n="center"> </el-table-column>
          <el-table-column prop="lxr" label="联系人" align="center"> </el-table-column>
          <el-table-column prop="lxdh" label="联系电话" align="center"> </el-table-column>
          <el-table-column prop="showsfksk" label="是否能收款" align="center"> </el-table-column>
          <el-table-column prop="remark" label="备注" align="center"> </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="setclick(scope.row)" type="text">修 改</el-button>
              <el-button @click="delclick(scope.row)" type="text">删 除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination class="pageina" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
        </el-pagination>
      </div>
      <!-- 添加修改商户 -->
      <el-dialog :title="row.title" :visible.sync="dialogVisible" width="50%">
        <shdaglform :listrow="row" :dialogVisible="dialogVisible" @dialog1Changed="childchanged($event)"></shdaglform>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import request from '@/utils/request'
import shdaglform from './components/shdaglform'
import { Message, MessageBox } from 'element-ui'
export default {
  components: { shdaglform },
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
      row: {},
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
    filterText(val) {
      //发起请求，查找指定的
      request({ url: 'service-machine/shdagl/shdaglMatchingQuery', method: 'post', data: { shxx: val } }).then(response => {
        this.dllist = response;
      })
      //this.$refs.tree2.filter(val);
    }
  },
  created: function() {
    this.onloadtable(this.usershbh);
  },
  methods: {
    addxlsubmit() { //添加区域
      this.row.qybh = true;
      this.row.qymc = true;
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      this.onloadtable(this.clickshbh);
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      this.onloadtable(this.clickshbh);
    },
    onloadtable(shbh) { //商户档案查询
      var queryData = {
        orderBy: '',
        shbh: shbh,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize
      }
      request({ url: 'service-machine/shdagl/shdaglQuery', method: 'post', data: queryData }).then(response => {
          this.tableData = response.data;
          this.listQuery.totalCount = response.total;
          //console.log(response.data);
        })
        .catch(error => {
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
      //debugger;
      this.clickshbh = node.shbh;
      this.onloadtable(node.shbh);
    },
    handleChange(val) {
      this.clickshbh = val.shbh;
      this.onloadtable(val.shbh);
    },
    addshclick() { //添加
      //debugger;
      //console.log(this.$refs.tree2.getNode('0000'));
      this.row.title = "添加商户";
      this.row.btn = "添加";
      this.dialogVisible = true;
    },
    setclick(row) { //修改
      //console.log(row);
      this.row = row;
      this.row.title = "修改商户";
      this.row.btn = "修改";
      this.dialogVisible = true;
    },
    delclick(row) { //删除
      this.$confirm('确认删除商户?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var deleteData = {
          shbh: row.shbh,
          userid: row.userid
        };
        request({
            url: 'service-machine/shdagl/shdaglDelete',
            method: 'post',
            data: deleteData
          }).then(response => {
            if (response.msg) {
              this.$refs.tree2.remove(row.shbh);
              this.$message({ type: 'success', message: response.msg });
              this.onloadtable(this.usershbh);
            }
          })
          .catch(error => {
            Message.error("error：" + "请检查网络是否连接");
          })

      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' });
      });
    },
    childchanged(childdata) { //接收子组件参数
      var tree = this.$refs.tree2;
      if (tree != null) {
        if (this.row.btn == "添加") {
          //添加成功  第二级树添加子节点
          tree.append({ shbh: childdata.shbh, shmc: childdata.shmc, leaf: true }, this.usershbh);
        } else {
          //修改成功  修改对应节点属性(商户名称)
          var node = tree.getNode(childdata.shbh);
          if (node != null) {
            //是否为叶子节点
            childdata.leaf = node.data.leaf;

            if (node.nextSibling != null) {
              //当前节点不为最后一个  先删除当前节点  然后根据后一个节点添加节点
              var nextNode = node.nextSibling;
              tree.remove(childdata.shbh);
              tree.insertBefore(childdata, nextNode.data.shbh);
            } else {
              //当前节点为最后一个  先删除当前节点  然后根据父节点添加节点
              var pshbh = node.parent.data.shbh;
              tree.remove(childdata.shbh);
              tree.append(childdata, pshbh);
            }
          }
        }

        //this.$refs.tree2.getNode(childdata.shbh).label = childdata.shmc;
        //this.$refs.tree2.updateKeyChildren(childdata.shbh, { shbh: childdata.shbh, shmc: childdata.shmc, leaf: childdata.leaf });
        //console.log(childdata);
      }
      //console.log('ccc:' + this.clickshbh);
      this.dialogVisible = false;
      this.onloadtable(this.clickshbh);
    },
  }
}

</script>
<style scoped>
div.dwsmain {
  padding: 5px;
  overflow: hidden;
}

.clearfixcard {
  /*position: relative;*/
  float: left;
  width: 22%;
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
