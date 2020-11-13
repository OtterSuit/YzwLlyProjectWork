<template>
  <div class="delivery-container">
    <myfilters
      title="灭菌质量记录表"
      :content="content"
      :back-button="true"
    />
    <!-- 设备信息 -->
    <el-form ref="recordForm" v-loading="listLoading" :model="recordForm" label-width="100px">
      <div class="main-box">
        <div class="main-box-title">
          设备信息
        </div>
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="灭菌日期">
              {{ recordForm.createTime }}
              <!-- <el-input v-model="recordForm.createTime" disabled /> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="灭菌炉号">
              {{ recordForm.code }}
              <!-- <el-input v-model="recordForm.boxId" disabled /> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开炉时间">
              {{ recordForm.sterilizeStartTime }}
              <!-- <el-input v-model="recordForm.sterilizeStartTime" disabled /> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="灭菌程序">
              {{ recordForm.sterilizeProgramName }}
              <!-- <el-input v-model="recordForm.sterilizeProgramName" disabled /> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="灭菌炉次">
              {{ recordForm.batchNoDay }}
              <!-- <el-input v-model="recordForm.batchNoDay" disabled /> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束时间">
              {{ recordForm.sterilizeEndTime }}
              <!-- <el-input v-model="recordForm.sterilizeEndTime" disabled /> -->
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <el-form ref="recordForm" :model="recordForm" label-width="120px" :rules="rules">
      <!-- 物理监测 -->
      <div class="main-box">
        <div class="main-box-title">
          物理监测
        </div>
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="最低灭菌温度" prop="minTemperature">
              <el-input v-model="recordForm.minTemperature">
                <span slot="suffix" class="main-box-suffix">℃</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最低灭菌压力" prop="minPressure">
              <el-input v-model="recordForm.minPressure">
                <span slot="suffix" class="main-box-suffix">Kpa</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="灭菌时间" prop="sterilizeTimeLen">
              <el-input v-model="recordForm.sterilizeTimeLen">
                <span slot="suffix" class="main-box-suffix">min</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="最高灭菌温度" prop="maxTemperature">
              <el-input v-model="recordForm.maxTemperature">
                <span slot="suffix" class="main-box-suffix">℃</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最高灭菌压力" prop="maxPressure">
              <el-input v-model="recordForm.maxPressure">
                <span slot="suffix" class="main-box-suffix">Kpa</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="干燥时间" prop="dryTimeLen">
              <el-input v-model="recordForm.dryTimeLen">
                <span slot="suffix" class="main-box-suffix">min</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="监测效果">
            <el-col :span="3">
              <el-radio v-model="recordForm.physicsResult" label="1">合格</el-radio>
            </el-col>
            <el-col :span="3">
              <el-radio v-model="recordForm.physicsResult" label="2">不合格</el-radio>
            </el-col>
            <!-- <el-input v-if="recordForm.physicsResult==='2'" v-model="recordForm.physicsReason" /> -->
            <el-col :span="9">
              <el-form-item v-show="recordForm.physicsResult==='2'" label="不合格原因">
                <el-select v-model="recordForm.physicsReason" placeholder="请选择不合格理由">
                  <el-option
                    v-for="(val,key) in ssd_qt_physics_reason"
                    :key="key"
                    :label="val"
                    :value="key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="拍照上传">
            <div v-if="isShow || isUpload.physical">
              <img
                class="main-box-img"
                :src="imgSrc(recordForm.physicsImageInfo)"
                @click="imgClick(recordForm.physicsImageInfo)"
              >
            </div>
            <div v-else>
              <div class="main-box-remind">
                请使用PDA拍摄并上传物理测试结果
              </div>
              <el-upload
                :multiple="true"
                :show-file-list="true"
                accept=".jpg, .jpeg, .png, .gif"
                :headers="{Authorization:token}"
                :on-remove="handleRemove"
                :on-success="handlephysical"
                :file-list="fileList"
                :before-upload="beforeUpload"
                class="editor-slide-upload"
                :action="action"
                list-type="picture-card"
                name="files"
              >
                <div class="img-remind">
                  <i class="el-icon-picture-outline"><br><span>请上传图片</span></i>
                </div>
              </el-upload>
            </div>
          </el-form-item>
        </el-row>
      </div>
      <!-- 化学监测 -->
      <div class="main-box">
        <div class="main-box-title">化学监测</div>
        <el-row>
          <el-form-item label="监测效果">
            <el-col :span="3">
              <el-radio v-model="recordForm.chemistryResult" label="1">合格</el-radio>
            </el-col>
            <el-col :span="3">
              <el-radio v-model="recordForm.chemistryResult" label="2">不合格</el-radio>
            </el-col>
            <el-col :span="9">
              <el-form-item v-show="recordForm.chemistryResult==='2'" label="不合格原因">
                <el-select v-model="recordForm.chemistryReason" placeholder="请选择不合格理由">
                  <el-option
                    v-for="(val,key) in ssd_qt_chemistry_reason"
                    :key="key"
                    :label="val"
                    :value="key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="拍照上传">
            <div v-if="isShow || isUpload.chemical">
              <img
                class="main-box-img"
                :src="imgSrc(recordForm.chemistryImageInfo)"
                @click="imgClick(recordForm.chemistryImageInfo)"
              >
            </div>
            <div v-else>
              <div class="main-box-remind">
                请使用PDA拍摄并上传化学指示卡监测结果
              </div>
              <el-upload
                :multiple="true"
                :show-file-list="true"
                accept=".jpg, .jpeg, .png, .gif"
                :headers="{Authorization:token}"
                :on-remove="handleRemove"
                :on-success="handlechemical"
                :file-list="fileList"
                :before-upload="beforeUpload"
                class="editor-slide-upload"
                :action="action"
                list-type="picture-card"
                name="files"
              >
                <div class="img-remind">
                  <i class="el-icon-picture-outline"><br><span>请上传图片</span></i>
                </div>
              </el-upload>
            </div>
          </el-form-item>
        </el-row>
      </div>
      <!-- 生物监测 -->
      <div class="main-box">
        <div class="main-box-title">生物监测</div>
        <el-row>
          <el-form-item label="监测效果">
            <!-- <el-col :span="3">
              <el-radio v-model="recordForm.biologyReuslt" label="0">不监测</el-radio>
            </el-col> -->
            <el-col :span="3">
              <el-radio v-model="recordForm.biologyReuslt" label="1">合格</el-radio>
            </el-col>
            <el-col :span="3">
              <el-radio v-model="recordForm.biologyReuslt" label="2">不合格</el-radio>
            </el-col>
            <el-col :span="9">
              <el-form-item v-show="recordForm.biologyReuslt==='2'" label="不合格原因">
                <el-select v-model="recordForm.biologyReason" placeholder="请选择不合格理由">
                  <el-option
                    v-for="(val,key) in ssd_qt_biology_reason"
                    :key="key"
                    :label="val"
                    :value="key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="拍照上传">
            <div v-if="isShow || isUpload.biological">
              <img
                class="main-box-img"
                :src="imgSrc(recordForm.biologyImageInfo)"
                @click="imgClick(recordForm.biologyImageInfo)"
              >
            </div>
            <div v-else>
              <div class="main-box-remind">
                请使用PDA拍摄并上传化生物培养结果
              </div>
              <el-upload
                :multiple="true"
                :show-file-list="true"
                accept=".jpg, .jpeg, .png, .gif"
                :headers="{Authorization:token}"
                :on-remove="handleRemove"
                :on-success="handlebiological"
                :file-list="fileList"
                :before-upload="beforeUpload"
                class="editor-slide-upload"
                :action="action"
                list-type="picture-card"
                name="files"
              >
                <div class="img-remind">
                  <i class="el-icon-picture-outline"><br><span>请上传图片</span></i>
                </div>
              </el-upload>
            </div>
          </el-form-item>
        </el-row>
      </div>
      <div class="main-box">
        <div class="main-box-title">监测人签名</div>
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="监测人" prop="monitUser">
              <el-input v-model="recordForm.monitUser" placeholder="请扫码签名" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="核对人" prop="checkUser">
              <el-input v-model="recordForm.checkUser" placeholder="请扫码签名" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <el-button type="primary" class="submit-button" :loading="buttonLoading" @click="handleSubmit">提交表单</el-button>
    <el-image-viewer
      v-if="imgShow"
      :on-close="viewerClose"
      :url-list="srcList"
    />
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import api from '@/api'
import { getToken } from '@/utils/auth'
import APIconfig from '@/api/APIconfig'
const fileURL = api.fileURL

export default {
  components: {
    myfilters
  },
  data() {
    return {
      action: fileURL,
      buttonLoading: false,
      listLoading: true,
      recordForm: {
        // sterilizeBatchId: this.$route.query.id // 灭菌批次id
        // minTemperature: '', // 最低温度
        // minPressure: '', // 最低灭菌压力
        // sterilizeTimeLen: '', // 灭菌时间
        // maxTemperature: '', // 最高温度
        // maxPressure: '', // 最高灭菌压力
        // dryTimeLen: '', // 干燥时间
        // monitUser: '', // 监测人
        // checkUser: '', // 核对人
        // physicsResult: '1', // 物理检测结果
        // chemistryResult: '1', // 化学检测效果
        // biologyReuslt: '1', // 生物检测效果
        // physicsReason: '', // 物理检测不合格理由
        // chemistryReason: '', // 化学检测不合格理由
        // biologyReason: '', // 生物检测不合格理由
        // biologyImageInfo: '', // 生物检测图片信息
        // chemistryImageInfo: '', // 化学检测照片信息
        // physicsImageInfo: '' // 物理检测图片信息
      },
      // 检查是否上传
      isUpload: {
        physical: false,
        chemical: false,
        biological: false
      },
      fileList: [], // 文件列表
      form: {},
      ssd_qt_physics_reason: null,
      ssd_qt_biology_reason: null,
      ssd_qt_chemistry_reason: null,
      isShow: false, // PDA是否已经上传图片
      imgShow: false,
      srcList: [],
      rules: {
        minTemperature: [
          { required: true, message: '请输入最低灭菌温度', trigger: 'blur' }
        ],
        minPressure: [
          { required: true, message: '请输入最低灭菌压力', trigger: 'blur' }
        ],
        sterilizeTimeLen: [
          { required: true, message: '请输入灭菌时间', trigger: 'blur' }
        ],
        maxTemperature: [
          { required: true, message: '请输入最高灭菌温度', trigger: 'blur' }
        ],
        maxPressure: [
          { required: true, message: '请输入最高灭菌压力', trigger: 'blur' }
        ],
        dryTimeLen: [
          { required: true, message: '请输入干燥时间', trigger: 'blur' }
        ],
        monitUser: [
          { required: true, message: '请输入监测人', trigger: 'blur' }
        ],
        checkUser: [
          { required: true, message: '请输入核对人', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    token() {
      const token = getToken()
      return `Bearer ${token}`
    },
    content() {
      return this.$route.query.id
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      this.listLoading = true
      api.getQualityDetail({ id: this.$route.query.id }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.recordForm = response.data.entity
          const tempForm = {
            sterilizeBatchId: this.$route.query.id,
            physicsResult: '1',
            chemistryResult: '1',
            biologyReuslt: '1'
          }
          Object.assign(this.recordForm, tempForm) // 写默认值

          this.ssd_qt_physics_reason = response.data.dictData.ssd_qt_physics_reason
          this.ssd_qt_biology_reason = response.data.dictData.ssd_qt_biology_reason
          this.ssd_qt_chemistry_reason = response.data.dictData.ssd_qt_chemistry_reason
          this.$set(this.recordForm, 'physicsReason', Object.keys(this.ssd_qt_physics_reason)[0])
          this.$set(this.recordForm, 'chemistryReason', Object.keys(this.ssd_qt_chemistry_reason)[0])
          this.$set(this.recordForm, 'biologyReason', Object.keys(this.ssd_qt_biology_reason)[0])
          this.listLoading = false
        }
      })
      // 检测PDA是否上传图片
      api.getPdaImage({ id: this.$route.query.id }).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          if (response.data.physicsImageInfo) {
            this.recordForm.biologyImageInfo = response.data.biologyImageInfo
            this.recordForm.physicsImageInfo = response.data.physicsImageInfo
            this.recordForm.chemistryImageInfo = response.data.chemistryImageInfo
            this.isShow = true
          }
        }
      })
    },
    // 图片url
    imgSrc(imageInfo) {
      return `${APIconfig.baseUrl}/${imageInfo}`
    },
    // 图片查看
    viewerClose() {
      this.imgShow = false
    },
    // 图片点击
    imgClick(url) {
      this.srcList = []
      this.srcList.push(this.imgSrc(url))
      this.imgShow = true
    },
    // 移除上传内容
    handleRemove(file) {
      // api.deleteImage({ id: file.uid }).then(res => {
      //   if (res.code === '200' && res.data.busiCode === '1') {
      //     this.$message({
      //       message: '删除成功',
      //       type: 'success'
      //     })
      //   } else {
      //     this.$message({
      //       message: '删除失败，请重试',
      //       type: 'error'
      //     })
      //   }
      // })
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
    // 物理照片上传成功
    handlephysical(response, file) {
      if (!response.success) {
        return this.$message.error(response.errMsg)
      }
      this.recordForm.physicsImageInfo = response.resData[0].filePath
      this.isUpload.physical = true
    },
    // 化学照片上传成功
    handlechemical(response, file) {
      if (!response.success) {
        return this.$message.error(response.errMsg)
      }
      this.recordForm.chemistryImageInfo = response.resData[0].filePath
      this.isUpload.chemical = true
    },
    // 生物照片上传成功
    handlebiological(response, file) {
      if (!response.success) {
        return this.$message.error(response.errMsg)
      }
      this.recordForm.biologyImageInfo = response.resData[0].filePath
      this.isUpload.biological = true
    },
    // 提交表单
    handleSubmit() {
      this.$refs.recordForm.validate(async valid => {
        if (valid) {
          if (!this.checkValid()) {
            return this.$message({
              type: 'warning',
              message: '请上传所有的照片'
            })
          } // 判断图片是否全部上传
          this.buttonLoading = true
          api.toQtRecord(this.recordForm).then(response => {
            if (response.code === '200' && response.data.busiCode === '1') {
              this.$router.go(-1)
              this.buttonLoading = false
              this.$message({
                type: 'success',
                message: response.data.msg
              })
            }
          })
        }
      })
    },
    // 检测图片是否全部上传或者没上传
    checkValid() {
      if ((this.recordForm.biologyImageInfo && this.recordForm.chemistryImageInfo && this.recordForm.physicsImageInfo) ||
      (!this.recordForm.biologyImageInfo && !this.recordForm.chemistryImageInfo && !this.recordForm.physicsImageInfo)) {
        if (this.recordForm.physicsResult === '1') {
          this.recordForm.physicsReason = null
        }
        if (this.recordForm.chemistryResult === '1') {
          this.recordForm.chemistryReason = null
        }
        if (this.recordForm.biologyReuslt === '1') {
          this.recordForm.biologyReason = null
        }
        return true
      }
      return false
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.delivery-container {
  padding: 30px;
  background-color:#F0F2F5;
  min-height: calc(100vh - 50px);
  .submit-button{
    width:145px;
    height:50px
  }
}
::v-deep.main-box{
  background: #FFFFFF;
  padding: 30px 30px 10px;
  box-shadow: 4px 4px 40px 0px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  margin: 30px 0;
  .main-box-title{
    font-size: 18px;
    color: #999999;
    line-height: 24px;
    padding-bottom: 15px;
  }
  .el-form-item__label{
    text-align: center;
    color: #666;
    font-weight: normal;
  }
  .main-box-suffix{
    padding:0 10px
  }
  .main-box-img{
    width: 150px;
    cursor:pointer
  }
  .main-box-remind{
    color:#F9944A;
    font-size:12px
  }
  .img-remind{
    margin-top:25px;
    span{
      font-size: 15px;
    }
  }
}

</style>
