<template>
  <div class="smain">
    <!-- 界面类别 -->
    <div style="padding: 5px" class="dwglbtnstly">
      <el-button v-for="item in jmlb" :class="{'checkbtn':item.show}" :key="item.lx" style="padding:10px 40px;margin-right:20px;" size="small" type="info" @click="lookerror(item.lx)">{{item.value}}</el-button>
    </div>
    <hr>
    <div>
      <dwpage v-show="jmlb[0].show"> </dwpage>
      <xlpage v-show="jmlb[1].show"> </xlpage>
      <qypage v-show="jmlb[2].show"> </qypage>
    </div>
  </div>
</template>
<script>
import dwpage from './dwgl/dwpage'
import xlpage from './dwgl/xlpage'
import qypage from './dwgl/qypage'
export default {
  name: "dwgl",
  components: { dwpage, xlpage, qypage },
  data() {
    return {
      jmlb: [
        { lx: "dw", value: '点位', show: false },
        { lx: "xl", value: '线路', show: false },
        { lx: "qy", value: '区域', show: false },
      ],
    }
  },
  created: function() {
    this.jmlb[0].show = true;
  },
  methods: {
    lookerror(val) {
      for (var i = 0; i < this.jmlb.length; i++) {
        this.jmlb[i].show = false;
        if (this.jmlb[i].lx == val) { this.jmlb[i].show = true; }
      }
    },
  }
}

</script>
<style scoped>
.smain {
  padding: 10px;
}

.checkbtn {
  background: #575a5d;
}

</style>
