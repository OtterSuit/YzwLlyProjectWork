<template>
  <div v-loading="listLoading" class="question-main">
    <paper ref="paper" :paper-type="5" :data="data" />

    <el-button :loading="buttonLoading" type="primary" icon="el-icon-circle-check" @click="onSubmit(false)">提交</el-button>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div class="dialog-text ">
        注意：存在未填写的题目<br>
        确认提交吗？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(true)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api'
import paper from '../paper'
export default {
  components: {
    paper
  },
  data() {
    return {
      dialogVisible: false,
      data: {},
      buttonLoading: false,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getEducationExamsDetails({ id: this.$route.params.id }).then(response => {
        if (response.success) {
          this.listLoading = false
          console.log('试卷详细', response)
          this.data = response.resData
          // this.handleData()
          // this.countScore()
        }
      })
    },
    // 提交按钮
    onSubmit(bool) {
      let checkBool = true // 验证是否填写完全
      const arr = []
      if (this.data.hasSingle) {
        this.$refs.paper.viewData.single.forEach(item => {
          arr.push({
            itemBankDetailId: item.id,
            answer: item.answer
          })
          if (item.answer === null) {
            checkBool = false
          }
        })
      }
      if (this.data.hasMultiple) {
        this.$refs.paper.viewData.multiple.forEach(item => {
          arr.push({
            itemBankDetailId: item.id,
            answer: item.answer.join('')
          })
          if (item.answer.length === 0) {
            checkBool = false
          }
        })
      }
      if (this.data.hasQA) {
        this.$refs.paper.viewData.qa.forEach(item => {
          arr.push({
            itemBankDetailId: item.id,
            answer: item.answer
          })
          if (item.answer === null || item.answer.trim() === '') {
            checkBool = false
          }
        })
      }
      // console.log(checkBool)
      if (checkBool || bool) {
        this.dialogVisible = false
        this.sendSubmit(arr)
        // console.log(111)
      } else {
        this.dialogVisible = true
      }
    },
    // 发送提交
    sendSubmit(arr) {
      this.buttonLoading = true
      api.postEducationAnswers(arr, this.$route.params.id).then(response => {
        if (response.success) {
          this.buttonLoading = false
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.$router.push({
            name: 'myEduTable'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.question-main {
  padding: 30px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 50px);
}
.question {
  font-size: 18px;
  color: rgba(102, 102, 102, 1);
  line-height: 24px;
}
.question-title {
  padding-bottom: 10px;
  margin-top: 30px;
}
.el-radio,
.el-checkbox {
  display: block;
  font-size: 14px;
  margin-top: 20px;
}
.el-textarea {
  margin-top: 20px;
}
.title-top {
  height: 31px;
  font-size: 24px;
  line-height: 31px;
  text-align: center;
  margin-bottom: 14px;
}
.content-top {
  height: 19px;
  font-size: 14px;
  color: rgba(153, 153, 153, 1);
  text-align: center;
  line-height: 19px;
  margin-bottom: 48px;
  span {
    margin-right: 30px;
  }
}
.dialog-text {
  line-height: 30px;
  padding: 20px;
}
</style>
