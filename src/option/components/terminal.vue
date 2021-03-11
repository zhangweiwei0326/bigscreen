<!-- 折柱图配置 -->
<template>
  <div>
     <el-collapse>
      <el-collapse-item title="折线设置">
        <el-form-item label="标记点">
          <avue-switch v-model="main.activeOption.symbol"></avue-switch>
        </el-form-item>
        <template v-if="main.activeOption.symbol">
          <el-form-item label="点的大小">
            <avue-slider v-model="main.activeOption.symbolSize">
            </avue-slider>
          </el-form-item>
        </template>
        <el-form-item label="平滑曲线">
          <avue-switch v-model="main.activeOption.smooth"></avue-switch>
        </el-form-item><el-form-item label="线条宽度">
          <avue-slider v-model="main.activeOption.lineWidth">
          </avue-slider>
        </el-form-item>
        <el-form-item label="链接">
          <avue-input type="textarea" :max-rows="5" v-model="main.activeOption.link" ></avue-input>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  inject: ["main"]
}
</script>

<style>

</style>