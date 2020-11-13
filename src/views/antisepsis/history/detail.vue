<template>
  <div class="delivery-container">
    <!-- 头部 -->
    <myfilters
      title="灭菌详情"
      :content="content"
      :back-button="true"
    />
    <!-- 头部结束 -->
    <!-- 表单 -->
    <el-form ref="recordForm" v-loading="listLoading" :model="recordForm" label-width="90px">
      <!-- 设备信息 -->
      <div class="main-box">
        <div class="main-box-title">
          设备信息
        </div>
        <el-row :gutter="50">
          <el-col :span="6">
            <el-form-item label="设备名称">
              <span>{{ recordForm.boxName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="灭菌炉次">
              <span>{{ recordForm.batchNoDay }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开炉时间">
              <span>{{ recordForm.sterilizeStartTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="灭菌人">
              <span>{{ recordForm.sterilizeUser }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="6">
            <el-form-item label="灭菌炉号">
              <span>{{ recordForm.code }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="灭菌程序">
              <span>{{ recordForm.sterilizeProgramName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结束时间">
              <span>{{ recordForm.sterilizeEndTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="核对人">
              <span>{{ recordForm.checkUser }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <!-- 灭菌物品 -->
      <div class="main-box">
        <div class="main-box-title">
          灭菌物品
        </div>
        <el-table v-loading="listLoading" :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="100" />
          <el-table-column label="编号" prop="serialNumber" />
          <el-table-column label="名称" prop="packetDefineName" />
          <el-table-column label="数量" prop="packetInstancesCount" />
        </el-table>
      </div>
      <!-- 物理监测 -->
      <div class="main-box" style="padding-bottom:0">
        <div class="main-box-title">物理监测</div>
        <el-row>
          <el-col :span="18">
            <el-row>
              <el-col :span="8">
                <el-form-item label="最低温度">
                  <span>{{ recordForm.minTemperature }} </span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="最低压力">
                  <span>{{ recordForm.minPressure }} </span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="灭菌时间">
                  <span>{{ recordForm.sterilizeTimeLen }} </span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="最高温度">
                  <span>{{ recordForm.maxTemperature }} </span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="最高压力">
                  <span>{{ recordForm.maxPressure }} </span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="干燥时间">
                  <span>{{ recordForm.dryTimeLen }} </span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="监测效果">
                  <span>{{ state(recordForm.physicsResult) }} </span>
                </el-form-item>
              </el-col>
              <el-col v-if="recordForm.physicsReason" :span="12">
                <el-form-item label="不合格原因">
                  <span>{{ ssd_qt_physics_reason[recordForm.physicsReason] }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-form-item label="参数图片">
              <img
                class="main-box-img"
                :src="imgSrc(recordForm.physicsImageInfo)"
                @click="imgClick(recordForm.physicsImageInfo)"
              >
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <!-- 化学监测 -->
      <div class="main-box">
        <div class="main-box-title">化学监测</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="监测效果">
              <span>{{ state(recordForm.chemistryResult) }}</span>
            </el-form-item>
          </el-col>
          <el-col v-if="recordForm.chemistryReason" :span="8">
            <el-form-item label="不合格原因">
              <span>{{ ssd_qt_chemistry_reason[recordForm.chemistryReason] }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="结果照片">
            <img
              class="main-box-img"
              :src="imgSrc(recordForm.chemistryImageInfo)"
              @click="imgClick(recordForm.chemistryImageInfo)"
            >
          </el-form-item>
        </el-row>
      </div>
      <!-- 生物监测 -->
      <div class="main-box">
        <div class="main-box-title">生物监测</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="监测效果">
              <span>{{ state(recordForm.biologyReuslt) }}</span>
            </el-form-item>
          </el-col>
          <el-col v-if="recordForm.biologyReason" :span="8">
            <el-form-item label="不合格原因">
              <span>{{ ssd_qt_biology_reason[recordForm.biologyReason] }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="结果照片">
            <img
              class="main-box-img"
              :src="imgSrc(recordForm.biologyImageInfo)"
              @click="imgClick(recordForm.biologyImageInfo)"
            >
          </el-form-item>
        </el-row>
      </div>
    </el-form>
    <!-- 表单结束 -->
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
import APIconfig from '@/api/APIconfig'
export default {
  components: {
    myfilters
  },
  data() {
    return {
      imgShow: false, // 显示照片
      recordForm: {}, // 表单信息
      tableData: [], // 物品信息
      srcList: [], // 图片信息
      listLoading: true,
      ssd_qt_biology_reason: null,
      ssd_qt_chemistry_reason: null,
      ssd_qt_physics_reason: null
    }
  },
  computed: {
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
      // 获取记录表详情
      api.getQualityDetail({ id: this.$route.query.id }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.recordForm = response.data.entity
          this.ssd_qt_physics_reason = response.data.dictData.ssd_qt_physics_reason
          this.ssd_qt_biology_reason = response.data.dictData.ssd_qt_biology_reason
          this.ssd_qt_chemistry_reason = response.data.dictData.ssd_qt_chemistry_reason
          this.listLoading = false
        }
      })
      this.listLoading = true
      // 获取包
      api.toDefinedLoadingPacket({ id: this.$route.query.id }).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          this.tableData = response.data.records
          this.listLoading = false
        }
      })
    },
    // 质量
    state(quality) {
      const stateMap = {
        '1': '合格',
        '2': '不合格'
      }
      return stateMap[quality]
    },
    // 图片查看
    imgClick(url) {
      this.srcList = []
      this.srcList.push(this.imgSrc(url))
      this.imgShow = true
    },
    // 图片查看关闭
    viewerClose() {
      this.imgShow = false
    },
    // 图片url
    imgSrc(imageInfo) {
      if (imageInfo) {
        return `${APIconfig.baseUrl}/${imageInfo}`
      }
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
  padding: 30px 30px 20px;
  margin: 30px 0;
  box-shadow: 4px 4px 40px 0px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  .main-box-title{
    font-size: 18px;
    color: #999999;
    line-height: 24px;
    padding-bottom: 15px;
  }
  .el-form-item__label{
    text-align: left;
    color: #9EAEC3;
    font-weight: normal;
  }
  .main-box-img{
    width: 150px;
    cursor:pointer
  }
}
img:hover {
  cursor: pointer;
}
</style>
