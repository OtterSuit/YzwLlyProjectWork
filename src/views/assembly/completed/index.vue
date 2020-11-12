<template>
  <div style="padding:30px">
    <!-- header -->
    <myfilters
      title="已完成"
      :content="content"
      :choose-cleaning-box="true"
      :choose-cleaning-equipment="true"
      :search-content="true"
      placeholder="清洗人"
      :choose-date="true"
      @cleaningBoxChange="cleaningBoxChange"
      @cleaningEquipmentChange="cleaningEquipmentChange"
      @contentChange="contentChange"
    />
    <!-- header end -->
    <!-- table -->
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="序号"
        type="index"
        width="100"
      />
      <el-table-column label="单号" prop="number" />
      <el-table-column label="清洗框/架">
        <template slot-scope="scope">
          <div>
            {{ scope.row.cleaningFrame }} <br>
            <span class="second-row">
              {{ scope.row.cleaningBox }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="清洗人/时间">
        <template slot-scope="scope">
          <div>
            {{ scope.row.cleaner }} <br>
            <span class="second-row">
              {{ scope.row.cleaningTime }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="检查者/时间">
        <template slot-scope="scope">
          <div>
            {{ scope.row.checker }}
            <br>
            <span class="second-row">{{ scope.row.checkTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleShow(scope.$index, scope.row)"
          > <i class="el-icon-tickets" /> 查看详细
          </el-button>
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
      // table data
      tableData: [{
        number: '0033124',
        cleaningFrame: '架02',
        cleaningBox: 'MJJ002',
        cleaner: '赵美丽',
        cleaningTime: '2020.08.10 09:45:32',
        checker: '赵美丽',
        checkTime: '2020.08.10 09.45.12'
      }]
    }
  },
  computed: {
    // table data length
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  methods: {
    // 查看详细
    handleShow(index, row) {
      this.$router.push({ path: '/assembly/completed/record' })
      // this.row = row.detail
      // this.show = true
    },
    // 清洗框/架选择改变
    cleaningBoxChange(box) {
      console.log(box)
    },
    // 清洗设备选择改变
    cleaningEquipmentChange(equ) {
      console.log(equ)
    },
    // 输入框输入改变
    contentChange(content) {
      console.log(content)
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.search-button {
  width: 100%;
}
.filter {
  font-size: 12px;
  position: absolute;
  top: 4px;
  left: 80px;
  span {
    display: inline-block;
  }
  .label {
    color:rgba(158,174,195,1);
  }
  .content {
    color: #666;
    margin-right: 10px;
  }
}
.second-row {
  color: #999;
}
</style>
