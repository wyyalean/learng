<template>
  <div>
    <div class="btn_area">
      <div class="searchBtn">
        <el-input v-model="search" size="mini" placeholder="输入账号"/>
      </div>
      <div class="add_btn">
        <el-button size="mini" type="primary" plain @click="handleCreate()">新增</el-button>
      </div>
      <div class="add_btn">
        <el-button size="mini" type="warning" plain @click="toggleSelection()">一键还原</el-button>
      </div>
    </div>
    <el-table
      :data="userData"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" width="100" label="id"></el-table-column>
      <el-table-column prop="nick" label="用户名"></el-table-column>
      <el-table-column prop="uname" label="账号"></el-table-column>
      <el-table-column prop="roleIds" label="角色"></el-table-column>
      <el-table-column prop="status" label="账号状态"></el-table-column>
      <el-table-column prop="createTime" label="时间" sortable></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, userData)">Delete</el-button>
        </template>
      </el-table-column>
      <!-- default-sort -->
      <!--table -->
    </el-table>
    <user_form></user_form>
    <div class="pading_area">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "../../utils/axios";
import testData from "../../../dataTest";
import { Message, Loading } from "element-ui";
import { eventBus } from '../common/eventBus';
import user_form from "../form/user_form";

export default {
  name: "userList",
  props: ["menuId"],
  data() {
    return {
      currentPage: 1, //分页当前页码
      pageSize: 8,
      total:1,
      userData: [],
      search: ""
    };
  },
  created() {
    // this.queryUserList(this.currentPage, this.pageSize);
  },
  methods: {
    queryUserList(pageNum, pageSize) {
      const loadOption = {
        text: "登录中",
        fullscreen: true,
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      };
      let loadingInstance1 = Loading.service(loadOption);
      axios
        .post("sysadmin/media/sysUser/userList", {
          menuId: this.menuId,
          pageNum: pageNum,
          pageSize: pageSize
        })
        .then(res => {
          if(res!='undefined'){
            console.log(
              "request:sysadmin/media/sysUser/userList success ",
              JSON.stringify(res.data.data.list)
            );
            this.userData = res.data.data.list.records;
            this.total=res.data.data.list.total;
            // this.userData = testData.userList.data.records;
            // this.total=testData.userList.data.total;
          }
          loadingInstance1.close();
        })
        .catch(err => {
          console.log("sysadmin/media/sysUser/userList err ", JSON.stringify(err));
          this.userData = testData.userList.data.records;
          loadingInstance1.close();
        });
    },
    handleCreate(){
      eventBus.$emit("addUser");
    },
    handleEdit(){
      eventBus.$emit("editUser");
    },
    handleDelete(){

    },
    toggleSelection(rows){
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  components:{
    user_form:user_form
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn_area {
  height: 6vh;
  padding: 15px 10px 10px 5px;
}
.searchBtn {
  margin: 0 0 0 10px;
  width: 20vh;
}
.add_btn {
  margin: 10px 0 0 10px;
  float: left;
}

.el-input--mini .el-input__inner {
  width: 100px;
}
.el-pagination {
  text-align: center;
}
.pading_area {
  margin-top: 25px;
}
</style>
