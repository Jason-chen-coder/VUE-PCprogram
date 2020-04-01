<template>
  <div>
    <el-card class="top-card">
      <el-form ref="formline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item prop="username" label="用户名称">
          <el-input v-model="formInline.username" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="用户邮箱">
          <el-input v-model="formInline.email" placeholder="请输入用户邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="role_id" label="角色">
          <el-select v-model="formInline.role_id" placeholder="请选择状态">
            <el-option label="所有" value></el-option>
            <el-option label="管理员" :value="2"></el-option>
            <el-option label="学生" :value="4"></el-option>
            <el-option label="老师" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clear">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addUser()" icon="el-icon-plus">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="button-card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column type="index" label="用户头像" width="130">
          <template slot-scope="scope">
            <img
              class="userimg"
              v-if="scope.row.avatar"
              :src="'http://127.0.0.1/heimamm/public/'+scope.row.avatar"
              alt
            />
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="170"></el-table-column>
        <el-table-column prop="phone" label="电话" width="170"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
        <el-table-column prop="role_id" label="角色" width="170">
          <template slot-scope="scope">
            <span v-if="scope.row.role_id===2">管理员</span>
            <span v-else-if="scope.row.role_id===3">老师</span>
            <span v-else>学生</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="200"></el-table-column>
        <el-table-column prop="status" label="状态" width="170">
          <template slot-scope="scope">
            <span type="primary">{{scope.row.status===1 ? '启用':'禁用'}}</span>
          </template>
        </el-table-column>
        <!-- fixed="right" 可让el-table-column列浮动起来固定不动 -->
        <el-table-column class="controls" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              @click="setStatus(scope.row)"
              type="text"
              size="small"
            >{{scope.row.status===0 ? '启用':'禁用'}}</el-button>
            <el-button type="text" @click="editUser(scope.row)" v-if='["管理员","老师"].includes($store.state.role)' size="small">编辑</el-button>
            <el-button type="text" @click="removeUser(scope.row)"  v-if="$store.state.role=='管理员'" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="obj.page"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="obj.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="allPage"
      ></el-pagination>
    </el-card>
    <processUser ref="processUser" />
  </div>
</template>

<script>
import { getUserListApi, setStatusApi, removeUserApi } from "../../api/user";
import processUser from "../../com/processUser";
export default {
  created() {
    this.getUserList();
  },
  data() {
    return {
      tableData: [],
      formInline: {
        username: "",
        email: "",
        role_id: ""
      },
      obj: {
        username: "",
        email: "",
        role_id: "",
        page: 1,
        limit: 4
      },
      allPage: 0
    };
  },
  components: {
    processUser
  },
  methods: {
    addUser() {
      //  this.$nextTick(()=>{
      //     var formobj=this.$refs.processUser.form
      //   for (const key in formobj) {
      //     formobj[key]=""
      //   }
      //   this.$refs.processUser.$refs.form.resetFields()
      //  })

      this.$refs.processUser.Isedit = false;
      this.$refs.processUser.dialogFormVisible = true;
      //如果上一次点击了编辑,这一次就要清除内容
      // if (this.$refs.processUser.form.id) {
        this.$nextTick(()=>{
          this.$refs.processUser.$refs.form.resetFields();
        })
      // }

      this.$refs.processUser.imageUrl = "";
      //   // 将子组件的fom表单内容清空
      //   // this.$refs.processUser.form={}
      //   this.$refs.processUser.imageUrl=""
    },
    editUser(row) {
      console.log(row);
      this.$refs.processUser.Isedit = true;
      this.$refs.processUser.dialogFormVisible = true;
      if (row.id !== this.$refs.processUser.form.id) {
        this.$nextTick(() => {
          this.$refs.processUser.form = JSON.parse(JSON.stringify(row));
          if (row.avatar) {
            this.$refs.processUser.imageUrl =
              process.env.VUE_APP_URL + "/" + row.avatar;
          } else {
            this.$refs.processUser.imageUrl = "";
          }
        });
      }
    },
    removeUser(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeUserApi(row.id)
            .then(res => {
              console.log(res);
              if (res.data.code === 200) {
                // this.$message.success("删除成功")
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                //刷新页面
                if (this.tableData.length === 1) {
                  this.obj.page = this.obj.page - 1;
                }
                this.getUserList();
              } else {
                this.$message.error(this.data.message);
              }
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
    },
    setStatus(row) {
      setStatusApi(row.id)
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            if (row.status === 0) {
              this.$message.success("启用成功");
            } else {
              this.$message.success("禁用成功");
            }
            //刷新当前页面数据
            this.getUserList();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    clear() {
      this.$refs.formline.resetFields();
    },
    search() {
      this.obj.username = this.formInline.username;
      this.obj.email = this.formInline.email;
      this.obj.role_id = this.formInline.role_id;
      this.getUserList();
    },
    getUserList() {
      getUserListApi(this.obj)
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.tableData = res.data.data.items;
            this.allPage = res.data.data.pagination.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
      console.log("submit!");
    },
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.obj.limit = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.obj.page = val;
      this.getUserList();
    }
  }
};
</script>

<style>
.top-card {
  margin-bottom: 20px;
}
.cell button {
  font-size: 14px;
}
.el-form--inline {
  text-align-last: left;
  display: flex;
  /* line-height: 100%; */
  padding-top: 20px;
}
.userimg {
  display: inline-block;
  width: 100px;
  height: 100px;
}
</style>