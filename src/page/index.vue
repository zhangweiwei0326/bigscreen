<template>

  <el-container class="list"
                v-loading.fullscreen="loading"
                element-loading-text="初始化加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)">
    
    <el-aside width="230px">
      <h2 class="title">JEECG 大屏设计器</h2>
      <el-menu :default-active="activeName"
               background-color="#171b22"
               text-color="#fff"
               @select="handleSelect"
               active-text-color="#00baff">
        <el-menu-item index="1">
          <i class="el-icon-document"></i>
          大屏管理
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          地图管理
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          分类管理
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-scrollbar class="list"
                  style="width:100%;height:800px;">
      <list v-if="activeName==1"></list>
      <maps v-if="activeName==2"></maps>
      <category v-if="activeName==3"></category>
    </el-scrollbar>
  </el-container>
</template>
<script>
import list from './list/index'
import maps from './list/map'
import category from './list/category'
export default {
  name: "index",
  components: {
    list,
    maps,
    category
  },
  data () {
    return {
      loading: true,
      activeName: '1',
    }
  },
  created () {

  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2500);
  },
  methods: {
    handleSelect (key) {
      this.activeName = key;
    },
  }
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 20px;
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-weight: 500;
}
</style>
