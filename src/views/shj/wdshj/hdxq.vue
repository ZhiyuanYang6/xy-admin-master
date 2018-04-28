<template>
  <div class="smain wdshjspsz">
    <el-tabs type="card" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabslx" :key="item.label" :label="item.label">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="hdbh" label="货道编号"></el-table-column>
          <el-table-column prop="spbh" label="商品编号"></el-table-column>
          <el-table-column prop="szspbh" label="设置商品编号"></el-table-column>
          <el-table-column prop="spmc" label="商品名称"></el-table-column>
          <el-table-column prop="spjg" label="商品价格"></el-table-column>
          <el-table-column prop="kcrl" label="库存容量"></el-table-column>
          <el-table-column prop="kcsl" label="库存数量"></el-table-column>
          <el-table-column prop="hdzt" label="货道状态"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message } from 'element-ui'
export default {
  props: ['listrow', "dialogVisible"],
  data() {
    return {
      tabeldates:[],
      activeName: "second",
      tableData: [],
      tabslx: [],
      tableData: [],
      oldtab:"主机"
    };
  }, 
  created: function() {
    //alert(this.listrow)
    var tabname=new Array(); 
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
           this.oldtab="主机";
           break;
        }
     }

    },
   onloadtable(val) {
      var queryXlxxData = {
        jqbh: val
      };
      var url= '/shjgl/queryHdxq';
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
       //this.tableData=response[0];
       console.log(this.tabeldates);
       })
       .catch(error => {
       Message.error("error：" + "请检查网络是否连接1");
       })
    },
  },

}

</script>
<style scoped>
/*scoped*/

.smain {
  padding: 10px;
}

</style>
