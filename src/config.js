export default {
  COMPNAME: "avue-echart-",
  NAME: "list",
  DEAFNAME: 'item'
}
// 定时时间自动保存
export const timeSave = [1,5,10];
// 备份最大数量
export const maxBackCount = 3;
const isOnlineUrl = (url) =>{
  return url.indexOf("data.bladex.vip")!=-1
}
const domianURL = window._CONFIG['domianURL']
export const url =  isOnlineUrl(domianURL)?domianURL:domianURL+"/bigscreen"
// 根据id加载地图接口
export const mapUrl=`${url}/map/data?id`

// 接口请求是否需要token校验
export const IS_VERIFY_TOKEN = false

export {
  isOnlineUrl
} 