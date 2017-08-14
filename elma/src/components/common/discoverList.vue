<template>
	<div class="contentList" v-if="data">
		<h3>
			<i>▬●&nbsp;</i>
			<i class="iconfont">&#xe605;</i>
			<span>{{title.name}}</span>
			<i>&nbsp;●▬</i>
		</h3>
		<p>{{title.introduce}}</p>
		<ul class="imglist">
			<li v-for="item in data">
				<i v-if="item.corner_marker">{{item.corner_marker}}</i>
				<img :src="item.imghash | imgFilter"/>
				<p>{{item.name}}</p>
				<span>{{item.price}}</span>
			</li>
		</ul>
		<p>
			<span>查看更多</span>
			<i class="iconfont">&#xe64f;</i>
		</p>
	</div>
</template>

<script>
	export default{
		props:{
			data:Array | String,
			title: Object
		}
	}
</script>

<style>
	.contentList{width: 100%;background: #fff;padding: 15px;}
	
	.contentList h3{text-align: center;}
	.contentList h3 i:nth-of-type(2){color: rgb(241,44,44);}
	.contentList h3 span{font-size: 18px;color: #000;font-weight: bold;}
	
	.contentList>p{text-align: center;margin-bottom: 20px;color: #999;}
	
	.contentList .imglist{display: flex;}
	.contentList .imglist li{margin-right: 10px;flex: 1;}
	.contentList .imglist li:nth-of-type(3){margin-right: 0;}
	.contentList .imglist img{width: 100%;height: 100px;}
	.contentList .imglist p{line-height: 12px;margin: 10px 0;}
	.contentList .imglist span{color: #ff5339;}
	.contentList .imglist i{background: #000;color: #fff;padding: 0 2px;}
	
	.contentList>p:nth-of-type(2){font-size: 14px;margin-top: 20px;margin-bottom: 0;}
	
</style>