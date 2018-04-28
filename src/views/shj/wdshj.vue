<template>
  <div class="smain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.jqbh" style="width: 150px;" placeholder="机器名称/编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.lb" style="width: 120px;" placeholder="机器类型"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.shbh" style="width: 120px;" placeholder="商户名称/编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.xl" style="width: 120px;" placeholder="点位/区域/线路"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.bs" style="width: 120px;" placeholder="标识"></el-input>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item>
        <el-button type="warning" @click="onloadtable()">查询</el-button>
      </el-form-item>
      <el-form-item class="smainFright">
        <el-button type="success" @click="dialogtable()">>Excel</el-button>
        <el-button type="success" @click="dialogtable()">监控</el-button>
        <el-dropdown trigger="click">
          <el-button type="primary">
            授权<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button type="text" style="width:100%;" @click="dialogtable()">商户授权</el-button>
            </el-dropdown-item>
            <el-dropdown-item style="border-top: 1px solid #ebeef5;">
              <el-button type="text" style="width:100%;" @click="dialogtable()">运营人员授权</el-button>
            </el-dropdown-item>
            <el-dropdown-item style="border-top: 1px solid #ebeef5;">
              <el-button type="text" style="width:100%;" @click="dialogtable()">分享</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div class="stable">
      <!-- @sort-change="sortChange" -->
      <el-table :data="tableData" @sort-change="sortChange" v-loading="loading" style="width:100%" border>
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="shmc" sortable='custom' width="110" label="商户名称" align="center"> </el-table-column>
        <el-table-column prop="shbh" label="商户编号" align="center"> </el-table-column>
        <el-table-column label="机器编号" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="dialogshow('jqxq',scope.row)">{{scope.row.jqbh}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="jqmc" label="机器名称" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="dialogshow('jqxq',scope.row)">{{scope.row.jqmc}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="jqlb" label="机器类型" align="center"> </el-table-column>
        <el-table-column prop="jgsl" label="机柜数" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="dialogshow('hdxq',scope.row)">{{scope.row.jgsl}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="hdsl" label="货道数" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="dialogshow('hdxq',scope.row)">{{scope.row.hdsl}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="50" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="yyry" label="运营人员" align="center"> </el-table-column>
        <el-table-column prop="swrjbb" label="上位机软件版本" align="center"> </el-table-column>
        <el-table-column prop="xwrjbb" label="下位机软件版本" align="center"> </el-table-column>
        <el-table-column prop="swyjbb" label="上位机硬件版本" align="center"> </el-table-column>
        <el-table-column prop="xwyjbb" label="下位机硬件版本" align="center"> </el-table-column>
        <el-table-column prop="fx" label="分享" width="50" align="center"> </el-table-column>
        <el-table-column prop="dwmc" label="点位" width="65" align="center"> </el-table-column>
        <el-table-column prop="qymc" label="区域" width="50" align="center"> </el-table-column>
        <el-table-column prop="xlmc" label="线路" width="50" align="center"> </el-table-column>
        <el-table-column prop="szgj" label="国家" width="50" align="center"> </el-table-column>
        <el-table-column prop="szsq" label="时区" width="65" align="center"> </el-table-column>
        <el-table-column prop="scrq" label="生产日期" align="center"> </el-table-column>
        <el-table-column prop="ccrq" label="出厂日期" align="center"> </el-table-column>
        <el-table-column label="操作" fixed="right" width="110" align="center">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <el-button type="primary" size="mini">
                管理<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button type="text" @click="dialogshow('spsz',scope.row)">商品设置</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" @click="dialogshow('bjsz',scope.row)">报警设置</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" @click="dialogshow('wdsz')">温度设置</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" @click="dialogshow('qchd')">清除货道</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" @click="dialogshow('hdcsh')">货道初始化</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" @click="dialogshow('llbjsz')">流量报警设置</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
    </el-pagination>
    <!--  商品设置 -->
    <el-dialog title="商品设置" :visible.sync="dialogspsz" width="80%">
      <spsz :dialogVisible="dialogspsz" :listrow="listrow"></spsz>
    </el-dialog>
    <!--  报警设置 -->
    <el-dialog title="货道报警设置" :visible.sync="dialogbjsz" width="80%">
      <bjsz :dialogVisible="dialogbjsz" :listrow="listrow"></bjsz>
    </el-dialog>
    <!--  温度设置 -->
    <el-dialog title="温度设置" :visible.sync="dialogwdsz" width="40%">
      <wdyj></wdyj>
    </el-dialog>
    <!--  清除货道 -->
    <el-dialog title="清除货道" :visible.sync="dialogqchd" width="40%">
      <qchd></qchd>
    </el-dialog>
    <!--  货道初始化  -->
    <el-dialog title="货道初始化" :visible.sync="dialoghdcsh" width="40%">
      <hdcsh></hdcsh>
    </el-dialog>
    <!-- 流量报警设置  -->
    <el-dialog title="流量报警设置" :visible.sync="dialogllbjsz" width="40%">
      <llbjsz :dialogVisible="dialogllbjsz"></llbjsz>
    </el-dialog>
    <!-- 货道详情  -->
    <el-dialog title="货道详情" :visible.sync="dialoghdxq" width="60%">
      <hdxq :listrow="listrow" :dialogVisible="dialoghdxq"></hdxq>
    </el-dialog>
    <!-- 机器详情  -->
    <el-dialog title="机器详情" :visible.sync="dialogjqxq" width="73%">
      <jqxq :dialogVisible="dialogjqxq" :listrow="listrow"></jqxq>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import { Message } from 'element-ui'
import request from '@/utils/request'
import spsz from './wdshj/spsz'
import bjsz from './wdshj/bjsz'
import wdyj from './wdshj/wdyj'
import qchd from './wdshj/qchd'
import hdcsh from './wdshj/hdcsh'
import llbjsz from './wdshj/llbjsz'
import hdxq from './wdshj/hdxq'
import jqxq from './wdshj/jqxq'

export default {
  name: 'wdshj',
  components: { spsz, bjsz, wdyj, qchd, hdcsh, llbjsz, hdxq, jqxq },
  data() {
    return {
      formInline: {
        xl: '',
        jqbh: '',
        shbh: '',
        lx: '',
      },
      listrow: "",
      dialogspsz: false, //商品设置
      dialogbjsz: false, //报警设置
      dialogwdsz: false, //温度设置
      dialogqchd: false, //清除货道
      dialoghdcsh: false, //货道初始化
      dialogllbjsz: false, //流量报警设置
      dialoghdxq: false, //货道详情
      dialogjqxq: false, //机器详情
      listQuery: {
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 100,
      },
      tableData: [
        // { xh: '00001', shbh: '160560001', shmc: '涉外北门', jqbh: '0001', jqmc: "涉外北门", jgsl: '12', hdsl: '42' }
      ],
      orderBy: '',
      loading: false,
      data2: {}
    }

  },
  created: function() {
    this.onloadtable();
  },
  methods: {
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
        this.orderBy1 = column.prop + " asc";
      } else if (column.order == "descending") {
        this.orderBy1 = column.prop + " desc";
      }
      this.onloadtable();
    },
    onloadtable() { //售货机查询
      var queryShjData = {
        orderBy: this.orderBy1,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        xlmc: this.formInline.xl,
        jqbh: this.formInline.jqbh,
        shbh: this.formInline.shbh,
        jqlb: this.formInline.lb
      }
      request({ url: '/shjgl/queryShj', method: 'post', data: queryShjData })
        .then(response => {
          // alert(response.data.total)
          this.loading = false;
          this.tableData = response.list;
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        })
    },
    dialogshow(type, row) {
      if (type == "spsz") {
        this.dialogspsz = true;
        this.listrow = row;
      } else if (type == "bjsz") {
        this.dialogbjsz = true;
        this.listrow = row;
      } else if (type == "wdsz") {
        this.dialogwdsz = true;
      } else if (type == "qchd") {
        this.dialogqchd = true;
      } else if (type == "hdcsh") {
        this.dialoghdcsh = true;
      } else if (type == "hdxq") {
        this.listrow = row;
        this.dialoghdxq = true;
        // console.log(row, "货道详情");
        // debugger;
      } else if (type == "jqxq") {
        this.listrow = row;
        this.dialogjqxq = true;
        // console.log(row, "机器详情");
        // debugger;
      } else {
        this.dialogllbjsz = true;
      }
    },
  }
}

</script>
<style scoped>
.smain {
  padding: 10px;
}

.smainFright {
  position: absolute;
  right: 0;
}

div.el-dialog--center div.el-dialog__body {
  padding-top: 5px;
  padding-bottom: 5px;
}

</style>
