<template>
  <!-- :visible.sync="dialogFormVisible" 是否隐藏表单 -->
  <!-- :hide-required-asterisk="false"是否隐藏红色星星标识 -->
  <el-dialog class="Dialog" :title="Isedit? '修改用户':'新增用户'" :visible.sync="dialogFormVisible">
    <el-form :rules="rules" ref="form" :model="form">
      <el-form-item prop="avatar" label="头像" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="image"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item  v-if="!Isedit" prop="password" label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="电话" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="role_id" label="角色" placeholder="请选择角色" :label-width="formLabelWidth">
        <el-select v-model="form.role_id" >
          <el-option label="管理员" :value="4"></el-option>
          <el-option label="老师" :value="3"></el-option>
          <el-option label="学生" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="status" label="状态" :label-width="formLabelWidth">
        <el-select v-model="form.status">
          <el-option label="禁用" :value="0"></el-option>
          <el-option label="启用" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="remark" label="备注" :label-width="formLabelWidth">
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
import {addUserApi,editUserApi} from "../api/user"
export default {
  data() {
    return {
      imageUrl: "",
      uploadUrl: process.env.VUE_APP_URL + "/uploads",
      form: {
        id: "",
        username: "",
        phone: "",
        email: "",
        avatar: "",
        password: "",
        remark: "",
        status: "",
        role_id: "",
      },
      dialogFormVisible: false,
      formLabelWidth: "80px",
      Isedit: false,
      rules: {
        avatar: [{ required: true, message: "头像不能为空", trigger: "blur" }],
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        email: [{ required: true, message: "邮箱不能为空", trigger: "blur" }],
        phone: [{ required: true, message: "电话不能为空", trigger: "blur" }],
        role_id: [{ required: true, message: "角色为必选", trigger: "blur" }]
      }
    };
  },
  methods: {
      editUser(){ 
          editUserApi(this.form).then(res=>{
              console.log(res)
              if(res.data.code===200){
                  this.$message.success("编辑用户成功");
                  //调用父组件方法刷新列表
                  this.$parent.getUserList()
                  //情况表单
                  this.finishwork()
              }
          }).catch(error=>{
              console.log("编辑失败")
              console.log(error)
          })
      },
      addUser(){
          window.console.log("开始新增")
          window.console.log(this.form)
          addUserApi(this.form).then(res=>{
              console.log(res)
              if(res.data.code===200){
                  //调用父组件方法刷新列表
                  this.$parent.getUserList()
                  //情况表单
                  this.finishwork()
              }else{
                  this.$message.error(res.data.message)
              }
          }).catch(error=>{
              console.log("增加失败")
              console.log(error)
          })
      },
    confirm() {
      //点击确定先验证表单是否检验通过
      this.$refs.form.validate(valid => {
        if (valid) {
          //表单检验通过,判断当前是否为编辑模式
          if (this.Isedit) {
            //当前为编辑模式
            console.log("当前为编辑模式");
            this.editUser()
          } else {
            //当前为新增模式
            console.log("当前为新增模式");
            console.log(this.form)
            this.addUser()
          }
        } else {
          //表单检验失败
          this.$message.error("检验失败");
        }
      });
    },
    finishwork() {
      this.$refs.form.resetFields();
    //   清空form信息
      for (const key in this.form) {
        this.form[key] = "";
      }
      this.dialogFormVisible = false;
      this.imageUrl=""
    },
    cancel() {
      //点击取消,清除表单内容
      this.finishwork();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
       this.form.avatar = res.data.file_path;
      //进行单一表单域验证
      this.$refs.form.validateField("avatar");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg"||"image/png"||"image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style>
.Dialog .el-dialog {
  width: 700px;
}
.el-dialog{
    margin-top: 40px!important;
}
.el-select {
  width: 100%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-dialog__body{
    padding-bottom: 0;
    padding-top: 10px;
}
</style>