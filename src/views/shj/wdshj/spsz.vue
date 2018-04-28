<template>
  <div class="smain wdshjspsz">
    <el-tabs type="card" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabslx" :key="item.label" :label="item.label">
        <el-table :data="tableData" border style="width: 100%">
          <!-- <el-table-column prop="date" label="日期"></el-table-column> -->
          <!-- <el-table-column prop="name" label="姓名"></el-table-column> -->
          <el-table-column prop="hdbh" label="货道编号"></el-table-column>
          <el-table-column prop="hdzt" label="货道状态"></el-table-column>
          <el-table-column prop="scspbh" label="上传商品编号"></el-table-column>
          <el-table-column prop="spbh" label="设置商品编号"></el-table-column>
          <el-table-column prop="spmc" label="设置商品名称" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" style="width: 120px;" size="mini" placeholder="商品名称"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="spjg" label="设置商品价格"></el-table-column>
          <el-table-column prop="kcsl" label="库存数"></el-table-column>
          <el-table-column prop="kcrl" label="库存容量"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div class="botm">
      <el-button type="primary">导入模板</el-button>
      <el-button type="primary"  @click="submitsetdetil">保存</el-button>
    </div>
  </div>
</template>

 <template>
  <div>
  <el-table
    :data="shspData"
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="date"
      label="日期"
      width="120">
    </el-table-column>
    <el-table-column
      property="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      property="address"
      label="地址">
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="setCurrent(shspData[1])">选中第二行</el-button>
    <el-button @click="setCurrent()">取消选择</el-button>
  </div>
</div>
</template>

<script>
import request from '@/utils/request'
import { Message } from 'element-ui'
export default {
  props: ['listrow', "dialogVisible"],
  data() {
    return {
      activeName: "second",
      tabslx: [],
       tabeldates:[],
      tableData: [],
      oldtab:"主机"

    /*  listQuery: {
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 100,
      },*/
    };
  },
   created: function() {
    var tabname=new Array(); 
    //alert(this.listrow.jgsl)
    tabname[0]= { value: '0', label: "主机" }
    for (var i =1; i<this.listrow.jgsl;i++) {
      tabname[i]={ value: '0', label: "副机"+i }
    }
    this.tabslx=tabname;
    console.log(this.tabname);
   this.onloadtable(this.listrow.jqbh);  
 },
   watch: {
     dialogVisible: function(data, olddata) {
    if(data){
      this.onloadtable(this.listrow.jqbh);
     }
    }
  },
  methods: {
    update() {
      this.options = this.listrow.dwlx ? this.listrow.dwlx : "";
    },
    handleClick(tab, event) { //选中的 机器 类型 （主副机）
     for (var i =1; i<this.listrow.jgsl;i++) {
        if (tab.label == "副机"+i) {
           this.tableData=this.tabeldates[i];
                      this.oldtab="副机"+i;

           break;
        }else if(tab.label == "主机"){
           this.tableData=this.tabeldates[0];
                      this.oldtab="主机"+i;

           break;
        }
     }

    },
      onloadtable(val) {
      var queryXlxxData = {
        jqbh: val
      };
      var url= '/shjgl/queryJqspxx';
       request({ url: url, method: 'post', data: queryXlxxData}).then(response => {
        this.tabeldates = response;
        for (var i =1; i<this.listrow.jgsl;i++) {
        if ( this.oldtab == "副机"+i) {
           this.tableData=this.tabeldates[i];
           this.oldtab="副机"+i;
           break;
        }else if(this.oldtab == "主机"){
           this.tableData=this.tabeldates[0];
           this.oldtab="主机";
           break;
        }
     }
       console.log(this.tabeldates);
       })
       .catch(error => {
       Message.error("error：" + "请检查网络是否连接1");
       })
    },
    submitsetdetil: function() {
      var arr=new Array();
      for (var i= 0; i<this.tableData.length; i++) {
       arr.push(this.tableData[i]);
      }
      
        var parm=JSON.stringify(arr)
        console.log(parm);
        //debugger;
         request({ url: '/shjgl/editspsz', method: 'post', data: parm })
        .then(response => {
          this.loading = false;
          this.$message({ type: 'success', message: response.msg });
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接2");
        })
      console.log(this.tableData)
    },
  },

}

</script>
<style scoped>
/*scoped*/

.smain {
  padding: 10px;
}

.botm {
  left: 80%;
  position: relative;
  top: -65px;
}

</style>
