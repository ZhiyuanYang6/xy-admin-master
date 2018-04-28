<template>
  <div class="smain">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" label="上传商品编号" align="center"></el-table-column>
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="hdbh" label="货道编号" align="center"></el-table-column>
    </el-table>
    <div class="frommain">
      <el-button type="primary" size="small" @click="onloadwdyj()">保存</el-button>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      tableData: [
        { hdbh: "1" },
        { hdbh: "2" },
        { hdbh: "3" },
        { hdbh: "4" },
        { hdbh: "5" },
        { hdbh: "6" },
        { hdbh: "7" },
        { hdbh: "8" },
        { hdbh: "9" },
        { hdbh: "10" },
      ]
    }
  },
  methods: {
    onload(url, data) {
      // request({ url: url, method: 'post', data: data }).then(response => {
      Message.success("添加成功");
      this.$emit("dialog1Changed", 0); //发送参数到父组件 事件名，参数
      // })
      // .catch(error => {
      // Message.error("error：" + "请检查网络是否连接");
      // })
    },
    onloadwdyj() { //保存

    }
  },

}

</script>
<style scoped>
/*scoped*/

.smain {
  padding: 10px;
}

.frommain {
  padding: 10px;
}

</style>
