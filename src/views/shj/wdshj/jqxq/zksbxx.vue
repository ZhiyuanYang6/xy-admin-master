<template>
  <div class="dwsmain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" label-position="left" size="small" class="demo-form-inline" label-width="110px">
      <el-form-item label="上位机版本编号">
        <el-input v-model="formInline.swbh" class="inpxq"></el-input>
      </el-form-item>
      <el-form-item label="下位机版本编号">
        <el-input v-model="formInline.xwbh" class="inpxq"></el-input>
      </el-form-item>
      <el-form-item label="上位机型号">
        <el-input v-model="formInline.swxh" class="inpxq"></el-input>
      </el-form-item>
      <el-form-item label="下位机型号">
        <el-input v-model="formInline.xwxh" class="inpxq"></el-input>
      </el-form-item>
      <el-form-item label="上位机厂家">
        <el-input v-model="formInline.swcj" class="inpxq"></el-input>
      </el-form-item>
      <el-form-item label="下位机厂家">
        <el-input v-model="formInline.xwcj" class="inpxq"></el-input>
      </el-form-item>
      <el-form-item label="上位机软件版">
        <el-input v-model="formInline.swrjbb" class="inpxq"></el-input>
      </el-form-item>
      <el-form-item label="下位机软件版">
        <el-input v-model="formInline.xwrjbb" class="inpxq"></el-input>
      </el-form-item>
      <el-form-item label="上位机硬件版">
        <el-input v-model="formInline.swyjbb" class="inpxq"></el-input>
      </el-form-item>
      <el-form-item label="下位机硬件版">
        <el-input v-model="formInline.xwyjbb" class="inpxq"></el-input>
      </el-form-item>
      <el-form-item label="生产厂家">
        <el-input v-model="formInline.sccj" class="inpxq"></el-input>
      </el-form-item>
      <el-form-item label="生产日期">
        <el-input v-model="formInline.scrq1" class="inpxq"></el-input>
      </el-form-item>
      <el-form-item label="保质日期">
        <el-input v-model="formInline.zbrq" class="inpxq"></el-input>
      </el-form-item>
      <el-form-item label="流量卡号">
        <el-input v-model="formInline.llkkh" class="inpxq"></el-input>
      </el-form-item>
      <el-form-item label="流量卡类型">
        <el-input v-model="formInline.llklx" class="inpxq"></el-input>
      </el-form-item>
      <el-form-item label="运营商">
        <el-input v-model="formInline.yys" class="inpxq"></el-input>
      </el-form-item>
      <el-form-item label="记录更新时间">
        <el-input v-model="formInline.jlsj" class="inpxq"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ['zksbxxdata'],
  data() {
    return {
      // formInline: {},
    }
  },
  computed: { // 计算属性的 getter
    formInline: { // `this` 指向 vm 实例
      get: function() {
        return this.zksbxxdata
      },
    }
  },
  created: function() {
    // this.formInline = {};
    // console.log(this.formInline)
    // this.onloadtable();
  },
  methods: {
    submitsetdetil: function() {
      // console.log(this.formInline)
    }
  }
}

</script>
<style scoped>
div.dwsmain {
  padding: 0px;
}

div.rightitem {
  /*float: right;*/
  /*padding-right: 100px;*/
}

.inpxq {
  width: 190px;
  margin-right: 10px;
}

</style>
