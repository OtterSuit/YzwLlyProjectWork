<template>
  <div class="completed-contaniner">
    <!-- 头部 -->
    <myfilters
      title="已完成"
      :content="content"
      :choose-date="true"
      :choose-cleaning-box="true"
      :choose-cleaning-equipment="true"
      placeholder="回收人/清洗人"
      :search-content="true"
      @contentChange="contentChange"
      @dateChange="dateChange"
      @cleaningBoxChange="cleaningBoxChange"
      @cleaningEquipmentChange="cleaningEquipmentChange"
    />
    <!-- 头部 end -->
    <!-- table -->
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column label="编号" prop="id" />
      <el-table-column label="清洗框/架">
        <template slot-scope="scope">
          {{ scope.row.cleanboxName }}
          <div class="second-row">{{ scope.row.cleanboxNum }}</div>
        </template>
      </el-table-column>
      <el-table-column label="回收人/时间">
        <template slot-scope="scope">
          {{ scope.row.createUser }}
          <div class="second-row">{{ scope.row.createTime }}</div>
        </template>
      </el-table-column>
      <el-table-column label="清洗人/时间">
        <template slot-scope="scope">
          {{ scope.row.cleanUser }}
          <div class="second-row">{{ scope.row.cleanStartTime }}</div>
        </template>
      </el-table-column>
      <el-table-column label="清洗设备">
        <template slot-scope="scope">
          {{ CLEAN_POT[scope.row.cleanEquipmentId] }}
        </template>
      </el-table-column>
      <el-table-column label="清洗程序">
        <template slot-scope="scope">
          {{ CLEAN_PROGRAM[scope.row.cleanProgramId] }}
        </template>
      </el-table-column>
      <el-table-column prop="batchNoDay" label="清洗批次" />
      <el-table-column align="right">
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
    <my-pagination :total="totalCount" methods="getCleanTask" :conditions="conditions" :records="['data','page','records']" />
    <!-- 弹窗 -->
    <el-dialog v-el-drag-dialog title="详细参数" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-table :data="row.detail" style="width: 95%" class="hidden-table">
          <el-table-column prop="detailTime" label="时间" />
          <el-table-column prop="temperature" label="温度" />
          <el-table-column prop="proportion" label="比例" />
          <el-table-column prop="AO" label="A0" />
        </el-table>
        <el-scrollbar style="height: 400px">
          <el-form ref="form" :model="form" class="scrollbar-form">
            <el-row v-for="(item,index) in form.entity" :key="index" type="flex" :gutter="5">
              <el-col :span="7">
                <el-form-item
                  :prop="'entity.'+index+'.detailTime'"
                  :rules="[
                    { required: true, message: '请输入时间', trigger: 'blur' }
                  ]"
                >
                  <el-input v-model="item.detailTime" placeholder="请输入时间" />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item
                  :prop="'entity.'+index+'.temperature'"
                  :rules="[
                    { required: true, message: '请输入温度', trigger: 'blur' }
                  ]"
                >
                  <el-input v-model="item.temperature" placeholder="请输入温度" />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item
                  :prop="'entity.'+index+'.proportion'"
                  :rules="[
                    { required: true, message: '请输入比例', trigger: 'blur' }
                  ]"
                >
                  <el-input v-model="item.proportion" placeholder="请输入比例" />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item
                  :prop="'entity.'+index+'.ao'"
                  :rules="[
                    { required: true, message: '请输入A0', trigger: 'blur' }
                  ]"
                >
                  <el-input v-model="item.ao" placeholder="请输入A0" />
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <i class="el-icon-circle-plus-outline dialog-icon" @click="addItem" />
              </el-col>
              <el-col :span="1">
                <i v-show="index!==0" class="el-icon-delete dialog-icon" @click="deleteItem(item,index)" />
              </el-col>
            </el-row>
          </el-form>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show=false">取消</el-button>
        <el-button type="primary" @click="addSubmit">保存</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗end -->
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import myPagination from '@/components/MyPagination'
import api from '@/api'

export default {
  components: {
    myfilters, myPagination
  },
  data() {
    return {
      listLoading: false,
      CLEAN_PROGRAM: null,
      CLEAN_POT: null,
      tableData: [],
      show: false,
      form: {},
      row: [],
      totalCount: 0,
      conditions: {
        statuses: [3, 4],
        cleanboxId: null,
        cleanStartTimeOneDay: null,
        keyword: null
      }
    }
  },
  computed: {
    // 计算tableData有几条数据
    content() {
      return '共' + this.totalCount + '条数据'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      this.listLoading = true
      api.getCleanTask(this.conditions).then(response => {
        console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.ssd_clean_task_status = response.data.dictData.ssd_clean_task_status
          this.tableData = response.data.page.records
          this.totalCount = response.data.page.totalCount
          this.listLoading = false
        }
      })
      api.toconstanttypeBatch({
        constantCodes: [
          'CLEAN_PROGRAM',
          'CLEAN_POT'
        ]
      }).then(response => {
        this.CLEAN_PROGRAM = response.data.constantsDetail.CLEAN_PROGRAM
        this.CLEAN_POT = response.data.constantsDetail.CLEAN_POT
      })
    },
    // 表格右侧详细参数按钮
    handleShow(index, row) {
      this.row = row
      api.getCleanDetailPage({ cleanSubTaskId: row.id }).then(response => {
        console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          if (response.data.records.length === 0) {
            this.form = {
              entity: [{
                cleanSubTaskId: row.id
                // ao: null,
                // detailTime: null,
                // proportion: null,
                // temperature: null
              }]
            }
          } else {
            this.$set(this.form, 'entity', response.data.records)
          }
          this.show = true
        }
      })
    },
    // 弹窗内添加器械名字右侧+添加按钮
    addItem() {
      this.form.entity.push({
        cleanSubTaskId: this.row.id,
        detailTime: null,
        temperature: null,
        proportion: null,
        ao: null
      })
    },
    // 弹窗内添加器械名字右侧删除按钮
    deleteItem(item, index) {
      this.form.entity.splice(index, 1)
    },
    addSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          api.toCleanDetail(this.form.entity).then(response => {
            console.log(response)
            if (response.code === '200' && response.data.busiCode === '1') {
              this.$message({
                type: 'success',
                message: '保存成功'
              })
              this.show = false
            }
          })
        }
      })
    },
    // 输入框改变
    contentChange(content) {
      this.$set(this.conditions, 'keyword', content)
      this.selectChange()
    },
    // 时间改变
    dateChange(date) {
      this.$set(this.conditions, 'cleanStartTimeOneDay', date)
      this.selectChange()
    },
    // 清洗框改变
    cleaningBoxChange(cleaningBox) {
      this.$set(this.conditions, 'cleanboxId', cleaningBox)
      this.selectChange()
    },
    // 清洗设备改变
    cleaningEquipmentChange(cleaningEquipment) {
      this.$set(this.conditions, 'cleanEquipmentId', cleaningEquipment)
      this.selectChange()
    },
    selectChange() {
      this.$set(this.conditions, 'pageNo', 1)
      this.listLoading = true
      api.getCleanTask(this.conditions).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          this.tableData = response.data.page.records
          this.totalCount = response.data.page.totalCount
          this.listLoading = false
        }
      })
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.completed-contaniner {
  padding: 30px;
  min-height: calc(100vh - 50px);
}
.second-row {
  color: #999;
}
.dialog-main {
 padding: 30px 30px 50px;
}
.dialog-icon {
  font-size: 16px;
  line-height: 40px;
  color: #999;
  cursor: pointer;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
::v-deep .scrollbar-form{
      padding: 29px 3px 15px;
}
</style>
