import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import ShopManage from '../views/ShopManage.vue'
import DeskManage from '../views/DeskManage.vue'
import OrderManage from '../views/OrderManage.vue'
import MenuManage from '../views/MenuManage.vue'

import ShopAdd from '../views/ShopAdd.vue'
import MenuAdd from '../views/MenuAdd.vue'
import RouterControl from '../views/RouterControl.vue'

// let routeControler = (to, from, next) => {
//   let username = localStorage.getItem('username')
//   if(username) {
//     if(to.path.indexOf('/login') >= 0) {
//       next('/view/main/shopmanage')
//     } else {
//       next()  
//     }
//   } else {
//     next('/view/login')
//   }
  
// }

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // { path: '/view/menu/:id/:id', component: MenuView},
    { path: '/', component: RouterControl},
    { path: '/view/login', component: Login},
    { path: '/view/main', component: Main, children: [
    	{ path: 'shopmanage', component: ShopManage},
    	{ path: 'deskmanage', component: DeskManage},
    	{ path: 'ordermanage', component: OrderManage},
    	{ path: 'menumanage', component: MenuManage},
    	{ path: 'shopadd', component: ShopAdd},
      { path: 'shopadd/:id', component: ShopAdd},
    	{ path: 'menuadd', component: MenuAdd},
    	{ path: 'menuadd/:id', component: MenuAdd},
      { path: '', component: ShopManage},
    ]},
    
  ]
})
