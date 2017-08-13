<template>
	<header>
		<div class="site">
			<a href="#/home/address">
				<i class="iconfont">&#xe647;</i>
				<span>{{address}}</span>
				<i class="iconfont">&#xe634;</i>
			</a>
			<div class="site-right">
				<span>{{weather.temperature}}°</span>
				<span>{{weather.description}}</span>
				<img :src="weather.image_hash | imgFilter"/>
			</div>
		</div>
		<a href="#/home/search">搜索商家、商品</a>
		<div class="bottom-list">
			<a  v-for="item in hotword" href="javascript:;" @click="searchAction(item)" >{{item}}</a>
		</div>
	</header>
</template>

<script>
	
	export default{
		props:{address:String,hotword:Array,weather:Object},
		methods:{
			searchAction(item){
				this.$router.push('/home/seachlist/'+item)
			}
		}
	}
	
</script>

<style>
	/********头部地址栏********/
	header{width: 100%;height: 2.54rem;padding: 0.2rem 0.28rem;background:linear-gradient(90deg,#0af,#0085ff);box-sizing: border-box;}
	header .site{height: 36px;font-size: 0.36rem;}
	.site a{color: #fff;line-height: 36px;display: flex;width:200px;float: left;}
	.site a i{font-size: 0.30rem;}
	.site a span{width:200px;display: block;height: 36px;white-space: nowrap;overflow-x: hidden;text-overflow: ellipsis;margin-left: 5px;}
	
	/***********热门链接栏************/
	.bottom-list{width:100%;white-space: nowrap;overflow-x:overlay;}
	.bottom-list a{color: #fff;font-size: 12px;margin-right: 0.30rem;}
	
	/*************天气栏**************/
	.site-right{float: right;position: relative;width: 30%;}
	.site-right span{color: #fff;font-size: 0.28rem;position: absolute;right: 0.70rem;top: 0;}
	.site-right img{float: right;width: 0.58rem;height: 0.58rem;}
	.site-right span:nth-of-type(2){top:0.30rem;font-size: 0.24rem;right: 0.68rem;}
</style>