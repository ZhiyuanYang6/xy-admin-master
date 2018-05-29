<template>
  <div class="smain">
    <div :class="{'showzz':!editableTabs2.length}"></div>
    <div class="titlebtn">
      <el-button size="mini" :disabled="!editableTabs2.length" type="primary" @click="dialogzctbVisible=true">整层同步</el-button>
      <el-button size="mini" :disabled="!editableTabs2.length" type="primary" @click="dialogzjtbVisible=true">整机同步</el-button>
      <el-button size="mini" type="primary" @click="dialogaddVisible=true">添加机柜</el-button>
      <el-button size="mini" type="primary" @click="dialogVisible=true">导入机器货道</el-button>
      <el-button size="mini" :disabled="!editableTabs2.length" type="primary" @click="dialogaddhdVisible=true">添加货道</el-button>
      <el-button size="mini" :disabled="!editableTabs2.length" type="primary" @click="sethdyzsubmit()">批量设置阈值</el-button>
    </div>
    <el-tabs v-model="editableTabsValue2" type="border-card" closable @tab-remove="removedata" @tab-click="tabclickfun">
      <el-tab-pane v-for="(item, index) in editableTabs2" :key="item.name" :label="item.title" :name="item.name">
        <el-table style="margin-left: 1px;" :data="tableData[item.name]" ref="multipleTable" border max-height="398" @selection-change="handleSelectionChange">
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
          <el-table-column prop="yjyz" label="库存报警阈值" align="center">
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
      <div class="submitboton" v-show="!!editableTabs2.length">
        <el-button size="smain" type="success" @click="hdxxSave">保存设置</el-button>
      </div>
    </el-tabs>
    <!-- 机器模板 -->
    <el-dialog title="导入机器货道" append-to-body class="jqsztk" :visible.sync="dialogVisible" width="70%">
      <div class="addjg ">
        <el-form :inline="true" :model="forjqcc" size="small" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="forjqcc.jqxx" style="width: 350px;" placeholder="机器名称/编号"></el-input>
          </el-form-item>
          <el-button type="warning" :loading="loading" @click="jqxxfind()">查询</el-button>
        </el-form>
        <el-table v-loading="loading" :data="jqData" highlight-current-row @current-change="handleCurrentmbChange" style="width: 100%; cursor: pointer;" border>
          <el-table-column prop="jqbh" label="机器编号" align="center"> </el-table-column>
          <el-table-column prop="jqmc" label="机器名称" align="center"> </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listmbQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listmbQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listmbQuery.totalCount">
        </el-pagination>
        <div class="mbbtn">
          <el-button type="primary" :loading="loading" @click="reporthd">导入</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 添加机柜 -->
    <el-dialog title="添加机柜" append-to-body :visible.sync="dialogaddVisible" width="35%">
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
        <el-form-item label="货道编号">
          <el-input v-model=" formtjhd.addhdbh" style="width:250px;margin-right:30px;" placeholder="请输入内容"></el-input>
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
    <el-dialog title="选择商品(双击选择商品)" class="jqsztk" :visible.sync="dialogspxxVisible" width="70%" append-to-body>
      <div class="smain addjg">
        <el-form :inline="true" :model="spcc" size="small" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="spcc.spxx" style="width: 350px;" placeholder="商品名称/编号"></el-input>
          </el-form-item>
          <el-button type="warning" :loading="loading" @click="spxxQuery()">查询</el-button>
        </el-form>
        <el-table v-loading="loading" :data="spData" highlight-current-row @row-dblclick="selectsp" style="width: 100%; cursor: pointer;" border>
          <el-table-column prop="spbh" label="商品编号" align="center"> </el-table-column>
          <el-table-column prop="spmc" label="商品名称" align="center"> </el-table-column>
          <el-table-column prop="spdj" label="商品价格" align="center"> </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination background @size-change="sphandleSizeChange" @current-change="sphandleCurrentChange" :current-page="listspQuery.currentPage" :page-sizes="[10, 30, 50, 100]" :page-size="listspQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listspQuery.totalCount">
        </el-pagination>
      </div>
    </el-dialog>
    <!-- 整层同步 -->
    <el-dialog title="机柜整层同步" append-to-body :visible.sync="dialogzctbVisible" width="35%">
      <div class="dialogadd"></div>
      <el-form status-icon :model="formjgzctb" size="small" ref="formszyz" class="demo-form-inline" :inline="true">
        <el-form-item label="选择机柜">
          <el-select v-model="formjgzctb.xzjg" clearable placeholder="请选择" @change="selsyncPlies(formjgzctb.xzjg,'选中')" style="width: 300px;">
            <el-option v-for="item in optionsjg" :key="item.value" :label="item.label" :value="item.value" :disabled="!item.disabled">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择层数">
          <el-select v-model="formjgzctb.xzcs" clearable placeholder="请选择" style="width: 300px;">
            <el-option v-for="item in xzcsopt" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="同步机柜">
          <el-select v-model="formjgzctb.tbjg" clearable placeholder="请选择" @change="selsyncPlies(formjgzctb.tbjg,'同步')" style="width: 300px;">
            <el-option v-for="item in optionsjg" :key="item.value" :label="item.label" :value="item.value" :disabled="!item.disabled">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="同步层数">
          <el-select v-model="formjgzctb.tbcs" clearable placeholder="请选择" style="width: 300px;">
            <el-option v-for="item in tbcsopt" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="synccPlies()">同步整层</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 整机同步 -->
    <el-dialog title="机柜整机同步" append-to-body :visible.sync="dialogzjtbVisible" width="35%">
      <div class="dialogadd"></div>
      <el-form status-icon :model="formjgzjtb" size="small" ref="formszyz" :rules="rules1" class="demo-form-inline" :inline="true">
        <el-form-item label="选择机柜" prop="szhdkcyz">
          <el-select v-model="formjgzjtb.xzjg" clearable placeholder="请选择" style="width: 300px;">
            <el-option v-for="item in optionsjg" :key="item.value" :label="item.label" :value="item.value" :disabled="!item.disabled">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="同步机柜" prop="szhdkcyz">
          <el-select v-model="formjgzjtb.tbjg" clearable placeholder="请选择" style="width: 300px;">
            <el-option v-for="item in optionsjg" :key="item.value" :label="item.label" :value="item.value" :disabled="!item.disabled">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="synccMachin()">同步整机</el-button>
        </el-form-item>
      </el-form>
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
      editableTabs2: [], //已添加的tabs
      tabIndex: 1,
      dialogVisible: false,
      dialogspxxVisible: false,
      dialogaddVisible: false,
      dialogaddhdVisible: false,
      dialogaddyzVisible: false,
      dialogzctbVisible: false,
      dialogzjtbVisible: false,
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
        { label: '副机5', value: 5, disabled: false },
        { label: '副机6', value: 6, disabled: false },
        { label: '副机7', value: 7, disabled: false },
        { label: '副机8', value: 8, disabled: false },
        { label: '副机9', value: 9, disabled: false },
      ],
      formaddjg: {
        addjg: '',
        hdcs: '',
        zdhds: '',
      },
      formjgzjtb: {
        xzjg: '',
        tbjg: '',
      },
      formjgzctb: {
        xzjg: "",
        xzcs: "",
        tbjg: "",
        tbcs: "",
      },
      xzcsopt: [],
      tbcsopt: [],
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
      loading: false,
      spData: [],
      listspQuery: { //商品分页
        pageSize: 10, //默认每页的数据量
        currentPage: 1, //当前页码
        pageNum: 1, //查询的页码
        totalCount: 50,
      },
      selectrow: {}, //修改的货道行
      formline: {}
    };
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
    showtabs: function(data, olddata) {
      this.formline.mbid = this.mbxx.mbid;
      this.editableTabs2 = []; //初始化清空机柜
      this.tableData = []; //清空货道
      this.optionsjg.forEach(item => item.disabled = false);
      for (let item in this.mbxx.hdList) { //添加机柜
        this.optionsjg[item].disabled = true;
        this.editableTabs2.push({
          title: this.optionsjg[item].label,
          name: item,
        });
        this.editableTabsValue2 = item;
        this.tableData.push(this.mbxx.hdList[item]);
      }
    },
  },
  methods: {
    initialize() { //进入货道设置界面进行初始化
      this.formline.mbid = this.mbxx.mbid;
      this.tableData = [];
      this.editableTabs2 = []; //已添加的tabs
      this.optionsjg.forEach(item => item.disabled = false);
    },
    addTab(targetName) { //添加机柜
      this.$refs['formaddjg'].validate((valid) => {
        if (valid) {
          // if (!this.editableTabs2[0].name) { this.editableTabs2.splice(0, 1); }
          this.optionsjg.filter(item => {
            if (item.value === this.formaddjg.addjg) {
              item.disabled = true;
            }
          });
          let newTabName = this.formaddjg.addjg + '';
          this.editableTabs2.push({
            title: this.optionsjg[this.formaddjg.addjg].label,
            name: newTabName,
            hdcs: this.formaddjg.hdcs,
            zdhds: this.formaddjg.zdhds,
          });
          this.editableTabsValue2 = newTabName;
          var tabsdata = [];
          for (let i = 0; i < this.formaddjg.hdcs; i++) {
            for (let j = 1; j <= this.formaddjg.zdhds; j++) {
              (j < 10) ? tabsdata.push({ hdbh: this.formaddjg.addjg + "" + i + j }): tabsdata.push({ hdbh: this.formaddjg.addjg + "" + (i + 1) + "0" });
            }
          }
          this.mbxx.hdList = this.tableData; //保存货道信息
          this.mbxx.editableTabsValue2 = this.editableTabsValue2; //保存机柜信息
          this.mbxx.editableTabs2 = this.editableTabs2; //保存active机柜
          this.$set(this.tableData, newTabName, tabsdata);
          this.dialogaddVisible = false;
        } else {
          this.$message({ message: '表单验证未通过', type: 'error' });
          return false;
        }
      });
    },
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
    handleSelectionChange(val) { //选中的货道
      this.listyzdata = val;
    },
    removehd(row, index) { //删除货道
      if (this.tableData[this.editableTabsValue2].length > 1) {
        this.tableData[this.editableTabsValue2].splice(index, 1);
        this.$message({ type: 'success', message: '删除成功!' });
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
    removeTab(targetName) { //删除机柜
      if (this.editableTabs2.length <= 1) { return this.$message({ message: '货道设置必须保留一个机柜', type: 'warning' }); }
      this.optionsjg[targetName].disabled = false;
      let tabs = this.editableTabs2;
      let activeName = this.editableTabsValue2;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name; //清除数组中的元素
              this.tableData.splice(targetName, 1);
            }
          }
        });
      }
      this.editableTabsValue2 = activeName;
      this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      this.$message({ type: 'success', message: '删除成功!' });
    },
    jqxxfind: function(val) { //机器货道模板查询
      var queryjqxx = {
        pageNum: this.listmbQuery.pageNum,
        pageSize: this.listmbQuery.pageSize,
        jqxx: this.forjqcc.jqxx,
      };
      this.loading = true;
      request({ url: 'service-machine/mbgl/jqxxQueryByJqSh', method: 'post', data: queryjqxx }).then(response => {
        this.jqData = response.data;
        this.listmbQuery.totalCount = response.total;
        this.loading = false;
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },
    handleCurrentmbChange(val) { //选中的机器货道模板
      if (val) {
        this.reportjqbh = val.jqbh;
      }
    },
    removedata(value, lx, index) { //删除货道机柜
      var title = (lx === "hd") ? '货道' : '机柜';
      this.$confirm('此操作删除该' + title + ',是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
        (lx === 'hd') ? this.removehd(value, index): this.removeTab(value);
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' });
      });
    },
    tabclickfun(tab, event) {
      this.initializemul();
    },
    sethdyzsubmit() { //设置阈值
      if (!this.listyzdata.length) { return this.$message({ type: 'warning', message: '未选择机柜货道' }); }
      this.dialogaddyzVisible = true;
    },
    initializenow(val, formName) { //弹框初始化 
      if (!val) {
        this.$refs[formName].resetFields();
      } else { //添加机柜 默认选择下一个未添加机柜
        for (let i = 0; i < this.optionsjg.length; i++) {
          if (!this.optionsjg[i].disabled) {
            this.formaddjg.addjg = this.optionsjg[i].value;
            break;
          } else {
            this.formaddjg.addjg = '';
          }
        }
        // debugger;
      }
    },
    initializemul() { //清空多选
      this.listyzdata = [];
      for (var i = 0; i < this.$refs.multipleTable.length; i++) {
        this.$refs.multipleTable[i].clearSelection();
      }
    },
    reporthd() { //导入机器货道模板
      if (!this.reportjqbh) { return this.$message({ type: 'warning', message: '请选择需要导入的机器' }); }
      this.loading = true;
      request({ url: 'service-machine/mbgl/hdxxQueryByJqbh', method: 'post', data: { jqbh: this.reportjqbh } }).then(response => {
        this.editableTabs2 = []; //初始化清空机柜
        this.tableData = []; //清空货道
        for (let item in response.data) { //添加机柜
          this.optionsjg[item].disabled = true;
          this.editableTabs2.push({
            title: this.optionsjg[item].label,
            name: item,
          });
          this.editableTabsValue2 = item;
          this.tableData.push(response.data[item]);
        }
        this.loading = false;
        this.dialogVisible = false;
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },
    spSelectShow(row) {
      this.dialogspxxVisible = true;
      this.selectrow = row;
    },
    spxxQuery() { //查询商品模板 
      var queryspxx = {
        pageNum: this.listspQuery.pageNum,
        pageSize: this.listspQuery.pageSize,
        spxx: this.spcc.spxx,
      };
      this.loading = true;
      request({ url: 'service-machine/mbgl/spxxQuery', method: 'post', data: queryspxx }).then(response => {
        this.spData = response.data;
        this.listspQuery.totalCount = response.total;
        this.loading = false;
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },
    addhdfun(targetName) { //添加货道
      if (this.formtjhd.addhdbh.indexOf(',') !== -1) {
        let listaddhd = this.formtjhd.addhdbh.split(',');
        let listaddhdqc = [];
        let hdbharr = '';
        for (let item of listaddhd) { //去重
          if (listaddhdqc.indexOf(item) === -1) { //判断在s数组中是否存在，不存在则push到s数组中
            listaddhdqc.push(item);
          }
        }
        for (let i = 0; i < listaddhdqc.length; i++) { // 规则 验证
          hdbharr = listaddhdqc[i];
          (hdbharr >= 10) ? hdbharr = this.editableTabsValue2 + hdbharr: hdbharr = this.editableTabsValue2 + "0" + hdbharr; //货道编号小于10补0
          if (this.validadhdbh(hdbharr)) { return; }
        }
        listaddhdqc.forEach(item => { //添加多个货道
          this.tableData[this.editableTabsValue2].push({ hdbh: item >= 10 ? this.editableTabsValue2 + item : item = this.editableTabsValue2 + "0" + item });
        });
      } else { //添加单个货道
        var hdbh = this.formtjhd.addhdbh;
        (hdbh >= 10) ? hdbh = this.editableTabsValue2 + hdbh: hdbh = this.editableTabsValue2 + "0" + hdbh; //货道编号小于10补0
        if (this.validadhdbh(hdbh)) { return; }
        this.tableData[this.editableTabsValue2].push({ hdbh: hdbh });
      }
      this.$message({ message: '货道添加成功', type: 'success' });
      this.dialogaddhdVisible = false;
      this.formtjhd.addhdbh = '';
    },
    validadhdbh(hdbh) { //货道验证
      if (!hdbh) {
        this.$message({ message: '货道编号不能为空', type: 'warning' });
        return true;
      } else if (hdbh - 0 > 0 && hdbh - 0 < 1000) {
        var data = this.tableData[this.editableTabsValue2].find(item => {
          if (item.hdbh === hdbh) {
            this.$message({ message: '货道编号 ' + hdbh + ' 已添加', type: 'warning' });
          }
          return item.hdbh === hdbh;
        });
        return data;
      } else {
        this.$message({ message: '货道编号格式有误', type: 'warning' });
        return true;
      }
    },
    selsyncPlies(val, lx) { //选中同步层数
      this.tbcsopt = [];
      this.xzcsopt = [];
      for (let i = 0; i < this.editableTabs2[val].hdcs; i++) {
        if (lx === '同步') {
          let n = i - 0 + 1;
          this.tbcsopt.push({ label: '第 ' + n + ' 层 , 编号：0' + i + "1~0" + n + '0', value: n * 10 });
        } else {
          let n = i - 0 + 1;
          this.xzcsopt.push({ label: '第 ' + n + ' 层 , 编号：0' + i + "1~0" + n + '0', value: n * 10 });
        }
      }
    },
    synccPlies() { //同步整层

      let xzcsrow = [];
      let tbcsrow = [];
      let mix = this.formjgzctb.xzcs - 10;
      let max = this.formjgzctb.xzcs;
      let tmix = this.formjgzctb.tbcs - 10;
      let tmax = this.formjgzctb.tbcs;
      this.tableData[this.formjgzctb.xzjg + ''].forEach(item => {
        let xzbh = item.hdbh.slice(1, 3) - 0;
        if (xzbh < max && xzbh > mix) {
          xzcsrow.push(JSON.parse(JSON.stringify(item)));
        }
      });
      xzcsrow.forEach(item => {
        for (var i = 0; i < this.tableData[this.formjgzctb.tbjg + ''].length; i++) {
          let tbbhfz = this.tableData[this.formjgzctb.tbjg + ''][i].hdbh.slice(1, 3) - 0;
          if (tbbhfz < tmax && tbbhfz > tmix) {
            let addarrycs = JSON.parse(JSON.stringify(item));
            addarrycs.hdbh = "0" + tbbhfz;
            this.$set(this.tableData[this.formjgzctb.tbjg + ''], i + '', addarrycs);
          }
        }
      });
      this.formjgzctb = { xzjg: "", xzcs: "", tbjg: "", tbcs: "" };
      this.dialogzctbVisible = false;
    },
    synccMachin() { //整机同步
      if (this.formjgzjtb.tbjg === this.formjgzjtb.xzjg) { return this.$message({ message: '选择机柜与同步机柜不能相同', type: 'warning' }); }
      if (this.formjgzjtb.tbjg + '' || this.formjgzjtb.xzjg + '') {
        this.tableData[this.formjgzjtb.tbjg + ''] = [];
        this.tableData[this.formjgzjtb.xzjg + ''].forEach(item => {
          let addarry = JSON.parse(JSON.stringify(item));
          addarry.hdbh = addarry.hdbh.replace(this.formjgzjtb.xzjg + '', this.formjgzjtb.tbjg + '');
          this.tableData[this.formjgzjtb.tbjg + ''].push(addarry);
        });
        this.dialogzjtbVisible = false;
      } else {
        this.$message({ message: '选择机柜与同步机柜不能为空', type: 'warning' });
      }
    },
    selectsp(row) { //货道编号发生更改table才会刷新???
      let hdbh = this.selectrow.hdbh;
      this.selectrow.spmc = row.spmc;
      this.selectrow.spbh = row.spbh;
      this.selectrow.spjg = row.spdj;
      this.selectrow.hdbh = 0;
      this.selectrow.hdbh = hdbh;
      this.dialogspxxVisible = false;
    },
    hdxxSave() {
      this.formline.hdList = this.tableData;
      this.mbxx.hdList = this.tableData;
      // console.log(this.mbxx);
      // debugger;
      request({ url: 'service-machine/mbgl/hdmbcz', method: 'post', data: this.formline }).then(response => {
        if (response.msg) {
          this.$message({ type: 'success', message: response.msg });
          if (!this.mbxx.mbid) {
            this.mbxx.mbid = response.mbid;
            this.formline.mbid = response.mbid;
          }
        }
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    }
  }
}

</script>
<style scoped>
.showzz {
  width: 100%;
  z-index: 3;
  background: #F5F7FA;
  position: absolute;
  height: 40px;
}

.el-tab-pane div.smain {
  position: relative;
  padding: 35px 0 10px 0;
  margin-left: -5px;
}

.titlebtn {
  z-index: 10;
  position: absolute;
  top: -5px;
  right: 80px;
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

.addjg {
  padding: 20px 1px 1px 1px;
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

.dialog add {
  margin-top: 20px;
}

</style>
<style>
.jqsztk .el-table__body tr td {
  padding: 5px;
}

</style>
