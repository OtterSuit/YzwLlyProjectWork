<template>
  <div v-loading="listLoading" class="analysis-container">
    <div class="title-top">统计分析：{{ data.name }}</div>
    <div class="content-top">
      <span>问卷收集时间：{{ data.startTime }}</span>
      <span style="margin: 0 5px">至</span>
      <span>{{ data.endTime }}</span>
      <span style="margin-left: 30px">答卷人数：{{ data.answerCount }}</span>
    </div>
    <div v-for="(item,index) in tableData" :key="item.title">
      <div v-if="item.question.length!==0">
        <div class="type-title">{{ numberChinese[index] }}、{{ item.title }}</div>
        <mybox v-for="(element,i) in item.question" :key="element.name+i">
          <div class="question">
            <div class="questionName">{{ i+1 }}、{{ element.name }}</div>
            <i
              class="el-icon-s-data echartsIcon"
              :class="{activeIcon:element.activeIcon==='bar'}"
              @click="activeIconChange('bar',element)"
            />
            <i
              class="el-icon-pie-chart echartsIcon"
              :class="{activeIcon:element.activeIcon==='pie'}"
              @click="activeIconChange('pie',element)"
            />
          </div>
          <m-pie
            v-if="element.activeIcon==='pie'"
            style="padding:0 58px"
            :echart-style="style"
            :opinion="opinion"
            :radius="radius"
            :opinion-data="element.data"
            position="inner"
            label="{c}"
          />
          <m-bar
            v-if="element.activeIcon==='bar'"
            class="echart"
            formatter="{b} : {c}人"
            :echart-style="barStyle"
            :opinion-data="element.info"
            :x="barX"
            :y="y"
          />
          <table border="0" cellspacing="0" cellpadding="0" class="table">
            <tbody>
              <tr v-for="(tableItem,tableIndex) in barX" :key="tableItem">
                <td class="circle-td">
                  <div class="circle" :class="['circle'+tableIndex]" />
                </td>
                <td>{{ tableItem }}</td>
                <td>{{ element.data[tableIndex].value }}人</td>
                <td>{{ element.data[tableIndex].percentage }}</td>
              </tr>
            </tbody>
          </table>
        </mybox>
      </div>
    </div>
    <!-- <my-pagination :total="total" :methods-default="false" :conditions="conditions" background @currentChange="currentChange" /> -->
  </div>
</template>

<script>
import Mybox from '@/components/Mybox'
import mPie from '@/components/echart/pie'
import mBar from '@/components/echart/bar'
import api from '@/api'
// import MyPagination from '@/components/MyPagination'
export default {
  components: {
    mPie,
    mBar,
    Mybox
    // MyPagination
  },
  data() {
    return {
      data: {},
      // total: 0,
      listLoading: true,
      y: {
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          color: 'rgba(0,0,0,0.45)'
        }
      },
      barX: ['很满意', '满意', '一般', '不满意'],
      info: [
        {
          type: 'bar',
          data: [94, 96, 95, 92]
        }
      ],
      opinion: {
        data: []
      },
      radius: ['65%', '90%'],
      style: {
        height: '225px',
        width: '100%'
      },
      barStyle: {
        height: '203px',
        width: '70%'
      },
      tableData: [],
      numberChinese: {
        0: '一',
        1: '二',
        2: '三',
        3: '四'
      },
      conditions: {
        id: null
      }
    }
  },
  created() {
    this.conditions.id = this.$route.params.id
    this.fetchData()
  },
  methods: {
    // 处理数据
    async fetchData() {
      this.listLoading = true
      const response = await api.getSatisfactionAnswer(this.conditions)
      if (!response.success) {
        return
      }
      this.data = response.resData
      console.log('问卷分析:', response)
      this.listLoading = false
      const questions = response.resData.questions
      questions.forEach(v => {
        const obj = {
          info: [
            {
              type: 'bar',
              data: [v.verySatisfiedCount, v.satisfiedCount, v.generalSatisfiedCount, v.notSatisfiedCount]
            }
          ],
          data: [
            { value: v.verySatisfiedCount, name: '很满意', percentage: v.verySatisfiedProportion },
            { value: v.satisfiedCount, name: '满意', percentage: v.satisfiedProportion },
            { value: v.generalSatisfiedCount, name: '一般', percentage: v.generalSatisfiedProportion },
            { value: v.notSatisfiedCount, name: '不满意', percentage: v.notSatisfiedProportion }
          ],
          name: v.name,
          activeIcon: 'pie'
        }
        let index
        const bool = this.tableData.some((j, i) => {
          if (j.title === v.title) {
            index = i
          }
          return j.title === v.title
        })
        if (bool) {
          this.tableData[index].question.push(obj)
        } else {
          this.tableData.push({
            title: v.title,
            question: [obj]
          })
        }
      })
      // this.total = response.resData.totalItems
    },
    // echarts图标切换
    activeIconChange(icon, item) {
      item.activeIcon = icon
    }
    // 分页
    // currentChange(conditions) {
    //   this.tableData.forEach(item => {
    //     item.question = []
    //   })
    //   this.conditions = conditions
    //   this.fetchData()
    // }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.analysis-container {
  min-height: calc(100vh - 84px);
  padding: 30px;
  background-color: #f0f2f5;
}
.question {
  font-size: 18px;
  color: rgba(102, 102, 102, 1);
  line-height: 28px;
  .questionName {
    display: inline-block;
    max-width: 90%;
  }
}
.title-top {
  height: 31px;
  font-size: 24px;
  line-height: 31px;
  text-align: center;
  margin-bottom: 14px;
}
.content-top {
  height: 19px;
  font-size: 14px;
  color: rgba(153, 153, 153, 1);
  text-align: center;
  line-height: 19px;
  margin-bottom: 30px;
}
.type-title {
  height: 24px;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 11px;
}
.echartsIcon {
  z-index: 1;
  position: relative;
  float: right;
  width: 40px;
  height: 28px;
  background: rgba(244, 244, 245, 1);
  border-radius: 0px 3px 3px 0px;
  border: 1px solid rgba(233, 233, 235, 1);
  text-align: center;
  line-height: 28px;
  color: #bfcbd9;
  font-size: 18px;
  cursor: pointer;
  // margin-right: 20px;
}
.activeIcon {
  background: rgba(236, 245, 255, 1);
  border: 1px solid rgba(217, 236, 255, 1);
  color: #409eff;
}
.table {
  position: absolute;
  bottom: 50px;
  left: 58px;
  td {
    padding-right: 30px;
    padding-bottom: 25px;
    font-size: 14px;
  }
}
.circle {
  width: 9px;
  height: 9px;
  border-radius: 9px;
}
.circle0 {
  background-color: #5cacff;
}
.circle1 {
  background-color: #faa465;
}
.circle2 {
  background-color: #5cd1ce;
}
.circle3 {
  background-color: #c3aeef;
}
.circle-td {
  padding-right: 14px !important;
}
.echart {
  margin-left: 38%;
  padding-top: 22px;
}
</style>
