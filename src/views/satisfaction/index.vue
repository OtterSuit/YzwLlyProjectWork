<template>
  <div style="padding:30px">
    <myfilters
      title="问卷调查"
      :content="content"
      :add-button="true"
      :search-content="true"
      placeholder="请输入关键字"
      addifo="新建问卷"
      :add-span="4"
      @addClick="addClick"
      @contentChange="contentChange"
    />
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="序号"
        type="index"
        width="100"
      />
      <el-table-column
        label="问卷名称"
        width="300"
        prop="name"
      />
      <el-table-column
        label="调查对象"
        prop="targetType"
      >
        <template slot-scope="scope">
          <span>{{ typeMap(scope.row.targetType) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="开始时间"
        prop="startTime"
      />
      <el-table-column
        label="终止时间"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.endTime">{{ scope.row.endTime }}</div>
          <div v-else style="color:#29C06D">正在收集中</div>
        </template>
      </el-table-column>
      <el-table-column
        label="问卷收集数量"
        prop="answerCount"
      />
      <el-table-column width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handlePreview(scope.row)"
          >
            <i class="el-icon-tickets" /> 预览
          </el-button>
          <el-dropdown trigger="click" class="dropdown" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-button
                size="mini"
                icon="el-icon-s-tools"
              >操作
              </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-if="!scope.row.endTime"
                class="warning-color iconfont"
                icon="icon-zhongzhi-"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleStop'
                }"
              >终止</el-dropdown-item>
              <el-dropdown-item
                v-if="scope.row.endTime"
                class="goon-color iconfont"
                icon="icon-jurassic_curve"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleAnalysis'
                }"
              >分析</el-dropdown-item>
              <el-dropdown-item
                v-if="scope.row.answerCount===0"
                class="error-color"
                icon="el-icon-delete"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleDelete'
                }"
              >删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <my-pagination :total="total" methods="getSatisfaction" :conditions="conditions" />
  </div>
</template>

<script>
import api from '@/api'
import myfilters from '@/components/myfilters'
import MyPagination from '@/components/MyPagination'
import { satisfaction } from '@/common/js/constants'
import { format } from '@/utils/index'
export default {
  components: {
    myfilters, MyPagination
  },
  inject: ['reload'],
  data() {
    return {
      listLoading: true,
      total: 0,
      conditions: {
        name: null
      },
      tableData: []
    }
  },
  computed: {
    content() {
      return '共' + this.total + '条数据'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getSatisfaction(this.conditions).then(response => {
        if (response.success) {
          console.log('问卷调查列表:', response)
          this.listLoading = false
          this.tableData = response.resData.items
          this.total = response.resData.totalItems
        }
      })
    },
    // 调查对象字典
    typeMap(type) {
      return satisfaction[type]
    },
    // 终止调查
    handleStop(index, row) {
      api.putSatisfactionById({ id: row.id }).then(response => {
        if (response.success) {
          console.log('终止调查:', response)
          this.$message({
            message: '终止成功',
            type: 'success'
          })
          row.endTime = format('yyyy.MM.dd HH:mm')
        }
      })
    },
    // 新建问卷
    addClick() {
      this.$router.push({
        name: 'newQuestion'
      })
    },
    // 下拉点击
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    // 分析
    handleAnalysis(index, row) {
      this.$router.push({
        name: 'quesAnalysis',
        params: {
          id: row.id
        }
      })
    },
    // 删除
    handleDelete(index, row) {
      api.deleteSatisfaction({ id: row.id }).then(response => {
        if (response.success) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.reload()
        }
      })
    },
    // 预览
    handlePreview(row) {
      this.$router.push({
        name: 'quesPreview',
        params: {
          id: row.id
        }
      })
    },
    // 头部输入框
    contentChange(content) {
      this.$set(this.conditions, 'name', content)
      this.$set(this.conditions, 'PageIndex', 1)
      this.fetchData()
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.iconfont {
  font-size: 14px;
}
::v-deep i {
  font-style: normal;
  font-size: 14px;
}
.el-dropdown-menu__item {
  padding: 0;
  text-align: center;
  width: 75px;
}
::v-deep .popper__arrow {
  display: none;
}
.el-dropdown-menu {
  padding: 0;
  margin-top: 1px;
}
::v-deep .el-page-header__content {
  width: 100%;
}
::v-deep .el-page-header {
  line-height: 39px;
}
::v-deep .el-page-header__left {
  margin-right: 0;
  padding: 0 10px;
  background-color: #f5f7fa;
  border: 1px solid #DCDFE6;
  border-right: 0;
  color: #909399;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}
::v-deep .el-page-header__title {
  display: inline-block;
  width: 30px;
}
::v-deep .el-page-header__left .el-icon-back {
  margin-top: -1px;
}
::v-deep .el-page-header__content {
  background-color: #f5f7fa;
  border: 1px solid #DCDFE6;
  color: #909399;
  font-size: 16px;
  padding: 0 10px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}
::v-deep .el-page-header__left::after {
  display: none;
}
</style>
