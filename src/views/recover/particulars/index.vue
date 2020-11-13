<template>
  <div class="particulars-container" style="padding:30px">
    <!-- 组件头部 -->
    <myfilters title="申请单详情" :content="content" :back-button="true" />
    <!-- 组件头部结束 -->
    <div class="box">
      <div class="tab_contain">
        <!-- 申请单详情 -->
        <el-table v-loading="listLoading" :data="[firstRow]" style="width: 100%">
          <el-table-column label="申请科室" prop="applyDeptName" />
          <el-table-column label="任务类别">
            <template slot-scope="scope">
              <span>{{ ssd_workorder_type[scope.row.workorderType] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单号" prop="id" />
          <el-table-column label="包数量" prop="applyCount" />
          <el-table-column label="申请人/时间" width="170">
            <template slot-scope="scope">
              {{ scope.row.applyUserid }}
              <br>
              <span class="second-row">{{ scope.row.applyTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="当前状态">
            <template slot-scope="scope">
              {{ scope.row.lastUser }}【{{ state(scope.row.currentStatus) }}】
              <br>
              <span class="second-row">{{ scope.row.currentStatusTime }}</span>
            </template>
          </el-table-column>
        </el-table>
        <img class="pic_user" src="@/assets/images/erwm.png" alt>
        <!-- 申请单详情结束 -->
      </div>
    </div>

    <!-- 第二个表格(包信息) -->

    <div class="box">
      <el-table v-loading="listLoading" :data="listData" style="width: 100%">
        <el-table-column prop="name" label="包名称" align="center" />
        <el-table-column prop="packetInstanceId" label="包唯一码" align="center" />
        <el-table-column label="回收状态" align="center">
          <template slot-scope="scope">
            <div :class="recyclingStatusColor(scope.row.lostOrDamage,scope.row.needCleanBox)">
              <i :class="recyclingStatusIcon(scope.row.lostOrDamage,scope.row.needCleanBox)" />
              {{ recyclingStatus(scope.row.lostOrDamage,scope.row.needCleanBox) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="right" width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              v-if="(firstRow.currentStatus==='5' || firstRow.currentStatus==='7' || firstRow.currentStatus==='11' || firstRow.currentStatus==='12') && scope.row.needCleanBox=== '1' "
              size="mini"
              type="success"
              @click="handleEdit(scope.$index,scope.row)"
            >清点</el-button>
            <el-button
              v-if="scope.row.lostOrDamage==='1'"
              size="mini"
              @click="showDetail(scope.$index,scope.row)"
            >查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button
      v-if="firstRow.currentStatus==='4' || firstRow.currentStatus==='6'"
      type="primary"
      :loading="buttonLoading"
      @click="handleSign()"
    > 确认签收
    </el-button>
    <!-- 弹出窗口 -->
    <el-dialog :visible.sync="show" width="95%" class="checkBox">
      <template slot="title">
        <el-row>
          <el-col class="inline-col">
            <!-- <img
              class="dialog-title-img"
              :src="listData[editIndex].img"
              @click="imgClick(editIndex,editRow)"
            > -->
          </el-col>
          <el-col class="inline-col">
            <el-row>
              <div class="dialog-title-top">{{ editRow.name }}</div>
            </el-row>
            <el-row>
              <div class="dialog-title-bottom">包唯一码：{{ editRow.packetInstanceId }}</div>
            </el-row>
            <el-row>
              <div class="dialog-title-bottom">器械数量：{{ getInstanceCount(InstanceIdDetail[editId]) }}</div>
            </el-row>
          </el-col>
        </el-row>
      </template>
      <div class="dialog-main">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="dialog-main-box">
              <div class="box-title">请清点器械包</div>
              <div style="height:400px">
                <el-table :data="InstanceIdDetail[editId]" style="width: 100%" class="hidden-table">
                  <el-table-column label="器械名称" />
                  <el-table-column label="数量" />
                  <el-table-column label="缺失" width="150" align="center" />
                  <el-table-column label="损坏" width="150" align="center" />
                </el-table>
                <el-scrollbar style="height:350px;background: #fff">
                  <el-table :data="InstanceIdDetail[editId]" style="width: 100%" :show-header="false">
                    <el-table-column prop="name" />
                    <el-table-column prop="itemQuantity" />
                    <el-table-column width="150">
                      <template slot-scope="scope">
                        <el-input-number
                          v-model="scope.row.loseCount"
                          placeholder="缺失"
                          :min="0"
                          :max="scope.row.itemQuantity-scope.row.damageCount"
                          size="small"
                          controls-position="right"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column width="150">
                      <template slot-scope="scope">
                        <el-input-number
                          v-model="scope.row.damageCount"
                          placeholder="损坏"
                          :min="0"
                          :max="scope.row.itemQuantity-scope.row.loseCount"
                          size="small"
                          controls-position="right"
                        />
                      </template>
                    </el-table-column>
                  </el-table>
                </el-scrollbar>
              </div>
            </div>
          </el-col>
          <el-col :span="12" class="dialog-right">
            <div class="dialog-main-box">
              <div class="box-title">选择清洗框/架</div>
              <el-radio-group v-model="cleanboxId">
                <el-radio v-for="(box,index) in CLEAN_RACK" :key="index" :label="index" border>
                  <span>{{ box }}</span>
                </el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="show=false">取消</el-button>
        <el-button type="primary" @click="signSubmit">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="物品详细" :visible.sync="detailShow" width="800px">
      <div class="dialog-main">
        <div class="dialog-main-box">
          <div style="height:450px">
            <el-table v-loading="dialogLoading" :data="detailData" style="width: 100%" class="hidden-table">
              <el-table-column label="序号" type="index" width="130" align="center" />
              <el-table-column label="名称" />
              <el-table-column label="缺失" />
              <el-table-column label="损坏" />
            </el-table>
            <el-scrollbar style="height:400px;background: #fff">
              <el-table :data="detailData" style="width: 100%" :show-header="false">
                <el-table-column type="index" width="130" align="center" />
                <el-table-column prop="name" />
                <el-table-column prop="loseCount" />
                <el-table-column prop="damageCount" />
              </el-table>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import api from '@/api'
export default {
  components: {
    myfilters
  },
  data() {
    return {
      listLoading: true,
      buttonLoading: false,
      dialogLoading: true,
      firstRow: {}, // 单详情
      ssd_workorder_status: '', // 工单状态
      ssd_workorder_type: '', // 工单类型
      detailShow: false, // 损坏弹窗
      show: false, // 清点弹窗
      listData: [], // 清点列表
      detailData: [], // 损坏列表
      editIndex: 0, // 编辑index
      editRow: '', // 编辑行
      editId: '', // 编辑id
      cleanboxId: '', // 清洗架id
      InstanceIdDetail: { }, // 器械详情
      CLEAN_POT: [],
      CLEAN_RACK: []
    }
  },
  computed: {
    content() {
      return '共' + this.listData.length + '条数据'
    }
  },
  created() {
    this.id = this.$route.query.id
    this.fetchData()
    api.toconstanttypeBatch({
      constantCodes: [
        'CLEAN_RACK',
        'CLEAN_POT'
      ]
    }).then(response => {
      this.CLEAN_RACK = response.data.constantsDetail.CLEAN_RACK
      this.CLEAN_POT = response.data.constantsDetail.CLEAN_POT
    })
  },
  methods: {
    fetchData() {
      // 查看包实例明细
      // 获取工单详情
      api.toGetWorkorder({ id: this.id }).then(response => {
        this.listLoading = true
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.firstRow = response.data.workorderPage
          this.ssd_workorder_status = response.data.dictData.ssd_workorder_status // 工单状态
          this.ssd_workorder_type = response.data.dictData.ssd_workorder_type // 工单类型
          this.listData = response.data.packetInstancePage.records
          this.listLoading = false
        }
      })
    },
    state(state) {
      if (state === '5' || state === '7') {
        return this.ssd_workorder_status['11']
      }
      return this.ssd_workorder_status[state]
    },
    // 回收状态
    recyclingStatus(ldstate, boxstate) {
      const stateMap = {
        '0': '正常',
        '1': '缺/损',
        '2': '未清点',
        '3': '未签收'
      }
      if (this.firstRow.currentStatus === '4' || this.firstRow.currentStatus === '6') {
        return stateMap['3']
      }
      if (boxstate === '1') {
        return stateMap['2']
      }
      return stateMap[ldstate]
    },
    // 状态图标
    recyclingStatusIcon(ldstate, boxstate) {
      const stateMap = {
        '0': 'el-icon-success',
        '1': 'el-icon-warning',
        '2': 'el-icon-time',
        '3': 'el-icon-time'
      }
      if (boxstate === '1') {
        return stateMap['2']
      }
      return stateMap[ldstate]
    },
    // 状态颜色
    recyclingStatusColor(ldstate, boxstate) {
      const stateMap = {
        '0': 'success-color',
        '1': 'error-color',
        '2': 'base-color',
        '3': 'base-color'
      }
      if (boxstate === '1') {
        return stateMap['2']
      }
      return stateMap[ldstate]
    },
    // 签收
    handleSign() {
      this.buttonLoading = true
      // 回收签收
      if (this.firstRow.currentStatus === '4') {
        api.toConfirmRecycle({ orderId: this.$route.query.id, remark: '' }).then(response => {
          // console.log(response)
          if (response.code === '200' && response.data.busiCode === '1') {
            this.$message({
              message: '签收成功',
              type: 'success'
            })
            this.$set(this.firstRow, 'currentStatus', '11')
            this.buttonLoading = false
          }
        })
      } else {
        // 退回签收
        api.toConfirmReturn({ orderId: this.$route.query.id }).then(response => {
          // console.log(response)
          if (response.code === '200' && response.data.busiCode === '1') {
            this.$message({
              message: '签收成功',
              type: 'success'
            })
            this.$set(this.firstRow, 'currentStatus', '11')
            this.buttonLoading = false
          }
        })
      }
    },
    // 损坏详情
    showDetail(index, row) {
      this.dialogLoading = true
      api.toShowPiPage({ loseAndDamage: '1', packetInstanceId: row.packetInstanceId }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.detailData = response.data.records[0].lostDamageList
          this.detailShow = true
          this.dialogLoading = false
        }
      })
    },
    // 清点提交
    signSubmit() {
      let lostOrDamage = '0' // 损坏标识
      // 提交表单
      const recycleBean = {
        itemMissRecord: [],
        cleanboxId: this.cleanboxId,
        packetInstanceId: this.editRow.packetInstanceId,
        workorderId: this.firstRow.id
      }
      // console.log(this.editRow.id)
      // 循环遍历,搜寻有填写内容的物资
      this.editRow.packet.forEach(item => {
        if (item.damageCount === 0 && item.loseCount === 0) {
          return
        } else {
          lostOrDamage = '1'
        }
        // 填入表单
        recycleBean.itemMissRecord.push({
          'itemId': item.id,
          'loseCount': item.loseCount,
          'damageCount': item.damageCount
        })
      })
      // console.log(recycleBean)

      // 发送请求
      api.toReviseInstance(recycleBean).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.buttonLoading = true
          this.editRow.needCleanBox = '0'
          this.editRow.lostOrDamage = lostOrDamage
          this.buttonLoading = false
          if (this.isCompleted(this.listData)) {
            this.$set(this.firstRow, 'currentStatus', '13')
            this.$message({
              message: '清点完成',
              type: 'success'
            })
          } else {
            this.$set(this.firstRow, 'currentStatus', '12')
            this.$message({
              message: '清点成功',
              type: 'success'
            })
          }
          // this.$set(this.firstRow, 'currentStatus', this.isCompleted(this.listData) ? '13' : '12')
          // this.$message({
          //   message: '清点成功',
          //   type: 'success'
          // })
        }
      })
      this.show = false
    },
    // 清点是否全部完成
    isCompleted(listData) {
      console.log(listData)
      let flag = true
      listData.forEach(item => {
        if (item.needCleanBox === '1') {
          flag = false
        }
      })
      return flag
    },
    // 获取器械数量
    getInstanceCount(detail) {
      if (detail) {
        let count = 0
        detail.forEach(item => {
          count += item.itemQuantity
        })
        return count
      }
    },
    // 获取物资
    handleEdit(index, row) {
      this.editRow = row // 当前修改行
      const id = row.packetInstanceId // 获取实例包id
      this.editId = id
      // 判断该定义包的物资是否已保存
      if (this.InstanceIdDetail[id] === undefined) {
        api.toInstanceDetail({ packetInstanceId: row.packetInstanceId, workorderId: this.$route.query.id }).then(response => {
          console.log(response)
          if (response.code === '200' && response.data.busiCode === '1') {
            this.InstanceIdDetail[id] = response.data.page.records // 保存起来
            row.packet = this.InstanceIdDetail[id] // 复制数据
            this.show = true
            if (response.data.packetInstanceCleanbox === null) {
              this.cleanboxId = Object.keys(this.CLEAN_RACK)[0]
            } else {
              this.cleanboxId = response.data.packetInstanceCleanbox.cleanboxId
            }
          }
        })
      } else {
        if (row.packet === undefined) {
          row.packet = this.InstanceIdDetail[id] // 复制数据
        }
        this.show = true
      }
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.particulars-container {
  min-height: calc(100vh - 50px);
  padding: 30px;
  background-color: #f0f2f5;
}
.second-row {
  color: #999;
}
.tab_contain {
  display: flex;
  .pic_user {
    width: 115px;
    height: 115px;
    margin-left: 20px;
  }
}
 ::v-deep .checkBox{
  .el-dialog__header {
    height: 100px;
    padding: 20px;
    padding-left: 40px;
  }
  .dialog-title-top {
    font-size: 18px;
    line-height: 24px;
  }
  .dialog-title-bottom {
    color: #999;
    font-size: 14px;
    line-height: 19px;
  }
}

.dialog-main-box {
  height: 480px;
  background: rgba(246, 246, 246, 1);
  border: 1px dotted rgba(175, 179, 192, 1);
  padding: 20px 25px;
  .box-title {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 16px;
  }
}
.dialog-main {
  padding: 20px;
}
.inline-col {
  display: inline-block;
  width: auto;
}
.dialog-title-img {
  height: 90px;
  cursor: pointer;
  border-radius: 6px;
  margin-right: 20px;
}
.box {
  background: rgba(255, 255, 255, 1);
  box-shadow: 4px 4px 40px 0px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 20px 30px;
  margin-bottom: 20px;
  position: relative;
}
::v-deep .el-dialog__header {
  // height: 90px;
  padding: 20px;
}
::v-deep .el-dialog__body {
  /* height: 130px; */
  padding: 20px;
}

::v-deep .el-image-viewer__wrapper {
  z-index: 2002 !important;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
::v-deep .dialog-right {
  .el-radio {
    margin: 20px
  }
  .el-radio.is-bordered+.el-radio.is-bordered{
    margin-left: 20px
  }
  .el-radio__input {
    position: absolute;
    top: -3px;
    left: -3px;
    display: none;
  }
  .el-radio__input.is-checked {
    display: block;
  }
  .el-radio.is-bordered {
    border-color: rgba(233, 233, 235, 1);
    color: #a5a7ac;
  }
  .el-radio.is-bordered.is-checked {
    border-color: rgba(225, 243, 216, 1);
    background-color: #e1f3d8;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #69c33e;
  }
  .el-radio__input.is-checked .el-radio__inner {
    background-color: #29c06d;
    border-color: #29c06d;
  }
  .el-radio:focus:not(.is-focus):not(:active):not(.is-disabled)
    .el-radio__inner {
    box-shadow: none;
  }
  .el-radio__input.is-checked .el-radio__inner::after {
    background-color: #29c06d;
  }
}
</style>
