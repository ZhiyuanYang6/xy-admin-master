<template>
  <div>
    <el-form :inline="true" ref="formInline" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.jqbh" placeholder="机器编号/名称"></el-input>
      </el-form-item>
      <el-form-item v-show="showdw">
        <el-select v-model="formInline.sfbd" placeholder="是否绑定点位" clearable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item class="rightitem">
        <el-button type="primary" @click="judgeBind">查询</el-button>
      </el-form-item>
      <div class="stable">
        <el-table :data="tableData" style="width:100%" border @selection-change="handleSelectionChange" height="300">
          <el-table-column type="selection" width="100" align="center"> </el-table-column>
          <el-table-column prop="jqbh" label="机器编号" width="200" align="center"> </el-table-column>
          <el-table-column prop="jqmc" label="机器名称" align="center"> </el-table-column>
          <el-table-column prop="dwbh" label="点位编号" align="center"> </el-table-column>
          <el-table-column prop="dwmc" label="点位名称" align="center"> </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
        </el-pagination>
        <div class="bonbtn">
          <el-button @click="resetForm('formInline')">取消</el-button>
          <el-button type="primary" @click="submitForm('formInline')">{{listrow.btn}}</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import request from '@/utils/request';
import { Message } from 'element-ui';
export default {
  props: ['listrow', "dialogVisiblebind"],
  data() {
    return {
      formInline: { //查询表单
        xlmc: '',
        qymc: '',
        dwbs: '',
      },
      options: [
        { value: 0, label: "已绑定" },
        { value: 1, label: "未绑定" },
      ],
      listQuery: {
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 100,
      },
      optrows: [], //选中的行
      tableData: [{}], //表格内容
      showdw: true, //是否显示点位选择栏
    };
  },
  watch: {
    dialogVisiblebind: function(data, olddata) {
      if (data) {
        this.initialize();
      }
    }
  },
  created: function() {
    this.initialize();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var url;
          if (this.listrow.title === "绑定机器") {
            url = 'service-machine/dwxx/updateDwJq';
          } else {
            url = 'service-machine/dwxx/updateDwJqUnbind';
          }
          var subData = {
            val: this.optrows,
            id: this.listrow.dwid,
            mc: this.listrow.dwmc
          };
          if (subData.val.length == 0) { return Message.error("error：" + "请选择要操作的数据") };
          request({ url: url, method: 'post', data: subData }).then(response => {
            Message.success(this.listrow.btn + "成功");
            this.$emit("dialog1Changed", 0); //发送参数到父组件 事件名，参数
          }).catch(error => {
            Message.error("error：" + "请检查网络是否连接");
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$emit("dialog1Changed", 0); //发送参数到父组件 事件名，参数
    },
    validator(val, type) {
      if (!val) {
        Message.warning(type + "不能为空");
        return true;
      }
    },
    onloadtable(url, val) { //获取表格内容
      var bindJqData;
      if (val === 1) {
        bindJqData = {
          jqbh: this.formInline.jqbh,
          dwid: this.formInline.sfbd,
          pageNum: this.listQuery.pageNum,
          pageSize: this.listQuery.pageSize,
        };
      } else {
        bindJqData = {
          jqbh: this.formInline.jqbh,
          dwid: this.listrow.dwid,
          pageNum: this.listQuery.pageNum,
          pageSize: this.listQuery.pageSize,
        };
      }

      request({ url: url, method: 'post', data: bindJqData }).then(response => {
          this.tableData = response.data;
          this.listQuery.totalCount = response.total;
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        });
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      if (this.listrow.title === "绑定机器") {
        this.onloadtable("service-machine/dwxx/queryDwJq", 1); // 查询所有机器
        this.showdw = true;
      } else {
        this.onloadtable("service-machine/dwxx/queryDwJq", 0); //查询该点位上的机器
        this.showdw = false;
      }
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      if (this.listrow.title === "绑定机器") {
        this.onloadtable("service-machine/dwxx/queryDwJq", 1); // 查询所有机器
        this.showdw = true;
      } else {
        this.onloadtable("service-machine/dwxx/queryDwJq", 0); //查询该点位上的机器
        this.showdw = false;
      }
    },
    handleSelectionChange(val) {
      this.optrows = val;
    },
    initialize() { ////////////////////////进入初始化
      this.judgeBind();
      if (this.listrow.title === "绑定机器") {
        this.onloadtable("service-machine/dwxx/queryDwJq", 1); // 查询所有机器
        this.showdw = true;
      } else {
        this.onloadtable("service-machine/dwxx/queryDwJq", 0); //查询该点位上的机器
        this.showdw = false;
      }
    },
    judgeBind() {
      if (this.listrow.title === "绑定机器") {
        this.onloadtable("service-machine/dwxx/queryDwJq", 1); // 查询所有机器
        this.showdw = true;
      } else {
        this.onloadtable("service-machine/dwxx/queryDwJq", 0); //查询该点位上的机器
        this.showdw = false;
      }
    },
  },
};

</script>
<style scoped>
/*scoped*/

.smain {
  padding: 10px;
}

.el-form,
.addsublime {
  padding: 20px 0;
}

div.el-form-item {
  margin-bottom: 20px;
}

.el-select {
  width: 100%;
}


.mostval {
  position: absolute;
  color: #f00;
  font-size: 20px;
  right: -15px;
  top: 3px;
}

.bonbtn {
  margin-top: -28px;
  float: right;
}

.bonbtn .el-button {
  margin: 0 0 0 20px;
}

.el-table {
  border-bottom: 1px solid #ebeef5;
}

</style>
