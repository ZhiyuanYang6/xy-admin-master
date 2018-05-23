<template>
  <div class="smain llyj">
    <el-card class="box-card">
      <el-form ref="cformline" :model="cformline" label-width="90px" size="mini">
        <el-form-item label="日流量报警">
          <el-input v-model="cformline.rll"></el-input>
          <div class="deil">
            <span style="padding:0 5px;">M</span>
            <span>日</span> 流量
            <span>大于</span> 设置阀值时机器报警
          </div>
        </el-form-item>
        <el-form-item label="月流量报警">
          <el-input v-model="cformline.yll"></el-input>
          <div class="deil">
            <span style="padding:0 5px;">M</span>
            <span>月</span> 流量
            <span>大于</span> 设置阀值时机器报警
          </div>
        </el-form-item>
      </el-form>
      <hr>
      <div class="frommain">
        <el-button type="primary" size="small" @click="onloadllyj()">保存</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  props: ['listrow', "dialogllbjsz"],
  data() {
    return {
      cformline: {
      }
    }
  },
  created: function() {
            this.cformline={rll:2,yll:2};
    console.log(this.listrow)
    this.cformline = this.listrow;
    this.onloadtable();
  },
  watch: {
    dialogllbjsz: function(data, olddata) {
      if (data) {
        this.cformline={rll:2,yll:2};
        this.onloadtable();
      }
    }

  },
  methods: {
    onloadllyj() {
      this.cformline.jqbh = this.listrow.jqbh;
      request({ url: 'service-machine/shjgl/editJqllyj', method: 'post', data: this.cformline }).then(response => {
        this.$message({ type: 'success', message: response.Msg });
        //this.dialogllbjsz=false;
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接2");
      });
    },
    onloadtable() {
      var url = 'service-machine/shjgl/queryjqllyj';
      request({ url: url, method: 'post', data: { jqbh: this.listrow.jqbh } }).then(response => {
        this.cformline = response;
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      })
    },
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
  /*width: 240px;*/
}

.frommain button {
  float: right;
  position: relative;
  margin: 10px;
}

hr {
  margin-top: -15px;
  border: 0;
  border-top: 1px solid #D1DBE5;
  margin-top: 3px;
}

</style>
