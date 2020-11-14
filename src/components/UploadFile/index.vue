<template>
  <el-upload
    ref="upload"
    :limit="limit"
    :show-file-list="true"
    :file-list="fileList"
    :accept="accept"
    :headers="{ Authorization: token }"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :before-upload="beforeUpload"
    class="upload-file"
    :action="action"
    :list-type="listType"
    :name="name"
    :class="{'hidden-uploader': fileList.length===limit}"
  >
    <div slot="tip" class="el-upload__tip">{{ tipContent }}</div>
    <i class="upload-file-icon" :class="icon" />
    <div class="el-upload__text">{{ textContent }}</div>
  </el-upload>
</template>

<script>
import api from '@/api'
import { getToken } from '@/utils/auth'
const fileURL = api.fileURL

export default {
  props: {
    listType: {
      // 文件列表的类型  text/picture/picture-card
      type: String,
      default: 'picture-card'
    },
    name: {
      // 上传的文件字段名
      type: String,
      default: 'files'
    },
    accept: {
      // 接受上传的文件类型
      type: String,
      default: '.jpg, .jpeg, .png'
    },
    limitSize: {
      // 限制大小
      type: Number,
      default: 1
    },
    limitType: {
      // 接受上传的文件类型
      type: Array,
      default() {
        return ['image/jpeg', 'image/png']
      }
    },
    limit: {
      // 限制上传文件个数
      type: Number,
      default: 1
    },
    icon: { // 图标
      type: String,
      default: 'el-icon-picture'
    },
    textContent: { // 文字
      type: String,
      default: '上传图片'
    },
    fileList: {
      // 文件列表
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      action: fileURL, // 上传URL
      typeArr: [],
      tipContent: '' // 提示文字
    }
  },
  computed: {
    token() {
      const token = getToken()
      return `Bearer ${token}`
    }
  },
  created() {
    this.accept.split(',').map((v) => {
      this.typeArr.push(v.trim().substring(1).toUpperCase())
    })
    this.tipContent = `仅支持${this.typeArr.join('、')}格式，且不超过 ${
      this.limitSize
    }MB`
  },
  methods: {
    // 上传前校验
    beforeUpload(file) {
      // 校验大小
      const sizeCheck = file.size / (this.limitSize * 1024 * 1024) < 1
      if (!sizeCheck) {
        this.$message.error(`大小不能超过 ${this.limitSize}MB!`)
        return new Promise((resolve, reject) => {
          reject(false)
        })
      }
      // 校验类型
      let typeCheck = false
      this.limitType.forEach((type) => {
        if (file.type === type) {
          typeCheck = true
          return
        }
      })
      if (!typeCheck) {
        this.$message.error(`仅支持 ${this.typeArr.join('、')}格式!`)
        return new Promise((resolve, reject) => {
          reject(false)
        })
      }
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      if (!response.success) {
        fileList.pop()
        return this.$message.error(response.errMsg)
      }
      this.$emit('handleSuccess', response)
    },
    // 移除上传内容
    handleRemove(file) {
      this.$emit('handleRemove')
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.upload-file {
  position: relative;
  color: #999;
  height: 193px;
  .el-upload__tip {
    position: absolute;
    margin-top: 0;
    top: 0;
    color: #999;
  }
}
 .upload-file.hidden-uploader ::v-deep .el-upload--picture-card {
  display: none;
}
::v-deep .el-upload-list__item {
  margin-top: 44px;
}
::v-deep .el-upload {
  border: 1px solid rgba(216, 216, 216, 1);
  background: rgba(246, 246, 246, 1);
  border-radius: 6px;
  cursor: pointer;
  width: 148px;
  height: 148px;
  position: relative;
  top: 44px;
  overflow: hidden;
}
.el-upload__text {
  color: #999;
  margin-top: 10px;
}
.upload-file-icon {
  position: absolute;
  top: 40px;
  left: 59px;
  color: #999;
}
::v-deep {
  .is-uploading,
  .is-ready,
  .el-list-leave,
  .el-list-enter,
  .el-list-leave-active {
    display: none;
  }
}
</style>
