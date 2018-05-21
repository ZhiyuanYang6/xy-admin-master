<template>
  <div>
    <ul :id="id" class="ztree"></ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import '../../../static/zTree/css/zTreeStyle/zTreeStyle.css'
  import '../../../static/zTree/js/jquery.ztree.core.min'
  import '../../../static/zTree/js/jquery.ztree.excheck.min'

  export default {
    name: 'vue-z-tree',
    data() {
      return {}
    },
    props: {
      id: {
        default: 'vue-z-tree',
        required: false
      },
      zNodes: Array,
      setting: {
        type: Object,
        required: false,
        default() {
          return {}
        }
      },
    },
    mounted() {
      this.initZTree()
    },
    destroy() {
      this.treeObj.destroy();
      this.treeObj = null;
    },
    methods: {
      initZTree() {
        // 初始化 tree
        this.treeObj = $.fn.zTree.init($(`#${this.id}`), this.setting, this.zNodes);
      },
      updateData() {
        this.treeObj.destroy();
        this.$nextTick(() => {
          this.treeObj = $.fn.zTree.init($(`#${this.id}`), this.setting, this.zNodes);
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>

</style>
