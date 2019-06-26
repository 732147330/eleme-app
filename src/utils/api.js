const domain = {
  cur: 0,//0-模拟本地环境
  version: '1.0.0',
  urlList: [
    'http://mockjs.com',
  ],
  baseUrl: function () {
    return this.urlList[this.cur]
  }
};

export default {
  //商家信息
  seller: `${domain.baseUrl()}/api/seller`,
  //商品信息
  goods: `${domain.baseUrl()}/api/goods`,
  //评论信息
  ratings: `${domain.baseUrl()}/api/ratings`,
}
