const getters = {
  // sidebar: state => state.app.sidebar,
  // token: state => state.user.token,
  // avatar: state => state.user.avatar,
  // name: state => state.user.name,
  // roles: state => state.user.roles
  permission_routers: state => state.user.routers, //动态路由
  sidebar: state => state.app.sidebar, //侧边栏是否隐藏
  jqbjtreedata: state => state.plug.jqbjtreedata, //机器报警树结构
  language: state => state.app.language, //语言
  token: state => state.user.token, //登陆安全码
  avatar: state => state.user.avatar, //用户资料
  userInfo: state => state.user.userInfo, //用户资料
  name: state => state.user.name, //用户名-
  roles: state => state.user.roles, //用户资料
  imgurl: state => state.user.spurlImg, //图片路径
  visitedViews: state => state.tagsView.visitedViews, //访问视图
  cachedViews: state => state.tagsView.cachedViews, //缓存的视图
}
export default getters
