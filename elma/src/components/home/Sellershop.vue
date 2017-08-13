<template>
	<div class="sellershop">
		<div class="wrap">
			<dl v-if="titledata.activities">
				<dt class="top-1px bottom-lpx">
					<h3>活动与属性</h3>
				</dt>
				<dd v-for="item in titledata.activities" v-if="titledata.activities != null">
					<i :class="{active:item.icon_name == '新'}">{{item.icon_name}}</i>
					<span>{{item.tips}}</span>
				</dd>
				<dd v-if="titledata.supports[0] != null">
					<i :class="{bg:titledata.supports[0].icon_name == '票'}">{{titledata.supports[0].icon_name}}</i>
					<span>{{titledata.supports[0].description}}</span>
				</dd>
			</dl>
			<ul class="live" v-if="titledata.albums">
				<h3 class="bottom-lpx">商家实景</h3>
				<li v-for="item in titledata.albums">
					<img :src="item.cover_image_hash | imgFilter" />
					<p>{{item.name}}({{item.count}})张</p>
				</li>
			</ul>
			<ul class="information">
				<h3 class="bottom-lpx">商家信息</h3>
				<li class="bottom-lpx">{{titledata.name}}</li>
				<li class="bottom-lpx">{{titledata.address}}</li>
				<li class="bottom-lpx">营业时间：{{titledata.opening_hours[0]}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			titledata:String | Object
		},
		data(){
			return{
				sellershopscroll:null
			}
		},
		mounted(){
			this.sellershopscroll = new IScroll(".sellershop", {
				probeType: 3
			});
		},
		updated(){
			this.sellershopscroll.refresh()
		}
	}
</script>

<style>
	.sellershop{background: rgb(238,238,238);position: absolute;left: 0;bottom: 0;top:167px;width: 100%;}
	.sellershop>.wrap>dl{background: #fff;margin-bottom: 10px;}
	.sellershop>.wrap>dl>dt{padding: 10px 15px;width: 100%;box-sizing: border-box;font-size: 14px;margin-bottom: 10px;}
	.sellershop>.wrap>dl>dd{padding: 8px 15px;width: 100%;box-sizing: border-box;}
	.sellershop>.wrap>dl>dd>i{background: rgb(240, 115, 115);color: #fff;border-radius: 2px;}
	.sellershop>.wrap>dl>dd>i.active{background: rgb(112, 188, 70)}
	.sellershop>.wrap>dl>dd>i.bg{background: rgb(153, 153, 153)}
	
	.sellershop>.wrap>.information,.sellershop>.wrap>.live{background: #fff;margin-bottom: 10px;overflow: hidden;}
	.sellershop>.wrap>.information>li{padding: 15px 15px 15px 0;box-sizing: border-box;margin-left: 15px;}
	.sellershop>.wrap>.information>h3,.sellershop>.wrap>.live>h3{padding: 8px 15px;box-sizing: border-box;color: #333;}
	.sellershop>.wrap>.live>li{float: left;padding: 15px 0;box-sizing: border-box;padding-left: 10px;position: relative;}
	.sellershop>.wrap>.live>li>img{width: 80px;height: 80px;}
	.sellershop>.wrap>.live>li>p{position: absolute;background: rgba(0,0,0,0.5);text-align: center;color: #fff;width: 80px;bottom: 15px;}
	
</style>