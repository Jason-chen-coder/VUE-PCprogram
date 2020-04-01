<template>
  <div class="checkbox">
      <el-checkbox  :label="label">
        <span>{{label}}</span>
        <el-input type="text" v-model="text" @input="v=>{$emit('questionchecktext',v)}"/>
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-checkbox>

  </div>
</template>

<script>
export default {
  props:["label","image","text"],
     data() {
    return {
      checkList:[],
      uploadUrl:process.env.VUE_APP_URL+"/question/upload",
      imageUrl: "",
      // checktext:""
    };
  },
  created(){
    // this.checktext = this.text
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit("getcheckimage",res.data.url)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg"||"image/png"||"image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG/GIF 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style style lang='less'>
.el-checkbox.is-checked{
    width: 100%;

}
.el-checkbox{
    width: 100%;
    display: flex;
    align-items: center;
    
}
.el-checkbox__label{
     display: flex;
    align-items: center;
    input{
           width: 476px;
      height: 40px;
      margin: 0 20px 0 29px;
    }
}
</style>