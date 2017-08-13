const imgHost = 'http://fuss10.elemecdn.com/';
//接口参数
//latitude
//longitude
const addressApi = '/bgs/poi/reverse_geo_coding';

//接口参数
//latitude=22.54286&longitude=114.059563
const weatherApi = '/bgs/weather/current';
//
////接口参数
////latitude=22.54286&longitude=114.059563
const hotWordsApi = '/shopping/v3/hot_search_words';
//
////接口参数
////latitude=22.54286&longitude=114.059563
const categoryApi = '/shopping/v2/entries?templates[]=main_template';
//
////接口参数
////latitude=22.54286&longitude=114.059563
const merchantListApi ='/shopping/restaurants?offset=0&limit=20&extras[]=activities&terminal=h5'

////接口参数
////latitude=22.54286&longitude=114.059563
const HotseachApi = '/shopping/v3/hot_search_words?geohash=ws102b7yqz1j'

//搜索商品列表
const Seachlist = 'shopping/v1/restaurants/search?offset=0&limit=20&search_item_type=2&extra[]=activities'

//请求搜索商品页，分类导航数据
const NavelistApi = '/shopping/v2/restaurant/category'

//请求搜索商品页，筛选导航数据
const ExpressApi = '/shopping/v1/restaurants/delivery_modes?kw='

const MerchantApi = '/shopping/v1/restaurants/activity_attributes?kw='


//bannerlist 商品数据列表请求
const Bannerlist = '/shopping/restaurants?keyword=&offset=0&limit=20&extras[]=activities'

//请求商品详情页头部数据
const SellerTitleData = '/shopping/restaurant/'

//请求商品详情内容
const Shoppingcontent = '/shopping/v2/menu'

//商品详情评价内容请求
const Sellerevaluation = '/ugc/v2/restaurants/'

//const addressApi = '/static/data/address.json';
//
//const weatherApi = '/static/data/weather.json';
//
//const hotWordsApi = '/static/data/hotSearch.json';
//
//const categoryApi = '/static/data/entries.json';
//
//const merchantListApi = '/static/data/merchantList.json';

//搜索接口
//longitude=114.059563&latitude=22.54286
const addressSearchApi = '/bgs/poi/search_poi_nearby?offset=0&limit=10';

export default {
	imgHost,
	addressApi,
	weatherApi,
	hotWordsApi,
	categoryApi,
	merchantListApi,
	addressSearchApi,
	HotseachApi,
	Seachlist,
	NavelistApi,
	ExpressApi,
	MerchantApi,
	Bannerlist,
	SellerTitleData,
	Shoppingcontent,
	Sellerevaluation
}








