<template>
  <div>
    <i class="iconfont icon-ai-set"></i>
    <div class="tlt" v-if="this.menuData[0].show">
      <span>模板基本信息设置</span>
      <el-button type="warning" size="mini" @click="saveClick(0)" @jbmbParamChange="jbmbczParam">保存</el-button>
    </div>
    <div class="tlt" v-if="this.menuData[1].show">
      <span>货道模式设置</span>
      <el-button type="warning" size="mini">导入机器货道</el-button>
      <el-button type="primary" size="mini">添加柜机</el-button>
      <el-button type="primary" size="mini">添加货道</el-button>
      <el-button type="danger" size="mini">删除</el-button>
    </div>
    <div class="tlt" v-if="this.menuData[2].show">
      <span>机器商品设置</span>
      <el-button type="warning" size="mini">导入机器货道</el-button>
      <el-button type="primary" size="mini">添加柜机</el-button>
      <el-button type="primary" size="mini">添加货道</el-button>
      <el-button type="danger" size="mini">删除</el-button>
    </div>
    <div class="tlt" v-if="this.menuData[3].show">
      <span>货道库存预警设置</span>
      <el-button type="warning" size="mini" @click="saveClick(1)">保存</el-button>
      <el-button size="mini">批量设置</el-button>
    </div>
    <div class="tlt" v-if="this.menuData[4].show">
      <span>商品库存预警设置</span>
      <el-button type="warning" size="mini">保存</el-button>
      <el-button size="mini">批量设置</el-button>
    </div>
    <div class="tlt" v-if="this.menuData[5].show">
      <span>温度设置</span>
      <el-button type="warning" size="mini">保存</el-button>
    </div>
    <div class="tlt" v-if="this.menuData[6].show">
      <span>流量报警设置</span>
      <el-button type="warning" size="mini">保存</el-button>
    </div>
    <div class="tlt" v-if="this.menuData[7].show">
      <span>出货规则设置</span>
      <el-button type="warning" size="mini">保存</el-button>
    </div>
    <hr>
  </div>
</template>
<script>
export default {
  props: {
    menuData: {
      type: Array
    }
  },
  methods: {
    saveClick(index) {
      var url = "";
      var mbDeleteData = {};
      if (index == 0) {
        console.log(index);
      } else {
        console.log("error");
      }
    },
    mbcz(url, data) {
      axios.post(url, data).then(response => {
          this.loading = false;
          this.Result = response.data.code;
          console.log(Result);
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        })
    },
    jbmbczParam(param) {
      debugger;
      console.log(param);
    }
  }
}

</script>
<style scoped>
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
