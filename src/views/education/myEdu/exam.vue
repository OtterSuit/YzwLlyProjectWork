<template>
  <div v-loading="listLoading" class="question-main">
    <paper :paper-type="4" :data="data" />
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
