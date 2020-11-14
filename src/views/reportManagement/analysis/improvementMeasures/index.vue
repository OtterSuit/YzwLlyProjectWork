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
        'name': '改进措施',
        'children': [
          {
            'name': '护士操作未严格核对',
            'children': [
              { 'name': '加强护士操作培训' }
            ]
          },
          {
            'name': '护士违反规章制度和操作流程',
            'children': [
              { 'name': '强调规章制度和操作流程' }
            ]
          },
          {
            'name': '护士未正确执行医嘱',
            'children': [
              { 'name': '加强护士执行医嘱培训' }
            ]
          },
          {
            'name': '未严格执行分级护理制度',
            'children': [
              { 'name': '强化分级护理制度' }
            ]
          },
          {
            'name': '护士的工作态度消极',
            'children': [
              { 'name': '加强护士工作培训' }
            ]
          },
          {
            'name': '护士对患者潜在风险评估能力不足',
            'children': [
              { 'name': '加强护士对患者潜在风险评估能力培训' }
            ]
          },
          {
            'name': '药品管理混乱',
            'children': [
              { 'name': '规范管理药品' }
            ]
          },
          {
            'name': '护士缺乏专科疾病护理知识',
            'children': [
              { 'name': '加强护专科疾病护理知识培训' }
            ]
          },
          {
            'name': '医院后勤保障系统不完善',
            'children': [
              { 'name': '完善医院后勤保障系统' }
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
