<template>
  <div>
    <el-row>
      <el-col class="left-col">
        <div class="add-left">
          <el-tabs v-model="activeName" tab-position="left">
            <el-tab-pane name="goods">
              <span slot="label">无菌物品标签</span>
            </el-tab-pane>
            <el-tab-pane name="equipment">
              <span slot="label">设备标签</span>
            </el-tab-pane>
            <el-tab-pane name="person">
              <span slot="label">人员标签</span>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col class="right-col">
        <div class="add-right">
          <transition name="fade-transform" mode="out-in">
            <component :is="isComponent" />
          </transition>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import goods from './goods'
import person from './person'
import equipment from './equipment'

export default {
  components: {
    goods,
    person,
    equipment
  },
  data() {
    return {
      activeName: 'goods',
      componentsList: {
        goods: 'goods',
        person: 'person',
        equipment: 'equipment'
      }
    }
  },
  computed: {
    isComponent() {
      return this.componentsList[this.activeName]
    }
  }
}
</script>
<style lang="scss" scoped>
.add-left {
  height: calc(100vh - 50px);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  background: rgba(240, 242, 245, 1);
  position: relative;
  padding-top: 30px;
}
.add-right {
  padding: 30px;
  height: calc(100vh - 50px);
  overflow-y: auto;
}
::v-deep .el-tabs--left .el-tabs__item.is-left {
  text-align: left;
  position: relative;
  left: 15px;
  padding: 30px;
  line-height: 0;
}
::v-deep .el-tabs__active-bar.is-left {
  top: 20px;
  left: 30px;
  right: auto;
  height: 20px !important;
  width: 4px;
}
::v-deep .el-tabs--left .el-tabs__nav-wrap.is-left::after {
  display: none;
}
.left-col {
  width: 210px;
}
.right-col {
  width: calc(100% - 210px);
}
</style>
