<template>
  <div class="smain chgz" style="width:50%;">
    <el-card class="box-card">
      <el-form ref="form" :model="cformline" label-width="90px" size="mini">
        <el-form-item label="日流量报警">
          <el-input v-model="cformline.rllbj"></el-input>
          <div class="deil">
            <span style="padding:0 5px;">M</span>
            <span>日</span> 流量
            <span>大于</span> 设置阀值时机器报警
          </div>
        </el-form-item>
        <el-form-item label="月流量报警">
          <el-input v-model="cformline.rllbj"></el-input>
          <div class="deil">
            <span style="padding:0 5px;">M</span>
            <span>月</span> 流量
            <span>大于</span> 设置阀值时机器报警
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cformline: {
        rllbj: "10",
        yllbj: "150"
      }
    }
  },
}

</script>
<style scoped>
div.el-input {
  width: 80px;
  float: left;
}

.chgz span {
  color: #F78989;
}

.chgz .deil {
  float: left;
  width: 250px;
}

</style>
