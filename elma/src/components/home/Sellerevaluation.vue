<template>
	<div class="sellerevaluation">
		<div class="wrap">
			<!-- 整体评价 -->
			<div class="evaluation top-1px bottom-lpx">
				<div class="left">
					<h2>{{Math.round(scroesData.overall_score*10)/10}}</h2>
					<p>综合评价</p>
					<p>高于周边商家{{Math.round(scroesData.compare_rating*1000)/10}}%</p>
				</div>
				<div class="right">
					<p>
						<span>服务态度</span>
						<Rate allow-half disabled show-text v-model="valueHalf">
					    	<span style="color: #ff6060">{{ valueHalf }}</span>
					    </Rate>
					</p>
					<p>
						<span>菜品评价</span>
						<Rate allow-half disabled show-text v-model="valueHalf2">
					    	<span style="color: #ff6060">{{ valueHalf2 }}</span>
					    </Rate>
					</p>
					<p>
						<span>送达时间</span>
						<i>{{scroesData.deliver_time}}分钟</i>
					</p>
				</div>
			</div>
			<!-- 用户评价 -->
			<div class="user">
				<h3>
					<span v-for="(item,index) in tagesData" :class="{active:ishow==index}" @click="changActive(index)">{{item.name}}({{item.count}})</span>
				</h3>
				<User-com :data='userEvaluate'></User-com>
			</div>
		</div>
	</div>
</template>

<script>
	import Userevaluate from '../../components/common/User-evaluate.vue'
	export default{
		props:{
			data:Array,
			scroesData:Object,
			tagesData:Array
		},
		data(){
			return{
				valueHalf:Math.round(this.scroesData.service_score*10)/10,
				valueHalf2:Math.round(this.scroesData.food_score*10)/10,
				userEvaluate:this.data,
				evaluationscroll:null,
				ishow:0
			}
		},
		components:{
			'User-com':Userevaluate
		},
		methods:{
			changActive(index){
				this.ishow = index
			}
		},
		mounted(){
			this.evaluationscroll = new IScroll(".sellerevaluation", {
				probeType: 3
			});
		},
		updated(){
			this.evaluationscroll.refresh()
		}
	}
</script>

<style>
	.sellerevaluation{background: rgb(238,238,238);position: absolute;left: 0;bottom: 0;top:167px;width: 100%;}
	.sellerevaluation .evaluation{padding: 15px;overflow: hidden;background: #fff;margin-bottom: 10px;}
	.sellerevaluation .top-1px:after{top: 0 ;z-index: 9;}
	.sellerevaluation .bottom-lpx:before{z-index: 9;bottom: 0;}
	.sellerevaluation .evaluation .left{float: left;padding-right: 15px;text-align: center;border-right: 1px solid rgb(237,237,237);}
	.sellerevaluation .evaluation .left h2{font-size: 30px;color: #f60;}
	.sellerevaluation .evaluation .right{padding-left: 30px;float: left;}
	.sellerevaluation .evaluation .right p{height: 30px;}
	.sellerevaluation .evaluation .right p span{line-height: 33px;margin-right: 10px;}
	
	/******************评价********************/
	.sellerevaluation .user{background: #fff;}
	.sellerevaluation .user h3{padding: 10px 15px;display: flex;flex-wrap: wrap;}
	.sellerevaluation .user h3 span{display: block;padding: 5px;background: #ebf5ff;border-radius: 5px;font-size: 14px;color: #666;margin-right: 15px;margin-top: 10px;}
	.sellerevaluation .user h3 span:nth-of-type(3){background: #ccc;color: #fff;}
	.sellerevaluation .user h3 span.active{background: #3190e8; color: #fff;}
</style>