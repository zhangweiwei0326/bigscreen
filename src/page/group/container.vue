<template>
  <div class="middle">
    <div class="wrapper__grade"
         @mousedown="contain.handleMouseDown"></div>
    <div id="wrapper"
         class="wrapper"
         @mousedown="contain.handleMouseDown">
      <div class="content"
           id="content"
           ref="content"
           :highline="contain.highline"
           @mousedown="handleAlign"
           @mouseup="handleAlign"
      >

        <div class="container"
             :style="styleName"
             id="container"
             ref="container">
          <div class="grade"
               v-if="gradeFlag || contain.config.gradeShow"
               :style="gradeLenStyle"></div>
               <!-- 中间图表组件  -->
          <subgroup ref="subgroup"
                    :nav="contain.list"></subgroup>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subgroup from './subgroup'
import common,{timeSave,isOnlineUrl,url,mapUrl,maxBackCount} from '@/config'
import { getObj } from '@/api/visual'
export default {
  // content是html内置标签,liangxs
  name: 'contain',
  inject: ["contain"],
  provide () {
    return {
      contain: this.contain,
      container: this
    };
  },
  components: {
    subgroup
  },
  data () {
    return {
      selectCount: {},
      scale: 1,
      gradeFlag: false,
      highline: false
    }
  },
  computed: {
    timeData () {
        const timeData = window.localStorage.getItem(`timeData`);
        return  timeData?JSON.parse(timeData):{}
    },
    stepScale () {
      let scale = Number(((1 / this.scale) * 100).toFixed(2));
      return scale
    },
    //计算中央可视化大屏比例
    styleName () {
      let backgroundImage = this.contain.config.backgroundImage
      let backgroundColor = this.contain.config.backgroundColor
      if(backgroundImage && backgroundImage.startsWith("/")){
          backgroundImage = "."+backgroundImage
      }
      let scale = this.contain.config.scale;
      return Object.assign({
        transform: `scale(${scale / 100}, ${scale / 100})`,
        width: this.setPx(this.contain.config.width),
        height: this.setPx(this.contain.config.height),
        backgroundColor: this.contain.config.backgroundColor
      }, (() => {
        //---2020/08/26--lsq--begin如果背景图片不存在并且背景颜色存在，设置背景颜色---
        if (!backgroundImage && backgroundColor) {
          return {
            background: backgroundColor,
          }
        }
        //---2020/08/26--lsq--end如果背景图片不存在并且背景颜色存在，设置背景颜色---
        //如果背景图片存在
        if (backgroundImage) {
          return {
            background: `url(${backgroundImage}) 0% 0% / 100% 100% rgb(3, 12, 59)`,
          }
        }
        return
      })())
    },
    gradeLenStyle () {
      return {
        backgroundSize: `${this.setPx(this.contain.config.gradeLen)} ${this.setPx(this.contain.config.gradeLen)},${this.setPx(this.contain.config.gradeLen)} ${this.setPx(this.contain.config.gradeLen)}`
      }
    }
  },
  watch:{
    highLine() {
      if (this.contain.highline) {
        this.styleLineName.borderColor = "red";
      }
       this.styleLineName.borderColor = "#09f";
    }

  },
  mounted () {
    this.initData();
    this.initFun();
  },
  methods: {
      //  对齐事件
    handleAlign(){
      if(this.contain.active == -1){
          return
      }
      let activeTop = this.contain.activeObj.top
      let activeLeft = this.contain.activeObj.left
      let flag = false
      for(let index = 0;index < this.contain.list.length;index++){
          let item = this.contain.list[index];
          if(Math.abs(parseInt(item.top) - parseInt(activeTop)) < 10 && item.left !== activeLeft){
              flag = true
              this.contain.highline = true
              break;
          }
          if(Math.abs(parseInt(item.left) - parseInt(activeLeft)) < 10  && item.top !== activeTop){
              flag = true
              this.contain.highline = true
              break;
          }
      }
      //  console.log("-----",flag)
      if(!flag){
          this.contain.highline = false

      }

    },
    // handleSelectMouseDown(){

    // },
    // handleSelectMouseMove(){

    //   // this.handleAlign()
    // },
    // handleSelectMouseUp(){

    //   this.handleAlign()
    // },
    initFun () {
      ['handleRefresh', 'handleGetObj'].forEach(ele => {
        this[ele] = this.$refs.subgroup[ele]
      });
    },
    dealDetailData(data){
      if(isOnlineUrl(url))  return data;
      data.visual={
            "id": data.id,
            "createUser":data.createBy,
            "createDept": -1,
            "createTime": data.createTime,
            "updateUser": -1,
            "updateTime": data.updateTime,
            "status": data.status,
            "isDeleted": data.delFlag,
            "title": data.screenName,
            "backgroundUrl": data.imageUrl,
            "category": data.category,
            "password": data.protectionCode
     }
      data.config= {
             "id": data.id,
             "visualId":data.id,
             "detail":data.desScreenMainJson

      }
        let detailData = []
        if(data.desScreenItemJson){
              detailData = eval("("+data.desScreenItemJson+")") || [];
         }
         //处理之前老数据,数据保存后可以不调用该方法
         this.dealOldData(detailData)
         data.config.component = JSON.stringify(detailData);
         return data;
    },
    dealMapUrl(mapData){
        let mapUrl='';
        if(!mapData){
            mapUrl =url+`/map/data?id=1235103352843448322`;
        }else {
          //author：liangxs  for:解决导入地图组件显示不出来问题,需要改成将项目前缀传给地图组件  date:20200624
            const id =  mapData.substring(mapData.indexOf('?id=')+'?id='.length);
            mapUrl = url+`/map/data?id=${id}`;
           //author：liangxs  for:解决导入地图组件显示不出来问题,需要改成将项目前缀传给地图组件  date:20200624
         }
        return mapUrl;

    },
    dealOldData(detailData){
       detailData.forEach(item=>{
                  const prop = item.component && item.component.prop
                  if(item.component.option){
                     item.option = item.component.option
                  }
                 if(prop=="text"){
                   if(item.component.option){
                      const value = item.data
                      item.data={}
                      item.data.value = value
                   }
               }else if(prop=="map"){
                 //地图组件
                   item.option.mapData = this.dealMapUrl(item.option.mapData);
                 }else if(prop=="virual-map"){
                      //城市派件地图
                    item.option.selectProvinceUrl= this.dealMapUrl(item.option.selectProvinceUrl);
                  }else if(prop==='markMap'){
                     //地理坐标图
                        item.option.chinaMapUrl = this.dealMapUrl(item.option.chinaMapUrl);
                  }else if(prop==='coolrdMap'){
                     //全国物流地图
                        item.option.chinaMapUrl = this.dealMapUrl(item.option.chinaMapUrl);
                  }else if(prop=="img"){
                    // 兼容之前图片格式
                    const data = item.data;
                    let imagePath=""
                    if(typeof(data)=='string'){
                       imagePath = data;
                       item.data={}
                    }else{
                      imagePath = item.data.value
                    }
                    item.data.value = imagePath
                 }

                   delete  item.component.option
                })
    },
    clearIntervalData (){
      if(this.timeData && this.timeData.timeConfig){
          timeSave.forEach(item=>{
             clearInterval(this.timeData.timeConfig[item]);
          })
          this.timeData.timeConfig =  {};
      }

    },
    //定时保存数据
    setIntervalData (timeMin,id){
        const timeInterval = setInterval(()=>{
           console.log(timeMin,'开始保存数据');
           const configObj = {};
           configObj.config = this.contain.config;
           configObj.detail = this.contain.list;
           window.localStorage.setItem(`${timeMin}_${id}_config`,JSON.stringify(configObj));
        },timeMin*1000*60);
        this.timeData.currentId = id;
        this.timeData.timeConfig = this.timeData.timeConfig || {};
        this.timeData.timeConfig[timeMin] = timeInterval;
         this.timeData.data = this.timeData.data || [];
         let saveObj = this.timeData.data.find(item=>item.id===id);
         if(saveObj){
           saveObj.time = new Date().getTime();
            return;
         }
         saveObj = {id,time:new Date().getTime()};
              if(this.timeData.data.length>=maxBackCount) {

                  const reportId = [...this.timeData.data].sort((a,b)=>a.time-b.time)[0].id;
                  timeSave.forEach(item=>{
                     delete window.localStorage[`${item}_${reportId}_config`];
                  })
                  this.timeData.data.shift(); //删除最早保存的对象
              }
              this.timeData.data.push(saveObj);
    },
    //初始化数据
    initData () {
      const id = this.$route.params.id;
      const type =  window.localStorage.getItem('type');
      const initSaveFn=()=>{
          //清除原有定时器
          this.clearIntervalData();
          timeSave.forEach(item=>{
                    this.setIntervalData(item,id);
         });
         window.localStorage.setItem(`timeData`,JSON.stringify(this.timeData));
      }
      this.contain.id = id;
      this.contain.contentWidth = this.$refs.content.offsetWidth;
      const isBuild = this.$route.name === 'build';
      const width = isBuild ? this.contain.contentWidth : document.body.clientWidth
      if (id) {
        const loading = this.$loading({
          lock: true,
          text: '正在加载中，请稍后',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        getObj(id).then(res => {
          const callback = () => {
            //赋值属性
             this.contain.nav = JSON.parse(config.component) || [];
            this.calcData();
            this.setScale(width);
          }
          let data = res.data.data || res.data.result;
          //兼容之前数据
          data = this.dealDetailData(data)
          this.contain.obj = data;
          const config = data.config;
          this.contain.config = JSON.parse(config.detail) || {};
          this.contain.visual = data.visual;
          // 加入缩略图
          const thumbnailList = [];
          const thumbnail = JSON.parse(config.detail).thumbnail;
          if(thumbnail) {
                 thumbnailList.push(
                   {
                     name:thumbnail.substring(thumbnail.lastIndexOf("/")+1),
                     url:thumbnail
                   }
                 );
          }
          this.$set(this.contain.config, 'thumbnailList', thumbnailList);
          this.setScale(width);
          const passwdFn = ()=>{
            callback();
            const password = this.contain.visual.password
             if (!this.validatenull(password) && type!=='1') {
              this.$prompt('请输入密码', '提示', {
                inputType:"password",
                confirmButtonText: '确定',
                showCancelButton: false,
                showClose: false,
                closeOnClickModal: false,
                inputPattern: new RegExp(password),
                inputErrorMessage: '密码不正确，请重新输入'
              }).then(({value}) => {
                  if(value!==password){
                    this.$message.error('密码不正确，请重新输入');
                    passwdFn();
                   return;
                }
                 initSaveFn();

              })
            } else {
              callback();
                initSaveFn();
            }
          //添加水印。只有查看页面生效
          if (!isBuild) {
            if (this.contain.config.mark.show) {
              this.watermark(this.contain.config.mark);
            }
          }

          }
          if(isBuild){
              passwdFn()
          }else{
            callback()
          }
          window.localStorage.removeItem('type')
          loading.close();
        }).catch((err) => {
          console.log(err)
          loading.close();
        })
      } else {
        this.setScale(width);
      }
    },
    //适配尺寸
    setResize () {
      this.$nextTick(() => {
        this.$refs.content.style.width = this.setPx((this.contain.config.scale * this.contain.config.width) / 100)
        this.$refs.content.style.height = this.setPx((this.contain.config.scale * this.contain.config.height) / 100)
      })
    }, 
    //计算比例
    setScale (width) {
      this.$nextTick(() => {
        this.contain.config.scale = (width / this.contain.config.width) * 100
        this.scale = this.contain.config.scale;
        this.setResize();
      })
    },
    calcData () {
      if (!this.contain.config.mark) this.contain.config.mark = {}
      if (!this.contain.config.query) this.contain.config.query = {}
    },
    handlePostionSelect (postion) {
      this.handleCalcPostionSelect();
      const x1 = this.selectCount.maxx1;
      const x2 = this.selectCount.maxx2;
      const y1 = this.selectCount.maxy1;
      const y2 = this.selectCount.maxy2;
      if (postion === 'left') {
        this.handleMoveSelectList(x1, undefined, true, postion);
      } else if (postion === 'center') {
        this.handleMoveSelectList(x1 + (x2 - x1) / 2, undefined, true, postion);
      } else if (postion === 'right') {
        this.handleMoveSelectList(x2, undefined, true, postion);
      } else if (postion === 'top') {
        this.handleMoveSelectList(undefined, y1, true, postion);
      } else if (postion === 'middle') {
        this.handleMoveSelectList(undefined, y1 + (y2 - y1) / 2, true, postion);
      } else if (postion === 'bottom') {
        this.handleMoveSelectList(undefined, y2, true, postion);
      }
    },
    handleMoveSelectList (left, top, type, postion) {
      this.contain.active.forEach(ele => {
        ele = this.contain.findlist(ele)
        const ele_component = ele.component;
        //水平情况
        if (left) {
          let baseLeft = Number(type ? left : (ele.left + left).toFixed(2));
          if (postion === 'right') {
            baseLeft = baseLeft - ele_component.width
          }
          else if (postion === 'center') {
            const obj_center = ele.left + ele_component.width / 2;
            baseLeft = ele.left + (left - obj_center)
          }
          this.$set(ele, 'left', baseLeft);
          this.$refs.subgroup.$refs[common.DEAFNAME + ele.index][0].setLeft(baseLeft)
        }
        //垂直情况
        if (top) {
          let baseTop = Number(type ? top : (ele.top + top).toFixed(2));
          if (postion === 'bottom') {
            baseTop = baseTop - ele_component.height
          }
          else if (postion === 'middle') {
            const obj_middle = ele.top + ele_component.height / 2;
            baseTop = ele.top + (top - obj_middle)
          }
          this.$set(ele, 'top', baseTop)
          this.$refs.subgroup.$ref[common.DEAFNAME + ele.index][0].setTop(baseTop)
        }
      })
    },
    //计算多选状态下的最大边界值
    handleCalcPostionSelect () {
      this.selectCount.maxx1 = 99999;
      this.selectCount.maxy1 = 99999;
      this.contain.active.forEach(ele => {
        ele = this.contain.findlist(ele)
        const left = ele.left;
        const top = ele.top;
        const width = ele.component.width;
        const height = ele.component.height;
        if (this.selectCount.maxx1 > left) {
          this.selectCount.maxx1 = left;
        }
        if (this.selectCount.maxx2 < left + width) {
          this.selectCount.maxx2 = left + width;
        }
        if (this.selectCount.maxy1 > top) {
          this.selectCount.maxy1 = top;
        }
        if (this.selectCount.maxy2 < top + height) {
          this.selectCount.maxy2 = top + height;
        }
      })
    },
  }
}
</script>

<style>
</style>
