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
      <el-form ref="detailForm" :model="detailForm" label-width="70px">
        <div class="main-box-title">
          订单信息
        </div>
        <div class="tiny-form-item">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="订单编号">
                <span class="main-box-text">{{ detailForm.orderCoding }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="申请科室">
                <span class="main-box-text">{{ detailForm.applicationDepartment }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="申请人">
                <span class="main-box-text">{{ detailForm.applicant }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="订单状态">
                <span class="main-box-text">{{ detailForm.state }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="申请类别">
                <span class="main-box-text">{{ detailForm.applicationType }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="申请数量">
                <span class="main-box-text">{{ detailForm.applicationCount }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="申请时间">
                <span class="main-box-text">{{ detailForm.applicationTime }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <!-- form end -->
      <!-- img -->
      <div class="erwm">
        <img src="@/assets/images/erwm.png" alt="" style="width:128px">
      </div>
      <!-- img -->
    </div>
    <div class="main-box">
      <div class="main-box-title">
        物品清单
      </div>
      <!-- table -->
      <el-table :data="goodsData" style="width: 100% ">
        <el-table-column label="序号" type="index" width="100px" />
        <el-table-column label="编号" prop="coding" width="200px" />
        <el-table-column label="名称" prop="name" width="200px" />
        <el-table-column label="数量" prop="count" />
        <el-table-column width="150px">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state==='1'" size="mini" icon="el-icon-tickets" @click="detailShow(scope.$index,scope.row)">查看详细</el-button>
            <el-button v-else size="mini" icon="el-icon-circle-plus-outline" @click="delivery(scope.$index,scope.row)">配货</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- table end -->
    </div>
    <div class="main-box">
      <div class="main-box-title">
        收货信息
      </div>
      <div class="main-box-receive">
        <!-- form  -->
        <el-form ref="receiveForm" :model="receiveForm" label-width="70px">
          <el-form-item label="收货科室" style="width:50%">
            <el-select v-model="receiveForm.receiveDepartment" placeholder="请选择" @change="receiveDepartmentChange">
              <el-option
                v-for="item in receiveDepartmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select></el-form-item>
          <el-form-item label="送货人" style="width:50%">
            <el-input v-model="receiveForm.deliveryman" placeholder="请输入或扫描工牌" />
          </el-form-item>
        </el-form>
        <!-- form end -->
      </div>
    </div>
    <el-button type="primary" style="width:145px; height: 50px" @click="deliverySubmit()">确定发货</el-button>
    <!-- 配货弹出框 -->
    <el-dialog v-el-drag-dialog :visible.sync="deliveryShow" width="95%">
      <template slot="title">
        <span style="font-size:20px">{{ dialogTitle }}</span>
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
          <!-- table -->
          <el-table :data="dialogData" style="100%" :show-header="false">
            <el-table-column type="index" width="150px" />
            <el-table-column prop="packageCoding" width="260px" />
            <el-table-column prop="packageName" />
            <el-table-column width="100px">
              <template slot-scope="scope">
                <i
                  class="el-icon-delete base-color delete-icon"
                  @click="handleDelete(scope.$index,scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
          <!-- table end -->
        </el-scrollbar>
        <!-- scrollbar end -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="deliveryShow=false">取消</el-button>
        <el-button type="primary" @click="handleSign()">确定{{ dialogTitle }}</el-button>
      </div>
    </el-dialog>
    <!-- 配货弹出框结束 -->
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
      dialogTitle: '',
      deliveryShow: false, // 配货弹出框
      dialogCoding: '', // 扫码编码
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
      // 收获科室选项
      receiveDepartmentOptions: [
        {
          value: '妇一科',
          label: '妇一科'
        },
        {
          value: '儿保科',
          label: '儿保科'
        },
        {
          value: '妇保科',
          label: '妇保科'
        },
        {
          value: '宫颈科',
          label: '宫颈科'
        },
        {
          value: '手术室',
          label: '手术室'
        }
      ],
      // 收获信息表
      receiveForm: {
        receiveDepartment: '',
        deliveryman: ''
      },
      // 订单信息表
      detailForm: {
        orderCoding: 10001,
        applicationDepartment: '妇一科',
        applicant: '张美华',
        state: '已完成',
        applicationType: '器械包申请',
        applicationCount: 30,
        applicationTime: '2020.08.10 09:54:12'
      },
      // 物品清单数据
      goodsData: [
        {
          coding: 10001,
          name: '糖足包',
          count: 20,
          state: '2'
        },
        {
          coding: 10002,
          name: '脐穿包',
          count: 10,
          state: '1'
        }
      ]
    }
  },
  methods: {
    // 查看详细按钮点击
    detailShow(index, row) {
      this.$router.push({ name: 'OrderPackageDetail' })
    },
    // 收获信息选择
    receiveDepartmentChange() {
      console.log(this.receiveForm.receiveDepartment)
    },
    // 控制删除
    handleDelete(index, row) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.dialogData.splice(index, 1)
    },
    // 配货弹出框
    delivery(index, row) {
      this.dialogTitle = '配货'
      this.deliveryShow = true
    },
    // 控制弹出框提交
    handleSign() {
      this.$message({
        message: this.dialogTitle + '成功',
        type: 'success'
      })
      this.deliveryShow = false
    },
    // 确定发货提交
    deliverySubmit() {
      this.$router.go(-1)
      this.$message({
        message: '发货成功',
        type: 'success'
      })
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
::v-deep .hidden-table .el-table__body-wrapper {
  display: none;
}
.tinytitle{
  font-size: 14px;
  color: #FF4C4C;
  margin-left:15px ;
}
::v-deep .tiny-form-item {
  .el-form-item{
    margin: 0;
    .el-form-item__label{
      float: left;
      color: #9EAEC3;
      font-size: 12px;
  }
  .el-form-item__content{
    color: #000000;
    font-size: 14px;
  }
  }
}
::v-deep .main-box-receive {
  .el-form-item{
    margin: 15px;
    .el-form-item__label{
    text-align: center;
    color: #666666;
    font-size: 14px;
    padding: 0 14px 0 0;
  }
  }
}
.main-box{
  background: white;
  margin: 20px 0;
  padding: 30px;

  .main-box-title {
      font-size: 18px;
      color: #999999;
      margin-bottom: 15px;
  }
  .erwm{
      position: absolute;
      top: 160px;
      right: 50px;
  }
}
.dialog-box{
  margin: 20px;
  border:1px solid rgba(216,216,216,1);
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
.delete-icon {
  font-size: 20px;
  cursor: pointer;
}
</style>

