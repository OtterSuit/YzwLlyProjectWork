<template>
  <div>
    <!-- 右侧分类组件 -->
    <setting />
    <!-- 右侧分类组件end -->
    <!-- 物资管理页面 -->
    <classify />
    <!-- 物资管理页面end -->
  </div>
</template>

<script>
import setting from './setting'
import classify from './classify'
export default {
  components: {
    setting, classify
  },
  data() {
    return {
    }
  }
}
</script>
