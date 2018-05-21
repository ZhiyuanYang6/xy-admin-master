<template>
  <div class="smain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="formInline.ne" clearable placeholder="请选择">
          <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="formInline.sn" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item>
        <el-button type="warning" @click="onloadtable1()">查询</el-button>
        <el-button type="warning" @click="dialogFormVisible = true">添加</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div class="stable">
      <!-- @sort-change="sortChange" -->
      <el-table :data="tableData" @sort-change="sortChange" v-loading="loading" style="width:100%" border>
        <el-table-column prop="id" label="id" align="center"> </el-table-column>
        <el-table-column prop="channel" label="支付编号" align="center"> </el-table-column>
        <el-table-column prop="sn" label="缩写编码" align="center"> </el-table-column>
        <el-table-column prop="channelName" label="支付渠道" align="center"> </el-table-column>
        <el-table-column prop="service" label="支付服务" align="center"> </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="mini" @click="updateform(scope.$index, scope.row)">修改</el-button> -->
            <el-button type="text" size="mini" @click="updateform(scope.$index, scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="添加" style="margin-left:170px" :visible.sync="dialogFormVisible">
        <el-form :model="form" style="margin-top:30px;">
          <el-form-item label="缩写编码" :label-width="formLabelWidth">
            <el-input v-model="form.sn" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="支付编号" :label-width="formLabelWidth">
            <el-input v-model="form.channel" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="支付渠道" :label-width="formLabelWidth">
            <el-input v-model="form.channelName" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="支付服务" :label-width="formLabelWidth">
            <el-input v-model="form.service" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addform()">添加</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改" style="margin-left:170px" :visible.sync="dialogFormVisibleupdate">
        <el-form :model="updateformis" style="margin-top:30px;">
          <el-form-item label="id" :label-width="formLabelWidth">
            <el-input v-model="updateformis.id" style="width: 240px;" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="缩写编码" :label-width="formLabelWidth">
            <el-input v-model="updateformis.sn" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="支付编号" :label-width="formLabelWidth">
            <el-input v-model="updateformis.channel" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="支付渠道" :label-width="formLabelWidth">
            <el-input v-model="updateformis.channelName" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="支付服务" :label-width="formLabelWidth">
            <el-input v-model="updateformis.service" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleupdate = false">取 消</el-button>
          <el-button type="primary" @click="xiugai()">修改</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 分页 -->
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
    </el-pagination>
  </div>
</template>
<script>
import axios from 'axios'
import { Message } from 'element-ui'
import request from '@/utils/request'
export default {
  name: 'index',
  data() {
    return {
      formInline: {
        sn: '',
        channel: '',
        channelName: '',
        sj: '',
        service: '',
        ne: ''
      },
      updateformis: {
        sn: '',
        channel: '',
        channelName: '',
        sj: '',
        service: '',
        ne: ''
      },
      listQuery: {
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 100
      },
      tableData: [{
        title: '以上架'
      }],
      dialogFormVisibleupdate: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      orderBy: '',
      loading: false,
      options: [{
        value: 'sn',
        label: '缩写编码'
      }, {
        value: 'channel',
        label: '支付编号'
      }, {
        value: 'channelName',
        label: '支付渠道'
      }, {
        value: 'service',
        label: '支付服务'
      }],
      value4: ''
    };
  },
  created: function() {
    this.onloadtable1();
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      this.onloadtable1();
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      this.onloadtable1();
    },
    sortChange(column) { //服务器端排序
      if (column.order === "ascending") {
        this.orderBy = column.prop + " asc";
      } else if (column.order === "descending") {
        this.orderBy = column.prop + " desc";
      }
      this.onloadtable1();
    },
    onloadtable1() { //查询
      var txmxcxData

      = {
        orderBy: this.orderBy,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        sn: this.formInline.sn,
        channel: this.formInline.channel,
        channelName: this.formInline.channelName,
        service: this.formInline.service,
        ne: this.formInline.ne
      };
      console.log(txmxcxData);
      // axios.post('http://127.0.0.1:8083/pay/api/config/jychannelselect', txmxcxData)
      request({ url: 'service-pay/pay/api/config/jychannelselect', method: 'post', data: txmxcxData })
        .then(response => {
          this.loading = false;
          this.tableData = response.list;
          this.listQuery.totalCount = response.total;
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        });
    },
    moneyData(money) { //不能用过滤器，很难受 金额
      return (money / 100).toFixed(2);
    },
    addform() { //添加
      var txmxcxData = {
        sn: this.form.sn,
        channel: this.form.channel,
        channelName: this.form.channelName,
        service: this.form.service,
      };
      this.dialogFormVisible = false;
      // axios.post('http://127.0.0.1:8083/pay/api/config/jychanneladd', txmxcxData)
      request({ url: 'service-pay/pay/api/config/jychanneladd', method: 'post', data: txmxcxData })
        .then(response => {
          if (response.result === 1) {
            this.onloadtable1();
            this.$message({
              message: '添加成功',
              type: 'success'
            });
          } else {
            alert("失败啦");
          }

        })
        .catch(error => {
          Message.error("添加失败：" + "请检查内容是否正确");
        });
    },
    updateform(index, rows) { //修改
      this.updateformis = rows;
      this.dialogFormVisibleupdate = true;

    },
    xiugai() { //修改
      var txmxcxData = {
        id: this.updateformis.id,
        sn: this.updateformis.sn,
        channel: this.updateformis.channel,
        channelName: this.updateformis.channelName,
        service: this.updateformis.service,
      };
      this.dialogFormVisibleupdate = false;
      //  axios.post('http://127.0.0.1:8083/pay/api/config/jychannelupdate', txmxcxData)
      request({ url: 'service-pay/pay/api/config/jychannelupdate', method: 'post', data: txmxcxData })
        .then(response => {
          if (response.result === 1) {
            this.onloadtable1();
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          } else {
            alert("失败啦");
          }

        })
        .catch(error => {
          Message.error("添加失败：" + "请检查内容是否正确");
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

.smainFright {
  position: absolute;
  right: 0;
}

div.el-dialog--center div.el-dialog__body {
  padding-top: 5px;
  padding-bottom: 5px;
}

</style>
