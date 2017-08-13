<template>
	<div class="srotlist">
		<ul class="content">
			<li @click="changAction(index,item.name)" v-for="(item,index) in srotlist" :class="{active:ishow==index}">
				<i class="iconfont">&#xe605;</i>
				<div class="bottom-lpx">
					<span>{{item.name}}</span>
					<i class="iconfont" v-if="ishow==index">&#xe641;</i>
				</div>
			</li>
		</ul>
		<span @click="hideAction()"></span>
	</div>
</template>

<script>
	export default{
		props:{
			data:Number
		},
		data(){
			return{
				srotlist:[
					{iconfont:"&#xe605;",name:"智能排序",right:"&#xe641;"},
					{iconfont:"&#xe605;",name:"距离最近",right:"&#xe641;"},
					{iconfont:"&#xe605;",name:"销量最高",right:"&#xe641;"},
					{iconfont:"&#xe605;",name:"起送价最低",right:"&#xe641;"},
					{iconfont:"&#xe605;",name:"配送速度最快",right:"&#xe641;"},
					{iconfont:"&#xe605;",name:"好评优先",right:"&#xe641;"}
				],
				ishow:this.data
			}
		},
		methods:{
			changAction(index,val){
				this.ishow=index;
				this.$eventHandle.$emit('get-word',[val,index])
			},
			hideAction(){
				//向父级传值
				this.$eventHandle.$emit('get-srot')
			}
		}
	}
</script>

<style>
	.srotlist{position: absolute;top: 100px;z-index: 5;width: 100%;left: 0;z-index: 5;bottom: 0;}
	.srotlist ul{background: #fff;}
	.srotlist li{height: 45px;width: 100%;padding: 5px 10px 5px 20px;display: flex;}
	.srotlist li>i{line-height:41px;color: #0089dc;}
	.srotlist li:nth-of-type(2)>i{color: #51addb;}
	.srotlist li:nth-of-type(3)>i{color: #f17b7b;}
	.srotlist li:nth-of-type(4)>i{color: #ecc853;}
	.srotlist li:nth-of-type(5)>i{color: #68d5c9;}
	.srotlist li:nth-of-type(6)>i{color: #f0bb6b;}
	.srotlist li>div{height:45px;line-height:45px;margin-left: 10px;flex: 1;}
	.srotlist li>div>span{font-size: 14px;}
	.srotlist li>div>i{float: right; color: #0089dc;}
	.srotlist li.active{color: #0089dc;}
	
	.srotlist>span{display:block;width: 100%;height: 100%;background: rgba(0,0,0,0.3);position: absolute;}
</style>