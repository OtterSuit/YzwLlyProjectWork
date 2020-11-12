<template>
  <div style="padding:30px">
    <!-- header -->
    <myfilters
      title="任务列表"
      :content="content"
      :search-content="true"
      :choose-date="true"
      add-icon="el-icon-printer"
      placeholder="装载人/灭菌人"
      @contentChange="contentChange"
      @dateChange="dateChange"
    >
      <template slot="header-extent">
        <el-select v-model="equipment" placeholder="请选择灭菌设备" @change="equipmentChange(equipment)">
          <el-option
            v-for="item in equipmentOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
    </myfilters>
    <!-- header end -->
    <!-- table -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100px" />
      <el-table-column label="灭菌设备" prop="equipment" width="250px" />
      <el-table-column label="包数量" prop="count" width="150px" />
      <el-table-column label="灭菌人/时间">
        <template slot-scope="scope">
          <div>
            {{ scope.row.antisepsisPerson }}
            <br>
            <span class="second-row">{{ scope.row.sterilization }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="灭菌程序" prop="program" />
      <el-table-column label="炉次" prop="furnaceTime" />
      <el-table-column label="灭菌质量" prop="quality">
        <template slot-scope="scope">
          <div :class="stateColor(scope.row.state)">
            {{ state(scope.row.quality) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-tickets"
            size="mini"
            style="margin-right:5px"
            @click="handleShow(scope.$index, scope.row)"
          >查看详细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
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
      equipment: '请选择灭菌设备',
      row: [],
      // table data
      tableData: [
        {
          equipment: '灭菌设备012',
          count: 20,
          antisepsisPerson: '赵美丽',
          sterilizationTime: '2020.08.10 09:45:32',
          program: 'B-D',
          furnaceTime: 9,
          quality: '1'
        },
        {
          equipment: '灭菌设备012',
          count: 20,
          antisepsisPerson: '赵美丽',
          sterilizationTime: '2020.08.10 09:45:32',
          program: 'B-D',
          furnaceTime: 12,
          quality: '1'
        }
      ],
      // 设备选择选项
      equipmentOptions: [
        {
          value: '灭菌设备010',
          label: '灭菌设备010'
        },
        {
          value: '灭菌设备011',
          label: '灭菌设备011'
        },
        {
          value: '灭菌设备012',
          label: '灭菌设备012'
        },
        {
          value: '灭菌设备015',
          label: '灭菌设备015'
        },
        {
          value: '灭菌设备021',
          label: '灭菌设备021'
        },
        {
          value: '灭菌设备026',
          label: '灭菌设备026'
        },
        {
          value: '灭菌设备031',
          label: '灭菌设备031'
        }
      ]
    }
  },
  computed: {
    // table data length
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  methods: {
    // 状态标签文字
    state(state) {
      const stateMap = {
        '1': '合格',
        '2': '不合格'
      }
      return stateMap[state]
    },
    // 状态标签图标
    stateColor(state) {
      const stateMap = {
        '1': 'base-color',
        '2': 'warning-color'
      }
      return stateMap[state]
    },
    // 查看详细按钮点击
    handleShow(index, row) {
      this.$router.push({ name: 'historyDetail' })
    },
    // 设备选择改变
    equipmentChange(equipment) {
      console.log(equipment)
    },
    // 输入框输入改变
    contentChange(content) {
      console.log(content)
    },
    // 日期选择改变
    dateChange(date) {
      console.log(date)
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .hidden-table .el-table__body-wrapper {
  display: none;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
