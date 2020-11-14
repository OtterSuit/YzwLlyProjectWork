<template>
  <div style="padding:30px">
    <m-tree
      :echart-style="lineStyle"
      :data="data"
    />
  </div>
</template>
<script>
import mTree from '@/components/echart/tree'
export default {
  components: {
    mTree
  },
  data() {
    return {
      lineStyle: {
        height: '500px',
        width: '100%'
      },
      data: [{
        'name': '五常管理法',
        'children': [
          {
            'name': '常组织',
            'children': [
              { 'name': '将物品分类' }
            ]
          },
          {
            'name': '常整顿',
            'children': [
              { 'name': '定量定位' }
            ]
          },
          {
            'name': '常清洁',
            'children': [
              { 'name': '定期进行清洁' }
            ]
          },
          {
            'name': '常规范',
            'children': [
              { 'name': '建立规范和制度',
                'children': [
                  { 'name': '制定评价标准' }
                ]
              }
            ]
          },
          {
            'name': '常自律',
            'children': [
              { 'name': '以身作则，自律' }
            ]
          }
        ]
      }]
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
</style>
