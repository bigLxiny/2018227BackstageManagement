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
let router= new VueRouter({
    routes: [
        { name: 'login', path: '/login', component: Login },
        { name: 'admin', path: '/admin', component: Admin, children: [...goods] },
    ]
})

// 添加导航守卫   是一个函数
router.beforeEach((to, from, next) => {
    // 现在我们是在一个js模块当中, 并不是在vue组件中, 所以这里的this不是组件实例, 而是undefined, 无法this.$http与this.$api
    // 我们可以在Vue的prototype对象上找$http和$api方法
    Vue.prototype.$http.get(Vue.prototype.$api.islogin).then(res=>{
        // 设置一个开关
        let islogin=false;
        // console.log(res);
        if(res.data.code=='logined'){
            islogin=true;
        }
        // 如果访问登陆页面
        if(to.name=='login'){
            if(islogin){
                next({name:'admin'})
            }else{
                next()
            }
        }
        // 如果访问其他后台页面
        if(to.name!='login'){
            if(islogin){
                next()
            }else{
                // next({name:'login'})
                // query用来设置url中的查询字符串, 我们这里把用户要访问的页面地址通过query记录下来
                next({ name: 'login', query: { next: to.fullPath}})
            }
        }
    })
})
export default router;