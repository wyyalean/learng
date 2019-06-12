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
      :data="roleData"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="Date" prop="date" sortable>
        <!-- default-sort -->
      </el-table-column>
      <el-table-column label="Name" prop="name"></el-table-column>
      <!--table -->
    </el-table>
    <role_form></role_form>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40,50]"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "../../utils/axios";
import testData from "../../../dataTest";
import { Message, Loading } from "element-ui";
import {eventBus} from '../common/eventBus';
import role_form from '../form/role_form'
export default {
  name: "role_table",
  props: ["menuId"],
  data() {
    return {
      currentPage: 1, //分页当前页码
      pageSize: 8,
      total:1,
      roleData: [],
      search: ""
    };
  },
  components:{
    role_form:role_form
  },
  created(){
    this.getMenuList(this.pageSize,this.currentPage);
  },
  methods: {
    getRoleList(currentPage,pageSize){
      console.log("request:sysadmin/media/sysRole/roleList getRoleList");
      axios
        .post("sysadmin/media/sysRole/roleList",{
          pageNum:currentPage,
          pageSize:pageSize})
        .then(res => {
          console.log(
            "request:sysadmin/media/sysRole/roleList success",
            JSON.stringify(res)
          );
          // this.roleData = res.data.data;
        }).catch(err =>{
          console.log("request:sysadmin/media/sysRole/roleList  err ", JSON.stringify(err));
        })
    },
    handleCreate(){
      eventBus.$emit("addRole");
    },
    handleEdit(index, row) {
      eventBus.$emit("editRole");
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleCreate(){
      eventBus.$emit("addRole");
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
