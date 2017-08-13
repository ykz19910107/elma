<template>
<div class="page subseach">
	<header>
		<i class="iconfont" @click="backAction">&#xe621;</i>
		<input type="text" placeholder="请输入商品名称" v-model="searchword"/>
	</header>
	<div class="history" v-if="historyword.length">
		<h3>
			<span>历史记录</span>
			<i class="iconfont" @click="deletAction()">&#xe636;</i>
		</h3>
		<ul>
			<li v-for="item in historyword">{{item}}</li>
		</ul>
	</div>
	<div class="hotword">
		<h3>热门搜索</h3>
		<ul>
			<li v-for="item in hotword" @click="setAction(item.word)">{{item.word}}</li>
		</ul>
	</div>
</div>
	
</template>

<script>
	import Seach from '../../seach/homeSeach.js'
	import {mapState} from 'vuex';
	var timer = null;
	export default{
		data(){
			return{
				hotword:[],
				historyword:[],
				searchword:''
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
				this.$router.push("/home")
			},
			//添加历史搜索
			setAction(word){
				if(this.historyword.length){
					for(var i=0; i<this.historyword.length;i++){
						if(this.historyword.indexOf(word)== -1){
							this.historyword.push(word)
						}
					}
				}
				else{
					this.historyword.push(word)
				}
				this.$eventHandle.$emit('get-seach', word);
				this.$router.push('/home/seachlist/'+word)
			},
			deletAction(){
				this.historyword=[]
			}
		},
		created(){
			var lg = this.longitude;
			var lt = this.latitude;
			Seach.getHotseach(lg,lt)
			.then((res)=>{
				this.hotword=res
			})
		},
		mounted(){
			this.$watch('searchword',(newVal,oldVal)=>{
				clearTimeout(timer);
				//清除定时器
				if(newVal == ''){
					clearTimeout(timer);
				}else{
					//再次创建延时器
					timer = setTimeout(()=>{
						this.$router.push('/home/seachlist/'+this.searchword)
					}, 500);
				}
				
				
			})
		}
	}
</script>

<style>
	.subseach header{background: #fff !important;height: 50px;display: flex;}
	.subseach header i{float: left;display: block;width: 30px;height: 30px;line-height: 30px;}
	.subseach header input{display:block;margin: 0 auto;flex: 1;border: 0;background: #f8f8f8;color: #666;font-size: 14px;border-radius: 15px;padding-left: 20px;box-sizing: border-box;}
	.history,.hotword{padding: 10px 15px;}
	.history h3 span,.hotword h3{font-size: 14px;font-weight: bold;}
	.history h3 i{float: right;}
	.hotword ul,.history ul{display: flex;flex-wrap: wrap;}
	.hotword ul li,.history ul li{padding: 5px 10px;margin: 15px 15px 0 0;font-size: 14px;color: #666;background: #f7f7f7;border-radius: 6px;}
</style>