<!-- 柱状图配置 -->
<template>
  <div>
      <el-form-item label="竖展示">
         <avue-switch type="textarea" v-model="main.activeOption.category"></avue-switch>
      </el-form-item>
      <!-- <el-form-item label="柱体背景">
         <avue-switch type="textarea" v-model="main.activeOption.barGaps"></avue-switch>
      </el-form-item> -->
  </div>
</template>

<script>
export default {
  inject: ["main"]
}
</script>

<style>
</style>