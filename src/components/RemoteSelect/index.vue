<template>
  <el-select
    v-model="remoteData"
    clearable
    :placeholder="remotePlaceholder"
    filterable
    remote
    reserve-keyword
    :remote-method="remoteMethod"
    :loading="loading"
    @change="remoteChange"
  >
    <el-option
      v-for="(item,index) in remoteOptions"
      :key="index"
      :label="item[label]"
      :value="item[value]"
    />
  </el-select>
</template>

<script>
import api from '@/api'
export default {
  props: {
    remotePlaceholder: {
      type: String,
      default: ''
    },
    methods: {
      type: String,
      default: ''
    },
    responseData: {
      type: Array,
      default() {
        return ['resData', 'items']
      }
    },
    label: {
      type: String,
      default: 'fullName'
    },
    value: {
      type: String,
      default: 'id'
    },
    queryKey: {
      type: String,
      default: 'Keywords'
    }
  },
  data() {
    return {
      remoteOptions: [],
      loading: false,
      remoteData: null
    }
  },
  methods: {
    remoteMethod(query) {
      this.loading = true
      const prarms = {}
      prarms[this.queryKey] = query
      api[this.methods](prarms).then(response => {
        if (response.success) {
          let res = response
          this.responseData.forEach(item => {
            res = res[item]
          })
          this.remoteOptions = res
          this.loading = false
        }
      })
    },
    remoteChange() {
      this.$emit('remoteChange', this.remoteData)
    }
  }
}

</script>
<style lang="scss" type="text/scss" scoped>
</style>
