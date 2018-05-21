<template>
  <div class="smain">
    <el-tabs type="card" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabslx" :key="item.label" :label="item.label">
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" :ref="tableData" border>
          <el-table-column type="selection" label="上传商品编号" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="hdbh" label="货道编号" align="center"></el-table-column>
        </el-table>
        <div class="frommain">
          <el-button type="primary" size="small" @click="delclick()">删除</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message } from 'element-ui'
export default {
  props: ['listrow', "dialogqchd"],
  data() {
    return {
      rows: [],
      oldtab: "主机",
      tableData: [

      ],
      tabslx: [{ label: '主机' }, { label: '副机' }],
    }
  },
  watch: {
    dialogqchd: function(data, olddata) {
      if (data) {
        var tabname = new Array();
    tabname[0] = { value: '0', label: "主机" }
    for (var i = 1; i < this.listrow.jgsl; i++) {
      tabname[i] = { value: '0', label: "副机" + i }
    }
    this.tabslx = tabname;
    this.onloadtable(this.listrow.jqbh);
      }
    },
    /*dialogxzmb: function(data, olddata) {
      if (data) {
        this.onloadmbtable();
      }
    }*/
  },
  created: function() {
    // alert(this.listrow)
    var tabname = new Array();
    tabname[0] = { value: '0', label: "主机" }
    for (var i = 1; i < this.listrow.jgsl; i++) {
      tabname[i] = { value: '0', label: "副机" + i }
    }
    this.tabslx = tabname;
    this.onloadtable(this.listrow.jqbh);
  },
  methods: {
    onloadtable(val) {
      var url = 'service-machine/shjgl/queryJqhd';
      request({ url: url, method: 'post', data: { jqbh: val } }).then(response => {
        this.tabeldates = response;
        for (var i = 0; i < this.listrow.jgsl; i++) {
          if (this.oldtab == "副机" + i) {
            this.tableData = this.tabeldates[i];
            this.oldtab = "副机" + i;
            break;
          } else if (this.oldtab == "主机") {
            this.tableData = this.tabeldates[0];
            console.log(this.tableData)
            this.oldtab = "主机";
            break;
          }
        }
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      })
    },
    delclick() { //删除
      //alert(this.rows)
      this.$confirm('确认删除货道，删除货道后货道商品也将删除?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        var schd = {
          hd: this.rows,

          jqbh: this.listrow.jqbh
        }

        request({
            url: 'service-machine/shjgl/delectHd',
            method: 'post',
            data: schd
          }).then(response => {
            this.$message({ type: 'success', message: response.Msg });
            this.onloadtable(this.listrow.jqbh);
            /*if (response.msg) {
              this.$refs.tree2.remove(row.shbh);
              this.onloadtable(this.usershbh);
            }*/
          })
          .catch(error => {
            Message.error("error：" + "请检查网络是否连接");
          })

      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' });
      });
    },
    handleSelectionChange(val) {
      this.rows = val;
    },
    /**/
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
    }
  },

}

</script>
<style scoped>
/*scoped*/

.smain {
  padding: 10px;
}

.frommain {
  padding: 10px;
}

</style>
