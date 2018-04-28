<template>
  <div>
    <el-form :model="formline" label-width="80px" size="small" label-position="left">
      <el-form-item label="模板名称">
        <el-input v-model="formline.mbmc" placeholder="请输入模板名称"></el-input>
      </el-form-item>
      <el-form-item class="jbsztarea" label="备 注">
        <el-input type="textarea" v-model="formline.bz"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formline: {
        mbmc: '',
        bz: ''
      }
    }
  },
  watch: {
    // 如果发生改变，这个函数就会运行
    'formline.mbmc': function(newQuestion, oldQuestion) {
      this.formline.mbmc = newQuestion;
      this.setParam();
    },
    'formline.bz': function(newQuestion, oldQuestion) {
      this.formline.bz = newQuestion;
      this.setParam();
    }
  },
  methods: {
    setParam() {
      this.$emit('jbmbParamChange', this.formline);
    }
  }
}

</script>
<style scoped>
div.el-input {
  width: 400px;
}

</style>
