//基本配置
export const config = {
  width: 1920,
  height: 1080,
  scale: 1,
  mark: {
    show: false,
    text: 'avue数据大屏水印',
    fontSize: 20,
    textStyle: 'rgba(100,100,100,0.2)',
    degree: -20
  },
  backgroundImage: './img/bg/bg1.png',
  query: {}
};
// 颜色的配置
export const colorOption = {
  size: 'mini',
  columnBtn: false,
  refreshBtn: false,
  menuWidth: 150,
  labelWidth: 100,
  dialogHeight: 200,
  column: [{
    label: '颜色1',
    prop: 'color1',
    type: 'color',
  }, {
    label: '渐变色',
    prop: 'color2',
    type: 'color',
  }, {
    label: '位置',
    prop: 'postion',
    type: 'number'
  }]
}

// 表格的列配置
export const tableOption = {
  size: 'mini',
  columnBtn: false,
  refreshBtn: false,
  menuWidth: 150,
  labelWidth: 100,
  dialogHeight: 120,
  column: [{
    label: '名称',
    prop: 'label',
  }, {
    label: 'key值',
    prop: 'prop',
  }, {
    label: '宽度',
    prop: 'width',
  }]
}
//一些字典的配置
export const dicOption = {
  pieLabelPosition : [{ label: '外侧', value: 'outside' },{label: '内部', value: 'inside'},{label: '中心', value: 'center'}], //饼图标签位置
  scatterLabelPosition : [{ label: '顶部', value: 'top' },{label: '内部', value: 'inside'},{label: '左部', value: 'left'},{label: '右部', value: 'right'}],//散点图标签位置
  stepList:[{ label: '当前点', value: 'start' }, { label: '中间点', value: 'middle' }, { label: '下个点拐弯', value: 'end' }],
  topList:[{ label: '顶部', value: 'top' },{label: '底部', value: 'bottom'}],
  geoCoordType: [{ label: '向内扩散', value: 1 }, { label: '向外扩散', value: 2 }],
  line: [{ label: '线条', value: 'line' }, { label: '圆环', value: 'circle' }],
  fontWeight: [{ label: 'normal', value: 'normal' }, { label: 'bold', value: 'bold' }, { label: 'bolder', value: 'bolder' }, { label: 'lighter', value: 'lighter' }],
  border: [{ label: '无边框', value: '' }, { label: '内置图片', value: 'img' }, { label: '内置边框', value: 'border' }],
  textAlign: [{ label: '居中', value: 'center' }, { label: '左对齐', value: 'left' }, { label: '右对齐', value: 'right' }],
  position: [{ label: '居中', value: 'center' }, { label: '左对齐', value: 'flex-start' }, { label: '右对齐', value: 'flex-end' }],
  dataType: [{ label: '静态数据', value: 0 }, { label: '动态数据', value: 1 }],
  orientList: [{ label: '竖排', value: 'vertical' }, { label: '横排', value: 'horizontal' }],
  dataMethod: [{ label: 'POST', value: 'post' }, { label: 'GET', value: 'get' }],
  eventList: ['tabs'],
  dataList: ['candlestick','commonChart','coolrdMap','text', 'wordcloud', 'img', 'tabs', 'map', 'video', 'pie', 'pictorialbar', 'iframe', 'swiper', 'flop', 'bar', 'line', 'progress', 'table', 'gauge', 'funnel', 'scatter', 'radar','terminal','markMap',
  'virual-map','slippage'],
  themeList: [{
    label: '默认配色',
    value: 'avue'
  }, {
    label: '紫色主题',
    value: 'macarons'
  }, {
    label: '绿色主题',
    value: 'wonderland'
  }],

  barList: ['bar', 'line','candlestick','terminal', 'scatter'],
  cylinderList:['bar','terminal'],
  titleList: ['bar', 'pie', 'line', 'radar', 'funnel','terminal'],
  labelList: ['bar', 'line', 'pie', 'radar', 'scatter','pictorialbar'],
  legendList: ['bar', 'pie', 'line','candlestick', 'radar', 'funnel','terminal'],
  colorList: ['bar', 'pie', 'line', 'funnel', 'scatter', 'radar','terminal'],
  tipList: ['bar', 'pie', 'line', 'funnel', 'scatter', 'radar','terminal'],
  postionList: ['bar', 'line', 'pictorialbar','terminal','scatter'],
  formatterList: ['bar', 'map', 'line', 'pie', 'funnel', 'scatter', 'radar'],
  clickFormatterList: ['map'],
  labelFormatterList: ['bar'],
  mapList:['map'],
  
  tabsTypeList: [{
    label: '选项卡',
    value: 'tabs',
  }, {
    label: '选择框',
    value: 'select',
  }],
  mapType: [{
    label: '原生',
    value: 0
  }],
  target: [{ label: '本窗口', value: '_self' }, { label: '新窗口', value: '_blank', }],
  swiperType: [{ label: '普通', value: '' }, { label: '立体', value: 'card' }],
  swiperIndicator: [{ label: '外部', value: 'indicator' }, { label: '不显示', value: "none" }],
  directionList:[{label: '竖向',value: 'vertical'},{label: '横向',value: 'horizontal'}],
  format: [{ label: '日期', value: 'yyyy-MM-dd' }, { label: '日期+时分', value: 'yyyy-MM-dd hh:mm' }, { label: '日期+时分秒', value: 'yyyy-MM-dd hh:mm:ss' }, { label: '日期(无年)', value: 'MM-dd' }, { label: '时分', value: 'hh:mm' }, { label: '时分秒', value: 'hh:mm:ss' }, { label: '星期', value: 'day' }],
  borderStyle:[{label:'实线',value:'solid'},{label:'虚线',value:'dashed'},{label:'隐藏',value:'hidden'}],
}


function concat (prop, count, type, extend = [], defaults) {
  let list = [];
  for (let i = 1; i <= count; i++) {
    // 处理图片不存在的情况
    if(prop==='source' && i>=121 && i<=129) continue
    list.push({
      label: prop + i,
      // 兼容部署
      value: `./img/${prop}/${prop}${i}.${extend.includes(i) ? defaults : type}`
    })
  }
  return list;
}
//加载图片素材库
export const imgOption = [
  concat('bg', 10, 'jpg', [1, 2, 3], 'png'),
  concat('border', 16, 'png'),
  concat('source', 260, 'svg', [1, 15, 16, 20, 239.240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260], 'png'),
  concat('banner', 10, 'png'),
]
