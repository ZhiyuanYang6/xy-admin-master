<template>
  <div class="hdys">
    <el-tabs type="card">
      <el-tab-pane label="主柜">
        <el-row>
          <el-col :span="5" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 1 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3668524360,1426486330&fm=27&gp=0.jpg" class="image">
              <div style="padding: 14px;">
                <p>好吃的汉堡<span style="float: right;color:#F56C6C"> {{price}}</span></p>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button">加入购物车</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="副柜1">副柜1</el-tab-pane>
      <el-tab-pane label="副柜2">副柜2</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName2: 'first',
      currentDate: "2018-03-17",
      price: "￥6"
    };
  },
  creader: function() {
    console.log("creader")
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};

</script>
<style scoped>
.el-tab-pane div.hdys {
  padding-left: 0;
}



/********copy**********/

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
  border: 0;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

</style>
