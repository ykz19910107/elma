<template>
<div id="discover" class="page">
	<header>
		<i class="iconfont" @click="routerAction()">&#xe76e;</i>
		<p>发现</p>
	</header>
	<div class="main">
		<div class="wrap">
			<div class="content">
				<div v-for="item in integral">
					<div>
						<h2 :style="{color:item.title_color}">{{item.title}}</h2>
						<span>{{item.subtitle}}</span>
					</div>
					<img :src="item.main_pic_hash | imgFilter" />
				</div>
			</div>
			<img v-if="img_hash" :src="img_hash[0].sub_pic_hash | imgFilter"/>
			<discoverList-com v-for="item in title" :data="item.details" :title="item"></discoverList-com>
		</div>
	</div>
	<!-- 子页面  -->
	<router-view></router-view>
</div>

</template>

<script>
	import discoverSearch from '../../seach/discoversearch.js'
	import discoverList from '../../components/common/discoverList.vue'
	import {mapState} from 'vuex'
	export default{
		data(){
			return{
				integral:null,
				img_hash:'',
				title:[
				{introduce:"你的口味，我都懂得",name:"美食推荐"},
				{name:"天天特价",introduce:"特价商品，一网打尽"},
				{name:"限时好礼",introduce:"小积分换好礼"}
				],
				myscoll:null
			}
		},
		computed: {
			...mapState([
				'longitude',
				'latitude'
			])
		},
		components:{
			'discoverList-com':discoverList
		},
		methods:{
			routerAction(){
				this.$router.push('/home/search')
			}
		},
		created(){
			//头部数据请求
			discoverSearch.getIntegral()
			.then((res)=>{
				this.integral=res[0];
				this.img_hash=res[1];
			});
			//美食请求
			discoverSearch.getHotfood(this.longitude,this.latitude)
			.then((res)=>{
				this.title[0].details = res
			});
			//天天特价
			discoverSearch.getPrice(this.longitude,this.latitude)
			.then((res)=>{
				this.title[1].details = res
			});
			//限时好礼请求
			discoverSearch.getSuggest()
			.then((res)=>{
				this.title[2].details = res
			})
		},
		mounted(){
			//页面滚动
			this.myscoll = new IScroll(".main", {
				probeType: 3
			});
		},
		updated(){
			this.myscoll.refresh()
		}
	}
</script>

<style>
#discover{background: #fff;}
#discover header{color: #fff;height: 44px;position: fixed;z-index: 4;width: 100%;background: linear-gradient(90deg,#0af,#0085ff);padding: 0.2rem 0.28rem;}
#discover header>i{float: left;}
#discover header>p{font-size: 18px;font-weight: bold;text-align: center;}
#discover .main{top: 44px;overflow: hidden;position: absolute;left: 0;bottom: 0;width: 100%;background: rgb(245,245,245);}
#discover .main .content{height: 180px;margin-bottom: 10px;background: #fff;}
#discover .main .content>div{float: left;padding: 20px 15px;width: 194px;}
#discover .main .content>div span{color: #999;}
#discover .main .content>div:nth-of-type(2) img,#discover .main .content div:nth-of-type(3) img{width: 50px;height: 50px;float: right;}
#discover .main .content>div:nth-of-type(1){width: 180px;border-right: 1px solid rgb(245,245,245);}
#discover .main .content>div:nth-of-type(1) img{width: 80px;height: 80px;margin: 0 auto;margin-top: 15px;}
.content>div:nth-of-type(2) div,.content>div:nth-of-type(3) div{float: left;width: 114px;}

.main>.wrap>img{width: 100%;margin-bottom: 10px;}


#discover .shoppingcity{bottom: 0;z-index: 5;background: #fff;}
</style>