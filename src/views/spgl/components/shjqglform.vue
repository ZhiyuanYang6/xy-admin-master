<template>
  <div class="dwsmain">
    <!-- 商户树结构 -->
    <el-card class="clearfixcard" shadow="hover" :body-style="{ padding: '0' ,'margin-bottom': '-2px'}">
      <el-input placeholder="输入商户编号或名称" v-model="filterText"></el-input>
      <el-tree v-if="!filterText" :expand-on-click-node="false" ref="tree2" class="treetenant" :props="props" :load="loadNode" @node-click="treeClick" lazy></el-tree v-show="filterText">
      <el-table v-show="!!filterText" highlight-current-row @current-change="handleChange" :data="dllist" style="width:100%; cursor:pointer;">
        <el-table-column prop="fshmc" label="父商户名称"></el-table-column>
        <el-table-column prop="shmc" label="商户名称"></el-table-column>
      </el-table>
      <!-- 右侧按钮 -->
      <el-button class="subbtn" type="warning" @click="bdClick('form')">{{listrow.btn}}</el-button>
    </el-card>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  props: ["listrow", "dialogVisible"],
  data() {
    return {
      dllist: [],
      props: {
        label: 'shmc',
        children: 'zones',
        isLeaf: 'leaf'
      },
      filterText: '',
      bdjqbhs: [],
      bdshbh: '',
      bdshmc: '',
      usershbh: '0', //当前登录用户商户编号
      username: '超级管理员', //当前登录用户商户名称
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) { //打开窗口重置绑定商户编号
        this.bdshbh = '';
      }
    },
    filterText(val) { //发起请求，查找指定的
      request({ url: 'service-machine/shdagl/shdaglMatchingQuery', method: 'post', data: { shxx: val } }).then(response => {
        this.dllist = response;
      })
    }
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ shmc: this.username, shbh: this.usershbh }]);
      }
      request({ url: 'service-machine/shdagl/shdaglTreeQuery', method: 'post', data: { shbh: node.data.shbh } }).then(response => {
        resolve(response)
      })
    },
    treeClick(node, resolve) {
      this.bdshbh = node.shbh;
      this.bdshmc = node.shmc;
    },
    handleChange(val) {
      this.bdshbh = val.shbh;
      this.bdshmc = val.shmc;
    },
    bdClick() {
      if (this.bdshbh) {
        for (let i = 0; i < this.listrow.length; i++) {
          this.bdjqbhs.push(this.listrow[i].jqbh);
        }
        var bdData = {
          shbh: this.bdshbh,
          shmc: this.bdshmc,
          jqbhs: this.bdjqbhs
        };
        request({ url: 'service-machine/shjqgl/shjqglBind', method: 'post', data: bdData }).then(response => {
          this.$message({ type: 'success', message: response.msg });
          this.ADSubmit();
        }).catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        })
      } else {
        this.$message({ type: 'warning', message: "请选择绑定商户！" });
      }
    },
    ADSubmit() {
      this.bdjqbhs = [];
      this.$emit("dialog1Changed", 0); //发送参数到父组件 事件名，参数
    },
  }
}

</script>
<style scoped>
div.dwsmain {
  padding: 5px;
  overflow: hidden;
}

.clearfixcard {
  /*position: relative;*/
  float: left;
  width: 100%;
  display: inline-block;
}

.stablecard {
  position: relative;
  left: 1%;
  width: 76%;
  padding: 5px;
}

.treetenant {
  padding: 5px;
}

div.el-input {
  padding: 5px 2px;
}

.subbtn {
  float: right;
  margin: 5px 5px 5px 5px;
  padding: 5px 10px;
}

</style>
