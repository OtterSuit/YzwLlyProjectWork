<template>
  <div v-loading="loading" class="archives-container">
    <my-user ref="personalInformation" :data="form.personalInformation" :status="form.archivesState" />
    <my-body ref="bodyInformation" :data="form.bodyInformation" />
    <my-urgency ref="emergencyContact" :data="form.emergencyContact" />
    <my-work ref="jobInformation" :data="form.jobInformation" />
    <my-work-exp ref="workExperience" :data="form.workExperience" />
    <my-edu ref="educationExperience" :data="form.educationExperience" />
    <my-skill ref="professionalSkill" :data="form.professionalSkill" />
    <my-language ref="foreignLanguage" :data="form.foreignLanguage" />
    <my-credit ref="creditCard" :data="form.creditCard" />
    <el-image-viewer v-show="imgShow" :initial-index="dijizhang" :on-close="viewerClose" :url-list="imageUrl" />
  </div>
</template>

<script>
import api from '@/api'
import MyUser from './components/user'
import MyBody from './components/body'
import MyUrgency from './components/urgency'
import MyWork from './components/work'
import MyCredit from './components/credit'
import MyWorkExp from './components/workExp'
import MyEdu from './components/edu'
import MySkill from './components/skill'
import MyLanguage from './components/language'
export default {
  components: {
    MyUser,
    MyBody,
    MyUrgency,
    MyWork,
    MyCredit,
    MyWorkExp,
    MyEdu,
    MySkill,
    MyLanguage
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: true,
      imgShow: false,
      imageUrl: [],
      dijizhang: 0,
      nextImg: 0, // 专业技能的图片数
      form: {}
    }
  },
  created() {
    this.getArchives()
  },
  methods: {
    // 获取个人档案
    async getArchives() {
      this.loading = true
      // const id = this.$route.query.id ? this.$route.query.id : sessionStorage.userId
      const res = await api.getArchives({ id: this.id })
      console.log('个人档案：', res)
      if (!res.success) {
        return
      }
      this.loading = false
      this.form = res.resData
      this.form.professionalSkill.forEach((v) => {
        this.imageUrl.push(v.imageUrl)
      })
      this.form.foreignLanguage.forEach((v) => {
        this.imageUrl.push(v.imageUrl)
      })
      this.nextImg = this.form.professionalSkill
    },
    // 修改弹窗确认按钮
    async editSubmit(Info, infoType, id) {
      console.log(this.$refs[Info], this.$store.getters.userInfo.userId)
      const params = {
        userId: this.$store.getters.userInfo.userId,
        infoType: infoType
      }
      if (id) {
        this.form[Info].forEach((v, i) => {
          if (v.id === id && JSON.stringify(v) === JSON.stringify(this.$refs[Info].info)) {
            this.$message('无信息修改')
            return
          } else if (v.id === id && JSON.stringify(v) !== JSON.stringify(this.$refs[Info].info)) {
            console.log(this.$refs[Info].info, v)
            params[Info] = JSON.parse(JSON.stringify(this.$refs[Info].info))
            delete params[Info].id
            params.id = id
          } else {
            return
          }
        })
      } else {
        if (JSON.stringify(this.$refs[Info].info) === JSON.stringify(this.form[Info])) {
          this.$message('无信息修改')
          return
        }
        params[Info] = JSON.parse(JSON.stringify(this.$refs[Info].info))
      }
      const res = await api.putArchives(params)
      if (!res.success) return
      if (id) {
        this.form[Info].forEach((v, i) => {
          if (v.id === id) {
            this.form[Info][i] = JSON.parse(JSON.stringify(this.$refs[Info].info))
          }
        })
      } else {
        this.form[Info] = JSON.parse(JSON.stringify(this.$refs[Info].info))
      }
      this.$message({
        message: '修改成功',
        type: 'success'
      })
      this.$refs[Info][Info] = false
    },
    // 新增弹窗确认按钮
    async addSubmit(Info, infoType) {
      const params = {
        userId: this.$store.getters.userInfo.userId,
        infoType: infoType
      }
      params[Info] = JSON.parse(JSON.stringify(this.$refs[Info].info))
      this.$refs[Info][Info] = false
      const res = await api.postArchives(params)
      if (!res.success) return
      this.form[Info].push(params[Info])
      this.$message({
        message: '增加成功',
        type: 'success'
      })
    },
    // 删除按钮点击
    async deleteClick(Info, infoType, did) {
      console.log(did)
      const params = {
        userId: this.$store.getters.userInfo.userId,
        infoType: infoType,
        id: did
      }
      const res = await api.deleteArchives(params)
      if (!res.success) return
      this.form[Info] = this.form[Info].filter(({ id }) => id !== did)
      console.log(this.form[Info])
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    // 工作经历、教育经历、专业技能、外语能力部分修改点击
    editArrayClick(Info, index) {
      this[Info + 'Info'] = JSON.parse(JSON.stringify(this.form[Info][index]))
      this.editIndex = index
      this.edit = true
      this[Info] = true
    },
    // 工作经历、教育经历、专业技能、外语能力部分修改弹窗确认
    editArraySubmit(Info) {
      this.$refs[Info][Info] = false
      if (
        JSON.stringify(this.$refs[Info][Info + 'Info']) ===
        JSON.stringify(this.form[Info][this.$refs[Info].editIndex])
      ) {
        this.$message('无信息修改')
        return
      }
      this.form[Info].splice(this.$refs[Info].editIndex, 1, this.$refs[Info][Info + 'Info'])
      this.$message({
        message: '修改成功',
        type: 'success'
      })
    },
    viewerClose() {
      this.imgShow = false
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  .archives-container {
    padding: 30px;
    background-color: #f0f2f5;
  }
::v-deep {
  i {
    vertical-align: middle;
  }
  .box {
    .label {
      font-size: 14px;
      display: inline-block;
      width: 60px;
      text-align: end;
      margin-right: 10px;
      color: rgba(158, 174, 195, 1);
    }
    .content {
      font-size: 14px;
    }
    .row {
      margin-bottom: 20px;
    }
  }
  .rowbgc {
    background-color: #f7f7f7;
    height: 44px;
    line-height: 44px;
    margin-top: 10px;
    padding-left: 8px;
    position: relative;
    border-radius: 5px;
    .tools {
      position: absolute;
      z-index: 1;
      height: 16px;
      width: 16px;
      right: 13px;
      top: 14px;
      color: #999;
      line-height: 0;
      display: none;
      cursor: pointer;
      .toolsIcon {
        position: absolute;
        top: 0;
        right: 0;
      }
      .settingBox {
        width: 90px;
        height: 80px;
        background: rgba(255, 255, 255, 1);
        box-shadow: -4px 4px 10px 0px rgba(0, 0, 0, 0.1);
        position: absolute;
        top: 22px;
        right: -5px;
        z-index: 9;
        display: none;
        border-radius: 5px;
        .settingBox-inner {
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          .setting-content {
            color: #4a4a4a;
            font-size: 12px;
          }
          &:hover {
            color: #409eff;
          }
          &:hover .setting-content {
            color: #409eff;
          }
        }
      }
      &:hover {
        width: 85px;
        height: 105px;
      }
      &:hover .toolsIcon {
        color: #409eff;
      }
      &:hover .settingBox {
        display: block;
      }
    }
    &:hover .tools {
      display: block;
    }
  }
  .picture {
    cursor: pointer;
    vertical-align: middle;
    margin-left: 10px;
    color: #999;
  }
  .dialog-footer .el-button {
    padding: 12px 35px;
  }
  .time-middle {
    font-size: 14px;
    text-align: center;
    color: #666;
  }
  .el-form-item__label {
    text-align: left;
    font-weight: normal;
  }
  .el-input__suffix {
    right: 10px;
    color: #666;
  }
  .el-input__suffix span {
    display: inline-block;
    width: 25px;
    text-align: center;
  }
  .el-dialog__body {
    padding-bottom: 20px;
  }
  .el-upload-dragger {
    width: 680px;
  }
}
</style>
