// 路由配置
import Vue from 'vue'
import VueRouter from 'vue-router' // 这是基于vue的一个插件

import Login from '../component/login/Login.vue'
import Admin from '../component/admin/Admin.vue'

//商品管理模块组件
import GoodsComment from "../component/admin/goods/comment/Comment.vue";
import GoodsDetail from "../component/admin/goods/detail/Detail.vue";
import GoodsList from "../component/admin/goods/list/List.vue";

Vue.use(VueRouter)
//购物车页面路由配置
const goods=[
    // 子路由path不加/ 自动拼接父路由path
    { name: 'goodsList', path: 'goods/list', component: GoodsList } ,
    { name: 'goodsComment', path: 'goods/comment', component: GoodsComment } ,
    { name: 'goodsDetail', path: 'goods/detail/:id', component: GoodsDetail } 
]
// 导出路由实例 
export default new VueRouter({
    routes: [
        { name: 'login', path: '/login', component: Login },
        { name: 'admin', path: '/admin', component: Admin, children: [...goods] },
    ]
})
