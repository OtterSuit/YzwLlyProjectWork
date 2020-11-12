<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="缺损记录"
      :content="content"
      :choose-date="true"
      :choose-department="true"
      :choose-status="true"
      format="yyyy.MM.dd"
      placeholder="包名称/唯一码"
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
      <el-table-column prop="department" label="科室" />
      <el-table-column label="任务/单号">
        <template slot-scope="scope">
          {{ scope.row.taskCategories }}<br>
          <span class="second-row">{{ scope.row.orderNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="包名称/唯一码">
        <template slot-scope="scope">
          {{ scope.row.package }}<br>
          <span class="second-row">{{ scope.row.onlyCode }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="missing" label="缺失" />
      <el-table-column prop="damage" label="损坏" />
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
          recoverPerson: '赵美丽',
          recoverTime: '2020.08.10 09:52:38',
          package: '膀胱镜包',
          onlyCode: '100009877',
          missing: 1,
          damage: 0
        },
        {
          department: '手术室',
          taskCategories: '回收申请单',
          orderNum: '22341168',
          recoverPerson: '赵美丽',
          recoverTime: '2020.08.10 09:52:38',
          package: '气管切开包',
          onlyCode: '100009179',
          missing: 1,
          damage: 2
        },
        {
          department: '口腔室',
          taskCategories: '还物申请单',
          orderNum: '45793491',
          recoverPerson: '赵美丽',
          recoverTime: '2020.08.10 09:51:29',
          package: '清缝手术治疗包',
          onlyCode: '100004561',
          missing: 0,
          damage: 2
        }
      ]
      // show: false
      // row: []
    }
  },
  computed: {
    // 计算tableData有几条数据
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  methods: {
    // 表格查看按钮
    handleShow(index, row) {
      this.$router.push({
        path: '/recover/defect/particulars'
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
</style>
