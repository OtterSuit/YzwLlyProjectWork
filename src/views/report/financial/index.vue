<template>
  <div>
    <div class="tabs-main">
      <el-tabs v-model="activeName" tab-position="left" style="height:100%">
        <el-tab-pane label="核算月报" name="account" />
        <el-tab-pane label="发放物品统计月报" name="delivery" />
        <el-tab-pane label="借还物品统计" name="borrowed" />
        <el-tab-pane label="出/入库物品统计" name="io" />
        <el-tab-pane label="签收统计" name="returnGoods" />
        <el-tab-pane label="退回统计" name="sign" />
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
import account from './account'
import delivery from './delivery'
import borrowed from './borrowed'
import io from './io'
import returnGoods from './returnGoods'
import sign from './sign'

export default {
  components: {
    account, delivery, borrowed, io, sign, returnGoods
  },
  data() {
    return {
      activeName: 'account',
      componentsList: {
        account: 'account',
        delivery: 'delivery',
        borrowed: 'borrowed',
        io: 'io',
        sign: 'sign',
        returnGoods: 'returnGoods'
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

