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
					<dl v-for="(item,indexP) in data" class="dl-list">
						<dt>
							<strong>{{item.name}}</strong>
							<span v-if="item.description">{{item.description}}</span>
							<i>...</i>
						</dt>
						<dd v-for="(food,indexC) in item.foods" class="bottom-lpx">
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
								<p class="price">
									<span>￥{{food.specfoods[0].price}}</span>
									<strong>
										<i @click= "subAction(indexP,indexC)" v-if="myCart[indexP].foods[indexC].num != 0">-</i>
										<span v-if="myCart[indexP].foods[indexC].num != 0">{{myCart[indexP].foods[indexC].num}}</span>
										<i @click="pushAction(food.name,food.specfoods[0].price,indexP,indexC)">+</i>
									</strong>
								</p>
							</div>
						</dd>
					</dl>
				</div>
			</div>
		</div>
		<div class="cart">
			<Icon type="android-cart" class="android-cart" :class="{num:icon!=0}"></Icon>
			<span class="icon" v-if="icon!=0">{{icon}}</span>
			<div class="total">
				<p>￥{{tatal}}</p>
				<span v-if="titledata.piecewise_agent_fee">{{titledata.piecewise_agent_fee.description}}</span>
			</div>
			<div class="right" v-if="hide==0">￥{{titledata.float_minimum_order_amount}}起送</div>
			<div class="right bg" v-else="" @click="goAction()">去结算</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			data:Array,
			titledata:String | Object,
			cart:Array
		},
		data(){
			return{
				mainleftscroll:null,
				mainrightscroll:null,
				ishow:0,
				tatal:0,
				scrollHeight:null,
				hide:0,
				icon:0
			}
		},
		computed:{
			myCart:function(){
				var arr = Array.from(this.cart)
				return arr
			}
		},
		methods:{
			bgAction(index){
				this.ishow = index
				var y = this.scrollHeight[index]
				this.mainrightscroll.scrollTo(0,-y,200)
			},
			//加商品
			pushAction(name,price,indexP,indexC){
				this.myCart[indexP].foods[indexC].num +=1
				this.hide = 1
				this.tatal += this.myCart[indexP].foods[indexC].price
				this.icon=0
				this.myCart.map((item)=>{
					item.foods.map((item)=>{
						if(item.num != 0){
							this.icon+=1
						}
					})
				})	
			},
			//减商品
			subAction(indexP,indexC){
				this.tatal -= this.myCart[indexP].foods[indexC].price
				if(this.myCart[indexP].foods[indexC].num<1){
					this.myCart[indexP].foods[indexC].num=0
				}else{
					this.myCart[indexP].foods[indexC].num -=1
				}
				this.hide=0
				this.icon=0
				this.myCart.map((item)=>{
					item.foods.map((item)=>{
						if(item.num != 0){
							this.icon+=1
							this.hide=1
						}
					})
				})
				
			 },
			
			//点击去结算跳转到订单页面
			goAction(){
				var arr = []
				this.myCart.map((item)=>{
					item.foods.map((item)=>{
						if(item.num != 0){
							var obj={}
							obj.name = item.name
							obj.price = item.price
							obj.num = item.num
							obj.img = item.img
							arr.push(obj)
						}
					})
				})
				console.log(arr)
			}
		},
		mounted(){
			this.mainleftscroll = new IScroll(".sellerdetail-content .mainLeft", {
				probeType: 3,
				bounce:false,
				momentum:false
				
			});
			this.mainrightscroll = new IScroll(".mainRight", {
				probeType: 3,
				bounce:false,
				momentum:false
			});
			//监听右侧滚动视图y值变化
			this.mainrightscroll.on('scrollEnd',()=>{
				var y = this.mainrightscroll.y
				var height = this.scrollHeight				
				for(var i=0; i<height.length; i++){
					if(y > -height[i+1] && y <= -height[i]){
						this.ishow = i
					}
				}
				
			})
		},
		updated(){
			this.mainleftscroll.refresh();
			this.mainrightscroll.refresh();
			//获取右侧滚动视图子项的高度
			var arr = [0]
			var y=0
			var Dl=document.getElementsByClassName("dl-list")
			for(var i=0; i<Dl.length; i++){
				var height=document.getElementsByClassName("dl-list")[i].offsetHeight
				y += height
				arr.push(y)
			}
			this.scrollHeight = arr
		}
	}
</script>

<style>
	.sellerdetail-content{background: #fff;position: absolute;left: 0;bottom: 0;top:167px;width: 100%;}
	.sellerdetail-content>div{background: #fff;width: 100%;height: 450px;display:flex;position: absolute;z-index: 6;}
	.sellerdetail-content .mainLeft{width: 80px; background: #fafafa;overflow: hidden;}
	.sellerdetail-content .mainRight{flex: 1;}
	/*********左滚动视图********/
	.sellerdetail-content .mainLeft .left{width: 100%;background: #fafafa;}
	.sellerdetail-content .mainRight{width: 100%;overflow: hidden;}
	.sellerdetail-content .mainLeft .left li a{color: #666;display: block;width: 100%;height: 100%;padding:15px 5px 15px 10px;box-sizing: border-box;}
	.sellerdetail-content .mainLeft .left li a i{float: left;margin-right: 5px;}
	.sellerdetail-content .mainLeft .left li a i img{width: 12px;height: 14px;}
	.sellerdetail-content .mainLeft .left li.active{background: #fff;position: relative;}
	.sellerdetail-content .mainLeft .left li.active:before{content:'';border-left: 3px solid #3190e8;font-weight: bold;position: absolute;left: 0;height: 100%;width: 3px;}
	
	/*******右滚动视图*********/
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
	
	/********加减符号样式********/
	.sellerdetail-content .mainRight .text .price>strong{float: right;}
	.sellerdetail-content .mainRight .text .price>strong>span{display: block;width: 30px;float: left;height: 20px;text-align: center;line-height: 20px;}
	.sellerdetail-content .mainRight .text .price>strong>i{display: block;background: #3199e8;color: #fff;width: 20px; height: 20px;border-radius: 50%;text-align: center;line-height: 20px;font-weight: bold;font-size: 16px;float: left;}
	.sellerdetail-content .mainRight .text .price>strong>i:nth-of-type(1){color: #3199e8;background: #fff;border:1px solid #3199e8;line-height: 18px;}
	.sellerdetail-content .mainRight .bottom-lpx:before{bottom: 0;}
	
	/********购物车*******/
	.sellerdetail-content .cart{background: rgba(80,80,81,.9);height: 50px;position: absolute;bottom: 0;}
	.sellerdetail-content .cart .android-cart{color: rgb(95,95,99);display: block;width: 50px;height: 50px;text-align: center;line-height: 40px;border-radius: 50%;font-size: 24px;border: 5px solid rgb(68,68,68);background: rgb(54,54,54);box-sizing: border-box;top:-10px;position: absolute;z-index: 15;left: 15px;}
	.sellerdetail-content .cart .total{color: #fff;margin-left: 80px;padding: 5px 0;box-sizing: border-box;}
	.sellerdetail-content .cart .total>p{font-size: 16px;font-weight: bold;}
	.sellerdetail-content .cart>.right{position:absolute;width: 90px;right: 0;height: 50px;color: #fff;text-align: center;line-height: 50px;font-size: 16px;font-weight: bold;}
	.sellerdetail-content .cart>.bg{background: #4cd964;color: #FFF;}
	.sellerdetail-content .cart .num{background: #3190e8;color: #fff;}
	.sellerdetail-content .cart .icon{background: #ff461d;position: absolute;padding:2px 4px;font-size: 14px;display: block;line-height: 14px;color: #fff;border-radius: 8px;top: -10px;left: 48px;z-index:16;}
</style>