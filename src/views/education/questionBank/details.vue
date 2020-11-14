<template>
  <div v-loading="listLoading" class="question-main">
    <myfilters
      :title="titleText"
      :content="content"
      :add-button="true"
      :search-content="true"
      placeholder="题目关键字"
      :add-span="3"
      @addClick="addClick"
      @contentChange="contentChange"
    />
    <mybox v-if="total===0">
      <div class="no-data">
        暂无数据
      </div>
    </mybox>
    <mybox
      v-for="(item, index) in tableData"
      :key="item.question"
      :edit-box-show="true"
      @editClick="handleEdit(index, item)"
    >
      <div class="question">
        {{ index + 1 }}.【{{ itemType[conditions.itemType] }}】{{ item.itemName }}
      </div>
      <div
        v-if="conditions.itemType === 1 || conditions.itemType === 2"
        class="select"
      >
        <div
          v-for="(optionItem,i) in options"
          :key="i"
          class="answer"
        >
          {{ optionItem.label }}.&nbsp;&nbsp;{{ item[optionItem.model] }}
          <span
            v-if="item.reference.toUpperCase().indexOf(optionItem.label) !== -1"
            class="correct"
          >【答案】</span>
        </div>
      </div>
      <div v-if="conditions.itemType === 3" class="blank">
        <div class="correct">参考答案：</div>
        <div class="answer">{{ item.reference }}</div>
      </div>
    </mybox>
    <my-pagination :total="total" methods="getQuestionDetails" background :conditions="conditions" />

    <el-dialog
      title="试题信息"
      :visible.sync="show"
      width="800px"
      :lock-scroll="false"
    >
      <div class="dialog-main add-question">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-row type="flex">
            <el-col :span="24">
              <el-form-item label="题目" prop="itemName">
                <el-input
                  v-model="form.itemName"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="conditions.itemType === 1 || conditions.itemType === 2">
            <el-row v-for="(item,inedx) in options" :key="inedx" type="flex" :gutter="20">
              <el-col :span="20">
                <el-form-item
                  :label="item.name"
                  :prop="item.model"
                  :rules="{
                    required: true, message: '请输入选项', trigger: 'blur'
                  }"
                >
                  <el-input
                    v-model="form[item.model]"
                    placeholder="请输入"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-radio v-if="conditions.itemType===1" v-model="form.reference" :label="item.label">设为答案</el-radio>
                <el-checkbox v-if="conditions.itemType===2" v-model="form.reference" :label="item.label">设为答案</el-checkbox>
              </el-col>
            </el-row>
          </div>
          <div v-else-if="conditions.itemType===3">
            <el-row>
              <el-col :span="24">
                <el-form-item label="参考答案" prop="reference">
                  <el-input
                    v-model="form.reference"
                    placeholder="请输入"
                    :autosize="{ minRows: 10}"
                    resize="none"
                    type="textarea"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="show = false">取消</el-button>
        <el-button v-show="!edit" type="primary" @click="addSubmit">确认</el-button>
        <el-button v-show="edit" type="primary" @click="editSubmit">确认</el-button>
      </div>
    </el-dialog>
    <fixed-button :visibility-height="100" @btnClick="addClick" />
  </div>
</template>

<script>
import Mybox from '@/components/Mybox'
import myfilters from '@/components/myfilters'
import fixedButton from '@/components/fixedButton'
import MyPagination from '@/components/MyPagination'
import api from '@/api'
export default {
  components: {
    myfilters,
    fixedButton,
    Mybox,
    MyPagination
  },
  inject: ['reload'],
  data() {
    return {
      title: '',
      tableData: [],
      form: {},
      rules: {
        itemName: [
          { required: true, message: '请输入题目', trigger: 'blur' }
        ],
        reference: [
          { required: true, message: '请输入参考答案', trigger: 'blur' }
        ]
      },
      oldForm: {},
      show: false,
      edit: false,
      editIndex: 0,
      conditions: {},
      total: 0,
      listLoading: true,
      itemType: {
        1: '单选题',
        2: '多选题',
        3: '问答题'
      },
      options: [
        {
          name: '选项A',
          model: 'optionA',
          label: 'A'
        },
        {
          name: '选项B',
          model: 'optionB',
          label: 'B'
        },
        {
          name: '选项C',
          model: 'optionC',
          label: 'C'
        },
        {
          name: '选项D',
          model: 'optionD',
          label: 'D'
        }
      ]
    }
  },
  computed: {
    content() {
      return '共' + this.total + '条数据'
    },
    titleText() {
      return `${this.title} ${this.itemType[this.$route.params.type]}库`
    }
  },
  created() {
    this.title = this.$route.params.title
    this.conditions = {
      id: this.$route.params.id,
      itemType: +this.$route.params.type,
      itemName: null
    }
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getQuestionDetails(this.conditions).then((response) => {
        if (response.success) {
          console.log('题库详情：', response)
          this.total = response.resData.totalItems
          this.tableData = response.resData.items
          this.listLoading = false
        }
      })
    },
    // 新增
    addClick() {
      this.edit = false
      this.form = {
        id: this.conditions.id,
        itemType: +this.conditions.itemType,
        itemName: null,
        optionA: null,
        optionB: null,
        optionC: null,
        optionD: null,
        reference: null
      }
      if (this.conditions.itemType === 2) {
        this.form.reference = []
      }
      if (this.conditions.itemType === 1) {
        this.form.reference = 'A'
      }
      this.show = true
    },
    // 确认新增
    addSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.conditions.itemType === 2) {
            if (this.form.reference.length < 2) {
              this.$message({
                message: '多选题答案数量必须大于1',
                type: 'warning'
              })
              return
            } else {
              this.form.reference = this.form.reference.join('')
            }
          }
          api.postQuestionDetails(this.form).then(response => {
            if (response.success) {
              this.reload()
              this.show = false
              this.$message({
                message: '添加试题成功',
                type: 'success'
              })
            }
          })
        }
      })
    },
    // 修改
    handleEdit(index, row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.oldForm = JSON.parse(JSON.stringify(row))
      if (this.conditions.itemType === 2) {
        this.form.reference = this.form.reference.split('')
        this.oldForm.reference = this.oldForm.reference.split('')
      }
      this.edit = true
      this.editIndex = index
      this.show = true
    },
    // 确认修改
    editSubmit() {
      if (this.conditions.itemType === 2) {
        if (this.form.reference.length < 2) {
          this.$message({
            message: '多选题答案数量必须大于1',
            type: 'warning'
          })
          return
        } else {
          this.form.reference = this.form.reference.join('')
        }
      }
      this.show = false
      if (JSON.stringify(this.form) === JSON.stringify(this.oldForm)) {
        this.$message('无信息修改')
        return
      }
      api.putQuestionDetails(this.form).then(response => {
        if (response.success) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.tableData.splice(this.editIndex, 1, this.form)
        }
      })
    },
    // 头部输入框
    contentChange(content) {
      this.$set(this.conditions, 'itemName', content)
      this.$set(this.conditions, 'PageIndex', 1)
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.question-main {
  padding: 30px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 84px);
}
.question {
  font-size: 18px;
  color: rgba(102, 102, 102, 1);
  line-height: 24px;
}

.answer {
  font-size: 14px;
}
.correct {
  color: #29c06d;
}
.select {
  .answer {
    margin-top: 20px;
    margin-left: 5px;
  }
  .correct {
    margin-left: 10px;
  }
}
.blank {
  .answer {
    line-height: 24px;
  }
  .correct {
    margin: 20px 0 10px;
  }
}
.no-data {
  text-align: center;
  font-size: 22px;
  color: #999;
  margin: 20px 0;
}
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
::v-deep .add-question .el-col-4 {
  line-height: 40px;
}
</style>
