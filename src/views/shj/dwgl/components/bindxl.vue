<template>
  <div>
    <el-form :inline="true" ref="formInline" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.dwbh" style="width: 300px;" placeholder="点位编号/名称"></el-input>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item class="rightitem">
        <el-button type="primary" @click="judgeBind">查询</el-button>
      </el-form-item>
      <div class="stable">
        <el-table :data="tableData" style="width:100%" border @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="100" align="center"> </el-table-column>
          <el-table-column prop="dwbh" label="点位编号" align="center"> </el-table-column>
          <el-table-column prop="dwmc" label="点位名称" align="center"> </el-table-column>
          <el-table-column prop="dwdz" label="点位地址" align="center"> </el-table-column>
          <el-table-column prop="dwlx" label="点位类型" align="center"> </el-table-column>
          <el-table-column prop="dwbs" label="点位标识" align="center"> </el-table-column>
          <el-table-column prop="xlmc" label="已绑定的线路" align="center"> </el-table-column>
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
      // this.onloadtable();
      this.judgeBind();
    }
  },
  created: function() {
    //this.onloadtable();
    this.judgeBind();
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      if (this.listrow.title == "绑定点位") {
        this.onloadtable("service-machine/dwxx/queryDwxx", 1); // 点位绑定查询所有点位
        this.showdw = true;
      } else {
        this.onloadtable("service-machine/dwxx/queryDwxx", 0); //点位绑定删除查询该线路下的点位
        this.showdw = false;
      }
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      if (this.listrow.title == "绑定点位") {
        this.onloadtable("service-machine/dwxx/queryDwxx", 1); // 点位绑定查询所有点位
        this.showdw = true;
      } else {
        this.onloadtable("service-machine/dwxx/queryDwxx", 0); //点位绑定删除查询该线路下的点位
        this.showdw = false;
      }
    },
    handleSelectionChange(val) { //table选中项
      this.optrows = val;
    },
    onloadtable(url, val) { //获取表格内容
      var bindXlData
      if (val == 1) {
        bindXlData = {
          dwbh: this.formInline.dwbh,
          pageNum: this.listQuery.pageNum,
          pageSize: this.listQuery.pageSize,
        }
      } else {
        bindXlData = {
          // dwbh: this.ormInline.dwbh,
          xlid: this.listrow.xlid,
          pageNum: this.listQuery.pageNum,
          pageSize: this.listQuery.pageSize,
        }
      }
      request({ url: url, method: 'post', data: bindXlData }).then(response => {
          this.tableData = response.data;
          this.listQuery.totalCount = response.total;
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        })
    },

    submitForm() { //点位绑定线路绑定解绑
      var url;
      var subData;
      if (this.listrow.title == "绑定点位") {
        url = 'service-machine/dwxx/updateDwBind';
        subData = {
          val: this.optrows,
          id: this.listrow.xlid,
        }
      } else {
        url = 'service-machine/dwxx/updateDwUnbind';
        subData = {
          val: this.optrows,
        }
      }
      if (subData.val.length == 0) { return Message.error("error：" + "请选择要操作的数据") };
      request({ url: url, method: 'post', data: subData })
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
    judgeBind() {
      if (this.listrow.title == "绑定点位") {
        this.onloadtable("service-machine/dwxx/queryDwxx", 1); // 点位绑定查询所有点位
        this.showdw = true;
      } else {
        this.onloadtable("service-machine/dwxx/queryDwxx", 0); //点位绑定删除查询该线路下的点位
        this.showdw = false;
      }
      this.onceover = false;
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
