<template>
  <div>
        <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
         
          <el-submenu v-for="item in menu" :key="item.title" :index="item.title">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="subitem.title" v-for="subitem in item.children" :key="subitem.title">
                <!-- 相当于a标签链接 -->
                <router-link :to="subitem.path">{{ subitem.title }}</router-link>
                </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
  </div>
</template>

<script>
export default {
data(){
  return{
    //左侧导航栏数据
    menu:[
      {
        title:'商品管理',
        children:[
          {title:'内容管理',path:'/admin/goods/list'},
          {title:'类别管理',path:'/admin/goods/category'},
          {title:'评论管理',path:'/admin/goods/common'}
        ]
      },
      {
        title:'订单管理',
        children:[
          {title:'内容管理',path:'/admin/goods'},
          {title:'类别管理',path:'/admin/category'},
          {title:'评论管理',path:'/admin/comment'}
        ]
      }
    ]
  }
}
};
</script>

<style>

</style>
