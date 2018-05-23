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
      <el-select v-model="formInline.lock" @change="onloadtable1">
        <el-option v-for="item in lock" :key="item.label" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form>
    <!-- 表格 -->
    <div class="stable">
      <!-- @sort-change="sortChange" -->
      <el-table :data="tableData" @sort-change="sortChange" v-loading="loading" style="width:100%" border>
        <el-table-column prop="id" label="ID" align="center"> </el-table-column>
        <el-table-column prop="merchantCode" label="商户编号" align="center"> </el-table-column>
        <el-table-column prop="subMchName" label="商户名称" align="center"> </el-table-column>
        <el-table-column prop="name" label="支付服务商" align="center"> </el-table-column>
        <el-table-column prop="channelName" label="支付服务" align="center"> </el-table-column>
        <el-table-column prop="subMchId" label="机器编号" align="center"> </el-table-column>
        <el-table-column prop="merWxOpenid" label="收款帐号" align="center"> </el-table-column>
        <el-table-column prop="alpayName" label="其他参数" align="center"> </el-table-column>
        <el-table-column prop="wxpayName" label="账户姓名" align="center"> </el-table-column>
        <el-table-column label="是否激活" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.lock!=1" type="text" size="mini" @click="kg(scope.$index, scope.row)">
              <span v-show="scope.row.lock==0">预备中</span>
              <span v-show="scope.row.lock==2">已停用</span>，去激活
            </el-button>
            <!-- <el-switch v-if="scope.row.lock==0 || scope.row.lock==2" @change="kg(scope.$index, scope.row)" v-model="scope.row.lock" active-color="#13ce66" inactive-color="#ff4949"> -->
            </el-switch>
            <span v-else style="color:#39d838">  
            <!-- {{scope.row.lock?' √ 已激活':''}} -->
   √ 已激活
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.lock==0" type="text" size="mini" @click="updateform(scope.$index, scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="添加" style="margin-left:170px" :visible.sync="dialogFormVisible">
        <el-form :model="form" style="margin-top:30px;">
          <el-form-item label="支付服务" :label-width="formLabelWidth">
            <el-select v-model="form.channelId" @change="fws" clearable placeholder="请选择">
              <el-option v-for="item in jychannel" :key="item.id" :label="item.channelName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
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
          <el-form-item label="机器编号" :label-width="formLabelWidth">
            <el-input v-model="form.subMchId" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="支付标题" :label-width="formLabelWidth">
            <el-input v-model="form.paytitle" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="收款帐号" :label-width="formLabelWidth">
            <el-input v-model="form.merWxOpenid" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="其他参数" :label-width="formLabelWidth">
            <el-input v-model="form.alpayName" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="账户姓名" :label-width="formLabelWidth">
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
          <el-form-item label="商户名称" :label-width="formLabelWidth">
            <el-input v-model="updateformis.subMchName" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="支付服务商" :label-width="formLabelWidth">
            <el-select v-model="updateformis.serverId" clearable placeholder="请选择">
              <el-option v-for="item in jyserver" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机器编号" :label-width="formLabelWidth">
            <el-input v-model="updateformis.subMchId" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="支付标题" :label-width="formLabelWidth">
            <el-input v-model="updateformis.paytitle" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="账户姓名" :label-width="formLabelWidth">
            <el-input v-model="updateformis.wxpayName" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="其他参数" :label-width="formLabelWidth">
            <el-input v-model="updateformis.alpayName" style="width: 240px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="收款帐号" :label-width="formLabelWidth">
            <el-input v-model="updateformis.merWxOpenid" style="width: 240px;" auto-complete="off" disabled></el-input>
            <el-button @click="ewm" plain>扫码获取收款帐号</el-button>
          </el-form-item>
          <div style="text-align: center;">
            <div id="qrcode" style="padding-left:240px;">
            </div>
            <label id="ddh">{{ddhqz}} {{ddh}}</label>
            <label id="lx"> {{lx}}</label>
            <br/>
            <el-button v-if="lx!=''" @click="skzh" plain>支付后,请点击获取</el-button>
          </div>
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
import '@/utils/qrcode'
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
        ne: '',
        subMchId: '',
        lock: '3'
      },
      updateformis: {
        merchantCode: '',
        subMchName: '',
        channelId: '',
        paytitle: '',
        merWxOpenid: '',
        alpayName: '',
        wxpayName: '',
        appid: '',
        subMchId: ''
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
      lock: [{
        value: '3',
        label: '全部'
      }, {
        value: '2',
        label: '停用'
      }, {
        value: '1',
        label: '激活'
      }, {
        value: '0',
        label: '预备'
      }],
      value4: '',
      jyserver: '',
      jychannel: '',
      ddh: '',
      lx: '',
      ddhqz: ''
    };
  },
  created: function() {
    this.onloadtable1();
  },
  methods: {
    skzh() {
      var txmxcxData = {
        out_trade_no: this.ddh
      };
      request({ url: 'service-pay/pay/api/query', method: 'post', data: txmxcxData })
        .then(response => {
          if (response.trade_state === "SUCCESS") {
            this.updateformis.merWxOpenid = response.openid;
          }
        })
        .catch(error => {
          Message.error("添加失败：" + "请检查内容是否正确");
        });
    },
    kg(index, rows) {
      var txmxcxData = {
        id: rows.id,
        merchantCode: rows.merchantCode,
        channelId: rows.channelId
      };
      this.dialogFormVisible = false;
      // axios.post('http://127.0.0.1:8083/pay/api/config/jyclientadd', txmxcxData)
      request({ url: 'service-pay/pay/api/config/jyclientjh', method: 'post', data: txmxcxData })
        .then(response => {
          if (response.result === 1) {
            this.onloadtable1();
            this.$message({
              message: '激活成功',
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
      var txmxcxData = {
        orderBy: this.orderBy,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        sn: this.formInline.sn,
        ne: this.formInline.ne,
        lock: this.formInline.lock
      };

      //axios.post('http://127.0.0.1:8083/pay/api/config/jyclientselect', txmxcxData)
      request({ url: 'service-pay/pay/api/config/jyclientselect', method: 'post', data: txmxcxData })
        .then(response => {
          this.loading = false;

          // for (var i = 0; i < response.data.jyserver.length; i++) { // response.data.jyserver[i].je=t his.moneyData(response.data.jyserver[i].je); // }

          this.tableData = response.list;
          this.jyserver = response.jyserver;
          this.jychannel = response.jychannel;
          this.listQuery.totalCount = response.total;
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
        appid: this.form.appid,
        subMchId: this.form.subMchId

      };
      this.dialogFormVisible = false;
      // axios.post('http://127.0.0.1:8083/pay/api/config/jyclientadd', txmxcxData)
      request({ url: 'service-pay/pay/api/config/jyclientadd', method: 'post', data: txmxcxData })
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
      if (rows.lock !== 0) {
        this.onloadtable1();
        this.$message({
          message: '只能修改预备数据',
          type: 'warning'
        });
      } else {
        this.updateformis = rows;
        this.dialogFormVisibleupdate = true;
        var txmxcxData = {
          channelId: this.updateformis.channelId
        };
        // axios.post('http://127.0.0.1:8083/pay/api/config/jyserverfws', txmxcxData)
        request({ url: 'service-pay/pay/api/config/jyserverfws', method: 'post', data: txmxcxData })
          .then(response => {
            document.getElementById('qrcode').innerHTML = "";
            this.jyserver = response.jyserver;
            this.ddh = '';
            this.ddhqz = '';
            this.lx = '';
          })
          .catch(error => {
            Message.error("查询失败：" + "请检查内容是否正确");
          });
      }
    },
    ewm() {
      var sg = {
        id: this.updateformis.id
      };
      request({ url: 'service-pay/pay/api/payOpenid', method: 'post', data: sg })
        .then(response => {

          document.getElementById('qrcode').innerHTML = "";
          let qrcode = new QRCode('qrcode', {
            width: 100,
            height: 100, // 高度  
            text: response.code_url, // 二维码内容  
            render: 'table' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
            // background: '#f0f'  
            // foreground: '#ff0'  
          });
          this.ddh = response.out_trade_no;
          this.ddhqz = '订单号:';
          if (this.updateformis.channelId === 3) {
            this.lx = ',请用支付宝支付';
          } else if (this.updateformis.channelId === 10) {
            this.lx = ',请用微信支付';
          } else {
            this.lx = '';
          }
          console.log(qrcode);
        })
        .catch(error => {
          Message.error("查询失败：" + "请检查内容是否正确");
        });
    },
    xiugai() { //修改
      var txmxcxData = {
        id: this.updateformis.id,
        merchantCode: this.updateformis.merchantCode,
        subMchName: this.updateformis.subMchName,
        channelId: this.updateformis.channelId,
        serverId: this.updateformis.serverId,
        paytitle: this.updateformis.paytitle,
        merWxOpenid: this.updateformis.merWxOpenid,
        alpayName: this.updateformis.alpayName,
        wxpayName: this.updateformis.wxpayName,
        appid: this.updateformis.appid,
        subMchId: this.updateformis.subMchId
      };
      this.dialogFormVisibleupdate = false;
      //axios.post('http://127.0.0.1:8083/pay/api/config/jyclientupdate', txmxcxData)
      request({ url: 'service-pay/pay/api/config/jyclientupdate', method: 'post', data: txmxcxData })
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
    fws() {
      if (this.form.serverId !== undefined) {
        this.form.serverId = "";
      }
      //this.form.serverId = '';
      var txmxcxData = {
        channelId: this.form.channelId
      };
      // axios.post('http://127.0.0.1:8083/pay/api/config/jyserverfws', txmxcxData)
      request({ url: 'service-pay/pay/api/config/jyserverfws', method: 'post', data: txmxcxData })
        .then(response => {
          this.jyserver = response.jyserver;

        })
        .catch(error => {
          Message.error("添加失败：" + "请检查内容是否正确");
        });

    }
  }
}

</script>
<style scoped>
/**/

.smain {
  padding: 10px;
}

.stable .el-button {
  /*padding: 10px 30px;*/
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
