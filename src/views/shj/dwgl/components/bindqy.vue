<template>
  <div>
    <el-form :inline="true" ref="formInline" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.jqbh" style="width: 300px;" placeholder="机器编号/名称"></el-input>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item class="rightitem">
        <el-button type="primary" @click="onloadtable">查询</el-button>
      </el-form-item>
      <div class="stable">
        <el-table :data="tableData" style="width:100%" border @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="100" align="center"> </el-table-column>
          <el-table-column prop="jqbh" label="机器编号" width="200" align="center"> </el-table-column>
          <el-table-column prop="jqmc" label="机器名称" align="center"> </el-table-column>
          <el-table-column prop="dwbh" label="点位编号" align="center"> </el-table-column>
          <el-table-column prop="dwmc" label="点位名称" align="center"> </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
        </el-pagination>
        <div class="bombtn">
          <el-button style="margin-right:50px;" @click="resetForm('formInline')">取消</el-button>
          <el-button type="primary" @click="submitForm('formInline')">{{listrow.btn}}</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message } from 'element-ui'
export default {
  props: ['listrow', "dialogVisiblebind"],
  data() {
    return {
      formInline: { //查询表单
        jqbh: '',
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
    }
  },
  watch: {
    dialogVisiblebind: function(data, olddata) {
      this.onloadtable();
    }
  },
  created: function() {
    this.onloadtable();
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      this.onloadtable();
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      this.onloadtable();
    },
    handleSelectionChange(val) { //table选中项
      this.optrows = val;
    },
    onloadtable() { //获取表格内容
      var bindJqData = {
        dwid: this.listrow.dwid,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        dkh: '8081'
      };
      request({ url: '/dwxx/queryDwJq', method: 'post', data: bindJqData }).then(response => {
          this.tableData = response.data;
          this.listQuery.totalCount = response.total;
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        });
    },

    submitForm() { //绑定解绑
      var url;
      if (this.listrow.title == "绑定机器") {
        url = '/dwxx/updateDwJq';
      } else {
        url = '/dwxx/updateDwJqUnbind';
      }
      request({ url: url, method: 'post', data: { val: this.optrows, id: this.listrow.dwid, mc: this.listrow.dwmc, dkh: '8081' } })
        .then(response => {
          Message.success(this.listrow.btn + "成功");
          this.$emit("dialog1Changed", 0); //发送参数到父组件 事件名，参数
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        });
    },
    resetForm(formName) {
      this.$emit("dialog1Changed", 0); //发送参数到父组件 事件名，参数
    },
  },
}

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

.bombtn {
  position: relative;
  top: -60px;
  float: right;
}

</style>
