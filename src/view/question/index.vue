<template>
  <div class="qusetionpage">
    <el-card class="top_card">
      <el-form :inline="true" ref="formline" :model="formInline" class="demo-form-inline">
        <!-- <el-form-item prop="subject" label="学科">
          <el-select class="select" v-model="formInline.subject" placeholder="请选择学科">
            <el-option
              v-for="(item, index) in subjectList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <!-- value="subject"  @input="" -->
        <el-form-item class="subject" prop="subject" label="学科">
          <subjectcom :value="formInline.subject" @input="getenterprise" />
        </el-form-item>
        <el-form-item prop="step" label="阶段">
          <el-select class="select" v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item prop="enterprise" label="企业">
          <el-select class="select" v-model="formInline.enterprise" placeholder="请选择企业">
            <el-option
              style="fontWeight:normal;color:#606266"
              v-for="(item, index) in enterpriseList"
              :key="index"3
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item prop="enterprise" label="企业">
          <enterprisecom v-model="formInline.enterprise" />
        </el-form-item>
        <el-form-item prop="type" label="题型">
          <el-select class="select" v-model="formInline.type" placeholder="请选择题型">
            <el-option label="单选" :value="1"></el-option>
            <el-option label="多选" :value="2"></el-option>
            <el-option label="简答" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item prop="difficulty" label="难度">
          <el-select class="select" v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="简单" :value="1"></el-option>
            <el-option label="一般" :value="2"></el-option>
            <el-option label="困难" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="username" label="作者">
          <el-input v-model="formInline.username" placeholder="请输入作者"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-select class="select" v-model="formInline.status" placeholder="请选择状态">
            <el-option label="所有" value></el-option>
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="create_date" label="日期">
          <el-date-picker v-model="formInline.create_date" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <br />
        <el-form-item prop="titlename" class="title" label="标题">
          <el-input v-model="formInline.titlename" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-button type="primary" @click="search()">搜索</el-button>
        <el-button type="primary" @click="clear()">清除</el-button>
        <el-button type="primary" @click="addQusetion()">
          <i class="el-icon-plus">新增试题</i>
        </el-button>
      </el-form>
    </el-card>

    <el-card class="bottom_card">
      <el-table :data="questionList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="title" label="题目" width="300">
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段" width="150">
          <template slot-scope="scope">
            {{scope.row.subject_name}}.
            <span v-if="scope.row.step===1">初级</span>
            <span v-if="scope.row.step===2">中级</span>
            <span v-if="scope.row.step===3">高级</span>
          </template>
        </el-table-column>
        <el-table-column prop="step" label="题型" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.type===1">单选</span>
            <span v-if="scope.row.type===2">多选</span>
            <span v-if="scope.row.type===3">简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业" width="240"></el-table-column>
        <el-table-column prop="username" label="创建者" width="150"></el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.status===0">禁用</span>
            <span v-if="scope.row.status===1">启用</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量" width="100"></el-table-column>

        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="editQuestion(scope.row)" type="text" size="small">编辑</el-button>
            <el-button
              @click="changeStatus(scope.row)"
              type="text"
              size="small"
            >{{scope.row.status===0?'启用':'禁用'}}</el-button>
            <el-button type="text" size="small" @click="delQuestion(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="questionList.page"
        :page-sizes="[2,4,8,16]"
        :page-size="questionList.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalpage"
      ></el-pagination>
    </el-card>
    <add_edit_question ref="add_edit_question" />
  </div>
</template>

<script>
import add_edit_question from "../question/components/add_edit_question"
import subjectcom from "../../components/subjectcom";
import enterprisecom from "../../components/enterprisecom";
import { getQuestionListAPI,changeStatusApi,delQuestionApi } from "../../api/question";
// import { getSubjectApi } from "../../api/subject";
// import { EnterpriseListApi } from "../../api/enterprise";
export default {
  created() {
    //进入页面先获取题库列表
    this.getQuestionList();
    //获取学科列表,默认只能得到4个
    // getSubjectApi({})
    //   .then(res => {
    //     if (res.data.code === 200) {
    //       // console.log("学科列表（默认获得4个）",res)
    //       this.subjectList = res.data.data.items;
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // //获取企业列表
    // EnterpriseListApi({})
    //   .then(res => {
    //     if (res.data.code === 200) {
    //       console.log("企业列表", res);
    //       this.enterpriseList = res.data.data.items;
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  },
  data() {
    return {
      subjectList: "",
      enterpriseList: "",
      formInline: {
        enterprise: "",
        subject: "",
        step: "",
        type: "",
        difficulty: "",
        username: "",
        status: "",
        create_date: "",
        titlename: ""
      },
      totalpage: 0,
      questionList: [],
      question: {
        title: "",
        subject: "",
        enterprise: "",
        type: "",
        step: "",
        username: "",
        status: "",
        difficulty: "",
        create_date: "",
        page: 1,
        limit: 2
      },
      tableData: []
    };
  },
  methods: {
    delQuestion(raw){
      console.log(raw)
      this.$confirm('此操作将永久删除该题目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delQuestionApi(raw.id).then(res=>{
            console.log(res)
            if(res.data.code===200){
              this.$message({
            type: 'success',
            message: '删除成功!'
             });
              //刷新页面
            if(this.questionList.length===1){
               this.question.page= this.question.page-1
            }
          this.getQuestionList();
            }else{
              this.$message.error(res.data.message);
            }
          })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    changeStatus(raw){
      console.log(raw)
      changeStatusApi(raw.id).then(res=>{
        console.log(res)
        if(res.data.code===200){
          this.$message.success("修改成功")
          //刷新页面
          this.getQuestionList();
        }else{
          this.$message.error(res.data.message)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    editQuestion(row){
      //编辑模块
      console.log(row)
    //  将子模块设置成编辑模式
     this.$refs.add_edit_question.Isedit=true
    //将子模块展示出来
    this.$refs.add_edit_question.dialogFormVisible=true
    //将该条编辑内容给子模块,子模块做出展示
    this.$nextTick(()=>{
      this.$refs.add_edit_question.form = row
      this.$refs.add_edit_question.obj = row
    })
    },
    getenterprise(value) {
      //value就是子组件传过来的学科id
      this.formInline.subject = value;
    },
    addQusetion(){
     //拉起新增题页面
     this.$refs.add_edit_question.dialogFormVisible=true
    //默认清空数据
    this.$refs.add_edit_question.$refs.form.resetFields()
    },
    clear() {
      this.$refs.formline.resetFields();
      this.$refs.formline.subject = "";
      console.log(this.formInline);
    },
    search() {
      for (const key in this.formInline) {
        this.question[key] = this.formInline[key];
      }
      console.log(this.question);
      //开始搜素
      this.getQuestionList();
    },
    getQuestionList() {
      getQuestionListAPI(this.question)
        .then(res => {
          if (res.data.code === 200) {
            console.log("题目列表", res);
            this.questionList = res.data.data.items;
            this.totalpage = res.data.data.pagination.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.question.limit = val;
      this.getQuestionList()      
      // console.log(this.questionList.limit)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.question.page = val;
      // console.log(this.question)
       this.getQuestionList()      
    }
  },
  components: {
    subjectcom,
    enterprisecom,
    add_edit_question
  }
};
</script>
  
<style lang="less">
.qusetionpage {
  .top_card {
    margin-bottom: 21px;
    .el-form--inline {
      padding-top: 0;
    }
    .el-form-item {
      margin-right: 0;
    }
    .select,
    .el-input,
    .el-date-editor {
      width: 200px;
    }
    .el-card__body .el-form--inline {
      display: block;
    }
    .el-form-item__content {
      margin-left: 31px;
      margin-right: 30px;
    }
    .el-form-item__label {
      padding-right: 0;
    }
    .title .el-input {
      width: 490px;
    }
    el-form-item button {
      width: 70px;
    }
  }
  .el-popper[x-placement^="bottom"] {
    margin-top: 24px;
  }
}
</style>