<template>
  <div class="smain">
    <!-- 警告类别 -->
    <div class="jqbjtitle" v-for="lxitem in jqbjdata">
      <span class="lxbtn">{{lxitem.yclx}}</span>
      <div class="jbmcbtn">
        <el-button v-for="item in lxitem.children" :key="item.ycid" size="small" type="text" @click="lookerror(item.ycid)">{{item.ycmc}}({{item.ycsl}})</el-button>
      </div>
    </div>
    <div class="maclx"></div>
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <!-- <el-form-item>
        <el-select v-model="formInline.zt" placeholder="请选择" clearable>
          <el-option v-for="item in option.zt" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-select v-model="formInline.jqlx" placeholder="请选择" clearable>
          <el-option v-for="item in option.lx" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item>
        <el-input v-model="formInline.tdtjq" placeholder="特定条件区"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-input v-model="formInline.jqmc" placeholder="机器名称/商户名称/位置/商户编号"></el-input>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item>
        <el-button type="warning" @click="onloadtable">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="maclx"></div>
    <!-- 表格 -->
    <div class="stable">
      <el-table :data="tableData1" style="width:100%" v-loading="loading" border>
        <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
        <el-table-column :prop="item.value" :label="item.label" :key="item.value" align="center" v-for="item in tableHead"> </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import request from '@/utils/request'

var type = 300110;

export default {
  name: 'jqbj',
  data() {
    return {
      listQuery: {
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 100,
      },
      formInline: { //查询表单
        zt: '',
        jqlx: '0',
        tdtjq: '',
        jqmc: '',
      },
      tableData1: [], //表格内容
      tableHead: '', //表格头部
      option: {
        //zt: [{ label: '全部', value: '0' }],
        lx: [{ label: '全部', value: '0' }, { label: '安卓机', value: '1' }, { label: '单片机', value: '2' }],
      },
      loading: false,
    }
  },
  /*       */
  created: function() {
    this.onloadtable();
    this.sleAlertType();
  },
  computed: {
    jqbjdata() {
      return this.$store.state.plug.jqbjtreedata;
    }
  },
  methods: {
    sleSubmit() { //查询
      console.log("查询")
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      this.onloadtable();
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      this.onloadtable();
    },
    onloadtable() { //报警查询
      var param = {
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        type: type,
        machineType: this.formInline.jqlx,
        keyWord: this.formInline.jqmc,
      };
      request({ url: '/service-machine/jqbj/queryMachineAlert', method: 'post', data: param }).then(response => {
        //request({ url: '/jqbj/queryMachineAlert', method: 'post', data: param }).then(response => {
        this.loading = false;
        this.tableHead = response.data.row;
        this.tableData1 = response.data.data;
        this.listQuery
          .totalCount = response.total;
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      })
    },
    sleAlertType() { //查询所有异常类型
      var param = {};
      request({ url: '/service-machine/jqbj/queryMachineAlertType', method: 'post', data: param }).then(response => {
        //request({ url: '/jqbj/queryMachineAlertType', method: 'post', data: param }).then(response => {
        this.$store.dispatch('getTrees', response.data);
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      })
    },
    lookerror(id) { //查询固定错误表单
      type = id;
      this.formInline.jqlx = '0';
      this.formInline.jqmc = ''
      this.onloadtable();
    },
  }
}

</script>
<style scoped>
/*scoped*/

.smain {
  padding: 10px;
}

.smainFright {
  position: absolute;
  right: 0;
}

.maclx {
  width: 100%;
  padding: 5px;
  /*margin-top: 40px;*/
  margin-bottom: 0px;
  border-top: 1px solid #dcdfe6;
}

.jqbjtitle {
  height: 30px;
  font-size: 16px;
}

.lxbtn {
  width: 120px;
  text-align: center;
  display: block;
}

div.jbmcbtn .el-button--small {
  font-size: 14px;
  margin-left: 20px;
}

div.el-form-item {
  margin-bottom: 10px;
}

.jbmcbtn {
  position: relative;
  top: -27px;
  left: 110px;
}

div.el-select {
  width: 200px;
}

div.el-input {
  width: 200px;
}

</style>
