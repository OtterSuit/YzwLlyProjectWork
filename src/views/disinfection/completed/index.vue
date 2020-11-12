<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="已完成"
      :content="content"
      :choose-date="true"
      :choose-cleaning-box="true"
      :choose-cleaning-equipment="true"
      format="yyyy.MM.dd"
      placeholder="回收人/清洗人"
      :search-content="true"
      @contentChange="contentChange"
      @dateChange="dateChange"
      @cleaningBoxChange="cleaningBoxChange"
      @cleaningEquipmentChange="cleaningEquipmentChange"
    />
    <!-- 头部 end -->
    <!-- table -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column label="清洗框/架">
        <template slot-scope="scope">
          {{ scope.row.cleaningBox }}<br>
          <span class="second-row">{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="回收人/时间">
        <template slot-scope="scope">
          {{ scope.row.recoverPerson }}<br>
          <span class="second-row">{{ scope.row.recoverTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="清洗人/时间">
        <template slot-scope="scope">
          {{ scope.row.cleanPerson }}<br>
          <span class="second-row">{{ scope.row.cleanTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cleaningEquipment" label="清洗设备" />
      <el-table-column prop="cleaningProgram" label="清洗程序" />
      <el-table-column prop="cleaningBatch" label="清洗批次" />
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            slot="reference"
            size="mini"
            icon="el-icon-tickets"
            @click="handleShow(scope.$index, scope.row)"
          >详细参数</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <!-- 弹窗 -->
    <el-dialog v-el-drag-dialog title="详细参数" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-table :data="row" style="width: 100%">
          <el-table-column prop="time" label="时间" />
          <el-table-column prop="temperature" label="温度" />
          <el-table-column prop="proportion" label="比例" />
          <el-table-column prop="AO" label="AO" />
        </el-table>
      </div>
    </el-dialog>
    <!-- 弹窗end -->
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
          cleaningBox: '架01',
          code: 'MJJ001',
          recoverPerson: '赵美丽',
          recoverTime: '2020.08.10 09:45:32',
          cleanPerson: '赵美丽',
          cleanTime: '2020.08.10 09:45:32',
          cleaningEquipment: '清洗机01',
          cleaningProgram: '清洗程序112',
          cleaningBatch: 'A012',
          detail: [
            {
              time: '2020-01-01 18:02:03',
              temperature: '90℃',
              proportion: '1:1',
              AO: '600'
            },
            {
              time: '2020-01-01 18:01:01',
              temperature: '80℃',
              proportion: '1:1',
              AO: '800'
            }
          ]
        },
        {
          cleaningBox: '架02',
          code: 'MJJ002',
          recoverPerson: '赵美丽',
          recoverTime: '2020.08.10 09:45:32',
          cleanPerson: '赵美丽',
          cleanTime: '2020.08.10 09:45:32',
          cleaningEquipment: '清洗机01',
          cleaningProgram: '清洗程序112',
          cleaningBatch: 'A013',
          detail: [
            {
              time: '2020-01-01 18:02:03',
              temperature: '90℃',
              proportion: '1:1',
              AO: '600'
            },
            {
              time: '2020-01-01 18:01:01',
              temperature: '80℃',
              proportion: '1:1',
              AO: '800'
            }
          ]
        }
      ],
      show: false,
      row: []
    }
  },
  computed: {
    // 计算tableData有几条数据
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  methods: {
    // 表格右侧详细参数按钮
    handleShow(index, row) {
      this.row = row.detail
      this.show = true
    },
    // 输入框改变
    contentChange(content) {
      console.log(content)
    },
    // 时间改变
    dateChange(date) {
      console.log(date)
    },
    // 清洗框改变
    cleaningBoxChange(cleaningBox) {
      console.log(cleaningBox)
    },
    // 清洗设备改变
    cleaningEquipmentChange(cleaningEquipment) {
      console.log(cleaningEquipment)
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.second-row {
  color: #999;
}
.dialog-main {
 padding: 30px 30px 50px;
}
</style>
