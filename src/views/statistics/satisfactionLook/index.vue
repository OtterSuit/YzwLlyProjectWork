<template>
  <div style="padding:30px">
    <myfilters
      :choose-department="true"
      title="科室满意度调查统计"
      content="本年度按月统计"
      :options="options"
      @departmentChange="departmentChange($event)"
    />
    <m-bar
      style="margin-top:10px"
      :echart-style="style"
      :opinion-data="info"
      :opinion="info"
      formatter="{a} <br/>{b} : {c}%"
      :x="barX"
      :y="y"
    />
    <el-table
      :data="info"
      style="width: 100%;margin-top:10px"
      :cell-style="tableStyle"
      :header-cell-style="tableStyle"
      border
    >
      <el-table-column
        prop="name"
        label="满意度"
      />
      <el-table-column label="比例">
        <el-table-column
          v-for="(item,index) in barX"
          :key="item"
          :label="item"
        >
          <template slot-scope="scope">
            {{ info[scope.$index].data[index] }}%
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import myfilters from '@/components/myfilters'
import mBar from '@/components/echart/bar'
export default {
  components: {
    mBar, myfilters
  },
  data() {
    return {
      // title: '质量指标统计表',
      // addifo: '添加信息',
      // chooseDepartment: false,
      // chooseDate: false,
      // searchName: false,
      style: {
        height: '300px',
        width: '100%'
      },
      y: {
        type: 'value',
        minInterval: 5,
        min: 90,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          color: 'rgba(0,0,0,0.45)',
          formatter: '{value} %'
        }
      },
      barX: ['2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-07'],
      info: [
        {
          name: '患者对护士',
          type: 'bar',
          data: [94, 96, 95, 92, 98, 99, 96]
        },
        {
          name: '患者对医生',
          type: 'bar',
          data: [97, 93, 92, 98, 99, 99, 97]
        },
        {
          name: '患者对科室',
          type: 'bar',
          data: [98, 98, 96, 97, 94, 95, 96]
        }
      ],
      options: [
        {
          value: '内科',
          label: '内科'
        },
        {
          value: '儿科',
          label: '儿科'
        },
        {
          value: '妇科',
          label: '妇科'
        },
        {
          value: '耳鼻咽喉科',
          label: '耳鼻咽喉科'
        },
        {
          value: '男科',
          label: '男科'
        },
        {
          value: '外科',
          label: '外科'
        }
      ]
    }
  },
  methods: {
    tableStyle() {
      return {
        textAlign: 'center'
      }
    },
    departmentChange(department) {
      console.log(department)
    }
  }
}
</script>
<style lang="scss"  scoped>
// ::v-deep .el-input__inner {
//   width: 220px;
// }
</style>

