<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" class="main-article" element-loading-text="loading">
    <div v-for="index of printData.count" :key="index" class="item">
      <!-- 封包标签 -->
      <div class="label-main">
        <div class="label-top">
          <el-col :span="12">
            <div class="label-title">灭菌有效天数</div>

            <div class="valid-day">{{ printData.validNum }}<span>天</span></div>
            <div class="valid-date">灭菌日期：{{ getDate() }}</div>
            <div class="valid-date">失效日期：{{ getEndDate(printData.validNum) }}</div>
          </el-col>
          <el-col :span="12" class="img-col">
            <MyQrcode :text="printData.id" class="erwm-img" :size="180" />
          </el-col>
        </div>
        <div class="label-bottom">
          <div class="equipment-bottom">{{ printData.equipment }}</div>
          <div class="message-bottom">
            <el-row type="flex" justify="space-between">
              <el-col :span="4">
                炉次: {{ printData.batchNoDay }}
              </el-col>
              <el-col :span="15">
                灭菌人: {{ printData.name }}
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyQrcode from '@/components/MyQrcode'
import { format } from '@/utils/index'
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
    },
    getDate() {
      return format('yyyy-MM-dd')
    },
    // 获得结束时间
    getEndDate(validDay) {
      const nowDateObj = new Date()
      const nowTimeStem = nowDateObj.getTime()
      const endTimeStem = nowTimeStem + 24 * 60 * 60 * 1000 * validDay
      const endDateObj = new Date(endTimeStem)
      let month = endDateObj.getMonth() + 1
      month = month > 9 ? month : '0' + month
      let day = endDateObj.getDate()
      day = day > 9 ? day : '0' + day
      const endDateStr = endDateObj.getFullYear() + '-' + month + '-' + day
      return endDateStr
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
  .label-title {
      font-size:22px;
      line-height:26px;
  }
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
  .valid-day {
    font-size: 60px;
    line-height: 90px;
    margin-left: 20px;
    span{
    position: relative;
    bottom: 10px;
    font-size:30px;
    line-height:40px;
    margin-left: 10px;
    }
  }
  .valid-date {
    font-size: 20px;
    line-height: 46px;
  }
  .equipment-bottom {
    font-size: 30px;
    line-height: 42px;
    margin-bottom: 10px;
  }
  .message-bottom{
    font-size: 20px;
    color: #666;
    line-height: 42px;
  }
}
</style>
