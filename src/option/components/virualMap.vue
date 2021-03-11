<template>
  <div>
    <el-form-item label="地图选择">
        <avue-select :dic="main.DIC.MAP"
                     v-model="main.activeOption.selectProvinceUrl"
                     @change="handleProvinceSelect"
                     placeholder="请选择地图"></avue-select>
      </el-form-item>
  </div>
</template>

<script>
export default {
    inject: ["main"],
    methods:{
       
        handleProvinceSelect(value){
                //异步加载地图
                this.main.activeOption.selectProvinceUrl =value
    },
     mounted(){
         
    }    
}
}
</script>

<style>

</style>