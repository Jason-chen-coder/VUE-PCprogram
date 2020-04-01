<template>
          <el-select class="select" v-model="enterprise" placeholder="请选择企业">
            <el-option
              style="fontWeight:normal;color:#606266"
              v-for="(item, index) in enterpriseList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
</template>
<script>
import {EnterpriseListApi} from "@/api/enterprise"
export default {
    data(){
        return{
            enterprise:this.value,
            enterpriseList:[]
        }
    },
    props:["value"],
    watch:{
       enterprise:function(){
         this.$emit("input",this.enterprise)  
       },
        value:function(){
           this.enterprise =this.value
        }
    },
      created(){
        //获取企业列表
    EnterpriseListApi({}).then(res => {
        if (res.data.code === 200) {
          this.enterpriseList = res.data.data.items;
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
}
</script>

<style>
.el-form-item {
  margin-right: 0;
}
.select {
  width: 200px;
}
</style>