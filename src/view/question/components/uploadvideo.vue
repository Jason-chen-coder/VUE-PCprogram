<template>
<div class="videoupload">
  <el-upload
  class="upload-demo"
  :action="uploadUrl"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  :on-remove	="removevideo"
  >
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传MP4/AVI文件，且不超过100MB</div>
</el-upload>
<video loop controls style="margin: 0 auto;width:300px ;height:150px" :src="playUrl" v-if="playUrl"></video>
</div>
</template>

<script>
export default {
  data() {
      return {
        uploadUrl:process.env.VUE_APP_URL+"//question/upload",
        playUrl:""
      };
    },
    props:["value"],
    methods: {
      handleAvatarSuccess(res, file) {
        // this.playUrl = URL.createObjectURL(file.raw);
        console.log("播放对象",res,file)
        this.playUrl = process.env.VUE_APP_URL+'/'+ res.data.url
        this.$emit("getvideourl",res.data.url)

      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'video/mp4'||'video/avi';
        const isLt2M = file.size / 1024 / 1024 < 100;

        if (!isJPG) {
          this.$message.error('上传解析视频只能是 MP4/AVI 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传解析视频大小不能超过 100MB!');
        }
        return isJPG && isLt2M;
      },
      removevideo(){
        this.playUrl=""
      }
    }
};
</script>

<style>
.videoupload {
  width: 100%;
}
</style>