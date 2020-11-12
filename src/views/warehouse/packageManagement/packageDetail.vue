<template>
  <div>
    <div style="padding:30px">
      <!-- header -->
      <myfilters
        title="糖足包明细"
        :content="content"
        :back-button="true"
      />
      <!-- header end -->
      <el-row :gutter="20">
        <el-col :span="12">
          <!-- table header -->
          <el-table :data="tableData" style="width: 100%" class="hidden-table">
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
              <el-table-column prop="projectCode" />
              <el-table-column prop="projectName" width="200px" />
              <el-table-column prop="number" />
              <el-table-column prop="unit" />
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
                <el-tab-pane label="包装教程" name="viedoCourse">
                  <div style="margin:10px 0">
                    <!-- scrollbar -->
                    <el-scrollbar style="height:380px">
                      <!-- collapse -->
                      <el-collapse v-model="activeNames">
                        <el-collapse-item title="图片教程" name="pictureCourse">
                          <pictureCourse />
                        </el-collapse-item>
                        <el-collapse-item title="视频教程" name="viedoCourse">
                          <viedoCourse />
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
        <el-form ref="footerData" :model="footerData" label-width="80px">
          <el-row>
            <el-col :span="7">
              <el-form-item label="有效范围">
                <span>{{ footerData.range }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="是否打包">
                <span>{{ footerData.isPacketed }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="包装材料">
                <span>{{ footerData.material }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item label="物品分类">
                <span>{{ footerData.classification }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="是否清洗">
                <span>{{ footerData.isCleaned }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="清洗程序">
                <span>{{ footerData.cleaningProgram }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item label="有效天数">
                <span>{{ footerData.valildDay }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="是否灭菌">
                <span>{{ footerData.isSterilized }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="灭菌程序">
                <span>{{ footerData.sterilizedProgram }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="灭菌方法">
                <span>{{ footerData.sterilizedMethod }}</span>
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
import viedoCourse from './viedoCourse'
import pictureCourse from './pictureCourse'
export default {
  components: {
    myfilters,
    packageImage,
    viedoCourse,
    pictureCourse
  },
  data() {
    return {
      activeName: 'packageImage', // tabs选项
      activeNames: 'pictureCourse', // collapse选项
      // 底部数据
      footerData: {
        range: '本科室及下级科室',
        classification: '供应室使用',
        valildDay: 30,
        isPacketed: '是',
        isCleaned: '是',
        isSterilized: '是',
        material: '无纺布',
        cleaningProgram: 'P1',
        sterilizedProgram: 'P1',
        sterilizedMethod: '高温灭菌'
      },
      // table data
      tableData: [
        {
          projectCode: '10001001',
          projectName: '弯钳(16cm以上)',
          number: 1,
          unit: '把'
        },
        {
          projectCode: '10001002',
          projectName: '有齿镊(16cm以上)',
          number: 1,
          unit: '把'
        },
        {
          projectCode: '10001003',
          projectName: '无齿镊(16cm以上)',
          number: 1,
          unit: '把'
        },
        {
          projectCode: '10001004',
          projectName: '大弯剪(16cm以上)',
          number: 1,
          unit: '把'
        },
        {
          projectCode: '10001005',
          projectName: '弯钳(16cm以上)',
          number: 1,
          unit: '把'
        },
        {
          projectCode: '10001006',
          projectName: '五官小弯剪',
          number: 1,
          unit: '把'
        },
        {
          projectCode: '10001007',
          projectName: '五官小直剪',
          number: 1,
          unit: '把'
        },
        {
          projectCode: '10001007',
          projectName: '弯盘1',
          number: 1,
          unit: '个'
        },
        {
          projectCode: '10001007',
          projectName: '弯盘1',
          number: 1,
          unit: '个'
        },
        {
          projectCode: '10001007',
          projectName: '弯盘1',
          number: 1,
          unit: '个'
        },
        {
          projectCode: '10001007',
          projectName: '弯盘1',
          number: 1,
          unit: '个'
        }
      ]
    }
  },
  computed: {
    // table data length
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  methods: {
    // 提交按钮点击
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
::v-deep .hidden-table .el-table__body-wrapper {
  display: none;
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
