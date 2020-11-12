<template>
  <div style="margin-bottom:10px">
    <el-form ref="select" :model="select">
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
              <el-select v-model="select.cleaningBox" placeholder="清洗框/架" @change="cleaningBoxChange">
                <el-option
                  v-for="item in cleaningBoxOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col v-if="chooseCleaningEquipment" :span="4">
              <el-select v-model="select.cleaningEquipment" placeholder="清洗设备" @change="cleaningEquipmentChange">
                <el-option
                  v-for="item in cleaningEquipmentOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col v-if="chooseDepartment" :span="selectSpan">
              <el-select v-model="select.department" :placeholder="selectPlaceholder" @change="departmentChange">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col v-if="chooseStatus" :span="4">
              <el-select v-model="select.status" placeholder="请选择类别" @change="statusChange">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col v-if="chooseStates" :span="4">
              <el-select v-model="select.states" placeholder="请选择状态" @change="statesChange">
                <el-option
                  v-for="item in statesOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col v-if="searchContent" :span="6">
              <el-input
                v-model="select.content"
                :placeholder="placeholder"
                class="search-content"
                style="display:inline-block"
                @change="contentChange"
              />
            </el-col>
            <el-col v-if="chooseDate" :span="4">
              <el-form-item style="margin-bottom:0">
                <el-date-picker
                  v-model="select.time"
                  :type="dateType"
                  :clearable="false"
                  :format="format"
                  :value-format="valueFormat"
                  placeholder="请选择日期"
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
      default: ''
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
    chooseStatus: {
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
    chooseStates: {
      type: Boolean,
      default: false
    },
    backButton: {
      type: Boolean,
      default: false
    },
    statusOptions: {
      type: Array,
      default() {
        return [
          {
            value: '全部类别',
            label: '全部类别'
          },
          {
            value: '回收申请单',
            label: '回收申请单'
          },
          {
            value: '还物申请单',
            label: '还物申请单'
          },
          {
            value: '退货申请单',
            label: '退货申请单'
          }
        ]
      }
    },
    options: {
      type: Array,
      default() {
        return [
          {
            value: '全部科室',
            label: '全部科室'
          },
          {
            value: '内科',
            label: '内科'
          },
          {
            value: '儿科',
            label: '儿科'
          },
          {
            value: '妇科',
            label: '妇科'
          },
          {
            value: '耳鼻咽喉科',
            label: '耳鼻咽喉科'
          },
          {
            value: '男科',
            label: '男科'
          },
          {
            value: '外科',
            label: '外科'
          }
        ]
      }
    },
    boxsOptions: {
      type: Array,
      default() {
        return [
          {
            value: '内科',
            label: '内科'
          },
          {
            value: '儿科',
            label: '儿科'
          },
          {
            value: '妇科',
            label: '妇科'
          },
          {
            value: '耳鼻咽喉科',
            label: '耳鼻咽喉科'
          },
          {
            value: '男科',
            label: '男科'
          },
          {
            value: '外科',
            label: '外科'
          }
        ]
      }
    },
    equipmentOptions: {
      type: Array,
      default() {
        return [
          {
            value: '内科',
            label: '内科'
          },
          {
            value: '儿科',
            label: '儿科'
          },
          {
            value: '妇科',
            label: '妇科'
          },
          {
            value: '耳鼻咽喉科',
            label: '耳鼻咽喉科'
          },
          {
            value: '男科',
            label: '男科'
          },
          {
            value: '外科',
            label: '外科'
          }
        ]
      }
    },
    statesOptions: {
      type: Array,
      default() {
        return [
          {
            value: '全部状态',
            label: '全部状态'
          },
          {
            value: '正常',
            label: '正常'
          },
          {
            value: '已作废',
            label: '已作废'
          },
          {
            value: '已上架',
            label: '已上架'
          },
          {
            value: '已下架',
            label: '已下架'
          }
        ]
      }
    },
    selectSpan: {
      type: Number,
      default: 4
    },
    selectPlaceholder: {
      type: String,
      default: '请选择科室'
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
      default: ''
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
    cleaningBoxOptions: {
      type: Array,
      default() {
        return [
          {
            value: '清洗框/架',
            label: '清洗框/架'
          },
          {
            value: '架01',
            label: '架01'
          },
          {
            value: '架02',
            label: '架02'
          }
        ]
      }
    },
    cleaningEquipmentOptions: {
      type: Array,
      default() {
        return [
          {
            value: '清洗设备',
            label: '清洗设备'
          },
          {
            value: '清洗机01',
            label: '清洗机01'
          },
          {
            value: '清洗机02',
            label: '清洗机02'
          }
        ]
      }
    },
    buttonType: {
      type: String,
      default: 'primary'
    }
  },
  data() {
    return {
      select: {
        time: Date.now(),
        department: '全部科室',
        // name: '',
        content: '',
        status: '全部类别',
        cleaningBox: '清洗框/架',
        cleaningEquipment: '清洗设备',
        states: '全部状态'
      }
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
    departmentChange() {
      this.$emit('departmentChange', this.select.department)
    },
    statusChange() {
      this.$emit('statusChange', this.select.status)
    },
    statesChange() {
      this.$emit('statesChange', this.select.states)
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
