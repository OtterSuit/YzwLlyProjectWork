<template>
  <div>
    <el-carousel indicator-position="outside" :autoplay="false" height="370px">
      <el-carousel-item v-for="(item,index) in src.imagesCourse" :key="item.url+index">
        <img :src="getImgSrc(item.url)" class="carousel-img">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import APIconfig from '@/api/APIconfig'

export default {
  props: {
    src: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 获取图片链接
    getImgSrc(imageInfo) {
      return `${APIconfig.baseUrl}/${imageInfo}`
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.carousel-img {
  height: 100%;
}
::v-deep .el-carousel__item {
  text-align: center;
}
::v-deep .el-carousel__button {
  width: 12px;
  height: 12px;
  border-radius: 12px;
}
::v-deep .el-carousel__indicator.is-active button {
  background-color: #409EFF;
}
</style>
