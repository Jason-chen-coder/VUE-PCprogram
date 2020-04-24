<template>
  <el-dialog title="用户注册" :visible.sync="dialogFormVisible" id="registerbox">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item
        class="registerimg"
        label="头像"
        prop="headimg"
        :label-width="formLabelWidth"
        required
      >
        <el-upload
          class="avatar-uploader"
          :action="uploadurl"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
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
            <img class="imgcode" @click="refreshcode()" :src="imgurl" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="logincode" :label-width="formLabelWidth" required>
        <el-row>
          <el-col :span="18">
            <el-input v-model="form.logincode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="6" class="imgbox">
            <el-button
              plain
              class="logincode"
              @click="getcode()"
              :disabled="time!==0"
            >{{time >0? time:"获取用户验证码"}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { phonecheck, emailcheck } from "@/utils/mycheck";
// var validphone = (rules, value, callback) => {
//   var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
//   if (reg.test(value)) {
//     callback();
//   } else {
//     callback(new Error("手机号码格式有误"));
//   }
// };
// var validemail = (rules, value, callback) => {
//   var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
//   if (reg.test(value)) {
//     callback();
//   } else {
//     callback(new Error("邮箱格式有误"));
//   }
// };
import { getCodeApi, apiregister } from "../../../api/register";
export default {
  data () {
    return {
      //头像上传地址(接口地址)
      uploadurl: process.env.VUE_APP_URL + "/uploads",
      //控制注册表单的隐藏和显示
      dialogFormVisible: false,
      formLabelWidth: "70px",
      time: 0,
      //图片显示的url地址
      imageUrl: "",
      form: {
        nickname: "",
        email: "",
        phone: "",
        password: "",
        imgcode: "",
        logincode: "",
        headimg: ""
      },
      //环境变量以及设置了基地址
      // imgurl:process.env.VUE_APP_URL+"/captcha?type=sendsms"+"&t="+Date.now()
      imgurl:
        process.env.VUE_APP_URL + "/captcha?type=sendsms" + "&t=" + Date.now(),
      rules: {
        headimg: [{ required: true, message: "头像不能为空", trigger: "blur" }],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, message: "长度在至少3个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: emailcheck, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: phonecheck, trigger: "blur" }
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
    cancel () {
      //点击取消按钮后注册框消失
      this.dialogFormVisible = false;
      //,并清除表单内的内容
      this.$refs.form.resetFields();
      //resetFields()方法不会清除上传文件表单域内容
      this.imageUrl = "";
    },
    handleAvatarSuccess (res, file) {
      //将文件对象转换为url地址
      this.imageUrl = URL.createObjectURL(file.raw);
      //头像上传成功后将返回的图片地址赋值给headimg进行表单验证
      console.log(res);
      this.form.headimg = res.data.file_path;
      //进行单一表单域验证
      this.$refs.form.validateField("headimg");
    },
    beforeAvatarUpload (file) {
      // 支持png gif jpeg文件格式的上传
      const isJPG = file.type === "image/jpeg" || "image/gif" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG/GIF 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    getcode () {
      var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!reg.test(this.form.phone)) {
        this.$message.error("手机号不合法");
        return;
      }

      if (this.form.imgcode.trim().length !== 4) {
        return this.$message.error("验证码不合法");
      }

      getCodeApi({ code: this.form.imgcode, phone: this.form.phone })
        .then(res => {
          // console.log(this.form.imgcode, this.form.phone);
          console.log(res);
          if (res.data.code == 200) {
            this.$message.success({
              type: "success",
              message: "验证码获取成功:" + res.data.data.captcha
            });
            //增加定时器
            this.time = 5;
            let timer = setInterval(() => {
              if (this.time > 0) {
                this.time--;
              } else {
                clearInterval(timer);
              }
            }, 1000);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log("服务器出错");
          console.log(err);
        });
    },
    refreshcode () {
      // this.imgurl=process.env.VUE_APP_URL+"/captcha?type=sendsms"+"&t="+Date.now()
      this.imgurl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms" + "&t=" + Date.now();
    },
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          apiregister({
            username: this.form.nickname,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.headimg,
            password: this.form.password,
            rcode: this.form.logincode
          })
            .then(res => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "注册成功"
                });
                //注册成功后注册框消失
                this.dialogFormVisible = false;
                //,并清除表单内的内容
                this.$refs.form.resetFields();
                //resetFields()方法不会清除上传文件表单域内容
                this.imageUrl = "";
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
          //表单的验证都通过了,开始注册
        } else {
          this.$message.error("验证失败");
        }
      });
    }
  }
};
</script>

<style lang="less">
.registerimg {
  .avatar-uploader {
    width: 100%;
    text-align: center;
  }
  // .avatar-uploader {
  //   // margin: 0 auto;
  //   float: left;
  // }
}
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
  width: 130px;
  height: 41px;
}
.imgbox {
  text-align: right;
  height: 40px;
}
#registerbox {
  width: 1400px;
  margin: -80px auto;
  // overflow-y: hidden;
}
.logincode {
  width: 90%;
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
.avatar-uploader {
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>