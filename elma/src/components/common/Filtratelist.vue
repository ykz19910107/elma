<template>
	<div class="filtratelist">
		<div class="content">
			<div>
				<h4>配送方式</h4>
				<p><i class="iconfont">&#xe62c;</i>{{express}}</p>
			</div>
			<ul class="bottom-lpx">
				<h4>商家属性（可多选）</h4>
				<li v-for="(item,index) in data" @click="listAction(index)" :class="{active:ishow[index].ishow==false}">
					<i v-if="ishow[index].ishow">{{item.icon_name}}</i>
					<i class="iconfont" style="border: 0;color: #3190e8;" v-else-if="ishow[index].ishow==false">&#xe641;</i>
					<span>{{item.name}}</span>
				</li>
			</ul>
			<p>
				<button @click="emptyAction()">清空</button>
				<button @click="confirmAction()">确定<span v-if="number2!=null">({{number2}})</span></button>
			</p>
		</div>
		<span @click="hideAction()"></span>
	</div>
</template>

<script>
	export default{
		props:{
			data:Array,
			express:String,
			ishow1:Array,
			number1:Number
		},
		data(){
			return{
				ishow:'',
				number2:null
			}
		},
		computed:{
			pageData(){
				var merchantData = Array.from(this.ishow1);
				var numberData = this.number1
				this.ishow = merchantData
				this.number2 = numberData
			}
		},
		methods:{
			hideAction(){
				//向父级传值
				this.$eventHandle.$emit('get-filrate')
			},
			listAction(index){
				console.log(this.ishow[index].ishow)
				if(this.ishow[index].ishow == false){
					this.number2 -=1
				}else{
					this.number2 +=1
				}
				this.$eventHandle.$emit('get-index', [index,this.number2])
			},
			emptyAction(){
				for(var i of this.ishow){
					i.ishow = true
				}
				this.number2 = null
			},
			confirmAction(){
				//向父级传值
				this.$eventHandle.$emit('get-filrate')
			}
		},
		created(){
			this.pageData
		}
	}
</script>

<style>
	.filtratelist{position: absolute;top: 100px;z-index: 5;width: 100%;left: 0;z-index: 5;bottom: 0;}
	.filtratelist .content{background: #fff;}
	
	/******配送方式*****/
	.filtratelist .content>div{padding: 5px 15px;overflow: hidden;color: #666;}
	.filtratelist .content>div>p{border: 1px solid #ddd;float: left;padding:10px 20px 10px 10px;margin-top: 5px;height: 16px;line-height: 16px;color: #000;font-size: 14px;box-sizing: initial;border-radius: 3px;}
	.filtratelist .content>div>p>i{margin-right: 5px; color: #007AFF;height: 16px;}
	
	/********商家属性*******/
	.filtratelist .content>ul{padding:5px 15px;color: #666;overflow: hidden;}
	.filtratelist .content>ul>li{margin: 5px;margin-left: 0;float: left;padding: 5px 0;border:1px solid #ddd;width: 30%;border-radius: 3px;height:22px;line-height: 22px;box-sizing: initial;}
	.filtratelist .content>ul>li>i{display: block;float: left;margin: 0 8px;font-size: 12px;border: 1px solid #ddd;width: 20px;text-align: center;border-radius: 4px;}
	.filtratelist .content>ul>li:nth-of-type(1)>i{border-color: rgb(63, 189, 230);color: rgb(63, 189, 230);}
	.filtratelist .content>ul>li:nth-of-type(3)>i{border-color: rgb(232, 132, 45);color: rgb(232, 132, 45);}
	.filtratelist .content>ul>li:nth-of-type(5)>i{border-color: rgb(255, 78, 0);color: rgb(255, 78, 0);}
	.filtratelist .content>ul>li:nth-of-type(6)>i{border-color: rgb(87, 169, 255);color: rgb(87, 169, 255);}
	.filtratelist .content>ul>li.active{border-color: #a2d2ff; color: #3190e8;background: #edf5ff;}
	
	.filtratelist .content>p{padding: 5px;}
	.filtratelist .content>p>button{width: 49%;height: 40px;background: #fff;border: 1px solid #ddd;font-size: 16px;}
	.filtratelist .content>p>button:nth-of-type(2){float: right;background: #56d176;border-color: #56d176;color: #fff;}
	.filtratelist>span{display:block;width: 100%;height: 100%;background: rgba(0,0,0,0.3);position: absolute;}
</style>