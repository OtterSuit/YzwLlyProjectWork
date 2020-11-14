<template>
  <my-archives :id="id" />
</template>

<script>
// postArchives
import MyArchives from '../archives/basic/MyArchives'

export default {
  components: {
    MyArchives
  },
  data() {
    return {
      id: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.id = this.$store.getters.userInfo.userId
      // this.id = 13132
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
</style>
