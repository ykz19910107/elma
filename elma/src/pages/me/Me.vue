<template>
<div id="me" class="page">
	<header>
		<i class="iconfont" @click="routerAction()">&#xe76e;</i>
		<p>我的</p>
	</header>
	<div class="title">
		<div class="leftimg">
			<Icon type="person"></Icon>
		</div>
		<div class="right">
			<h3>登录/注册</h3>
			<p>
				<Icon type="android-phone-portrait"></Icon>
				<span>登录后享受更多特权</span>
			</p>
		</div>
		<i class="iconfont">&#xe64f;</i>
	</div>
	<ul class="favorable">
		<li>
			<Icon type="ios-email-outline"></Icon>
			<span>优惠</span>
		</li>
		<li>
			<Icon type="social-buffer-outline"></Icon>
			<span>积分</span>
		</li>
	</ul>
	<ul class="property">
		<li class="bottom-lpx" @click="orderAction()">
			<i class="iconfont">&#xe61b;</i>
			<span>我的订单</span>
			<b class="iconfont">&#xe61e;</b>
		</li>
		<li class="bottom-lpx" @click="shoppingcity()">
			<i class="iconfont">&#xe66d;</i>
			<span>积分商城</span>
			<b class="iconfont">&#xe61e;</b>
		</li>
		<li class="bottom-lpx">
			<i class="iconfont">&#xe681;</i>
			<span>饿了么会员卡</span>
			<b class="iconfont">&#xe61e;</b>
		</li>
	</ul>
	<ul class="serve">
		<li class="bottom-lpx">
			<i class="iconfont">&#xe616;</i>
			<span>服务中心</span>
			<b class="iconfont">&#xe61e;</b>
		</li>
		<li class="bottom-lpx">
			<i class="iconfont">&#xe681;</i>
			<span>下载饿了么APP</span>
			<b class="iconfont">&#xe61e;</b>
		</li>
	</ul>
</div>
</template>

<script>
	export default{
		methods:{
			orderAction(){
				this.$router.push('/order')
			},
			shoppingcity(){
				this.$router.push('/discover/shoppingcity')
			}
		}
	}
</script>

<style>
#me{background: rgb(245,245,245);}
#me header{color: #fff;height: 44px;position: fixed;z-index: 99;width: 100%;background: linear-gradient(90deg,#0af,#0085ff);padding: 0.2rem 0.28rem;}
#me header>i{float: left;}
#me header>p{font-size: 18px;font-weight: bold;text-align: center;}

#me .title{margin-top: 44px;background: linear-gradient(90deg,#0af,#0085ff);color: #fff;width: 100%;padding: 30px 20px;display: flex;position: relative;}
#me .title .leftimg i{font-size: 60px;display: block;width: 60px;height: 60px;line-height: 60px;text-align: center;color: rgb(220,220,220);background: #fff;border-radius: 50%;overflow: hidden;margin-right: 20px;}
#me .title .right h3{font-size: 20px;font-weight: bold;}
#me .title .right p{font-size: 14px;margin-top: 5px;}
#me .title>i{position: absolute;right: 20px;top:50%;margin-top: -12px;}

#me .favorable{width: 100%;background: #fff;display: flex;height: 90px;margin-bottom: 10px;}
#me .favorable li{flex: 1;text-align: center;display: flex;flex-direction: column;justify-content: center;}
#me .favorable li:nth-of-type(1){border-right: 1px solid rgb(245,245,245);}
#me .favorable li i{font-size: 16px;color: #fff;background: rgb(255, 95, 62);width: 20px;margin: 0 auto;border-radius: 50%;height: 20px;line-height: 20px;text-align: center;margin-bottom: 10px;}
#me .favorable li:nth-of-type(2) i{background: rgb(106, 194, 11);}


/*********************我的列表***********************/
.property,.serve{width: 100%;background: #fff;box-sizing: border-box;padding-left: 0.24rem;margin-bottom: 0.25rem;}
.property li,.serve li{height: 0.93rem;line-height: 0.92rem;box-sizing: border-box;padding-right: 0.24rem;position: relative;}
.property .bottom-1-px,.serve .bottom-1-px{border-color: #eeeeee;}
.property b,.serve b{float: right;color: #d0d0d0 ;font-size: 0.26rem;}
.property span,.serve span{color: #333333;font-size: 0.28rem;left: 0.68rem;position: absolute;}
.property li:nth-of-type(1),.property li:nth-of-type(2){color: #ff9601;}
.property li:nth-of-type(3),.property li:nth-of-type(4){color: #8a94ff;}

.serve li:nth-of-type(1){color: #65b5fe;}
.serve li:nth-of-type(2),.serve li:nth-of-type(5),.serve li:nth-of-type(7){color: #ffb900;}
.serve li:nth-of-type(3){color: #8a94ff;}
.serve li:nth-of-type(4),.serve li:nth-of-type(8){color: #65b5fe;}
.serve li:nth-of-type(6){color: #00d5bf;}



</style>