<template>
  <div class="smain">
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="formInline.num" placeholder="请选择" size="mini">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="frommain">
      <el-button type="primary" size="mini" @click="onloadwdyj()">保存</el-button>
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
      formInline: {
        num: '0'
      },
      options: [
        { value: '0', label: "十格机" },
        { value: '1', label: "副机1" },
        { value: '2', label: "副机2" },
      ],
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
