<template>
	<ul class="shoppingList">
		<li class="top-1px" v-for="(item,index) in pageData" @click="sellerAction(item.id)">
			<img :src="item.imagePath | imgFilter" />
			<div class="text">
				<h4 class="title">{{item.name}}
					<div>
						<span v-for="icon in item.writ">{{icon.icon_name}}</span>
					</div>
				</h4>
				<showtext-com :data="item.rating" :num="item.recent_order_num" :fen="item.delivery_mode"></showtext-com>
				<p class="bottom-lpx">
					<span>¥{{item.rules[0].price}}起送 / 配送费¥{{parseInt(item.rules[0].fee)}}</span>
					<span>{{item.distance}}m / <i>{{item.order_lead_time}}分钟</i></span>
				</p>
				<ul class="activity" v-if="item.activities">
					<span @click.stop="aAction(index)">
						<span>{{item.activities.length}}个活动</span>
						<i class="iconfont" :class="{active:item.list}">&#xe635;</i>
					</span>
					<li v-if="item.activities[0]">
						<i :class="{active:item.activities[0].icon_name=='新'}">{{item.activities[0].icon_name}}</i>
						<span>{{item.activities[0].description}}</span>
					</li>
					<li v-if="item.activities[1]">
						<i :class="{active:item.activities[1].icon_name=='新'}">{{item.activities[1].icon_name}}</i>
						<span>{{item.activities[1].description}}</span>
					</li>
					<li v-for="(activity,index) in item.activities" v-if="index!=0 && index!=1 && item.list">
						<i :class="{active:activity.icon_name=='新'}">{{activity.icon_name}}</i>
						<span>{{activity.description}}</span>
					</li>
				</ul>
			</div>
		</li>
	</ul>
</template>

<script>
	import Showtext from './Showtext.vue'
	export default{
		props:{
			data:Array
		},
		data(){
			
			return {
				ishow:''
			}
		},
		components:{
			'showtext-com':Showtext
		},
		computed:{
			pageData(){
				var listData = Array.from(this.data);
				this.ishow = listData;
				return listData
			}
		},
		methods:{
			aAction(index){
				this.ishow[index].list = !this.ishow[index].list;
				this.$emit('list-data')
			},
			sellerAction(id){
				this.$router.push('/home/seller-detail/'+id)
			}
			
		}
		
	}
</script>

<style>
	.shoppingList{background:#fff;width: 100%; }
	.shoppingList>li{width: 100%;min-height: 2.64rem;padding: 0.29rem 0.18rem;box-sizing: border-box;}
	.shoppingList>li>img{width: 1.14rem;height:1.14rem;float: left;margin-right: 0.18rem;}
	.shoppingList .text{margin-left:1.32rem !important;}
	.shoppingList .text .title{font-size: 0.3rem;font-weight: bold;color: #333;height: 0.3rem;line-height: 0.3rem;}
	.shoppingList .text .title:before{content: '品牌';background: #ffd930;font-size:0.22rem;color: #52250a;display: block;width: 0.52rem;height: 0.3rem;float: left;text-align: center;line-height: 0.3rem;border-radius: 0.05rem;margin-right: 0.1rem;}
	.shoppingList .text .title>div{float: right;display: flex;}
	.shoppingList .text .title>div>span{display:block;width:0.26rem;height:0.26rem;font-size: 0.12rem;border: 1px solid #dddddd;color: #999999;line-height: 0.22rem;border-radius: 0.05rem;text-align: center;line-height: 0.26rem;margin-left: 0.04rem;}
	.shoppingList .text p{padding-bottom:3px ;}
	.shoppingList .text p>span:nth-of-type(2){float: right;}
	.shoppingList .text p>span:nth-of-type(2)>i{color: #4895ff;}
	.shoppingList .activity{padding-top: 5px;position: relative;}
	.shoppingList .activity>li>i{background: #f07373;color: #fff;border-radius: 2px;}
	.shoppingList .activity>li>span{color: #939393;}
	.shoppingList .activity>li>i.active{background: #70bc46;}
	.shoppingList .activity>span{position: absolute;top:0;right:0.18rem ; color: #939393;}
	.shoppingList .activity>span>i{float: right;transition: all 0.2s linear;height: 14px;line-height: 16px;}
	.shoppingList .activity>span>i.active{transform: rotate(180deg);}
</style>