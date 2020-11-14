<template>
  <div v-loading="listLoading" class="preview-container">
    <el-row>
      <el-col :xs="24" :sm="24" :md="{span: 18, offset: 3}" class="preview-main">
        <div class="title">{{ data.name }}</div>
        <div style="margin-bottom: 20px">
          <div
            v-for="(item, index) in instructionsArr"
            :key="item + index"
            class="content"
          >
            <div v-if="item !== ''">
              <div
                v-if="index !== 0 && instructionsArr[index - 1] === ''"
                class="indentText"
              >
                {{ item }}
              </div>
              <div v-else>
                {{ item }}
              </div>
            </div>
          </div>
        </div>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <div v-if="data.targetType === 1">
            <el-form-item
              v-if="satisfactionData.includes('1')"
              label="您的姓名"
              prop="name"
            >
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item
              v-if="satisfactionData.includes('2')"
              label="您的性别"
              prop="gender"
            >
              <el-radio-group v-model="form.gender">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              v-if="satisfactionData.includes('3')"
              label="您的年龄"
              prop="age"
            >
              <el-input v-model.number="form.age">
                <span slot="suffix">岁</span>
              </el-input>
            </el-form-item>
            <el-form-item
              v-if="satisfactionData.includes('4')"
              label="您的科室"
              prop="department"
            >
              <el-input v-model="form.department" />
            </el-form-item>
            <el-form-item
              v-if="satisfactionData.includes('5')"
              label="联系电话"
              prop="phone"
            >
              <el-input v-model.number="form.phone" />
            </el-form-item>
          </div>
        </el-form>
        <el-form ref="questionForm" :model="questionForm" label-width="0" class="question-form">
          <div v-for="(item, index) in questionForm.questionData" :key="item.title">
            <div class="type-title">
              {{ numberChinese(index) }}、{{ item.title }}
            </div>
            <div v-for="(element, i) in item.question" :key="element.name + i">
              <div class="question">{{ i + 1 }}、{{ element.name }}</div>
              <div v-if="element.type===1" class="answer">
                <el-form-item
                  label=""
                  :prop="'questionData.' + index + '.question.'+ i +'.answer'"
                  :rules="{
                    required: true, message: '请选择', trigger: 'change'
                  }"
                >
                  <el-radio-group v-model="element.answer">
                    <el-radio label="1">很满意</el-radio>
                    <el-radio label="2">满意</el-radio>
                    <el-radio label="3">一般</el-radio>
                    <el-radio label="4">不满意</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div v-else-if="element.type===2" class="input-answer">
                <el-form-item
                  label=""
                  :prop="'questionData.' + index + '.question.'+ i +'.answer'"
                  :rules="{
                    required: true, message: '请输入', trigger: 'blur'
                  }"
                >
                  <el-input
                    v-model="element.answer"
                    type="textarea"
                    resize="none"
                    :autosize="{ minRows: 10 }"
                    placeholder="请输入"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
        <div style="text-align:center">
          <el-button type="primary" :loading="buttonLoading" @click="onSubmit">提交</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data() {
    return {
      allow: true,
      buttonLoading: false,
      listLoading: true,
      satisfactionData: [],
      instructionsArr: [],
      questionForm: { questionData: [] },
      data: {},
      form: {
        answers: []
      },
      url: null,
      rules: {
        name: [
          { required: true, message: '请输入您的姓名', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择您的性别', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入您的年龄', trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字值' }
        ],
        department: [
          { required: true, message: '请输入您的科室', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { type: 'number', message: '联系电话必须为数字值' }
        ]
      }
    }
  },
  created() {
    this.form.questionnaireId = this.$route.query.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api
        .getSatisfactionById({ id: this.$route.query.id })
        .then((response) => {
          if (response.success) {
            this.data = response.resData
            this.instructionsArr = response.resData.explanation
              ? response.resData.explanation.split(' ')
              : ['']
            this.satisfactionData = response.resData.patientSituation
              ? response.resData.patientSituation.split('|')
              : ['']
            this.handleData(response.resData.questions)
            this.listLoading = false
          }
        })
    },
    // 数据处理
    handleData(arr) {
      arr.forEach((v) => {
        const obj = {
          detailId: v.id,
          name: v.name,
          answer: null,
          type: v.type
        }
        let index
        const bool = this.questionForm.questionData.some((j, i) => {
          if (j.title === v.title) {
            index = i
          }
          return j.title === v.title
        })
        if (bool) {
          this.questionForm.questionData[index].question.push(obj)
        } else {
          this.questionForm.questionData.push({
            title: v.title,
            question: [obj]
          })
        }
      })
    },
    numberChinese(num) {
      const chinese = {
        0: '一',
        1: '二',
        2: '三',
        3: '四'
      }
      return chinese[num]
    },
    // 提交
    onSubmit() {
      let valid1 = false
      let valid2 = false
      this.$refs.form.validate((valid) => {
        if (valid) {
          valid1 = true
        }
      })
      this.$refs.questionForm.validate((valid) => {
        if (valid) {
          valid2 = true
        }
      })
      if (valid1 && valid2) {
        if (!this.allow) {
          this.$message({
            message: '请勿重复提交',
            type: 'warning'
          })
          return
        } else {
          this.buttonLoading = true
          this.form.answers = []
          this.questionForm.questionData.forEach(v => {
            v.question.forEach(j => {
              this.form.answers.push({
                detailId: j.detailId,
                answer: j.answer
              })
            })
          })
          api.postSatisfactionAnswer(this.form).then(response => {
            this.buttonLoading = false
            if (response.resData === -1) {
              this.$message({
                message: '该问卷已终止，无法提交',
                type: 'error'
              })
              return
            }
            if (response.success) {
              this.allow = false
              this.$message({
                message: '提交成功',
                type: 'success'
              })
            }
          })
        }
      }
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.preview-container {
  min-height: 100vh;
  background-color: #f0f2f5;
}
.preview-main {
  position: relative;
  background-color: #fff;
  min-height: 100vh;
  padding: 30px 20px;
  .preview-qrcode {
    position: absolute;
    z-index: 1;
    left: -185px;
    top: 20px;
  }
}
.title {
  height: 31px;
  font-size: 24px;
  text-align: center;
  line-height: 31px;
  margin-bottom: 25px;
}
.content {
  font-size: 14px;
  line-height: 24px;
}
::v-deep .el-input__suffix {
  right: 10px;
}
.el-input__suffix span {
  display: inline-block;
  width: 25px;
  text-align: center;
}
.type-title {
  height: 24px;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 20px;
}
.question {
  font-size: 14px;
  margin-left: 37px;
  margin-bottom: 15px;
}
.answer {
  margin-left: 60px;
  margin-bottom: 20px;
}
.input-answer {
  margin-left: 37px;
  margin-bottom: 20px;
}
.preview-button {
  margin-left: 37px;
}
.indentText {
  text-indent: 28px;
}
::v-deep .question-form .el-radio {
  width: 70px;
  margin-bottom: 10px;
}
::v-deep .el-form-item__label {
  font-weight: normal;
}
</style>
