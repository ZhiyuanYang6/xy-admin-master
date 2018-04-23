<template>
  <div class="smain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="formInline.ne" clearable placeholder="请选择">
          <el-option v-for="item in options" :key="item.label" ref="item.label" :label="item.label" :value="item.value">
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
        <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
        <el-table-column prop="merchantCode" label="商户编号" align="center"> </el-table-column>
        <el-table-column prop="subMchName" label="商户名称" align="center"> </el-table-column>
        <el-table-column prop="name" label="支付服务商" align="center"> </el-table-column>
        <el-table-column prop="channelName" label="支付服务" align="center"> </el-table-column>
        <el-table-column prop="paytitle" label="机器编号" align="center"> </el-table-column>
        <el-table-column prop="merWxOpenid" label="收款帐号" align="center"> </el-table-column>
        <el-table-column prop="alpayName" label="其他参数" align="center"> </el-table-column>
        <el-table-column prop="wxpayName" label="说明" align="center"> </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="mini" @click="updateform(scope.$index, scope.row)">修改</el-button> -->
            <el-button type="text" size="mini" @click="updateform(scope.$index, scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="添加" style="margin-left:170px" :visible.sync="dialogFormVisible">
        <el-form :model="form" style="margin-top:30px;">
          <el-form-item label="商户编号" :label-width="formLabelWidth">
            <el-input v-model="form.merchantCode" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="商户名称" :label-width="formLabelWidth">
            <el-input v-model="form.subMchName" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="支付服务商" :label-width="formLabelWidth">
            <el-select v-model="form.serverId" clearable placeholder="请选择">
              <el-option v-for="item in jyserver" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付服务" :label-width="formLabelWidth">
            <el-select v-model="form.channelId" clearable placeholder="请选择">
              <el-option v-for="item in jychannel" :key="item.id" :label="item.channelName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机器编号" :label-width="formLabelWidth">
            <el-input v-model="form.paytitle" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="收款帐号" :label-width="formLabelWidth">
            <el-input v-model="form.merWxOpenid" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="其他参数" :label-width="formLabelWidth">
            <el-input v-model="form.alpayName" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="说明" :label-width="formLabelWidth">
            <el-input v-model="form.wxpayName" style="width: 240px;" auto-complete="off"></el-input>
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
          <el-form-item label="商户编号" :label-width="formLabelWidth">
            <el-input v-model="updateformis.merchantCode" style="width: 240px;" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="商户名称" :label-width="formLabelWidth">
            <el-input v-model="updateformis.subMchName" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="支付服务商" :label-width="formLabelWidth">
            <el-select v-model="updateformis.serverId" clearable placeholder="请选择">
              <!-- <el-option v-for="item in jyserver" ref="item.name" :label="item.name" :value="item.id"> -->
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付服务" :label-width="formLabelWidth">
            <el-input v-model="updateformis.channelId" style="width: 240px;" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="机器编号" :label-width="formLabelWidth">
            <el-input v-model="updateformis.paytitle" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="收款帐号" :label-width="formLabelWidth">
            <el-input v-model="updateformis.merWxOpenid" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="其他参数" :label-width="formLabelWidth">
            <el-input v-model="updateformis.alpayName" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="说明" :label-width="formLabelWidth">
            <el-input v-model="updateformis.wxpayName" style="width: 240px;" auto-complete="off"></el-input>
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
        merchantCode: '',
        subMchName: '',
        channelId: '',
        paytitle: '',
        merWxOpenid: '',
        alpayName: '',
        wxpayName: '',
        appid: '',
        sn: '',
        ne: ''
      },
      updateformis: {
        merchantCode: '',
        subMchName: '',
        channelId: '',
        paytitle: '',
        merWxOpenid: '',
        alpayName: '',
        wxpayName: '',
        appid: ''

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
        value: 'cl.merchantCode',
        label: '商户编号'
      }, {
        value: 'cl.paytitle',
        label: '机器编号'
      }],
      value4: '',
      jyserver: '',
      jychannel: '',
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
      var txmxcxData = {
        orderBy: this.orderBy,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        sn: this.formInline.sn,
        ne: this.formInline.ne
      };
      console.log(txmxcxData);
      axios.post('http://127.0.0.1:8083/pay/api/config/jyclientselect', txmxcxData)
        .then(response => {
          this.loading = false;
          for (var i = 0; i < response.data.list.length; i++) {
            response.data.list[i].je = this.moneyData(response.data.list[i].je);
          }
          // for (var i = 0; i < response.data.jyserver.length; i++) { // response.data.jyserver[i].je=t his.moneyData(response.data.jyserver[i].je); // }

          this.tableData = response.data.list;
          this.jyserver = response.data.jyserver;
          this.jychannel = response.data.jychannel;
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
        merchantCode: this.form.merchantCode,
        subMchName: this.form.subMchName,
        channelId: this.form.channelId,
        serverId: this.form.serverId,
        paytitle: this.form.paytitle,
        merWxOpenid: this.form.merWxOpenid,
        alpayName: this.form.alpayName,
        wxpayName: this.form.wxpayName,
        appid: this.form.appid
      };
      this.dialogFormVisible = false;
      axios.post('http://127.0.0.1:8083/pay/api/config/jyclientadd', txmxcxData)
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
        merchantCode: this.updateformis.merchantCode,
        subMchName: this.updateformis.subMchName,
        channelId: this.updateformis.channelId,
        serverId: this.updateformis.serverId,
        paytitle: this.updateformis.paytitle,
        merWxOpenid: this.updateformis.merWxOpenid,
        alpayName: this.updateformis.alpayName,
        wxpayName: this.updateformis.wxpayName,
        appid: this.updateformis.appid
      };
      this.dialogFormVisibleupdate = false;
      axios.post('http://127.0.0.1:8083/pay/api/config/jyclientupdate', txmxcxData)
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
