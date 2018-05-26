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
      <el-table :data="tableData" max-height="398" @sort-change="sortChange" v-loading="loading" style="width:100%" border>
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
          <el-form-item label="支付服务" :label-width="formLabelWidth">
            <el-select v-model="form.channelId" clearable placeholder="请选择">
              <el-option v-for="item in jychannel" :key="item.id" :label="item.channelName" :value="item.id">
              </el-option>
            </el-select>
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
          <el-form-item label="证书" :label-width="formLabelWidth">
            <el-upload class="upload-demo" id="files" drag action="123" :limit="1" :on-change="beforeUpload" multiple ref="newupload" :auto-upload="false">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em> </div>
            </el-upload>
          </el-form-item>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="newSubmitForm()">添加</el-button>
          <!-- <el-button type="primary" @click="addform()">添加</el-button> -->
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
          <el-form-item label="支付服务" :label-width="formLabelWidth">
            <el-select v-model="updateformis.channelId" clearable placeholder="请选择">
              <el-option v-for="item in jychannel" :key="item.id" :label="item.channelName" :value="item.id">
              </el-option>
            </el-select>
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
          <el-form-item label="证书" :label-width="formLabelWidth">
            <el-upload class="upload-demo" drag action="123" :limit="1" :on-change="xgUpload" ref="xgupload" :auto-upload="false">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em> </div>
            </el-upload>
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
        name: '',
        notifyUrl: '',
        jsApiCallUrl: '',
        sslkeyPath: '',
        sslcertPath: '',
        appsecret: '',
        mchkey: '',
        appid: '',
        mchid: '',
        channelId: ''

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
        notifyUrl: '',
        jsApiCallUrl: '',
        sslkeyPath: '',
        sslcertPath: '',
        appsecret: '',
        mchkey: '',
        appid: '',
        mchid: '',
        channelId: ''
      },
      formLabelWidth: '120px',
      orderBy: '',
      loading: false,
      options: [{
        value: 'ser.mchid',
        label: '支付商户号'
      }, {
        value: 'cl.channelName',
        label: '支付渠道'
      }, {
        value: 'ser.name',
        label: '支付服务商'
      }],
      value4: '',
      jychannel: ''
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
    beforeUpload(file, fileList) {
      this.file = fileList[0].raw;
    },
    newSubmitForm() {
      let fd = new FormData();
      fd.append('file', this.file); //传文件 
      fd.append('notifyUrl', this.form.notifyUrl); //传其他参数
      fd.append('jsApiCallUrl', this.form.jsApiCallUrl);
      fd.append('sslkeyPath', this.form.sslkeyPath);
      fd.append('sslcertPath', this.form.sslcertPath);
      fd.append('appsecret', this.form.appsecret);
      fd.append('mchkey', this.form.mchkey);
      fd.append('mchid', this.form.mchid);
      fd.append('appid', this.form.appid);
      fd.append('name', this.form.name);
      fd.append('channelId', this.form.channelId);
      this.dialogFormVisible = false;
      request({ url: 'service-pay/pay/api/config/jyserveradd', method: 'post', data: fd })
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
          Message.error("error：" + "请检查网络是否连接");
        });
    },
    xiugai() {
      let fd = new FormData();
      fd.append('file', this.file); //传文件 
      fd.append('id', this.updateformis.id);
      fd.append('notifyUrl', this.updateformis.notifyUrl); //传其他参数
      fd.append('jsApiCallUrl', this.updateformis.jsApiCallUrl);
      fd.append('sslkeyPath', this.updateformis.sslkeyPath);
      fd.append('sslcertPath', this.updateformis.sslcertPath);
      fd.append('appsecret', this.updateformis.appsecret);
      fd.append('mchkey', this.updateformis.mchkey);
      fd.append('mchid', this.updateformis.mchid);
      fd.append('appid', this.updateformis.appid);
      fd.append('name', this.updateformis.name);
      fd.append('channelId', this.updateformis.channelId);
      this.dialogFormVisibleupdate = false;
      //axios.post('http://127.0.0.1:8083/pay/api/config/jyserverupdate', txmxcxData)
      request({ url: 'service-pay/pay/api/config/jyserverupdate', method: 'post', data: fd })
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
    xgUpload(file, fileList) { //修改
      this.file = fileList[0].raw;
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
      // axios.post('http://127.0.0.1:8083/pay/api/config/jyserverselect', txmxcxData)
      request({ url: 'service-pay/pay/api/config/jyserverselect', method: 'post', data: txmxcxData })
        .then(response => {
          this.loading = false;
          this.tableData = response.list;
          this.listQuery.totalCount = response.total;
          this.jychannel = response.jychannel;
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        });
    },
    moneyData(money) { //不能用过滤器，很难受 金额
      return (money / 100).toFixed(2);
    },

    updateform(index, rows) { //修改
      this.updateformis = rows;
      this.dialogFormVisibleupdate = true;
      this.$refs.xgupload.clearFiles();
    }
  }
};
export function newVideo(data) {
  return axios({
    method: 'post',
    url: 'http://192.168.1.253:8899/service-pay/pay/api/config/jyserveradd',
    timeout: 20000,
    data: data
  });
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
