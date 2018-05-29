<template>
  <div class="smain">
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.mbmc" style="width: 240px;" placeholder="模板名称"></el-input>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item>
        <el-button type="warning" @click="onloadtable()">查询</el-button>
        <router-link :to="{ path:'shjMbadd'}">
          <!-- <el-button type="success" icon="el-icon-edit-outline">新增用户</el-button> -->
          <el-button type="warning" icon="el-icon-edit-outline" style="padding:9px 25px;">新增模板</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <div class="stable">
      <el-table :data="tableData1" v-loading="loading" @sort-change="sortChange" style="width:100%" border>
        <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
        <el-table-column prop="mbmc" sortable='custom' label="模板名称" align="center"> </el-table-column>
        <el-table-column prop="cjsj" label="创建时间" align="center"> </el-table-column>
        <el-table-column prop="remark" label="备注" align="center"> </el-table-column>
        <el-table-column prop="cz" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="mbDelete(scope.row)">删除</el-button>
            <el-button type="text" size="mini" @click="szmb(scope.row)">修改</el-button>
            <el-button type="text" size="mini" @click="mbzpjqShow(scope.$index, scope.row)">指派机器</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
      </el-pagination>
    </div>
    <!-- el-dialog -->
    <el-dialog title="机器模板设置" :visible.sync="dialogTableVisible" width="90%">
      <shj-mbsz :mbxx="mbxx" :mbszdialogVisible="dialogTableVisible"></shj-mbsz>
    </el-dialog>
    <!-- 模板指派机器 -->
    <el-dialog title="指派机器" append-to-body :visible.sync="dialogVisible" width="50%">
      <div class="smain">
        <el-form :inline="true" :model="forjqcc" size="small" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="forjqcc.jqxx" style="width: 150px;" placeholder="机器名称/编号"></el-input>
          </el-form-item>
          <el-select v-model="forjqcc.jqlb" style="width: 150px;" placeholder="机器类别" clearable>
            <el-option v-for="item in jqlboptions" :key="item.value" :label="item.valuename" :value="item.value">
            </el-option>
          </el-select>
          <el-button type="warning" @click="jqxxQuery()">查询</el-button>
        </el-form>
        <el-table :data="jqData" highlight-current-row @selection-change="jqhandleSelectionChange" style="width: 100%; cursor: pointer;" border>
          <el-table-column type="selection" align="center"> </el-table-column>
          <el-table-column prop="jqbh" label="机器编号" align="center"> </el-table-column>
          <el-table-column prop="jqmc" label="机器名称" align="center"> </el-table-column>
          <el-table-column prop="showjqlb" label="机器类别" align="center"> </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination background @size-change="jqhandleSizeChange" @current-change="jqhandleCurrentChange" :current-page="listjqQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listjqQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listjqQuery.totalCount">
        </el-pagination>
        <div class="mbbtn">
          <el-button type="primary" @click="mbzpjq">指派</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message, MessageBox } from 'element-ui'
import shjMbsz from './components/shjMbsz'

export default {
  name: 'mbgl',
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
      tableData1: [],
      loading: true,
      dialogTableVisible: false,
      jqData: [],
      listjqQuery: { //模板分页
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 50,
      },
      forjqcc: { // 机器信息查询表单
        jqxx: '',
      },
      dialogVisible: false, //指派机器窗口
      jqrows: [],
      zpmbid: '',
      mbxx: {},
      jqlboptions: [],
    }
  },
  activated() {
    if (this.listQuery.totalCount !== 100) this.onloadtable();
  },
  created: function() {
    this.onloadtable();
  },
  watch: {
    dialogTableVisible: function(newQuestion, oldQuestion) {
      if (!newQuestion) {
        this.onloadtable(); //每次关闭设置界面 刷新table
      }
    }
  },
  methods: {
    szmb(row) { //设置模板界面
      this.$router.push({ path: 'shjMbset', query: { mbid: row.mbid } });
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      this.onloadtable();
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      this.onloadtable();
    },
    jqhandleSizeChange(val) {
      this.listjqQuery.pageSize = val; //修改每页数据量
      this.jqxxQuery();
    },
    jqhandleCurrentChange(val) { //跳转第几页
      this.listjqQuery.pageNum = val;
      this.jqxxQuery();
    },
    sortChange(column) { //服务器端排序
      if (column.order == "ascending") {
        this.orderBy = column.prop + " asc";
      } else if (column.order == "descending") {
        this.orderBy = column.prop + " desc";
      }
      this.onloadtable();
    },
    jqhandleSelectionChange(val) {
      this.jqrows = val;
    },
    onloadtable() { //模板查询
      var queryData = {
        orderBy: this.orderBy,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        mbmc: this.formInline.mbmc,
      };
      this.loading = false;
      //console.log(queryShjData);
      request({ url: 'service-machine/mbgl/mbglQuery', method: 'post', data: queryData }).then(response => {
          this.loading = false;
          this.tableData1 = response.data;
          this.listQuery.totalCount = response.total;
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        });
    },
    mbDelete(row) {
      this.$confirm('确认删除模板?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var mbDeleteData = {
          mbid: row.mbid,
        };
        request({
            url: 'service-machine/mbgl/tymbDelete',
            method: 'post',
            data: mbDeleteData
          }).then(response => {
            if (response.msg) {
              this.$message({ type: 'success', message: response.msg });
              this.onloadtable();
            }
          })
          .catch(error => {
            Message.error("error：" + "请检查网络是否连接");
          });
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' });
      });
    },
    mbzpjqShow(index, row) {
      this.zpmbid = row.mbid;
      this.forjqcc.jqxx = '';
      this.jqlboptions = [];
      this.dialogVisible = true;
      this.dictSelect();
      this.jqxxQuery();
    },
    jqxxQuery() {
      var queryjqxx = {
        pageNum: this.listjqQuery.pageNum,
        pageSize: this.listjqQuery.pageSize,
        jqxx: this.forjqcc.jqxx,
        jqlb: this.forjqcc.jqlb,
      }
      request({ url: 'service-machine/mbgl/jqxxQueryByJqSh', method: 'post', data: queryjqxx }).then(response => {
        this.jqData = response.data;
        this.listjqQuery.totalCount = response.total;
        this.loading = false;
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },
    mbzpjq() {
      if (this.jqrows.length > 0) {
        let jqbhs = [];
        for (var index in this.jqrows) {　　
          jqbhs.push(this.jqrows[index].jqbh);
        }
        var zpjqdata = {
          mbid: this.zpmbid,
          jqbhs: jqbhs,
        }
        request({ url: 'service-machine/mbgl/mbzpjq', method: 'post', data: zpjqdata }).then(response => {
          //成功时 消息不为空
          if (response.msg) {
            this.$message({ type: 'success', message: response.msg });
            this.dialogVisible = false;
          }
          this.loading = false;
        }).catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        });
      } else {
        this.$message({ message: '请选择需要指派的机器', type: 'warning' });
      }
    },
    dictSelect() {
      request({ url: 'service-machine/xyplat/dict/getDict?dictName=1000', method: 'post'}).then(response => {
        for (let item in response) {
          this.jqlboptions.push({
            value: item,
            valuename: response[item],
          });
        }
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
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
