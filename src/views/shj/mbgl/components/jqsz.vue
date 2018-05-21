<template>
  <div class="smain">
    <div class="titlebtn">
      <el-button size="mini" type="primary" @click="dialogaddVisible=true">添加机柜</el-button>
      <el-button size="mini" type="primary" @click="dialogVisible=true">导入机器货道</el-button>
      <el-button size="mini" :disabled="!editableTabs2[0].name" type="primary" @click="dialogaddhdVisible=true">添加货道</el-button>
      <el-button size="mini" :disabled="!editableTabs2[0].name" type="primary" @click="sethdyzsubmit()">批量设置阈值</el-button>
    </div>
    <el-tabs v-model="editableTabsValue2" type="border-card" closable @tab-remove="removedata" @tab-click="tabclickfun">
      <el-tab-pane v-for="(item, index) in editableTabs2" :key="item.name" :label="item.title" :name="item.name">
        <el-table :data="tableData[item.name]" ref="multipleTable" border max-height="398" @selection-change="handleSelectionChange">
          <!-- @sort-change="sortChange" -->
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="hdbh" sortable label="货道编号" align="center"> </el-table-column>
          <el-table-column label="货道模式" align="center">
            <template slot-scope="scope">
              <el-select size="mini" v-model="scope.row.hdms" clearable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="spbh" label="商品编号" align="center"> </el-table-column>
          <el-table-column prop="spmc" label="商品名称" align="center">
            <template slot-scope="scope">
              <!-- 点击打开选择商品模板 -->
              <div @click="spSelectShow(scope.row)">
                <el-input size="mini" v-model="scope.row.spmc" placeholder="请输入内容"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="spjg" label="商品价格" align="center"> </el-table-column>
          <el-table-column prop="yjyz" label="货道库存阈值" align="center">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.yjyz" type="number" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="removedata(scope.row,'hd',scope.$index)" type="text">删除货道</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <div class="submitboton" v-show="tableData.length">
        <el-button size="smain" type="success" @click="hdxxSave">保存设置</el-button>
      </div>
    </el-tabs>
    <!-- 机器模板 -->
    <el-dialog title="导入机器货道" append-to-body :visible.sync="dialogVisible" width="50%">
      <div class="smain">
        <el-form :inline="true" :model="forjqcc" size="small" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="forjqcc.jqxx" style="width: 150px;" placeholder="机器名称/编号"></el-input>
          </el-form-item>
          <el-button type="warning" @click="jqxxfind()">查询</el-button>
        </el-form>
        <el-table :data="jqData" highlight-current-row @current-change="handleCurrentmbChange" style="width: 100%; cursor: pointer;" border>
          <el-table-column prop="jqbh" label="机器编号" align="center"> </el-table-column>
          <el-table-column prop="jqmc" label="机器名称" align="center"> </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listmbQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listmbQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listmbQuery.totalCount">
        </el-pagination>
        <div class="mbbtn">
          <el-button type="primary" @click="reporthd">导入</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 添加机柜 -->
    <el-dialog title="添加机柜" append-to-body :visible.sync="dialogaddVisible" width="30%">
      <div class="smain addjg">
        <el-form status-icon :model="formaddjg" size="small" ref="formaddjg" :rules="rules1" class="demo-form-inline" label-width="100px" label-position="left">
          <el-form-item label="添加机柜" prop="addjg">
            <el-select v-model="formaddjg.addjg" clearable placeholder="请选择">
              <el-option v-for="item in optionsjg" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="货道层数" prop="hdcs">
            <el-input v-model.number="formaddjg.hdcs" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="最大货道数" prop="zdhds">
            <el-input v-model.number="formaddjg.zdhds" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="info" class="btnesc" @click="dialogaddVisible=false">取消</el-button>
            <el-button type="primary" class="btnesc" @click="addTab(editableTabsValue2)">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!-- 添加货道 -->
    <el-dialog title="添加货道" append-to-body :visible.sync="dialogaddhdVisible" width="35%">
      <div class="dialogadd"></div>
      <el-form status-icon :model=" formtjhd" size="small" ref="formtjhd" :rules="rules1" class="demo-form-inline" :inline="true">
        <el-form-item label="货道编号" prop="addhdbh">
          <el-input v-model.number=" formtjhd.addhdbh" style="width:250px;margin-right:30px;" placeholder="请输入内容"></el-input>
          <el-button type="primary" @click="addhdfun('formtjhd')">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 设置阈值 -->
    <el-dialog title="批量设置阈值" append-to-body :visible.sync="dialogaddyzVisible" width="35%">
      <div class="dialogadd"></div>
      <el-form status-icon :model="formszyz" size="small" ref="formszyz" :rules="rules1" class="demo-form-inline" :inline="true">
        <el-form-item label="货道库存阈值" prop="szhdkcyz">
          <el-input v-model.number="formszyz.szhdkcyz" style=" width:250px;margin-right:30px;" placeholder="请输入内容"></el-input>
          <el-button type="primary" @click="addhdyzfun(editableTabsValue2)">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 设置商品 -->
    <el-dialog title="选择商品" :visible.sync="dialogspxxVisible" width="60%" append-to-body>
      <div class="smain">
        <el-form :inline="true" :model="spcc" size="small" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="spcc.spxx" style="width: 150px;" placeholder="商品名称/编号"></el-input>
          </el-form-item>
          <el-button type="warning" @click="spxxQuery()">查询</el-button>
        </el-form>
        <el-table :data="spData" highlight-current-row @current-change="handleCurrentspChange" style="width: 100%; cursor: pointer;" border>
          <el-table-column prop="spbh" label="商品编号" align="center"> </el-table-column>
          <el-table-column prop="spmc" label="商品名称" align="center"> </el-table-column>
          <el-table-column prop="spdj" label="商品价格" align="center"> </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination background @size-change="sphandleSizeChange" @current-change="sphandleCurrentChange" :current-page="listspQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listspQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listspQuery.totalCount">
        </el-pagination>
        <div class="mbbtn">
          <el-button type="primary" @click="selectsp">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message } from 'element-ui'
export default {
  props: ['mbxx', 'showtabs', 'showNum'],
  data() {
    var validdlmc = (rule, value, callback) => { //必填
      if (typeof value == 'number') return callback();
      if (!value) {
        return callback(new Error('内容不能为空'));
      } else {
        value = value.replace(/(^\s*)|(\s*$)/g, ''); //去首尾空格
        if (!value) {
          return callback(new Error('内容不能为空'));
        }
      }
      setTimeout(() => {
        callback();
      }, 400);
    };
    var validadhdbh = (rule, value, callback) => { //添加货道验证
      if (!value) {
        return callback(new Error('货道编号不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入为正整数的数字'));
        } else {
          if (0 < value && value <= 99) {
            if (this.tableData[this.editableTabsValue2].length >= 99) {
              callback(new Error('该机柜货道已满，不能添加新货道.'));
            } else {
              var data = this.tableData[this.editableTabsValue2].find(item => {
                if (value >= 10) {
                  return item.hdbh == (this.editableTabsValue2 + value);
                } else {
                  return item.hdbh == (this.editableTabsValue2 + "0" + value);
                }
              });
              if (data) {
                callback(new Error('该机柜货道已添加货道为' + data.hdbh + '的货道.'));
              } else {
                callback();
              }
            }
          } else {
            callback(new Error('货道编号必须大于0且小于100'));
          }
        }
      }, 500);
    };
    var valiszhdkcyz = (rule, value, callback) => { //阈值验证
      if (!value) {
        return callback(new Error('货道库存阈值不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入为正整数的数字'));
        } else {
          if (0 < value) {
            callback();
          } else {
            callback(new Error('货道库存阈值必须大于0'));
          }
        }
      }, 500);
    };
    var validhdcs = (rule, value, callback) => { //货道层数验证
      if (!value) {
        return callback(new Error('货道层数不能为0或为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入为正整数的数字'));
        } else {
          if (0 < value && value < 10) {
            callback();
          } else {
            callback(new Error('货道层数必须大于0且小于10'));
          }
        }
      }, 500);
    };
    var checkzdhds = (rule, value, callback) => { //最大货道验证
      if (!value) {
        return callback(new Error('最大货道数不能为0或为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入为正整数的数字'));
        } else {
          if (0 < value && value <= 10) {
            callback();
          } else {
            callback(new Error('最大货道数必须大于0且小于等于10'));
          }
        }
      }, 500);
    };
    return {
      tableData: [],
      editableTabsValue2: '1',
      editableTabs2: [{}], //已添加的tabs
      tabIndex: 1,
      dialogVisible: false,
      dialogspxxVisible: false,
      dialogaddVisible: false,
      dialogaddhdVisible: false,
      dialogaddyzVisible: false,
      options: [
        { label: '皮带', value: 1 },
        { label: '弹簧', value: 2 },
      ],
      // 添加机柜
      optionsjg: [ //未添加的tabs
        { label: '主机', value: 0, disabled: false },
        { label: '副机1', value: 1, disabled: false },
        { label: '副机2', value: 2, disabled: false },
        { label: '副机3', value: 3, disabled: false },
        { label: '副机4', value: 4, disabled: false },
      ],
      formaddjg: {
        addjg: '',
        hdcs: '',
        zdhds: '',
      },
      formszyz: {
        szhdkcyz: "", // 设置阈值
      },
      listyzdata: [], //选中的值
      formtjhd: {
        addhdbh: '', //添加货道 
      },
      rules1: {
        zdhds: [{ validator: checkzdhds, trigger: 'blur', required: true }],
        addjg: [{ validator: validdlmc, trigger: 'blur', required: true }],
        hdcs: [{ validator: validhdcs, trigger: 'blur', required: true }],
        szhdkcyz: [{ validator: valiszhdkcyz, trigger: 'blur', required: true }],
        addhdbh: [{ validator: validadhdbh, trigger: 'blur', required: true }],
      },
      forjqcc: { // 机器信息查询表单
        jqxx: '',
      },
      reportjqbh: '', //选择的机器
      jqData: [],
      listmbQuery: { //模板分页
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 50,
      },
      spcc: {
        spxx: '',
      },
      spData: [],
      listspQuery: { //商品分页
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 50,
      },
      selectspxx: {}, // 选择的商品
      selectrow: {}, //修改的货道行
      formline: {}
    }
  },
  created: function() {
    this.initialize();
  },
  watch: {
    dialogspxxVisible: function(data, olddata) {
      if (data) {
        this.spxxQuery();
      }
    },
    showtabs: function(data, olddata) {
      if (data) {
        this.initialize();
      }
    },
    dialogVisible: function(data, olddata) {
      if (data) {
        this.reportjqbh = ''; //初始化导入机器编号
        this.jqxxfind();
      }
    },
    dialogaddVisible: function(data, olddata) {
      this.initializenow(data, 'formaddjg');
    },
    dialogaddhdVisible: function(data, olddata) {
      this.initializenow(data, 'formtjhd');
    },
    dialogaddyzVisible: function(data, olddata) {
      this.initializenow(data, 'formszyz');
    },
    showNum: function(data, olddata) {
      this.initialize();
    },
  },
  methods: {
    handleSizeChange(val) {
      this.listmbQuery.pageSize = val; //修改每页数据量
      this.jqxxfind();
    },
    handleCurrentChange(val) { //跳转第几页
      this.listmbQuery.pageNum = val;
      this.jqxxfind();
    },
    sphandleSizeChange(val) {
      this.listspQuery.pageSize = val; //修改每页数据量
      this.spxxQuery();
    },
    sphandleCurrentChange(val) { //跳转第几页
      this.listspQuery.pageNum = val;
      this.spxxQuery();
    },
    sortChange(column) { //服务器端排序
      if (column.order == "ascending") {
        this.orderBy1 = column.prop + " asc";
      } else if (column.order == "descending") {
        this.orderBy1 = column.prop + " desc";
      }
      // this.onloadtable1();
    },
    handleSelectionChange(val) {
      this.listyzdata = val;
    },
    handleCurrentspChange(val) { //选择的商品
      this.selectspxx = val;
    },
    addhdfun(targetName) { //添加货道
      this.$refs[targetName].validate((valid) => {
        if (valid) {
          //货道编号小于10补0
          let hdbh = this.formtjhd.addhdbh;
          if (hdbh >= 10) {
            hdbh = this.editableTabsValue2 + hdbh;
          } else {
            hdbh = this.editableTabsValue2 + "0" + hdbh;
          }
          this.tableData[this.editableTabsValue2].push({ hdbh: hdbh });
          this.dialogaddhdVisible = false;
          this.$message({ message: '货道添加成功', type: 'success' });
          this.tableDat = this.tableDat;
        } else {
          this.$message({ message: '表单验证未通过', type: 'error' });
          return false;
        }
      });
    },
    removehd(row, index) { //删除货道
      if (this.tableData[this.editableTabsValue2].length > 1) {
        this.tableData[this.editableTabsValue2].splice(index, 1);
      } else {
        this.$message({ message: '机柜货道不能全部删除', type: 'warning' });
      }
    },
    addhdyzfun(targetName) { //修改阈值
      this.$refs['formszyz'].validate((valid) => {
        if (valid) {
          for (var i = 0; i < this.listyzdata.length; i++) {
            this.listyzdata[i].yjyz = this.formszyz.szhdkcyz;
          }
          this.$message({ message: '货道库存阈值成功', type: 'success' });
          this.dialogaddyzVisible = false;
          this.initializemul();
        } else {
          this.initializemul();
          this.$message({ message: '表单验证未通过', type: 'error' });
          return false;
        }
      });
    },
    addTab(targetName) { //添加机柜
      this.$refs['formaddjg'].validate((valid) => {
        if (valid) {
          if (!this.editableTabs2[0].name) { this.editableTabs2.splice(0, 1); }
          this.optionsjg.filter(item => { if (item.value == this.formaddjg.addjg) { item.disabled = true; } });
          let newTabName = this.formaddjg.addjg + '';
          this.editableTabs2.push({
            title: this.optionsjg[this.formaddjg.addjg].label,
            name: newTabName,
          });
          this.editableTabsValue2 = newTabName;
          var tabsdata = [];
          for (let i = 0; i < this.formaddjg.hdcs; i++) {
            for (let j = 1; j <= this.formaddjg.zdhds; j++) {
              if (j < 10) {
                tabsdata.push({ hdbh: this.formaddjg.addjg + "" + i + j });
              } else {
                tabsdata.push({ hdbh: this.formaddjg.addjg + "" + (i + 1) + "0" });
              }
            }
          }
          this.$set(this.tableData, newTabName, tabsdata);
          // this.tableData[newTabName] = tabsdata;
          this.dialogaddVisible = false;
        } else {
          this.$message({ message: '表单验证未通过', type: 'error' });
          return false;
        }
      });
    },
    removeTab(targetName) { //删除机柜
      var sfsc = 0;
      for (var key in this.tableData) {
        if (key && this.tableData[key]) {
          sfsc++;
        }
      }
      console.log(sfsc);
      if (sfsc <= 1) { return this.$message({ message: '货道设置必须保留一个机柜', type: 'warning' }); }
      this.optionsjg[targetName].disabled = false;
      let tabs = this.editableTabs2;
      let activeName = this.editableTabsValue2;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              //清除数组中的元素
              this.tableData.splice(targetName, 1);
            }
          }
        });
      }
      this.editableTabsValue2 = activeName;
      this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      if (this.editableTabs2.length == 0) { this.editableTabs2 = [{}]; }
    },
    jqxxfind: function(val) { //查询模板
      this.oldsp = val;
      this.dialogxzmb = true;
      var queryjqxx = {
        pageNum: this.listmbQuery.pageNum,
        pageSize: this.listmbQuery.pageSize,
        jqxx: this.forjqcc.jqxx,
      }
      request({ url: 'service-machine/mbgl/jqxxQueryByJqSh', method: 'post', data: queryjqxx }).then(response => {
        this.jqData = response.data;
        this.listmbQuery.totalCount = response.total;
        this.loading = false;
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },
    handleCurrentmbChange(val) { //选择的模板
      if (val) {
        this.reportjqbh = val.jqbh;
      }
    },
    removedata(value, lx, index) {
      var title = (lx == "hd") ? '货道' : '机柜';
      this.$confirm('此操作删除该' + title + ',是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
        this.$message({ type: 'success', message: '删除成功!' });
        if (lx == 'hd') { this.removehd(value, index); } else {
          this.removeTab(value);
        }
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' });
      });
    },
    tabclickfun(tab, event) {
      this.initializemul();
      // this.$refs.table[this.editableTabsValue2][0].clearSelection();
      // console.log(this.$refs.table[this.editableTabsValue2]);
      // console.log(this.editableTabsValue2);
    },
    sethdyzsubmit() {
      if (!this.listyzdata.length) { return this.$message({ type: 'warning', message: '未选择机柜货道' }); }
      this.dialogaddyzVisible = true;
    },
    initialize() { //进入货道设置界面进行初始化
      this.formline.mbid = this.mbxx.mbid;
      this.tableData = [];
      this.editableTabs2 = [{}]; //已添加的tabs
      this.optionsjg.filter(item => { item.disabled = false; });
      if (this.mbxx.mbid) {
        for (var key in this.mbxx.hdList) {
          this.optionsjg.filter(item => { if (item.value == key) { item.disabled = true; } });
          let newTabName = key + '';
          this.editableTabs2.push({
            title: this.optionsjg[key].label,
            name: newTabName,
          });
          if (!this.editableTabs2[0].name) { this.editableTabs2.splice(0, 1); }
          this.editableTabsValue2 = newTabName;
          var tabsdata = this.mbxx.hdList[key];

          this.$set(this.tableData, newTabName, tabsdata);
        }
      }
    },
    initializenow(val, formName) { //弹框初始化 
      if (!val) {
        this.$refs[formName].resetFields();
      } else {
        //添加机柜 默认选择下一个未添加机柜
        var nextselect = -1;
        for (let i = 0; i < this.optionsjg.length; i++) {
          if (!this.optionsjg[i].disabled) {
            nextselect = this.optionsjg[i].value;
            break;
          }
        }
        if (nextselect != -1) {
          this.formaddjg.addjg = nextselect;
        } else {
          this.formaddjg.addjg = '';
        }
      }
    },
    initializemul() { //制空多选
      this.listyzdata = [];
      for (var i = 0; i < this.$refs.multipleTable.length; i++) {
        this.$refs.multipleTable[i].clearSelection();
      }
    },
    reporthd() { //导入货道
      if (this.reportjqbh) {
        var queryjqhd = {
          jqbh: this.reportjqbh,
        }
        request({ url: 'service-machine/mbgl/hdxxQueryByJqbh', method: 'post', data: queryjqhd }).then(response => {
          //初始化tab清空
          this.editableTabs2 = [{}];
          this.optionsjg.filter(item => { item.disabled = false; });
          //if (this.editableTabs2[0] && !this.editableTabs2[0].name) { this.editableTabs2.splice(0, 1); }

          for (var key in response.data) {
            if (key) {
              this.optionsjg.filter(item => { if (item.value == key) { item.disabled = true; } });
              if (key == "0") {
                this.editableTabs2.push({ title: "主机", name: key, });
              } else {
                this.editableTabs2.push({ title: "副机" + key, name: key, });
              }

              this.editableTabsValue2 = newTabName;
              let tabsdata = response.data[key];
              console.log(tabsdata);
              this.$set(this.tableData, newTabName, tabsdata);
            }
          }

          this.loading = false;
        }).catch(error => {
          Message.error("error：" + "请检查网络是否连接");
        });
        this.dialogVisible = false;
      } else {
        this.$message({ message: '请选择需要导入的机器', type: 'warning' });
      }
    },
    spSelectShow(row) {
      this.dialogspxxVisible = true;
      this.selectrow = row;
    },
    spxxQuery() {
      //每次查询清空选中
      this.selectspxx = {};
      var queryspxx = {
        pageNum: this.listspQuery.pageNum,
        pageSize: this.listspQuery.pageSize,
        spxx: this.spcc.spxx,
      }
      request({ url: 'service-machine/mbgl/spxxQuery', method: 'post', data: queryspxx }).then(response => {
        this.spData = response.data;
        this.listspQuery.totalCount = response.total;
        this.loading = false;
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },
    selectsp() {
      let hdbh = this.selectrow.hdbh;
      this.selectrow.spmc = this.selectspxx.spmc;
      this.selectrow.spbh = this.selectspxx.spbh;
      this.selectrow.spjg = this.selectspxx.spdj;
      //货道编号发生更改table才会刷新???
      this.selectrow.hdbh = 0;
      this.selectrow.hdbh = hdbh;
      this.dialogspxxVisible = false;
    },
    hdxxSave() {
      this.formline.hdList = this.tableData;

      request({ url: 'service-machine/mbgl/hdmbcz', method: 'post', data: this.formline }).then(response => {
        if (response.msg) {
          this.$message({ type: 'success', message: response.msg });
          if (!this.mbxx.mbid) {
            this.mbxx.mbid = response.mbid;
            this.formline.mbid = response.mbid;
          }
          this.mbxx.hdList = this.tableData;
        }
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      })
    }
  }
}

</script>
<style scoped>
.smain {
  padding: 10px;
  padding-left: 0px;
  margin-left: -5px;
}

.titlebtn {
  z-index: 10;
  position: absolute;
  top: 55px;
  right: 40px;
  /*padding: 13px;*/
}

.el-table {
  border-bottom: 1px solid #ebeef5;
}

.titlebtn .el-button {
  float: left;
  margin: 0 10px;
}

.mbbtn {
  float: right;
  margin-top: -60px;
}

.addjg div.el-input {
  width: 300px;
}

.addjg div.el-select {
  width: 300px;
}

.btnesc {
  margin-right: 40px;
  padding: 10px 30px;
}

.submitboton {
  /*position: relative;*/
  /*left: 10px;*/
  float: right;
  margin: 5px 0 0 0;
}

.submitboton .el-button {
  padding: 10px 30px;
}

.dialogadd {
  margin-top: 20px;
}

</style>
