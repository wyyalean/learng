<template >
  <div>
    <div class="btn_area">
      <div class="searchBtn">
        <el-input v-model="search" size="mini" placeholder="输入菜單名"/>
      </div>
      <div class="add_btn">
        <el-button size="mini" type="primary" plain @click="handleCreate()">新增</el-button>
      </div>
      <div class="add_btn">
        <el-button size="mini" type="warning" plain @click="toggleSelection()">一键还原</el-button>
      </div>
    </div>
    <div class="table_area">
      <el-table
        :data="menuData"
        ref="multipleTable"
        style="width: 100%;height:74vh;margin-bottom: 20px;"
        row-key="id"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column fixed prop="menuName" label="菜单名称" sortable width="180"></el-table-column>
        <el-table-column prop="menuType" label="菜单类型" sortable width="180"></el-table-column>
        <el-table-column prop="id" label="唯一KEY"></el-table-column>
        <el-table-column prop="url" label="URL地址"></el-table-column>
        <el-table-column prop="visible" label="是否隐藏"></el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, menuData)"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <menu_form></menu_form>
      <!-- <el-table
        :data="tableData1"
        style="width: 100%"
        row-key="id"
        lazy
        :load="load"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>-->
    </div>
  </div>
</template>

<script>
import menu_form from "../form/menu_form";
import { eventBus } from "../common/eventBus";
import testData from "../../../dataTest";
import axios from "../../utils/axios";

export default {
  name: "menuList",
  props: ["menuId"],
  components: {
    menu_form: menu_form
  },
  data() {
    return {
      showIcon: false,
      editMenu: true,
      addForm: true,
      currentPage: 4, //分页当前页码
      totalcount: 400,
      // menuData: testData.menuList.data.data,
      menuData: [],
      search: ""
    };
  },
  created() {
    this.getMenuList();
  },
  computed: {},
  methods: {
    getMenuList() {
      axios
        .post("sysadmin/media/sysMenu/menuList")
        .then(res => {
          console.log(
            "request:sysadmin/media/sysMenu/menuList success",
            JSON.stringify(res.data.data.list)
          );
          this.menuData = res.data.data.list;
        })
        .catch(err => {
          console.log("request:auth/menuList err ", JSON.stringify(err));
        });
    },
    handleCreate() {
      eventBus.$emit("addMenu");
    },
    handleEdit(index, rows) {
      eventBus.$emit("editMenu");
    },
    handleDelete(index, rows) {
      rows.splice(index, 1);
      console.log("index " + index);
      console.log("row " + JSON.stringify(rows));
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-table__body-wrapper .is-scrolling-none {
  overflow: hidden;
}
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
.el-pagination {
  text-align: center;
}
.el-input--mini .el-input__inner {
  width: 100px;
}

.pading_area {
  margin-top: 25px;
}
</style>
