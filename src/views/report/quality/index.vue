<template>
  <div>
    <div class="tabs-main">
      <el-tabs v-model="activeName" tab-position="left" style="height:100%">
        <el-tab-pane label="质量评价指标统计" name="evaluate" />
        <el-tab-pane label="质量监测统计" name="monitor" />
        <el-tab-pane label="湿包发生率统计" name="wet" />
        <el-tab-pane label="清洗合格率统计" name="cleaning" />
        <el-tab-pane label="器械包装合格率统计" name="bundle" />
        <el-tab-pane label="无菌物品合格率统计" name="antisepsis" />
        <el-tab-pane label="器械丢失统计" name="lost" />
        <el-tab-pane label="器械报损统计" name="damage" />
        <el-tab-pane label="不良事件报告统计" name="badevent" />
        <el-tab-pane label="设备维修统计" name="maintain" />
        <el-tab-pane label="发放合格率" name="delivery" />
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
import evaluate from './evaluate'
import monitor from './monitor'
import cleaning from './cleaning'
import bundle from './bundle'
import antisepsis from './antisepsis'
import lost from './lost'
import damage from './damage'
import maintain from './maintain'
import delivery from './delivery'
import badevent from './badevent'
import wet from './wet'
export default {
  components: {
    evaluate, monitor, cleaning, bundle, antisepsis, lost, damage, maintain, delivery, badevent, wet
  },
  data() {
    return {
      activeName: 'evaluate',
      componentsList: {
        evaluate: 'evaluate',
        monitor: 'monitor',
        cleaning: 'cleaning',
        bundle: 'bundle',
        antisepsis: 'antisepsis',
        lost: 'lost',
        damage: 'damage',
        maintain: 'maintain',
        badevent: 'badevent',
        wet: 'wet'
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
::v-deep.el-table--enable-row-transition .el-table__body td{
    padding: 20px 0
}
</style>

