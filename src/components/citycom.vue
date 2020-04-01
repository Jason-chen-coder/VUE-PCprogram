<template>
<!-- options为数据源 -->
   <el-cascader class="citycom" :props="{value:'label'}"
    v-model="cityname"
    :options="options"
    @change="handleChange">
    </el-cascader>
</template>

<script>
import {  regionDataPlus } from 'element-china-area-data'

export default {
    data(){
        return {
             options:regionDataPlus,
             cityname:""
    }
    },
    created(){
      this.cityname =this.value
    },
    props:["value"],
     methods: {
      handleChange(value) {
        console.log(value);
        this.$emit("input",value)
      }
    }
}
</script>

<style>
.citycom{
    width: 330px;
}
</style>