<template>
  <el-card class="full-card">
    <div class="top-tool">
      <el-form size="medium" :model="toData" :inline="true" ref="ruleForm">
        <!-- <el-form-item>
          <el-select class="form-item-width" v-model="toData.systemid" clearable placeholder="选择系统名称">
            <el-option v-for="(value,key) in ALLSYSTEMAllData" :key="key" :label="value" :value="key"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-select class="form-item-width" v-model="toData.resourcetype" clearable placeholder="选择资源类型" @change="changed">
            <el-option v-for="(value,key) in RESOURCETYPEAllData" :key="key" :label="value.label" :value="value.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="toData.resourcetype==='2'">
          <el-cascader v-model.trim="toData.orgidCope" clearable :options="organizationData" style="width:200px;" :props="props" placeholder="选择所属组织" :change-on-select=true></el-cascader>
        </el-form-item>
        <el-form-item v-show="toData.resourcetype==='2'">
          <el-input class="form-item-width" v-model.trim="toData.name" style="width:200px;" placeholder="资源名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="top-button" icon="el-icon-search" :loading="loading" type="primary" @click="getData">
            查&nbsp;询
          </el-button>
        </el-form-item>
      </el-form>
      <span style="float:right;padding-right:20px;font-size:14px;">当前角色：{{name}}</span>
    </div>
    <!--普通资源列表-->
    <el-table v-show="toData.resourcetype==='2'" ref="multipleTable" :data="tableData" border highlight-current-row stripe v-loading="loading" element-loading-text="加载中..." @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="resourceid" label="资源编号" width="100"></el-table-column>
      <el-table-column prop="name" label="资源名称" width="300" show-overflow-tooltip></el-table-column>
      <el-table-column prop="url" label="资源" show-overflow-tooltip></el-table-column>
    </el-table>
    <!--树形资源列表-->
    <div class="wrapper" v-show="toData.resourcetype!=='2'">
      <div class="tree-resource-list">树形资源列表</div>
      <el-tree default-expand-all :props="propsmenu" :data="treeData" ref="tree" node-key="resourceid" show-checkbox></el-tree>
      <!-- <vue-z-tree ref="zTree2" :zNodes="treeData" :setting="treeSetting"></vue-z-tree> -->
    </div>
    <!--普通资源按钮-->
    <div class="page-block">
      <el-button-group class="btnCenter">
        <el-button @click="submitSetting" :loading="loading" type="primary">保存</el-button>
        <el-button @click="goLastPath" type="primary">返回</el-button>
      </el-button-group>
    </div>
  </el-card>
</template>
<script>
import { getDicts } from '@/api/index'
import request from '@/utils/request'
import { findRoleresource, setRoleResource } from '@/api/authority'
// import { unique } from '@/filters/index'
// import vueZTree from '@/components/vueZTree'


export default {
  // components: { vueZTree },
  data() {
    return {
      isTree: false,
      loading: false,
      tableData: [],
      multipleSelection: [],
      ALLSYSTEMAllData: [],
      RESOURCETYPEAllData: [],
      organizationData: [], // 组织源数据
      name: '',
      toData: {
        systemid: 'sram',
        resourcetype: '2',
        roleid: '',
        orgidCope: [],
      },
      toParam: {
        roleId: '',
        resourceIds: '',
        systemid: 'sram',
        resourcetype: '2',
      },
      treeData: [],
      treeSetting: {
        check: {
          chkStyle: "checkbox",
          enable: true,
          chkboxType: {
            Y: "ps", // 勾选时       p 关联父 ，s关联子
            N: "ps" // 取消勾选时    p 关联父 ，s关联子
          }
        },
        data: {
          key: {
            children: "childList",
            name: "name"
          }
        },
      },
      props: {
        value: 'nodeId',
        label: 'nodeName',
        children: 'childList'
      },
      propsmenu: {
        value: 'resourceid',
        label: 'name',
        children: 'childList'
      }
    };
  },
  mounted() {
    this.name = this.$route.query.name; //获取角色名称
    //获取角色roleid
    this.toParam.roleId = Number(this.$route.query.roleid); //获取本页面的roleid
    this.toData.roleid = Number(this.$route.query.roleid);
    this.initData(); // 查询并且初始化页面数据
    this.getResourceData();
  },
  methods: {
    initData() { // 获取资源类型和系统类型数据
      request({ url: '/sram/archives/getMyOrgTree', method: 'post' }).then(response => {
        this.organizationData = response;
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
      // getDicts('resourceTypeView,ALLSYSTEM').then(response => {
      // if (response.code) {
      // this.$message.error(response.data.msg);
      // } else {
      this.RESOURCETYPEAllData = [
        { value: '2', label: 'URL' },
        { value: 't0', label: '功能权限' },
      ];
      // this.ALLSYSTEMAllData = response.ALLSYSTEM;
      // }
      // }).catch(error => {
      // console.log(error);
      // });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //根据资源类型处理数据
    getData() {
      // console.log(this.toData.resourcetype.indexOf('t'))
      // if (this.toData.resourcetype.indexOf('t') === -1) {
      //   this.isTree = false;
      // } else {
      //   this.isTree = true;
      // }
      if (this.toData.resourcetype === '2') {
        this.getResourceData();
      } else {
        this.getTreeResourceData();
      }
    },
    //获取普通资源数据
    getResourceData() {
      this.loading = true;
      findRoleresource(this.toData).then(response => {
        this.loading = false;
        if (response.code) {
          this.tableData = [];
          this.total = 0;
          this.$message.error(response.data.msg);
        } else {
          this.tableData = response;
          // this.$nextTick(() => { this.filterCheckedRows(); })
        }
      }).catch(error => {
        this.tableData = [];
        this.total = 0;
        this.loading = false;
        console.log(error);
      });
    },
    getTreeResourceData() { //获取树形资源数据
      let newData = {
        systemid: this.toData.systemid,
        resourcetype: 't0',
        roleid: this.toData.roleid,
      };
      this.loading = true;
      findRoleresource(newData).then(response => {
        this.loading = false;
        if (response.code) {
          this.treeData = [];
          this.total = 0;
          this.$message.error(response.data.msg);
        } else {
          this.treeData = [];
          this.treeData.push(response);
        }
      }).catch(error => {
        this.treeData = [];
        this.total = 0;
        this.loading = false;
        console.log(error);
      });
    },
    handleCommonPreserve() { //保存普通资源数据
      this.loading = true;
      this.toParam.resourcetype = this.toData.resourcetype;
      this.toParam.systemid = this.toData.systemid;
      this.toParam.resourceIds = this.multipleSelection.map(s => s.resourceid).join();
      setRoleResource(this.toParam).then(response => {
        this.loading = false;
        if (response.code) {
          this.$message.error(response.msg);
        } else {
          this.$message({ message: '保存成功！', type: 'success' });
        }
      }).catch(error => {
        this.loading = false;
        console.log(error);
      });
    },
    //保存树形资源数据
    handleTreePreserve() {
      let newSubmitData = {
        systemid: this.toData.systemid,
        resourcetype: 't0',
        roleId: this.toData.roleid,
        resourceIds: this.$refs.tree.getCheckedKeys().join()
      };
      this.loading = true;
      setRoleResource(newSubmitData).then(response => {
        this.loading = false;
        if (response.code) {
          this.$message.error(response.data.msg);
        } else {
          this.$message({ message: '保存成功！', type: 'success' });
        }
      }).catch(error => {
        this.loading = false;
        console.log(error);
      });
    },
    filterCheckedRows() {
      this.tableData.filter(s => s.grantFlag === 1).forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row);
      });
    },

    changed(val) { //选中资源类型时触发
      // val.indexOf("t") !== -1 && (this.treeSetting.check.chkboxType = this.treeTypeConfig(val));
      if (this.toData.resourcetype === '2') {
        this.getResourceData();
      } else {
        this.getTreeResourceData();
      }
    },

    handerDefaultCheked(treeDatas) { //对树形资源数据进行处理
      loopTreeData(treeDatas);

      function loopTreeData(treeDatas) {
        for (let i = 0; i < treeDatas.length; i++) {
          treeDatas[i].url = null;
          if (treeDatas[i].grantFlag == 1) {
            treeDatas[i].checked = true
          } else {
            treeDatas[i].checked = false
          }
          if (Array.isArray(treeDatas[i].childList) && treeDatas[i].childList.length > 0) {
            loopTreeData(treeDatas[i].childList)
          }
        }
      }

      return treeDatas
    },
    submitSetting() {
      if (this.toData.resourcetype === '2') {
        this.handleCommonPreserve();
      } else {
        this.handleTreePreserve();
      }
    },
    goLastPath() { //返回上一页面
      this.$router.go(-1);
    },
    treeTypeConfig(val) {
      const type = { Y: '', N: '', };
      const reg = /.*-/;
      const newData = val.replace(reg, '').split('');
      newData.forEach((v, i) => {
        if (i === 0 && v === '1') {
          type.Y = 'p'
        } else if (i === 1 && v === '1') {
          type.Y += 's'
        } else if (i === 2 && v === '1') {
          type.N = 'p'
        } else if (i === 3 && v === '1') {
          type.N += 's'
        }
      })
      // console.log('type', type);
      return type;
    }
  }
}

</script>
<style lang="stylus" scoped>
  .tree-resource-list
    padding-left 10px
    border 1px solid #ddd
    border-bottom 1px solid transparent
    background #eef1f6
    font-size 14px
    height 40px
    line-height 40px
    padding-right 20px
.page-block
  margin 20px 0

</style>
