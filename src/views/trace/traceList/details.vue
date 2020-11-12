<template>
  <div style="padding:30px">
    <!-- header -->
    <myfilters
      title="糖足包"
      :content="content"
      :search-content="true"
      :back-button="true"
      placeholder="包编号"
      @contentChange="contentChange($event)"
    />
    <!-- header end -->
    <!-- table -->
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="序号"
        type="index"
        width="100"
      />
      <el-table-column label="包编码" prop="packageCoding" width="350px" />
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">追溯查询</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <!-- 追溯弹出框 -->
    <el-dialog :visible.sync="packageShow" width="95%">
      <template slot="title">
        <div>糖足包<span>{{ row.packageCoding }}</span></div>
      </template>
      <div class="dialog-main" style="height:500px;padding-top:170px">
        <!-- steps -->
        <el-steps :active="row.active" align-center finish-status="success">
          <el-step icon="icon-fengbao iconfont">
            <template slot="title">
              <div v-if="isComplete(0)">
                已封包
              </div>
              <div v-else>
                待封包
              </div>
            </template>
            <template slot="description">
              <div v-if="isComplete(0)">
                <div>封包人:{{ row.packagePerson }}</div>
                <div>{{ row.packageTime }}
                </div>
              </div>
            </template>
          </el-step>
          <el-step title="待装载" icon="el-icon-upload">
            <template slot="title">
              <div v-if="isComplete(1)">
                已装载
              </div>
              <div v-else>
                待装载
              </div>
            </template>
            <template slot="description">
              <div v-if="isComplete(1)">
                <div>装载人:{{ row.loadingPerson }}</div>
                <div>{{ row.loadingTime }}</div>
              </div>
            </template>
          </el-step>
          <el-step icon="icon-miejun iconfont">
            <template slot="title">
              <div v-if="isComplete(2)">
                已灭菌
              </div>
              <div v-else>
                待灭菌
              </div>
            </template>
            <template slot="description">
              <div v-if="isComplete(2)">
                <div>灭菌人:{{ row.antisepsisPerson }}</div>
                <div>{{ row.antisepsisTime }}           </div>
              </div>
            </template>
          </el-step>
          <el-step icon="el-icon-tickets">
            <template slot="title">
              <div v-if="isComplete(3)">
                已申请
              </div>
              <div v-else>
                待申领
              </div>
            </template>
            <template slot="description">
              <div v-if="isComplete(3)">
                <div>申请人:{{ row.applician }}</div>
                <div>{{ row.applicationTime }}</div>
              </div>
            </template>
          </el-step>
          <el-step icon="el-icon-user-solid">
            <template slot="title">
              <div v-if="isComplete(4)">
                已发货
              </div>
              <div v-else>
                待发货
              </div>
            </template>
            <template slot="description">
              <div v-if="isComplete(4)">
                <div>发货人:{{ row.consignor }}</div>
                <div>{{ row.consignTime }}</div>
              </div>
            </template>
          </el-step>
          <el-step icon="el-icon-truck">
            <template slot="title">
              <div v-if="isComplete(5)">
                已配送
              </div>
              <div v-else>
                配送中
              </div>
            </template>
            <template slot="description">
              <div v-if="isComplete(5)">
                <div>配送人:{{ row.deliveryman }}</div>
                <div>{{ row.deliveryTime }}</div>
              </div>
            </template>
          </el-step>
          <el-step icon="el-icon-s-claim">
            <template slot="title">
              <div v-if="isComplete(6)">
                已签收
              </div>
              <div v-else>
                待签收
              </div>
            </template>
            <template slot="description">
              <div v-if="isComplete(6)">
                <div>签收人:{{ row.signer }}</div>
                <div>{{ row.signTime }}</div>
              </div>
            </template>
          </el-step>
          <el-step v-if="row.isBorrow" title="借出">
            <template slot="description">
              <div v-if="isComplete(7)">
                <div>申请科室:{{ row.department }}</div>
                <div>{{ row.departmentTime }}</div>
              </div>
            </template>
          </el-step>
          <el-step icon="icon-huishou iconfont">
            <template slot="title">
              <div v-if="isComplete(8)">
                已回收
              </div>
              <div v-else>
                待回收
              </div>
            </template>
            <template slot="description">
              <div v-if="isComplete(8)">
                <div>申请人:{{ row.recover }}</div>
                <div>{{ row.recoverTime }}</div>
              </div>
            </template>
          </el-step>
        </el-steps>
        <!-- steps end -->
      </div>
    </el-dialog>
    <!-- 追溯弹出框结束 -->
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
      row: '',
      // table data
      tableData: [
        {
          packageCoding: 1001,
          active: 1,
          isBorrow: false,
          packagePerson: '赵美丽',
          packageTime: '2020.08.10 09:45:32'
        },
        {
          packageCoding: 1002,
          active: 2,
          isBorrow: false,
          packagePerson: '赵美丽',
          packageTime: '2020.08.10 09:45:32',
          loadingPerson: '赵美丽',
          loadingTime: '2020.08.10 09:45:32'
        },
        {
          packageCoding: 1003,
          active: 3,
          isBorrow: false,
          packagePerson: '赵美丽',
          packageTime: '2020.08.10 09:45:32',
          loadingPerson: '赵美丽',
          loadingTime: '2020.08.10 09:45:32',
          antisepsisPerson: '赵美丽',
          antisepsisTime: '2020.08.10 09:45:32'
        },
        {
          packageCoding: 1004,
          active: 4,
          isBorrow: false,
          packagePerson: '赵美丽',
          packageTime: '2020.08.10 09:45:32',
          loadingPerson: '赵美丽',
          loadingTime: '2020.08.10 09:45:32',
          antisepsisPerson: '赵美丽',
          antisepsisTime: '2020.08.10 09:45:32',
          applician: '赵美丽',
          applicationTime: '2020.08.10 09:45:32'
        },
        {
          packageCoding: 1005,
          active: 5,
          isBorrow: false,
          packagePerson: '赵美丽',
          packageTime: '2020.08.10 09:45:32',
          loadingPerson: '赵美丽',
          loadingTime: '2020.08.10 09:45:32',
          antisepsisPerson: '赵美丽',
          antisepsisTime: '2020.08.10 09:45:32',
          applician: '赵美丽',
          applicationTime: '2020.08.10 09:45:32',
          consignor: '赵美丽',
          consignTime: '2020.08.10 09:45:32'
        },
        {
          packageCoding: 1006,
          active: 6,
          isBorrow: false,
          packagePerson: '赵美丽',
          packageTime: '2020.08.10 09:45:32',
          loadingPerson: '赵美丽',
          loadingTime: '2020.08.10 09:45:32',
          antisepsisPerson: '赵美丽',
          antisepsisTime: '2020.08.10 09:45:32',
          applician: '赵美丽',
          applicationTime: '2020.08.10 09:45:32',
          consignor: '赵美丽',
          consignTime: '2020.08.10 09:45:32',
          deliveryman: '赵美丽',
          deliveryTime: '2020.08.10 09:45:32'
        },
        {
          packageCoding: 1006,
          active: 8,
          isBorrow: false,
          packagePerson: '赵美丽',
          packageTime: '2020.08.10 09:45:32',
          loadingPerson: '赵美丽',
          loadingTime: '2020.08.10 09:45:32',
          antisepsisPerson: '赵美丽',
          antisepsisTime: '2020.08.10 09:45:32',
          applician: '赵美丽',
          applicationTime: '2020.08.10 09:45:32',
          consignor: '赵美丽',
          consignTime: '2020.08.10 09:45:32',
          deliveryman: '赵美丽',
          deliveryTime: '2020.08.10 09:45:32',
          signer: '赵美丽',
          signTime: '2020.08.10 09:45:32',
          recover: '赵美丽',
          recoverTime: '2020.08.10 09:45:32'
        }
      ],
      packageShow: false // 弹出框显示
    }
  },
  computed: {
    // table data length
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  methods: {
    // 显示弹出框
    handleDetail(index, row) {
      this.row = row
      this.packageShow = true
    },
    // 查看是否完成
    isComplete(step) {
      if (!this.row.isBorrow && step > 7) {
        return this.row.active + 1 > step
      }
      return this.row.active > step
    },
    // 输入框输入改变
    contentChange(content) {
      console.log(content)
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .el-step__head.is-success{
  .is-icon{
    border-radius: 50%;
    border: 2px solid;
    border-color: inherit;
    width: 24px;
  }
}
::v-deep .el-table--enable-row-transition .el-table__body td{
    padding:20px 0
}
</style>
