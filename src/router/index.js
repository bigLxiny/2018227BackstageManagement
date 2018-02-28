// 路由配置
import Vue from 'vue'
import VueRouter from 'vue-router' // 这是基于vue的一个插件

import Login from '../component/login/Login.vue'
import Admin from '../component/admin/Admin.vue'
import Shopcart from '../component/admin/shopcart/Shopcart.vue'

Vue.use(VueRouter)
//购物车页面路由配置
const shopcart=[
    // 子路由path不加/ 自动拼接父路由path
    { name: 'shopcart', path: 'shopcart', component: Shopcart } 
]
// 导出路由实例 
export default new VueRouter({
    routes: [
        { name: 'login', path: '/login', component: Login },
        { name: 'admin', path: '/admin', component: Admin, children: [...shopcart] },
    ]
})
