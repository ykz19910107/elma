<template>
	<div class="swiper-container carousel">
		<div class="swiper-wrapper">
			<ul class="swiper-slide" v-for="pageItem in pageData">
				<li v-for="item in pageItem" @click="routerAction(item.name)">
					<img :src="item.imgPath | imgFilter" />
					<span>{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="swiper-pagination sm"></div>
	</div>
</template>

<script>
	export default{
		props: {
			data: Array
		},
		computed: {
			pageData(){
				//将外部数据拷贝为自身的数据（深拷贝）
				//var bannerData = this.data;(浅拷贝)
				var bannerData = Array.from(this.data);
				var arr = [];
				while(bannerData.length > 0){
					arr.push(bannerData.splice(0, 8));
				}
				//console.log(arr)
				return arr;
				
			}
		},
		methods:{
			routerAction(val){
				this.$router.push('/home/bannerlist/'+val)
			}
		},
		mounted(){
			this.$watch('pageData',function(){
				var swiper = new Swiper('.swiper-container',{
			        pagination: '.swiper-pagination',
			        paginationClickable: true
				})
			})
		}
	}
</script>

<style>
	.carousel{height: 3.54rem;background: #fff;}
	.carousel ul{display: flex; flex-wrap: wrap;padding-bottom: 0.5rem;box-sizing: border-box;}
	.carousel ul li{width: 25%;display: flex;flex-direction: column;justify-content: center;align-items: center;}
	.carousel ul li img{width: 0.9rem;height: 0.9rem;}
	.carousel ul li span{font-size: 0.12rem;color: #666;display: block;margin-top: 0.1rem;}
	.carousel .swiper-pagination-bullet{width: 0.08rem;height: 0.08rem;margin: 0 0.06rem !important;}
	.carousel .swiper-pagination-bullet-active{background: #333;}
</style>