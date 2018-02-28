import Vue from 'vue'
import App from './component/App.vue'
import vueRouter from './router'  // 自动导入该目录下的index.js

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'normalize.css';


//导入axios
import axios from "axios";
import api, { domain } from "./js/api.js";

//配置默认域名
axios.defaults.baseURL=domain;
//配置案axios的跨域令牌支持
axios.defaults.withCredentials=true;

//把axios和api添加要Vue的原型
Vue.prototype.$http=axios;
Vue.prototype.$api=api;

import './less/index.less'
Vue.use(ElementUI)

new Vue({
    el: '#app',
    // 下面使用的箭头函数也是es6语法
    render: createElement => createElement(App),
    router: vueRouter
})