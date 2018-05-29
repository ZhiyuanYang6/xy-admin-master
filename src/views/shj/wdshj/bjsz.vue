<template>
  <div class="smain wdshjspsz">
    <el-tabs type="card" @tab-click="handleClick" >
      <el-tab-pane v-for="item in tabslx" :key="item.label" :label="item.label"  >
        <el-table :data="tableData" border style="width: 100%" max-height="450">
          <el-table-column prop="jqbh" label="机器编号"></el-table-column>
          <el-table-column prop="hdb" label="货道编号"></el-table-column>

          <el-table-column label="货道模式">
           <template slot-scope="scope">
              <el-select size="mini" v-model="scope.row.hdms"  placeholder="请选择"  >
                <el-option v-for="item in optionsms" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column prop="spbh" label="商品编号"></el-table-column>
          <el-table-column prop="spmc" label="商品名称"></el-table-column>
          <el-table-column prop="spjg" label="商品价格"></el-table-column>
          <el-table-column prop="name" label="库存数"></el-table-column>
          <el-table-column prop="hdrl" label="货道容量"></el-table-column>
          <el-table-column prop="kcrl" label="库存容量"></el-table-column>
          <el-table-column label="货道报警阀值" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.yjyz" suffix-icon="iconfont icon-shuzishurukuang" style="width: 120px;" size="mini" placeholder="货道报警阀值"></el-input>
            </template>
          </el-table-column>
          <!--  <el-table-column prop="name" label="是否支持订货" width="150">
           <template slot-scope="scope">
             <el-select v-model="scope.row.dh" placeholder="请选择" size="mini">
               <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
               </el-option>
             </el-select>
           </template>
         </el-table-column> -->
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div class="botm">
      <el-button type="primary" @click="submitsetdetil">保存</el-button>
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
      tabeldates: [],
      activeName: "second",
      tabslx: [

      ],
      oldtab: "主机",

      tableData: [

      ],
       optionsms: [
        { label: '皮带', value: 1 },
        { label: '弹簧', value: 2 },
      ],
      options: [{ value: '选项1', label: '支持' }, { value: '选项2', label: '不支持' }],
    };
  },
  created: function() {
    var tabname = new Array();
    tabname[0] = { value: '0', label: "主机" }
    for (var i = 1; i < this.listrow.jgsl; i++) {
      tabname[i] = { value: '0', label: "副机" + i }
    }
    this.tabslx = tabname;
    console.log(this.tabname);
    this.onloadtable(this.listrow.jqbh);
  },
  watch: {
    dialogVisible: function(data, olddata) {
      if (data) {
         var tabname = new Array();
    tabname[0] = { value: '0', label: "主机" }
    for (var i = 1; i < this.listrow.jgsl; i++) {
      tabname[i] = { value: '0', label: "副机" + i }
    }
    this.tabslx = tabname;
    console.log(this.tabname);
    this.onloadtable(this.listrow.jqbh);
        this.onloadtable(this.listrow.jqbh);
      }
    }
  },
  methods: {
    submitsetdetil: function() {
      var editHdbj = {
        map: this.tableData
      }
      request({ url: 'service-machine/shjgl/edithdbj', method: 'post', data: editHdbj })
        .then(response => {
          this.loading = false;
          this.$message({ type: 'success', message: response.Msg });
          //this.ADSubmit();
        })
        .catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        })
      console.log(this.tableData)
    },
    update() {
      this.options = this.listrow.dwlx ? this.listrow.dwlx : "";
    },
    handleClick(tab, event) { //选中的 机器 类型 （主副机）
      for (var i = 1; i < this.listrow.jgsl; i++) {
        if (tab.label == "副机" + i) {
          this.tableData = this.tabeldates[i];
          this.oldtab = "副机" + i;
          break;
        } else if (tab.label == "主机") {
          this.tableData = this.tabeldates[0];
          this.oldtab = "主机";
          break;
        }
      }
    },
    ADSubmit() {
      this.$emit("dialogVisible", 0); //发送参数到父组件 事件名，参数
    },
    onloadtable(val) {
      //this.tab.label="主机";
      var queryXlxxData = {
        jqbh: val
      };
      var url = 'service-machine/shjgl/Queryhdbj';
      request({ url: url, method: 'post', data: queryXlxxData }).then(response => {
          this.tabeldates = response;
          for (var i = 0; i < this.listrow.jgsl; i++) {
            if (this.oldtab == "副机" + i) {
              this.tableData = this.tabeldates[i];
              this.oldtab = "副机" + i;
              break;
            } else if (this.oldtab == "主机") {
              this.tableData = this.tabeldates[0];
              this.oldtab = "主机";
              break;
            }
          }
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
.smain {
  padding: 10px;
}

.botm {
  left: 90%;
  position: relative;
}

</style>
