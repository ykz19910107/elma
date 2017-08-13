<template>
<div class="page subsellerDetail">
	<header>
		<i class="bg" :style="styleObject"></i>
		<div>
			<i class="iconfont" @click=backAction()>&#xe76e;</i>
			<div class="title-content">
				<img :src="titledata.image_path | imgFilter" />
				<div>
					<h3>{{titledata.name}}</h3>
					<strong>
						<span>商家配送 / {{titledata.order_lead_time}}分钟送达 / <span v-if="titledata.piecewise_agent_fee">{{titledata.piecewise_agent_fee.description}}</span></span>
						<i class="iconfont">&#xe61e;</i>
					</strong>
					<p>公告：{{titledata.promotion_info}}</p>
				</div>
				<p v-if="titledata.activities">
					<em v-if="titledata.activities[0]!=null">{{titledata.activities[0].icon_name}}</em>
					<span v-if="titledata.activities[0]!=null">{{titledata.activities[0].tips}}</span>
					<i>{{titledata.activities.length}}个活动</i>
				</p>
			</div>
		</div>
	</header>
	<ul class="navName">
		<li v-for = '(item,index) in navName' @click="spanAction(index)">
			<span :class="{active:ishow == index}">{{item}}</span>
		</li>
	</ul>
	<shoppingcotent-com :data="shoppingcotent" :titledata="titledata" v-if="display==0"></shoppingcotent-com>
	<evaluation-com :data="sellerevaluation" v-if="display==1" :scroesData="scroes" :tagesData='tages'></evaluation-com>
	<shop-com v-if="display==2" :titledata="titledata" ></shop-com>
</div>
	
</template>

<script>
	import listSearch from '../../seach/naveSearch.js';
	import Homesellerdetail from '../../components/home/Homesellerdetail-content.vue';
	import Sellerevaluation from '../../components/home/Sellerevaluation.vue';
	import Sellershop from '../../components/home/Sellershop.vue';
	import API from '../../url-api/index.js';
	import {mapState} from 'vuex'
	export default{
		data(){
			return{
				id:null,
				titledata:'',
				styleObject:{},
				navName:["商品","评价","店铺"],
				shoppingcotent:null,
				ishow:0,
				sellerevaluation:null,
				display:0,
				scroes:null,
				tages:null
			}
		},
		components:{
			'shoppingcotent-com':Homesellerdetail,
			'evaluation-com':Sellerevaluation,
			'shop-com':Sellershop
		},
		computed: {
			...mapState([
				'longitude',
				'latitude'
			])
		},
		methods:{
			backAction(){
				this.$router.back()
				
			},
			spanAction(index){
				this.ishow=index
				this.display = index
			}
		},
		created(){
			this.id = this.$route.params.id
			listSearch.getSellerTitleData(this.id,this.longitude,this.latitude)
			.then((res)=>{
				this.titledata = res
				if(res.image_path){
					var pex = res.image_path.endsWith('png')? '.png': '.jpeg'
					var path = API.imgHost + res.image_path + pex;
					this.styleObject.backgroundImage = "url("+path+")"
				}
			}),
			//请求商品详情内容
			listSearch.getShoppingcontent(this.id)
			.then((res)=>{
				this.shoppingcotent = res
			})
			//商品详情评价内容请求
			listSearch.getSellerevaluation(this.id)
			.then((res)=>{
				console.log(res)	
				this.sellerevaluation = res
			})
			//星级评价
			listSearch.getScore(this.id)
			.then((res)=>{
				console.log(res)	
				this.scroes = res
			})
			//内容
			listSearch.getTags(this.id)
			.then((res)=>{
				console.log(res)	
				this.tages = res
			})
		}
	}
</script>

<style>
	/**********头部内容***********/
	.subsellerDetail header{padding-left: 10px;padding-top: 2px;background: #fff;overflow: hidden !important;position: relative;z-index: 99;}
	.subsellerDetail header:before{content: '';width: 100%;height: 127px;background: rgba(119,103,137,0.43);position: absolute;left: 0;top: 0;z-index: 2;}
	.subsellerDetail header>i{position: absolute;width: 110%;height: 157px;left: -15px;top: -15px;background-size:cover !important;background-repeat: no-repeat !important;background-position:center -20px !important;filter:blur(15px);overflow: hidden;}
	.subsellerDetail header>div>i{display: block;color: #fff;margin-bottom: 5px;font-size: 20px;}
	.subsellerDetail header>div{position: absolute;left: 0;top: 0;z-index: 5;padding:0 10px;box-sizing: border-box;width: 100%;}
	.subsellerDetail .title-content{color: #fff;}
	.subsellerDetail .title-content>div{color: #fff;margin-bottom: 5px;}
	.subsellerDetail .title-content img{width: 60px;height: 60px;border: 1px solid #fff;border-radius: 4px;float: left;margin-right: 10px;}
	.subsellerDetail .title-content>div>h3{font-size: 18px;font-weight: bold;line-height: 18px;margin-bottom: 5px;}
	.subsellerDetail .title-content>div>p{white-space: nowrap;overflow-x: hidden;}
	.subsellerDetail .title-content>p>em{background: rgb(112, 188, 70);}
	.subsellerDetail .title-content>p>i{float: right;}
	.subsellerDetail .title-content>div>strong{display: block;}
	.subsellerDetail .title-content>div>strong>i{font-size: 12px;float: right;}
	
	/****************导航**************/
	.subsellerDetail .navName{background: #fff;width: 100%;height: 40px;display: flex;position: relative;z-index: 99;}
	.subsellerDetail .navName li{flex: 1;text-align: center;line-height: 40px;font-size: 14px;}
	.subsellerDetail .navName li>span{display: inline-block;height: 40px;box-sizing: border-box;position: relative;}
	.subsellerDetail .navName li>span.active:before{content:'';color: #3190e8;border-bottom: 3px solid #3190e8;position: absolute;width: 100%;height: 3px;bottom: 0;}
</style>