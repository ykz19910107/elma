<template>
	<div class="page bannerlist">
		<div class="header">
			<header>
				<i class="iconfont" @click="backAction()">&#xe621;</i>
				<p>{{name}}</p>
			</header>
			<ul class="nave bottom-lpx">
				<li @click="classifyAction(1)" :class="{active:ishow1}">
					<span>
						<span>分类</span>
						<i class="iconfont" :class="{active:ishow1}">&#xe634;</i>
					</span>
				</li>
				<li @click="sortAction(2)" :class="{active:ishow2}">
					<span>
						<span>{{word}}</span>
						<i class="iconfont" :class="{active:ishow2}">&#xe634;</i>
					</span>
				</li>
				<li @click="filtrateAction(3)" :class="{active:ishow3}">
					<span>
						<span>筛选</span>
						<i class="iconfont" :class="{active:ishow3}">&#xe634;</i>
					</span>
				</li>
			</ul>
		</div>
		<navelist-com v-if="ishow1" :classifylist='classify'></navelist-com>
		<srotlist-com v-if="ishow2" :data="index"></srotlist-com>
		<filtratelist-com v-if="ishow3" :data="getMerchant" :express="getExpress" :ishow1="list" :number1="number1"></filtratelist-com>
		<div class="mainlist">
			<div class="wrap">
				<list-com :data="searchList"></list-com>
			</div>
		</div>
	</div>
</template>

<script>
	import List from '../../components/common/List.vue';
	import Seach from '../../seach/homeSeach.js';
	import NaveSearch from '../../seach/naveSearch.js';
	import Navelist from '../../components/common/Navelist.vue';
	import Srotlist from '../../components/common/Srotlist.vue';
	import Filtratelist from '../../components/common/Filtratelist.vue';
	import {mapState} from 'vuex'
	var timer = null
	export default{
		data(){
			
			return{
				searchList:[],
				contentScroll:null,
				ishow1:false,
				ishow2:false,
				ishow3:false,
				classify:null,
				sort:'',
				filtrate:'',
				word:'排序',
				index:-1,
				getExpress:'',
				getMerchant:'',
				list:null,
				number1:null,
				name:''
			}
		},
		computed: {
			...mapState([
				'longitude',
				'latitude'
			])
		},
		components:{
			'list-com':List,
			'navelist-com':Navelist,
			'srotlist-com':Srotlist,
			'filtratelist-com':Filtratelist
		},
		methods:{
			backAction(){
				this.$router.back();
			},
			classifyAction(index){
				this.ishow1 = !this.ishow1;
				this.ishow2=false
				this.ishow3=false
				this.active = 1
			},
			sortAction(index){
				this.ishow2 = !this.ishow2
				this.ishow1=false
				this.ishow3=false
			},
			filtrateAction(index){
				this.ishow3 = !this.ishow3
				this.ishow2=false
				this.ishow1=false
			}
		},
		created(){
			this.name = this.$route.params.name;
			
			//请求商品列表数据
			Seach.bannerListData(this.longitude, this.latitude)
			.then((res)=>{//请求成功，接收到地址数据
				this.searchList = res;
			})
			
			//请求分类列表数据
			NaveSearch.getNavelist(this.longitude,this.latitude)
			.then((res)=>{
				this.classify = res
			})
			
			//请求筛选列表数据
			//获取快递公司
			NaveSearch.getExpress(this.longitude,this.latitude)
			.then((res)=>{
				this.getExpress = res
			})
			//获取商家属性
			NaveSearch.getMerchant(this.longitude,this.latitude)
			.then((res)=>{
				this.getMerchant = res
				var ishow = [];
				for(var i=0; i<res.length; i++){
					ishow.push({ishow:true})
				}
				this.list = ishow
			})
		},
		mounted(){
			//页面滚动
			this.contentScroll = new IScroll(".mainlist", {
					probeType: 3
				});
			this.$watch('searchList',()=>{
				this.contentScroll.refresh()
			})
			
			//接收子级传过来的值改变分类列表状态
			this.$eventHandle.$on('get-hide',(val)=>{
				this.ishow1 = val
			});
			
			//接收子级传过来的值改变排序列表状态
			this.$eventHandle.$on('get-word',(val)=>{
				this.word = val[0];
				this.index = val[1];
				this.ishow2 = false
			});
			this.$eventHandle.$on('get-srot',()=>{
				this.ishow2 = false
			})
			
			//接收子级传过来的值改变筛选列表状态
			this.$eventHandle.$on('get-filrate',()=>{
				this.ishow3 = false
			})
			//接收子级传过来的值改变筛选列表商家属性变化
			this.$eventHandle.$on('get-index',(val)=>{
				this.list[val[0]].ishow = !this.list[val[0]].ishow
				this.number1 = val[1]
			})
		},
		updated(){
			this.contentScroll.refresh()
		}
	}
</script>

<style>
	.bannerlist{position: relative;}
	.bannerlist .header{position: fixed;background: #fff;z-index: 5;width: 100%;}
	
	/*********头部搜索栏*********/
	.bannerlist header{background: linear-gradient(90deg,#0af,#0085ff) !important;height: 45px !important;color: #fff;}
	.bannerlist header i{display: block;width: 30px;height: 30px;line-height: 30px;position: absolute;left: 15px;}
	.bannerlist header p{border: 0;font-size: 18px;text-align: center;}
	
	/*****导航栏*******/
	.bannerlist .header ul{display: flex;}
	.bannerlist .header ul li{height: 49px;flex: 1;color: #666;font-size: 14px;overflow: hidden;line-height: 49px;overflow: hidden;position: relative;text-align: center;}
	.bannerlist .header ul li i{display:block;font-size: 10px;height: 28px;width:28px;line-height: 28px;float: left; transition: all 0.3s linear;text-align: center;margin-top: 10px;}
	.bannerlist .header ul li span{display: inline-block;}
	.bannerlist .header ul li span>span{float: left;}
	
	
	.bannerlist .header ul li.active{color: #3190e8;}
	.bannerlist .header ul li i.active{transform: rotate(180deg);}
	
	.bannerlist .mainlist{width: 100%;position: absolute;top: 94px;bottom: 0;left: 0;overflow: hidden;}
	.bannerlist .mainlist .wrap ul li{min-height: 70px;}
	.bannerlist .mainlist .wrap ul li .bottom-lpx:before{border: 0;}
</style>