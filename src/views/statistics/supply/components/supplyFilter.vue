// 供应室按科室汇总查询页面表格上方的过滤组件
<template>
  <div style="margin-bottom:10px">
    <el-form ref="select" :model="select">
      <el-row type="flex" align="middle" justify="space-between">
        <el-col :span="6">
          <div style="height:40px;line-height:40.8px">
            <span class="title">{{ title }}</span>
          </div>
        </el-col>
        <el-col :span="18">
          <el-row type="flex" justify="end" :gutter="20">
            <el-col :span="8">
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="dateChange"
              />
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="refresh">刷新</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'OffsetFilter',
  props: {
    title: {
      type: String,
      default: ''
    },
    valueFormat: {
      type: String,
      default: ''
    },
    format: {
      type: String,
      default: ''
    },
    dateType: {
      type: String,
      default: 'date'
    }
  },
  data() {
    return {
      value1: '',
      select: {
        time: Date.now(),
        name: ''
      }
    }
  },
  methods: {
    refresh() {
      this.$emit('refresh')
    },
    dateChange() {
      this.$emit('dateChange')
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.el-button {
  width: 100%;
}
.title {
font-size:18px;
}
::v-deep .el-button {
  padding: 12px 0;
}
</style>
