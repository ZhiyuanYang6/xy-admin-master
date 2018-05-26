<template>
  <div class="smain llyj" style="width:50%;">
    <el-card class="box-card">
      <el-form ref="form" :model="formline" label-width="90px" size="mini">
        <span style="font-size: 10px;"> * 报警流量取值范围：0 ~ 10240</span>
        <el-form-item label="日流量报警">
          <el-input v-model="formline.rllyj" type="number"></el-input>
          <div class="deil">
            <span style="padding:0 5px;">M</span>
            <span>日</span> 流量
            <span>大于</span> 设置阀值时机器报警
          </div>
        </el-form-item>
        <el-form-item label="月流量报警">
          <el-input v-model="formline.yllyj" type="number"></el-input>
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
import { Message } from 'element-ui'
export default {
  props: ['mbxx', 'llyjshow', 'showNum'],
  data() {
    return {
      formline: {
        rllyj: '',
        yllyj: ''
      }
    };
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
    validator() {
      if (0 > this.formline.rllyj || this.formline.rllyj > 10240 || 0 > this.formline.yllyj || this.formline.yllyj > 10240 || !this.formline.yllyj || !this.formline.rllyj) return true;
    },
    save() {
      if (this.validator()) {
        return Message.warning("请设置正确的流量报警值");
      }
      this.formline.rllyj = (this.formline.rllyj - 0).toFixed(2) - 0;
      this.formline.yllyj = (this.formline.yllyj - 0).toFixed(2) - 0;
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
      });
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
