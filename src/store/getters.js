import Cookies from 'js-cookie'
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userInfo: state => {
    const userInfo = state.user.userInfo || JSON.parse(Cookies.get('userInfo'))
    return userInfo
  },
  // 登陆用户的菜单
  menusList: state => {
    const menusList = state.user.menusList || Cookies.get('menusList')
    return menusList
  },
  visitedViews: state => state.tagsView.visitedViews,
  showBack: state => state.tagsView.showBack,
  backName: state => state.tagsView.backName,
  sidebar_view: state => state.permission.routes, // sidebar展示的路由
  home: state => state.permission.home, // path为'/'时跳转的路由
  router_permission: state => state.permission.router_permission // 登陆用户路由权限
}
export default getters
