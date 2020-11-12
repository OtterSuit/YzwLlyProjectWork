<template>
  <div>
    <div class="tabs-main">
      <el-tabs v-model="activeName" tab-position="left" style="height:100%">
        <el-tab-pane label="工作量指标统计" name="workload" />
        <el-tab-pane label="灭菌炉次统计" name="furnace" />
        <el-tab-pane label="供应室工作量统计" name="warehouse" />
        <el-tab-pane label="器械包工作量统计备份" name="packet" />
        <el-tab-pane label="全院领计统计" name="whole" />
      </el-tabs>
    </div>
    <div style="margin-left:230px">
      <transition name="fade-transform" mode="out-in">
        <component :is="isComponent" />
      </transition>
    </div>
  </div>
</template>

<script>
import workload from './workload'
import furnace from './furnace'
import warehouse from './warehouse'
import packet from './packet'
import whole from './whole'

export default {
  components: {
    workload, furnace, warehouse, packet, whole
  },
  data() {
    return {
      activeName: 'workload',
      componentsList: {
        workload: 'workload',
        furnace: 'furnace',
        warehouse: 'warehouse',
        packet: 'packet',
        whole: 'whole'
      }
    }
  },
  computed: {
    isComponent() {
      console.log(this.activeName)
      return this.componentsList[this.activeName]
    }
  },
  methods: {

  }
}
</script>

<style  lang="scss" scoped>
::v-deep.tabs-main {
  position: fixed;
  height: 100%;
  width: 210px;
  background: #F6F6F6;
  padding-top: 30px;
  .el-tabs--left .el-tabs__item.is-left{
    text-align: left;
    position: relative;
    left: 15px;
    padding: 30px;
    line-height: 0;
  }
  .el-tabs__active-bar.is-left{
    top: 20px;
    left: 30px;
    height: 20px!important;
    width: 4px
  }
  .el-tabs--left .el-tabs__nav-wrap.is-left::after{
    display: none;
  }
}
</style>

