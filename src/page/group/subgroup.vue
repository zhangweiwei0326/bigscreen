<template>
  <div>
    <div v-for="item in nav"
         :key="item.index"
         @contextmenu.prevent="contain.handleContextMenu($event,item)">
      <avue-draggable v-if="!item.children"
                      v-bind="item"
                      :scale="container.stepScale"
                      :disabled="!contain.menuFlag"
                      :step="container.stepScale"
                      :width="item.component.width"
                      :height="item.component.height"
                      :ref="common.DEAFNAME+item.index"
                      :id="common.DEAFNAME+item.index"
                      :highline="contain.highline"
                      v-show="!item.display"
                      @focus="handleFocus"
                      @blur="handleBlur">
        <component :ref="common.NAME+item.index"
                   :id="common.NAME+item.index"
                   :is="common.COMPNAME+item.component.name"
                   v-bind="item"
                   :data-formatter="getFunction(item.dataFormatter)"
                   :click-formatter="getFunction(item.clickFormatter)"
                   :label-formatter="getFunction(item.labelFormatter)"
                   :formatter="getFunction(item.formatter)"
                   :width="item.component.width"
                   :data-query="getJson(item.dataQuery)"
                   :height="item.component.height"
                   :animation="!contain.menuFlag"
                   :theme="(item.option || {}).theme"
                   :disabled="!contain.menuFlag"
                   :scale="container.stepScale"
                   :option="item.option"
                   :home-url="contain.config.url"
                   :click="handleClick" />
      </avue-draggable>
      <!-- 加入v-if判断  liangxs -->
      <subgroup :nav="item.children" v-if="item.children"></subgroup>
    </div>
  </div>
</template>

<script>
import common from '@/config'
export default {
  name: 'subgroup',
  inject: ["contain", 'container'],
  provide () {
    return {
      contain: this.contain,
      container: this.container
    };
  },
  props: {
    nav: {
      type: Array,
      default: () => {
        return []
      }
    },
    clickFormatter: Function
  },
  data () {
    return {
      common: common,
    }
  },
  methods: {
    getFunction (fun) {
      console.log("clickFormatter",this.clickFormatter)
      if (!this.validatenull(fun)) return eval(fun);
    },
    getJson (str) {
      if (this.validatenull(str)) return {};
      if (typeof str == "string") return JSON.parse(str);
      return str;
    },
    //点击事件交互
    handleClick ({ type, child, value }) {
      if (type === 'tabs') {
        const indexList = child.index;
        indexList.forEach((index) => {
          const paramName = child.paramName;
          const item = this.contain.findlist(index);
          if (!item.url) return
          let params = {};
          if (item.dataQuery) {
            params = this.getJson(item.dataQuery)
          } else {
            params = {}
          }
          params[paramName] = value;
          item.dataQuery = JSON.stringify(params);
          this.$refs[this.common.NAME + index].forEach(ele => {
            ele.updateData();
          })
        })
      }
      this.contain.contentMenu=false
    },
    //刷新数据
    handleRefresh (tip = true) {
      this.$refs[this.common.NAME + this.contain.activeObj.index][0].updateData();
      if (tip) {
        this.$message.success('刷新成功')
      }
    },
    //获取对象
    handleGetObj (val) {
      return this.$refs[`${this.common.DEAFNAME}${val}`];
    },
    handleFocus ({ index }) {
      this.container.gradeFlag = true;
      if (this.contain.keys.ctrl) {
        if (!Array.isArray(this.contain.active)) {
          this.contain.handleInitActive();
        }
        this.contain.active.push(index);
      } else {
        if (!this.contain.active.includes(index)) {
          this.contain.active = [index];
        }
      }
    },
    handleBlur ({ left, top, width, height }) {
      this.container.gradeFlag = false;
      this.$set(this.contain.activeObj.component, 'width', width)
      this.$set(this.contain.activeObj.component, 'height', height)
      this.$set(this.contain.activeObj, 'left', left)
      this.$set(this.contain.activeObj, 'top', top)
    },
  }
}
</script>

<style>
</style>