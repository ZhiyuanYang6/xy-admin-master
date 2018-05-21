<template>
  <div class="smain llyj" style="width:50%;">
    <el-card class="box-card">
      <el-form ref="form" :model="formline" label-width="90px" size="mini">
        <el-form-item label="日流量报警">
          <el-input v-model="formline.rllyj"></el-input>
          <div class="deil">
            <span style="padding:0 5px;">M</span>
            <span>日</span> 流量
            <span>大于</span> 设置阀值时机器报警
          </div>
        </el-form-item>
        <el-form-item label="月流量报警">
          <el-input v-model="formline.yllyj"></el-input>
          <div class="deil">
            <span style="padding:0 5px;">M</span>
            <span>月</span> 流量
            <span>大于</span> 设置阀值时机器报警
          </div>
        </el-form-item>
        <!-- 右侧按钮 -->
        <el-form-item>
          <el-button class="subbtn" type="warning" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  props: ['mbxx', 'llyjshow', 'showNum'],
  data() {
    return {
      formline: {
        rllyj: '',
        yllyj: ''
      }
    }
  },
  created: function() {},
  watch: {
    llyjshow: function(newQuestion, oldQuestion) {
      this.formline.mbid = this.mbxx.mbid;
      this.formline.rllyj = this.mbxx.rllyj;
      this.formline.yllyj = this.mbxx.yllyj;
    },
    showNum: function(newQuestion, oldQuestion) {
      this.formline.mbid = this.mbxx.mbid;
      this.formline.rllyj = this.mbxx.rllyj;
      this.formline.yllyj = this.mbxx.yllyj;
    }
  },
  methods: {
    save() {
      this.formline.rllyj = this.formline.rllyj + '';
      this.formline.yllyj = this.formline.yllyj + '';
      request({ url: 'service-machine/mbgl/llyjcz', method: 'post', data: this.formline }).then(response => {
        if (response.msg) {
          this.$message({ type: 'success', message: response.msg });
          if (!this.mbxx.mbid) {
            this.mbxx.mbid = response.mbid;
            this.formline.mbid = response.mbid;
          }
          this.mbxx.rllyj = this.formline.rllyj;
          this.mbxx.yllyj = this.formline.yllyj;
        }
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      })

    }
  }
}

</script>
<style scoped>
div.el-input {
  width: 80px;
  float: left;
}

.llyj span {
  color: #F78989;
}

.llyj .deil {
  float: left;
  width: 250px;
}

</style>
