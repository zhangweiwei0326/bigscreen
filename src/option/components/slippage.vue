<!-- 滑动组件配置 -->
<template>
  <div>
    <el-form-item label="上传图片（数组）">
      <avue-input type="textarea" :min-rows="15" :max-rows="100" v-model="main.activeOption.bannData"></avue-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  inject: ["main"]
}
</script>

<style>
</style>