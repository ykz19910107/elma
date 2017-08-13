<template>
<div id="home">
	<div class="page main">
		<div class="wrap">
			<!-- 头部 -->
			<home-header :address="address" :hotword="hotword" :weather="weatherApi"></home-header>
			<!-- 轮播 -->
			<carrousel-com :data="catecory"></carrousel-com>
			<!-- 商家列表 -->
			<h3 class="top-1px">推荐商家</h3>
			<list-com :data= "shoppingList" :scroll="contentScroll" @list-data='listData'></list-com>
		</div>	
	</div>	
	
	<!-- 子页面  -->
	<router-view></router-view>
</div>

</template>

<script>
	import Seach from '../../seach/homeSeach.js';
	import Homecarrousel from '../../components/home/Homecarrousel.vue';
	import Homeheader from '../../components/home/Homeheader.vue';
	import List from '../../components/common/List.vue';
	import {mapState} from 'vuex'
	export default{
		data(){
			return{
				address:'',
				hotword:[],
				weatherApi:{},
				catecory:[],
				shoppingList:[],
				contentScroll: null
			}
		},
		computed: {
			...mapState([
				'longitude',
				'latitude'
			])
		},
		components:{
			'carrousel-com':Homecarrousel,
			'home-header':Homeheader,
			'list-com':List
		},
		methods:{
			listData(){
				setTimeout(()=>{
					this.contentScroll.refresh();
				})
			},
			requestData(){
				var lg = this.longitude;
				var lt = this.latitude;
				//地址请求
				Seach.getAddressData(lg, lt)
				.then((address)=>{
					this.address = address
				})
				
				//请求天气
				Seach.getWeatherApi(lg, lt)
				.then((weatherApi)=>{
					
					this.weatherApi = weatherApi
				})
				
				//请求热搜词
				Seach.getHotword(lg, lt)
				.then((hotword)=>{
					this.hotword=hotword
				})
				
				//请求轮播数据
				Seach.getCateGoryApi(lg, lt)
				.then((catecory)=>{
					this.catecory = catecory
				})
				
				//请求商家数据
				Seach.getMerchantList(lg, lt)
				.then((shoppingList)=>{
					
					this.shoppingList = shoppingList
				})
			}
		},
		created(){
			//初始化页面数据，发送各种请求
			this.requestData();
			
			//监听经纬度变化
			this.$watch('longitude', this.requestData);
			this.$watch('latitude', this.requestData);
		},
		mounted(){
			
//			this.contentScroll = new IScroll("#home .main", {
//				probeType: 3
//			});
			this.$watch('shoppingList',()=>{
				this.contentScroll = new IScroll("#home .main", {
					probeType: 3
				});
			})
			
			
		},
//		updated(){
//			
//			//this.requestData()
//			
//		}
		
	}		
</script>

<style>
#home{overflow: hidden;background: lightseagreen;}
#home .seachlist{z-index: 5;bottom: 0;background: #fff !important;}
#home .subpage{z-index: 5;bottom: 0;background: #fff;}
#home .subseach{z-index: 5;bottom: 0;background: #fff !important;}
#home .subsellerDetail{z-index: 5;bottom: 0;background: #fff;}
#home .page{background: #f5f5f5;overflow: hidden;}
#home .page>.wrap>header>a{display: block;background: #fff;height: 0.7rem;margin: 0.15rem 0;border-radius: 0.35rem;text-align: center;line-height: 0.7rem;color: #333;}
#home .page>.wrap>h3{width: 100%;padding-left: 0.3rem;font-size: 0.32rem;font-weight: bold;color: #333;margin-top: 0.14rem;height: 0.65rem;line-height: 0.65rem;background: #fff;box-sizing: border-box;}
</style>