<template>
  <el-dialog class="addDialog" title="修改学科" :visible.sync="dialogFormVisible">
    <el-form :rules="rules" ref="form" :model="form">
      <el-form-item prop="rid" label="学科编号" :label-width="formLabelWidth" :hide-required-asterisk="false">
        <el-input v-model="form.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="学科名称" :label-width="formLabelWidth" :hide-required-asterisk="false">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="short_name" label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="intro" label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="remark" label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="confirm()">编 辑</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import { addNewSubjectApi } from "../../../api/subject";
// 导入修改学科接口函数
import {editSubjectApi} from  "../../../api/subject"
export default {
  data() {
    return {
      form: {
        id:"",
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      formLabelWidth: "80px",
      dialogFormVisible: false,
      rules: {
        rid: [{ required: true, message: "学科编号为必填项", trigger: "blur" }],
        name: [{ required: true, message: "学科名称为必填项", trigger: "blur" }]
      }
    };
  },
  methods: {
    cancel(){
      this.dialogFormVisible = false
      // this.$refs.form.resetFields()
    },
    confirm() {
      // 先进行表单检验
      this.$refs.form.validate(valid => {
        if (valid) {
          //调用修改学科函数
          this.editSubject();
        //   this.$refs.form.resetFields();
        } else {
          this.$message.error("检验失败");
        }
      });
    },
   //定义修改学科函数
    editSubject(){
        editSubjectApi(this.form).then(res=>{
            console.log(res)
            if(res.data.code===201){
                this.$message.error("学科名称不能重复");
                return
            }
            console.log("请求成功")
            //修改成功之后将对话框消失
              this.dialogFormVisible = false
            //修改成功之后进行提示
            this.$message.success("修改成功")
            //调用父组件刷新页面
            this.$parent.getAllSubject()
        }).catch(err=>{
            console.log(this.form)
            console.log("请求失败")
            console.log(err)

        })
    }
  }
};
</script>

<style>
.addDialog .el-dialog {
  width: 700px;
}
</style>