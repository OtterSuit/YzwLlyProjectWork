<template>
  <div>
    <el-carousel indicator-position="outside" :autoplay="false" height="370px">
      <el-carousel-item v-for="(item,index) in imgSrc" :key="item.src+index">
        <img :src="item.src" class="carousel-img">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>

export default {
  data() {
    return {
      imgSrc: [
        {
          src: require('@/assets/images/step1.jpg')
        },
        {
          src: require('@/assets/images/step2.jpg')
        },
        {
          src: require('@/assets/images/step3.jpg')
        },
        {
          src: require('@/assets/images/step4.jpg')
        },
        {
          src: require('@/assets/images/step5.jpg')
        },
        {
          src: require('@/assets/images/step6.jpg')
        },
        {
          src: require('@/assets/images/step7.jpg')
        },
        {
          src: require('@/assets/images/step8.jpg')
        },
        {
          src: require('@/assets/images/step9.jpg')
        }
      ]
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
