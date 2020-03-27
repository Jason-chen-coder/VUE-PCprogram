<template>
  <el-dialog class="addDialog" title="新增企业" :visible.sync="dialogFormVisible">
    <el-form :rules="rules" ref="form" :model="form">
      <el-form-item prop="eid" label="企业编号" :label-width="formLabelWidth" :hide-required-asterisk="false">
        <el-input v-model="form.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="企业名称" :label-width="formLabelWidth" :hide-required-asterisk="false">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="short_name" label="企业简称" :label-width="formLabelWidth" :hide-required-asterisk="false">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="intro" label="企业简介" :label-width="formLabelWidth" :hide-required-asterisk="false">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="remark" label="企业备注" :label-width="formLabelWidth">
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
// import { addNewSubjectApi } from "../../../api/subject";
import {addEnterpriseApi}  from "../../../api/enterprise"
export default {
  data() {
    return {
      form: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      formLabelWidth: "80px",
      dialogFormVisible: false,
      rules: {
        eid: [{ required: true, message: "企业编号为必填项", trigger: "blur" }],
        name: [{ required: true, message: "企业名称为必填项", trigger: "blur" }],
        short_name: [{ required: true, message: "企业简称为必填项", trigger: "blur" }],
        intro: [{ required: true, message: "企业简介为必填项", trigger: "blur" }]
      }
    };
  },
  methods: {
      addEnterprise(){
          console.log("开始新增")
        addEnterpriseApi(this.form).then(res=>{
            console.log(res)
            if(res.data.code===200){
                this.$message.success("新增成功")
            }else{
                this.$message.error(this.data.message)
            }
        }).catch(err=>{
            console.log(err)
        })
      },
    cancel(){
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    confirm() {
         console.log("开始新增")
      // 先进行表单检验
      this.$refs.form.validate(valid => {
        if (valid) {
          this.addEnterprise();
          this.$refs.form.resetFields();
            this.dialogFormVisible = false
            //调用父组件的获取企业列表方法
            this.$parent.getEnterpriseList();
        } else {
          this.$message.error("检验失败");
        }
      });
    },
  }
};
</script>

<style>
.addDialog .el-dialog {
  width: 700px;
}
</style>