/**
 * Created by Administrator on 2017/6/21.
 */

import vueZTree from './vueZTree.vue';

// 添加 install 方法   可进行 注册全局组件
vueZTree.install = function(Vue) {
  Vue.component(vueZTree.name, vueZTree);
};

export default vueZTree;

