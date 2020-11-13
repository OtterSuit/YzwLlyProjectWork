<template>
  <div class="apply-contaniner">
    <!-- 头部 -->
    <myfilters title="物品申领单" :back-button="true" style="margin-bottom:20px">
      <!-- <template slot="extent">
        <el-button type="bgc" icon="el-icon-upload">模板管理</el-button>
      </template> -->
    </myfilters>
    <!-- 头部结束 -->
    <!-- 单类别 -->
    <el-form ref="form" :model="form" label-width="70px">
      <div class="box">
        <el-row style="margin-bottom:16px">
          <span class="title">单类别</span>
        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item label="申请类别">
              <el-select v-model="form.applyType" placeholder="请选择" :disabled="form.applyData.length!==0" @change="typeChange">
                <el-option
                  v-for="(item,index) in typeOptions"
                  :key="index"
                  :label="item"
                  :value="index"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item label="是否加急" style="margin-bottom:0">
              <el-radio-group v-model="form.urgentFlag">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <!-- 申领清单 -->
      <div class="box">
        <el-row style="margin-bottom:6px">
          <myfilters
            ref="applyFilters"
            title="申领清单"
            addifo="添加"
            :add-button="true"
            @addClick="addClick"
          />
        </el-row>
        <el-table v-loading="listLoading" :data="form.applyData" style="width: 100%">
          <el-table-column label="序号" type="index" width="100" />
          <el-table-column prop="serialNumber" label="包编号" />
          <el-table-column prop="packetName" label="包名称" />
          <el-table-column label="数量">
            <template slot-scope="scope">
              <div>
                <el-input v-model="scope.row.apply_count" placeholder="请输入" @focus="getOldData(scope.$index,scope.row)" @blur="applyChange(scope.$index,scope.row)" />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot-scope="scope">
              <i
                class="el-icon-delete base-color delete-icon"
                @click="handleDelete(scope.$index,scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
    <div>
      <el-button :loading="buttonLoading" type="primary" style="height:50px;width:140px" @click="onSubmit">提交申请</el-button>
      <!-- <div class="template-button">
        <i class="iconfont icon-baocun" />
        存为模板
      </div> -->
    </div>
    <!-- 搜索弹窗框 -->
    <el-dialog ref="goodsDialog" v-el-drag-dialog title="包信息" :visible.sync="show" width="95%">
      <div class="dialog-main">
        <div class="dialog-main-box">
          <el-input v-model="conditions.keyword" class="search-input" placeholder="包名称/编码" @keyup.enter.native="contentChange" />
          <el-button icon="el-icon-search" type="primary" @click="contentChange">搜索</el-button>
          <!-- 分页 -->
          <my-pagination :background="true" :total="totalCount" :page-size="5" methods="topacketPage" :table-data="['$parent','tableData']" loading="tableLoading" :conditions="conditions" />
          <el-table v-loading="tableLoading" :data="tableData" style="width: 100%" class="hidden-table">
            <el-table-column label="选择" width="100px" align="center" />
            <el-table-column label="包编号" />
            <el-table-column label="包名称" />
            <el-table-column label="数量" />
          </el-table>
          <el-scrollbar style="height:360px;background: #fff">
            <el-table ref="goods" v-loading="tableLoading" :data="tableData" style="width: 100%" :show-header="false">
              <el-table-column width="100px" align="center">
                <template slot-scope="scope">
                  <el-radio v-model="applyForm" :label="scope.row" class="hidden-radio" />
                </template>
              </el-table-column>
              <el-table-column prop="serialNumber" />
              <el-table-column prop="name" />
              <el-table-column>
                <template slot-scope="scope">
                  <el-input v-model.number="scope.row.applyCount" placeholder="请输入数量" style="width:90%" :disabled="applyForm===scope.row?false:true" />
                </template>
              </el-table-column>
            </el-table>
          </el-scrollbar>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import myPagination from '@/components/MyPagination'
import api from '@/api'

export default {
  components: {
    myfilters,
    myPagination
  },
  data() {
    return {
      buttonLoading: false,
      listLoading: true,
      tableLoading: true,
      form: {
        applyType: '1',
        urgentFlag: '0',
        applyData: []
      }, // 申请表单
      oldData: '',
      typeOptions: null,
      totalCount: 0,
      tableData: null,
      conditions: {
        keyword: null,
        pageSize: 5,
        category: null
      },
      show: false,
      applyForm: {} // 搜索表单
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      // 获取临时购物车清单
      api.peoCarPage({ busiType: '1' }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.form.applyData = response.data.records
          this.typeOptions = response.data.dictData.ssd_packet_category
          this.listLoading = false
        }
      })
      this.tableLoading = true
      // 获取包数据
      api.topacketPage(this.conditions).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.totalCount = response.data.totalCount
          this.tableData = response.data.records
          this.tableLoading = false
        }
      })
    },
    // 器械类型选择改变
    typeChange() {
      this.$set(this.conditions, 'category', this.form.applyType)
      this.contentChange()
    },
    // 添加临时购物车
    addClick() {
      this.show = true
    },
    // 添加购物车
    addSubmit() {
      if (this.form.applyData.length >= 20) {
        return this.$message({
          message: '最多一次申请20种包',
          type: 'warning'
        })
      }
      let bool = true
      // 判断该包是否已经在购物车
      this.form.applyData.forEach(item => {
        if (item.packet_id === this.applyForm.id) {
          bool = false
        }
      })
      if (!bool) {
        this.$message({
          message: '该包已存在',
          type: 'warning'
        })
        return
      }
      // 无数据
      if (typeof (this.applyForm.applyCount) === 'undefined' || this.applyForm.applyCount === '') {
        this.$message({
          message: '请输入数量',
          type: 'warning'
        })
        return
      }
      // 输入为0
      if (this.applyForm.applyCount === 0) {
        this.$message({
          message: '数量不能为0',
          type: 'warning'
        })
        return
      }
      const applyForm = {
        applyCount: this.applyForm.applyCount,
        busiType: '1',
        packetId: this.applyForm.id
      }
      // 添加购物车
      api.carAddstaff(applyForm).then(response => {
        console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.form.applyData.push({
            id: response.data.id,
            packetName: response.data.packetName,
            packet_id: response.data.packetId,
            apply_count: response.data.applyCount,
            serialNumber: this.applyForm.serialNumber
          })
          console.log(this.form.applyData.length)
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }
      })
      this.show = false
    },
    // 删除购物车
    handleDelete(index, row) {
      api.carDeletestaff(row).then(response => {
        console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.form.applyData.splice(index, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    // 获取旧数据
    getOldData(index, row) {
      this.oldData = row.apply_count
    },
    // 修改数据
    applyChange(index, row) {
      if (this.oldData === row.apply_count) {
        return
      }
      const applyForm = {
        applyCount: row.apply_count,
        packetId: row.packet_id,
        id: row.id
      }
      api.carRevisestaff(applyForm).then(response => {
        console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          row.apply_count = parseInt(row.apply_count)
        }
      })
    },
    // 购物车提交
    onSubmit() {
      if (this.form.applyData.length === 0) {
        this.$message({
          message: '提交申请为空',
          type: 'warning'
        })
        return
      } else {
        const shopCarIds = []
        this.form.applyData.forEach((item) => {
          shopCarIds.push(item.id)
        })
        /* const form = {
          shopCarIds
        }
        console.log(form)
        console.log(form) */

        this.buttonLoading = true
        // 提交购物车
        api.toApplyGoods({
          applyType: this.form.applyType,
          shopCarIds: shopCarIds,
          urgentFlag: this.form.urgentFlag }).then(response => {
          console.log(response)
          if (response.code === '200' && response.data.busiCode === '1') {
            this.buttonLoading = false
            this.$message({
              message: '提交申请成功',
              type: 'success'
            })
          }
        })
      }
      this.form.applyData = [] // 清空购物车
      this.$router.back(-1)
    },
    contentChange(content) {
      this.$set(this.conditions, 'pageNo', 1)
      this.tableLoading = true
      api
        .topacketPage(this.conditions)
        .then(response => {
          // console.log(response)
          if (response.code === '200' && response.data.busiCode === '1') {
            this.totalCount = response.data.totalCount
            this.tableData = response.data.records
            this.tableLoading = false
          }
        })
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.apply-contaniner {
  padding: 30px 20px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 50px);
}
::v-deep .box {
  background: rgba(255, 255, 255, 1);
  box-shadow: 4px 4px 40px 0px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 20px 30px;
  margin-bottom: 20px;
  position: relative;
  .title {
    font-size: 18px;
    color: rgba(153, 153, 153, 1);
    line-height: 24px;
  }
}
::v-deep .el-form-item__label {
  font-weight: normal;
  text-align: left;
}
.delete-icon {
  font-size: 24px;
  cursor: pointer;
  margin-right: 20px;
}
.template-button {
  display: inline-block;
  color: #409eff;
  margin-left: 50px;
  transform: translateY(15px);
  cursor: pointer;
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
.search-input {
  width: 25%;
  margin-right: 10px;
  margin-bottom: 10px;
}

.dialog-main-box {
  position: relative;
  height: 500px;
  background: rgba(246, 246, 246, 1);
  border: 1px dotted rgba(175, 179, 192, 1);
  padding: 20px 25px;
}
::v-deep .dialog-main .pagination-container {
  position: absolute;
  right: 20px;
  top: 32px;
}
</style>
