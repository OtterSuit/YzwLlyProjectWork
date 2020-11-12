<template>
  <div class="delivery-container">
    <myfilters
      title="灭菌详情"
      content="NO.0033124"
      :back-button="true"
    />
    <el-form ref="recordForm" :model="recordForm" label-width="70px">
      <div class="main-box">
        <div class="main-box-title">
          设备信息
        </div>
        <el-row :gutter="50">
          <el-col :span="6">
            <el-form-item label="设备名称">
              <span>{{ recordForm.equipment }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="灭菌炉次">
              <span>{{ recordForm.furnaceTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开炉时间">
              <span>{{ recordForm.furnaceStart }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="灭菌人">
              <span>{{ recordForm.antisepsisPerson }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="6">
            <el-form-item label="灭菌炉号">
              <span>{{ recordForm.furnaceNum }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="灭菌程序">
              <span>{{ recordForm.program }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结束时间">
              <span>{{ recordForm.furnaceEnd }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="核对人">
              <span>{{ recordForm.checkPerson }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="main-box">
        <div class="main-box-title">
          灭菌物品
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="100px" />
          <el-table-column label="编号" prop="id" />
          <el-table-column label="名称" prop="name" />
          <el-table-column label="数量" prop="count" />
        </el-table>
      </div>
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
                  <span>{{ recordForm.antisepsisTime }} </span>
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
                  <span>{{ recordForm.dryTime }} </span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-form-item label="参考图片">
              <img src="@/assets/images/erwm.png" alt="" height="100">
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="main-box">
        <div class="main-box-title">化学监测</div>
        <el-row>
          <el-form-item label="监测效果">
            <span>{{ state(recordForm.chemicalQuality) }}</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="结果照片">
            <img src="@/assets/images/erwm.png" width="100">
          </el-form-item>
        </el-row>
      </div>
      <div class="main-box">
        <div class="main-box-title">生物监测</div>
        <el-row>
          <el-form-item label="监测效果">
            <span>{{ state(recordForm.biologicalQuality) }}</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="结果照片">
            <img src="@/assets/images/erwm.png" alt="" width="100" @click="handleImg('@/assets/images/erwm.png')">
          </el-form-item>
        </el-row>
      </div>
    </el-form>
    <el-image-viewer
      v-show="imgShow"
      :on-close="viewerClose"
      :url-list="[imgSrc]"
    />
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
      imgShow: false,
      imgSrc: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      recordForm: {
        equipment: '灭菌设备012',
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
        antisepsisPerson: '赵美丽',
        checkPerson: '张萌萌',
        physicalQuality: '1',
        chemicalQuality: '1',
        biologicalQuality: '2',
        physicalReason: '',
        chemicalReason: '',
        biologicalReason: ''
      },
      tableData: [
        {
          id: 10001,
          name: '糖足包',
          count: 10
        },
        {
          id: 10002,
          name: '脐穿包',
          count: 10
        }
      ]
    }
  },
  methods: {
    state(quality) {
      const stateMap = {
        '1': '合格',
        '2': '不合格'
      }
      return stateMap[quality]
    },
    handleImg(src) {
      this.imgShow = true
    },
    viewerClose() {
      this.imgShow = false
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
}
img:hover {
  cursor: pointer;
}
</style>
