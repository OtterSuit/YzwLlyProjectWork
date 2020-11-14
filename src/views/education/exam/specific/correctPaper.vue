
<template>
  <div v-loading="listLoading" class="question-main">
    <paper ref="paper" :paper-type="3" :data="data" />
    <el-button :loading="buttonLoading" type="primary" icon="el-icon-circle-check" @click="onSubmit">提交</el-button>
  </div>
</template>

<script>
import api from '@/api'
import paper from '../../paper'
export default {
  components: {
    paper
  },
  data() {
    return {
      buttonLoading: false,
      data: {},
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
          console.log('考试详细-查询', response)
          this.data = response.resData
        }
      })
      // this.handleData()
      // this.countScore()
    },
    onSubmit() {
      const arr = []
      if (this.data.hasQA) {
        let validSubmit = true
        this.$refs.paper.$refs.qa.validate((valid) => {
          validSubmit = valid
        })
        if (!validSubmit) {
          return
        }
        this.$refs.paper.viewData.qa.forEach(item => {
          arr.push({
            itemBankDetailId: item.id,
            grade: item.grade
          })
        })
      }
      this.buttonLoading = true
      api.putEducationDetails(arr, this.$route.params.id).then(response => {
        if (response.success) {
          this.$router.push({
            name: 'specificMain',
            params: {
              id: this.$route.params.examId,
              title: this.data.examName
            }
          })
          this.$message({
            message: '完成改卷',
            type: 'success'
          })
        }
        this.buttonLoading = false
      })
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.question-main {
  padding: 30px;
  min-height: calc(100vh - 84px);
  background-color: #f0f2f5;
}
</style>
