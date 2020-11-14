<template>
  <div style="padding:30px">
    <el-row>
      <el-col :span="3">
        <div style="height:40px;line-height:40.8px">
          护士长工作质量
        </div>
      </el-col>
      <el-col :span="8">
        <el-tabs v-model="activeName">
          <el-tab-pane label="月度对比" name="month" />
          <el-tab-pane label="全院对比" name="hospitalWide" />
        </el-tabs>
      </el-col>
    </el-row>
    <!-- <transition name="fade-transform" mode="out-in"> -->
    <component :is="isComponent" />
    <!-- </transition> -->
  </div>
</template>
<script>
import month from './month'
import hospitalWide from './hospitalWide'

export default {
  components: {
    month, hospitalWide
  },
  data() {
    return {
      activeName: 'month',
      componentsList: {
        month: 'month',
        hospitalWide: 'hospitalWide'
      }
    }
  },
  computed: {
    isComponent() {
      return this.componentsList[this.activeName]
    }
  },
  methods: {
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
