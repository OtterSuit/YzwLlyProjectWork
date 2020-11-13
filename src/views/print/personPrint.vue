<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" class="main-article" element-loading-text="loading">
    <div v-for="(item,index) in printData.code" :key="index" class="item">
      <!-- 人员标签1 -->
      <div v-if="printData.style===1" class="label-main">
        <div class="label-top">
          <el-col :span="12" class="content-col">
            <div class="person-name">{{ item.name }}</div>
            <div class="person-code">{{ item.id }}</div>
            <div class="person-department">{{ item.departmentName }}</div>
          </el-col>
          <el-col :span="12" class="img-col">
            <MyQrcode :text="item.id" class="erwm-img" :size="180" />
          </el-col>
        </div>
      </div>
      <!-- 人员标签2 -->
      <div v-if="printData.style===2" class="label-main">
        <div class="label-top label-top-right">
          <el-col :span="12" class="img-col">
            <MyQrcode :text="item.id" class="erwm-img" :size="180" />
          </el-col>
          <el-col :span="12" class="content-col content-col-2">
            <div class="person-name">{{ item.name }}</div>
            <div class="person-code">{{ item.id }}</div>
            <div class="person-department">{{ item.departmentName }}</div>
          </el-col>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyQrcode from '@/components/MyQrcode'

export default {
  components: {
    MyQrcode
  },
  data() {
    return {
      printData: '',
      fullscreenLoading: true
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      document.title = this.$route.query.title
      this.printData = JSON.parse(this.$route.query.data)
      console.log(this.printData)

      setTimeout(() => {
        this.fullscreenLoading = false
        this.$nextTick(() => {
          window.print()
        })
      }, 3000)
      window.addEventListener('afterprint', (event) => {
        window.close()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// .item {
//   page-break-after:always;
// }
.img-col {
  width: 196px;
}
.content-col {
  width: calc(100% - 196px);
}
.content-col-2 {
  padding-left: 15px;
}
.label-main {
  width: 394px;
  height: 240px;
  border: 1px solid #ababab;
  .label-top {
    background-color: #fff;
    padding: 20px;
    height: 238px;
  }
  .label-top-right {
    padding-right: 0;
  }
  .erwm-img {
    padding: 10px;
    float: left;
    height: 200px;
    border: 1px solid rgba(155, 155, 155, 1);
  }
  .person-name {
    font-size: 36px;
    line-height: 47px;
    margin-bottom: 10px;
  }
  .person-code {
    font-size: 28px;
    line-height: 52px;
    margin-bottom: 10px;
  }
  .person-department {
    font-size: 24px;
    line-height: 31px;
  }
}
</style>
