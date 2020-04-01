<template>
  <div  class="oncechoice1">
    <el-radio :label="label">
      <span>{{label}}</span>
      <!-- <input type="text" v-model="item.text" @input='v=>{$emit("value",v)}'/> -->
      <el-input type="text" v-model='text' @input="v=>{$emit('questiontext',v)}" />

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
    </el-radio>
  </div>
</template>

<script>
export default {
  created(){
    this.imageUrl=this.image
    // this.textvalue = this.text
  },
  data() {
    return {
    uploadUrl:process.env.VUE_APP_URL+"/question/upload",
      radio: "",
      imageUrl: "",
      // textvalue:""
    };
  },
  //value 是个数组，每个元组是个对象，有label、text、image（需加基地址）属性
  props:["label","image","text"],
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res)
      this.$emit("getchoiceimage",res.data.url)
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

<style lang="less">
.oncechoice1 {
  width: 95%;
  .el-form-item {
    width: 100%;
  }
  .el-form-item__content {
    width: 90%;
    role[radiogroup] {
      width: 100% !important;
    }
  }

}
.oncechoice1.el-radio{
      width: 100%!important;
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
.avatar-uploader {
  text-align: left;
}
.avatar-uploader {
  width: 150px;
  float: right;
}
.el-radio-group {
    .el-radio{
         display: flex;
    align-items: center;
    }
  width: 100% !important;
  display: flex;
    align-items: center;
  .el-radio__label {
    display: flex;
    width: 100%;
    align-items: center;
    
  }
  .el-radio.oncechoice1 {
    display: flex;
    align-items: center;
  }
  .el-radio__label input {
      width: 476px!important;
      height: 40px;
      margin: 0 20px 0 29px;
    }
}
</style>