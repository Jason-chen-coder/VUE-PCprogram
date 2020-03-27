<template>
  <div>
    <el-card class="top-car box-card">
      <el-form ref="formline" :inline="true" :model="formline" class="demo-form-inline">
        <el-form-item prop="name" label="学科名称">
          <el-input v-model="formline.name"></el-input>
        </el-form-item>
        <el-form-item prop="rid" label="学科编号">
          <el-input v-model="formline.rid"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="创建者">
          <el-input v-model="formline.username"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <!-- v-model双向绑定的数据源,将来只要el-option被选中了就会将value的值赋值给v-model  -->
          <el-select v-model="formline.status" placeholder="请选择状态">
            <!-- el-option 下拉选项  value -->
            <el-option label="所有" value></el-option>
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clear()">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addSubject()" type="primary">
            <i class="el-icon-plus"></i> 新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <!-- data为当前表格的数据源 -->
      <!-- ele-table可以直接帮助我们遍历渲染数据源,我们只需要向表格中传入一个数据源(data);数据源中有几个元素就有几行-->
      <!-- el-table-column为列数据 prop为当前列显示的数据源中的属性  label为列名-->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="180"></el-table-column>
        <el-table-column prop="rid" label="学科编号" width="180"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            {{scope.row.create_time| mytime}}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <!-- 使用自定义模板 -->
          <template slot-scope="scope">
            <!-- 先得到当前行的数据源:就是scope.row  即当前行（tableData[i]）的值-->
            {{scope.row.status===1 ? "启用":"禁用"}}
          </template>
        </el-table-column>
        <el-table-column prop="shortname" label="操作">
          <template slot-scope="scope">
            <el-link type="primary" :data-id="scope.row.id" @click="editSubject(scope.row)">编辑</el-link>
            <el-link
              @click="setStatus(scope.row)"
              :data-id="scope.row.id"
              style="margin:0 10px 0 10px"
              type="primary"
            >{{ scope.row.status===1? '禁用':'启用' }}</el-link>
            <el-link type="primary" :data-id="scope.row.id" @click="delSubject(scope.row.id)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="obj.page"
        :page-sizes="pageArr"
        :page-size="obj.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
      >
        <!-- total :总数（条） -->
        <!-- page-sizes ：可选择的页容量 -->
        <!-- page-size ：当前选择的页容量 -->
        <!-- current-page ： 当前页 -->
        <!-- layout : 布局  total总页数,sizes页容量 ,prev上一页 ,pager页码 , next 下一页, jumper跳转到指定页 -->
        <!-- size-change : 当当前页容量发生变化时触发 -->
        <!-- current-page : 当前页(页面跳转时)发生变化时触发 -->
      </el-pagination>
    </el-card>
    <addDialog ref="addDialog"></addDialog>
    <editDialog ref="editDialog" />
  </div>
</template>

<script>
import addDialog from "./component/addDialog";
import editDialog from "./component/editDialog";
import {
  getSubjectApi,
  changeStatusApi,
  delSubjectApi
} from "../../api/subject";
export default {
  created() {
    //一进入页面就进行学科列表的请求
    this.getAllSubject();
  },
  data() {
    return {
      totalPage: 0,
      pageArr: [4, 8, 10, 20],
      tableData: [],
      obj: {
        name: "",
        page: 1,
        limit: 4,
        rid: "",
        username: "",
        status: ""
      },
      formline: {
        name: "",
        rid: "",
        username: "",
        status: ""
      }
    };
  },
  components: {
    addDialog,
    editDialog
  },
  methods: {
    //清除搜索框中的内容
    clear() {
      this.$refs.formline.resetFields();
    },
    //筛选数据
    search() {
      //当点击了搜索按钮之后,修改obj的值进行检索
      this.obj.name = this.formline.name;
      this.obj.rid = this.formline.rid;
      this.obj.username = this.formline.username;
      this.obj.status = this.formline.status;
      this.getAllSubject();
    },
    editSubject(row) {
      console.log(row);
      this.$refs.editDialog.dialogFormVisible = true;
      //解决同步修改的问题,现将数据源转换成字符串,然后再讲新的字符串转成对象, 然后在给子组件
      //  this.$refs.editDialog.form  = row
      console.log(row);
      // 当我们点击的编辑学科和上一次点击的学科不是同一个时候,就重新给编辑学科子组件表单赋值,否则则继续显示
      if (this.$refs.editDialog.form.id != row.id) {
        this.$refs.editDialog.form = JSON.parse(JSON.stringify(row));
      }
    },
    addSubject() {
      console.log("拉起新增框");
      this.$refs.addDialog.dialogFormVisible = true;
    },
    getAllSubject() {
      getSubjectApi(this.obj)
        .then(res => {
          console.log("请求所有学科列表成功");
          console.log(res);
          // console.log(res.data.data.items.length);
          // //刷新页面,如果当前页面已经没有内容了,则需要向前跳一页
          // if (res.data.data.items.length === 0) {
          //   this.obj.page = this.obj.page - 1;
          //   console.log("当前page为",this.obj.page)
          //   return this.getAllSubject()
          // } 
            this.tableData = res.data.data.items;
            this.totalPage = res.data.data.pagination.total;
        })
        .catch(err => {
          console.log("请求学科列表失败");
          console.log(err);
        });
    },
    //修改页容量后出发的事件
    handleSizeChange(index) {
      console.log(`每页 ${index} 条`);
      this.obj.limit = index;
      this.getAllSubject();
    },
    //修改当前页码后触发的事件
    handleCurrentChange(index) {
      console.log(`当前页: ${index}`);
      this.obj.page = index;
      this.getAllSubject();
    },
    setStatus(data) {
      changeStatusApi(data.id)
        .then(res => {
          console.log(res);
          //当修改状态成功后,重新请求学科数据
          this.getAllSubject();
          //判断当前操作
          if (data.status === 1) {
            this.$message.success("禁用成功");
          } else {
            this.$message.success("启用成功");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    delSubject(id) {
      //先提醒是否要删除
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delSubjectApi(id)
            .then(res => {
              console.log(res);
              // 删除成功提示
              this.$message.success("删除成功");
              // console.log(res.data.data.items.length);
              //判断当前页是否只剩下最后一条数据,如果是,那删除了之后(在数据刷新前)请求的页面要减一
              if(this.tableData.length===1){
                this.obj.page = this.obj.page -1
              }
              this.getAllSubject();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style>
/* .el-form{
  display: flex;
  justify-content: space-between;
  align-content: center!important;
} */

.top-car {
  margin-bottom: 20px;
}
.el-card__body div {
  text-align: center;
}
.el-pagination {
  margin-top: 20px;
}
</style>