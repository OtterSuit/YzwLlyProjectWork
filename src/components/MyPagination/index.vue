<template>
  <div class="pagination-container">
    <el-pagination
      class="page"
      :background="background"
      hide-on-single-page
      :page-size="pageSize"
      :pager-count="pagerCount"
      :layout="layout"
      :total="total"
      :current-page.sync="page"
      @current-change="currentChange"
    />
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'MyPagination',
  props: {
    background: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 20
    },
    pagerCount: {
      type: Number,
      default: 5
    },
    layout: {
      type: String,
      default: 'prev, pager, next'
    },
    total: {
      type: Number,
      default: null
    },
    methods: {
      type: String,
      default: ''
    },
    conditions: {
      type: Object,
      default() {
        return {}
      }
    },
    loading: {
      type: String,
      default: 'listLoading'
    },
    records: {
      type: Array,
      default() {
        return ['data', 'records']
      }
    },
    pageNo: {
      type: String,
      default: 'pageNo'
    },
    tableData: {
      type: Array,
      default() {
        return ['tableData']
      }
    }
  },
  data() {
    return {
      page: 1
    }
  },
  watch: {
    total: {
      handler(val) {
        this.page = 1
      }
    }
  },
  methods: {
    currentChange(page) {
      const conditions = this.conditions
      conditions[this.pageNo] = page // 设置页数
      conditions.pageSize = this.pageSize // 设置页面数据量

      this.$parent[this.loading] = true // 父组件table loading

      api[this.methods](conditions).then(response => {
        let tableData = this.$parent
        console.log(tableData)
        this.tableData.forEach(item => {
          tableData = tableData[item]
        })
        // console.log(tableData)
        // tableData = response.data[this.records] // 修改父组件table数据
        let records = response
        this.records.forEach(item => {
          records = records[item]
        })
        tableData.splice(0, tableData.length, ...records)
        this.$parent[this.loading] = false // 父组件table loading
      })
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.pagination-container {
  text-align: center;
  margin-top: 10px;
}
</style>
