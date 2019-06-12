<template>
  <div>
    <el-dialog v-dialogDrag ref="dialog__wrapper" title="新增角色" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="rolekey" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input  v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { eventBus } from '../common/eventBus';
  export default {
    name:'user_form',
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 10; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`
          });
        }
        return data;
      };
      return {
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        data: generateData(),
        value: [1, 4]
      }
    },
    methods: {
      addRole(v){
        this.dialogFormVisible=true;
      },
      editRole(v){
        this.dialogFormVisible=true;
      }
    },
    mounted() {
      eventBus.$on("addRole", v => {
        this.addRole(v);
      });
      eventBus.$on("editRole", v => {
        this.editRole(v);
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-dialog{
  }
</style>
