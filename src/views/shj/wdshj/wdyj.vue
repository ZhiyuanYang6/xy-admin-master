<template>
  <div class="smain">
    <wdyj></wdyj>
    <div class="frommain">
      <el-button type="primary" size="small" @click="onloadwdyj()">保存</el-button>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
import wdyj from '@/views/shj/mbgl/components/wdyj'
export default {
  components: { wdyj },
  data() {
    return {

    }
  },
  methods: {
    onloadwdyj() {

    },
  },
}

</script>
<style scoped>
/*scoped*/

.smain {
  padding: 10px;
}

.frommain {
  position: absolute;
  bottom: 25px;
  right: 30px;
}

</style>
