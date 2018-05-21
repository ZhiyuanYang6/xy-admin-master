<template>
  <div class="smain wdshjspsz">
    <el-tabs type="card" @tab-click="handleClick">
      <el-tab-pane label="机器部署信息">
        <jqbsxx :jqbsxxdata="jqbsxxdata" :qyoptions="qyoptions"></jqbsxx>
      </el-tab-pane>
      <el-tab-pane label="主控设备信息">
        <zksbxx :zksbxxdata="zksbxxdata"></zksbxx>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message } from 'element-ui'
import jqbsxx from './jqxq/jqbsxx'
import zksbxx from './jqxq/zksbxx'
export default {
  components: { zksbxx, jqbsxx },
  props: ['listrow', "dialogVisible"],
  data() {
    return {
      row: "",
      jqbsxxdata: {},
      zksbxxdata: {},
      qyoptions: [], //区域选择项
      xloptions: [], //线路选择项
      dwoptions: [], //点位选择项
      onceover: true,
    };
  },
  watch: {
    dialogVisible: function(data, olddata) {
      if (data) { this.initialize(); 
      this.zksbxxdata={};
        this.jqbsxxdata={};
        this.zksbxxdata=this.listrow;
        this.jqbsxxdata=this.listrow;
       // url = 'service-machine/shjgl/queryEditJqbsxx';
       // this.jqbsxxdata = this.onloadtable(url, queryShjData, 'jqbs');
  }
    }
  },
  created: function() {
    this.zksbxxdata={};
    this.jqbsxxdata={};
    this.initialize();
  },
  methods: {
    handleClick(tab, event) { //选中的 机器 类型 （主副机）
      var queryShjData = { jqbh: this.listrow.jqbh };
      var url = '';
      if (tab.label == "机器部署信息") {
        url = 'service-machine/shjgl/queryEditJqbsxx';
        this.jqbsxxdata = this.onloadtable(url, queryShjData, 'jqbs');
      } else if (tab.label == "主控设备信息") {
       // url = 'service-machine/shjgl/queryJqztxx';
        //this.zksbxxdata = this.onloadtable(url, queryShjData, 'jqxq');
        this.zksbxxdata=this.listrow;
        debugger;
      } else {}
    },
    onloadtable(url, val, lx) { //表单内容
      request({ url: url, method: 'post', data: val }).then(response => {
        this.loading = false;
        if (lx == 'jqbs') {
          this.jqbsxxdata = response;
        } else this.zksbxxdata = response.zksbxx;
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },
    initialize() { /////////////初始化
      this.onloadtable1('service-machine/shjgl/queryQyxx');
      this.onloadtable('service-machine/shjgl/queryEditJqbsxx', { jqbh: this.listrow.jqbh }, 'jqbs');
    },
    onloadtable1(url, val, lx) { //初始化区域下拉框
      request({ url: url, method: 'post', data: { shbh: this.listrow.shbh } }).then(response => {
        this.loading = false;
        this.qyoptions = (response.length > 0) ? response : '';
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },
  },
}

</script>
<style scoped>
/*scoped*/

.smain {
  padding: 10px 0;
}

.botm {
  left: 80%;
  position: relative;
}

</style>
