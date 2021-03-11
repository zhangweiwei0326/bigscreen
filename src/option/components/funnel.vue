<!-- 漏斗图配置 -->
<template>
  <div>
    <el-collapse>
      <el-collapse-item title="文字设置">
          <el-form-item label="显示">
              <avue-switch v-model="main.activeOption.labelShow"></avue-switch>
            </el-form-item>
            <el-form-item label="字体大小">
              <avue-input-number v-model="main.activeOption.labelShowFontSize">
              </avue-input-number>
            </el-form-item>
            <el-form-item label="字体颜色">
              <avue-color v-model="main.activeOption.labelShowColor"></avue-color>
            </el-form-item>
            <el-form-item label="字体粗细">
              <avue-select v-model="main.activeOption.labelShowFontWeight"
                          :dic="dicOption.fontWeight">
              </avue-select>
            </el-form-item>
      </el-collapse-item>  
    </el-collapse> 
    <el-form-item label="反转">
            <avue-switch v-model="main.activeOption.inverse">
            </avue-switch>
    </el-form-item>
  </div>
</template>

<script>
import { dicOption } from '@/option/config'
export default {
    data () {
    return {
      dicOption: dicOption
    }
  },
  inject: ["main"]
}
</script>

<style>
</style>