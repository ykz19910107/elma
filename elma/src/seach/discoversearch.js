//数据请求处理
import API from '../url-api/discoverlink.js'
import axios from 'axios'

//请求发现页面积分数据
function getIntegral(){
	return new Promise((resolve,reject)=>{
		axios.get(API.DiscoverData)
		.then((res)=>{
			resolve([res.data[1],res.data[2]])
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}

//发现页面美食请求
function getHotfood(lg,lt){
	return new Promise((resolve,reject)=>{
		axios.get(API.Discoverfood+'&longitude='+lg+'&latitude='+lt)
		.then((res)=>{
			var newArr = res.data[0].foods.map((item)=>{
				var newItem = {};
				newItem.imghash = item.image_hash;
				newItem.price = "￥"+item.price;
				newItem.name = item.name
				return newItem
			})
			resolve(newArr)
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}

//发现页面天天特价
function getPrice(lg,lt){
	return new Promise((resolve,reject)=>{
		axios.get(API.DiscoverPrice+'&longitude='+lg+'&latitude='+lt)
		.then((res)=>{
			var newArr=[]
			for(var i=0; i<3; i++){
				var newobj={};
				newobj.imghash = res.data.query_list[i].foods[0].image_path;
				newobj.price = "￥"+res.data.query_list[i].foods[0].price;
				newobj.name = res.data.query_list[i].foods[0].name
				newArr.push(newobj)
			}
			resolve(newArr)
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}

//发现页面限时好礼请求
function getSuggest(){
	return new Promise((resolve,reject)=>{
		axios.get(API.DiscoverSuggest)
		.then((res)=>{
			var newArr = res.data.map((item)=>{
				var newItem = {};
				newItem.imghash = item.image_hash;
				newItem.price = item.points_required+"积分";
				newItem.name = item.title
				newItem.corner_marker=item.corner_marker
				return newItem
			})
			resolve(newArr)
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}


export default{
	getIntegral,
	getHotfood,
	getPrice,
	getSuggest
}































