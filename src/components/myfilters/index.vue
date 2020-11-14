<template>
  <div style="margin-bottom:10px">
    <el-form ref="select" :model="select" @submit.native.prevent>
      <el-row type="flex" align="middle" justify="space-between">
        <el-col :span="6" style="white-space: nowrap;">
          <div style="height:40px;line-height:40.8px">
            <span class="title">{{ title }}</span>
            <span class="content">{{ content }}</span>
            <slot name="titleExtent" />
          </div>
        </el-col>
        <el-col :span="18">
          <el-row type="flex" justify="end" :gutter="10">
            <el-col v-if="chooseType" :span="4">
              <el-select v-model="select.type" :placeholder="typePlaceholder" clearable @change="typeChange">
                <el-option
                  v-for="(val, key) in typeOptions"
                  :key="val"
                  :label="val"
                  :value="key"
                />
              </el-select>
            </el-col>
            <el-col v-if="chooseDepartment" :span="selectSpan">
              <remote-select :remote-placeholder="selectPlaceholder" methods="getOrganizes" @remoteChange="departmentChange" />
            </el-col>
            <el-col v-if="chooseStatus" :span="4">
              <el-select v-model="select.status" placeholder="请选择状态" clearable @change="statusChange">
                <el-option label="已审核状态" value="4" />
                <el-option label="未审核状态" value="2" />
                <el-option label="被驳回状态" value="3" />
                <el-option label="未填写状态" value="1" />
              </el-select>
            </el-col>
            <slot name="extent" />
            <el-col v-if="chooseDate" :span="4">
              <el-form-item style="margin-bottom:0">
                <el-date-picker
                  v-model="select.time"
                  :type="dateType"
                  :format="format"
                  :clearable="dateClearable"
                  :value-format="valueFormat"
                  placeholder="请选择日期"
                  @change="dateChange"
                />
              </el-form-item>
            </el-col>
            <el-col v-if="searchName" :span="4">
              <el-form-item style="margin-bottom:0">
                <el-input v-model="select.name" placeholder="请输入搜索姓名" @change="nameChange" />
              </el-form-item>
            </el-col>
            <el-col v-if="searchContent" :span="6">
              <el-input
                v-model="select.content"
                :placeholder="placeholder"
                clearable
                class="search-content"
                style="display:inline-block"
                @change="contentChange"
              />
            </el-col>
            <slot name="extent2" />
            <el-button v-if="searchButton" type="primary" @click="searchClick">{{ searchifo }}</el-button>
            <el-button v-if="addButton" type="primary" :icon="addIcon" @click="addClick">{{ addifo }}</el-button>
            <el-button v-if="backButton" type="grey" icon="el-icon-arrow-left" @click="backClick">返回</el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import RemoteSelect from '../RemoteSelect'
export default {
  name: 'Myfilters',
  components: {
    RemoteSelect
  },
  props: {
    dateClearable: {
      type: Boolean,
      default: true
    },
    typePlaceholder: {
      type: String,
      default: '选择类别'
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    addifo: {
      type: String,
      default: '新增'
    },
    chooseDate: {
      type: Boolean,
      default: false
    },
    searchName: {
      type: Boolean,
      default: false
    },
    chooseDepartment: {
      type: Boolean,
      default: false
    },
    chooseStatus: {
      type: Boolean,
      default: false
    },
    typeOptions: {
      type: Object,
      default() {
        return {}
      }
    },
    chooseType: {
      type: Boolean,
      default: false
    },
    selectSpan: {
      type: Number,
      default: 4
    },
    selectPlaceholder: {
      type: String,
      default: '请输入科室'
    },
    addButton: {
      type: Boolean,
      default: false
    },
    searchContent: {
      type: Boolean,
      default: false
    },
    backButton: {
      type: Boolean,
      default: false
    },
    searchButton: {
      type: Boolean,
      default: false
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
    },
    searchifo: {
      type: String,
      default: '搜索'
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    addIcon: {
      type: String,
      default: 'el-icon-circle-plus-outline'
    },
    addSpan: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      select: {
        time: '',
        name: '',
        content: '',
        status: '',
        type: ''
      }
    }
  },
  methods: {
    addClick() {
      this.$emit('addClick')
    },
    searchClick() {
      this.$emit('searchClick', this.select)
    },
    dateChange() {
      this.$emit('dateChange', this.select.time)
    },
    departmentChange(department) {
      this.$emit('departmentChange', department)
    },
    statusChange() {
      this.$emit('statusChange', this.select.status)
    },
    contentChange() {
      this.$emit('contentChange', this.select.content)
    },
    nameChange() {
      this.$emit('nameChange', this.select.name)
    },
    typeChange(type) {
      if (type === '') {
        this.select.type = null
      }
      this.$emit('typeChange', this.select.type)
    },
    backClick() {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.title {
font-size:18px;
}
.content {
  margin-left: 5px;
  font-size:12px;
  display: inline-block;
  transform: translateY(1px);
  color:#999;
}
.el-col+.el-button {
  margin-left: 5px;
}
</style>
