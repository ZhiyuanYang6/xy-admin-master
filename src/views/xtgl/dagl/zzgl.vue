<template>
  <el-card class="full-tree">
    <div class="left-tree-list">
      <div class="tree-title">
        <div class="names">组织结构</div>
        <div class="operation">操作</div>
      </div>
      <!-- <el-tree v-loading="loading" element-loading-text="加载中..." class="organization-tree" :data="treeData" :props="defaultProps" node-key="nodeId" :expand-on-click-node="false" :render-content="renderContent" highlight-current> -->
      <el-tree v-loading="loading" element-loading-text="加载中..." class="organization-tree" :data="treeData" :props="defaultProps" node-key="nodeId" :expand-on-click-node="false" highlight-current>
        <div style="display:inline-block;width:100%;padding-right:25px;" slot-scope="{ node, data }">
          <span style="font-size:14px;float:left;">{{node.label}}</span>
          <span style="float:right;margin-right:40px;">
              <el-button size="mini" @click='() => editData(node, data)' >修改</el-button>
              <el-button size="mini" @click='() => addData(node, data)'>添加</el-button>
              <el-button size="mini" @click='() => deleteData(node, data)'>删除</el-button>
            </span>
        </div>
      </el-tree>
    </div>
    <!--弹框内容-->
    <el-dialog title="组织管理" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="40%" :before-close="handleClose">
      <el-form :rules="rules" ref="ruleForm" :model="form" label-width="85px">
        <el-form-item label="组织类型" prop="orgtype">
          <el-select v-model="form.orgtype" placeholder="选择组织类型" style="width: 250px">
            <el-option v-for="(value,key) in ORGTYPEAllData" :key="key" :label="value" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组织名称" prop="orgname">
          <el-input v-model.trim="form.orgname" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="组织描述" prop="description">
          <el-input v-model.trim="form.description" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="上级编号" prop="superorgid">
          <el-input disabled v-model.trim="form.superorgid" style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
import { getMyOrgTree, delOrgInfo, newOrgInfo, getOrgById, editOrgInfo } from '@/api/file'
import { getDict } from '@/api/index';

export default {
  name: 'zzgl',
  data() {
    return {
      editOrgData: {},
      receiveData: {},
      receiveStore: {},
      isEdit: false, //判断编辑还是添加
      dialogFormVisible: false, //是否显示对话框
      loading: false, //加载
      treeData: [], //树节点数据
      ORGTYPEAllData: {}, //组织结构数据
      defaultProps: {
        value: 'nodeId',
        label: 'nodeName',
        children: 'childList'
      },
      form: { //表单数据
        orgid: '',
        orgtype: '',
        orgname: '',
        description: '',
        superorgid: ''
      },
      rules: {
        orgtype: [
          { required: true, message: '组织类型不能为空', trigger: 'blur' },
        ],
        orgname: [
          { required: true, message: '组织名称不能为空', trigger: 'blur' },
        ],
      }
    }
  },
  mounted() { // 初始化页面调用函数
    this.initData();
    this.getMyOrgTreeData();
  },
  methods: {
    initData() { // 获取组织类型数据
      getDict('ORGTYPE').then(response => {
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          this.ORGTYPEAllData = response;
        }
      }).catch(error => {
        console.log(error.data);
      });
    },
    getEditData() { // 编辑的时候根据id 获取原本信息
      getOrgById(this.form.orgid).then(response => {
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          this.form = response;
        }
      }).catch(error => {
        console.log(error.data);
      });
    },
    getMyOrgTreeData() { //获取组织服务源数据
      this.loading = true;
      getMyOrgTree().then(response => {
        this.loading = false;
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          this.treeData = response;
        }
      }).catch(error => {
        this.loading = false;
        console.log(error.data);
      });
    },
    editData(store, data) { //修改节点内容
      this.isEdit = true;
      this.dialogFormVisible = true;
      this.form.orgid = data.nodeId;
      this.getEditData();
      this.editOrgData = data;
    },
    addData(store, data) { //添加节点内容
      this.dialogFormVisible = true;
      this.form.superorgid = data.nodeId;
      this.receiveData = data;
      this.receiveStore = store;
    },
    submitForm(formName) { //提交操作 判断是编辑还是添加
      this.$refs[formName].validate(valid => {
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
    // 提交编辑
    submitEdit() {
      this.loading = true;
      editOrgInfo(this.form).then(response => {
        this.loading = false;
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          this.editOrgData.nodeName = this.form.orgname;
          this.editOrgData.orgtype = this.form.orgtype;
          this.editOrgData.description = this.form.description;
          this.dialogFormVisible = false;
          this.form.orgid = '';
          this.form.orgtype = '';
          this.form.orgname = '';
          this.form.description = '';
          this.form.superorgid = this.receiveData.nodeId;
          this.$message({ message: '编辑成功！', type: 'success' });
        }
      }).catch(error => {
        this.loading = false;
        console.log(error.data);
      });
    },
    submitAdd() { // 提交添加
      this.loading = true;
      newOrgInfo(this.form).then(response => {
        this.loading = false;
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          const newChild = { nodeId: response, nodeName: this.form.orgname, childList: [] };
          if (!this.receiveData.childList) {
            this.$set(this.receiveData, 'childList', []);
          }
          this.receiveData.childList.push(newChild);
          this.dialogFormVisible = false;
          this.form.orgid = '';
          this.form.orgtype = '';
          this.form.orgname = '';
          this.form.description = '';
          this.form.superorgid = this.receiveData.nodeId;
          this.$message({ message: '添加成功！', type: 'success' });
        }
      }).catch(error => {
        this.loading = false;
        console.log(error);
      });
    },
    // 删除本节点
    deleteData(store, data) {
      this.$confirm('此操作将删除 "' + data.nodeName + '" 组织, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(({ value }) => {
        this.$message({ message: '删除成功！', type: 'success' });
        delOrgInfo(data.nodeId).then(response => {
          if (response.code) {
            this.$message.error(response.data.msg);
          } else {
            store.remove(data);
            // this.getMyOrgTreeData();  // 重新获取数据
            this.$message({ message: '删除成功！', type: 'success' });
          }
        }).catch(error => {
          console.log(error.data);
        });
      }).catch(() => {});
    },
    //关闭窗口
    handleClose() {
      this.dialogFormVisible = false;
      this.form.orgid = '';
      this.form.orgtype = '';
      this.form.orgname = '';
      this.form.description = '';
      this.form.superorgid = this.editOrgData.nodeId;
    },
    //取消
    handleCancel() {
      this.dialogFormVisible = false;
      this.form.orgid = '';
      this.form.orgtype = '';
      this.form.orgname = '';
      this.form.description = '';
      this.form.superorgid = this.editOrgData.nodeId;
    },
    renderContent(h, { node, data, store }) { //树节点内容区域的渲染
      // return (
      // <div style="display:inline-block;width:100%;padding-right:25px">
      // <span style="font-size:14px;float:left;">{node.label}</span>
      // <span style="float:right;margin-right:40px;">
      // <el-button size="mini" on-click={ () => this.editData(store, data) }>修改</el-button>
      // <el-button size="mini" on-click={ () => this.addData(store, data) }>添加</el-button>
      // <el-button size="mini" on-click={ () => this.deleteData(store, data) }>删除</el-button>
      // </span>
      // </div>
      // );
    }
  }
};

</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.el-form-item
  margin-top 22px
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
.full-tree
  .tree-dropdown
    .el-dropdown-menu__item
      font-size 12px
      line-height 24px
  .organization-tree
    span.el-tree-node__expand-icon
      position relative
      top 0px
  .el-button--mini, .el-button--mini.is-round
    padding 5px 15px

</style>
