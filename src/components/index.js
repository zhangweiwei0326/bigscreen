/** 
 * 自定义组件参考文档
 * https://cn.vuejs.org/v2/guide/components-registration.html
*/
import Vue from 'vue'
import Test from './test/';
import CoolrdMap from './coolrdMap';
import Terminal from './terminal';
import MarkMap from './markMap';
import VirualMap from './virualMap';
import Slippage from './slippage'

const list = [
  Test,
  CoolrdMap,
  Terminal,
  MarkMap,
  VirualMap,
  Slippage
]
//循环注册组件
list.forEach(ele => {
  Vue.component(`avue-echart-${ele.name}`, ele)
})