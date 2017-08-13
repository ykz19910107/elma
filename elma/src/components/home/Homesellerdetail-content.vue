<template>
	<div class="sellerdetail-content">
		<div>
			<div class="mainLeft">
				<div class="wrap">
					<ul class="left">
						<li v-for="(item,index) in data" :class="{active:ishow==index}" @click=bgAction(index)>
							<a href="javascript:;">
								<i v-if="item.icon_url">
									<img :src="item.icon_url | imgFilter"  />
								</i>
								<span>{{item.name}}</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="mainRight">
				<div class="wrap">
					<dl v-for="(item,index) in data">
						<dt>
							<strong>{{item.name}}</strong>
							<span v-if="item.description">{{item.description}}</span>
							<i>...</i>
						</dt>
						<dd v-for="food in item.foods" class="bottom-lpx">
							<img :src="food.image_path | imgFilter" />
							<div class="text">
								<h4>
									<span>{{food.name}}</span>
									<i v-if="food.attributes[0] != null">{{food.attributes[0].icon_name}}</i>
								</h4>
								<p>{{food.description}}</p>
								<h5>
									<span v-if="food.month_sales != 0">月售{{food.month_sales}}份</span>
									<span v-if="food.satisfy_rate != 0">好评率{{food.satisfy_rate}}%</span>
								</h5>
								<span v-if="food.activity != null">{{food.activity.image_text}}</span>
								<p class="price">￥<span>{{food.specfoods[0].price}}</span><i>+</i></p>
							</div>
						</dd>
					</dl>
				</div>
			</div>
		</div>
		<div class="cart">
			<Icon type="android-cart" class="android-cart"></Icon>
			<div class="total">
				<p>￥{{tatal}}</p>
				<span v-if="titledata.piecewise_agent_fee">{{titledata.piecewise_agent_fee.description}}</span>
			</div>
			<div class="right">￥{{titledata.float_minimum_order_amount}}起送</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			data:Array,
			titledata:String | Object
		},
		data(){
			return{
				mainleftscroll:null,
				mainrightscroll:null,
				ishow:0,
				tatal:0
			}
		},
		computed:{
			
		},
		methods:{
			bgAction(index){
				this.ishow = index
			}
		},
		mounted(){
			this.mainleftscroll = new IScroll(".sellerdetail-content .mainLeft", {
				probeType: 3
			});
			this.mainrightscroll = new IScroll(".mainRight", {
				probeType: 3
			});
		},
		updated(){
			this.mainleftscroll.refresh();
			this.mainrightscroll.refresh()
		}
	}
</script>

<style>
	.sellerdetail-content{background: #fff;position: absolute;left: 0;bottom: 0;top:167px;width: 100%;}
	.sellerdetail-content>div{background: #fff;width: 100%;height: 460px;display:flex;position: absolute;z-index: 6;}
	.sellerdetail-content .mainLeft{width: 80px; background: #fafafa;overflow: hidden;}
	.sellerdetail-content .mainRight{flex: 1;}
	.sellerdetail-content .mainLeft .left{width: 100%;background: #fafafa;}
	.sellerdetail-content .mainRight{width: 100%;overflow: hidden;}
	.sellerdetail-content .mainLeft .left li a{color: #666;display: block;width: 100%;height: 100%;padding:15px 5px 15px 10px;box-sizing: border-box;}
	.sellerdetail-content .mainLeft .left li a i{float: left;margin-right: 5px;}
	.sellerdetail-content .mainLeft .left li a i img{width: 12px;height: 14px;}
	.sellerdetail-content .mainLeft .left li.active{background: #fff;position: relative;}
	.sellerdetail-content .mainLeft .left li.active:before{content:'';border-left: 3px solid #3190e8;font-weight: bold;position: absolute;left: 0;height: 100%;width: 3px;}
	
	.sellerdetail-content .mainRight dl{width: 100%;}
	.sellerdetail-content .mainRight dl dt{padding: 0 10px;height: 25px;line-height: 25px;color: #666;background: #f1f1f1;}
	.sellerdetail-content .mainRight dl dt strong{font-size: 14px;}
	.sellerdetail-content .mainRight dl dt span{font-size: 12px;}
	.sellerdetail-content .mainRight dl dd{padding: 10px 10px;background: #fff;width: 100%;overflow: hidden;display: flex;}
	.sellerdetail-content .mainRight dl img{width: 50px;height: 50px;margin-right: 10px;}
	.sellerdetail-content .mainRight dl dt i{float: right;}
	.sellerdetail-content .mainRight .text{flex: 1;}
	.sellerdetail-content .mainRight .text>h4>span{font-size: 14px;color: #000;line-height: 16px;font-weight: bold;margin-bottom: 5px;}
	.sellerdetail-content .mainRight .text>h4>i{border: 1px solid #ec9c68;color: #ec9c68;font-size: 12px;border-radius: 10px;padding: 0 4px;transform: scale(0.7);float: right;box-sizing: border-box;}
	.sellerdetail-content .mainRight .text p{line-height: 14px;color: #999;}
	.sellerdetail-content .mainRight .text>h5{margin-top: 5px;margin-bottom: 5px;}
	.sellerdetail-content .mainRight .text>h5>span:nth-of-type(2){margin-left: 5px;}
	.sellerdetail-content .mainRight .text>span{border:1px solid currentColor; color: #f07373;}
	.sellerdetail-content .mainRight .text .price{color: #f60;margin-top: 5px;}
	.sellerdetail-content .mainRight .text .price>span{font-size: 18px;font-weight: bold;}
	.sellerdetail-content .mainRight .text .price>i{display: block;float: right;background: #3199e8;color: #fff;width: 20px; height: 20px;border-radius: 50%;text-align: center;line-height: 20px;font-weight: bold;font-size: 16px;}
	.sellerdetail-content .mainRight .bottom-lpx:before{bottom: 0;}
	
	/********购物车*******/
	.sellerdetail-content .cart{background: rgba(80,80,81,.9);height: 50px;position: absolute;bottom: 0;}
	.sellerdetail-content .cart .android-cart{color: rgb(95,95,99);display: block;width: 50px;height: 50px;text-align: center;line-height: 40px;border-radius: 50%;font-size: 24px;border: 5px solid rgb(68,68,68);background: rgb(54,54,54);box-sizing: border-box;top:-10px;position: absolute;z-index: 111;left: 15px;}
	.sellerdetail-content .cart .total{color: #fff;margin-left: 80px;padding: 5px 0;box-sizing: border-box;}
	.sellerdetail-content .cart .total>p{font-size: 16px;font-weight: bold;}
	.sellerdetail-content .cart>.right{position:absolute;width: 90px;right: 0;height: 50px;color: #fff;text-align: center;line-height: 50px;font-size: 16px;font-weight: bold;}
</style>