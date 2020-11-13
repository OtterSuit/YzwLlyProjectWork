<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="维修/报废"
      :content="content"
      :choose-date="true"
      :choose-cleaning-box="true"
      addifo="添加记录"
      add-icon="el-icon-plus"
      :add-button="true"
      placeholder="清洗人"
      :search-content="true"
      @addClick="addClick"
      @contentChange="contentChange"
      @dateChange="dateChange"
      @cleaningBoxChange="cleaningBoxChange"
    />
    <!-- 头部end -->
    <!-- table -->
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item v-if="props.row.maintainCount!=='0'" label="维修">
              <span v-for="item in props.row.supplies" :key="item.suppliesName">
                <span v-if="item.errorType==='1'" class="expand-span">{{ item.suppliesName }}x{{ item.errorCount }}</span>
              </span>
            </el-form-item>
            <el-form-item v-if="props.row.scrapCount!=='0'" label="报废">
              <span v-for="item in props.row.supplies" :key="item.suppliesName">
                <span v-if="item.errorType==='2'" class="expand-span">{{ item.suppliesName }}x{{ item.errorCount }}</span>
              </span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column label="编号" prop="cleanSubTaskId" />
      <el-table-column label="清洗框/架">
        <template slot-scope="scope">
          {{ scope.row.cleanboxName }}<br>
          <span class="second-row">{{ scope.row.cleanboxCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="清洗人/时间">
        <template slot-scope="scope">
          {{ scope.row.cleanSubTaskLastUser }}<br>
          <span class="second-row">{{ scope.row.cleanSubTaskLastTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="维修" prop="maintainCount" />
      <el-table-column label="报废" prop="scrapCount" />
    </el-table>
    <!-- table end -->
    <my-pagination :total="totalCount" methods="getCleanErrorPage" :conditions="conditions" :records="['data','page','records']" />
    <!-- 弹窗 -->
    <el-dialog v-el-drag-dialog title="添加记录" :visible.sync="show" width="1000px">
      <div class="dialog-main">
        <el-scrollbar>
          <el-form ref="form" :model="form" label-width="120px" class="scrollbar-form" :rules="rules">
            <el-row type="flex">
              <el-col :span="22">
                <el-form-item
                  label="清洗任务单号"
                  prop="cleanSubTaskId"
                >
                  <el-select
                    v-model="form.cleanSubTaskId"
                    filterable
                    remote
                    reserve-keyword
                    placeholder=""
                    :remote-method="remoteMethodCleanId"
                    :loading="loading"
                    @change="selectChange($event)"
                  >
                    <el-option
                      v-for="item in cleanIdOptions"
                      :key="item.id"
                      :label="item.id"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-for="(item,index) in form.errors" v-show="form.cleanSubTaskId!==''" :key="item.errorType+index" type="flex" :gutter="10">
              <el-col :span="9">
                <el-form-item
                  label="器械名字"
                  :prop="'errors.'+index+'.suppliesId'"
                  :rules="[
                    { required: true, message: '请选择器械', trigger: ['blur','change'] }
                  ]"
                >
                  <el-select v-model="item.suppliesId" placeholder="请选择" @change="instanceChange(item)">
                    <el-option
                      v-for="it in instanceOptions"
                      :key="it.id"
                      :label="getOption(it)"
                      :value="it.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-input-number v-model.number="item.errorCount" placeholder="请输入数量" :min="1" :max="getMax(item)" controls-position="right" />
              </el-col>
              <el-col :span="3">
                <el-form-item label="器械总数" label-width="90px">
                  {{ getTotal(item) }}
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-select v-model="item.errorType" placeholder="请选择">
                  <el-option label="维修" value="1" />
                  <el-option label="报废" value="2" />
                </el-select>
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
        <el-button type="bgc" @click="show=false">取消</el-button>
        <el-button type="primary" :loading="buttonLoading" @click="addSubmit">确认</el-button>
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
      listLoading: true,
      buttonLoading: false,
      form: {
        cleanSubTaskId: '',
        errors: []
      },
      rules: {
        cleanSubTaskId: [
          { required: true, message: '请输入清洗任务单号', trigger: ['blur', 'change'] }
        ]
      },
      instanceOptions: [],
      show: false,
      cleaningBoxOptions: [],
      cleanIdOptions: [],
      loading: false,
      tableData: [],
      totalCount: 0,
      conditions: {
        cleanboxId: null,
        cleanSubTaskLastUserFuzzy: null,
        cleanSubTaskLastTimeOneDay: null
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
  inject: ['reload'],
  methods: {
    fetchData() {
      this.listLoading = true
      api.getCleanErrorPage().then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.tableData = response.data.page.records
          this.totalCount = response.data.page.totalCount
          this.listLoading = false
        }
      })
    },
    remoteMethodCleanId(query) {
      console.log(query)
      if (query !== '') {
        this.loading = true
        api.getCleanTask({ cleanSubTaskId: query }).then(response => {
          if (response.code === '200' && response.data.busiCode === '1') {
            this.cleanIdOptions = response.data.page.records
            this.loading = false
          }
        })
      } else {
        this.cleanIdOptions = []
      }
    },
    getOption(item) {
      return item.name
    },
    getMax(item) {
      return item.maxCount === undefined ? 1 : item.maxCount
    },
    getTotal(item) {
      console.log(item.totalCount)
      return item.totalCount === undefined ? 1 : item.totalCount
    },
    selectChange(select) {
      api.getSubSupplies({ id: select }).then(response => {
        console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.instanceOptions = response.data.entity
          this.form.errors = [
            {
              suppliesName: '',
              suppliesId: '',
              errorCount: null,
              errorType: '1'
            }
          ]
        }
      })
    },
    instanceChange(item) {
      this.instanceOptions.forEach(element => {
        if (item.suppliesId === element.id) {
          console.log(item)
          item.suppliesName = element.name
          item.maxCount = element.count
          item.totalCount = element.count
        }
      })
      console.log(item)
    },
    addClick() {
      this.form = {
        cleanSubTaskId: '',
        errors: []
      }
      this.show = true
    },
    // 添加记录弹窗确认按钮
    addSubmit() {
      console.log(this.form)
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.buttonLoading = true
          api.toMaintainClean(this.form).then(response => {
            if (response.code === '200' && response.data.busiCode === '1') {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.buttonLoading = false
              this.show = false
              this.reload()
            }
          })
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    // 弹窗内添加器械名字右侧+添加按钮
    addItem() {
      this.form.errors.push({
        suppliesName: '',
        suppliesId: '',
        errorCount: null,
        errorType: '1'
      })
    },
    // 弹窗内添加器械名字右侧删除按钮
    deleteItem(item, index) {
      this.form.errors.splice(index, 1)
    },
    // 输入框改变
    contentChange(content) {
      this.$set(this.conditions, 'cleanSubTaskLastUserFuzzy', content)
      this.headselectChange()
    },
    // 时间改变
    dateChange(date) {
      this.$set(this.conditions, 'cleanSubTaskLastTimeOneDay', date)
      this.headselectChange()
    },
    // 清洗框改变
    cleaningBoxChange(cleaningBox) {
      this.$set(this.conditions, 'cleanboxId', cleaningBox)
      this.headselectChange()
    },
    headselectChange() {
      this.$set(this.conditions, 'pageNo', 1)
      this.listLoading = true
      api.getCleanErrorPage(this.conditions).then(response => {
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
.second-row {
  color: #999;
}
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
::v-deep .demo-table-expand .el-form-item__label {
  width: 60px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.expand-span {
  margin-right: 30px;
}
.dialog-main {
  padding: 0;
  height: 420px;
}
.scrollbar-form {
  padding-top: 20px;
  padding-bottom: 0;
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
</style>
