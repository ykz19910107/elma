// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//路由
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import VueRouter from 'vue-router'

//状态管理
import store from './store'

Vue.use(VueRouter);
Vue.use(iView);


//数据请求
import axios from 'axios'

//过滤器
import './filter'

Vue.config.productionTip = false
Vue.prototype.$http = axios

//处理非父子组件的通信
var Event = new Vue();
Vue.prototype.$eventHandle = Event;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
