const imgHost = 'http://fuss10.elemecdn.com/';

//发现页面请求头部积分商城数据
const DiscoverData= '/member/v1/discover?platform=1&block_index=0'

//发现页面美食请求
const Discoverfood = '/hotfood/v1/guess/likes?offset=0&limit=3&request_id=6a79b2c1-449c-4e81-a28d-1e0244c6c696&tag_id=-1&columns=1'

//发现页面天天特价
const DiscoverPrice='shopping/v1/sale_list_index?type=special_food&params=%7B%7D'

//发现页面限时好礼请求
const DiscoverSuggest= '/member/gifts/suggest'

export default {
	DiscoverData,
	Discoverfood,
	DiscoverPrice,
	DiscoverSuggest
}