<template>
<div class="page subpage">
	<header>
		<i class="iconfont" @click="backAction">&#xe621;</i>
		<p>选择地址</p>
		<input type="text" placeholder="请输入地址" v-model="keyword" />
	</header>
	<ul>
		<li v-for="item in addressList" class="bottom-lpx" @click="addressAction(item)">
			<h3>{{item.name}}</h3>
			<p>{{item.address}}</p>
		</li>
	</ul>
</div>
</template>

<script>
	import Seach from '../../seach/homeSeach.js';
	import {mapState} from 'vuex'
	
	var timer = null;
	export default{
		data(){
			return{
				keyword:'',
				addressList: []
			}
		},
		computed: {
			...mapState([
				'longitude',
				'latitude'
			])
		},
		methods:{
			//点击箭头返回上一页
			backAction(){
				this.$router.back()
			},
			addressAction(info){
				console.log(info)
				//修改全局状态
				this.$store.dispatch('changeLocation', {
					lg: info.longitude,
					lt: info.latitude
				});
				this.$router.back();
			}
		},
		mounted(){
			//在用户输入一次后和再次输入之间的时间间隔大于500ms就让第一次发送。
			this.$watch('keyword',(newVal,oldVal)=>{
				//清除定时器
				clearTimeout(timer);
				//再次创建延时器
				timer = setTimeout(()=>{
					Seach.searchAddressData(newVal,this.longitude, this.latitude)
					.then((res)=>{//请求成功，接收到地址数据
						this.addressList = res;
					})
				}, 500);
				
			})
		}
	}
</script>

<style>
	.subpage header{height: 90px !important;}
	.subpage header i{color: #fff;float: left;}
	.subpage header p{color: #fff;font-size: 18px;text-align: center;}
	.subpage header input{width: 100%;height: 28px;border: none;border-radius: 14px;margin-top: 10px; padding-left: 15px;box-sizing: border-box;font-size: 14px;}
	.subpage ul{background: #fff;}
	.subpage ul li{height: 55px;padding: 5px 15px;box-sizing: border-box;}
	.subpage ul li h3{font-size: 14px;font-weight: bold;}
	.subpage ul li p{color: #999;}
</style>