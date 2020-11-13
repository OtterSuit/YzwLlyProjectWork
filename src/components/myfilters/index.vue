<template>
  <div style="margin-bottom:10px">
    <el-form ref="select" :model="select" @submit.native.prevent>
      <el-row type="flex" align="middle" justify="space-between">
        <el-col :span="6">
          <div style="height:40px;line-height:40.8px">
            <span class="title">{{ title }}</span>
            <span class="content">{{ content }}</span>
            <slot name="titleExtent" />
          </div>
        </el-col>
        <el-col :span="18">
          <el-row type="flex" justify="end" :gutter="10">
            <slot name="header-extent" />
            <el-col v-if="chooseCleaningBox" :span="4">
              <el-select v-model="select.cleaningBox" placeholder="清洗框/架" clearable @change="cleaningBoxChange">
                <el-option
                  v-for="(val, key) in CLEAN_RACK"
                  :key="val"
                  :label="val"
                  :value="key"
                />
                <!-- <el-option
                  v-for="item in cleaningBoxOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                /> -->
              </el-select>
            </el-col>
            <el-col v-if="chooseCleaningEquipment" :span="4">
              <el-select v-model="select.cleaningEquipment" placeholder="清洗设备" clearable @change="cleaningEquipmentChange">
                <el-option
                  v-for="(val, key) in CLEAN_POT"
                  :key="val"
                  :label="val"
                  :value="key"
                />
                <!-- <el-option
                  v-for="item in cleaningEquipmentOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                /> -->
              </el-select>
            </el-col>
            <el-col v-if="chooseDepartment" :span="selectSpan">
              <el-select
                v-model="select.department"
                clearable
                :placeholder="selectPlaceholder"
                filterable
                remote
                reserve-keyword
                :remote-method="remoteMethodDepartment"
                :loading="loading"
                @change="departmentChange"
              >
                <el-option
                  v-for="item in departmentOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
              <!-- <el-select v-model="select.department" :placeholder="selectPlaceholder" clearable @change="departmentChange">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select> -->
            </el-col>
            <el-col v-if="chooseType" :span="4">
              <el-select v-model="select.type" placeholder="选择类别" clearable @change="typeChange">
                <!-- <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                /> -->
                <el-option
                  v-for="(val, key) in typeOptions"
                  :key="val"
                  :label="val"
                  :value="key"
                />
              </el-select>
            </el-col>
            <el-col v-if="chooseStatus" :span="4">
              <el-select v-model="select.status" placeholder="选择状态" clearable @change="statusChange">
                <!-- <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                /> -->
                <el-option
                  v-for="(val, key) in statusOptions"
                  :key="val"
                  :label="val"
                  :value="key"
                />
              </el-select>
            </el-col>
            <el-col v-if="searchContent" :span="6">
              <el-input
                ref="contentinput"
                v-model="select.content"
                :type="contentType"
                prefix-icon="el-icon-search"
                clearable
                :placeholder="placeholder"
                class="search-content"
                style="display:inline-block"
                @change="contentChange"
                @input="contentInput"
                @blur="contentBlur"
                @keyup.enter.native="contentEnter"
              />
            </el-col>
            <el-col v-if="chooseDate" :span="4">
              <el-form-item style="margin-bottom:0">
                <el-date-picker
                  v-model="select.time"
                  :type="dateType"
                  :format="format"
                  :value-format="valueFormat"
                  :placeholder="datePlaceholder"
                  @change="dateChange"
                />
              </el-form-item>
            </el-col>
            <slot name="extent" />
            <!-- <el-button v-if="filterButton" type="primary" icon="el-icon-search" @click="filterClick">搜索</el-button> -->
            <el-button v-if="exportButton" type="primary" icon="el-icon-download" @click="exportClick">导出列表</el-button>
            <!-- <el-button v-if="editButton" type="primary" icon="el-icon-edit" @click="editClick">批量修改</el-button> -->
            <!-- <el-button v-if="searchButton" type="primary" @click="searchClick">{{ searchifo }}</el-button> -->
            <el-button v-if="printButton" type="primary" icon="el-icon-printer" @click="printClick">标签打印</el-button>
            <el-button v-if="addButton" :type="buttonType" :icon="addIcon" @click="addClick">{{ addifo }}</el-button>
            <el-button v-if="outboundButton" type="primary" @click="outboundClick">出库</el-button>
            <el-button v-if="backButton" type="grey" icon="el-icon-arrow-left" @click="backClick">返回</el-button>
            <el-dropdown v-if="export1Button" trigger="click" class="dropdown" @command="handleCommand">
              <span class="el-dropdown-link">
                <el-button
                  icon="el-icon-download"
                >导出
                  <i class="el-icon-arrow-down el-icon--right" />
                </el-button>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="{
                    action: 'exportExcel'
                  }"
                >Excel表格</el-dropdown-item>
                <el-dropdown-item
                  :command="{
                    action: 'exportPDF'
                  }"
                >PDF文件</el-dropdown-item>
                <el-dropdown-item
                  :command="{
                    action: 'exportHTML'
                  }"
                >HTML文件</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <slot name="tail-extent" />
          </el-row>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'Myfilters',
  props: {
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
    chooseDepartment: {
      type: Boolean,
      default: false
    },
    /* editButton: {
      type: Boolean,
      default: false
    }, */
    chooseType: {
      type: Boolean,
      default: false
    },
    chooseBoxs: {
      type: Boolean,
      default: false
    },
    chooseEquipment: {
      type: Boolean,
      default: false
    },
    chooseStatus: {
      type: Boolean,
      default: false
    },
    backButton: {
      type: Boolean,
      default: false
    },
    typeOptions: {
      type: Object,
      default() {
        return {}
      }
    },
    statusOptions: {
      type: Object,
      default() {
        return {}
      }
    },
    selectSpan: {
      type: Number,
      default: 4
    },
    selectPlaceholder: {
      type: String,
      default: '选择科室'
    },
    addButton: {
      type: Boolean,
      default: false
    },
    searchContent: {
      type: Boolean,
      default: false
    },
    /* searchButton: {
      type: Boolean,
      default: false
    }, */
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    format: {
      type: String,
      default: ''
    },
    dateType: {
      type: String,
      default: 'date'
    },
    /* searchifo: {
      type: String,
      default: '搜索'
    }, */
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
      default: 3
    },
    /* filterButton: {
      type: Boolean,
      default: false
    }, */
    exportButton: {
      type: Boolean,
      default: false
    },
    export1Button: {
      type: Boolean,
      default: false
    },
    printerButton: {
      type: Boolean,
      default: false
    },
    printButton: {
      type: Boolean,
      default: false
    },
    outboundButton: {
      type: Boolean,
      default: false
    },
    chooseCleaningBox: {
      type: Boolean,
      default: false
    },
    chooseCleaningEquipment: {
      type: Boolean,
      default: false
    },
    buttonType: {
      type: String,
      default: 'primary'
    },
    datePlaceholder: {
      type: String,
      default: '选择日期'
    },
    contentType: {
      type: String,
      default: 'text'
    }
  },
  data() {
    return {
      select: {
        time: null,
        department: '',
        // name: '',
        content: '',
        type: '',
        cleaningBox: '',
        cleaningEquipment: '',
        status: ''
      },
      CLEAN_RACK: null,
      CLEAN_POT: null,
      loading: null,
      departmentOptions: []
    }
  },
  created() {
    const constantCodes = []
    if (this.chooseCleaningBox) {
      constantCodes.push('CLEAN_RACK')
    }
    if (this.chooseCleaningEquipment) {
      constantCodes.push('CLEAN_POT')
    }
    if (constantCodes.length > 0) {
      api.toconstanttypeBatch({
        constantCodes: constantCodes
      }).then(response => {
        constantCodes.forEach(item => {
          this[item] = response.data.constantsDetail[item]
        })
      })
    }
    if (this.chooseDepartment) {
      this.loading = true
      api.todepartmentPage().then(response => {
        console.log(response)
        this.departmentOptions = response.data.records
        this.loading = false
      })
    }
  },
  methods: {
    handleCommand({ action }) {
      this[action]()
    },
    addClick() {
      this.$emit('addClick')
    },
    /* filterClick() {
      this.$emit('filterClick')
    }, */
    exportClick() {
      this.$emit('exportClick')
    },
    exportExcel() {
      this.$emit('exportExcel')
    },
    exportPDF() {
      this.$emit('exportPDF')
    },
    exportHTML() {
      this.$emit('exportHTML')
    },
    /* searchClick() {
      this.$emit('searchClick', this.select)
    }, */
    printClick() {
      this.$emit('printClick')
    },
    printerClick() {
      this.$emit('printerClick')
    },
    dateChange() {
      this.$emit('dateChange', this.select.time)
    },
    contentChange() {
      this.$emit('contentChange', this.select.content)
    },
    contentInput() {
      this.$emit('contentInput', this.select.content)
    },
    departmentChange() {
      this.$emit('departmentChange', this.select.department)
    },
    typeChange() {
      this.$emit('typeChange', this.select.type)
    },
    statusChange() {
      this.$emit('statusChange', this.select.status)
    },
    /* editClick() {
      this.$emit('editClick')
    }, */
    backClick() {
      this.$router.back(-1)
      // this.$emit('backClick')
    },
    outboundClick() {
      this.$emit('outboundClick')
    },
    cleaningBoxChange() {
      this.$emit('cleaningBoxChange', this.select.cleaningBox)
    },
    cleaningEquipmentChange() {
      this.$emit('cleaningEquipmentChange', this.select.cleaningEquipment)
    },
    contentBlur() {
      this.$emit('contentBlur')
    },
    contentEnter() {
      this.$emit('contentEnter')
    },
    remoteMethodDepartment(query) {
      this.loading = true
      api.todepartmentPage({ name: query }).then(response => {
        console.log(response)
        this.departmentOptions = response.data.records
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
// .el-button {
//   width: 100%;
// }
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
// ::v-deep .el-button {
//   padding: 12px 0;
// }
.el-col+.el-button {
  margin-left: 5px;
}
.el-button--goon:focus,
.el-button--goon:hover {
  background: #48D1CC;
  border-color: #48D1CC;
  color: #fff;
}
.el-button--goon:active {
  background-color: #39adab;
  border-color: #39adab;
  color: #fff;
}
.el-button--goon {
  color: #fff;
  background-color: #40C9C6;
  border-color: #40C9C6;
}
</style>
