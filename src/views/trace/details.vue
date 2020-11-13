<template>
  <div style="padding:30px">
    <!-- header -->
    <myfilters
      :title="packetName"
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
      <el-table-column label="包编码" prop="id" />
      <el-table-column label="包名称" prop="name" />
      <el-table-column label="创建时间/创建人">
        <template slot-scope="scope">
          <div>{{ scope.row.createUser }}</div>
          <div>{{ scope.row.createTime }}</div>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">追溯查询</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <my-pagination :total="totalCount" methods="toGetTraceDetail" :conditions="conditions" />
    <!-- 追溯弹出框 -->
    <el-dialog :visible.sync="packageShow" width="95%">
      <template slot="title">
        <div class="title">{{ packetName }}<span class="tiny-title">{{ row.id }}</span></div>
      </template>
      <div class="dialog-main" style="height:500px;padding-top:170px">
        <!-- steps -->
        <el-steps :active="row.active" align-center finish-status="success">
          <el-step v-if="getSource()" icon="icon-fengbao iconfont">
            <template slot="title">
              <div v-if="isComplete(1)">
                已封包
              </div>
              <div v-else>
                待封包
              </div>
            </template>
            <template slot="description">
              <div v-if="isComplete(1)">
                <div>封包人:{{ getData(0) }}</div>
                <div>{{ getDate(0) }}
                </div>
              </div>
            </template>
          </el-step>
          <el-step v-else icon="icon-fengbao iconfont">
            <template slot="title">
              <div v-if="isComplete(2)">
                已入库
              </div>
              <div v-else>
                待入库
              </div>
            </template>
            <template slot="description">
              <div v-if="isComplete(2)">
                <div>封包人:{{ getData(0) }}</div>
                <div>{{ getDate(0) }}
                </div>
              </div>
            </template>
          </el-step>
          <el-step title="待装载" icon="el-icon-upload">
            <template slot="title">
              <div v-if="isComplete(3)">
                已装载
              </div>
              <div v-else>
                待装载
              </div>
            </template>
            <template slot="description">
              <div v-if="isComplete(3)">
                <div>装载人:{{ getData(1) }}</div>
                <div>{{ getDate(1) }}</div>
              </div>
            </template>
          </el-step>
          <el-step icon="icon-miejun iconfont">
            <template slot="title">
              <div v-if="isComplete(4)">
                已灭菌
              </div>
              <div v-else>
                待灭菌
              </div>
            </template>
            <template slot="description">
              <div v-if="isComplete(4)">
                <div>灭菌人:{{ getData(2) }}</div>
                <div>{{ getDate(2) }}           </div>
              </div>
            </template>
          </el-step>
          <!-- <el-step icon="el-icon-tickets">
            <template slot="title">
              <div v-if="isComplete(5)">
                已申请
              </div>
              <div v-else>
                待申领
              </div>
            </template>
            <template slot="description">
              <div v-if="isComplete(5)">
                <div>申请人:{{ getData(3) }}</div>
                <div>{{ getDate(3) }}</div>
              </div>
            </template>
          </el-step> -->
          <el-step icon="el-icon-user-solid">
            <template slot="title">
              <div v-if="isComplete(6)">
                已发放
              </div>
              <div v-else>
                待发放
              </div>
            </template>
            <template slot="description">
              <div v-if="isComplete(6)">
                <div>发放人:{{ getData(3) }}</div>
                <div>{{ getDate(3) }}</div>
              </div>
            </template>
          </el-step>
          <!-- <el-step icon="el-icon-truck">
            <template slot="title">
              <div v-if="isComplete(7)">
                已发放
              </div>
              <div v-else>
                发放中
              </div>
            </template>
            <template slot="description">
              <div v-if="isComplete(7)">
                <div>发放人:{{ getData(5) }}</div>
                <div>{{ getDate(5) }}</div>
              </div>
            </template>
          </el-step> -->
          <el-step icon="el-icon-s-claim">
            <template slot="title">
              <div v-if="isComplete(8)">
                已签收
              </div>
              <div v-else>
                待签收
              </div>
            </template>
            <template slot="description">
              <div v-if="isComplete(8)">
                <div>签收人:{{ getData(4) }}</div>
                <div>{{ getDate(4) }}</div>
              </div>
            </template>
          </el-step>
          <!-- <el-step v-if="row.isBorrow" title="借出">
            <template slot="description">
              <div v-if="isComplete(9)">
                <div>申请科室:{{ row.applyDeptName }}</div>
                <div>{{ row.departmentTime }}</div>
              </div>
            </template>
          </el-step> -->
          <el-step icon="icon-huishou iconfont">
            <template slot="title">
              <div v-if="isComplete(9)">
                已回收
              </div>
              <div v-else>
                待回收
              </div>
            </template>
            <template slot="description">
              <div v-if="isComplete(9)">
                <div>申请人:{{ getData(5) }}</div>
                <div>{{ getDate(5) }}</div>
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
import myPagination from '@/components/MyPagination'
import api from '@/api'

export default {
  components: {
    myfilters, myPagination
  },
  data() {
    return {
      row: '',
      packetName: null,
      // table data
      tableData: [],
      totalCount: null,
      packageShow: false, // 弹出框显示
      traceData: null,
      conditions: {
        defineId: this.$route.query.id,
        id: null
      }
    }
  },
  computed: {
    // table data length
    content() {
      return '共' + this.totalCount + '条数据'
    }

  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.toGetTraceDetail(this.conditions).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.tableData = response.data.records
          this.totalCount = response.data.totalCount
        }
      })
      api.toGetTraceList({ defineId: this.$route.query.id }).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          this.packetName = response.data.records[0].name
        }
      })
    },
    getSource() {
      if (this.traceData) {
        if (this.traceData[0].packetStatus === '1') {
          return true
        }
      }
      return false
    },
    getData(step) {
      if (this.traceData) {
        if (this.traceData.length > step) {
          return this.traceData[step].createUser
        }
      }
    },
    getDate(step) {
      if (this.traceData) {
        if (this.traceData.length > step) {
          return this.traceData[step].createTime
        }
      }
    },
    // 显示弹出框
    handleDetail(index, row) {
      this.row = row
      api.toGetTrace({ packetInstanceId: row.id, _sort: 'packet_status' }).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          this.traceData = response.data.records
          this.row.active = this.traceData.length
        }
      })
      this.packageShow = true
    },
    // 查看是否完成
    isComplete(step) {
      if (this.traceData) {
        return parseInt(this.traceData[this.traceData.length - 1].packetStatus) >= step
      }
      // if (!this.row.isBorrow && step > 7) {
      //   return this.row.active + 1 > step
      // }
      // return this.row.active > step
    },
    // 输入框输入改变
    contentChange(content) {
      this.$set(this.conditions, 'id', content)
      this.$set(this.conditions, 'pageNo', 1)
      this.fetchData()
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
.title{
  font-size: 20px;
  line-height: 26px;
  .tiny-title{
    font-size: 12px;
    color: #999999;
    padding-left: 15px;
  }
}
</style>
