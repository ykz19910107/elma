<template>
<div id="order" class="page">
	<header>
		<i class="iconfont" @click="routerAction()">&#xe76e;</i>
		<p>定单</p>
	</header>
	<div class="main">
		<div class="wrap">
			<div class="img">
				<img src="//fuss10.elemecdn.com/f/18/9fb04779371b5b162b41032baf5f3gif.gif" />
				<h3>登录后查看外卖订单</h3>
				<p>立即登录</p>
			</div>
		</div>
	</div>
</div>
</template>

<script>
</script>

<style>
#order{background: rgb(245,245,245);}
#order header{color: #fff;height: 44px;position: fixed;z-index: 99;width: 100%;background: linear-gradient(90deg,#0af,#0085ff);padding: 0.2rem 0.28rem;}
#order header>i{float: left;}
#order header>p{font-size: 18px;font-weight: bold;text-align: center;}
#order .main{position: absolute; top: 44px;bottom: 0;left: 0;width: 100%;overflow: hidden;}
#order .img{width: 100%;margin:0 atauto;margin-top: 150px;}
#order .img img{widows: 200px;height: 200px;margin: 0 auto;}
#order .img p{display: block;width:100px;height: 35px;background: #56d176;color: #fff;line-height: 35px;text-align: center;font-size: 14px;margin: 0 auto;border-radius: 4px;}
#order .img h3{text-align: center;font-size: 16px;color: #666;margin: 10px 0;}
</style>