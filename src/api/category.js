import { url,isOnlineUrl } from '@/config';
var request = window.axios;
export const getList = (params) => request({
  url: url + '/category/list',
  method: 'get',
  params: params
});



export const getObj = (id) => request({
  url: url + '/category/detail',
  method: 'get',
  params: {
    id
  }
});

export const addObj = (data) => request({
  url: url + '/category/save',
  method: 'post',
  data: data
});
export const updateObj = (data) => request({
  url: url + '/category/update',
  method: 'post',
  data: data
});



export const delObj = (id) => request({
  url: url + '/category/remove',
  method: isOnlineUrl(url)?'post':'delete',
  params: {
    ids: id
  }
});