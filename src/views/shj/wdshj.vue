<template>
  <div class="smain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.jqbh" style="width: 150px;" placeholder="机器名称/编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.jqlb" style="width: 150px;" placeholder="机器类型" clearable>
          <el-option v-for="item in lboption" :key="item.value" :label="item.valuename" :value="item.value">
          </el-option>
        </el-select>
        <!--         <el-input v-model="formInline.lb" style="width: 120px;" placeholder="机器类型"></el-input>
       --></el-form-item>
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
        <el-button type="warning" :loading="loading" @click="onloadtable()">查询</el-button>
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
        <el-dropdown trigger="click" :hide-on-click="false">
          <el-button type="primary">
            视图<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" class="viedrop">
            <el-dropdown-item>
              <el-checkbox-group v-model="checkedCities1" @change="vieshow">
                <!-- <el-checkbox v-for='vitem in viewstable' :key="index" :label="vitem" :key="vitem">{{vitem}}</el-checkbox> -->
                <el-checkbox border v-for="vitem in viewstable" :label="vitem" :key="vitem.label" style="float: left;margin:5px 10px; min-width: 100px">{{vitem.label}}</el-checkbox>
              </el-checkbox-group>
              <!-- <el-button type="text" style="width:100%;" @click="dialogtable()">{{vitem}}</el-button> -->
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      <el-form-item>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div class="stable">
      <!-- @sort-change="sortChange" -->
      <el-table :data="tableData" @sort-change="sortChange" v-loading="loading" style="width:100%" border header-cell-class-name="shjHeader">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="shmc" width="120" sortable='custom' v-if="viewstable[0].value" label="商户名称" show-overflow-tooltip align="center"> </el-table-column>
        <el-table-column prop="shbh" v-if="viewstable[1].value" show-overflow-tooltip label="商户编号" align="center"> </el-table-column>
        <el-table-column label="机器编号" v-if="viewstable[2].value" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="dialogshow('jqxq',scope.row)">{{scope.row.jqbh}}</el-button>
          </template>
        </el-table-column>
        <el-table-column v-if="viewstable[3].value" prop="jqmc" label="机器名称" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="dialogshow('jqxq',scope.row)">{{scope.row.jqmc}}</el-button>
          </template>
        </el-table-column>
        <el-table-column v-if="viewstable[4].value" prop="jqlb" label="机器类型" align="center"> </el-table-column>
        <el-table-column prop="jgsl" label="机柜数" align="center" v-if="viewstable[5].value">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="dialogshow('hdxq',scope.row)">{{scope.row.jgsl}}</el-button>
          </template>
        </el-table-column>
        <el-table-column v-if="viewstable[6].value" prop="hdsl" label="货道数" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="dialogshow('hdxq',scope.row)">{{scope.row.hdsl}}</el-button>
          </template>
        </el-table-column>
        <el-table-column v-if="viewstable[7].value" prop="swrjbb" label="上位机软件版本" width="120" align="center"> </el-table-column>
        <el-table-column v-if="viewstable[8].value" prop="xwrjbb" label="下位机软件版本" width="120" align="center"> </el-table-column>
        <el-table-column v-if="viewstable[9].value" prop="swyjbb" label="上位机硬件版本" width="120" align="center"> </el-table-column>
        <el-table-column v-if="viewstable[10].value" prop="xwyjbb" label="下位机硬件版本" width="120" align="center"> </el-table-column>
        <el-table-column v-if="viewstable[11].value" prop="fx" label="分享" align="center"> </el-table-column>
        <el-table-column v-if="viewstable[12].value" prop="dwmc" label="点位" align="center"> </el-table-column>
        <el-table-column v-if="viewstable[13].value" prop="qymc" label="区域" align="center"> </el-table-column>
        <el-table-column v-if="viewstable[14].value" prop="xlmc" show-overflow-tooltip label="线路" align="center"> </el-table-column>
        <el-table-column v-if="viewstable[15].value" prop="szgj" label="国家" align="center"> </el-table-column>
        <el-table-column v-if="viewstable[16].value" prop="szsq" label="时区" align="center"> </el-table-column>
        <el-table-column v-if="viewstable[17].value" prop="scrq" show-overflow-tooltip label="生产日期" align="center"> </el-table-column>
        <el-table-column v-if="viewstable[18].value" prop="ccrq" show-overflow-tooltip label="出厂日期" align="center"> </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="110">
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
                  <el-button type="text" @click="dialogshow('wdsz',scope.row)">温度设置</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" @click="dialogshow('qchd',scope.row)">清除货道</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" @click="dialogshow('hdcsh')">货道初始化</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" @click="dialogshow('llbjsz',scope.row)">流量报警设置</el-button>
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
      <wdyj :listrow="listrow" :dialogwdyj="dialogwdsz"></wdyj>
    </el-dialog>
    <!--  清除货道 -->
    <el-dialog title="清除货道" :visible.sync="dialogqchd" width="40%">
      <qchd :listrow="listrow" :dialogqchd="dialogqchd"></qchd>
    </el-dialog>
    <!--  货道初始化  -->
    <el-dialog title="货道初始化" :visible.sync="dialoghdcsh" width="40%">
      <hdcsh></hdcsh>
    </el-dialog>
    <!-- 流量报警设置  -->
    <el-dialog title="流量报警设置" :visible.sync="dialogllbjsz" width="40%">
      <llbjsz :listrow="listrow" :dialogllbjsz="dialogllbjsz"></llbjsz>
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
import { Message } from 'element-ui'
import request from '@/utils/request'
import spsz from './wdshj/spsz'
import bjsz from './wdshj/bjsz'
import wdyj from './components/wdyj'
import qchd from './wdshj/qchd'
import hdcsh from './wdshj/hdcsh'
import llbjsz from './components/llyj'
import hdxq from './wdshj/hdxq'
import jqxq from './wdshj/jqxq'
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  name: 'wdshj',
  components: { spsz, bjsz, wdyj, qchd, hdcsh, llbjsz, hdxq, jqxq },
  data() {
    return {
      cities: cityOptions,
      viewstable: [
        { value: true, label: '商户名称' },
        { value: true, label: '商户编号' },
        { value: true, label: '机器编号' },
        { value: true, label: '机器名称' },
        { value: true, label: '机器类型' },
        { value: true, label: '机柜数' },
        { value: true, label: '货道数' },
        { value: true, label: '上位机软件版本' },
        { value: true, label: '下位机软件版本' },
        { value: true, label: '上位机硬件版本' },
        { value: true, label: '下位机硬件版本' },
        { value: true, label: '分享' },
        { value: true, label: '点位' },
        { value: true, label: '区域' },
        { value: true, label: '线路' },
        { value: true, label: '国家' },
        { value: true, label: '时区' },
        { value: true, label: '生产日期' },
        { value: true, label: '出厂日期' },
      ],
      checkedCities1: [], //默认展示的列
      formInline: {
        xl: '',
        jqbh: '',
        shbh: '',
        lx: '',
      },
      // custom: '',
      lboption: [],
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
      tableData: [],
      orderBy: '',
      loading: false,
      data2: {}
    };
  },
  created: function() {
    this.checkedCities1 = this.viewstable; //配置默认展现的table列
    this.onloadtable();
    this.dictSelect('1000', 'lboption');
  },
  methods: {
    vieshow(val) {
      this.viewstable.forEach(item => {
        item.value = false;
      });
      this.viewstable.forEach(item => {
        val.forEach(row => {
          if (row.label === item.label) {
            item.value = true;
          }
        });
      });
      // console.log(val);
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
        this.orderBy1 = column.prop + " asc";
      } else if (column.order == "descending") {
        this.orderBy1 = column.prop + " desc";
      }
      this.onloadtable();
      this.dictSelect('1000', 'lboption');
    },
    onloadtable() { //售货机查询
      var queryShjData = {
        orderBy: this.orderBy1,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        xlmc: this.formInline.xl,
        jqbh: this.formInline.jqbh,
        shbh: this.formInline.shbh,
        jqlb: this.formInline.jqlb
      };
      this.loading = true;
      request({ url: 'service-machine/shjgl/queryShj', method: 'post', data: queryShjData })
        .then(response => {
          // alert(response.data.total)
          this.loading = false;
          this.tableData = response.list;
          this.listQuery.totalCount = response.total;
        }).catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        })
    },
    dictSelect(type, valuename) {
      var queryType = { type: type };
      request({ url: 'service-machine/shjgl/queryDict', method: 'post', data: queryType }).then(response => {
        if (valuename == 'lboption') { this.lboption = response; }
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },
    dialogshow(type, row) {
      this.listrow = row;
      if (type == "hdxq") {
        this.dialoghdxq = true;
      } else if (type == "jqxq") {
        this.dialogjqxq = true;
      } else if (type == "llbjsz") {
        this.dialogllbjsz = true;
      } else if (row.jgsl == null) {
        Message.error("error：" + "机柜数为空,不能进行该操作!");
        return;
      } else if (type == "spsz") {
        this.dialogspsz = true;
      } else if (type == "bjsz") {
        this.dialogbjsz = true;
      } else if (type == "wdsz") {
        this.dialogwdsz = true;
      } else if (type == "qchd") {
        this.dialogqchd = true;
      } else if (type == "hdcsh") {
        this.dialoghdcsh = true;
      }
    },
    celsty({ row, column, rowIndex, columnIndex }) {
      console.log(row, column, rowIndex, columnIndex);
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


.shjHeader {
  /*white-space: nowrap;*/
  /*background: #f0f9eb;*/
  width: 50px;
  /*width: 130px;*/
  /*overflow: hidden;*/
  /*text-overflow: ellipsis;*/
}

.viedrop {
  width: 280px;
}

</style>
