<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" class="main-article" element-loading-text="loading">
    <div v-for="(item,index) in printData.code" :key="index" class="item">
      <!-- 封包标签1 -->
      <div v-if="printData.style===1" class="label-main">
        <div class="label-top">
          <el-col :span="12">
            <div class="packet-name">{{ printData.name }}</div>
            <div class="packet-code">{{ printData.serialNumber }}</div>
          </el-col>
          <el-col :span="12" class="img-col">
            <MyQrcode :text="item" class="erwm-img" :size="180" />
            <!-- <img :src="erwmURL" class="erwm-img"> -->
          </el-col>
        </div>
        <div class="label-bottom">
          <div class="packet-bottom">封包人： 示例姓名</div>
          <div class="packet-bottom">封包日期: 2020.01.01</div>
        </div>
      </div>
      <!-- 封包标签2 -->
      <div v-if="printData.style===2" class="label-main">
        <div class="label-top">
          <el-col :span="12" class="img-col">
            <MyQrcode :text="item" class="erwm-img" :size="180" />
            <!-- <img :src="erwmURL" class="erwm-img"> -->
          </el-col>
          <el-col :span="12">
            <div class="packet-name">{{ printData.name }}</div>
            <div class="packet-code">{{ printData.serialNumber }}</div>
          </el-col>
        </div>
        <div class="label-bottom">
          <div class="packet-bottom">封包人： 示例姓名</div>
          <div class="packet-bottom">封包日期: 2020.01.01</div>
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
.label-main {
  width: 472px;
  height: 394px;
  border: 1px solid #ababab;
  .label-top {
    background-color: #fff;
    padding: 20px;
    height: 247px;
  }
  .label-bottom {
    height: 145px;
    padding: 20px;
    -webkit-print-color-adjust: exact;
    background-color: #f6f6f6;
  }
  .erwm-img {
    padding: 10px;
    float: left;
    height: 200px;
    border: 1px solid rgba(155, 155, 155, 1);
  }
  .packet-name {
    font-size: 30px;
    line-height: 40px;
    margin-bottom: 20px;
  }
  .packet-code {
    font-size: 40px;
    line-height: 66px;
  }
  .packet-bottom {
    font-size: 30px;
    color: #666;
    line-height: 42px;
    margin-bottom: 10px;
  }
}
</style>
