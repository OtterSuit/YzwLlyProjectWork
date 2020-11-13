<template>
  <div>
    <el-row>
      <el-col class="left-col">
        <div class="add-left">
          <el-scrollbar class="my-el-scrollbar">
            <el-menu
              ref="leftMenu"
              :default-active="activeIndex"
              @select="handleSelect"
            >
              <el-submenu index="equipment">
                <template slot="title">
                  <span>设备标签</span>
                </template>
                <el-menu-item v-for="item in tableData" :key="item.id" :index="item.id">{{ item.name }}</el-menu-item>
              </el-submenu>
              <el-menu-item index="person" class="person-item">
                <span slot="title">人员标签</span>
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
          <!-- <el-tabs v-model="activeName" tab-position="left"> -->
          <!-- <el-tab-pane name="goods">
              <span slot="label">无菌物品标签</span>
            </el-tab-pane> -->
          <!-- <el-tab-pane name="equipment">
              <span slot="label">设备标签</span>
            </el-tab-pane>
            <el-tab-pane name="person">
              <span slot="label">人员标签</span>
            </el-tab-pane>
          </el-tabs> -->
        </div>
      </el-col>
      <el-col class="right-col">
        <div class="add-right">
          <transition name="fade-transform" mode="out-in">
            <component :is="isComponent" :active-index="activeIndex" />
          </transition>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import goods from './goods'
import person from './person'
import equipment from './equipment'
import api from '@/api'

export default {
  components: {
    // goods,
    person,
    equipment
  },
  data() {
    return {
      activeName: 'equipment',
      componentsList: {
        // goods: 'goods',
        person: 'person',
        equipment: 'equipment'
      },
      tableData: [],
      activeIndex: ''
    }
  },
  computed: {
    isComponent() {
      return this.componentsList[this.activeName]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.toconstanttypePage({ pageSize: 50 }).then(response => {
        // console.log(response)
        this.activeIndex = response.data.records[0].id
        this.tableData = response.data.records
        this.listLoading = false
      })
    },
    handleSelect(key, keyPath) {
      this.activeName = keyPath[0]
      this.activeIndex = key
    }
  }
}
</script>
<style lang="scss" scoped>
.add-left {
  padding-left: 20px;
  height: calc(100vh - 50px);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  background: rgba(240, 242, 245, 1);
  position: relative;
  padding-top: 20px;
}
.add-right {
  padding: 30px;
  height: calc(100vh - 50px);
  overflow-y: auto;
}
.left-col {
  width: 210px;
}
.right-col {
  width: calc(100% - 210px);
}
::v-deep {
  .el-menu {
    border-right: 0;
  }
  .el-menu-item:focus,
  .el-menu-item:hover,
  .el-submenu__title:hover,
  .el-menu {
    background-color: rgba(240, 242, 245, 1);
  }
  .el-menu-item, .el-submenu__title {
    position: unset;
  }
  .person-item,
  .el-submenu {
    position: relative;
    &::before {
      content: '';
      height: 20px;
      width: 4px;
      position: absolute;
      top: 21px;
      left: 0;
      border-radius: 5px;
      background-color: #409EFF;
      transition: opacity 1s;
      opacity : 0;
    }
  }
  .person-item.is-active,
  .el-submenu.is-active {
    &::before {
      opacity: 1;
    }
  }
  .el-submenu__icon-arrow {
    display: none;
  }
}
.my-el-scrollbar {
  height: calc(100vh - 50px);
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
