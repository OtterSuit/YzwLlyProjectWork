<template>
  <div>
    <div class="table" style="padding:30px">
      <!-- 头部 -->
      <myfilters
        :title="title"
        :add-button="true"
        :back-button="true"
        addifo="添加"
        add-icon="el-icon-circle-plus-outline"
        @addClick="addClick"
      />
      <!-- 头部end -->
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
        <el-table-column
          label="物品名称"
          prop="name"
        />
        <el-table-column
          label="自定义码"
          prop="customCode"
        />
        <el-table-column
          label="规格"
          prop="unit"
        />
        <el-table-column
          label="数量"
        >
          <template slot-scope="scope">
            <span v-show="scope.row.edit===false"> {{ scope.row.number }}</span>
            <el-input v-show="scope.row.edit===true" v-model="scope.row.number" class="edit-input" />
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
    </div>
    <!-- 添加弹窗 -->
    <el-dialog ref="goodsDialog" v-el-drag-dialog title="物品信息" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-scrollbar>
          <div class="scrollbar-form">
            <el-input v-model="name" class="search-button" />
            <el-button icon="el-icon-search" type="primary">搜索</el-button>
            <el-table
              ref="goods"
              :data="goodsData"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="55"
              />
              <el-table-column
                label="物品名称"
                prop="name"
              />
              <el-table-column
                label="拼音码"
                prop="pinyinWriting"
              />
              <el-table-column
                label="五笔码"
                prop="wubingWriting"
              />
              <el-table-column
                label="自定义码"
                prop="customCode"
              />
              <el-table-column
                label="规格"
                prop="unit"
              />
            </el-table>
          </div>
        </el-scrollbar>
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

export default {
  components: {
    myfilters
  },
  data() {
    return {
      name: '',
      form: {
        type: '',
        name: '',
        number: '',
        unit: '',
        loss: '',
        damage: ''
      },
      tableData: [
        {
          name: '弯钳',
          customCode: 'wq15464',
          unit: '把',
          number: '2'
        },
        {
          name: '尖剪',
          customCode: 'jj165464',
          unit: '把',
          number: '1'
        }
      ],
      goodsData: [
        {
          name: '弯钳',
          pinyinWriting: 'wq',
          wubingWriting: 'wq',
          customCode: 'wq',
          unit: '把'
        },
        {
          name: '尖剪',
          pinyinWriting: 'jj',
          wubingWriting: 'jj',
          customCode: 'jj',
          unit: '把'
        },
        {
          name: '小直钳',
          pinyinWriting: 'xzq',
          wubingWriting: 'xzq',
          customCode: 'xzq',
          unit: '把'
        },
        {
          name: '正畸剪',
          pinyinWriting: 'zjj',
          wubingWriting: 'zjj',
          customCode: 'zjj',
          unit: '把'
        },
        {
          name: '压舌板',
          pinyinWriting: 'ysb',
          wubingWriting: 'ysb',
          customCode: 'ysb',
          unit: '把'
        },
        {
          name: '无齿镊',
          pinyinWriting: 'wcq',
          wubingWriting: 'wcq',
          customCode: 'wcq',
          unit: '把'
        },
        {
          name: '孔巾',
          pinyinWriting: 'kj',
          wubingWriting: 'kj',
          customCode: 'kj',
          unit: '把'
        }
      ],
      select: [],
      show: false,
      title: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 设置tableData的edit属性为false
    fetchData() {
      this.tableData.forEach(item => {
        this.$set(item, 'edit', false)
      })
      this.title = this.$route.params.title
    },
    // 保存按钮
    saveClick(index, row) {
      row.edit = false
      this.$message({
        message: '保存成功',
        type: 'success'
      })
    },
    // 弹窗左侧checkbox改变
    handleSelectionChange(val) {
      this.select = val
    },
    // 删除
    handleDelete(index, row) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.tableData.splice(index, 1)
    },
    // 添加按钮
    addClick() {
      this.show = true
      if (this.$refs.goods) {
        this.$refs.goods.clearSelection()
      }
    },
    // 添加弹窗确认按钮
    addSubmit() {
      if (this.select.length === 0) {
        this.$message({
          message: '请至少选择一种物品',
          type: 'warning'
        })
      } else {
        const name = []
        this.select.forEach(item => {
          this.tableData.forEach(element => {
            if (item.name === element.name) {
              name.push(item.name)
            }
          })
        })
        if (name.length > 0) {
          this.$message({
            message: name.join('、') + '已存在',
            type: 'warning'
          })
        } else {
          this.select.forEach(item => {
            this.$set(item, 'number', 1)
            this.$set(item, 'edit', false)
            this.tableData.push(item)
          })
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.show = false
        }
      }
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .edit-input .el-input__inner {
  height: 28px;
}
.dialog-main {
  padding: 0 0 20px;
  overflow-y: hidden;
}
.search-button {
  width: 25%;
  margin-right: 10px;
  margin-bottom: 10px;
}
::v-deep .scrollbar-form {
  padding-top: 20px;
}
</style>
