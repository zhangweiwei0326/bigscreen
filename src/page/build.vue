<template>
  <div class="build">
    <imglist ref="imglist"
             @change="handleSetimg"></imglist>
    <top ref="top"></top>
    <div class="app"
         :class="{'app--none':!menuFlag}">
      <template v-if="isCollapsed">
         <div class="menu"
             v-show="menuFlag"
             @click.self="handleMouseDown">
          <p class="title">图层</p>
          <layer ref="layer"
                 :nav="nav"></layer>
        </div>
      </template>
     <div class="menu__item--folder" @click="isCollapsed=!isCollapsed"  v-show="menuFlag">
        <i class="icon-folder" :class="isCollapsed?'el-icon-arrow-left':'el-icon-arrow-right'"></i>
      </div>
      <container ref="container"></container>
      <div class="menu params"
           v-show="menuFlag">
        <p class="title">操作</p>
        <el-tabs class="tabs"
                 stretch
                 v-model="tabsActive">
          <el-tab-pane name="0">
            <el-tooltip slot="label"
                        effect="dark"
                        content="配置"
                        placement="top">
              <div><i class="el-icon-setting"></i></div>
            </el-tooltip>
            <el-form label-width="120px"
                     label-position="left"
                     size="mini">
              <!-- 组件配置 -->
              <template v-if="!vaildProp('',[undefined])">
                <p class="title">{{activeObj.title}}</p>
                <el-form-item label="图层名称">
                  <avue-input v-model="activeObj.name"></avue-input>
                </el-form-item>
                <el-form-item label="隐藏">
                  <avue-switch v-model="activeObj.display"></avue-switch>
                </el-form-item>
                <template v-if="vaildProp('colorList') && activeObj.component.prop!='terminal'">
                  <el-form-item label="系统配色">
                    <avue-switch v-model="activeOption.switchTheme"></avue-switch>
                  </el-form-item>
                  <el-form-item label="配色选择"
                                v-if="activeOption.switchTheme">
                    <avue-select v-model="activeOption.theme"
                                 :dic="dicOption.themeList">
                    </avue-select>
                  </el-form-item>
                </template>
                <component :is="activeComponent.prop+'Option'"></component>
                <common-option></common-option>
              </template>
              <!-- 多选配置选项 -->
              <template v-else-if="isSelectActive">
                <el-form-item label="水平方式">
                  <el-tooltip content="左对齐"
                              placement="top">
                    <i class="el-icon-s-fold icon"
                       @click="$refs.container.handlePostionSelect('left')"></i>
                  </el-tooltip>
                  <el-tooltip content="居中对齐"
                              placement="top">
                    <i class="el-icon-s-operation icon"
                       @click="$refs.container.handlePostionSelect('center')"></i>
                  </el-tooltip>
                  <el-tooltip content="右对齐"
                              placement="top">
                    <i class="el-icon-s-unfold icon"
                       @click="$refs.container.handlePostionSelect('right')"></i>
                  </el-tooltip>
                </el-form-item>
                <el-form-item label="垂直方式">
                  <el-tooltip content="顶对齐"
                              placement="top">
                    <i class="el-icon-s-fold icon"
                       @click="$refs.container.handlePostionSelect('top')"></i>
                  </el-tooltip>
                  <el-tooltip content="中部对齐"
                              placement="top">
                    <i class="el-icon-s-operation icon"
                       @click="$refs.container.handlePostionSelect('middle')"></i>
                  </el-tooltip>
                  <el-tooltip content="底对齐"
                              placement="top">
                    <i class="el-icon-s-unfold icon"
                       @click="$refs.container.handlePostionSelect('bottom')"></i>
                  </el-tooltip>
                </el-form-item>
                <el-form-item label-width="0">
                  <el-button type="primary"
                             size="mini"
                             class="block"
                             @click="handleDeleteSelect">删除</el-button>
                </el-form-item>
                <el-form-item label-width="0">
                  <el-button type="danger"
                             size="mini"
                             class="block"
                             @click="handleFloder">成组</el-button>
                </el-form-item>
              </template>
              <!-- 主屏的配置项 -->
              <template v-else>
                <!-- <el-form-item label="大屏名称">
                  <avue-input v-model="config.name"></avue-input>
                </el-form-item> -->
                <el-form-item label="大屏宽度">
                  <avue-input-number v-model="config.width"></avue-input-number>
                </el-form-item>
                <el-form-item label="大屏高度">
                  <avue-input-number v-model="config.height"></avue-input-number>
                </el-form-item>
                <el-form-item label="大屏简介">
                  <avue-input v-model="config.info"
                              type="textarea"
                              :min-rows="5"></avue-input>
                </el-form-item>
                <el-form-item label="背景颜色">
                  <avue-color v-model="config.backgroundColor"></avue-color>
                </el-form-item>
                <el-form-item label="背景图片">
                  <template v-if="config.backgroundImage && config.backgroundImage.length>0">
                    <i v-if="closeShow" class="el-icon-circle-close close-pos" @click="bgClear" ></i>
                    <img :src="backgroundImage"
                         @click="handleOpenImg('config.backgroundImage','background')"
                         class="bg-img"
                         alt=""
                         width="100%" />
                  </template>
                  <template v-else>
                        <el-upload
                                :before-remove="removeFile"
                                :action="url+'/visual/put-file'"
                                :headers="uploadHeader"
                                :limit="1"
                                :on-progress="handleTip"
                                :on-success="bgImgUploadSuccess"
                                list-type="picture">
                          <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                  </template>
                </el-form-item>
                <el-form-item label="缩略图">
                                <el-upload
                                        :before-remove="removeFile"
                                        v-model="config.thumbnail"
                                        :action="url+'/visual/put-file'"
                                        :headers="uploadHeader"
                                        :limit="1"
                                        :on-progress="handleTip"
                                        :on-success="uploadSuccess"
                                        list-type="picture"
                                        :file-list="config.thumbnailList">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload>
               </el-form-item>
                <el-form-item label="缩放">
                  <el-slider v-model="config.scale"
                             :max="200"
                             :format-tooltip="formatTooltip"></el-slider>
                </el-form-item>
                <el-form-item label="环境地址">
                  <avue-input type="textarea"
                              :min-rows="2"
                              v-model="config.url"></avue-input>
                </el-form-item>
                <el-form-item label="参数">
                  <el-button size="mini"
                             type="primary"
                             @click="openCode('query')">编辑</el-button>
                </el-form-item>
                <el-form-item label="水印(预览有效)">
                  <avue-switch v-model="config.mark.show"></avue-switch>
                </el-form-item>
                <template v-if="config.mark.show">
                  <el-form-item label="内容">
                    <avue-input v-model="config.mark.text"></avue-input>
                  </el-form-item>
                  <el-form-item label="大小">
                    <avue-input-number v-model="config.mark.fontSize"></avue-input-number>
                  </el-form-item>
                  <el-form-item label="颜色">
                    <avue-color v-model="config.mark.textStyle"></avue-color>
                  </el-form-item>
                  <el-form-item label="角度">
                    <avue-input-number v-model="config.mark.degree"></avue-input-number>
                  </el-form-item>
                </template>
              </template>
            </el-form>
          </el-tab-pane>
          <!-- 数据配置 -->
          <el-tab-pane name="1"
                       v-if="vaildProp('dataList')">
            <el-tooltip slot="label"
                        effect="dark"
                        content="数据"
                        placement="top">
              <div><i class="el-icon-document-copy"></i></div>
            </el-tooltip>
            <el-form label-width="120px"
                     label-position="left"
                     size="mini">
              <el-form-item label="数据类型">
                <avue-radio v-model="activeObj.dataType"
                            :dic="dicOption.dataType"></avue-radio>
              </el-form-item>
              <el-form-item label="数据值"
                            label-position="top"
                            v-if="activeObj.dataType===0">
                <el-button size="mini"
                           type="primary"
                           @click="openCode('data')">编辑</el-button>
              </el-form-item>
              <template v-if="activeObj.dataType===1">
                <el-form-item label="接口地址">
                  <avue-input type="textarea"
                              :min-rows="6"
                              v-model="activeObj.url"></avue-input>
                </el-form-item>
                <el-form-item label="接口方式"
                              v-if="activeObj.dataType===1">
                  <avue-radio v-model="activeObj.dataMethod"
                              :dic="dicOption.dataMethod"></avue-radio>
                </el-form-item>
                <el-form-item label="接口参数"
                              v-if="activeObj.dataType===1">
                  <el-button size="mini"
                             type="primary"
                             @click="openCode('dataQuery')">编辑</el-button>
                </el-form-item>
                <el-form-item label="刷新时间">
                  <avue-input-number v-model="activeObj.time"></avue-input-number>
                </el-form-item>
              </template>
              <el-form-item label="数据处理">
                <el-button size="mini"
                           type="primary"
                           @click="openCode('dataFormatter')">编辑</el-button>
              </el-form-item>
               <el-form-item label="通用处理" v-if="activeObj.component.name!='commonChart'">
                <el-button size="mini"
                           type="primary"
                           @click="openCode('commonFormatter')">编辑</el-button>
              </el-form-item>
              <el-form-item label-width="0">
                <el-button size="mini"
                           type="primary"
                           class="block"
                           @click="handleRefresh">刷新</el-button>
              </el-form-item>
            </el-form>

          </el-tab-pane>
          <!-- 交互事件配置 -->
          <el-tab-pane name="2"
                       v-if="vaildProp('eventList')">
            <el-tooltip slot="label"
                        effect="dark"
                        content="交互"
                        placement="top">
              <div><i class="el-icon-thumb"></i></div>
            </el-tooltip>
            <el-form label-width="120px"
                     label-position="left"
                     size="mini">
              <el-form-item label="子类">
                <avue-select multiple
                             v-model="activeObj.child.index"
                             :dic="childList"
                             :props="childProps">
                </avue-select>
              </el-form-item>
              <el-form-item label="参数">
                <avue-input v-model="activeObj.child.paramName"></avue-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 其他事件配置 -->
          <el-tab-pane name="3"
                       v-if="vaildProp('formatterList')">
            <el-tooltip slot="label"
                        effect="dark"
                        content="格式化"
                        placement="top">
              <div><i class="iconfont icon-peizhi"></i></div>
            </el-tooltip>
            <el-form label-width="120px"
                     label-position="left"
                     size="mini">
              <el-form-item label="提示事件">
                <el-button size="mini"
                           type="primary"
                           @click="openCode('formatter')">编辑</el-button>
              </el-form-item>
              <el-form-item label="点击事件"
                            v-if="vaildProp('clickFormatterList')">
                <el-button size="mini"
                           type="primary"
                           @click="openCode('clickFormatter')">编辑</el-button>

              </el-form-item>
              <el-form-item label="标题事件"
                            v-if="vaildProp('labelFormatterList')">
                <el-button size="mini"
                           type="primary"
                           @click="openCode('labelFormatter')">编辑</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 基本参数配置 -->
          <el-tab-pane name="4"
                       v-if="isActive">
            <el-tooltip slot="label"
                        effect="dark"
                        content="参数"
                        placement="top">
              <div><i class="el-icon-folder"></i></div>
            </el-tooltip>
            <el-form label-width="120px"
                     label-position="left"
                     size="mini">
              <!-- <el-form-item label="序号">
                <avue-input v-model="activeObj.index"
                            disabled></avue-input>
              </el-form-item> -->
              <el-form-item label="X位置">
                <avue-input-number v-model="activeObj.left"></avue-input-number>
              </el-form-item>
              <el-form-item label="Y位置">
                <avue-input-number v-model="activeObj.top"></avue-input-number>
              </el-form-item>
              <el-form-item label="宽度">
                <avue-input-number v-model="activeComponent.width"></avue-input-number>
              </el-form-item>
              <el-form-item label="高度">
                <avue-input-number v-model="activeComponent.height"></avue-input-number>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <el-dialog title="代码编辑"
               :visible.sync="code.box"
               @close="code.obj={}"
               width="60%">
      <codeedit ref="codeedit"
                v-model="code.obj"></codeedit>
      <span slot="footer"
            class="dialog-footer">
        <el-button size="small"
                   @click="code.box=false">取 消</el-button>
        <el-button type="primary"
                   @click="codeClose"
                   size="small">确 定</el-button>
      </span>
    </el-dialog>
    <contentmenu ref="contentmenu" v-show="contentMenu"></contentmenu>
  </div>
</template>
<script>
import { getQueryString } from '@/utils/utils.js'
import layer from './group/layer';
import top from './group/top';
import imglist from './group/imglist'
import contentmenu from './group/contentmenu'
import codeedit from './group/code';
import { dicOption } from '@/option/config'
import init from '@/mixins/'
import { uuid,getHashString } from '@/utils/utils'
import components from '@/option/components'
export default {
  mixins: [init, components],
  data () {
    return {
      isCollapsed:true,
      closeShow: true,
      uploadHeader:{},
      keys: {
        ctrl: false,
      },
      loading: '',
      childProps: {
        label: 'name',
        value: 'index'
      },
      key: '',
      menuFlag: true,
      contentMenu: true,
      code: {
        box: false,
        type: '',
        obj: '',
      },
      form: {},
      dicOption: dicOption,
      tabsActive: 0,
    }
  },
  components: {
    imglist,
    layer,
    codeedit,
    top,
    contentmenu
  },
  computed: {
    // 兼容部署
    backgroundImage(){
       let backgroundImage = this.config.backgroundImage
        if(backgroundImage && backgroundImage.startsWith("/")){
          backgroundImage = "."+backgroundImage
      }
       return backgroundImage
    },
    isFolder () {
      return this.activeObj.children
    },
    isActive () {
      return this.active.length !== 0
    },
    isSelectActive () {
      return this.active.length > 1;
    },
    childList () {
      return this.list.filter(ele => {
        if (['tabs'].includes(ele.component.prop)) {
          return false;
        }
        return true;
      })
    },
    activeComponent () {
      return this.activeObj.component || {}
    },
    activeOption () {
      return this.activeObj.option || {}
    },
    activeObj () {
      let result
      if (this.validatenull(this.active)) {
        return {}
      }
      this.active.forEach(ele => {
        const item = this.findnav(ele, true);
        if (this.active.length > 1) {
          if (!result) result = [];
          result.push(item.obj);
        } else {
          result = item.obj
        }
      })
      return result
    }
  },
  watch: {
    menuFlag () {
      this.setResize();
    },
    isCollapsed(){
      //是否展开
      if(this.isCollapsed){
        //this.config.width-=((100*180) / this.config.scale);
      }else{
        //this.config.width+=((100*180) / this.config.scale);
      }
      this.setResize();
    },
    // 左侧图层光标放上去时，触发方法,layer.vue mouseover/mouseout
    overactive (n, o) {
      [o, n].forEach((ele, index) => {
        this.setActive(ele, index === 1, 'setOverActive');
      })
    },
    active (n, o) {
      [o, n].forEach((ele, index) => {
        ele.forEach(item => {
          this.setActive(item, index === 1, 'setActive');
        })
      })
      //隐藏右键菜单
      this.$refs.contentmenu.hide();
      // 初始化选项卡
      this.tabsActive = '0';
    },
  },
  created () {
    let title = getHashString("title");
    if(title){
      document.title = title;
    }
    this.listen();
  },
  mounted () {
   let token = getQueryString("token")
       if(!token){
            token = window.localStorage.getItem("token")
       }
    if(token) this.uploadHeader["X-Access-Token"] = token
    this.initFun()
  },
  methods: {
    bgClear(){
      this.config.backgroundImage = ''
      this.closeShow = false
    },
    removeFile(){
         this.config.thumbnail="";
    },
    handleTip(){
      this.uploadLoading = this.$loading({
        lock: true,
        text: '正在保存上传',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    uploadSuccess(response){
      this.uploadLoading.close();
       this.config.thumbnail = response.message;
    },
    bgImgUploadSuccess(response){
      this.uploadLoading.close();
      this.closeShow = true
      this.config.backgroundImage = response.message;
    },
    codeClose () {
      let value = this.$refs.codeedit.getValue();
      if (this.validatenull(value)) {
        value = '{}'
      }
      try {
        if (['query', 'data'].includes(this.code.type) && this.activeComponent.prop!=="commonChart") {
          value = JSON.parse(value, null, 4)
        }
        if (this.code.type === 'query') {
          this.config.query = value;
        } else {
          this.activeObj[this.code.type] = value;
        }
        this.code.box = false;
      } catch (error) {
        this.$message.error('数据格式有误')
      }

    },
    openCode (type) {
      this.code.type = type;
      if (type === 'query') {
        this.code.obj = this.config.query;
      } else {
        this.code.obj = this.activeObj[type];
      }
      this.code.box = true;
    },
    initFun () {
      ['setScale', 'setResize'].forEach(ele => {
        this[ele] = this.$refs.container[ele]
      });
      ['handleAdd'].forEach(ele => {
        this[ele] = this.$refs.top[ele]
      })
    },
    // 右键菜单
    handleContextMenu (e, item = {}) {
      if (!item.index) {
        return
      }
      if (!this.isSelectActive) {
        this.active = [item.index];
      }
     if(!this.menuFlag){
        this.contentMenu = false;
      }else{
        this.contentMenu = true;
      }
      setTimeout(() => {
        this.$refs.contentmenu.show(e.clientX, e.clientY);
      }, 0)
    },
    //监听键盘的按键
    listen () {
      document.onkeydown = (e) => {
        this.keys.ctrl = e.metaKey;
      }
      document.onkeyup = (e) => {
        this.keys.ctrl = e.metaKey;
      }
    },
    setActive (val, result, fun) {
      const obj = this.$refs.container.handleGetObj(val);
      if (obj) obj[0][fun](result)
    },
    //批量成组
    handleFloder () {
      let floder = {
        "title": "文件夹",
        "name": "文件夹",
        "index": uuid(),
        "children": []
      }
      this.active.forEach(index => {
        const params = this.findnav(index);
        floder.children.push(params.obj);
        delete params.parent.splice(params.count, 1);
      })
      this.nav.push(floder);
      this.handleInitActive();
    },
    //批量删除
    handleDeleteSelect () {
      this.$confirm(`是否批量删除所选图层?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.active.forEach(index => {
          const params = this.findnav(index);
          delete params.parent.splice(params.count, 1);
        })
        this.handleInitActive()
      })
    },
    vaildProp (name, list) {
      if (list) {
        return list.includes(this.activeComponent.prop)
      }
      return this.dicOption[name].includes(this.activeComponent.prop)
    },
    handleRefresh (tip) {
      this.$refs.container.handleRefresh(tip);
    },
    formatTooltip (val) {
      return parseInt(val);
    },
    //打开图库
    handleOpenImg (item, type) {
      this.$refs.imglist.openImg(item, type);
    },
    //图库框回调赋值
    handleSetimg (val, type) {
      if (type === 'activeObj.data') {
        this.activeObj.data = val;
      } if (type === 'activeObj.data.value') {
        this.activeObj.data.value = val;
      } else if (type === 'activeOption.backgroundImage') {
        this.activeOption.backgroundImage = val;
      } else if (type === 'activeOption.backgroundBorder') {
        this.activeOption.backgroundBorder = val;
      } else if (type === 'activeOption.empBackgroundBorder') {
        this.activeOption.empBackgroundBorder = val;
      }  else if (type === 'activeOption.empBackgroundImage') {
        this.activeOption.empBackgroundImage = val;
      }
      else if (type === 'config.backgroundImage') {
        this.config.backgroundImage = val;
      } else if (type === 'activeOption.symbol') {
        this.activeOption.symbol = val;
      }
    }
  }
}
</script>
<style lang="scss">
@import "../styles/style.scss";
</style>
<style lang="scss" scoped>
  .close-pos{
    position: relative;
    top: 30px;
    left: 85%;
    z-index: 1;
  }
  .bg-img{
    position: relative;
    z-index: 0;
  }
</style>
