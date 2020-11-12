<template>
  <div>
    <!-- 图片教程 -->
    <span style="margin-right:15px">
      <el-checkbox v-model="checkImg" class="check-img" label="1">
        <div class="img-hover">
          <div class="shadow-box" />
          <img src="@/assets/images/jiazi.png" alt="" style="width:164px; height: 123px">
        </div>
      </el-checkbox></span>
    <span style="margin-right:15px">
      <el-checkbox v-model="checkImg" class="check-img" label="2">
        <div class="img-hover">
          <div class="shadow-box" />
          <img src="@/assets/images/jiazi.png" alt="" style="width:164px; height: 123px">
        </div>
      </el-checkbox></span>
    <span style="margin-right:15px">
      <el-checkbox v-model="checkImg" class="check-img" label="3">
        <div class="img-hover">
          <div class="shadow-box" />
          <img src="@/assets/images/jiazi.png" alt="" style="width:164px; height: 123px">
        </div>
      </el-checkbox></span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkImg: ['3']
    }
  }
}
</script>

<style lang="scss" scoped>
.img-hover .shadow-box{
  display: none;
  position: absolute;
  width:164px;
  height: 123px;
  background: rgba($color: #000000, $alpha: .5);
}
.img-hover:hover .shadow-box{
    display: block;
}
::v-deep .check-img {
  .el-checkbox__label{
    padding: 0;
  }
  .el-checkbox__input{
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
  .el-checkbox__inner{
    border-radius: 50%;
  }
}
</style>
