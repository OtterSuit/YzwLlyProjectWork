<template>
  <div>
    <div style="padding:30px">
      <!-- header -->
      <myfilters
        :title="title"
        :content="content"
        :back-button="true"
      />
      <!-- header end -->
      <el-row :gutter="20">
        <el-col :span="12">
          <!-- table header -->
          <el-table v-loading="listLoading" :data="tableData" style="width: 100%" class="hidden-table">
            <el-table-column label="序号" type="index" width="80px" />
            <el-table-column label="项目编码" />
            <el-table-column label="项目名称" width="200px" />
            <el-table-column label="数量" />
            <el-table-column label="单位" />
          </el-table>
          <!-- table header end -->
          <!-- scrollbar -->
          <el-scrollbar style="height:480px;background:#fff">
            <!-- table body -->
            <el-table :data="tableData" style="100%" :show-header="false">
              <el-table-column type="index" width="80px" />
              <el-table-column prop="itemCode" />
              <el-table-column prop="name" width="200px" />
              <el-table-column prop="itemQuantity" />
              <el-table-column>
                <template slot-scope="scope">
                  <span>{{ ssd_measure_unit[scope.row.miniUnit] }}</span>
                </template>
              </el-table-column>
            </el-table>
            <!-- table body end -->
          </el-scrollbar>
          <!-- scrollbar end -->
        </el-col>
        <el-col :span="12">
          <div class="main-box" style="height: 525px">
            <div class="inline-col">
              <!-- tabs -->
              <el-tabs v-model="activeName">
                <el-tab-pane :key="'packageImage'" label="器械打包图片" name="packageImage">
                  <div style="margin-top:10px">
                    <packageImage />
                  </div>
                </el-tab-pane>
                <el-tab-pane label="包装教程" name="videoCourse">
                  <div style="margin:10px 0">
                    <!-- scrollbar -->
                    <el-scrollbar style="height:380px">
                      <!-- collapse -->
                      <el-collapse v-model="activeNames">
                        <el-collapse-item title="图片教程" name="pictureCourse">
                          <pictureCourse />
                        </el-collapse-item>
                        <el-collapse-item title="视频教程" name="videoCourse">
                          <videoCourse />
                        </el-collapse-item>
                      </el-collapse>
                      <!-- collapse end -->
                    </el-scrollbar>
                    <!-- scrollbar end -->
                  </div>
                  <el-button type="primary" class="course-submit" style="width:120px" @click="courseSubmit">提交</el-button>
                </el-tab-pane>
              </el-tabs>
              <!-- tabs end -->
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 底部信息 -->
      <div class="footer-box">
        <!-- form -->
        <el-form ref="packetForm" :model="packetForm" label-width="80px">
          <el-row>
            <el-col :span="7">
              <el-form-item label="有效范围">
                <span>{{ packetForm.effctiveRange }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="是否打包">
                <span>{{ ssd_common_boolean[ packetForm.packFlag ] }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="包装材料">
                <span>{{ packetForm.packMaterial }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item label="物品分类">
                <span>{{ ssd_packet_category[packetForm.category] }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="是否清洗">
                <span>{{ ssd_common_boolean[packetForm.cleanFlag] }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="清洗程序">
                <span>{{ CLEAN_PROGRAM[packetForm.cleanPro] }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item label="有效天数">
                <span>{{ VALID_PERIOD[packetForm.validDay] }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="是否灭菌">
                <span>{{ ssd_common_boolean [packetForm.sterilizeFlag ] }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="灭菌程序">
                <span>{{ STERILIZE_PROGRAM[packetForm.sterilizePro] }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="灭菌方法">
                <span>{{ STERILIZE_METHOD[packetForm.sterilizeMethod] }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- form end -->
      </div>
      <!-- 底部信息结束 -->
    </div>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import packageImage from './packageImage'
import videoCourse from './videoCourse'
import pictureCourse from './pictureCourse'
import api from '@/api'

export default {
  components: {
    myfilters,
    packageImage,
    videoCourse,
    pictureCourse
  },
  data() {
    return {
      listLoading: true, // 等待加载
      id: '', // 包定义id
      ssd_measure_unit: '', // 单位
      ssd_common_boolean: '', // 是否
      ssd_effective_range: '', // 有效范围
      ssd_packet_category: '', // 包分类
      CLEAN_PROGRAM: [], // 清洗程序
      STERILIZE_METHOD: [], // 灭菌方法
      STERILIZE_PROGRAM: [], // 灭菌程序
      VALID_PERIOD: [], // 有效天数
      BARCODE_TYPE: [], // 包装材料
      activeNames: 'pictureCourse', // 活跃的tab
      activeName: 'packageImage', // 活跃的collapse
      packetForm: {}, // 包详细信息
      tableData: [], // 器械物资
      totalCount: 0
    }
  },
  computed: {
    // table data length
    content() {
      return '共' + this.totalCount + '条数据'
    }
  },
  created() {
    this.id = this.$route.query.packetId // 获取包定义id
    this.title = this.$route.query.packetName // 获取包名称
    this.fetchData() // 获取数据
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.toGetpacket({ id: this.id }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          // 获取字典
          this.ssd_common_boolean = response.data.dict.ssd_common_boolean
          this.ssd_packet_category = response.data.dict.ssd_packet_category
          this.packetForm = response.data.packet // 获取包详细信息
          this.totalCount = response.data.totalCount
        }
      })
      // 获取常数字典
      api.toconstanttypeBatch({
        constantCodes: [
          'CLEAN_PROGRAM',
          'STERILIZE_METHOD',
          'STERILIZE_PROGRAM',
          'VALID_PERIOD',
          'BARCODE_TYPE'
        ]
      }).then(response => {
        this.CLEAN_PROGRAM = response.data.constantsDetail.CLEAN_PROGRAM
        this.STERILIZE_METHOD = response.data.constantsDetail.STERILIZE_METHOD
        this.STERILIZE_PROGRAM = response.data.constantsDetail.STERILIZE_PROGRAM
        this.VALID_PERIOD = response.data.constantsDetail.VALID_PERIOD
        this.BARCODE_TYPE = response.data.constantsDetail.BARCODE_TYPE
      })
      // 获取包内物资
      api.toconpacketdetailPage({ packetId: this.id }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.tableData = response.data.records // 获取器械物资
          this.ssd_measure_unit = response.data.dictData.ssd_measure_unit // 获取单位
        }
        this.listLoading = false
      })
    },
    courseSubmit() {
      this.$message({
        message: '提交成功',
        type: 'success'
      })
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .el-collapse-item {
  background:#f6f6f6;
  padding: 0 30px;
  margin-bottom: 10px;
  position: relative;
  .el-collapse-item__header {
    color: black;
    font-size:14px;
    line-height:19px;
    height: 24px;
    border-bottom: 0;
    background:#f6f6f6;
    padding-left: 2px;
  }
  .el-collapse-item__arrow {
    position: absolute;
    top: 8px;
    left: 10px;
    font-size: 14px;
    transform: rotate(-90deg);
  }
  .el-collapse-item__arrow.is-active {
    transform: rotate(90deg);
  }
  .el-collapse-item__wrap {
    border-bottom: 0;
  }
  .el-collapse-item__content {
    background:#f6f6f6;
    padding: 16px 0 10px;
  }
}

::v-deep .footer-box{
  font-size: 14px;
  margin-top: 20px;
  padding: 24px 40px;
  border:1px solid rgba(216,216,216,1);
  background:#f6f6f6;
  .el-form-item__label{
    text-align: left;
    color: #9EAEC3;
    font-weight: normal;
  }

}
.el-dropdown-menu__item {
  padding: 0 20px;
  text-align: left;
  width: 110px;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
::v-deep .el-tabs__content {
  display: block;
}
::v-deep .main-box {
  padding: 20px 20px  0 20px;
  border:1px solid rgba(216,216,216,1);
  background:#f6f6f6;
  .el-tabs__nav-wrap::after {
    display: none;
  }
  .el-tabs__item {
    line-height: 24px;
    font-size: 18px;
  }
  .el-tabs__active-bar {
    height: 3px;
  }
  .el-tabs__header {
    margin-bottom: 10px;
  }
  .children-code {
    float: right;
    color: #AFB3C0;
  }
  .course-submit {
    float: right;
  }
}
</style>
