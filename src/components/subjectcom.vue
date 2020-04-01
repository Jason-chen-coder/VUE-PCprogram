<template>
  <div>
    <el-select class="select" :value="value" @input="(value)=>{ this.$emit('input', value); }" placeholder="请选择学科">
      <el-option
        v-for="(item, index) in subjectList"
        :key="index"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { getSubjectApi } from "@/api/subject";
export default {
  data() {
    return {
      subjectList: [],
      // subject: this.value
    };
  },
  props: ["value"],
  // watch: {
  //   subject: function() {
  //     this.$emit("input", this.subject);
  //   },
  //   //监听到value有变化之后,立刻赋值给subject 
  //   value:function(){
  //       this.subject = this.value;
  //   }
  // },
  created() {
    this.subject = this.value;
    getSubjectApi({})
      .then(res => {
        if (res.data.code === 200) {
          // console.log("学科列表（默认获得4个）",res)
          this.subjectList = res.data.data.items;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
.el-form-item {
  margin-right: 0;
}
.select {
  width: 200px;
}
</style>