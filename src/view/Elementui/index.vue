<template>
  <div class="demo-input-suffix">
  属性方式：
  <el-input placeholder="请选择日期" prefix-icon="el-icon-user" v-model="input1"></el-input>
  <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input2"></el-input>
</div>
</template>

<script>
export default {
data() {
    return {
      input1: '',
      input2: ''
    }
  }
}
</script>

<style>

</style>>