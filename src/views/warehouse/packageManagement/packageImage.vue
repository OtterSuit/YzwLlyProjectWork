<template>
  <div>
    <!-- 上传 -->
    <el-upload
      :multiple="true"
      class="editor-slide-upload"
      action="https://httpbin.org/post"
      list-type="picture-card"
    >
      <div style="margin-top:25px">
        <i class="el-icon-picture-outline"><br><span style="font-size:15px">上传图片</span></i>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
}
</script>
