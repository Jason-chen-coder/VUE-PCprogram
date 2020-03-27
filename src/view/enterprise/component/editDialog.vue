<template>
  <!-- :visible.sync="dialogFormVisible" 是否隐藏表单 -->
  <!-- :hide-required-asterisk="false"是否隐藏红色星星标识 -->
  <el-dialog class="addDialog" title="修改企业" :visible.sync="dialogFormVisible">
    <el-form :rules="rules" ref="form" :model="form">
      <el-form-item prop="name" label="企业名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="short_name" label="企业简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="intro" label="企业简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="remark" label="企业备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="tag" label="所属领域" :label-width="formLabelWidth">
        <el-select v-model="form.tag">
          <el-option label="互联网" :value="'互联网'"></el-option>
          <el-option label="金融" :value="'金融'"></el-option>
          <el-option label="电商" :value="'电商'"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="confirm()">编 辑</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入修改企业接口函数
import { editEnterpriseApi } from "../../../api/enterprise";
export default {
  data() {
    return {
      form: {
        id: "",
        eid:"",
        tag: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      formLabelWidth: "80px",
      dialogFormVisible: false,
      rules: {
        tag: [{ required: true, message: "企业编号为必填项", trigger: "blur" }],
        name: [{ required: true, message: "企业名称为必填项", trigger: "blur" }]
      }
    };
  },
  methods: {
    editEnterprise() {
        console.log(this.form)
      editEnterpriseApi(this.form).then(res=>{
          console.log(res)
          if(res.data.code===200){
              this.$message.success("修改成功");
              //隐藏编辑框
              this.dialogFormVisible =false
              //调用父组件的获取企业列表函数,刷新页面
              this.$parent.getEnterpriseList();
          }else{
              this.$message.error(this.data.message)
          }
      }).catch(err=>{
          console.log(err)
      })
    },
    cancel() {
      this.dialogFormVisible = false;
      // this.$refs.form.resetFields()
    },
    confirm() {
      // 先进行表单检验
      this.$refs.form.validate(valid => {
        if (valid) {
          //调用修改企业函数
          this.editEnterprise();
          // this.$refs.form.resetFields();
        } else {
          this.$message.error("检验失败");
        }
      });
    }
    //定义修改企业函数
  }
};
</script>

<style>
.addDialog .el-dialog {
  width: 700px;
}
.el-select {
  width: 100%;
}
</style>