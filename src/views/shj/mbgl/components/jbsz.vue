<template>
  <div>
    <el-form :model="formline" label-width="80px" size="small" label-position="left">
      <el-form-item label="模板名称">
        <el-input v-model="formline.mbmc" placeholder="请输入模板名称"></el-input>
      </el-form-item>
      <el-form-item class="jbsztarea" label="备 注">
        <el-input type="textarea" v-model="formline.remark"></el-input>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item>
        <el-button class="subbtn" type="warning" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  props: ['mbxx', 'jbszshow', 'showNum'],
  data() {
    return {
      formline: {
        mbmc: '',
        remark: ''
      }
    }
  },
  created: function() {},
  watch: {
    jbszshow: function(newQuestion, oldQuestion) {
      this.formline.mbid = this.mbxx.mbid;
      this.formline.mbmc = this.mbxx.mbmc;
      this.formline.remark = this.mbxx.remark;
    },
    showNum: function(newQuestion, oldQuestion) {
      this.formline.mbid = this.mbxx.mbid;
      this.formline.mbmc = this.mbxx.mbmc;
      this.formline.remark = this.mbxx.remark;
    }
  },
  methods: {
    save() {
      request({ url: 'service-machine/mbgl/tymbcz', method: 'post', data: this.formline }).then(response => {
        if (response.msg) {
          this.$message({ type: 'success', message: response.msg });
          if (!this.mbxx.mbid) {
            this.mbxx.mbid = response.mbid;
            this.formline.mbid = response.mbid;
          }
          this.mbxx.mbmc = this.formline.mbmc;
          this.mbxx.remark = this.formline.remark;
        }
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    }
  }
}

</script>
<style scoped>
div.el-input {
  width: 400px;
}

</style>
