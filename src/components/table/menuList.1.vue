<template>
  <div>
    <div class="btn_area">
      <div class="searchBtn">
        <el-input v-model="search" size="mini" placeholder="输入账号"/>
      </div>
      <!-- primary warning danger success warning-->
      <div class="add_btn">
        <el-button size="mini" type="primary" plain @click="handleEdit()">新增</el-button>
      </div>
      <div class="add_btn">
        <el-button size="mini" type="warning" plain @click="handleEdit()">编辑</el-button>
      </div>
      <div class="add_btn">
        <el-button size="mini" type="danger" plain @click="handleEdit()">删除</el-button>
      </div>
      <div class="add_btn">
        <el-button size="mini" type="success" plain @click="handleEdit()">分配权限</el-button>
      </div>
      <div class="add_btn">
        <el-button size="mini" type="warning" plain @click="handleEdit()">一键还原</el-button>
      </div>
      <div class="add_btn">
        <el-button size="mini" type="warning" plain @click="handleEdit()">解锁</el-button>
      </div>
    </div>
    <div class="table_area">
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="Date" prop="date" sortable>
          <!-- default-sort -->
        </el-table-column>

        <el-table-column label="Name" prop="name"></el-table-column>
        <!--table -->
        <el-table-column align="right"></el-table-column>
      </el-table>
    </div>
    <div class="pading_area">
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
    <user_form></user_form>
  </div>
</template>

<script>
import user_form from "../form/user_form";
import { eventBus } from "../common/eventBus";
export default {
  name: "menuList",
  components: {
    user_form: user_form
  },
  data() {
    return {
      addForm: true,
      currentPage: 4, //分页当前页码
      tableData: [
        {
          date: "2016-05-02",
          name: "王尼玛",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "赵子龙",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "你瞅啥",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-01",
          name: "你瞅啥",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-01",
          name: "你瞅啥",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-01",
          name: "你瞅啥",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "best",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      search: ""
    };
  },
  methods: {
    handleEdit() {
      eventBus.$emit("showForm", this.addForm);
    },
    handleDelete(index, row) {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    addTab(targetName) {
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: "New Tab",
        name: newTabName,
        content: "New Tab content"
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
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
