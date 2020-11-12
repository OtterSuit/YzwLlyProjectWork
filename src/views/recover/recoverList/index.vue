<template>
  <div>
    <div class="table" style="padding:30px">
      <myfilters
        title="回收任务"
        :content="content"
        :choose-date="true"
        :choose-department="true"
        :choose-status="true"
        format="yyyy.MM.dd"
        placeholder="单号/申请人"
        :search-content="true"
        @contentChange="contentChange"
        @dateChange="dateChange"
        @statusChange="typeChange"
        @departmentChange="departmentChange"
      />
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          type="index"
          width="100"
        />
        <el-table-column
          label="申请科室"
          prop="department"
        />
        <el-table-column
          label="任务类别"
          prop="taskCategory"
        />
        <el-table-column
          label="单号"
          prop="number"
        />
        <el-table-column
          label="包数量"
          prop="packageNum"
        />
        <el-table-column label="申请人/时间" width="170">
          <template slot-scope="scope">
            {{ scope.row.applyPerson }}<br>
            <span class="second-row">{{ scope.row.applyTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="当前状态"
        >
          <template slot-scope="scope">
            {{ scope.row.person }}【{{ state(scope.row.state) }}】<br>
            <span class="second-row">{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              style="margin-right:5px"
              @click="handleDetails(scope.$index, scope.row, 'pbox')"
            >
              <i class="el-icon-tickets" /> 查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
          department: '手术室',
          taskCategory: '回收申请单',
          number: '223412',
          packageNum: '3',
          applyPerson: '赵美玲',
          applyTime: '2020.08.10 09:45:32',
          state: '1',
          person: '赵美丽',
          time: '2020.08.10 09:45:32'
        },
        {
          department: '口腔室',
          taskCategory: '还物申请单',
          number: '213412',
          packageNum: '5',
          applyPerson: '陈艳华',
          applyTime: '2020.08.10 09:43:37',
          state: '2',
          person: '张海东',
          time: '2020.08.10 09:45:24'
        },
        {
          department: '儿二科',
          taskCategory: '退货申请单',
          number: '251412',
          packageNum: '3',
          applyPerson: '张春兰',
          applyTime: '2020.08.10 09:42:52',
          state: '2',
          person: '张海东',
          time: '2020.08.10 09:45:16'
        }
      ]
    }
  },
  computed: {
    // 计算tableData有几条数据
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  methods: {
    handleDetails(index, row) {
      this.$router.push({
        path: '/recover/recoverList/particulars'
        // params: { id: index }
      })
    },
    // 状态标签文字
    state(state) {
      const stateMap = {
        '1': '已签收',
        '2': '正在送货'
      }
      return stateMap[state]
    },
    // 输入框改变
    contentChange(content) {
      console.log(content)
    },
    // 时间改变
    dateChange(date) {
      console.log(date)
    },
    // 类别改变
    typeChange(type) {
      console.log(type)
    },
    // 科室改变
    departmentChange(depart) {
      console.log(depart)
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.second-row {
  color: #999;
}
</style>
