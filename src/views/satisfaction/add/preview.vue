<template>
  <div class="preview-container">
    <!-- <div ref="qrCodeUrl" class="qrcode" /> -->
    <el-row>
      <el-col :span="12" :offset="6" class="preview-main">
        <div class="title">{{ data.name }}</div>
        <div style="margin-bottom:20px">
          <div v-for="(item,index) in instructionsArr" :key="item+index" class="content">
            <div v-if="item!==''">
              <div v-if="index!==0&&instructionsArr[index-1]===''" class="indentText">
                {{ item }}
              </div>
              <div v-else>
                {{ item }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="data.targetType===1">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item v-if="data.patientSituation.includes(1)" label="您的姓名">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item v-if="data.patientSituation.includes(2)" label="您的性别">
              <el-radio-group v-model="form.gender">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="data.patientSituation.includes(3)" label="您的年龄">
              <el-input v-model="form.age">
                <span slot="suffix">岁</span>
              </el-input>
            </el-form-item>
            <el-form-item v-if="data.patientSituation.includes(4)" label="您的科室">
              <el-input v-model="form.department" />
            </el-form-item>
            <el-form-item v-if="data.patientSituation.includes(5)" label="联系电话">
              <el-input v-model="form.phone" />
            </el-form-item>
          </el-form>
        </div>
        <div v-for="(item,index) in questionData" :key="item.title">
          <div class="type-title">{{ numberChinese(index) }}、{{ item.title }}</div>
          <div v-for="(element,i) in item.question" :key="element.name">
            <div v-if="element.choose">
              <div class="question">
                {{ i+1 }}、{{ element.name }}
              </div>
              <div v-if="element.type===1" class="answer">
                <el-radio-group v-model="element.answer">
                  <el-radio :label="1">很满意</el-radio>
                  <el-radio :label="2">满意</el-radio>
                  <el-radio :label="3">一般</el-radio>
                  <el-radio :label="4">不满意</el-radio>
                </el-radio-group>
              </div>
              <div v-else-if="element.type===2" class="input-answer">
                <el-input
                  v-model="element.answer"
                  type="textarea"
                  resize="none"
                  :autosize="{ minRows: 10}"
                  placeholder="请输入"
                />
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      instructionsArr: [],
      questionData: [],
      data: {},
      form: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      if (localStorage.getItem('satisfaction')) {
        this.data = JSON.parse(localStorage.getItem('satisfaction'))
      } else {
        this.$message({
          message: '请先完成第一步：问卷设置。',
          type: 'warning'
        })
        this.$router.push({
          name: 'step1'
        })
        return
      }
      if (localStorage.getItem('question')) {
        JSON.parse(localStorage.getItem('question')).forEach(v => {
          const obj = {
            title: v.title,
            question: []
          }
          v.question.forEach(j => {
            if (j.choose) {
              obj.question.push(j)
            }
          })
          this.questionData.push(obj)
        })
      } else {
        this.$message({
          message: '请先完成第二步：设置问卷问题。',
          type: 'warning'
        })
        this.$router.push({
          name: 'step2'
        })
        return
      }
      this.instructionsArr = this.data.explanation.split(' ')
    },
    numberChinese(num) {
      const chinese = {
        0: '一',
        1: '二',
        2: '三',
        3: '四'
      }
      return chinese[num]
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.preview-container {
  min-height: calc(100vh - 84px);
  background-color: #F0F2F5;
}
.preview-main {
  background-color: #fff;
  min-height: calc(100vh - 84px);
  padding: 30px 20px;
}
.title {
  height:31px;
  font-size:24px;
  text-align: center;
  line-height:31px;
  margin-bottom: 25px;
}
.content {
  font-size:14px;
  line-height:24px;
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
  height:24px;
  font-size:18px;
  line-height:24px;
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
.indentText{
  text-indent:28px;
}
</style>
