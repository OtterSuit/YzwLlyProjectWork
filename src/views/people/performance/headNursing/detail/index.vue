<template>
  <div style="padding:30px">
    <myfilters
      key="top"
      :title="title"
      content="护士长工作质量考核"
      :back-button="true"
    />
    <el-table
      :data="[row]"
      style="width: 100%;margin-bottom:40px"
    >
      <el-table-column
        prop="month"
        label="月份"
      />
      <el-table-column
        prop="name"
        label="姓名"
      />
      <el-table-column
        prop="ward"
        label="科室病区"
      />
      <el-table-column
        prop="score"
        label="分值"
      />
      <el-table-column
        prop="evaluator"
        label="评核人"
      />
    </el-table>
    <myfilters
      key="middle"
      title="考核内容详细"
      :addifo="edit?'保存':'编辑'"
      :add-button="true"
      @addClick="editClick"
    />
    <el-table
      :data="tableData"
      style="width: 100%"
      :cell-style="tableStyle"
      :span-method="spanMethod"
      :header-cell-style="tableStyle"
      border
    >
      <el-table-column
        label="序号"
        type="index"
        width="50"
      />
      <el-table-column
        prop="project"
        label="项目"
      />
      <el-table-column
        prop="content"
        label="分项内容"
      />
      <el-table-column
        prop="reference"
        label="参考评分"
      />
      <el-table-column label="评分">
        <template slot-scope="scope">
          <span v-show="!edit">{{ score[scope.$index] }}</span>
          <el-input v-show="edit" v-model="score[scope.$index]" placeholder="请评分" />
        </template>
      </el-table-column>
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
      row: {
        month: '7月',
        name: '李丽丽（护士长）',
        ward: '呼吸内科 一病区',
        score: '112',
        evaluator: '李春兰 （护理部 主任）'
      },
      edit: false,
      score: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 2, 2, 4, 1],
      tableData: [
        {
          project: '工作完成内容',
          content: '工作目标明确，计划安排合理',
          reference: 5
        },
        {
          project: '',
          content: '按时完成护理部布置的各项工作',
          reference: 5
        },
        {
          project: '',
          content: '上报材料及时，到会及时',
          reference: 5
        },
        {
          project: '',
          content: '及时填写并上报护士长工作月报表',
          reference: 5
        },
        {
          project: '',
          content: '节假日参与病房值班',
          reference: 5
        },
        {
          project: '学习培训',
          content: '参加院里组织的各项培训',
          reference: 5
        },
        {
          project: '继续教育',
          content: '继续教育学分达标',
          reference: 5
        },
        {
          project: '',
          content: '按计划完成业务学习计划（每月二次），并有原始记录',
          reference: 5
        },
        {
          project: '护理查房',
          content: '按计划完成护理查房（每月二次），并有记录',
          reference: 5
        },
        {
          project: '病房管理',
          content: '达到病房管理质量标准',
          reference: 5
        },
        {
          project: '护理质量达标',
          content: '基础护理合格率达到90%',
          reference: 5
        },
        {
          project: '',
          content: '危重病人护理合格率达到90%',
          reference: 5
        },
        {
          project: '',
          content: '护理文件书写合格率达到95%',
          reference: 5
        },
        {
          project: '',
          content: '急救物品合格率达到100%',
          reference: 5
        },
        {
          project: '病人护理',
          content: '检查各项护理工作的落实，每周一次',
          reference: 5
        },
        {
          project: '',
          content: '每天查看病人一次，全面掌握重点病人护理工作的执行情况',
          reference: 5
        },
        {
          project: '',
          content: '组织并参加床头交接班',
          reference: 5
        },
        {
          project: '',
          content: '积极组织并参加重患抢救',
          reference: 5
        },
        {
          project: '护理差错',
          content: '严格执行各项规章制度，无护理差错',
          reference: 5
        },
        {
          project: '护理投诉',
          content: '无护理投诉',
          reference: 5
        },
        {
          project: '加分项目',
          content: '以科室为单位，在核心期刊上发表论文，每篇论文加1分',
          reference: 0
        },
        {
          project: '',
          content: '以科室为单位，中标课题（不含指导性课题），每项加2分',
          reference: 0
        },
        {
          project: '',
          content: '以科室为单位，获奖（学校或卫生厅）护理新技术，每项加2分',
          reference: 0
        },
        {
          project: '',
          content: '全年承担理论教学累计8学时以上，每2学时加1分',
          reference: 0
        },
        {
          project: '',
          content: '以科室为单位，每封表扬信加0.5分',
          reference: 0
        }
      ]
    }
  },
  computed: {
    title() {
      return '2020年' + this.row.month
    }
  },
  methods: {
    tableStyle() {
      return {
        textAlign: 'center',
        height: '55.4px'
      }
    },
    editClick() {
      if (this.edit) {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      }
      this.edit = !this.edit
    },
    spanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if (rowIndex === 0) {
          return [5, 1]
        } else if (rowIndex === 5) {
          return [1, 1]
        } else if (rowIndex === 6) {
          return [2, 1]
        } else if (rowIndex === 8) {
          return [1, 1]
        } else if (rowIndex === 9) {
          return [1, 1]
        } else if (rowIndex === 10) {
          return [4, 1]
        } else if (rowIndex === 14) {
          return [4, 1]
        } else if (rowIndex === 18) {
          return [1, 1]
        } else if (rowIndex === 19) {
          return [1, 1]
        } else if (rowIndex === 20) {
          return [5, 1]
        } else {
          return [0, 0]
        }
      }
    }
  }
}

</script>

<style lang="scss" type="text/scss" scoped>
::v-deep .el-input__inner {
  height: 30px;
}
</style>
