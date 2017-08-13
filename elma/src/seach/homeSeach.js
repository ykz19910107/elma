//数据请求处理
import Api from '../url-api'
import axios from 'axios'

//请求地址
function getAddressData(lg,lt){
	return new Promise((resolve, reject)=>{
		axios.get(Api.addressApi+'?latitude='+lt+'&longitude='+lg)
		.then((res)=>{
			resolve(res.data.name);
		})
		.catch(function (error) {
		    console.log(error);
		});
	})
	
}

//请求天气
function getWeatherApi(lg,lt){
	return new Promise((resolve, reject)=>{
		axios.get(Api.weatherApi+'?latitude='+lt+'&longitude='+lg)
		.then((res)=>{
			resolve(res.data)
		})
		.catch(function (error) {
		    console.log(error);
		});
	})
}

//请求热搜词
function getHotword(lg,lt){
	return new Promise((resolve,reject)=>{
		axios.get(Api.hotWordsApi+'?latitude='+lt+'&longitude='+lg)
		.then((res)=>{
			var newArr = res.data.map((item)=>{
				return item.word;
			})
			resolve(newArr)
		})
		.catch(function(error){
			console.log(error);
		});
	})
}

//请求轮播数据
function getCateGoryApi(lg,lt){
	return new Promise((resolve,reject)=>{
		axios.get(Api.categoryApi+'&latitude='+lt+'&longitude='+lg)
		.then((res)=>{
			var newArr = res.data[0].entries.map((item)=>{
				var newItem = {};
				newItem.name = item.name;
				newItem.id = item.id;
				newItem.imgPath = item.image_hash;
				newItem.flag = item.business_flag;
				return newItem;
			})
			resolve(newArr);
		})
		.catch(function(error){
			console.log(error);
		});
	})
}

//请求商家数据
function getMerchantList(lg,lt){
	return new Promise((resolve,reject)=>{
		axios.get(Api.merchantListApi+'&latitude='+lt+'&longitude='+lg)
		.then((res)=>{
			var newArr = res.data.map((item)=>{
				var obj = {};
				obj.name = item.name;
				obj.id = item.id;
				obj.imagePath = item.image_path;//图片地址
				obj.rating = item.rating;//评价
				obj.recent_order_num = item.recent_order_num;//月销量
				obj.rules = item.piecewise_agent_fee.rules;//配送费
				obj.order_lead_time = item.order_lead_time//配送时间
				obj.activities = item.activities//活动
				obj.writ = item.supports//票和保
				obj.delivery_mode = item.delivery_mode//配送单位
				obj.distance = item.distance//距离
				obj.list = false //判断列表是否收起
				return obj;
			})
			resolve(newArr)
		})
		.catch(function(error){
			console.log(error);
		});
	})
}

//地址搜索
function searchAddressData(keyword,lg,lt){
	return new Promise((resolve,reject)=>{
		axios.get(`${Api.addressSearchApi}&keyword=${keyword}&latitude=${lt}&longitude=${lg}`)
		.then((response)=>{
			resolve(response.data)
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}

//热门搜索
function getHotseach(lg,lt){
	return new Promise((resolve,reject)=>{
		axios.get(Api.HotseachApi+'&latitude='+lt+'&longitude='+lg)
		.then((res)=>{
			resolve(res.data)
		})
		.catch((error)=>{
			console.log(error);
		})
	})
}

//热门搜索列表数据请求
function searchListData(keyword,lg,lt){
	return new Promise((resolve,reject)=>{
		axios.get(`${Api.Seachlist}&keyword=${keyword}&latitude=${lt}&longitude=${lg}`)
		.then((res)=>{
			var data = res.data[0] ? res.data[0] :res.data[1]
			var newArr = data.restaurant_with_foods.map((item)=>{
				var obj = {};
				obj.name = item.restaurant.name;
				obj.id = item.restaurant.id;
				obj.imagePath = item.restaurant.image_path;//图片地址
				obj.rating = item.restaurant.rating;//评价
				obj.recent_order_num = item.restaurant.recent_order_num;//月销量
				obj.rules = item.restaurant.piecewise_agent_fee.rules;//配送费
				obj.order_lead_time = item.restaurant.order_lead_time//配送时间
				obj.writ = item.restaurant.supports//票和保
				obj.delivery_mode = item.restaurant.delivery_mode//配送单位
				obj.distance = item.restaurant.distance//距离
				return obj;
			})
			resolve(newArr)
		})
		.catch(function(error){
			console.log(error);
		});
	})
}


//热门搜索列表数据请求
function bannerListData(lg,lt){
	return new Promise((resolve,reject)=>{
		axios.get(`${Api.Bannerlist}&latitude=${lt}&longitude=${lg}`)
		.then((res)=>{
			console.log(res)
			var newArr = res.data.map((item)=>{
				var obj = {};
				obj.name = item.name;
				obj.id = item.id;
				obj.imagePath = item.image_path;//图片地址
				obj.rating = item.rating;//评价
				obj.recent_order_num = item.recent_order_num;//月销量
				obj.rules = item.piecewise_agent_fee.rules;//配送费
				obj.order_lead_time = item.order_lead_time//配送时间
				obj.writ = item.supports//票和保
				obj.delivery_mode = item.delivery_mode//配送单位
				obj.distance = item.distance//距离
				obj.list = false //判断列表是否收起
				return obj;
			})
			resolve(newArr)
		})
		.catch(function(error){
			console.log(error);
		});
	})
}

export default {
	getAddressData,
	getHotword,
	getWeatherApi,
	getCateGoryApi,
	getMerchantList,
	searchAddressData,
	getHotseach,
	searchListData,
	bannerListData
}




































