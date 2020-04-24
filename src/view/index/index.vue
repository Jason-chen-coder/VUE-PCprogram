<template>
  <div class="indexbox">
    <el-container class="box">
      <!-- 头部 -->
      <el-header class="header">
        <div class="left">
          <i class="el-icon-s-fold" @click="isCollapse=!isCollapse"></i>
          <img src="../../assets/indexlogo.png" alt />
          <span>Must Code</span>
        </div>
        <div class="right">
          <img class="usericon" :src="imgUrl" alt />
          <span class="userbox">
            <!-- <span class="username">{{userinfo.username}}</span>,您好 -->
            <span class="username">{{$store.state.username}}</span>,您好
          </span>
          <el-button type="primary" @click="loginOut">退出</el-button>
        </div>
      </el-header>
      <el-container class="contentbox">
        <el-aside style="width:''">
          <el-menu
            :router="true"
            default-active="/index/chart"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
          >
            <template v-for="(item, index) in child">
              <el-menu-item
                v-if="item.meta.roles.includes($store.state.role)"
                :key="index"
                :index="item.meta.fullpath"
              >
                <!-- class  类名使用一个filter来筛选，从而添加图标 -->
                <i :class="item.meta.icon "></i>
                <span slot="title">{{item.meta.title}}</span>
              </el-menu-item>
            </template>

            <!-- <el-menu-item index="/index/user">
              <i class="el-icon-user"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="/index/question">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">题库列表</span>
            </el-menu-item>
            <el-menu-item index="/index/enterprise">
              <i class="el-icon-office-building"></i>
              <span slot="title">企业列表</span>
            </el-menu-item>
            <el-menu-item index="/index/subject">
              <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>-->
            <!-- </el-menu-item> -->
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import child from "../../router/childRouter"
// import { getUserInfo } from "../../api/index";
import { logoutApi } from "../../api/index";
import { removetoken } from "../../utils/mytoken";
export default {
  data () {
    return {
      isCollapse: false,
      userinfo: {},
      imgUrl: this.$store.state.avatar,//将store中保存的用户头像直接赋值
      child: child
    };
  },
  mounted () {
    //当首页的dom加载完之后直接进行子页面跳转
    this.$router.push("/index/chart")

  },
  // created() {
  //   // //进入页面先检查tokn是否为空
  //   // var token = gettoken();
  //   // if (!token) {
  //   //   this.$message.error("你还未登录,请先登录!");
  //   //   this.$router.push("/login");
  //   //   return;
  //   // }
  //   getUserInfo()
  //     .then(res => {
  //       console.log(res);
  //       // if (res.data.code === 206) {
  //       //   this.$message.error("token有误,请重新登录");
  //       //   this.$router.push("/login");
  //       //   return;
  //       // }
  //       this.userinfo = res.data.data;
  //       this.imgUrl = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // },
  methods: {
    loginOut () {
      this.$confirm("确定要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //向服务器发起退出系统请求
          logoutApi()
            .then(res => {
              // console.log(res);
              if (res.data.code == 200) {
                //向服务器请求退出成功
                //删除token,并路由跳转回登录页面
                removetoken();
                this.$router.push("/login");
                this.$message({
                  type: "success",
                  message: "退出成功!"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出"
          });
        });
    }
  }
};
</script>

<style lang="less">
.el-header {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  -webkit-box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  -moz-box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  border: 0 solid #000;
  color: #333;
  text-align: left;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    i {
      font-size: 24px;
      color: black;
    }
    img {
      width: 33px;
      height: 28px;
      margin: 0 11px 0 22px;
    }
    span {
      font-size: 22px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(73, 161, 255, 1);
    }
  }
  .right {
    display: flex;
    align-items: center;
    .usericon {
      width: 43px;
      height: 43px;
      border-radius: 50%;
    }

    .el-button {
      border: 1px solid rgba(54, 156, 255, 1);
      border-radius: 4px;
      box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35) !important;
    }
    .userbox {
      margin: 0 38px 0 9px;
    }
  }
}
.el-aside {
  //   width: 0px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35) !important;
  color: #333;
  text-align: center;
  border: 0 solid #000;
  //   line-height: 200px;
  height: 100%;
}

.el-main {
  // background-color: #e9eef3;
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
.indexbox,
.box,
.contentbox {
  height: 100%;
  background: rgba(232, 233, 236, 1);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  height: 100%;
}
</style>>