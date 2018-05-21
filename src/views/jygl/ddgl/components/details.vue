<template>
  <div class="smain">
    <el-card class="box-card img" :body-style="{padding:'5px'}">
      <img src="http://pic.qiantucdn.com/58pic/28/40/34/96758PIC9y6_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center/crop/0x1009a0a0"></img>
    </el-card>
    <el-card class="box-card md" :body-style="{padding:'5px'}">
      <span class="title">门店</span>
      <div class="mdList mdLeft">
        <p><span>机器类型:</span><span>{{mdlist.showjqlx}}</span></p>
        <p><span>机器编号:</span><span>{{mdlist.jqbh}}</span></p>
        <p><span>交易号:</span><span>{{mdlist.jyid}}</span></p>
        <p><span>会员:</span><span>{{mdlist.hdbh}}</span></p>
        <p><span>评价:</span><span>{{mdlist2.pjxq}}</span></p>
        <p><span>投诉:</span><span>{{mdlist.showchzt}}</span></p>
      </div>
      <div class="mdList">
        <p><span>收款方式:</span><span>{{mdlist.showzffs}}</span></p>
        <p><span>收款金额:</span><span>{{mdlist.bzfje}}</span></p>
        <p><span>找零:</span><span class="fr">{{mdlist.zl}}</span></p>
        <p>
          <span>交易前机器库存:</span>
          <el-button class="fr" type="text">查看出货详情:</el-button>
          <span class="fr">{{mdlist2.chqkc}}</span>
        </p>
        <p>
          <span>软件版本:</span>
          <el-button type="text" class="fr">查看该版本详情:</el-button>
          <span class="fr" style="color: #E7262C" v-if="mdlist.uphas">（需更新）</span>
          <span class="fr">{{mdlist.rjbb}}</span>
        </p>
        <p><span>订单创建时间:</span><span class="fr">{{mdlist.cjsj}}</span></p>
      </div>
    </el-card>
    <el-card class="box-card sp" :body-style="{padding:'5px'}">
      <span class="title">商品</span>
      <el-table size="mini" :data="tableData" class="table1" border>
        <el-table-column prop="spmc" label="商品名称" align="center"> </el-table-column>
        <el-table-column prop="bspdj" label="商品单价" align="center"> </el-table-column>
        <el-table-column prop="bspsj" label="商品售价" align="center"> </el-table-column>
        <el-table-column prop="yhje" label="优惠金额" align="center"> </el-table-column>
        <el-table-column prop="spsl" label="商品数量" align="center"> </el-table-column>
        <el-table-column prop="bddzj" label="订单总价" align="center"></el-table-column>
        <el-table-column prop="yhzje" label="优惠总金额" align="center"></el-table-column>
        <el-table-column prop="hdbh" label="货道编号" align="center"> </el-table-column>
        <el-table-column prop="chsl" label="出货数量" align="center"> </el-table-column>
        <el-table-column prop="showchzt" label="出货状态" align="center"></el-table-column>
        <el-table-column prop="chsbsj" label="出货时间" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message } from 'element-ui'
export default {
  props: ['listrow', "dialogVisible"],
  data() {
    return {
      tableData: [],
      sfklist: {
        /* fkje: "2元",
         tkjl: "已退款2元",
         tksj: "2017-11-7 11:14:11",
         dqzt: "已全额退款",
         zfsj: "2017-11-7 11:14:11",
         zffs: "微信的扫码",
         jydh: "421000004987546513213213",
         shdh: "AA42100000498754651321321"*/
      },
      khlist: {
        hy: "VIP2",
        pj: "未评价",
        ts: "未投诉",
      },
      shlist: {
        // shmc: "喵星人",
      },
      mdlist: '',
      mdlist2: '',
    };
  },
  created: function() {
    this.initialize();
  },
  watch: {
    dialogVisible: function(data, olddata) {
      if (data) {
        this.initialize();

      }
    }
  },
  methods: {
    initialize() {
      this.details();
      var queryDdmxData = {
        ddbh: this.listrow.strddbh,
      };
      request({ url: 'service-order/ddxx/queryDdmx', method: 'post', data: queryDdmxData }).then(response => {
        this.tableData = response.data;
        this.mdlist2 = this.tableData[0];
      }).catch(error => {
        Message.error("error： " + "请检查网络是否连接 ");
      });
    },
    details() {
      var detailsData = { ddbh: this.listrow.strddbh };
      // var detailsData = { ddbh: this.listrow.strddbh };
      request({ url: 'service-order/ddxx/ddxxDetails', method: 'post', data: detailsData }).then(response => {
        this.mdlist = response.data;
      }).catch(error => {
        Message.error("error： " + "请检查网络是否连接 ");
      });
    },
  }
}

</script>
<style scoped>
.title {
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #696E76;
  border-bottom: 1px solid #B6BCCC;
}

p {
  margin: 5px;
}

.fr {
  float: right;
}

div.img {
  /*position: relative;*/
  /*top: 0px;*/
  /*left: 74%;*/
  float: right;
  /*width: 312px;*/
  height: 295px;
}

div.el-card__body {
  padding: 5px;
}

img {
  width: 350px;
}

div.md .el-button--medium {
  padding: 0 0 5px 40px;
}

div.sh .el-button--medium {
  padding: 4px 5px;
}

div.md {
  width: 70%;
  position: relative;
  top: 0;
  left: -10px;
}

div.sp {
  width: 101%;
  position: relative;
  left: -10px;
  top: 10px;
  margin-bottom: 40px;
}

div.md .mdList {
  width: 35%;
  float: left;
  margin-left: 10%
}

div.md p {
  margin-top: 13px;
}

div.md div.mdLeft {
  margin: 10px 5%;
}

</style>
