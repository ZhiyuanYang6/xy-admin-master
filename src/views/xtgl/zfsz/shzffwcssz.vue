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
        <el-table-column prop="id" label="ID" align="center"> </el-table-column>
        <el-table-column prop="name" label="支付服务商" align="center"> </el-table-column>
        <el-table-column prop="channelName" label="支付服务" align="center"> </el-table-column>
        <el-table-column prop="channelId" label="支付服务编号" align="center"> </el-table-column>
        <el-table-column prop="appid" label="APPID" align="center"> </el-table-column>
        <el-table-column prop="mchid" label="支付商户号" align="center"> </el-table-column>
        <el-table-column prop="mchkey" label="API密钥" align="center"> </el-table-column>
        <el-table-column prop="appsecret" label="应用密钥" align="center"> </el-table-column>
        <el-table-column prop="sslcertPath" label="私钥证书路径" align="center"> </el-table-column>
        <el-table-column prop="sslkeyPath" label="密钥路径" align="center"> </el-table-column>
        <el-table-column prop="notifyUrl" label="服务地址" align="center"> </el-table-column>
        <el-table-column prop="jsApiCallUrl" label="异步调用地址" align="center"> </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="mini" @click="updateform(scope.$index, scope.row)">修改</el-button> -->
            <el-button type="text" size="mini" @click="updateform(scope.$index, scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="添加" style="margin-left:170px" :visible.sync="dialogFormVisible">
        <el-form :model="form" style="margin-top:30px;">
          <el-form-item label="支付服务商" :label-width="formLabelWidth">
            <el-input v-model="form.name" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="APPID" :label-width="formLabelWidth">
            <el-input v-model="form.appid" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="支付商户号" :label-width="formLabelWidth">
            <el-input v-model="form.mchid" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="支付服务编号" :label-width="formLabelWidth">
            <el-input v-model="form.channelId" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="API密钥" :label-width="formLabelWidth">
            <el-input v-model="form.mchkey" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="应用密钥" :label-width="formLabelWidth">
            <el-input v-model="form.appsecret" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="私钥证书路径" :label-width="formLabelWidth">
            <el-input v-model="form.sslcertPath" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密钥路径" :label-width="formLabelWidth">
            <el-input v-model="form.sslkeyPath" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务地址" :label-width="formLabelWidth">
            <el-input v-model="form.notifyUrl" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="异步调用地址" :label-width="formLabelWidth">
            <el-input v-model="form.jsApiCallUrl" style="width: 240px;" auto-complete="off"></el-input>
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
          <el-form-item label="支付服务商" :label-width="formLabelWidth">
            <el-input v-model="updateformis.name" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="APPID" :label-width="formLabelWidth">
            <el-input v-model="updateformis.appid" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="支付商户号" :label-width="formLabelWidth">
            <el-input v-model="updateformis.mchid" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="支付服务编号" :label-width="formLabelWidth">
            <el-input v-model="updateformis.channelId" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="API密钥" :label-width="formLabelWidth">
            <el-input v-model="updateformis.mchkey" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="应用密钥" :label-width="formLabelWidth">
            <el-input v-model="updateformis.appsecret" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="私钥证书路径" :label-width="formLabelWidth">
            <el-input v-model="updateformis.sslcertPath" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密钥路径" :label-width="formLabelWidth">
            <el-input v-model="updateformis.sslkeyPath" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务地址" :label-width="formLabelWidth">
            <el-input v-model="updateformis.notifyUrl" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="异步调用地址" :label-width="formLabelWidth">
            <el-input v-model="updateformis.jsApiCallUrl" style="width: 240px;" auto-complete="off"></el-input>
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

export default {
  name: 'index',
  data() {
    return {
      formInline: {
        jsApiCallUrl: '',
        notifyUrl: '',
        sslkeyPath: '',
        sslcertPath: '',
        appsecret: '',
        mchkey: '',
        mchid: '',
        appid: '',
        channelId: '',
        name: '',
        sn: '',
        channelName: '',
        sj: '',
        ne: ''
      },
      updateformis: {
        jsApiCallUrl: '',
        notifyUrl: '',
        sslkeyPath: '',
        sslcertPath: '',
        appsecret: '',
        mchkey: '',
        mchid: '',
        appid: '',
        channelId: '',
        name: '',
        sn: '',
        channelName: '',
        sj: '',
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
        value: 'cl.sn',
        label: '支付服务编号'
      }, {
        value: 'ser.mchid',
        label: '支付商户号'
      }, {
        value: 'cl.channelName',
        label: '支付渠道'
      }, {
        value: 'ser.name',
        label: '支付服务商'
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
      if (column.order == "ascending") {
        this.orderBy = column.prop + " asc";
      } else if (column.order == "descending") {
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
        ne: this.formInline.ne
      };
      console.log(txmxcxData);
      axios.post('http://127.0.0.1:8083/pay/api/config/jyserverselect', txmxcxData)
        .then(response => {
          this.loading = false;
          for (var i = 0; i < response.data.list.length; i++) {
            response.data.list[i].je = this.moneyData(response.data.list[i].je);
          }
          this.tableData = response.data.list;
          this.listQuery.totalCount = response.data.total;
          console.log(response.data);
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
        jsApiCallUrl: this.form.jsApiCallUrl,
        notifyUrl: this.form.notifyUrl,
        sslkeyPath: this.form.sslkeyPath,
        sslcertPath: this.form.sslcertPath,
        appsecret: this.form.appsecret,
        mchkey: this.form.mchkey,
        mchid: this.form.mchid,
        appid: this.form.appid,
        name: this.form.name,
        channelId: this.form.channelId
      };
      this.dialogFormVisible = false;
      axios.post('http://127.0.0.1:8083/pay/api/config/jyserveradd', txmxcxData)
        .then(response => {
          if (response.data.result == 1) {
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
        jsApiCallUrl: this.updateformis.jsApiCallUrl,
        notifyUrl: this.updateformis.notifyUrl,
        sslkeyPath: this.updateformis.sslkeyPath,
        sslcertPath: this.updateformis.sslcertPath,
        appsecret: this.updateformis.appsecret,
        mchkey: this.updateformis.mchkey,
        mchid: this.updateformis.mchid,
        appid: this.updateformis.appid,
        name: this.updateformis.name,
        channelId: this.updateformis.channelId
      };
      this.dialogFormVisibleupdate = false;
      axios.post('http://127.0.0.1:8083/pay/api/config/jyserverupdate', txmxcxData)
        .then(response => {
          if (response.data.result == 1) {
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
