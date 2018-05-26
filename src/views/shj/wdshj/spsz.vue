<template>
  <div class="smain">
    <el-tabs type="card" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabslx" :key="item.label" :label="item.label">
        <el-table :data="tableData" border style="width: 100%;border-bottom: 1px solid #ebeef5;" current-row-key="hdbh" max-height="350">
          <el-table-column prop="hdbh" label="货道编号"></el-table-column>
          <el-table-column prop="hdzt" label="货道状态"></el-table-column>
          <el-table-column prop="spbh" label="上传商品编号"></el-table-column>
          <el-table-column prop="szspbh1" label="设置商品编号"></el-table-column>
          <el-table-column label="设置商品名称" width="150">
            <template slot-scope="scope">
              <div @click="spxx(scope.row)">
                <el-input v-model="scope.row.spmc" style="width: 120px;" size="mini" placeholder="商品名称"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="szspjg" label="设置商品价格(元)"></el-table-column>
          <el-table-column prop="spjg" label="上传商品价格(元)"></el-table-column>
          <el-table-column prop="kcsl" label="库存数"></el-table-column>
          <el-table-column prop="kcrl" label="库存容量"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div class="botm">
      <el-button type="primary" @click="mbxx()">导入模板</el-button>
      <el-button type="primary" @click="submitsetdetil">保存</el-button>
    </div>
    <el-dialog title="选择商品" :visible.sync="dialogspxx" width="60%" append-to-body class="wdshjspsz">
      <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formInline.spmc" style="width: 150px;" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.spbh" style="width: 150px;" placeholder="商品编号"></el-input>
        </el-form-item>
        <el-button type="warning" @click="spxx()">查询</el-button>
      </el-form>
      <el-table :data="spData" highlight-current-row @current-change="handleCurrentspChange" style="width: 100%; cursor: pointer;" border>
        <el-table-column prop="spbh" label="商品编码" align="center"> </el-table-column>
        <el-table-column prop="spmc" label="商品名称" align="center"> </el-table-column>
        <el-table-column prop="lmmc" label="商品品牌" align="center"> </el-table-column>
        <!--         <el-table-column prop="spdj" label="进货价格" align="center"> </el-table-column>
         -->
        <el-table-column prop="spjg" label="商品售价" align="center"> </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalCount">
      </el-pagination>
      <div class="mbbtn">
        <el-button type="primary" @click="dialogspxx=false">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择模板" :visible.sync="dialogxzmb" width="60%" append-to-body class="wdshjspsz">
      <el-form :inline="true" :model="formbcc" size="small" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formbcc.mbmc" style="width: 150px;" placeholder="机器名称/编号"></el-input>
        </el-form-item>
        <el-button type="warning" @click="mbxx()">查询</el-button>
      </el-form>
      <el-table :data="mbData" highlight-current-row @current-change="handleCurrentmbChange" max-height="300" style="width: 100%; cursor: pointer;" border>
        <el-table-column prop="mbid" label="模板ID" align="center"> </el-table-column>
        <el-table-column prop="mbmc" label="模板名称" align="center"> </el-table-column>
        <!-- <el-table-column prop="lmmc" label="商品品牌" align="center"> </el-table-column>
          <el-table-column prop="spdj" label="进货价格" align="center"> </el-table-column>        <el-table-column prop="spjg" label="商品售价" align="center"> </el-table-column> -->
      </el-table>
      <el-pagination background @size-change="handleSizeChangemb" @current-change="handleCurrentChangemb" :current-page="listmbQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listmbQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listmbQuery.totalCount">
      </el-pagination>
      <div class="mbbtn">
        <el-button type="primary" @click="dialogxzmb=false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message } from 'element-ui'
export default {
  props: ['listrow', "dialogVisible"],
  data() {
    return {
      formInline: {
        spmc: '',
        spbh: '',
      },
      formbcc: {
        mbmc: '',
      },
      activeName: "second",
      tabslx: [],
      spData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      mbData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      tabeldates: [],
      tableData: [],
      oldtab: "主机",
      dialogspxx: false,
      dialogxzmb: false,
      listQuery: {
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 100,
      },
      listmbQuery: {
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 100,
      },
      mbrow: '', //选中的模板
      xzsp: '',
      oldsp: '',
      mbid: '',
    };
  },
  created: function() {
    var tabname = new Array();
    tabname[0] = { value: '0', label: "主机" }
    for (var i = 1; i < this.listrow.jgsl; i++) {
      tabname[i] = { value: '0', label: "副机" + i }
    }
    this.tabslx = tabname;
    this.onloadtable(this.listrow.jqbh);
  },
  watch: {
    dialogVisible: function(data, olddata) {
      if (data) {
        this.onloadtable(this.listrow.jqbh);
        this.mbid = '';
      }
    },
    /*dialogxzmb: function(data, olddata) {
      if (data) {
        this.onloadmbtable();
      }
    }*/
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.pageSize = val; //修改每页数据量
      this.spxx();
    },
    handleCurrentChange(val) { //跳转第几页
      this.listQuery.pageNum = val;
      this.spxx();
    },
    handleSizeChangemb(val) {
      this.listmbQuery.pageSize = val; //修改每页数据量
      this.mbxx();
    },
    handleCurrentChangemb(val) { //跳转第几页
      this.listmbQuery.pageNum = val;
      this.mbxx();
    },
    handleCurrentspChange(val) {
      this.formInline.spmc = '';
      this.formInline.spbh = '';
      //选择的商品
      var hdbh = this.oldsp.hdbh;
      this.oldsp.spmc = val.spmc;
      this.oldsp.szspbh1 = val.spbh;
      this.oldsp.szspjg = val.spjg;
      this.mbid = '';
      this.oldsp.hdbh = 111;
      this.oldsp.hdbh = hdbh;
      // this.mbrow = val;
    },
    handleCurrentmbChange(val) { //选择的模板
      this.mbid = val.mbid;
      //this.impotrMbxx(val.mbid)
      // this.mbrow = val;
    },
    handleClick(tab, event) { //选中的 机器 类型 （主副机）
      for (var i = 0; i < this.listrow.jgsl; i++) {
        if (tab.label == "副机" + i) {
          this.tableData = this.tabeldates[i];
          this.oldtab = "副机" + i;
          break;
        } else if (tab.label == "主机") {
          this.tableData = this.tabeldates[0];
          this.oldtab = "主机" + i;
          break;
        }
      }
    },
    onloadtable(val) {
      var url = 'service-machine/shjgl/queryJqspxx';
      request({ url: url, method: 'post', data: { jqbh: val } }).then(response => {
        this.tabeldates = response;
        for (var i = 0; i < this.listrow.jgsl; i++) {
          if (this.oldtab == "副机" + i) {
            this.tableData = this.tabeldates[i];
            this.oldtab = "副机" + i;
            break;
          } else if (this.oldtab == "主机") {
            this.tableData = [];
            this.tableData = this.tabeldates[0];
            this.oldtab = "主机";
            break;
          }
        }
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      })
    },
    /*onloadmbtable() { //查询商品模板
      request({ url: 'url', method: 'post', data: { jqbh: 'val' } }).then(response => {
        this.mbData = response;
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      })
    },*/
    submitsetdetil: function() {
      //this.tableData.szry="ssss";
      if (this.mbid == '') {
        var editspxx = {
          map: this.tableData,
          szry: "ssss"
        }
      } else {
        var editspxx = {
          szry: "ssss",
          mbid: this.mbid,
          jqbh: this.listrow.jqbh
        }
      }

      request({ url: 'service-machine/shjgl/spsz', method: 'post', data: editspxx }).then(response => {
        this.loading = false;
        this.$message({ type: 'success', message: response.Msg });
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },
    spxx: function(val) {

      this.oldsp = val;
      this.dialogspxx = true
      var queryspxx = {
        jqbh: this.listrow.jqbh,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        spmc: this.formInline.spmc,
        spbh: this.formInline.spbh
      };
      request({ url: 'service-machine/shjgl/queryshspxx', method: 'post', data: queryspxx }).then(response => {
        this.spData = response.list;
        for (var a = 0; a < 20; a++) {
          this.spData.push({});
          debugger;
        }
        this.listQuery.totalCount = response.total;
        this.loading = false;
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },
    mbxx: function(val) {
      //ale
      this.oldsp = val;
      console.log("sss");
      console.log(val);
      this.dialogxzmb = true;
      var querymbxx = {
        shbh: this.listrow.shbh,
        pageNum: this.listmbQuery.pageNum,
        pageSize: this.listmbQuery.pageSize,
        mbmc: this.formbcc.mbmc,

      }
      request({ url: 'service-machine/mbgl/mbglQuery', method: 'post', data: querymbxx }).then(response => {
        // this.mbData = response.data;
        this.listmbQuery.totalCount = response.total
        console.log(response)
        this.loading = false;
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },
    /*    impotrMbxx:function(val){
      var querymb = {
        shbh: "0",
        mbid:val
              }
      request({ url: 'service-machine/mbgl/mbxxQuery', method: 'post', data: querymb }).then(response => {
       // alert(this.tableData.length);
        //this.getRowKeys(1)
       var listrows = this.tableData.find(item=>{
           return itme.hdbh == '2';
        });
        console.log(listrows);
        debugger;
         var mb=response.data.hdspszList;
         for (var i = 0; i <= this.tableData.length; i++) {
           for (var i =0 ; i<= mb.length; i++) {
             Things[i]
           }
         }
        console.log(mb);
        //this.listmbQuery.totalCount=response.total
        //console.log(response)
        this.loading = false;
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    }
*/
  },

}

</script>
<style scoped>
/*scoped*/

.smain {
  padding: 10px;
}

.botm {
  left: 82%;
  position: relative;
  /*top: -65px;*/
  margin-top: 5px;
}

.mbbtn {
  float: right;
  margin-top: -60px;
}

.el-dialog_body {
  height: 100%;
}

</style>
<style>
div.wdshjspsz div.el-dialog__body {
  padding: 20px;
  min-height: 400px;
  overflow-y: scroll;
}

</style>
