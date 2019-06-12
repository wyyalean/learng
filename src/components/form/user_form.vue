<template>
  <div>
    <el-dialog v-dialogDrag ref="dialog__wrapper" title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.nick" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.uname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-transfer v-model="form.roles" :data="data"></el-transfer>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { eventBus } from "../common/eventBus";
export default {
  name: "user_form",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        nick: "",
        uname: "",
        email: "",
        pwd: "",
        roles: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      value: [1, 4]
    };
  },
  methods: {
    addUser(v) {
      this.dialogFormVisible = true;
    },
    editUser(v) {
      this.dialogFormVisible = true;
    }
  },
  mounted() {
    eventBus.$on("addUser",(v)=>{
      this.addUser(v)
    } );
    eventBus.$on('editUser',(v)=>{
      this.editUser(v)
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-dialog {
}
.el-input {
  padding-left: 10px;
  width: 80%;
}
.el-checkbox {
  padding-left: 10px;
}

.dialog-footer {
  text-align: center;
}

.el-dropdown {
  vertical-align: top;
  width: 100px;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  width: 50x;
  font-size: 12px;
}
</style>
