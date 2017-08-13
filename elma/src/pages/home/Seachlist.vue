<template>
	<div class="page seachlist">
		<div class="header">
			<header>
				<i class="iconfont" @click="backAction()">&#xe621;</i>
				<input type="text" placeholder="请输入商品名称" v-model="seach" />
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
				seach:'',
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
				number1:null
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
			this.seach = this.$route.params.name;
			//清除定时器
			clearTimeout(timer);
			//再次创建延时器
			timer = setTimeout(()=>{
				Seach.searchListData(this.seach,this.longitude, this.latitude)
				.then((res)=>{//请求成功，接收到地址数据
					this.searchList = res;
				})
			},);
			
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
			//在用户输入一次后和再次输入之间的时间间隔大于500ms就让第一次发送。
			this.$watch('seach',(newVal,oldVal)=>{
				//清除定时器
				clearTimeout(timer);
				if(newVal == ''){
					this.$router.back();clearTimeout(timer);
				}
				else{
					//再次创建延时器
					timer = setTimeout(()=>{
						Seach.searchListData(newVal,this.longitude, this.latitude)
						.then((res)=>{//请求成功，接收到地址数据
							this.searchList = res;
						})
					}, 500);
				}
			})
			
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
	.seachlist{position: relative;}
	.seachlist .header{position: fixed;background: #fff;z-index: 5;width: 100%;}
	
	/*********头部搜索栏*********/
	.seachlist header{background: #fff !important;height: 50px !important;display: flex;}
	.seachlist header i{float: left;display: block;width: 30px;height: 30px;line-height: 30px;}
	.seachlist header input{display:block;margin: 0 auto;flex: 1;border: 0;background: #f8f8f8;color: #666;font-size: 14px;border-radius: 15px;padding-left: 20px;box-sizing: border-box;}
	
	/*****导航栏*******/
	.seachlist .header ul{display: flex;}
	.seachlist .header ul li{height: 49px;flex: 1;color: #666;font-size: 14px;overflow: hidden;line-height: 49px;overflow: hidden;position: relative;text-align: center;}
	.seachlist .header ul li i{display:block;font-size: 10px;height: 28px;width:28px;line-height: 28px;float: left; transition: all 0.3s linear;text-align: center;margin-top: 10px;}
	.seachlist .header ul li span{display: inline-block;}
	.seachlist .header ul li span>span{float: left;}
	
	
	.seachlist .header ul li.active{color: #3190e8;}
	.seachlist .header ul li i.active{transform: rotate(180deg);}
	
	.seachlist .mainlist{width: 100%;position: absolute;top: 99px;bottom: 0;left: 0;overflow: hidden;}
	.seachlist .mainlist .wrap ul li{min-height: 70px;}
	.seachlist .mainlist .wrap ul li .bottom-lpx:before{border: 0;}
</style>