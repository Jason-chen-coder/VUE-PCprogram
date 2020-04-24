<template>
  <div>
    <el-card class="top-car box-card">
      <el-form ref="formline" :inline="true" :model="formline" class="demo-form-inline">
        <el-form-item prop="name" label="企业名称">
          <el-input v-model="formline.name"></el-input>
        </el-form-item>
        <el-form-item prop="eid" label="企业编号">
          <el-input v-model="formline.eid"></el-input>
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
          <el-button @click="addEnterprise()" type="primary">
            <i class="el-icon-plus"></i> 新增企业
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
        <el-table-column prop="eid" label="企业编号" width="180"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">{{scope.row.create_time| mytime}}</template>
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
            <el-link type="primary" :data-id="scope.row.id" @click="editEnterprise(scope.row)">编辑</el-link>
            <el-link
              @click="setStatus(scope.row)"
              :data-id="scope.row.id"
              style="margin:0 10px 0 10px"
              type="primary"
            >{{ scope.row.status===1? '禁用':'启用' }}</el-link>
            <el-link type="primary" :data-id="scope.row.id" @click="delEnterprise(scope.row)">删除</el-link>
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
    <!-- <addDialog ref="addDialog"></addDialog>
    <editDialog ref="editDialog" />-->
    <processEnt ref="processEnt" />
  </div>
</template>

<script>
import processEnt from "../../com/processEnt";
// import addDialog from "../enterprise/component/addDialog";
// import editDialog from "../enterprise/component/editDialog";
import {
  EnterpriseListApi,
  delEnterpriseApi,
  setEnterpriseApi
} from "../../api/enterprise";
export default {
  created() {
    this.getEnterpriseList();
  },
  data() {
    return {
      totalPage: 0,
      pageArr: [2, 4, 6, 8],
      tableData: [],
      isedit:true,
      obj: {
        name: "",
        page: 1,
        limit: 4,
        eid: "",
        username: "",
        status: ""
      },
      formline: {
        name: "",
        eid: "",
        username: "",
        status: ""
      }
    };
  },
  methods: {
    setStatus(row) {
      // console.log(row)
      setEnterpriseApi(row.id)
        .then(res => {
          // console.log(res)
          if (res.data.code === 200) {
            if (row.status === 1) {
              this.$message.success("禁用成功");
            } else {
              this.$message.success("启用成功");
            }
            //刷新列表
            this.getEnterpriseList();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    editEnterprise(row) {
      // console.log("开始编辑")
      // console.log(row)
      this.$refs.processEnt.dialogFormVisible = true;
      this.$refs.processEnt.Isedit = true;
      this.isedit =true
      this.$refs.processEnt.form = JSON.parse(JSON.stringify(row));
    },
    delEnterprise(row) {
      // console.log(row)
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delEnterpriseApi(row.id)
            .then(res => {
              // console.log(res);
              if (res.data.code === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                //删除成功之后,要检查在当前页删除前是否只剩最后一条信息,如果是则要向前一页跳转查询企业列表
                if (this.tableData.length === 1) {
                  this.obj.page--;
                }
                this.getEnterpriseList();
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
    clear() {
      //清除行内表单数据
      this.$refs.formline.resetFields();
    },
    search() {
      this.obj.name = this.formline.name;
      this.obj.eid = this.formline.eid;
      this.obj.username = this.formline.username;
      this.obj.status = this.formline.status;
      this.getEnterpriseList();
    },
    addEnterprise() {
      this.$refs.processEnt.dialogFormVisible = true;
      this.$refs.processEnt.Isedit = false ;
      this.isedit =false 
      // console.log("拉起新增框")
    },
    getEnterpriseList() {
      EnterpriseListApi(this.obj)
        .then(res => {
          // console.log(res);
          this.tableData = res.data.data.items;
          this.totalPage = res.data.data.pagination.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(index) {
      this.obj.limit = index;
      this.getEnterpriseList();
    },
    handleCurrentChange(index) {
      this.obj.page = index;
      this.getEnterpriseList();
    }
  },
  components: {
    // addDialog,
    // editDialog
    processEnt
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