<template>
	<div class="evaluate-content">
		<div v-for="content in data" class="bottom-lpx">
			<img class="comment-block-avatar_jhxbX_0"/>
			<div class="content-right">
				<h4>{{content.username}}<span>{{content.rated_at}}</span></h4>
				<showtext-com :data="content.rating_star"></showtext-com>
				<img :src="content.item_ratings[0].image_hash | imgFilter" />
				<p>{{content.item_ratings[0].food_name}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Showtext from './Showtext.vue'
	export default{
		props:{
			data:Array
		},
		data(){
			return{
				
			}
		},
		components:{
			'showtext-com':Showtext
		}
	}
</script>
	
<style>
	.evaluate-content{background: #fff;}
	.evaluate-content>div{overflow: hidden;margin:10px 15px;display: flex;padding-bottom: 10px;}
	.evaluate-content .comment-block-avatar_jhxbX_0{width: .8rem;height: .8rem;border-radius: 50%;margin-right: 10px;}
	.evaluate-content .content-right{flex: 1;}
	.evaluate-content .content-right h4 span{float: right;}
	.evaluate-content .content-right img{width: 60px;height: 60px;margin-bottom: 5px;}
	.evaluate-content .content-right .ivu-rate{height: 20px;font-size: initial;line-height: 20px;}
	.evaluate-content .content-right .ivu-rate-text span{display: none;}
	.evaluate-content .content-right p{width: 50px;white-space: nowrap;overflow-x: hidden;border: 1px solid #ddd;border-radius: 4px;padding: 0 5px;color: #666;text-overflow: ellipsis;}
	
</style>