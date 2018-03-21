<template>
  <div class="smain mbgl">
    <el-tabs type="border-card" tab-position="left" style="height: 560px" @tab-click="handleClick">
      <mbtitle :menuData="menuData"></mbtitle>
      <el-tab-pane label="基本设置">
        <jbsz class="smain"></jbsz>
      </el-tab-pane>
      <el-tab-pane label="货道模式设置">
        <hdms class="smain"></hdms>
      </el-tab-pane>
      <el-tab-pane label="货道商品设置">
        <hdsp class="smain"></hdsp>
      </el-tab-pane>
      <el-tab-pane label="货道库存预警">
        <hdkc class="smain"></hdkc>
      </el-tab-pane>
      <el-tab-pane label="商品库存预警">
        <spkc class="smain"></spkc>
      </el-tab-pane>
      <el-tab-pane label="温度预警">
        <wdyj class="smain"></wdyj>
      </el-tab-pane>
      <el-tab-pane label="流量预警">
        <llyj class="smain"></llyj>
      </el-tab-pane>
      <el-tab-pane label="出货规则">
        <chgz class="smain"></chgz>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import jbsz from './jbsz'
import hdms from './hdms'
import hdsp from './hdsp'
import hdkc from './hdkc'
import spkc from './spkc'
import wdyj from './wdyj'
import llyj from './llyj'
import chgz from './chgz'
import mbtitle from './mbtitle'


export default {
  components: { jbsz, hdms, hdsp, hdkc, spkc, wdyj, llyj, chgz, mbtitle },
  data() {
    return {
      menuData: [
        { index: "0", show: true, value: "基本设置" },
        { index: "1", show: false, value: "货道模式设置" },
        { index: "2", show: false, value: "货道商品设置" },
        { index: "3", show: false, value: "货道库存预警" },
        { index: "4", show: false, value: "商品库存预警" },
        { index: "5", show: false, value: "温度预警" },
        { index: "6", show: false, value: "流量预警" },
        { index: "7", show: false, value: "出货规则" },
      ],
    }
  },
  creader: function() {
    var a = docuemnt.getElementByClass('el-dialog__header')
    console.log(a)
  },
  methods: {
    handleClick(tab, event) {
      for (var i = 0; i < this.menuData.length; i++) {
        this.menuData[i].show = false;
      }
      this.menuData[tab.index].show = true;
    }
  }
}

</script>
<style scoped>
.el-tab-pane .smain {
  padding: 50px 10px 10px 0;
}

main.el-main {
  padding-top: 0;
  position: relative;
  padding-left: 30px;
}

</style>
