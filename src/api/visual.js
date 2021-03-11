import { url,isOnlineUrl } from '@/config';
var request = window.axios;
export const getList = (params) => request({
  url: url + '/visual/list',
  method: 'get',
  params: params
});



export const copyObj = (id) => request({
  url: url + '/visual/copy',
  method: 'post',
  params: {
    id: id
  }
});

export const getCategory = (params) => request({
  url: url + '/category/list',
  method: 'get',
  params: params
});

export const getObj = (id) => request({
  url: url + '/visual/detail',
  method: 'get',
  params: {
    id
  }
});
export const uploadImg = (file) => request({
  url: url + '/visual/put-file',
  method: 'post',
  data: 'file=' + file,
  headers: { "Content-Type": "multipart/form-data" }
});

/**
 * 兼容线上数据
 * @param data
 * @returns {*}
 */
function dealSaveData(data){
  if(isOnlineUrl(url) ) return {
    visual: {
      password: data.password,
      category: data.category,
      status: data.status,
      title: data.title,
    },
    config: {
      detail: JSON.stringify({
        name: data.title,
        width: data.width,
        height: data.height,
        scale: 1,
        backgroundImage: './img/bg/bg1.png',
        url: '',
        mark: {},
        gradeShow: false,
        gradeLen: 30,
      }),
      component: '[]'
    }
  }
  return {
    status:"0",
    type: data.category,
    screenName:data.title,
    screenDescribe:"",
    imageUrl:'./img/bg/bg1.png',
    desScreenMainJson:JSON.stringify({
      name:data.title,
      protectionCode:data.password,
      width: data.width,
      height: data.height,
      backgroundImage:'./img/bg/bg1.png'
      }),
    desScreenItemJson:"[]",
    protectionCode: data.password,
    delFlag:0
  }
}

function dealUpdateData(data){
  if(isOnlineUrl(url)) return data;
  let postData = null;
  //区分是组件更新还是报表更新
  if(data.visual){
    postData = {
      id:data.visual.id,
      imageUrl:data.visual.backgroundUrl,
      desScreenMainJson:data.config.detail,
      desScreenItemJson:data.config.component,
      thumbnail:JSON.parse(data.config.detail).thumbnail
   }
  }else{
     postData = {
        id:data.id,
        type:data.category,
        status:data.status,
        protectionCode:data.password,
        screenName:data.title
     }
  }
  return postData;
}

export const addObj = (data) => {
  let postData = dealSaveData(data)
  return request({
    url: url + '/visual/save',
    method: 'post',
    data: postData
  });
}

export const updateComponent = (data) => {
  let updateData = dealUpdateData(data);
  return request({
    url: url + '/visual/update',
    method: 'post',
    data: updateData
  });
}

export const updateObj = (data) => {
  // 兼容线上更新数据
  let updateData = dealUpdateData(data)
 return request({
  url: url + '/visual/update',
  method: 'post',
  data: updateData
});
}

export const delObj = (id) => request({
  url: url + '/visual/remove',
  method: isOnlineUrl(url)?'post':'delete',
  params: {
    ids: id
  }
});
