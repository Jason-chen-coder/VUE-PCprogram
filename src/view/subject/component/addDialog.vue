<template>
  <el-dialog class="addDialog" title="新增学科" :visible.sync="dialogFormVisible">
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
      <el-button type="primary" @click="confirm()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addNewSubjectApi } from "../../../api/subject";

export default {
  data() {
    return {
      form: {
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
      this.$refs.form.resetFields()
    },
    confirm() {
      // 先进行表单检验
      this.$refs.form.validate(valid => {
        if (valid) {
          this.addNewSubject(this.form);
          this.$refs.form.resetFields();
        } else {
          this.$message.error("检验失败");
        }
      });
    },
    addNewSubject(form) {
      addNewSubjectApi(form)
        .then(res => {
          console.log(res);
          //新增成功之后将对话框隐藏,并清除对话框内容
          this.dialogFormVisible = false;
          //提示新增成功
          this.$message.success("新增成功");
          // 并刷新页面,调用父组件的方法回去所有学科信息
          this.$parent.getAllSubject();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.addDialog .el-dialog {
  width: 700px;
}
</style>