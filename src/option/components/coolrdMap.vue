<template>
   <el-form label-width="120px" label-position="left" size="small">
        <el-form-item label="扩散方向">
            <avue-radio v-model="main.activeOption.geoCoordType" :dic="dicOption.geoCoordType"></avue-radio>
        </el-form-item>
        <el-form-item label="目标城市">
            <avue-select :dic="geoCoordMapOption"
                 @change="handlegeoCoordProvinceSelect"
                 v-model="main.activeOption.coolrdProvince.value"
                 placeholder="请选择地图">
            </avue-select>
      </el-form-item>
        
   </el-form>
</template>
<script>
import { dicOption } from '@/option/config'
import { geoCoordMapOption }  from '@/components/coolrdMap/geo_coord_data'
export default {
    inject: ["main"],
    data(){
        return {
             dicOption,
             geoCoordMapOption
        }
    },
    methods:{
        handlegeoCoordProvinceSelect(value){
            this.main.activeOption.coolrdProvince = this.geoCoordMapOption[value];
        }
    }
}
</script>