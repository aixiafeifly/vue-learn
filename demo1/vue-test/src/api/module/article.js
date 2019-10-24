import base from '../base' // 导入接口域名列表
import axios from '../http' // 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块
console.log(base.sq)
const article = {
  // 新闻列表
  articleList() {
    return axios.get(`${base.sq}/topics`)
  },
  // 新闻详情,演示
  articleDetail(id, params) {
    return axios.get(`${base.sq}/topic/${id}`, {
      params: params
    })
  },

  login(params) {
    console.log('====================================')
    return axios.post(`${base.sq}/accesstoken`, qs.stringify(params))
  }

}
console.log(`${base.sq}/accesstoken`)

export default article
