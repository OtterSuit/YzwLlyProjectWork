<template>
  <div>
    <div class="upload-box">
      <div v-if="form.videoInfo !='' && videoFlag == false">
        <i class="quxiao el-icon-error" @click="closeClick" />
        <video :src="videoSrc(form.videoInfo)" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
      </div>
      <el-upload
        v-else
        :action="action"
        accept=".mp4"
        :show-file-list="false"
        :headers="{Authorization:token}"
        :on-success="handleVideoSuccess"
        :before-upload="beforeUpload"
        name="files"
        :on-progress="uploadVideoProcess"
      >
        <!-- <video v-if="form.videoInfo !='' && videoFlag == false" :src="videoSrc(form.videoInfo)" class="avatar" controls="controls">您的浏览器不支持视频播放</video> -->
        <!-- <i v-if="form.videoInfo =='' && videoFlag == false" class="el-icon-plus avatar-uploader-icon" /> -->
        <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;" />
      </el-upload>
    <!-- <el-upload
      :multiple="true"
      :show-file-list="true"
      accept=".mp4"
      :headers="{Authorization:token}"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :action="action"
      list-type="picture-card"
      name="files"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload> -->
    </div>
  </div>
</template>

<script>
import api from '@/api'
import APIconfig from '@/api/APIconfig'
import { getToken } from '@/utils/auth'
const fileURL = api.fileURL
export default {
  props: {
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    form: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      action: fileURL,
      videoFlag: true,
      videoUploadPercent: 0,
      file: {}
    }
  },
  computed: {
    token() {
      const token = getToken()
      return `Bearer ${token}`
    }
  },
  created() {
    this.form.videoInfo = ''
    if (this.fileList[0]) {
      console.log(this.fileList[0])
      this.form.videoInfo = this.fileList[0][0].url
      this.file.uid = this.fileList[0][0].id
      this.videoFlag = false
    }
    console.log(this.form.videoInfo)
    console.log(this.file.uid)
  },
  methods: {
    closeClick() {
      api.deleteVideo({ id: this.file.uid }).then(res => {
        if (res.code === '200' && res.data.busiCode === '1') {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.$set(this.form, 'videoInfo', '')
          this.videoFlag = true
        }
      })
    },
    videoSrc(videoInfo) {
      return `${APIconfig.baseUrl}/${videoInfo}`
    },
    handleVideoSuccess(response, file) { // 获取上传图片地址
      if (!response.success) {
        return this.$message.error(response.errMsg)
      }
      this.videoFlag = false
      this.videoUploadPercent = 0
      this.form.videoInfo = response.resData[0].filePath
      // this.form.videoInfo = response.ResData[0].FilePath
      api.toPostVideo(this.form).then(res => {
        file.uid = res.data.id
        this.file.id = res.data.id
        if (res.code === '200' && res.data.busiCode === '1') {
          // this.fileList.push(res.data)
          this.formChange()
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        }
      })
    },
    formChange() {
      this.$emit('formChange', this.form)
    },
    // 上传成功
    /* handleSuccess(response, file) {
      if (!response.Success) {
        return this.$message.error(response.ErrMsg)
      }
      this.form.imageInfo = response.ResData[0].FilePath
      api.toPostImage(this.form).then(res => {
        file.uid = res.data.id
        if (res.code === '200' && res.data.busiCode === '1') {
          // this.fileList.push(res.data)
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '上传失败，请重试',
            type: 'error'
          })
        }
      })
    }, */
    // 移除上传内容
    handleRemove(file) {
      /* api.deleteVideo({ id: file.uid }).then(res => {
        if (res.code === '200' && res.data.busiCode === '1') {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '删除失败，请重试',
            type: 'error'
          })
        }
      }) */
    },
    // 上传的动作
    beforeUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.type) === -1) {
        this.$message.error('请上传正确的视频格式')
        return false
      }
      if (!isLt10M) {
        this.$message.error('上传视频大小不能超过10MB哦!')
        return false
      }
    },
    uploadVideoProcess(event, file, fileList) {
      console.log(event.percent, file, fileList)
      this.videoFlag = true
      this.videoUploadPercent = Math.floor(event.percent)
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-box{
  position: relative;
  text-align: center;
  .avatar{
    height: 300px
  }
  /* .avatar:hover ~ .quxiao{
    display: initial;
  } */

  .quxiao{
    &:hover {
      cursor: pointer;
    }
    display: none;
    font-size: 30px;
    position: absolute;
    z-index: 999;
  }
  &:hover .quxiao{
    display: initial;
  }
}

</style>
