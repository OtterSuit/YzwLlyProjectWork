<template>
  <div class="Page404-container">
    <div class="Page404-inner">
      <img src="@/assets/images/404.png" class="img-404">
      <div class="content-page404">页面找不到了</div>
      <div class="content-sorry">抱歉~您访问的页面找不到了，请返回重新操作</div>
      <el-button class="Page404-button" @click="backClick">返回上一页</el-button>
      <div class="Page404-backtoHome">
        <span class="Page404-backtoHome-span" @click="backHome">回首页</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404',
  methods: {
    backClick() {
      this.$router.go(-1)
    },
    backHome() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss" scoped>
.Page404-container {
  background-color: #f0f2f5;
  height: 100vh;
  padding-top: 18vh;
  .Page404-inner {
    width: 100%;
    text-align: center;
  }
  .img-404 {
    height: 40vh;
  }
  .content-page404 {
    margin-top: -22px;
    font-size: 30px;
    color: #666666;
  }
  .content-sorry {
    margin-top: 20px;
    font-size: 18px;
    color: #AFB3C0;
  }
  .Page404-button {
    margin-top: 30px;
  }
  .Page404-backtoHome {
    font-size: 14px;
    color: #1678FF;
    margin-top: 30px;
    .Page404-backtoHome-span {
      cursor: pointer;
    }
  }
}
::v-deep .el-button {
  border: 1px solid #d8d8d8;
  padding: 18px 66px;
  font-size: 18px;
  color: #9B9B9B;
  &:hover {
    background-color: #f8f8f8;
  }
}
</style>
