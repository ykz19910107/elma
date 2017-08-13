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
			console.log("美食")
			console.log(res.data)
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
			console.log("特价")
			console.log(res.data)
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
			console.log("好礼")
			console.log(res.data)
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































