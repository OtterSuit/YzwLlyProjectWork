<template>
  <div style="padding:30px">
    <el-row>
      <el-col :span="2">
        <div style="height:40px;line-height:40.8px;font-size:18px">
          上报统计图
        </div>
      </el-col>
      <el-col :span="8">
        <el-tabs v-model="activeName">
          <el-tab-pane label="按上报时间分析" name="byTime" />
          <el-tab-pane label="按事件等级分析" name="focus" />
          <el-tab-pane label="按所属事件分析" name="event" />
        </el-tabs>
      </el-col>
    </el-row>
    <transition name="fade-transform" mode="out-in">
      <component :is="isComponent" />
    </transition>
  </div>
</template>

<script>
import event from './event'
import focus from './focus'
import byTime from './byTime'

export default {
  components: {
    event, focus, byTime
  },
  data() {
    return {
      activeName: 'event',
      componentsList: {
        event: 'event',
        focus: 'focus',
        byTime: 'byTime'
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
::v-deep .el-tabs__nav-wrap::after, ::v-deep .el-tabs__active-bar{
  display: none;
}
::v-deep .el-tabs__item {
  font-size: 12px;
  padding: 0 10px;
  line-height: 45px;
}
</style>
