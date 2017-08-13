<template>
	<div class="page shoppingcity">
		<i class="iconfont" @click="backAction()">&#xe609;</i>
		积分商城
	</div>
</template>

<script>
	export default{
		methods:{
			backAction(){
				this.$router.back()
			}
		}
	}
</script>

<style>
</style>