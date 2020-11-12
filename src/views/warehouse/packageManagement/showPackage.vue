<template>
  <div>
    <div style="padding:30px">
      <!-- header -->
      <myfilters
        title="糖足包"
        :content="content"
        :choose-states="true"
        :choose-date="true"
        :search-content="true"
        :back-button="true"
        placeholder="入库人"
        @contentChange="contentChange"
        @dateChange="dateChange"
        @statesChange="statesChange"
      >
        <template slot="header-extent">
          <el-select v-model="identification" placeholder="全部标识" @change="identificationChange">
            <el-option label="灭菌入库" value="灭菌入库" />
          </el-select>
        </template>
        <template slot="extent">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-button
                icon="el-icon-s-tools"
              >设置
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="{
                  action: 'detailShow'
                }"
              >查看包明细
              </el-dropdown-item>
              <el-dropdown-item
                :command="{
                  action: 'handleDialogOffShelve'
                }"
              >下架</el-dropdown-item>
              <el-dropdown-item
                :command="{
                  action: 'handleDialogInventory'
                }"
              >上架</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </myfilters>
      <!-- header end -->
      <!-- table -->
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          label="序号"
          type="index"
          width="100px"
        />
        <el-table-column label="包编码" prop="packageCoding" width="150px" />
        <el-table-column label="入库标识" prop="inStorageIdentification" />
        <el-table-column label="入库人" prop="inStorager" />
        <el-table-column label="入库时间" prop="inStorageTime" width="200px" />
        <el-table-column label="失效时间" prop="failureTime" width="200px" />
        <el-table-column
          width="250px"
          label="状态"
        >
          <template slot-scope="scope">
            <div :class="stateColor(scope.row.state)">
              <i :class="stateIcon(scope.row.state)" />
              {{ state(scope.row.state) }}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- table end -->
      <!-- 上/下架弹出框 -->
      <el-dialog v-el-drag-dialog :visible.sync="show" width="95%">
        <template slot="title">
          <span style="font-size:18px">{{ dialogTitle }}</span>
          <span class="tinytitle">请扫描需要{{ dialogTitle }}的器械包条码</span>
        </template>
        <div class="dialog-box">
          <!-- table header -->
          <el-table :data="dialogData" style="100%" class="hidden-table">
            <el-table-column label="序号" width="150px" />
            <el-table-column label="包编码" width="260px" />
            <el-table-column label="包名称" />
          </el-table>
          <!-- table header end -->
          <!-- scrollbar -->
          <el-scrollbar style="height:480px;background: #fff">
            <div style="width:390px; margin:15px 150px">
              <el-input v-model="dialogCoding" placeholder="请输入或扫描包编码" />
            </div>
            <!-- table body -->
            <el-table :data="dialogData" style="100%" :show-header="false">
              <el-table-column type="index" width="150px" />
              <el-table-column prop="packageCoding" width="260px" />
              <el-table-column prop="packageName" />
              <el-table-column width="100px">
                <template slot-scope="scope">
                  <!-- 删除图标 -->
                  <i
                    class="el-icon-delete base-color delete-icon"
                    @click="handleDelete(scope.$index,scope.row)"
                  />
                </template>
              </el-table-column>
            </el-table>
            <!-- table body end -->
          </el-scrollbar>
          <!-- scrollbar end -->
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="bgc" @click="show=false">取消</el-button>
          <el-button type="primary" @click="handleSign()">确定{{ dialogTitle }}</el-button>
        </div>
      </el-dialog>
      <!-- 上/下架弹出框结束 -->
    </div>

  </div>
</template>

<script>
import myfilters from '@/components/myfilters'

export default {
  components: {
    myfilters
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      identification: '全部标识',
      dialogCoding: '', // 扫描编码
      dialogTitle: '', // 弹出框类型
      show: false, // 弹出框显示
      // 弹出框数据
      dialogData: [
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        }
      ],
      // 表格数据
      tableData: [
        {
          packageCoding: 10001,
          inStorageIdentification: '灭菌入库',
          inStorager: '张全之',
          inStorageTime: '2020.08.10 16.24.32',
          failureTime: '2020.08.10 16.24.32',
          state: '1'
        },
        {
          packageCoding: 10001,
          inStorageIdentification: '灭菌入库',
          inStorager: '张全之',
          inStorageTime: '2020.08.10 16.24.32',
          failureTime: '2020.08.10 16.24.32',
          state: '1'
        },
        {
          packageCoding: 10001,
          inStorageIdentification: '灭菌入库',
          inStorager: '张全之',
          inStorageTime: '2020.08.10 16.24.32',
          failureTime: '2020.08.10 16.24.32',
          state: '1'
        },
        {
          packageCoding: 10001,
          inStorageIdentification: '灭菌入库',
          inStorager: '张全之',
          inStorageTime: '2020.08.10 16.24.32',
          failureTime: '2020.08.10 16.24.32',
          state: '4'
        },
        {
          packageCoding: 10001,
          inStorageIdentification: '灭菌入库',
          inStorager: '张全之',
          inStorageTime: '2020.08.10 16.24.32',
          failureTime: '2020.08.10 16.24.32',
          state: '4'
        },
        {
          packageCoding: 10001,
          inStorageIdentification: '灭菌入库',
          inStorager: '张全之',
          inStorageTime: '2020.08.10 16.24.32',
          failureTime: '2020.08.10 16.24.32',
          state: '4'
        },
        {
          packageCoding: 10001,
          inStorageIdentification: '灭菌入库',
          inStorager: '张全之',
          inStorageTime: '2020.08.10 16.24.32',
          failureTime: '2020.08.10 16.24.32',
          state: '1'
        },
        {
          packageCoding: 10001,
          inStorageIdentification: '灭菌入库',
          inStorager: '张全之',
          inStorageTime: '2020.08.10 16.24.32',
          failureTime: '2020.08.10 16.24.32',
          state: '1'
        },
        {
          packageCoding: 10001,
          inStorageIdentification: '灭菌入库',
          inStorager: '张全之',
          inStorageTime: '2020.08.10 16.24.32',
          failureTime: '2020.08.10 16.24.32',
          state: '1'
        },
        {
          packageCoding: 10001,
          inStorageIdentification: '灭菌入库',
          inStorager: '张全之',
          inStorageTime: '2020.08.10 16.24.32',
          failureTime: '2020.08.10 16.24.32',
          state: '1'
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
        '1': '正常',
        '2': '已作废',
        '3': '已上架',
        '4': '已下架'
      }
      return stateMap[state]
    },
    // 状态标签图标
    stateIcon(state) {
      const stateMap = {
        '1': '',
        '2': 'el-icon-warning',
        '3': '',
        '4': 'el-icon-warning'
      }
      return stateMap[state]
    },
    // 状态标签颜色
    stateColor(state) {
      const stateMap = {
        '1': '',
        '2': 'error-color',
        '3': 'success-color',
        '4': 'warning-color'
      }
      return stateMap[state]
    },
    // 状态标签背景颜色
    stateBgColor(state) {
      const stateMap = {
        '1': '',
        '2': 'error-bg-color',
        '3': '',
        '4': 'warning-bg-color'
      }
      return stateMap[state]
    },
    // 控制table行的背景颜色
    tableRowClassName({ row, rowIndex }) {
      return this.stateBgColor(row.state)
    },
    // 控制下拉框行为
    handleCommand({ action }) {
      this[action]()
    },
    // 控制删除图标
    handleDelete(index, row) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.dialogData.splice(index, 1)
    },
    // 上架弹出框
    handleDialogInventory(index, row) {
      this.show = true
      this.dialogTitle = '上架'
    },
    // 下架弹出框
    handleDialogOffShelve(index, row) {
      this.show = true
      this.dialogTitle = '下架'
    },
    // 查看包明细
    detailShow() {
      this.$router.push({ name: 'PackageDetail' })
    },
    // 弹出框确定
    handleSign() {
      this.$message({
        message: this.dialogTitle + '成功',
        type: 'success'
      })
      this.show = false
    },
    // 状态选项改变
    statesChange(state) {
      console.log(state)
    },
    // 标识选项改变
    identificationChange(identification) {
      console.log(identification)
    },
    // 输入框改变
    contentChange(content) {
      console.log(content)
    },
    // 日期改变
    dateChange(date) {
      console.log(date)
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.dialog-box{
  margin: 20px;
  border:1px solid rgba(216,216,216,1);
}
::v-deep .hidden-table .el-table__body-wrapper {
  display: none;
}
.el-dropdown-menu__item {
  padding: 0 20px;
  text-align: left;
  width: 110px;
}
.tinytitle{
  font-size: 14px;
  color: #FF4C4C;
  margin-left:15px ;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
.delete-icon {
  font-size: 24px;
  cursor: pointer;
  margin-right: 20px;
}
</style>
