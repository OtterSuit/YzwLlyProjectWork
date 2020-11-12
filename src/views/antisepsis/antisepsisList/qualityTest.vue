<template>
  <div class="delivery-container">
    <myfilters
      title="灭菌质量记录表"
      content="NO.0033124"
      :back-button="true"
    />
    <el-form ref="recordForm" :model="recordForm" label-width="70px">
      <div class="main-box">
        <div class="main-box-title">
          设备信息
        </div>
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="灭菌日期">
              <el-input v-model="recordForm.date" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="灭菌炉号">
              <el-input v-model="recordForm.furnaceNum" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开炉时间">
              <el-input v-model="recordForm.furnaceStart" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="灭菌程序">
              <el-input v-model="recordForm.program" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="灭菌炉次">
              <el-input v-model="recordForm.furnaceTime" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束时间">
              <el-input v-model="recordForm.furnaceEnd" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="main-box">
        <div class="main-box-title">
          物理监测
        </div>
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="最低灭菌温度">
              <el-input v-model="recordForm.minTemperature">
                <span slot="suffix" style="padding:0 10px">℃</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最低灭菌压力">
              <el-input v-model="recordForm.minPressure">
                <span slot="suffix" style="padding:0 10px">Kpa</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="灭菌时间">
              <el-input v-model="recordForm.antisepsisTime">
                <span slot="suffix" style="padding:0 10px">min</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="最高灭菌温度">
              <el-input v-model="recordForm.maxTemperature">
                <span slot="suffix" style="padding:0 10px">℃</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最高灭菌压力">
              <el-input v-model="recordForm.maxPressure">
                <span slot="suffix" style="padding:0 10px">Kpa</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="干燥时间">
              <el-input v-model="recordForm.dryTime">
                <span slot="suffix" style="padding:0 10px">min</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="监测效果">
            <el-col :span="3">
              <el-radio v-model="recordForm.physicalQuality" label="1">合格</el-radio>
            </el-col>
            <el-col :span="3">
              <el-radio v-model="recordForm.physicalQuality" label="2">不合格</el-radio>
            </el-col>
            <!-- <el-input v-if="recordForm.physicalQuality==='2'" v-model="recordForm.physicalReason" /> -->
            <el-col :span="9">
              <el-form-item v-show="recordForm.physicalQuality==='2'" label="不合格原因">
                <el-select v-model="recordForm.physicalReason" placeholder="请选择不合格理由">
                  <el-option label="灭菌温度达不到要求" value="灭菌温度达不到要求" />
                  <el-option label="灭菌压力达不到要求" value="灭菌压力达不到要求" />
                  <el-option label="脉动次数达不到要求" value="脉动次数达不到要求" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="拍照上传">
            <div v-if="isUpload.physical" style="color:#F9944A;font-size:12px">
              请使用PDA拍摄并上传物理测试结果
            </div>
            <el-upload
              :multiple="true"
              :on-success="handlephysical"
              class="editor-slide-upload"
              action="https://httpbin.org/post"
              list-type="picture-card"
            >
              <div style="margin-top:25px">
                <i class="el-icon-picture-outline"><br><span style="font-size:15px">请上传图片</span></i>
              </div>
            </el-upload>
          </el-form-item>
        </el-row>
      </div>
      <div class="main-box">
        <div class="main-box-title">化学监测</div>
        <el-row>
          <el-form-item label="监测效果">
            <el-col :span="3">
              <el-radio v-model="recordForm.chemicalQuality" label="1">合格</el-radio>
            </el-col>
            <el-col :span="3">
              <el-radio v-model="recordForm.chemicalQuality" label="2">不合格</el-radio>
            </el-col>
            <el-col :span="9">
              <el-form-item v-show="recordForm.chemicalQuality==='2'" label="不合格原因">
                <el-select v-model="recordForm.chemicalReason" placeholder="请选择不合格理由">
                  <el-option label="化学指示卡未变色" value="化学指示卡未变色" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="拍照上传">
            <div v-if="isUpload.chemical" style="color:#F9944A;font-size:12px">
              请使用PDA拍摄并上传化学指示卡监测结果
            </div>
            <el-upload
              :multiple="true"
              class="editor-slide-upload"
              action="https://httpbin.org/post"
              list-type="picture-card"
              :on-success="handlechemical"
            >
              <div style="margin-top:25px">
                <i class="el-icon-picture-outline"><br><span style="font-size:15px">请上传图片</span></i>
              </div>
            </el-upload>
          </el-form-item>
        </el-row>
      </div>
      <div class="main-box">
        <div class="main-box-title">生物监测</div>
        <el-row>
          <el-form-item label="监测效果">
            <el-col :span="3">
              <el-radio v-model="recordForm.biologicalQuality" label="0">不监测</el-radio>
            </el-col>
            <el-col :span="3">
              <el-radio v-model="recordForm.biologicalQuality" label="1">合格</el-radio>
            </el-col>
            <el-col :span="3">
              <el-radio v-model="recordForm.biologicalQuality" label="2">不合格</el-radio>
            </el-col>
            <el-col :span="9">
              <el-form-item v-show="recordForm.biologicalQuality==='2'" label="不合格原因">
                <el-select v-model="recordForm.biologicalReason" placeholder="请选择不合格理由">
                  <el-option label="生物培养阳性" value="生物培养阳性" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="拍照上传">
            <div v-if="isUpload.biological" style="color:#F9944A;font-size:12px">
              请使用PDA拍摄并上传化生物培养结果
            </div>
            <el-upload
              class="avatar-uploader"
              :multiple="true"
              action="https://httpbin.org/post"
              list-type="picture-card"
              :on-success="handlebiological"
            >
              <div style="margin-top:25px">
                <i class="el-icon-picture-outline"><br><span style="font-size:15px">请上传图片</span></i>
              </div>
            </el-upload>
          </el-form-item>
        </el-row>
      </div>
      <div class="main-box">
        <div class="main-box-title">监测人签名</div>
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="灭菌人">
              <el-input v-model="recordForm.antisepsisPerson" placeholder="请扫码签名" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="核对人">
              <el-input v-model="recordForm.checkPerson" placeholder="请扫码签名" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <el-button type="primary" style="width:145px;heigth:50px" @click="handleSubmit">提交表单</el-button>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'

export default {
  components: {
    myfilters
  },
  data() {
    return {
      recordForm: {
        date: '2020.08.10 09:35',
        furnaceNum: '012',
        furnaceStart: '2020.08.10 09:35:12',
        program: 'B-D',
        furnaceTime: '2',
        furnaceEnd: '2020.08.10 09:39:19',
        minTemperature: '134.6',
        minPressure: '212.3',
        antisepsisTime: '180',
        maxTemperature: '135',
        maxPressure: '215.1',
        dryTime: '90',
        antisepsisPerson: '',
        checkPerson: '',
        physicalQuality: '1',
        chemicalQuality: '1',
        biologicalQuality: '2',
        physicalReason: '',
        chemicalReason: '',
        biologicalReason: ''
      },
      isUpload: {
        physical: true,
        chemical: true,
        biological: true
      }
    }
  },
  methods: {
    handlephysical() {
      this.isUpload.physical = false
    },
    handlechemical() {
      this.isUpload.chemical = false
    },
    handlebiological() {
      this.isUpload.biological = false
    },
    handleSubmit() {
      console.log(this.recordForm)
      this.$router.go(-1)
      this.$message({
        type: 'success',
        message: '提交成功'
      })
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.delivery-container {
  padding: 30px;
  background-color:#F0F2F5;
  min-height: calc(100vh - 50px);
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
    text-align: left;
    color: #666;
    font-weight: normal;
  }
}

</style>
