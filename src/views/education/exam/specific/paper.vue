<template>
  <div v-loading="listLoading" class="question-main">
    <paper :paper-type="1" :data="data" />
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
      listLoading: true,
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
          console.log('试卷详细', response)
          this.data = response.resData
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
  min-height: calc(100vh - 84px);
}
</style>
