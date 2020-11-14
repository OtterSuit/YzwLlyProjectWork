<template>
  <div v-loading="listLoading" class="question-main">
    <paper ref="paper" :paper-type="2" :data="data" @editClick="editClick" />
    <el-button :loading="buttonLoading" type="primary" icon="el-icon-circle-check" @click="onSubmit">保存</el-button>
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
      listLoading: true,
      buttonLoading: false,
      data: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getEducationPapers({ id: this.$route.params.id }).then(response => {
        if (response.success) {
          this.listLoading = false
          console.log('试卷编辑', response)
          this.data = response.resData
        }
      })
    },
    // 切换点击
    editClick(item, index, typeArr) {
      const params = {
        id: this.$route.params.id,
        itemId: item.oldId
      }
      if (item.oldId !== item.id) {
        params.newItemId = item.id
      }
      api.getEducationExamsNewItem(params).then(response => {
        if (response.success) {
          console.log('切换试题', response)
          response.resData.oldId = item.oldId
          this.$refs.paper.viewData[typeArr].splice(index, 1, response.resData)
          this.$message({
            message: '切换试题成功',
            type: 'success'
          })
        }
      })
    },
    // 保存
    onSubmit() {
      this.buttonLoading = true
      const arr = []
      if (this.data.hasSingle) {
        this.$refs.paper.viewData.single.forEach(item => {
          arr.push(item.id)
        })
      }
      if (this.data.hasMultiple) {
        this.$refs.paper.viewData.multiple.forEach(item => {
          arr.push(item.id)
        })
      }
      if (this.data.hasQA) {
        this.$refs.paper.viewData.qa.forEach(item => {
          arr.push(item.id)
        })
      }
      api.putEducationExams(arr, this.$route.params.id).then(response => {
        if (response.success) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.$router.push({
            name: 'examTable'
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
  background-color: #f0f2f5;
  min-height: calc(100vh - 84px);
}
</style>
