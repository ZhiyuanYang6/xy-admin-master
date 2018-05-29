<template>
  <div class="smain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.shmc" style="width: 200px;" placeholder="商户名称/编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.jqmc" style="width: 200px;" placeholder="机器名称/编号"></el-input>
      </el-form-item>
      <el-select v-model="formInline.jqlx" style="width: 200px;margin-right:20px;" placeholder="机器状态" clearable @change="onloadtable">
        <el-option v-for="item in lxoptions" :key="item.value" :label="item.valuename" :value="item.value">
        </el-option>
      </el-select>
      <!--  <el-form-item>
       <el-input v-model="formInline.dwmc" style="width: 120px;" placeholder="点位/区域/线路"></el-input>
     </el-form-item>
     <el-form-item>
       <el-input v-model="formInline.bs" style="width: 120px;" placeholder="标识"></el-input> -->
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item>
        <el-button type="primary" :loading="loading" style="padding:9px 35px;" @click="onloadtable">查询</el-button>
        <el-button type="success" :loading="loading" style="padding:9px 22px;" @click="ztdatacx(1)">在线数:<span>&nbsp;&nbsp;{{listztdata.zx}}&nbsp;</span></el-button>
        <el-button type="danger" :loading="loading" style="padding:9px 22px;" @click="ztdatacx(0)">离线数:<span>&nbsp;&nbsp;{{listztdata.lx}}&nbsp;</span></el-button>
        <el-button type="info" :loading="loading" @click="wjhdatacx(3)">未激活:<span>&nbsp;&nbsp;{{listztdata.wjh}}&nbsp;</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div class="stable">
      <el-table :data="tableData" @sort-change="sortChange" v-loading="loading" style="width:100%" border>
        <el-table-column prop="xh" type="index" label="序号" width="50" align="center"> </el-table-column>
        <el-table-column prop="shmc" width="120" show-overflow-tooltip label="商户名称" align="center"> </el-table-column>
        <el-table-column prop="shbh" label="商户编号" width="110" show-overflow-tooltip align="center"> </el-table-column>
        <el-table-column prop="jqbh" sortable='custom' width="110" show-overflow-tooltip label="机器编号" align="center"> </el-table-column>
        <el-table-column prop="jqmc" label="机器名称" width="110" show-overflow-tooltip align="center"> </el-table-column>
        <el-table-column prop="showjqlx" label="机器类型" align="center"> </el-table-column>
        <el-table-column prop="showwlzt" label="网络状态" align="center"> </el-table-column>
        <el-table-column prop="speed" label="当前网速" align="center"> </el-table-column>
        <el-table-column prop="speedState" label="网速状态" align="center"> </el-table-column>
        <el-table-column prop="showmzt" label="门状态" align="center"> </el-table-column>
        <el-table-column prop="wdxx" label="温度" width="50" align="center"> </el-table-column>
        <el-table-column prop="bzbye" label="纸币余额" width="100" align="center"> </el-table-column>
        <el-table-column prop="kzzb" label="可找纸币" align="center"> </el-table-column>
        <el-table-column prop="showzbqzt" label="纸币器状态" width="100" align="center"> </el-table-column>
        <el-table-column prop="bybye" label="硬币余额" align="center"> </el-table-column>
        <el-table-column prop="ybqzt" label="可找硬币" align="center"> </el-table-column>
        <el-table-column prop="showybqzt" label="硬币器状态" width="100"> </el-table-column>
        <el-table-column prop="bdflow" label="日流量" width="80" align="center"> </el-table-column>
        <el-table-column prop="bmflow" label="月流量" width="80" align="center"> </el-table-column>
        <el-table-column prop="zhgxsj" label="最后更新时间" width="110" show-overflow-tooltip align="center"> </el-table-column>
        <!-- <el-table-column prop="operation" label="操作" fixed="right"></el-table-column> -->
      </el-table>
      <!-- 分页 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message } from 'element-ui'
export default {
  name: 'ztcx',
  data() {
    return {
      formInline: {
        jqbh: '',
        jqmc: '',
        jqlx: '',
        shmc: '',
      },
      listQuery: {
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 100,
      },
      lxoptions: [],
      tableData: [],
      loading: false,
      orderBy: 'jqbh asc',
      listztdata: '',
    }
  },
  created: function() {
    this.onloadtable();
    this.dictSelect("1008", 'lxoptions');
    this.isData();
  },
  methods: {
    isData() { //获取状态数量
      var sumData = {
        dqzt: 3
      };
      request({ url: 'service-machine/Jqzt/queryMachineSum', method: 'post', data: sumData }).then(response => {
        this.listztdata = response;
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      })
    },
    ztdatacx(lx) { //在线状态查询
      var ztData = {
        orderBy: this.orderBy,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        lx: lx,
        dqzt: 3
      };
      this.loading = true;
      request({ url: 'service-machine/Jqzt/queryMachineOnline', method: 'post', data: ztData }).then(response => {
        this.loading = false;
        this.tableData = response.data;
        this.tableData.forEach(item => {
          item.showmzt = this.mztfun(item.mzt);
          item.showwlzt = this.wlztfun(item.wlzt);
          item.showzbqzt = this.zbqztfun(item.zbqzt);
          item.showybqzt = this.ybqztfun(item.ybqzt);
        });
        this.listQuery.totalCount = response.total;
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      })
    },
    wjhdatacx() { //未激活状态查询
      var wjhData = {
        orderBy: this.orderBy,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        dqzt: 4
      };
      this.loading = true;
      request({ url: 'service-machine/Jqzt/queryMachinesStatus', method: 'post', data: wjhData })
        .then(response => {
          this.loading = false;
          this.tableData = response.data;
          this.tableData.forEach(item => {
            item.showmzt = this.mztfun(item.mzt);
            item.showwlzt = this.wlztfun(item.wlzt);
            item.showzbqzt = this.zbqztfun(item.zbqzt);
            item.showybqzt = this.ybqztfun(item.ybqzt);
          });
          this.listQuery.totalCount = response.total;
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        })
    },
    sleSubmit() { //查询
      console.log("查询")
    },
    sortChange(column) { //服务器端排序
      if (column.order == "ascending") {
        this.orderBy = column.prop + " asc";
      } else if (column.order == "descending") {
        this.orderBy = column.prop + " desc";
      }
      this.onloadtable();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      this.onloadtable();
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      this.onloadtable();
    },
    onloadtable() { //机器状态查询
      var queryMachinesStatusData = {
        orderBy: this.orderBy,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        jqmc: this.formInline.jqmc,
        shmc: this.formInline.shmc,
        jqlx: this.formInline.jqlx,
      };
      this.loading = true;
      request({ url: 'service-machine/Jqzt/queryMachinesStatus', method: 'post', data: queryMachinesStatusData })
        .then(response => {
          this.loading = false;
          this.tableData = response.data;
          this.tableData.forEach(item => {
            item.showmzt = this.mztfun(item.mzt);
            item.showwlzt = this.wlztfun(item.wlzt);
            item.showzbqzt = this.zbqztfun(item.zbqzt);
            item.showybqzt = this.ybqztfun(item.ybqzt);
          });
          this.listQuery.totalCount = response.total;
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        })
    },
    mztfun(mzt) { //不能用过滤器，很难受 金额
      if (null == mzt) {
        return "";
      } else {
        if (mzt == 1) {
          return "开门";
        } else {
          return "关门";
        }
      }
    },
    wlztfun(wlzt) { //不能用过滤器，很难受 金额
      if (null == wlzt) {
        return "";
      } else {
        if (wlzt == 1) {
          return "在线";
        } else {
          return "离线";
        }
      }
    },
    ybqztfun(ybqzt) { //不能用过滤器，很难受 金额
      if (null == ybqzt) {
        return "";
      } else {
        if (ybqzt == 1) {
          return "异常";
        } else {
          return "正常";
        }
      }

    },
    zbqztfun(zbqzt) { //不能用过滤器，很难受 金额
      if (null == zbqzt) {
        return "";
      } else {
        if (zbqzt == 1) {
          return "异常";
        } else {
          return "正常";
        }
      }
    },
    dictSelect(type, valuename) {
      var queryType = { type: type };
      request({ url: 'service-machine/shjgl/queryDict', method: 'post', data: queryType }).then(response => {
        if (valuename === 'lxoptions') { this.lxoptions = response; }
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },
  }
}

</script>
<style>
/*scoped*/

.smain {
  padding: 10px;
}

.successtxt {
  color: #67C23A;
}

.Warningtxt {
  color: #E6A23C
}

</style>
