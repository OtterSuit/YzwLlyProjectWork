<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="任务列表"
      :content="content"
      :choose-date="true"
      :choose-cleaning-box="true"
      format="yyyy.MM.dd"
      placeholder="编码/回收人"
      :search-content="true"
      @contentChange="contentChange"
      @dateChange="dateChange"
      @cleaningBoxChange="cleaningBoxChange"
    />
    <!-- 头部 end -->
    <!-- table -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column prop="cleaningBox" label="清洗框/架" />
      <el-table-column prop="code" label="编码" />
      <el-table-column prop="person" label="回收人" />
      <el-table-column prop="time" label="回收时间" width="180" />
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div :class="stateColor(scope.row.state)">
            <i :class="stateIcon(scope.row.state)" />
            {{ state(scope.row.state) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            slot="reference"
            size="mini"
            type="primary"
            @click="handleShow(scope.$index, scope.row)"
          >清洗</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <!-- 弹窗 -->
    <el-dialog v-el-drag-dialog title="清洗消毒" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <div class="dialog-cleaningBox dialog-content">{{ tableData[editIndex].cleaningBox }}</div>
        <div class="dialog-code dialog-content">{{ tableData[editIndex].code }}</div>
        <el-form ref="form" :model="form" label-width="70px" :rules="rules">
          <el-row type="flex" justify="space-between">
            <el-col :span="18" :offset="3">
              <el-form-item label="清洗设备" prop="cleaningEquipment">
                <el-select v-model="form.cleaningEquipment" placeholder>
                  <el-option
                    v-for="item in cleaningEquipment"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="18" :offset="3">
              <el-form-item label="清洗程序" prop="cleaningProgram">
                <el-select v-model="form.cleaningProgram" placeholder>
                  <el-option
                    v-for="item in cleaningProgram"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="show=false">取消</el-button>
        <el-button type="primary" @click="cleanSubmit">确认</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗end -->
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
      form: {
        cleaningEquipment: '',
        cleaningProgram: ''
      },
      rules: {
        cleaningEquipment: [
          { required: true, message: '请选择清洗设备', trigger: 'blur' }
        ],
        cleaningProgram: [
          { required: true, message: '请选择清洗程序', trigger: 'blur' }
        ]
      },
      editIndex: 0,
      show: false,
      type: '清洗框/架',
      cleaningEquipment: [
        {
          value: '清洗机01',
          label: '清洗机01'
        },
        {
          value: '清洗机02',
          label: '清洗机02'
        }
      ],
      cleaningProgram: [
        {
          value: '清洗程序112',
          label: '清洗程序112'
        },
        {
          value: '清洗程序113',
          label: '清洗程序113'
        }
      ],
      tableData: [
        {
          cleaningBox: '架01',
          code: 'MJJ001',
          person: '赵美丽',
          time: '2020.08.10 09:45:32',
          state: '2'
        },
        {
          cleaningBox: '架02',
          code: 'MJJ002',
          person: '赵美丽',
          time: '2020.08.10 16:34:54',
          state: '2'
        }
      ]
    }
  },
  computed: {
    // 计算tableData有几条数据
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  methods: {
    // 清洗弹窗确认按钮
    cleanSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$message({
            message: '清洗成功',
            type: 'success'
          })
          this.show = false
          this.tableData[this.editIndex].state = '1'
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    // 表格右侧清洗按钮
    handleShow(index, row) {
      this.editIndex = index
      this.show = true
    },
    // 状态标签文字
    state(state) {
      const stateMap = {
        '1': '已清洗',
        '2': '等待清洗'
      }
      return stateMap[state]
    },
    // 状态的icon
    stateIcon(state) {
      const stateMap = {
        '1': 'el-icon-success',
        '2': 'el-icon-time'
      }
      return stateMap[state]
    },
    // 状态颜色
    stateColor(state) {
      const stateMap = {
        '1': 'success-color',
        '2': 'base-color'
      }
      return stateMap[state]
    },
    // 输入框改变
    contentChange(content) {
      console.log(content)
    },
    // 时间改变
    dateChange(date) {
      console.log(date)
    },
    // 清洗框改变
    cleaningBoxChange(cleaningBox) {
      console.log(cleaningBox)
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
.dialog-content {
  text-align: center;
}
.dialog-cleaningBox {
  font-size: 24px;
  line-height: 31px;
  margin-top: 22px;
}
.dialog-code {
  font-size: 14px;
  color: rgba(153, 153, 153, 1);
  line-height: 19px;
  margin-top: 11px;
  margin-bottom: 58px;
}
.dialog-main {
  height: 420px;
}
::v-deep .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before,
::v-deep .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
  display: none;
}
</style>
