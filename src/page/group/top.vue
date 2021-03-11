<template>
  <div>
    <el-menu class="nav" @select="handleSelect"
             mode="horizontal"
             background-color="#212528"
             text-color="#fff"
             active-text-color="#409EFF"
             @mousedown="contain.handleMouseDown">
      <el-submenu :index="index+''"
                  v-for="(item,index) in baseList"
                  :key="index">
        <template slot="title">
          <el-tooltip effect="dark"
                      :content="item.label"
                      placement="top">
            <i :class="'nav__icon iconfont '+item.icon"></i>
          </el-tooltip>
        </template>
        <el-menu-item @click="handleAdd(citem.option)"
                      :key="cindex"
                      :index="`${index}-${cindex}`"
                      v-for="(citem,cindex) in item.children">
          <i :class="'nav__icon iconfont '+citem.option.icon"></i>
          <span>{{citem.label}}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="6"
                    @click="handleReset"
                    v-show="!contain.menuFlag">
        <el-tooltip effect="dark"
                    content="还原"
                    placement="top">
          <i class="nav__icon iconfont icon-reset"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="7"
                    @click="handleView"
                    v-show="contain.menuFlag">
        <el-tooltip effect="dark"
                    content="预览"
                    placement="top">
          <i class="nav__icon iconfont icon-view"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="8"
                    @click="handleBuild">
        <el-tooltip effect="dark"
                    content="保存"
                    placement="top">
          <!--<i class="el-icon-folder-checked nav__icon  iconfont  icon-build"></i>-->
          <i class="nav__icon iconfont icon-baocun"></i>
        </el-tooltip>
      </el-menu-item>
      <el-submenu index=9>
           <template slot="title">
            <el-tooltip effect="dark"
                        content="本地保存"
                        placement="top">
              <i class="el-icon-coin icon-build icon-size"></i>
            </el-tooltip>
        </template>
        <el-menu-item :key="index" :index="item+'分钟'" v-for="(item,index) in timeSave" >
            <i class="nav__icon iconfont icon-build"></i>
          <span>最近{{item}}分钟</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import {timeSave} from '@/config'
import { uuid } from '@/utils/utils'
import baseList from '@/option/base'
import { updateComponent } from '@/api/visual'
export default {
  inject: ["contain"],
  data () {
    return {
      timeSave,
      baseList: baseList
    }
  },
  methods: {
    handleSelect(index){
      const id = this.$route.params.id;
       const timeSaveArr = this.timeSave.map(item=>`${item}分钟`);
        if(!timeSaveArr.includes(index)) return;
        this.$confirm(`确定加载最近${index}数据?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           const time = parseInt(index.replace("分钟",''));
          const item = JSON.parse(window.localStorage.getItem(`${time}_${id}_config`));
          if(!item){
            this.$message({
              type: 'error',
              message: '没有最近的保存'
          });
            return;
          }
          this.contain.config = item.config;
          this.contain.nav  =item.detail;
          this.$message({
            type: 'success',
            message: '加载成功!'
          });
        }).catch(() => {

        });

    },
    vaildData (id) {
      const list = [];
      for (var i = 0; i < 20; i++) {
        list.push(i + '')
      }
      return list.includes(id)
    },
    handleView () {
      this.contain.menuFlag = false;
      this.contain.handleInitActive();
      this.contain.setScale(document.body.clientWidth);
    },
    handleReset () {
      this.contain.menuFlag = true;
      //设置展开状态
      this.contain.isCollapsed = true;
      this.contain.setScale(this.contain.contentWidth);
    },
    handleBuild () {
      if(this.contain.list.length==0){
        this.$message.error('请添加组件')
        return false;
      }
      // if (this.vaildData(this.contain.visual.id)) {
      //   this.$message.error('例子模板不允许修改')
      //   return false;
      // }
      this.contain.handleInitActive();
      const loading = this.$loading({
        lock: true,
        text: '正在保存配置，请稍后',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$nextTick(() => {
        const formdata = {
          visual: {
            id: this.contain.visual.id,
          },
          config: {
            id: this.contain.obj.config.id,
            visualId: this.contain.visual.id,
            detail: JSON.stringify(this.contain.config),
            component: JSON.stringify(this.contain.nav),
          },
        }
         updateComponent(formdata).then((res) => {
           loading.close();
           const data = res.data;
           if(!data.success){
             this.$message.error(data.message)
             return;
           }
           this.$confirm('保存成功大屏配置, 是否打开预览?', '提示', {
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
           }).then(() => {
             let routeUrl = this.$router.resolve({
               path: '/view/' + this.contain.id
             })
             let url= routeUrl.href+`?title=${this.contain.config.name}`;
             window.open(url, '_blank');
           }).catch(() => {

           });
         }).catch(() => {
           loading.close();
         })
      })

    },
    handleAdd (option, first = false) {
      let obj = this.deepClone(option);
      obj.left = 0;
      obj.top = 0
      obj.index = uuid();
      if (first) {
        this.contain.nav.unshift(obj);
      } else {
        this.contain.nav.push(obj);
      }

    },
  }
}
</script>

<style>
.nav {
  border-bottom: 0 !important;
  height: 45px;
  line-height: 45px;
  overflow: hidden;
}
.nav__icon {
  margin-right: 5px;
}
.nav .el-submenu .el-submenu__title,
.nav .el-menu-item {
  height: 45px;
  line-height: 45px;
  font-size: 12px;
}
.icon-size{font-size: 18px;}
</style>
