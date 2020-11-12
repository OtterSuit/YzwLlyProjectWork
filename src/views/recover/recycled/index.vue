<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="已回收"
      :content="content"
      :choose-date="true"
      :choose-department="true"
      :choose-status="true"
      format="yyyy.MM.dd"
      placeholder="单号/申请人/送货人/回收人"
      :search-content="true"
      @contentChange="contentChange"
      @dateChange="dateChange"
      @statusChange="typeChange"
      @departmentChange="departmentChange"
    />
    <!-- 头部 end -->
    <!-- table -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column prop="department" label="申请科室" />
      <el-table-column label="任务类别">
        <template slot-scope="scope">
          {{ scope.row.taskCategories }}
          <el-tooltip v-if="scope.row.defect&&scope.row.defect.length!==0" class="item" effect="light" placement="bottom">
            <div slot="content">
              <div v-for="item in scope.row.defect" :key="item.package" class="tooltip-content">
                <span class="tooltip-title">{{ item.package }}</span>
                <span v-if="item.missing!==0" class="tooltip-text">缺失{{ item.missing }}件</span>
                <span v-if="item.damage!==0" class="tooltip-text">损坏{{ item.damage }}件</span>
              </div>
            </div>
            <i class="el-icon-warning" style="color:#F9944A" />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="orderNum" label="单号" />
      <el-table-column prop="packageNum" label="包数量" />
      <el-table-column label="申请人/时间" width="170">
        <template slot-scope="scope">
          {{ scope.row.applyPerson }}<br>
          <span class="second-row">{{ scope.row.applyTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="送货人/时间" width="170">
        <template slot-scope="scope">
          {{ scope.row.deliveryPerson }}<br>
          <span class="second-row">{{ scope.row.deliveryTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="回收人/时间" width="170">
        <template slot-scope="scope">
          {{ scope.row.recoverPerson }}<br>
          <span class="second-row">{{ scope.row.recoverTime }}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            slot="reference"
            size="mini"
            icon="el-icon-tickets"
            @click="handleShow(scope.$index, scope.row)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <!-- 弹窗 -->
    <!-- <el-dialog v-el-drag-dialog title="详细参数" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-table :data="row" style="width: 100%">
          <el-table-column prop="time" label="时间" />
          <el-table-column prop="temperature" label="温度" />
          <el-table-column prop="proportion" label="比例" />
          <el-table-column prop="AO" label="AO" />
        </el-table>
      </div>
    </el-dialog> -->
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
          department: '手术室',
          taskCategories: '回收申请单',
          orderNum: '22341168',
          packageNum: 4,
          applyPerson: '赵美玲',
          applyTime: '2020.08.10 09:45:32',
          deliveryPerson: '张海东',
          deliveryTime: '2020.08.10 09:45:32',
          recoverPerson: '赵美丽',
          recoverTime: '2020.08.10 09:52:38',
          defect: [
            {
              package: '膀胱镜包',
              missing: 1,
              damage: 0
            },
            {
              package: '气管切开包',
              missing: 1,
              damage: 2
            }
          ]
        },
        {
          department: '口腔室',
          taskCategories: '还物申请单',
          orderNum: '45793491',
          packageNum: 3,
          applyPerson: '陈艳华',
          applyTime: '2020.08.10 09:43:37',
          deliveryPerson: '张海东',
          deliveryTime: '2020.08.10 09:45:24',
          recoverPerson: '赵美丽',
          recoverTime: '2020.08.10 09:51:29'
        },
        {
          department: '儿二科',
          taskCategories: '退货申请单',
          orderNum: '44310012',
          packageNum: 2,
          applyPerson: '张春兰',
          applyTime: '2020.08.10 09:42:52',
          deliveryPerson: '张海东',
          deliveryTime: '2020.08.10 09:45:16',
          recoverPerson: '赵美丽',
          recoverTime: '2020.08.10 09:49:12'
        }
      ]
      // show: false
      // row: []
    }
  },
  computed: {
    // 计算tableData有几条数据
    content() {
      let length = 0
      this.tableData.forEach(i => {
        length += i.packageNum
      })
      return '共回收' + this.tableData.length + '项任务，' + length + '个器械包'
    }
  },
  methods: {
    // 表格查看按钮
    handleShow(index, row) {
      this.$router.push({
        path: '/recover/recycled/particulars'
        // params: { id: index }
      })
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
.dialog-main {
 padding: 30px 30px 50px;
}
.tooltip-content {
  height:24px;
  font-size:12px;
  color:rgba(102,102,102,1);
  line-height:24px;
  .tooltip-text {
    margin-right: 25px;
  }
  .tooltip-title {
    display: inline-block;
    width: 110px;
  }
}
</style>
