 <!-- 象形图配置 -->
<template>
  <div>
    <el-form-item label="图标">
      <img v-if="main.activeOption.symbol"
           :src="main.activeOption.symbol"
           alt=""
           width="100%" />
      <el-input v-model="main.activeOption.symbol" clearable>
        <div @click="main.handleOpenImg('activeOption.symbol')"
             slot="append">
          <i class="iconfont icon-img"></i>
        </div>
      </el-input>
    </el-form-item>
    <el-form-item label="图标字号">
      <avue-input-number v-model="main.activeOption.symbolSize"></avue-input-number>
    </el-form-item>
    <el-form-item label="字体大小">
      <avue-input-number v-model="main.activeOption.fontSize"></avue-input-number>
    </el-form-item>
    <el-form-item label="轴字体颜色">
      <avue-color v-model="main.activeOption.nameColor"></avue-color>
    </el-form-item>
    <el-form-item label="间距">
      <avue-slider v-model="main.activeOption.split"></avue-slider>
    </el-form-item>
    <el-collapse accordion>
      <el-collapse-item title="X轴设置">
        <el-form-item label="显示">
          <avue-switch v-model="main.activeOption.xAxisShow">
          </avue-switch>
        </el-form-item>
         <el-form-item label="轴反转">
            <avue-switch v-model="main.activeOption.xAxisInverse">
            </avue-switch>
          </el-form-item>
         <el-form-item label="显示网格线">
            <avue-switch v-model="main.activeOption.xAxisSplitLineShow">
            </avue-switch>
          </el-form-item>
        <el-form-item label="字号">
          <avue-input-number v-model="main.activeOption.xNameFontSize">
          </avue-input-number>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="Y轴设置">
        <el-form-item label="显示">
          <avue-switch v-model="main.activeOption.yAxisShow">
          </avue-switch>
        </el-form-item>
        <el-form-item label="轴反转">
            <avue-switch v-model="main.activeOption.yAxisInverse">
            </avue-switch>
          </el-form-item>
          <el-form-item label="显示轴线">
            <avue-switch v-model="main.activeOption.axisShow">
            </avue-switch>
          </el-form-item>
         <el-form-item label="显示网格线">
            <avue-switch v-model="main.activeOption.yAxisSplitLineShow">
            </avue-switch>
          </el-form-item>
        <el-form-item label="字号">
          <avue-input-number v-model="main.activeOption.yNameFontSize">
          </avue-input-number>
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