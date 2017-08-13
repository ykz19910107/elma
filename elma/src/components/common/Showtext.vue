<template>
<div class="show">
    <Rate allow-half disabled show-text v-model="valueHalf">
    	<span style="color: #ff6060">{{ valueHalf }}</span>
    	<span v-if="num">月售{{num}}单</span>
    </Rate>
    <span v-if="fen">{{fen.text}}</span>
</div>	
</template>
<script>
    export default {
    	props:{
    		data:Number,
    		num:Number,
    		fen:Object
    	},
        data () {
        	
            return {
                valueHalf:this.data
            }
        }
    }
    
</script>

<style>
	.ivu-rate-text{margin-left: 0px;}
	.ivu-rate-star{font-size: 12px;}
	.ivu-rate-star{margin-right: 2px;}
	.show{width: 100% !important;}
	.show>span{display:block;background: #2395ff;color: #fff;float: right;margin-top: 6px;height: 16px;width: 50px;text-align: center;line-height: 16px;border-radius: 2px;}
</style>