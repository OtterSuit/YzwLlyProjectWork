<template>
  <div class="delivery-container">
    <!-- header -->
    <myfilters
      title="订单详细"
      :back-button="true"
    />
    <!-- header end -->
    <div class="main-box">
      <!-- form -->
      <el-form ref="detailForm" :model="detailForm" label-width="100px">
        <div class="main-box-title">
          订单信息
        </div>
        <div class="tiny-form-item">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="订单编号">
                <span class="main-box-text">{{ detailForm.id }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="申请科室">
                <span class="main-box-text">{{ detailForm.applyDeptName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="申请人">
                <span class="main-box-text">{{ detailForm.applyUserid }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="订单状态">
                <span class="main-box-text">{{ detailForm.status }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="申请类别">
                <span class="main-box-text">
                  {{ detailForm.category }}
                  <span v-if="detailForm.urgentFlag===1" class="error-color">【加急】</span>
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="申请数量">
                <span class="main-box-text">{{ detailForm.applyCount }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="申请时间">
                <span class="main-box-text">{{ detailForm.applyTime }}</span>
              </el-form-item>
            </el-col>
            <el-col v-if="detailForm.currentStatus==='9'" :span="5">
              <el-form-item label="驳回原因">
                <span class="main-box-text">{{ detailForm.remark }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <!-- form end -->
      <!-- img -->
      <div class="erwm">
        <my-qrcode :text="id" />
      </div>
      <!-- img -->
    </div>
    <div class="main-box">
      <div class="main-box-title">
        物品清单
      </div>
      <!-- table -->
      <el-table v-loading="listLoading" :data="orderPackets" style="width: 100% ">
        <el-table-column label="序号" type="index" width="100px" />
        <el-table-column label="编号" prop="serialNumber" />
        <el-table-column label="名称" prop="name" width="200px" />
        <el-table-column label="数量" prop="packetCount" />
        <el-table-column width="150px">
          <template slot-scope="scope">
            <el-button v-if="detailForm.currentStatus==='3'||detailForm.currentStatus==='2'" size="mini" icon="el-icon-tickets" @click="detailShow(scope.$index,scope.row)">查看详细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- table end -->
    </div>
    <div class="main-box">
      <div class="main-box-title">
        物流信息
      </div>
      <!-- table -->
      <el-table v-loading="listLoading" :data="orderTraces" style="width: 100% ">
        <el-table-column label="序号" type="index" width="100px" />
        <el-table-column label="状态" width="200px">
          <template slot-scope="scope">
            <div :class="stateColor(scope.row.currentStatus)">
              <i :class="stateIcon(scope.row.currentStatus)" />
              {{ ssd_workorder_status[scope.row.currentStatus] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作人" prop="lastUser" width="200px" />
        <el-table-column label="完成时间" prop="lastTime" />
        <el-table-column label="备注" prop="remark" />
      </el-table>
      <!-- table end -->
      <el-dialog title="物品详细" :visible.sync="show" width="800px">
        <div class="dialog-main">
          <div class="dialog-main-box">
            <div style="height:450px">
              <el-table :data="instancePacket" style="width: 100%" class="hidden-table">
                <el-table-column label="序号" type="index" width="100" />
                <el-table-column label="编号" />
                <el-table-column label="名称" />
              </el-table>
              <el-scrollbar style="height:400px;background: #fff">
                <el-table :data="instancePacket" style="width: 100%" :show-header="false">
                  <el-table-column label="序号" type="index" width="100" />
                  <el-table-column label="编号" prop="packetInstanceId" />
                  <el-table-column label="名称" prop="name" />
                </el-table>
              </el-scrollbar>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import myfilters from '@/components/myfilters'
import MyQrcode from '@/components/MyQrcode'
import api from '@/api'

export default {
  components: {
    myfilters,
    MyQrcode
  },
  data() {
    return {
      id: '', // 订单编号
      ssd_workorder_status: '', // 订单状态
      ssd_workorder_type: '', // 订单类型
      ssd_packet_category: null,
      listLoading: true, // 数据加载
      detailForm: {}, // 订单信息
      orderPackets: [], // 物品清单
      orderTraces: [], // 物流清单
      instancePacket: [],
      packetInstancePage: [],
      show: false
    }
  },

  created() {
    this.id = this.$route.query.id // 获取订单编号
    this.fetchData() // 获取数据
  },
  methods: {
    fetchData() {
      this.listLoading = true
      // 获取工单详情
      api.toGetWorkorder({ id: this.id }).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          // console.log(response)
          this.ssd_workorder_status = response.data.dictData.ssd_workorder_status // 工单状态字典
          this.ssd_workorder_type = response.data.dictData.ssd_workorder_type // 工单类型字典
          this.ssd_packet_category = response.data.dictData.ssd_packet_category // 获取包类型
          this.orderPackets = response.data.packetDefinePage.records // 订单包数据
          this.detailForm = response.data.workorderPage // 订单详细信息
          this.detailForm.status = this.ssd_workorder_status[this.detailForm.currentStatus]
          this.detailForm.category = this.ssd_packet_category[this.detailForm.workorderCategory]
          this.packetInstancePage = response.data.packetInstancePage.records
          // 获取追溯信息
          api.toShowTracePage({ workorderId: this.id }).then(response => {
            // console.log(response)
            if (response.code === '200' && response.data.busiCode === '1') {
              this.orderTraces = response.data.records
              this.detailForm.remark = this.orderTraces[this.orderTraces.length - 1].remark
              this.listLoading = false
            }
          })
        }
      })
    },
    // 查看详细
    detailShow(index, row) {
      this.instancePacket = this.packetInstancePage.filter(item => {
        return item.serialNumber === row.serialNumber
      })
      this.show = true
    },
    // 状态标签图标
    stateIcon(state) {
      const stateMap = {
        '1': 'el-icon-time',
        '2': 'el-icon-time',
        '3': 'el-icon-success',
        '9': 'el-icon-warning',
        '10': 'el-icon-warning'
      }
      return stateMap[state]
    },
    // 状态标签颜色
    stateColor(state) {
      const stateMap = {
        '1': 'base-color',
        '2': 'goon-color',
        '3': 'success-color',
        '9': 'error-color',
        '10': 'base-color'
      }
      return stateMap[state]
    }
  }
}
</script>

<style lang="scss" scoped>
.delivery-container {
  padding: 30px;
  background-color:#F0F2F5;
  min-height: calc(100vh - 50px);
}
::v-deep .tiny-form-item {
  .el-form-item{
    margin: 0;
    .el-form-item__label{
    color: #9EAEC3;
    text-align: left;
    font-weight: normal;
  }
  .el-form-item__content{
     color: #000000;
    font-size: 14px;
  }
  }
}
.main-box{
    background: white;
    margin: 20px 0;
    padding: 30px;
    position: relative;

    .main-box-title {
        font-size: 18px;
        color: #999999;
        margin-bottom: 15px;
    }
    .erwm{
        position: absolute;
        top: 20px;
        right: 30px;
    }
}

::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
.dialog-main-box {
  position: relative;
  height: 500px;
  background: rgba(246, 246, 246, 1);
  border: 1px dotted rgba(175, 179, 192, 1);
  padding: 20px 25px;
}
.dialog-main {
  padding: 20px;
}
</style>

