<template>
  <div class="apply-contaniner">
    <myfilters
      title="借物申请单"
      content="NO.0033124"
      :back-button="true"
      style="margin-bottom:20px"
    />
    <div class="box">
      <el-row type="flex" justify="space-between">
        <el-col :span="21">
          <el-row style="margin-bottom:16px">
            <span class="title">订单信息</span>
          </el-row>
          <el-row class="row">
            <el-col :span="6">
              <span class="label">订单编号</span>
              <span class="content">{{ data.orderNum }}</span>
            </el-col>
            <el-col :span="6">
              <span class="label">申请科室</span>
              <span class="content">{{ data.applyDeptName }}</span>
            </el-col>
            <el-col :span="6">
              <span class="label">申请人</span>
              <span class="content">{{ data.applicant }}</span>
            </el-col>
            <el-col :span="6">
              <span class="label">订单状态</span>
              <span class="content">{{ data.state }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span class="label">申请类别</span>
              <span class="content">{{ data.applyType }}</span>
            </el-col>
            <el-col :span="6">
              <span class="label">申请数量</span>
              <span class="content">{{ data.applyNum }}</span>
            </el-col>
            <el-col :span="6">
              <span class="label">申请时间</span>
              <span class="content">{{ data.applyTime }}</span>
            </el-col>
            <el-col :span="6">
              <span class="label">目标科室</span>
              <span class="content">{{ data.targetDepartment }}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3" class="userImgBox">
          <img src="@/assets/images/erwm.png" class="code-img">
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <el-row style="margin-bottom:6px">
        <myfilters
          title="借物清单"
        />
      </el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="100" />
        <el-table-column prop="packageNum" label="编号" />
        <el-table-column prop="packageName" label="名称" />
        <el-table-column prop="number" label="数量" />
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDetails(scope.$index,scope.row)">
              <i class="el-icon-tickets" />
              查看详细
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="物品详细" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <div class="dialog-main-box">
          <div style="height:450px">
            <el-table :data="goodsData" style="width: 100%" class="hidden-table">
              <el-table-column label="序号" type="index" />
              <el-table-column label="编号" />
              <el-table-column label="名称" />
            </el-table>
            <el-scrollbar style="height:400px;background: #fff">
              <el-table :data="goodsData" style="width: 100%" :show-header="false">
                <el-table-column label="序号" type="index" />
                <el-table-column label="编号" prop="packageNum" />
                <el-table-column label="名称" prop="packageName" />
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

export default {
  components: {
    myfilters
  },
  data() {
    return {
      data: {
        orderNum: '10001',
        applyDepartment: '妇一科',
        applicant: '张美华',
        state: '已发放，待回收',
        applyType: '器械包申请',
        applyNum: '30',
        applyTime: '2020.08.10 09:54:12',
        targetDepartment: '儿二科'
      },
      tableData: [
        {
          packageNum: '10001',
          packageName: '糖足包',
          number: 2
        },
        {
          packageNum: '10002',
          packageName: '脐穿包',
          number: 2
        }
      ],
      show: false,
      goodsData: [
        {
          packageNum: '101',
          packageName: '糖足包'
        },
        {
          packageNum: '102',
          packageName: '糖足包'
        }
      ]
    }
  },
  methods: {
    handleDetails(index, row) {
      this.show = true
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.apply-contaniner {
  padding: 30px 20px;
  background-color:#F0F2F5;
  min-height: calc(100vh - 50px);
}
::v-deep .box {
  background:rgba(255,255,255,1);
  box-shadow:4px 4px 40px 0px rgba(0,0,0,0.05);
  border-radius:6px;
  padding: 20px 30px;
  margin-bottom: 20px;
  position: relative;
  .title {
    font-size:18px;
    color:rgba(153,153,153,1);
    line-height:24px;
  }
}
::v-deep .el-form-item__label {
  font-weight: normal;
  text-align: left;
}
.label {
  font-size:14px;
  display: inline-block;
  width: 60px;
  text-align: end;
  margin-right: 10px;
  color:rgba(158,174,195,1);
}
.content {
  font-size:14px;
}
.row {
  margin-bottom: 20px;
}
.code-img {
  height: 128px;
  float: right;
}
.dialog-main-box {
  position: relative;
  height: 500px;
  background: rgba(246, 246, 246, 1);
  border: 1px dotted rgba(175, 179, 192, 1);
  padding: 20px 25px;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
::v-deep .hidden-radio .el-radio__label {
  display: none;
}
.dialog-main {
  padding: 20px;
}
</style>
