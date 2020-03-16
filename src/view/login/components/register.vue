<template>
  <el-dialog title="用户注册" :visible.sync="dialogFormVisible">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="昵称" prop="nickname" :label-width="formLabelWidth" required>
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth" required>
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone" :label-width="formLabelWidth" required>
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="formLabelWidth" required>
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="imgcode" :label-width="formLabelWidth" required>
        <el-row>
          <el-col :span="18">
            <el-input v-model="form.imgcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="6" class="imgbox">
            <img class="imgcode" src="../../../assets/code.png" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="logincode" :label-width="formLabelWidth" required>
          <el-row>
              <el-col :span="18">
        <el-input v-model="form.logincode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="6" class="imgbox">
            <el-button plain class="imgcode">获取用户验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      //控制注册表单的隐藏和显示
      dialogFormVisible: false,
      formLabelWidth: "70px",
      form: {
        nickname: "",
        email: "",
        phone: "",
        password: "",
        imgcode: "",
        logincode: ""
      },
      rules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度在 11 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "长度在最少为 6 个字符", trigger: "blur" }
        ],
        imgcode: [
          { required: true, message: "请输入图形码", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" }
        ],
        logincode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
      onSubmit(){
          this.$refs.form.validate((valid)=>{
              if(valid){
                  window.console.log("验证成功");
                  this.dialogFormVisible=false;
              }else{
                  window.console.log("验证失败")
              }
          })
      }
  },
};
</script>

<style lang="less">
.el-dialog__header {
  background-image: linear-gradient(#03c0f9, #1197f9);
  text-align: center;
  .el-dialog__title {
    color: #fff;
  }
}
.dialog-footer {
  text-align: center;
}
.imgcode {
  width: 160px;
  height: 41px;

}
.imgbox{
  text-align: right;
}
</style>