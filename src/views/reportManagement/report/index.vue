<template>
  <div style="padding:30px">
    <!-- 添加表格上方过滤条件 -->
    <myfilters
      title="上报记录"
      :choose-date="true"
      :choose-department="true"
      date-type="month"
      @dateChange="dateChange($event)"
    />
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="tableStyle"
      border
    >
      <el-table-column
        prop="date"
        label="发生时间"
        width="100"
      />
      <el-table-column
        prop="ward"
        label="病区"
        width="150"
      />
      <el-table-column
        prop="name"
        label="病人姓名"
      />
      <el-table-column
        prop="hospitalNum"
        label="住院号"
      />
      <el-table-column
        prop="type[0]"
        label="事件类别"
      />
      <el-table-column
        prop="course"
        label="事件经过"
        width="300"
      />
      <el-table-column
        prop="affect"
        label="造成的影响"
        width="100"
      />
      <el-table-column
        prop="process"
        label="处理情况"
        width="200"
      />
      <el-table-column
        prop="provision"
        label="预防措施"
        width="200"
      />
    </el-table>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
export default {
  components: {
    myfilters
  },
  data() {
    return {
      tableData: [
        {
          ward: '呼吸内科一病区',
          num: '123',
          hospital: '中三三院',
          nursing: '内科护理部',
          date: '2020-06-30',
          department: '内科',
          system: '内科',
          system1: '内科',
          branch: '内科',
          name: '袁丽',
          gender: '男',
          age: '68',
          bedNum: '00000',
          hospitalNum: '66666',
          level: '护士（初级）',
          year: '2',
          shift: 'A班',
          remarks: '',
          finder: '本人',
          type: ['不良治疗', '给药错误'],
          grade: 'I级',
          course: '由于感冒发热，温度达到40度收入，体征正常，有慢性肺炎，初步诊断为慢性肺结核导致的发烧感冒',
          affect: '严重级3级',
          process: '阿莫西林，肺热清剂，罗汉果茶，三黄连口服容液',
          provision: '体征检查都正常，普食，无过敏'
        },
        {
          ward: '呼吸内科二病区',
          num: '123',
          hospital: '中三三院',
          nursing: '内科护理部',
          date: '2020-06-30',
          department: '内科',
          system: '内科',
          system1: '内科',
          branch: '内科',
          name: '胡丽',
          gender: '男',
          age: '68',
          bedNum: '11111',
          hospitalNum: '22222',
          level: '护士（初级）',
          year: '2',
          shift: 'A班',
          remarks: '',
          finder: '本人',
          type: ['不良治疗', '给药错误'],
          grade: 'I级',
          course: '由于感冒发热，温度达到40度收入，体征正常，有慢性肺炎，初步诊断为慢性肺结核导致的发烧感冒',
          affect: '严重级3级',
          process: '阿莫西林，肺热清剂，罗汉果茶，三黄连口服容液',
          provision: '体征检查都正常，普食，无过敏'
        },
        {
          ward: '呼吸内科三病区',
          num: '123',
          hospital: '中三三院',
          nursing: '内科护理部',
          date: '2020-06-30',
          department: '内科',
          system: '内科',
          system1: '内科',
          branch: '内科',
          name: '许静',
          gender: '男',
          age: '68',
          bedNum: '33333',
          hospitalNum: '44444',
          level: '护士（初级）',
          year: '2',
          shift: 'A班',
          remarks: '',
          finder: '本人',
          type: ['不良治疗', '给药错误'],
          grade: 'I级',
          course: '由于感冒发热，温度达到40度收入，体征正常，有慢性肺炎，初步诊断为慢性肺结核导致的发烧感冒',
          affect: '严重级3级',
          process: '阿莫西林，肺热清剂，罗汉果茶，三黄连口服容液',
          provision: '体征检查都正常，普食，无过敏'
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
    dateChange(date) {
      console.log(date)
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
</style>
