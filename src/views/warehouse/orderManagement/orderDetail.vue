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
            <el-button size="mini" icon="el-icon-tickets" @click="detailShow(scope.$index,scope.row)">查看详细</el-button>
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
      <el-table :data="logisticsData" style="width: 100% ">
        <el-table-column label="序号" type="index" width="100px" />
        <el-table-column label="状态" prop="state" width="200px" />
        <el-table-column label="操作人" prop="operator" width="200px" />
        <el-table-column label="完成时间" prop="competeTime" />
      </el-table>
      <!-- table end -->
    </div>
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
      // form data
      detailForm: {
        orderCoding: 10001,
        applicationDepartment: '妇一科',
        applicant: '张美华',
        state: '已完成',
        applicationType: '器械包申请',
        applicationCount: 30,
        applicationTime: '2020.08.10 09:54:12'
      },
      // 物品清单
      goodsData: [
        {
          coding: 10001,
          name: '糖足包',
          count: 20
        },
        {
          coding: 10002,
          name: '脐穿包',
          count: 10
        }
      ],
      // 物流清单
      logisticsData: [
        {
          state: '科室申请',
          operator: '张美华',
          competeTime: '2020.08.10 09:54:12'
        },
        {
          state: '供应室接单',
          operator: '李丽丽',
          competeTime: '2020.08.10 09:54:12'
        },
        {
          state: '发货',
          operator: '李丽丽',
          competeTime: '2020.08.10 09:54:12'
        },
        {
          state: '送货',
          operator: '赵美珍',
          competeTime: '2020.08.10 09:54:12'
        },
        {
          state: '科室收货',
          operator: '张美华',
          competeTime: '2020.08.10 09:54:12'
        }
      ]
    }
  },
  methods: {
    // 查看详细
    detailShow(index, row) {
      this.$router.push({ name: 'OrderPackageDetail' })
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
</style>

