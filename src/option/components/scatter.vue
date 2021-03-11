<!-- 散点图配置 -->
<template>
  <div>
     <el-form-item label="气泡大小">
      <avue-input-number v-model="main.activeOption.symbolSize">
      </avue-input-number>
    </el-form-item>
    <el-form-item label="字体位置">
      <avue-select v-model="main.activeOption.scatterLabelPosition" :dic="dicOption.scatterLabelPosition">
      </avue-select>
      </el-form-item>
        <el-form-item label="内容格式化">
          <avue-input v-model="main.activeOption.labelFormatter">
          </avue-input>
        </el-form-item>
        <el-form-item label="链接">
          <avue-input type="textarea"  :max-rows="5" v-model="main.activeOption.link" ></avue-input>
        </el-form-item>
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