<!-- 饼图的配置 -->
<template>
  <div>
    <el-collapse accordion>
      <el-collapse-item title="饼图设置">
        <el-form-item label="设置为环形">
          <avue-switch v-model="main.activeOption.isRadius"></avue-switch>
        </el-form-item>
        <el-form-item label="半径大小" v-if="main.activeOption.isRadius">
          <avue-input v-model="main.activeOption.radius"></avue-input>
        </el-form-item>
        <el-form-item label="南丁格尔玫瑰">
          <avue-switch v-model="main.activeOption.roseType"></avue-switch>
        </el-form-item>
        <el-form-item label="自动排序">
          <avue-switch v-model="main.activeOption.sort"></avue-switch>
        </el-form-item>
        <el-form-item label="最小角度">
          <avue-input v-model="main.activeOption.minAngle"></avue-input>
        </el-form-item>
        <!-- <el-form-item label="合并小数值为其他">
          <avue-switch v-model="main.activeOption.minShowLabelAngle"></avue-switch>
        </el-form-item> -->
        <el-form-item label="不展示零">
          <avue-switch v-model="main.activeOption.notCount"></avue-switch>
        </el-form-item>
        <el-form-item label="链接">
          <avue-input type="textarea" :max-rows="5" v-model="main.activeOption.link" ></avue-input>
        </el-form-item>
        <el-form-item label="标签位置">
           <avue-select v-model="main.activeOption.pieLabelPosition" :dic="dicOption.pieLabelPosition">
           </avue-select>
         </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { dicOption} from '@/option/config'
export default {
  data(){
     return {
        dicOption
     }
  },
  inject: ["main"]
}
</script>

<style>
</style>