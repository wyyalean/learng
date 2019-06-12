<template>
  <div class="master_tabs">
 
    <div class="tab_page">
      <el-tabs
        v-model="editableTabsValue"
        type="card"
        closable
        @tab-click="tabChange"
        @tab-remove="removeTab"
      >
        <el-tab-pane
          :key="index"
          v-for="(item, index) in editableTabs"
          :label="item.title"
          :name="item.name"
          :contented="item.content"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <keep-alive>
      <transition name="fade-transform" mode="out-in">
        <component :is="tabView" :menuId="menuId"></component>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
import menuList from "../table/menuList";
import roleList from "../table/roleList";
import userList from "../table/userList";
import { eventBus } from "../common/eventBus";

export default {
  name: "masterPage",
  data() {
    return {
      tabView: "",
      editableTabsValue: "0",
      editableTabs: [],
      tabIndex: 0,
      menuId:'menuId'
    };
  },
  methods: {
    tabChange(tab) {
      console.log('user.contented   '+tab.$attrs.contented);
      this.tabView=tab.$attrs.contented
    },
    addTab(menuItem) {
      let already = false;
      this.editableTabs.forEach(v => {
        if (v.name == menuItem.title) 
          already = true;
      });
      if (!already) {
        let newTabName = ++this.tabIndex + "";
        menuItem.name = newTabName;
        this.editableTabs.push(menuItem);
        this.editableTabsValue = newTabName;
        this.tabView = menuItem.content;
        this.menuId=menuItem.menuId;
      }
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
              this.tabView = nextTab.content;
            } else {
              this.tabView = "";
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  },
  mounted() {
    eventBus.$on("addTab", v => {
      this.addTab(v);
    });
  },
  components: {
    menuList: menuList,
    roleList: roleList,
    userList: userList
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>

.master_tabs{
  max-height:88vh;
}

.tab_page {
  width: auto;
  height: 5vh;
}
</style>
