import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//外卖
import Home from '../pages/home/Home.vue'
//外卖tab下的子页面
//地址搜索页面
import Address from '../pages/home/Address.vue'
//菜单搜索页面
import Search from '../pages/home/Search.vue'
//商家详情页
import SellerDetail from '../pages/home/SellerDetail.vue'
//菜单列表页面
import Seachlist from '../pages/home/Seachlist.vue'
//banner列表页面
import Bannerlist from '../pages/home/Bannerlist.vue'

//发现
import Discover from '../pages/discover/Discover.vue'
import Shoppingcity from '../pages/discover/Shoppingcity.vue'




//订单
import Order from '../pages/order/Order.vue'
//我的
import Me from '../pages/me/Me.vue'
import Login from '../pages/me/Login.vue'

export default new Router({
  routes: [
    {
    	path: '/home',
    	component: Home,
    	children: [
    		{
    			path: 'address',
    			component: Address
    		},
    		{
    			path: 'search',
    			component: Search
    		},
    		{
    			path: 'seller-detail/:id',
    			component: SellerDetail
    		},
    		{
    			path: 'seachlist/:name',
    			component: Seachlist
    		},
    		{
    			path: 'bannerlist/:name',
    			component: Bannerlist
    		}
    	]
    },
    {
    	path: '/discover',
    	component: Discover,
    	children:[
    		{
    			path: 'shoppingcity',
    			component: Shoppingcity
    		}
    	]
    },
    {
    	path: '/order',
    	component: Order
    },
    {
    	path: '/me',
    	component: Me,
    	children:[
    		{
    			path: 'login',
    			component: Login
    		}
    	]
    },
    {
    	path: '*',
    	redirect: '/home'
    }
  ]
})
