<template>
  <div style="padding:30px">
    <m-tree
      :echart-style="lineStyle"
      :data="data"
      :right="right"
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
        height: '800px',
        width: '100%'
      },
      right: '35%',
      data: [{
        name: '不良事件的常见原因',
        children: [
          {
            name: '护士操作未严格核对',
            children: [
              {
                name: '用药查对不严'
              },
              {
                name: '未做到姓名、药名、输液卡三对照'
              }
            ]
          },
          {
            name: '护士违反规章制度和操作流程',
            children: [
              {
                name: '年轻护士对工作流程不熟悉'
              },
              {
                name: '卧床患者翻身不及时造成压疮'
              },
              {
                name: '违反手术安全查对制度，造成器械、纱布遗忘在手术切口中'
              },
              {
                name: '静脉注射药液外渗引起局部组织坏死'
              },
              {
                name: '手术因漏做皮肤准备或备皮划伤多处而影响手术及检查'
              },
              {
                name: '洗胃操作不当造成胃穿孔'
              }
            ]
          },
          {
            name: '护士未正确执行医嘱',
            children: [
              {
                name: '盲目地执行错误的医嘱'
              },
              {
                name: '遗漏执行医嘱，造成患者未及时用药'
              },
              {
                name: '漏做药物过敏试验或做过敏试验后，未及时观察结果导致重做'
              }
            ]
          },
          {
            name: '未严格执行分级护理制度',
            children: [
              {
                name: '未严格按照分级护理制度对病人观察和巡视'
              },
              {
                name: '未落实病人病情交接班制度'
              },
              {
                name: '健康教育宣教不到位，未告知患者潜在风险'
              }
            ]
          },
          {
            name: '护士的工作态度消极',
            children: [
              {
                name: '护士的消极倦怠心理'
              },
              {
                name: '护士待遇差，工作缺乏热情'
              },
              {
                name: '护士对病人冷漠，引起病人投诉'
              }
            ]
          },
          {
            name: '护士对患者潜在风险评估能力不足',
            children: [
              {
                name: '低年资护士疾病专科知识缺乏，对患者风险评估能力不足'
              },
              {
                name: '护士未对坠床高危因素患者评估及采取预防措施'
              },
              {
                name: '护士未对跌倒高危因素患者评估及采取预防措施'
              },
              {
                name: '护士未对管道滑脱高危因素患者评估及采取预防措施'
              }
            ]
          },
          {
            name: '药品管理混乱',
            children: [
              {
                name: '药品混放，导致拿错药物、用错药物'
              },
              {
                name: '药品瓶签与内装药品不符，导致用药错误'
              },
              {
                name: '冷藏药品未放冰箱保存，导致药品过期'
              },
              {
                name: '毒麻药和高危药品无高危警示标识，未单独放置'
              }
            ]
          },
          {
            name: '护士缺乏专科疾病护理知识',
            children: [
              {
                name: '护士对药物在不同途径治疗目的和效果不了解'
              },
              {
                name: '护士对专科疾病知识不了解'
              },
              {
                name: '护士对发生的病情变化不能及时判断和应对'
              }
            ]
          },
          {
            name: '医院后勤保障系统不完善',
            children: [
              {
                name: '药品不能及时送到病房'
              },
              {
                name: '科室物品（打印机）报修报送不及时'
              },
              {
                name: '食堂饭菜不美味'
              }
            ]
          }
        ]
      }],
      diagramStyle: {
        width: '100%',
        height: '500px',
        backgroundColor: '#fff'
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
