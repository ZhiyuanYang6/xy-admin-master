<template>
  <div class="smain">
    <el-card class="box-card shglchild">
      <div slot="header" class="clearfix">
        <span>机器授权</span>
        <el-button class="titbtn" type="primary" @click="saveAuthorize">保存</el-button>
        <el-checkbox class="sqdetil" v-model="checked">可授权给其他人</el-checkbox>
      </div>
      <el-transfer class="peopleele" :titles="['选择人员', '已选择的人员']" :button-texts="['移除', '选择']" v-model="value5" :props="{  key: 'userid',  label: 'username'}" :data="data3">
      </el-transfer>
      <el-transfer class="machsele" :titles="['选择机器', '已选择的机器']" :button-texts="['移除', '选择']" v-model="value6" :props="{  key: 'jqbh',  label: 'jqmc'}" :data="data4">
      </el-transfer>
    </el-card>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message, MessageBox } from 'element-ui'
export default {
  data() {
    const generateData3 = _ => {
      const data = [];
      //查询当前登录商户的所有机器
      request({ url: 'service-machine/jqsq/userQuery', method: 'post' }).then(response => {
          //console.log(response);
          for (let i = 0; i < response.length; i++) {
            data.push({
              userid: response[i].userid,
              username: response[i].username,
              // disabled: i % 4 === 0
            });
          }
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        });
      return data;
    };
    const generateData4 = _ => {
      const data = [];
      //查询当前登录商户的所有机器
      request({ url: 'service-machine/jqsq/machineQuery', method: 'post' }).then(response => {
          //console.log(response);
          for (let i = 0; i < response.length; i++) {
            data.push({
              jqbh: response[i].jqbh,
              jqmc: response[i].jqmc,
              // disabled: i % 4 === 0
            });
          }
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        });
      return data;
    };
    return {
      data3: generateData3(),
      data4: generateData4(),
      value5: [],
      value6: [],
      checked: '',
    };
  },
  methods: {
    saveAuthorize() {
      var authorizeData = {
        userids: this.value5,
        jqbhs: this.value6,

      }
      request({ url: 'service-machine/jqsq/machineAuthorize', method: 'post', data: authorizeData }).then(response => {
          //console.log(response);
          if (response.msg) {
            this.$message({ type: 'success', message: response.msg });
          }
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        });
    }
  }
};

</script>
<style scoped>
.smain {
  padding: 10px;
  position: relative;
}

.title {
  margin: 10px;
}

.peopleele {
  margin-left: 10px;
}

.machsele {
  position: absolute;
  left: 50%;
  top: 91px;
}

.sqdetil {
  margin: 10px;
  float: right;
}

.titbtn {
  float: right;
  padding: 8px 20px;
  margin-right: 60px;
}

</style>
