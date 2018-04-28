<template>
  <div class="smain">
    <llyj style="width:100%"></llyj>
    <div class="frommain">
      <el-button type="primary" size="small" @click="onloadwdyj()">保存</el-button>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
import llyj from '@/views/shj/mbgl/components/llyj'
export default {
  components: { llyj },
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
  right: 60px;
}

</style>
