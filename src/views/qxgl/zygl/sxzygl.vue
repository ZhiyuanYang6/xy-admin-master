<template>
  <el-card class="full-card">
    <div class="top-tool">
  <!--           <el-form size="medium" :model="toData" :inline="true" ref="ruleForm">
        <el-form-item>
          <el-select class="form-item-width" v-model="toData.systemid" clearable placeholder="系统名称">
            <el-option v-for="(value,key) in ALLSYSTEMAllData" :key="key" :label="value" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select class="form-item-width" v-model="toData.resourcetype" clearable placeholder="资源类型">
            <el-option v-for="(value,key) in TREETYPEAllData" v-if="key!=='t10'" :key="key" :label="value" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="top-button" icon="el-icon-search" :loading="loading" type="primary" @click="searchForm">
            查&nbsp;询
          </el-button>
        </el-form-item>
      </el-form> -->
    </div>
    <div class="left-tree-list">
      <div class="tree-title">
        <div class="names">树形资源</div>
        <div class="operation">操作</div>
      </div>
      <el-tree v-loading="loading" element-loading-text="加载中..." class="resource-tree" :data="treeData" :props="defaultProps" node-key="resourceid" :expand-on-click-node="false" :render-content="renderContent" highlight-current>
      </el-tree>
    </div>
    <!--弹框内容-->
    <el-dialog title="资源信息" :visible.sync="dialogFormVisible" width="40%" :before-close="handleClose">
      <el-form ref="ruleForm" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="form.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="资源地址" prop="url">
          <el-input v-model="form.url" style="width: 250px"></el-input>
        </el-form-item>
                  <el-form-item label="排序编号">
            <el-input v-model.trim="form.orderNo" style="width: 250px"></el-input>
          </el-form-item>
        <el-form-item v-if="isEdit" label="上级节点编号" prop="fatherId">
          <el-input v-model.trim="form.fatherId" style="width: 250px" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button :loading="loading" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
import { getDicts } from '@/api/index'
import { getMyOrgTree, delOrgInfo } from '@/api/file'
import { generateTitle } from '@/utils/i18n'
import { findTreeResourceInfo, delResourceInfo, getResourceInfoById, editResourceInfo, saveResourceInfo } from '@/api/resource'
export default {
  data() {
    return {
      loading: false,
      isEdit: false,
      dialogFormVisible: false,
      editData: {},
      editStore: {},
      receiveData: {},
      receiveStore: {},
      treeData: [], // 组织服务数据
      TREETYPEAllData: [], //保存资源类型   源数据
      ALLSYSTEMAllData: [], //系统名称   源数据
      toData: { //查询树形资源数据
                        systemid: this.$store.state.user.systemid, //系统名称
        // resourcetype: this.$store.state.user.resourcetype, //资源类型
        // systemid: null, //系统名称
        resourcetype: "t0" //资源类型
      },
      defaultProps: { //默认属性
        value: 'resourceid',
        label: 'name',
        children: 'childList'
      },
      form: { //表单内容
        resourcetype: '',
        systemid: '',
        isTree: 1,
        name: '',
        url: '',
        fatherId: '',
        orderNo: '', //排序
      },
      rules: {
        name: [
          { required: true, message: '请输入资源名称', trigger: 'blur' },
        ],
      },
    };
  },
  created() { // 初始化页面调用函数
    this.initData();
    this.getTreeData();
    // let router =generateTitle('shj');
    // console.log(router);
  },
  methods: {
    generateTitle,
    initData() { // 获取资源类型和系统类型数据
      getDicts('treeResourceType,ALLSYSTEM').then(response => {
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          this.TREETYPEAllData = response.treeResourceType;
          this.ALLSYSTEMAllData = response.ALLSYSTEM;
        }
      }).catch(error => {
        console.log(error.data);
      });
    },
    getTreeData() { //获取树形数据
      this.loading = true;
      findTreeResourceInfo(this.toData).then(response => {
        this.loading = false;
        if (response.code) {
          this.treeData = [];
          this.$message.error(response.data.msg);
        } else {
          this.treeData = response;
        }
      }).catch(error => {
        this.loading = false;
        console.log(error.data);
      });
    },
    getEditData() { // 编辑的时候根据id 获取原本信息
      getResourceInfoById(this.form.resourceid).then(response => {
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          this.form = response;
        }
      }).catch(error => {
        console.log(error.data);
      });
    },

    editResourceData(store, data) { //修改节点内容
      this.isEdit = true;
      this.dialogFormVisible = true;
      this.form.resourceid = data.resourceid;
      this.getEditData();
      this.editData = data;
    },
    addResourceData(store, data) { //添加节点内容
      this.isEdit = false;
      this.dialogFormVisible = true;
      this.form.fatherId = data.resourceid;
      this.receiveData = data;
      this.receiveStore = store;
    },
    submitForm(formName) {
      this.form.orderNo='';
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            this.submitEdit();
            this.isEdit = false;
          } else {
            this.submitAdd();
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitEdit() { // 提交编辑
      this.loading = true;
      editResourceInfo(this.form).then(response => {
        this.loading = false;
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          this.editData.name = this.form.name;
          this.editData.url = this.form.url;
          this.$message({ message: '编辑成功！', type: 'success' });
          this.dialogFormVisible = false;
          this.form.name = '';
          this.form.url = '';
          this.form.fatherId = this.receiveData.resourceid;
        }
      }).catch(error => {
        this.loading = false;
        console.log(error.data);
      });
    },
    submitAdd() { // 提交添加
      this.loading = true;
      this.form.resourcetype = this.toData.resourcetype;
      this.form.systemid = this.toData.systemid;
      this.form.resourceid && (this.form.resourceid = null)
      saveResourceInfo(this.form).then(response => {
        this.loading = false;
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          this.receiveStore.append({ resourceid: response, name: this.form.name, children: [] }, this.receiveData);
          this.dialogFormVisible = false;
          this.form.name = '';
          this.form.url = '';
          this.form.fatherId = this.receiveData.resourceid;
          this.$message({ message: '添加成功！', type: 'success' });
        }
      }).catch(error => {
        this.loading = false;
        console.log(error);
      });
    },
    searchForm() { //获取树形数据
      this.getTreeData();
    },
    deleteResourceData(store, data) { // 删除本节点
      this.$confirm('此操作将删除 "' + data.name + '", 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(({ value }) => {
        delResourceInfo(data.resourceid).then(response => {
          if (response.code) {
            this.$message.error(response.data.msg);
          } else {
            store.remove(data);
            this.$message({ message: '删除成功！', type: 'success' });
          }
        }).catch(error => {
          console.log(error);
        });
      }).catch(() => {});
    },
    handleClose() { //关闭窗口
      this.dialogFormVisible = false;
      this.form.name = '';
      this.form.url = '';
    },
    handleCancel() { //取消
      this.dialogFormVisible = false;
      this.form.name = '';
      this.form.url = '';
    },
    renderContent(h, { node, data, store }) { //树节点内容区域的渲染
      return (
        <div style="display:inline-block;width:100%;padding-right:25px">
        <span style="font-size:14px;float:left;">{node.label}</span>
        <span style="float:right;margin-right:40px;">
        <el-button size="mini" on-click={ () => this.editResourceData(store, data) }>修改</el-button>
        <el-button size="mini" on-click={ () => this.addResourceData(store, data) }>添加</el-button>
        <el-button size="mini" on-click={ () => this.deleteResourceData(store, data) }>删除</el-button>
        </span>
        </div>
      );
    }
  }
}

</script>
<style lang="stylus" scoped>
.el-form-item
  margin 15px 0px
.left-tree-list
  width 800px
  .tree-title
    display flex
    justify-content space-between
    font-size 16px
    color #20a0ff
    line-height 30px
    .names
      width 150px
      text-align center
    .operation
      margin-right 140px

</style>
<style lang="stylus">
.full-card
 .tree-dropdown
   .el-dropdown-menu__item
     font-size 12px
     line-height 24px
 .resource-tree
   span.el-tree-node__expand-icon
     position relative
     top 0px
 .el-button--mini, .el-button--mini.is-round
   padding 5px 15px

</style>
