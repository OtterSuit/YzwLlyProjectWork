import Cookies from 'js-cookie'

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => {
    const avatar = state.user.avatar || Cookies.get('avatar')
    return avatar
  },
  name: state => {
    const name = state.user.name || Cookies.get('name')
    return name
  },
  userId: state => {
    const userId = state.user.userId || Cookies.get('userId')
    return userId
  },
  sidebar_view: state => state.permission.routes, // sidebar展示的路由
  home: state => state.permission.home, // path为'/'时跳转的路由
  // 登陆用户的菜单
  menusList: state => {
    const menusList = state.user.menusList || Cookies.get('menusList')
    return menusList
  },
  router_permission: state => state.permission.router_permission // 登陆用户路由权限
}
export default getters
