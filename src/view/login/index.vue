<template>
  <div class="loginbox">
    <div class="leftbox">
      <div class="title">
        <img src="../../assets/login-logo.png" alt />
        <span class="titlename">黑马面面</span>
        <span class="titleline"></span>
        <span class="titlelogin">用户登录</span>
      </div>
    </div>
    <img class="rightimg" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {};
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
  
}
</style>