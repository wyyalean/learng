<template>
  <div>
    <el-dialog
      width="70vh"
      v-dialogDrag
      ref="dialog__wrapper"
      title="新增菜单"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-dropdown>
            <el-button type="primary">
              {{this.mtBtn}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" style='width:150px;padding:10px;margin:10px 0 0 40px'>
              <el-tree default-expand-all :data="data" :node-key="data.id" 
              @node-click="handleNodeClick"></el-tree>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <el-input v-model="form.parentId" autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio-group v-model="form.menuType" style="padding-left:30px">
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
            <el-radio :label="3">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.menuName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="form.menuType==2" label="请求地址" :label-width="formLabelWidth">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="form.menuType!==1" label="权限标识" :label-width="formLabelWidth">
          <el-input v-model="form.perms" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="form.menuType!==3" label="菜单排序" :label-width="formLabelWidth">
          <el-input v-model="form.orderNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="form.menuType==1" label="图标" :label-width="formLabelWidth">
          <!-- <el-transfer v-model="form.icon" :data="data"></el-transfer> -->
          <!-- <el-input v-model="form.icon" autocomplete="off"></el-input> -->
          <el-popover
            placement="right"
            width="400"
            trigger="click">
          <el-button  slot="reference" style='margin-left:12px' size="mini"  icon="el-icon-circle-plus-outline" type="primary" circle ></el-button>
            <transition  name="fade-transform" mode="out-in">
              <icon_choice ></icon_choice>
            </transition>
          </el-popover>
        </el-form-item>
        <el-form-item label="是否隐藏" :label-width="formLabelWidth">
          <el-checkbox v-model="form.visible">隐藏</el-checkbox>
        </el-form-item>
        <el-form-item label="菜单描述" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit()">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { eventBus } from "../common/eventBus";
import ds from "../../../dataTest";
import icon_choice from "../form/icon_choice";
export default {
  name: "menu_form",
  data() {
    return {
      iconView:false,
      dialogFormVisible: false,
      mtBtn:"菜单类型",
      form: {
        menuName: "",
        parentId: "",
        url: "",
        menuType: 1,
        orderNum: "",
        visible: false,
        perms: "",
        icon: "",
        remark: ""
      },
      formLabelWidth: "120px",
      value: [1, 4],
      data: this.parseJson(ds.pageIndex.data.data) 
    };
  },
  methods: {
    parseJson(d){
      let dd= JSON.parse(JSON.stringify(d).replaceAll('menuName','label'));
      // console.log(JSON.stringify(dd));
      return dd
    },
    showIconPanel(arg){
      this.iconView=arg
    },
    addMenu(action) {
      this.dialogFormVisible = true;
    },
    editMenu(v){
      this.dialogFormVisible = true;
    },
    onSubmit() {
      this.dialogFormVisible = false;
    },
    handleNodeClick(data,node,el) {
      this.form.parentId=data.id;
      this.mtBtn=data.label;
    }
  },
  mounted() {
    eventBus.$on("addMenu", v => {
      this.addMenu(v);
    });
    eventBus.$on("editMenu", v => {
      this.editMenu(v);
    });
  },
  components: {
    icon_choice: icon_choice
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
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
