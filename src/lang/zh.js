export default {
  route: {
    shj: '售货机',
    wdshj: '我的售货机',
    sy: '首页',
    ztcx: '状态查询',
    jqbj: '机器报警',
    mbgl: '模板管理',
    bywx: '保养维修',
    zdfx: '诊断分析',
    dwgl: '点位管理',
    llk: '流量卡',
    jygl: '交易管理',
    sh: '售后',
    ddgl: '订单管理',
    jqjytj: '机器交易统计',
    jqjymx: '机器交易明细',
    gk: '概括',
    yxch: '营销策划',
    jxcgl: '进销存管理',
    wdgys: '我的供应商',
    gysspsz: '供应商商品设置',
    spgl: '商品管理',
    ccgl: '仓储管理',
    cgjh: '采购计划',
    cgd: '采购单',
    rkdj: '入库登记',
    sfk: '收付款',
    chd: '出货单',
    bs: '报损/回库',
    bhd: '补货单',
    gggl: '广告管理',
    hygl: '会员管理',
    cwgl: '财务管理',
    shgl: '商户管理',
    xtgl: '系统管理',
    // zip: 'Zip',
    // exportZip: 'Export Zip',
    theme: '换肤',
    // clipboardDemo: 'Clipboard',
    i18n: '国际化'
  },
  navbar: {
    logOut: '退出登录',
    dashboard: '首页',
    github: '项目地址',
    setting: '设置',
    screenfull: '全屏',
    theme: '换肤',
    logu: '兴元',
    logd: '网络科技有限公司',
    lang: '中文'
  },
  login: {
    title: '兴元微超后台管理系统',
    logIn: '登录',
    username: '默认账号',
    password: '默认密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    roles: '你的权限',
    switchRoles: '切换权限'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  }
}