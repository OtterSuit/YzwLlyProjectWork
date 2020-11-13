<template>
  <div>
    <el-upload
      :multiple="true"
      :show-file-list="true"
      accept=".jpg, .jpeg, .png, .gif"
      :headers="{Authorization:token}"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :file-list="fileList"
      :before-upload="beforeUpload"
      class="editor-slide-upload"
      :action="action"
      list-type="picture-card"
      name="files"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
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
      action: fileURL
    }
  },
  computed: {
    token() {
      const token = getToken()
      return `Bearer ${token}`
    }
  },
  methods: {
    imgSrc(imageInfo) {
      return `${APIconfig.baseUrl}/${imageInfo}`
    },
    // 上传成功
    handleSuccess(response, file) {
      if (!response.success) {
        return this.$message.error(response.errMsg)
      }
      this.form.imageInfo = response.resData[0].filePath
      console.log(this.form)
      api.toPostImage(this.form).then(res => {
        file.uid = res.data.id
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
    // 移除上传内容
    handleRemove(file) {
      console.log(file.uid)
      api.deleteImage({ id: file.uid }).then(res => {
        if (res.code === '200' && res.data.busiCode === '1') {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    // 上传的动作
    beforeUpload(file) {
      const typeCheck = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!typeCheck) {
        this.$message.error('上传图片只支持 JPG 或PNG 格式!')
        return new Promise((resolve, reject) => {
          reject(false)
        })
      }
    }
  }
}
</script>
