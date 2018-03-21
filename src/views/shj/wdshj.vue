<template>
  <div class="smain">
    <!-- 左侧表单 -->
    <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.jqbh" style="width: 150px;" placeholder="机器名称/编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.lx" style="width: 120px;" placeholder="机器类型"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.shbh" style="width: 120px;" placeholder="商户名称/编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.xl" style="width: 120px;" placeholder="点位/区域/线路"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.bs" style="width: 120px;" placeholder="标识"></el-input>
      </el-form-item>
      <!-- 右侧按钮 -->
      <el-form-item>
        <el-button type="warning" @click="onloadtable1()">查询</el-button>
      </el-form-item>
      <el-form-item class="smainFright">
        <el-button type="success" @click="dialogtable1()">>Excel</el-button>
        <el-button type="success" @click="dialogtable1()">监控</el-button>
        <el-dropdown trigger="click">
          <el-button type="primary">
            授权<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button type="text" style="width:100%;" @click="dialogtable1()">商户授权</el-button>
            </el-dropdown-item>
            <el-dropdown-item style="border-top: 1px solid #ebeef5;">
              <el-button type="text" style="width:100%;" @click="dialogtable1()">运营人员授权</el-button>
            </el-dropdown-item>
            <el-dropdown-item style="border-top: 1px solid #ebeef5;">
              <el-button type="text" style="width:100%;" @click="dialogtable1()">分享</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div class="stable">
      <!-- @sort-change="sortChange" -->
      <el-table :data="tableData1" @sort-change="sortChange" v-loading="loading" style="width:100%" border>
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="shmc" sortable='custom' label="商户名称" align="center"> </el-table-column>
        <el-table-column prop="shbh" label="商户编号" align="center"> </el-table-column>
        <el-table-column prop="jqbh" label="机器编号" align="center"> </el-table-column>
        <el-table-column prop="jqmc" label="机器名称" align="center"> </el-table-column>
        <el-table-column prop="jqlx" label="机器类型" align="center"> </el-table-column>
        <el-table-column prop="jgs" label="机柜数" align="center"> </el-table-column>
        <el-table-column prop="hds" label="货道数" align="center"> </el-table-column>
        <el-table-column label="状态" width="50" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="dialogtable2(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="yyry" label="运营人员" align="center"> </el-table-column>
        <el-table-column prop="sxwj" label="上下位机" align="center"> </el-table-column>
        <el-table-column prop="bb" label="版本" width="50" align="center"> </el-table-column>
        <el-table-column prop="fx" label="分享" width="50" align="center"> </el-table-column>
        <el-table-column prop="dw" label="点位" width="65" align="center"> </el-table-column>
        <el-table-column prop="qy" label="区域" width="50" align="center"> </el-table-column>
        <el-table-column prop="gj" label="国家" width="50" align="center"> </el-table-column>
        <el-table-column prop="sq" label="时区" width="65" align="center"> </el-table-column>
        <el-table-column prop="scrq" label="生产日期" align="center"> </el-table-column>
        <el-table-column prop="ccrq" label="出厂日期" align="center"> </el-table-column>
        <!-- <el-table-column prop="operation" label="操作" fixed="right"></el-table-column> -->
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
    </el-pagination>
    <!--  表格对话框1-->
    <el-dialog title="商户授权" width="60%" center :visible.sync="dialogTableVisible1">
      <hr>
      <el-form :inline="true" size="small" :model="formInline2" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formInline.sq" placeholder="商户名称/编号/手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="onloadtable2">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData2" style="width:100%" border>
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="xh" label="序号" align="center"> </el-table-column>
        <el-table-column prop="shbh" label="商户编号" align="center"> </el-table-column>
        <el-table-column prop="shmc" label="商户名称" align="center"> </el-table-column>
        <el-table-column prop="lxr" label="联系人" align="center"> </el-table-column>
        <el-table-column prop="lxdh" label="联系电话" align="center"> </el-table-column>
        <el-table-column prop="fshmc" label="父商户名称" align="center"> </el-table-column>
        <el-table-column prop="zcsj" label="注册时间" align="center"> </el-table-column>
        <el-table-column prop="bz" label="备注" align="center"> </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible1 = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--  表格对话框2-->
    <el-dialog title="状态详情" width="60%" center :visible.sync="dialogTableVisible2">
      <el-table :data="tableData3" style="width:100%" border>
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="xh" label="序号" align="center"> </el-table-column>
        <el-table-column prop="shbh" label="商户编号" align="center"> </el-table-column>
        <el-table-column prop="shmc" label="商户名称" align="center"> </el-table-column>
        <el-table-column prop="lxr" label="联系人" align="center"> </el-table-column>
        <el-table-column prop="lxdh" label="联系电话" align="center"> </el-table-column>
        <el-table-column prop="fshmc" label="父商户名称" align="center"> </el-table-column>
        <el-table-column prop="zcsj" label="注册时间" align="center"> </el-table-column>
        <el-table-column prop="bz" label="备注" align="center"> </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTableVisible2= false">关 闭</el-button>
      </div>
    </el-dialog>
    <!-- 表单对话框 -->
    <el-dialog center title="收货地址" :visible.sync="dialogFormVisible" width="30%">
      <hr>
      <el-form :inline="true" size="small" :model="formInline3" label-width="70px" label-position="left" class="demo-form-inline">
        <el-form-item label="机器类型">
          <el-select v-model="formInline.jqlx" filterable placeholder="请选择" style="width:292px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机器编号">
          <el-input v-model="formInline.pch" placeholder="机器编号" style="width:135px;"></el-input>
          <span> -</span>
          <el-input v-model="formInline.pch" placeholder="机器编号" style="width:145px;"></el-input>
        </el-form-item>
        <el-form-item label="批次号" style="margin-bottom:5px;">
          <el-input v-model="formInline.pch" placeholder="批次号" style="width:292px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { dcShjxx, queryMachinesStatus, queryShj } from '@/api/shj'
import axios from 'axios'
import { Message } from 'element-ui'

export default {
  name: 'wdshj',
  data() {
    return {
      formInline: {
        xl: '',
        jqbh: '',
        shbh: '',
        lx: '',
      },
      formInline2: {
        sq: "",
      },
      formInline3: {
        jqlx: "",
        jqbh: "",
        pch: "",
      },
      options: [{
        value: '1',
        label: '黄金糕'
      }, {
        value: '2',
        label: '双皮奶'
      }, {
        value: '3',
        label: '蚵仔煎'
      }, {
        value: '4',
        label: '龙须面'
      }, {
        value: '5',
        label: '北京烤鸭'
      }],
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      dialogFormVisible: false,
      listQuery: {
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 100,
      },
      tableData1: [],
      tableData2: [{ xh: '00001', shbh: '160560001', shmc: '涉外北门' }],
      tableData3: [],
      orderBy: [],
      loading: true,
      data2: {}
    }

  },
  created: function() {
    this.onloadtable1();
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      this.onloadtable1();
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      this.onloadtable1();
    },
    sortChange(column) { //服务器端排序
      if (column.order == "ascending") {
        this.orderBy1 = column.prop + " asc";
      } else if (column.order == "descending") {
        this.orderBy1 = column.prop + " desc";
      }
      this.onloadtable1();
    },
    onloadtable1() { //售货机查询
      var queryShjData = {
        orderBy: this.orderBy1,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        xl: this.formInline.xl,
        jqbh: this.formInline.jqbh,
        shbh: this.formInline.shbh,
        lx: this.formInline.lx
      }
      console.log(queryShjData);
      axios.post('http://192.168.1.112:8092/Shjgl/queryShj', queryShjData)
        .then(response => {
          this.loading = false;
          this.tableData1 = response.data.data;
          console.log(response.data);
        })
        .catch(error => {
          // Message.error("error：" + "请检查网络是否连接");
        })
    },
    onloadtable2() {

    },
    dialogtable1() {
      this.dialogTableVisible1 = true;
    },
    dialogtable2(index, row) {
      this.dialogTableVisible2 = true;
      console.log(index);
      axios.post('http://192.168.1.117:8092/Jqzt/queryMachinesStatus', row)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        })
    }
  }
}

</script>
<style scoped>
/**/

.smain {
  padding: 10px;
}

.smainFright {
  position: absolute;
  right: 0;
}





/*div.el-dialog--center div.el-dialog__body*/

div.el-dialog--center div.el-dialog__body {
  padding-top: 5px;
  padding-bottom: 5px;
}

</style>
