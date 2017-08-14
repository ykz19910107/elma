//数据请求处理
import Api from '../url-api'
import axios from 'axios'

//请求搜索商品页，分类导航数据
function getNavelist(lg,lt){
	
	return new Promise((resolve,reject)=>{
		axios.get(Api.NavelistApi+'?latitude='+lt+'&longitude='+lg)
		.then((res)=>{
			resolve(res.data)
		})
		.catch((error)=>{
			console.log(error);
		})
	})
	
}

//请求搜索商品页，筛选导航数据快递公司
function getExpress(lg,lt){
	return new Promise((resolve,reject)=>{
		axios.get(Api.ExpressApi+'&latitude='+lt+'&longitude='+lg)
		.then((res)=>{
			resolve(res.data[0].text)
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}

//请求搜索商品页，筛选导航商家属性
function getMerchant(lg,lt){
	return new Promise((resolve,reject)=>{
		axios.get(Api.MerchantApi+'&latitude='+lt+'&longitude='+lg)
		.then((res)=>{
			resolve(res.data)
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}

//商品详情页数据请求
function getSellerTitleData(id,lg,lt){
	var data = '?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification'
	return new Promise((resolve,reject)=>{
		axios.get(Api.SellerTitleData+id+data+'&latitude='+lt+'&longitude='+lg)
		.then((res)=>{
			resolve(res.data)
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}

//商品详情滚动视图内容请求
function getShoppingcontent(id){
	return new Promise((resolve,reject)=>{
		axios.get(Api.Shoppingcontent+"?restaurant_id="+id)
		.then((res)=>{
			var myArr = []
			var arr = []
			for(var i=0; i<res.data.length; i++){
				var obj = {}
				obj.foods = res.data[i].foods.map((item)=>{
					var obj = {};
					obj.name = item.name;
					obj.price = item.specfoods[0].price;
					obj.num = 0;
					obj.img = item.image_path
					return obj
				})
				arr.push(obj)
			}
			myArr.push(arr)
			myArr.push(res.data)
			resolve(myArr)
			
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}

//商品详情评价内容请求 星级评价
function getSellerevaluation(id){
	var data = '/ratings?has_content=true&offset=0&limit=10'
	return new Promise((resolve,reject)=>{
		axios.get(Api.Sellerevaluation+id+data)
		.then((res)=>{
			resolve(res.data)
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}

//星级评价
function getScore(id){
	var score = '/ratings/scores'
	return new Promise((resolve,reject)=>{
		axios.get(Api.Sellerevaluation+id+score)
		.then((res)=>{
			resolve(res.data)
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}

//内容
function getTags(id){
	var tags = '/ratings/tags'
	return new Promise((resolve,reject)=>{
		axios.get(Api.Sellerevaluation+id+tags)
		.then((res)=>{
			resolve(res.data)
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}


export default{
	getNavelist,
	getExpress,
	getMerchant,
	getSellerTitleData,
	getShoppingcontent,
	getSellerevaluation,
	getScore,
	getTags
}










































