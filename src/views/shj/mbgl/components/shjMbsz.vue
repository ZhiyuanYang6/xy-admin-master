<template>
  <div class="smain mbgl">
    <el-tabs type="border-card" tab-position="left" style="height: 560px" @tab-click="handleClick" v-model="activeName">
      <div>
        <i class="iconfont icon-ai-set"></i>
        <div class="tlt"><span>{{listrow.title}}</span></div>
      </div>
      <el-tab-pane label="基本设置" name="0">
        <jbsz class="smain" :mbxx="mbxx" :jbszshow="menuData['0'].show" :showNum="showNum"></jbsz>
      </el-tab-pane>
      <!--      <el-tab-pane label="货道模式设置">
        <hdms class="smain"></hdms>
      </el-tab-pane> -->
      <!--       <el-tab-pane label="货道库存预警">
        <hdkc class="smain"></hdkc>
      </el-tab-pane> -->
      <!--       <el-tab-pane label="商品库存预警">
        <spkc class="smain"></spkc>
      </el-tab-pane> -->
      <el-tab-pane label="货道设置" name="1">
        <jqsz class="smain" :mbxx="mbxx" :showtabs="menuData['1'].show" :showNum="showNum"></jqsz>
      </el-tab-pane>
      <!--       <el-tab-pane label="货道商品设置" name="2">
  <hdsp class="smain"></hdsp>
</el-tab-pane> -->
      <el-tab-pane label="温度预警" name="2">
        <wdyj class="smain" :mbxx="mbxx" :wdyjshow="menuData['2'].show" :showNum="showNum"></wdyj>
      </el-tab-pane>
      <el-tab-pane label="流量预警" name="3">
        <llyj class="smain" :mbxx="mbxx" :llyjshow="menuData['3'].show" :showNum="showNum"></llyj>
      </el-tab-pane>
      <!--       <el-tab-pane label="出货规则" name="5">
  <chgz class="smain"></chgz>
</el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
import request from '@/utils/request'
import jbsz from './jbsz'
// import hdms from './hdms'
import jqsz from './jqsz'
import hdsp from './hdsp'
// import hdkc from './hdkc'
// import spkc from './spkc'
import wdyj from './wdyj'
import llyj from './llyj'
import chgz from './chgz'
import mbtitle from './mbtitle'


export default {
  props: ['mbxx', 'mbszdialogVisible'],
  components: { jbsz, jqsz, hdsp, wdyj, llyj, chgz, mbtitle },
  data() {
    return {
      menuData: [
        { index: "0", show: true, value: "模板基本信息设置" },
        { index: "1", show: false, value: "模板货道设置" },
        // { index: "1", show: false, value: "货道模式设置" },
        // { index: "2", show: false, value: "货道商品设置" },
        // { index: "3", show: false, value: "货道库存预警" },
        //{ index: "2", show: false, value: "模板商品库存预警" },
        { index: "2", show: false, value: "模板温度预警" },
        { index: "3", show: false, value: "模板流量预警" },
        //{ index: "5", show: false, value: "模板出货规则" },
      ],
      listrow: {
        title: '模板基本信息设置',
      },
      activeName: '',
      showNum: 0, //每次打开窗口自增   用于通用模板赋值
    }
  },
  created: function() {
    //修改模板  查询模板信息
    this.mbxxInit();
  },
  watch: {
    mbszdialogVisible: function(newQuestion, oldQuestion) {
      if (newQuestion) {
        //货道tab默认为第一个
        this.activeName = "0";
        this.listrow.title = this.menuData[0].value;
        //通过模板id判断操作类型是新增还是修改 同时赋值
        //修改模板  查询模板信息
        this.mbxxInit();
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      for (var i = 0; i < this.menuData.length; i++) {
        this.menuData[i].show = false;
      }
      this.menuData[tab.index].show = true;
      this.listrow.title = this.menuData[tab.index].value;
      console.log(this.mbxx);
    },
    mbxxInit() {
      if (this.mbxx.mbid) {
        var queryData = {
          mbid: this.mbxx.mbid,
        }

        request({ url: 'service-machine/mbgl/mbxxQuery', method: 'post', data: queryData }).then(response => {
            //模板信息赋值
            this.mbxx.shbh = response.shbh;
            this.mbxx.mbid = response.mbid;
            this.mbxx.mbmc = response.mbmc;
            this.mbxx.remark = response.remark;
            this.mbxx.rllyj = response.rllyj;
            this.mbxx.yllyj = response.yllyj;
            this.mbxx.wdList = response.wdList;
            this.mbxx.hdList = response.hdList;

            this.showNum++;
          })
          .catch(error => {
            Message.error("error：" + "请检查网络是否连接");
          })
      } else {
        this.showNum++;
      }
    }
  }
}

</script>
<style scoped>
.el-tab-pane .smain {
  padding: 35px 10px 10px 0;
}

main.el-main {
  padding-top: 0;
  position: relative;
  padding-left: 30px;
}

.iconfont {
  float: left;
  font-size: 18px;
  color: #3399FF;
  padding: 0 10px;
}

.tlt {
  float: left;
  width: 90%;
  font-size: 18px;
}

.tlt span {
  padding: 0 10px;
}

hr {
  position: absolute;
  top: 45px;
  width: 90%;
  border: 1px solid #ccc;
}

</style>
