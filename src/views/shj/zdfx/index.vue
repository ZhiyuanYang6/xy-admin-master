<template>
  <div class="smain">
    <el-tabs type="border-card">
      <el-tab-pane label="机器体检">
        <jqtj></jqtj>
      </el-tab-pane>
      <el-tab-pane label="商品设置历史">
        <spszls></spszls>
      </el-tab-pane>
      <el-tab-pane label="货道库存历史">
        <hdkcls></hdkcls>
      </el-tab-pane>
      <el-tab-pane label="订单分析">
        <dingdfx></dingdfx>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import jqtj from './components/jqtj'
import spszls from './components/spszls'
import hdkcls from './components/hdkcls'
import dingdfx from './components/dingdfx'
export default {
  components: { jqtj, spszls, hdkcls, dingdfx },
  data() {
    return {

    }
  }
}

</script>
<style scoped>
/*scoped*/

</style>
