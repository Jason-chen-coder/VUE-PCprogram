<template>
  <el-dialog class="addquestbox" :fullscreen="true" :title="Isedit?'编辑题目':'新增题目'" :visible.sync="dialogFormVisible">
    <el-form ref="form" :rules="rules" :model="form">
      <!-- 选择学科 -->
      <el-form-item prop="subject" label="学科" :label-width="formLabelWidth">
        <subjectcom v-model="form.subject" />
      </el-form-item>
      <!-- 选择阶段 -->
      <el-form-item prop="step" class="step" label="阶段">
        <el-select class="select" v-model="form.step" placeholder="请选择阶段">
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <!-- 选择企业 -->
      <el-form-item prop="enterprise" label="企业" :label-width="formLabelWidth">
        <enterprisecom v-model="form.enterprise" />
      </el-form-item>
      <!-- 选择城市 -->
      <el-form-item prop="city" label="城市" :label-width="formLabelWidth">
        <citycom v-model="form.city" />
      </el-form-item>
      <el-form-item prop="type" label="题型" :label-width="formLabelWidth">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简单</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item prop="difficulty" label="难度" :label-width="formLabelWidth">
        <el-radio-group v-model="form.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-divider></el-divider>
      <!-- 试题标题 -->
      <el-form-item prop="title" class="questiontitle" label="试题标题" :label-width="formLabelWidth">
        <br />
        <quill-editor :content="form.title" @change="ontitleEditorChange($event)" />
      </el-form-item>
      <!-- 多选，单选答案模块 -->
      <el-form-item
        class="choice"
        v-if="form.type===1||form.type===2"
        :label="form.type===1? '单选':'多选'"
        :label-width="formLabelWidth" >
        <br />
        <!-- 单选模块 -->
        <el-radio-group 
          class="alloncechoice"
          v-model="form.single_select_answer"
          v-if="form.type===1"
        >
          <!-- 将"form.select_options"进行遍历,并将每一项的label,image,text传递给子组件,然后在子组件中再传递回来形成双向传递 -->
          <oncechoice
            v-for="(item, index) in form.select_options"
            :label="item.label"
            :text="item.text"
            :image="item.image"
            :key="index"
            @getchoiceimage="v=>item.image =v"
            @questiontext="v=>item.text=v"
          />
        </el-radio-group>
        <!-- 多选模块 -->
        <el-checkbox-group v-if="form.type===2" v-model="form.multiple_select_answer">
          <checkbox
            v-for="(item, index) in form.select_options"
            :key="index"
            :label="item.label"
            :text="item.text"
            :image="item.image"
            @getcheckimage="v=>item.image =v"
            @questionchecktext="v=>item.text=v"
          />
        </el-checkbox-group>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 解析视频 -->
      <el-form-item label="解析视频" :label-width="formLabelWidth">
        <uploadvideo v-model="form.video" @getvideourl="v=>{form.video = v}" />
      </el-form-item>

      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 答案解析 -->
      <el-form-item prop="answer_analyze" class="questiontitle" label="答案解析" :label-width="formLabelWidth">
        <br />
        <quill-editor :content="form.answer_analyze	" @change="onsolveEditorChange($event)" />
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 试题备注 -->
      <el-form-item prop="remark" label="试题备注" class="qusetioremark" :label-width="formLabelWidth">
        <el-input v-model="form.remark" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="confirm()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addQuestionApi,editQuestionApi } from "../../../api/question";
import uploadvideo from "../components/uploadvideo";
import oncechoice from "../components/oncechoice";
import checkbox from "../components/checkbox";
import citycom from "../../../components/citycom";
import subjectcom from "@/components/subjectcom";
import enterprisecom from "../../../components/enterprisecom";
export default {
  data() {
    return {
      Isedit:false,
      rules: {
        subject: [{ required: true, message: "学科为必选项", trigger: "blur" }],
        step: [{ required: true, message: "阶段为必选项", trigger: "blur" }],
        enterprise: [{ required: true, message: "企业为必选项", trigger: "blur" }],
        city: [{ required: true, message: "城市为必选项", trigger: "blur" }],
        type: [{ required: true, message: "题型为必选项", trigger: "blur" }],
        difficulty: [{ required: true, message: "难度为必选项", trigger: "blur" }],
        title: [{ required: true, message: "试题标题为必填项", trigger: "blur" }],
        options: [{ required: true, message: "答案选项为必选项", trigger: "blur" }],
        answer_analyze: [{ required: true, message: "答案解析为必填项", trigger: "blur" }],
        remark: [{ required: true, message: "试题备注为必填项", trigger: "blur" }],
      },
      form: {
        title: "",
        subject: "",
        step: 1,
        enterprise: "",
        city: "",
        type: 1,
        difficulty: 1,
        single_select_answer: "",
        multiple_select_answer: [],
        short_answer: "",
        video: "",
        answer_analyze: "",
        remark: "",
        select_options: [
          {
            label: "A",
            text: "",
            image: ""
          },
          {
            label: "B",
            text: "",
            image: ""
          },
          {
            label: "C",
            text: "",
            image: ""
          },
          {
            label: "D",
            text: "",
            image: ""
          }
        ]
      },
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  methods: {
    cancel(){
      this.$refs.form.resetFields();
      this.dialogFormVisible = false;
        //刷新题目列表数据
      this.$parent.getQuestionList()
    },
    confirm() {
      // dialogFormVisible = false;
      //检验表单
      this.$refs.form.validate(valid => {
        if (valid) {
          // this.$message.success("表单检验成功");
          console.log(this.form);
         if(this.Isedit){
           //当前为编辑模式
           editQuestionApi(this.form).then(res=>{
             console.log(res)
            if (res.data.code === 200) {
                this.$message.success("编辑题目成功");
                this.$refs.form.resetFields()
                this.dialogFormVisible = false
                //刷新题目列表数据
                this.$parent.getQuestionList()
              } else {
                this.$message.error(res.data.message);
              }
           }).catch(err=>{
             console.log(err)
           })
         }else{
           //当前为新增模式
            addQuestionApi(this.form)
            .then(res => {
              console.log(res);
              if (res.data.code === 200) {
                this.$message.success("新增题目成功");
                this.$refs.form.resetFields()
                this.dialogFormVisible = false
                //刷新题目列表数据
                this.$parent.getQuestionList()
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
         }
        } else {
          this.$message.error("检验失败,请检查输入内容");
        }
      });
    },
    ontitleEditorChange(e) {
      // console.log(e);
      // e.text为输入的内容
      this.form.title = e.text;
    },
    onsolveEditorChange(e) {
      this.form.answer_analyze = e.text;
    }
  },
  components: {
    subjectcom,
    enterprisecom,
    citycom,
    oncechoice,
    checkbox,
    uploadvideo
  },
};
</script>

<style lang='less'>
.addquestbox {
  .el-form {
    text-align: left;
    .el-form-item {
      width: 450px;
    }
  }
  .el-form-item__content {
    margin-left: 120px;
  }

  .el-dialog {
    margin-top: 0px !important;
    .el-dialog__header {
      text-align: left;
    }
  }
  .el-dialog__body {
    margin: 0 auto;
    width: 850px;
  }
  .step .el-form-item__label {
    width: 120px;
  }
  div.questiontitle.el-form-item {
    width: 100%;
    margin-bottom: 50px;
    .el-form-item__label {
      // display: block;
      // width: 100%;
      // margin-bottom:35px ;
    }
    .el-form-item__content {
      margin-left: 40px !important;
      border: 0px solid #000;
      margin-top: 20px;
    }
  }
  .choice.el-form-item {
    width: 100%;
  }
  .qusetioremark {
    width: 100% !important;
  }
  .oncechoice {
    display: block;
  }
  .alloncechoice.el-radio-group {
    display: contents !important;

    .oncechoice1 {
      margin-top: 20px;
    }
  }
}
</style>