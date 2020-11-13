<template>
  <div>
    <div class="table" style="padding:30px">
      <!-- 头部 -->
      <myfilters
        title="包明细"
        :add-button="true"
        :back-button="true"
        addifo="添加"
        @addClick="addClick"
      />
      <!-- 头部end -->
      <!-- table -->
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
          label="物品编码"
          prop="itemCode"
        />
        <el-table-column
          label="物品名称"
          prop="name"
        />
        <el-table-column
          label="数量"
        >
          <template slot-scope="scope">
            <span v-show="scope.row.edit===false"> {{ scope.row.itemQuantity }}</span>
            <el-input v-show="scope.row.edit===true" v-model="scope.row.itemQuantity" class="edit-input" />
          </template>
        </el-table-column>
        <el-table-column width="200">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.edit===true"
              slot="reference"
              size="mini"
              style="margin-right:5px"
              icon="el-icon-check"
              @click="saveClick(scope.$index, scope.row)"
            >保存</el-button>
            <el-button
              v-show="scope.row.edit===false"
              slot="reference"
              size="mini"
              style="margin: 0 5px 0 0"
              icon="el-icon-edit-outline"
              @click="scope.row.edit=true"
            >编辑</el-button>
            <el-popconfirm
              icon-color="red"
              title="确认删除吗"
              @onConfirm="handleDelete(scope.$index, scope.row)"
            >
              <el-button
                slot="reference"
                size="mini"
                icon="el-icon-delete"
              >删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- table end -->
      <my-pagination :total="totalCount" methods="toconpacketdetailPage" :conditions="conditions" />
    </div>
    <!-- 添加弹窗 -->
    <el-dialog ref="goodsDialog" v-el-drag-dialog title="物品信息" :visible.sync="show" width="95%">
      <div class="dialog-main">
        <div class="dialog-main-box">
          <el-input v-model="goodsConditions.keyword" class="search-input" placeholder="物品名称/编码" @keyup.enter.native="contentChange" />
          <el-button icon="el-icon-search" type="primary" @click="contentChange">搜索</el-button>
          <my-pagination :background="true" :total="goodsCount" :page-size="5" methods="toconsuppliesPage" :table-data="['$parent','goods']" loading="goodsLoading" :conditions="goodsConditions" />
          <div style="height:410px">
            <el-table v-loading="goodsLoading" :data="goodsData" style="width: 100%" class="hidden-table">
              <el-table-column label="选择" align="center" width="100" />
              <el-table-column label="物品编码" />
              <el-table-column label="物品名称" />
              <el-table-column label="数量" />
            </el-table>
            <el-scrollbar style="height:360px;background: #fff">
              <el-table ref="goods" v-loading="goodsLoading" :data="goodsData" style="width: 100%" :show-header="false" @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="100"
                  align="center"
                />
                <el-table-column label="物品编码" prop="itemCode" />
                <el-table-column label="物品名称" prop="name" />
                <el-table-column label="数量">
                  <template slot-scope="scope">
                    <el-input v-model.number="scope.row.itemQuantity" placeholder="请输入数量" style="width:90%" :disabled="select.includes(scope.row)?false:true" />
                  </template>
                </el-table-column>
              </el-table>
            </el-scrollbar>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSubmit">确认</el-button>
      </div>
    </el-dialog>
    <!-- 添加弹窗end -->
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
  inject: ['reload'],
  data() {
    return {
      listLoading: true,
      goodsLoading: true,
      form: {},
      tableData: [],
      goods: [],
      goodsData: [],
      select: [],
      show: false,
      id: '',
      totalCount: 0,
      conditions: {
        packetId: null
      },
      goodsConditions: {
        keyword: null,
        pageNo: 1,
        pageSize: 5
      },
      goodsCount: null
    }
  },
  watch: {
    tableData: {
      deep: true,
      handler(val) {
        this.tableData.forEach(item => {
          if (!item.edit) {
            this.$set(item, 'edit', false)
          }
        })
      }
    },
    goods: {
      deep: true,
      handler(val) {
        this.goodsData = []
        this.goods.forEach(item => {
          const obj = {
            packetId: this.$route.query.packetId,
            itemId: item.id,
            name: item.name,
            itemCode: item.itemCode,
            itemQuantity: null
          }
          this.goodsData.push(obj)
        })
      }
    }
  },
  created() {
    this.id = this.$route.query.packetId
    this.conditions.packetId = this.$route.query.packetId
    this.fetchData()
  },
  methods: {
    // 设置tableData的edit属性为false,获取数据
    fetchData() {
      this.listLoading = true
      this.goodsLoading = true
      api.toconpacketdetailPage(this.$route.query).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          this.totalCount = response.data.totalCount
          // console.log(response)
          this.tableData = response.data.records
          this.tableData.forEach(item => {
            this.$set(item, 'edit', false)
          })
          this.listLoading = false
        }
      })
      api.toconsuppliesPage(this.goodsConditions).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.goodsCount = response.data.totalCount
          this.goods = response.data.records
          this.goods.forEach(item => {
            const obj = {
              packetId: this.$route.query.packetId,
              itemId: item.id,
              name: item.name,
              itemCode: item.itemCode,
              itemQuantity: null
            }
            this.goodsData.push(obj)
          })
          this.goodsLoading = false
        }
      })
    },
    // 保存按钮
    saveClick(index, row) {
      api.toRevisepacketdetail(row).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
      row.edit = false
    },
    // 弹窗左侧checkbox改变
    handleSelectionChange(val) {
      this.select = val
    },
    // 删除
    handleDelete(index, row) {
      api.toDeletepacketdetail(row).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.tableData.splice(index, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    // 添加按钮
    addClick() {
      this.show = true
      this.goodsData.forEach(item => {
        this.$set(item, 'itemQuantity', null)
      })
      if (this.$refs.goods) {
        this.$refs.goods.clearSelection()
      }
    },
    // 添加弹窗确认按钮
    addSubmit() {
      if (!this.validation()) {
        return
      }
      api.toAddpacketBatch({ records: this.select }).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          this.reload()
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }
      })
      this.show = false
    },
    validation() {
      if (this.select.length === 0) {
        this.$message({
          message: '请至少选择一种物品',
          type: 'warning'
        })
        return false
      }

      const name = []
      let bool = true
      this.select.forEach(item => {
        if (item.itemQuantity === null) {
          bool = false
          return false
        }
        this.tableData.forEach(element => {
          if (item.name === element.itemName) {
            name.push(item.name)
          }
        })
      })
      if (!bool) {
        this.$message({
          message: '请输入数量',
          type: 'warning'
        })
        return false
      }
      if (name.length > 0) {
        this.$message({
          message: name.join('、') + '已存在',
          type: 'warning'
        })
        return false
      }
      return true
    },
    contentChange(content) {
      this.$set(this.goodsConditions, 'pageNo', 1)
      this.goodsLoading = true
      api
        .toconsuppliesPage(this.goodsConditions)
        .then(response => {
          // console.log(response)
          if (response.code === '200' && response.data.busiCode === '1') {
            this.goodsCount = response.data.totalCount
            this.goods = response.data.records
            this.goods.forEach(item => {
              const obj = {
                packetId: this.$route.query.packetId,
                itemId: item.id,
                name: item.name,
                itemCode: item.itemCode,
                itemQuantity: null
              }
              this.goodsData.push(obj)
            })
            this.goodsLoading = false
          }
        })
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .edit-input .el-input__inner {
  height: 28px;
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
.search-input {
  width: 25%;
  margin-right: 10px;
  margin-bottom: 10px;
}
::v-deep .dialog-main .pagination-container {
  position: absolute;
  right: 20px;
  top: 32px;
}
</style>
