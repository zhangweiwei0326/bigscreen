<!-- 通用配置-->
<template>
  <div>
    <!-- 折叠公共配置 -->
    <el-collapse accordion>
       <!--柱体设置  -->
      <template v-if="main.vaildProp('cylinderList')">
        <el-collapse-item title="柱体设置">
          <el-form-item label="最大宽度">
            <avue-slider v-model="main.activeOption.barWidth">
            </avue-slider>
          </el-form-item>
          <el-form-item label="圆角">
            <avue-slider v-model="main.activeOption.barRadius">
            </avue-slider>
          </el-form-item>
          <el-form-item label="最小高度">
            <avue-slider v-model="main.activeOption.barMinHeight">
            </avue-slider>
          </el-form-item>
           <!-- <el-form-item label="背景色">
              <avue-color v-model="main.activeOption.backgroundStyle"></avue-color>
          </el-form-item>-->
        </el-collapse-item>
     </template>
      <!-- 标题设置 -->
      <template v-if="main.vaildProp('titleList')">
        <el-collapse-item title="标题设置">
          <el-form-item label="标题">
            <avue-switch v-model="main.activeOption.titleShow"></avue-switch>
          </el-form-item>
          <el-form-item label="标题">
            <avue-input v-model="main.activeOption.title"></avue-input>
          </el-form-item>
          <el-form-item label="字体颜色">
            <avue-color v-model="main.activeOption.titleColor"></avue-color>
          </el-form-item>
          <el-form-item label="字体粗细">
            <avue-select v-model="main.activeOption.titleFontWeight"
                         :dic="dicOption.fontWeight">
            </avue-select>
          </el-form-item>
          <el-form-item label="字体大小">
            <avue-input-number v-model="main.activeOption.titleFontSize"></avue-input-number>
          </el-form-item>
          <el-form-item label="字体位置">
            <avue-select v-model="main.activeOption.titlePostion"
                         :dic="dicOption.textAlign">
            </avue-select>
          </el-form-item>
          <el-form-item label="副标题">
            <avue-input v-model="main.activeOption.subtext"></avue-input>
          </el-form-item>
          <el-form-item label="字体颜色">
            <avue-color v-model="main.activeOption.subTitleColor"></avue-color>
          </el-form-item>
          <el-form-item label="字体粗细">
            <avue-select v-model="main.activeOption.subTitleFontWeight"
                         :dic="dicOption.fontWeight">
            </avue-select>
          </el-form-item>
          <el-form-item label="字体大小">
            <avue-input-number v-model="main.activeOption.subTitleFontSize">
            </avue-input-number>
          </el-form-item>
        </el-collapse-item>
      </template>
      <!-- 轴设置 -->
      <template v-if="main.vaildProp('barList')">
        <el-collapse-item title="X轴设置">
          <el-form-item label="名称">
            <avue-input v-model="main.activeOption.xAxisName">
            </avue-input>
          </el-form-item>
          <el-form-item label="显示">
            <avue-switch v-model="main.activeOption.xAxisShow">
            </avue-switch>
          </el-form-item>
          <el-form-item label="显示网格线">
            <avue-switch v-model="main.activeOption.xAxisSplitLineShow">
            </avue-switch>
          </el-form-item>
          <el-form-item label="轴线颜色">
            <avue-color v-model="main.activeOption.xAxisSplitLineColor">
            </avue-color>
         </el-form-item>
          <el-form-item label="标签间距" v-if="main.activeComponent.name!='scatter'">
            <avue-switch v-model="main.activeOption.xAxisinterval">
            </avue-switch>
          </el-form-item>
          <el-form-item label="文字角度">
            <avue-slider v-model="main.activeOption.xAxisRotate">
            </avue-slider>
          </el-form-item>
          <el-form-item label="轴反转">
            <avue-switch v-model="main.activeOption.xAxisInverse">
            </avue-switch>
          </el-form-item>
          <el-form-item label="字号">
            <avue-input-number v-model="main.activeOption.xNameFontSize">
            </avue-input-number>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="Y轴设置">
          <el-form-item label="名称">
            <avue-input v-model="main.activeOption.yAxisName">
            </avue-input>
          </el-form-item>
          <el-form-item label="显示">
            <avue-switch v-model="main.activeOption.yAxisShow">
            </avue-switch>
          </el-form-item>
          <el-form-item label="轴网格线">
            <avue-switch v-model="main.activeOption.yAxisSplitLineShow">
            </avue-switch>
          </el-form-item>
           <el-form-item label="轴线颜色">
            <avue-color v-model="main.activeOption.yAxisSplitLineColor">
            </avue-color>
         </el-form-item>
          <el-form-item label="反转">
            <avue-switch v-model="main.activeOption.yAxisInverse">
            </avue-switch>
          </el-form-item>
          <el-form-item label="字号">
            <avue-input-number v-model="main.activeOption.yNameFontSize">
            </avue-input-number>
          </el-form-item>
        </el-collapse-item>
      </template>
      <!-- 数值设置 -->
      <template v-if="main.vaildProp('labelList')">
        <el-collapse-item title="数值设置">
          <el-form-item label="显示">
            <avue-switch v-model="main.activeOption.labelShow">
            </avue-switch>
          </el-form-item>
            <template v-if="main.activeOption.labelShow && main.activeComponent.name =='pie'">
              <el-form-item label="数值">
                <avue-switch v-model="main.activeOption.labelFormatterName1"></avue-switch>
              </el-form-item>
              <el-form-item label="百分比">
                <avue-switch v-model="main.activeOption.labelFormatterName2"></avue-switch>
              </el-form-item>
              <el-form-item label="数据项名称">
                <avue-switch v-model="main.activeOption.labelShow"></avue-switch>
              </el-form-item>
            </template>
          <el-form-item label="字体大小">
            <avue-input-number v-model="main.activeOption.labelShowFontSize">
            </avue-input-number>
          </el-form-item>
          <el-form-item label="字体颜色">
            <avue-color v-model="main.activeOption.labelShowColor">
            </avue-color>
          </el-form-item>
          <el-form-item label="字体粗细">
            <avue-select v-model="main.activeOption.labelShowFontWeight"
                         :dic="dicOption.fontWeight">
            </avue-select>
          </el-form-item>
        </el-collapse-item>
      </template>
      <!-- 提示语设置  -->
      <template v-if="main.vaildProp('tipList')">
        <el-collapse-item title="提示语设置">
          <el-form-item label="字体大小">
            <avue-input-number v-model="main.activeOption.tipFontSize"></avue-input-number>
          </el-form-item>
          <el-form-item label="字体颜色">
            <avue-color v-model="main.activeOption.tipColor"></avue-color>
          </el-form-item>
        </el-collapse-item>
      </template>
      <!-- 轴距离设置 -->
      <template v-if="main.vaildProp('postionList')">
        <el-collapse-item title="坐标轴边距设置">
          <el-form-item label="左边距(像素)">
            <avue-slider v-model="main.activeOption.gridX"
                         :max="400"></avue-slider>
          </el-form-item>
          <el-form-item label="顶边距(像素)">
            <avue-slider v-model="main.activeOption.gridY"
                         :max="400"></avue-slider>
          </el-form-item>
          <el-form-item label="右边距(像素)">
            <avue-slider v-model="main.activeOption.gridX2"
                         :max="400"></avue-slider>
          </el-form-item>
          <el-form-item label="底边距(像素)">
            <avue-slider v-model="main.activeOption.gridY2"
                         :max="400"></avue-slider>
          </el-form-item>
        </el-collapse-item>
      </template>
      <!-- 图例设置 -->
      <template v-if="main.vaildProp('legendList')">
        <el-collapse-item title="图例操作">
          <el-form-item label="图例">
            <avue-switch v-model="main.activeOption.legend"></avue-switch>
          </el-form-item>
          <el-form-item label="字体颜色">
            <avue-color v-model="main.activeOption.legendTextColor"></avue-color>
          </el-form-item>
          <el-form-item label="图例宽度">
            <avue-input-number v-model="main.activeOption.itemWidth">
            </avue-input-number>
          </el-form-item>
          <el-form-item label="横向位置">
            <avue-select v-model="main.activeOption.legendPostion"
                         :dic="dicOption.textAlign">
            </avue-select>
          </el-form-item>
          <el-form-item label="纵向位置">
            <avue-select v-model="main.activeOption.legendTop" :dic="dicOption.topList">
            </avue-select>
          </el-form-item>
          <el-form-item label="布局朝向">
            <avue-select v-model="main.activeOption.legendOrient"
                         :dic="dicOption.orientList">
            </avue-select>
          </el-form-item>
          <el-form-item label="字体大小">
            <avue-input-number v-model="main.activeOption.legendFontSize">
            </avue-input-number>
          </el-form-item>
        </el-collapse-item>
      </template>
      <!-- 颜色设置 -->
      <template v-if="main.vaildProp('colorList')">
        <!-- 设置的是坐标轴的字体颜色，过滤掉饼图的设置 -->
        <el-collapse-item title="自定义配色">
          <el-form-item label="文字颜色" v-if="this.excludeColor()">
            <avue-color v-model="main.activeOption.nameColor">
            </avue-color>
          </el-form-item>
          <el-form-item label="轴线颜色" v-if="this.excludeColor()">
            <avue-color v-model="main.activeOption.lineColor"></avue-color>
          </el-form-item>
          <avue-crud :option="colorOption"
                     :data="main.activeOption.barColor"
                     @row-save="rowSave"
                     @row-del="rowDel"
                     @row-update="rowUpdate"></avue-crud>
        </el-collapse-item>
      </template>
    </el-collapse>
  </div>
</template>

<script>
import { dicOption, colorOption } from '@/option/config'
export default {
  inject: ["main"],
  data () {
    return {
      dicOption: dicOption,
      colorOption: colorOption
    }
  },
  methods: {
    // 排除自定义文字和轴线颜色配置,饼图和雷达图没有该配置
    excludeColor(){
      const excludeColorArr = ['pie','radar']
      const {prop} = this.main.activeObj.component
      return !excludeColorArr.includes(prop)
    },
    rowSave (row, done) {
      this.main.activeOption.barColor.push(row);
      done()
    },
    rowDel (row, index) {
      this.main.activeOption.barColor.splice(index, 1);
    },
    rowUpdate (row, index, done) {
      this.main.activeOption.barColor.splice(index, 1, row);
      done()
    },
  }
}
</script>

<style>
</style>
