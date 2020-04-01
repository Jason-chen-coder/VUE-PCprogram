<template>
  <div class="loginbox">
    <div class="leftbox">
      <div class="title">
        <img src="../../assets/login-logo.png" alt />
        <span class="titlename">黑马面面</span>
        <span class="titleline"></span>
        <span class="titlelogin">用户登录</span>
      </div>

      <!-- 表单部分 -->
      <el-form ref="form" :rules="rules" :model="form" class="form">
        <!-- el-form-item 为表单中的一部分，即表单域 -->
        <!-- label 当前表单元素的说明文本 -->
        <el-form-item prop="phone">
          <el-input v-model="form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            class="password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="logincode">
          <el-row class="rowbox">
            <el-col :span="16">
              <el-input
                v-model="form.logincode"
                @keyup.enter.native="onSubmit"
                prefix-icon="el-icon-key"
                placeholder="请输入验证码"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <img class="logincode" @click="refreshcode()" :src="imgcode" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="type">
          <el-checkbox v-model="form.type" label="A" name="type">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="loginbtn" @click="onSubmit">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="loginbtn" @click="regist()">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img class="rightimg" src="../../assets/login_banner_ele.png" alt />
    <register ref="register"></register>
  </div>
</template>
  
<script>
var validatephone = (rule, value, callback) => {
  let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("手机号格式有误"));
  }
};

import register from "./components/register";
import { loginapi } from "../../api/login";
import { settoken } from "../../utils/mytoken";
import {getUserInfo} from "../../api/index"
export default {
  data() {
    return {
      imgcode: process.env.VUE_APP_URL + "/captcha?type=login",
      form: {
        type: ["A"],
        phone: "17620471029",
        password: "123456",
        logincode: "",
        ischeck: true
      },
      rules: {
        //当前页面上的form的验证规则
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          { validator: validatephone, trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        logincode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "验证码的长度应该为4", trigger: "blur" }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请勾选上我已阅读并同意用户协议和隐私条款",
            trigger: "change"
          }
        ]
      }
    };
  },
  components: {
    register
  },
  methods: {
    refreshcode() {
      this.imgcode =
        process.env.VUE_APP_URL + "/captcha?type=login" + Date.now();
    },
    regist() {
      this.$refs.register.dialogFormVisible = true;
    },
    onSubmit() {
      this.$refs.form.validate(vaid => {
        console.log(vaid); //验证成功为true,失败为false
        if (vaid) {
          //   //弹出验证通过提示消息
          //    this.$message({
          //   message: '验证通过',
          //   type: 'success'
          // });

          //发起登录请求
          loginapi({
            phone: this.form.phone,
            password: this.form.password,
            code: this.form.logincode
          })
            .then(res => {
              if (res.data.code == 200) {
                console.log(res);
                settoken(res.data.data.token);
                getUserInfo().then(res=>{
                  if(res.data.code===200&&res.data.data.status===1){
                    this.$message.success("登陆成功");
                    this.$router.push("/index");
                  }else if(res.data.code===200&&res.data.data.status===0){
                    this.$message.error("该用户已被管理员禁用，请联系管理员");
                  }
                })
            
              } else if (res.data.code == 202) {
                console.log(res);
                this.$message.error("登录账号或者密码错误");
              } else {
                console.log(res);
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          //弹出验证通过提示消息
          this.$message.error("验证失败");
        }
      });
    }
  }
};
</script>

<style lang="less">
.loginbox {
  height: 100%;
  background-image: linear-gradient(#1493fa, #04bffa);
  display: flex;
  justify-content: space-around;
  align-items: center;
  .leftbox {
    width: 478px;
    height: 550px;
    background-color: white;
    padding: 47px 42px 86px 42px;
    box-sizing: border-box;
    .title {
      display: flex;
      align-items: center;
    }
    .titlename {
      font-size: 24px;
      font-family: SourceHanSansCN;
      font-weight: 400;
      color: rgba(12, 12, 12, 1);
      margin-right: 14px;
      margin-left: 16px;
    }
    .titleline {
      width: 1px;
      height: 28px;
      background: rgba(199, 199, 199, 1);
    }
    .titlelogin {
      font-size: 22px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(12, 12, 12, 1);
      margin-left: 12px;
    }
  }
  .rightimg {
    width: 633px;
    height: 435px;
  }
  .form {
    margin-top: 32px;
    .el-form-item__content {
      line-height: 20px !important;
    }
    .el-checkbox__label {
      line-height: 20px !important;
    }
    .password {
      margin: 10px 0 10px 0;
    }
    .logincode {
      width: 110px;
      height: 40px;
    }

    .loginbtn {
      width: 100%;
    }
  }
}
</style>