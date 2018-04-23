<template>
  <div class="dwsmain">
    <!-- 商户树结构 -->
    <el-tree class="treetenant" :props="props" :load="loadNode" lazy></el-tree>
    <!-- 表格 -->
    <div class="stable">
      <el-table :data="tableData" style="width:100%" border>
        <el-table-column type="selection" align="center"> </el-table-column>
        <el-table-column prop="jqmc" label="所属商户" align="center"> </el-table-column>
        <el-table-column prop="jqbh" label="机器编号" align="center"> </el-table-column>
        <el-table-column prop="xl" label="机器名称" align="center"> </el-table-column>
        <el-table-column prop="qy" label="点位" align="center"> </el-table-column>
        <el-table-column prop="sy" label="备注" align="center"> </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message, MessageBox } from 'element-ui'
export default {
  data() {
    return {
      listQuery: {
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 100,
      },
      tableData: [
        { jqbh: 'sagsfdgds' },
        { jqbh: 'sagsfdgds' },
        { jqbh: 'sagsfdgds' },
        { jqbh: 'sagsfdgds' },
        { jqbh: 'sagsfdgds' },
        { jqbh: 'sagsfdgds' },
        { jqbh: 'sagsfdgds' },
        { jqbh: 'sagsfdgds' },
        { jqbh: 'sagsfdgds' },
        { jqbh: 'sagsfdgds' },
        { jqbh: 'sagsfdgds' },
      ],
      loading: false,
      row: {},
      dialogVisible: false,
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
    }
  },
  created: function() {
    // this.onloadtable();
  },
  methods: {
    addxlsubmit() { //添加区域
      this.row.qybh = true;
      this.row.qymc = true;
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      // this.onloadtable();
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      // this.onloadtable();
    },
    onloadtable() { //订单状态查询
      var queryDdxxData = {
        orderBy: 'jqbh',
        ddbh: "1",
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
      }
      request({ url: 'test', method: 'post', data: queryDdxxData }).then(response => {
          console.log(response.data);
          //     this.tableData = response.data.data;
          //     console.log(response.data);
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        })
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: '心元' }]);
      }
      // if (node.level > 10) return resolve([]);
      setTimeout(() => {
        const data = this.shtreeload();
        // console.log(data);
        resolve(data);
      }, 500);
    },
    shtreeload(fid) {
      // request({ url: 'test', method: 'post', data: {fid:fid} }).then(response => {
      // console.log(response.data);
      return [{ name: '禹州触手科技', leaf: true }, { name: '董果', leaf: true }, { name: '便捷神' }];
      // })
      // .catch(error => {
      //   Message.error("error：" + "请检查网络是否连接");
      // })
    },
  }
}

</script>
<style scoped>
div.dwsmain {
  /*position: relative;*/
  padding: 5px;
}

div.rightitem {
  /*float: right;*/
  /*padding-right: 100px;*/
}

.treetenant {
  width: 20%;
  position: relative;
  margin: 20px;
  border: 1px solid #ebeef5;
  min-height: 600px;
}

.stable {
  position: absolute;
  width: 65%;
  margin-left: 20%;
  top: 88px;
  padding: 20px;
}

</style>
