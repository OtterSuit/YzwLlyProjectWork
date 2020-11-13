<template>
  <div class="archives-container">
    <div style="width:100%">
      <el-row>
        <el-col :span="10" :offset="7">
          <div class="user box">
            <el-row style="margin-bottom:16px">
              <span class="title">我的信息</span>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="6" class="userImgBox">
                <img v-if="form.headIcon&&form.headIcon!==''" :src="imgSrc(form.headIcon)" class="userImg">
                <img v-else src="@/assets/images/noimg-01.jpg" class="userImg">
                <el-upload
                  class="upload"
                  list-type="picture-card"
                  :show-file-list="false"
                  accept=".jpg, .jpeg, .png"
                  :headers="{Authorization:token}"
                  :on-success="handleSuccess"
                  :before-upload="beforeUpload"
                  :action="action"
                  name="files"
                >
                  <i class="el-icon-upload uploadIcon" />
                  <div class="el-upload__text">更换头像</div>
                </el-upload>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="5" :offset="2">
                <div class="label">名称</div>
              </el-col>
              <el-col :span="15">
                <div>
                  <el-input v-model="form.realName" class="edit-input" size="small" />
                </div>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="5" :offset="2">
                <div class="label">电话号码</div>
              </el-col>
              <el-col :span="15">
                <div>
                  <el-input v-model="form.mobilePhone" class="edit-input" size="small" />
                </div>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="5" :offset="2">
                <div class="label">邮箱地址</div>
              </el-col>
              <el-col :span="15">
                <div>
                  <el-input v-model="form.email" class="edit-input" size="small" />
                </div>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="5" :offset="2">
                <div class="label">个人简介</div>
              </el-col>
              <el-col :span="15">
                <div>
                  <el-input
                    v-model="form.description"
                    type="textarea"
                    :rows="2"
                  />
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <div style="text-align:center">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button type="primary" @click="onCancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import APIconfig from '@/api/APIconfig'
import { getToken } from '@/utils/auth'
const fileURL = api.fileURL
// postArchives
export default {
  data() {
    return {
      action: fileURL,
      form: {
        // imageInfo: '',
        // name: '',
        // phoneNumber: '',
        // email: '',
        // personalProfile: ''
      },
      oldForm: {}
    }
  },
  computed: {
    token() {
      const token = getToken()
      return `Bearer ${token}`
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.peoGetstaff({ id: this.$store.getters.userId }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.form = response.data.resData === null ? {} : response.data.resData
          this.oldForm = JSON.parse(JSON.stringify(response.data.resData)) === null ? {} : response.data.resData
        }
      })
    },
    imgSrc(imageInfo) {
      return `${APIconfig.baseUrl}/${imageInfo}`
    },
    // 上传成功
    handleSuccess(response, file) {
      if (!response.success) {
        return this.$message.error(response.errMsg)
      }
      this.form.headIcon = response.resData[0].filePath
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
    },
    onSubmit() {
      console.log(this.form)
      api.updataAccount(this.form).then(response => {
        // console.log(response)
        if (response.success === true) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$store.commit('user/SET_AVATAR', this.form.headIcon)
          this.oldForm = JSON.parse(JSON.stringify(this.form))
        }
      })
      // api.peoRevisestaff(this.form).then(res => {
      //   if (res.code === '200' && res.data.busiCode === '1') {
      //     this.$store.commit('user/SET_AVATAR', this.form.imageInfo)
      //     this.form = res.data
      //     this.oldForm = JSON.parse(JSON.stringify(res.data))
      //     this.$message({
      //       message: '保存成功',
      //       type: 'success'
      //     })
      //   } else {
      //     this.$message({
      //       message: '保存失败，请重试',
      //       type: 'error'
      //     })
      //   }
      // })
    },
    onCancel() {
      this.form = JSON.parse(JSON.stringify(this.oldForm))
      this.$message({
        message: '取消成功',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
i {
  vertical-align: middle;
}
.archives-container {
  min-height: calc(100vh - 50px);
  background-color:#F0F2F5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box {
  background:rgba(255,255,255,1);
  box-shadow:4px 4px 40px 0px rgba(0,0,0,0.05);
  border-radius:6px;
  padding: 30px;
  margin-bottom: 20px;
  position: relative;
  .title {
    font-weight: 600;
    color: #666;
    font-size:20px;
    // color:rgba(153,153,153,1);
    line-height:24px;
    display: block;
    text-align: center;
  }
}
.uploadIcon {
  font-size: 30px;
}
.user {
  .userImgBox {
    position: relative;
    width: 190px;
    height: 190px;
    border-radius: 190px;
    margin: 0 auto 20px;
    .upload {
      position: absolute;
      top: 0;
      left: 0;
      display: none;
      ::v-deep .el-upload--picture-card {
        height: 190px;
        width: 190px;
        background-color: rgba(0,0,0,.7);
        border:1px solid rgba(229,229,229,1);
        border-radius: 190px;
        line-height: 30px;
        padding: 65px 0;
      }
      .uploadIcon ,.el-upload__text{
        color: #fff;
      }
    }
    &:hover .upload{
      display: block;
    }
  }
  .userImg {
    width: 190px;
    border-radius: 190px;
  }
}
.row {
  margin-bottom: 20px;
}
::v-deep .el-input__inner,
::v-deep .el-textarea__inner{
  // padding: 0 10px;
  width: 90%;
}
.label,
.content {
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}
.label {
  color:rgba(158,174,195,1);
}
</style>
