<template>
  <el-dialog class="addDialog" :title="Isedit ? '修改企业':'新增企业'" :visible.sync="dialogFormVisible">
    <el-form :rules="rules" ref="form" :model="form">
      <el-form-item v-if="!Isedit" prop="eid" label="企业编号" :label-width="formLabelWidth">
        <el-input v-model="form.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="企业名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="short_name" label="企业简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="intro" label="企业简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="remark" label="企业备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item v-if="Isedit" prop="tag" label="所属领域" :label-width="formLabelWidth">
        <el-select v-model="form.tag">
          <el-option label="互联网" :value="'互联网'"></el-option>
          <el-option label="金融" :value="'金融'"></el-option>
          <el-option label="电商" :value="'电商'"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="confirm()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addEnterpriseApi, editEnterpriseApi } from "../api/enterprise";

export default {
  data() {
    var editdvalidator = (rule, value, callback) => {
      //获取不到当前组件中的变量,须通过父组件来完成
      //修改企业信息接口为空时会直接设置为空而不是现实原来的名字,非常不合理
      if (this.$parent.isedit) {
        callback();
      } else {
        if (value) {
          callback();
        } else {
          callback(new Error("该项是必填内容"));
        }
      }
    };
    return {
      form: {
        id: "",
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: "",
        tag: "",
        isedit: true
      },
      Isedit: true,
      formLabelWidth: "80px",
      dialogFormVisible: false,
      rules: {
        eid: [
          {
            validator: editdvalidator,
            message: "企业编号为必填项",
            trigger: "blur"
          }
        ],
        name: [
          {
            validator: editdvalidator,
            message: "企业名称为必填项",
            trigger: "blur"
          }
        ],
        short_name: [
          {
            validator: editdvalidator,
            message: "企业简称为必填项",
            trigger: "blur"
          }
        ],
        intro: [
          {
            validator: editdvalidator,
            message: "企业简介为必填项",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    cancel() {
    this.finishwork()
    },
    finishwork() {
      //刷新企业列表
       this.dialogFormVisible = false;
      this.$parent.getEnterpriseList();
      this.$refs.form.resetFields();
      //清除表单内容
      for (const key in this.form) {
        this.form[key] = "";
      }
    },
    confirm() {
      //点击确定先检验表单是否合格
      this.$refs.form.validate(valid => {
        if (valid) {
          //    this.$message.success("检验成功");
          //    this.dialogFormVisible=false
          //判断当前是否为编辑模式
          if (!this.Isedit) {
            //当前为新增模式,发起新增请求
            console.log("当前为新增模式,发起新增请求");
            addEnterpriseApi(this.form)
              .then(res => {
                console.log(res);
                if (res.data.code === 200) {
                  this.$message.success("新增成功");
                 this.finishwork()
                } else {
                  this.$message.error(res.data.message);
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            //当前为编辑模式,发起编辑请求
            console.log(this.form);
            console.log("当前为编辑模式,发起新增请求");
            editEnterpriseApi(this.form)
              .then(res => {
                console.log(res);
                if (res.data.code === 200) {
                  this.$message.success("修改成功");
                 this.finishwork()
                } else {
                  this.$message.error(this.data.message);
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        } else {
          this.$message.error("检验失败");
        }
      });
    }
  }
};
</script>

<style>
.addDialog .el-dialog {
  width: 700px;
}
.el-select {
  width: 100%;
}
</style>>