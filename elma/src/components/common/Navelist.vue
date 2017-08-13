<template>
	<div class="naveList">
		<div>
			<div class="mainLeft">
				<div class="wrap">
					<ul class="left">
						<li v-for="(item,index) in classifylist" :class="{active:ishow==index}" @click="classifylistAction(index)">
							<span>{{item.name}}</span>
							<i>{{item.count}}</i>
						</li>
					</ul>
				</div>
			</div>
			<div class="mainRight">
				<div class="wrap">
					<ul class="right">
						<li v-for="(item,index) in classifylist" v-if="ishow==index && index!=0">
							<ul>
								<li v-for="right in item.sub_categories">
									<img :src="right.image_url|imgFilter" />
									<span>{{right.name}}</span>
									<i>{{right.count}}</i>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<span @click="hideAction()"></span>
	</div>
</template>
<script>
	
	export default{
		props:{
			classifylist:Array
		},
		data(){
			return{
				mainleftscroll:null,
				mainrightscroll:null,
				ishow:0,
				hide:false
			}
		},
		methods:{
			classifylistAction(index){
				this.ishow = index
				setTimeout(()=>{
					this.mainrightscroll.refresh();
				})
			},
			hideAction(){
				//向父级传值
				this.$eventHandle.$emit('get-hide',this.hide)
			}
		},
		mounted(){
			this.mainleftscroll = new IScroll(".mainLeft", {
				probeType: 3
			});
			this.mainrightscroll = new IScroll(".mainRight", {
				probeType: 3
			});
		},
		updated(){
			this.mainleftscroll.refresh()
		}
		
	}
</script>
	
<style>
	.naveList{position: absolute;top: 100px;z-index: 5;width: 100%;bottom: 0;left: 0;}
	.naveList>div{background: #fff;width: 100%;height: 350px;overflow: hidden;display:flex;position: absolute;z-index: 6;}
	.naveList .mainLeft{width: 143px; }
	.naveList .mainRight{flex: 1;}
	.naveList .mainLeft .left{width: 100%;background: #fafafa;overflow: hidden;}
	.naveList .mainRight .right{width: 100%;overflow: hidden;}
	.naveList .mainLeft .left li{padding: 0 5px 0 10px;height: 40px;line-height: 40px;}
	.naveList .mainLeft .left li i{float: right;}
	.naveList .mainLeft .left li.active{background: #fff;}
	
	.naveList .mainRight .right>li>ul>li{height: 45px;padding: 10px 10px;box-sizing: border-box;line-height: 25px;color: #666;}
	.naveList .mainRight .right img{width: 25px;height: 25px;float: left;margin-right: 10px;}
	.naveList .mainRight .right i{float: right;}
	
	
	.naveList>span{display:block;width: 100%;height: 100%;background:rgba(0,0,0,0.3);}
</style>