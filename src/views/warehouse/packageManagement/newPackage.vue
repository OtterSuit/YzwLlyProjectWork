<template>
  <div>
    <div style="padding:30px">
      <!-- header -->
      <myfilters
        title="创建新包"
        content="创建一个全新的器械包"
        :back-button="true"
      />
      <!-- header end -->
      <el-row :gutter="20">
        <el-col :span="12">
          <!-- form -->
          <el-form ref="form" :model="form" label-width="70px">
            <el-form-item label="新包名称">
              <el-input v-model="packageName" placeholder="请输入" />
            </el-form-item>
            <el-row :gutter="10">
              <el-col :span="16">
                <el-form-item label="添加器械">
                  <el-input v-model="form.machineName" placeholder="请输入器械名称" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-input v-model="form.count" placeholder="数量" />
              </el-col>
              <el-col :span="4">
                <el-button icon="el-icon-circle-plus-outline" style="width:100%" @click="addMachine">添加器械</el-button>
              </el-col>
            </el-row>
          </el-form>
          <!-- form end -->
          <div style="border:1px solid rgba(216,216,216,1);">
            <!-- table header -->
            <el-table :data="tableData" style="width: 100%" class="hidden-table">
              <el-table-column label="序号" type="index" width="100px" />
              <el-table-column label="器械名称" width="250px" />
              <el-table-column label="数量" />
              <el-table-column />
            </el-table>
            <!-- table header end -->
            <!-- scrollbar -->
            <el-scrollbar style="height:400px;background:#fff">
              <!-- table body -->
              <el-table :data="tableData" style="100%" :show-header="false">
                <el-table-column type="index" width="100px" />
                <el-table-column prop="machineName" width="250px" />
                <el-table-column prop="count" />
                <el-table-column>
                  <template slot-scope="scope">
                    <i
                      class="el-icon-top cursor-icon"
                      style="padding: 0 15px"
                      @click="handleUp(scope.$index,scope.row)"
                    />
                    <i
                      style="padding: 0 15px"
                      class="el-icon-bottom cursor-icon"
                      @click="handleDown(scope.$index,scope.row)"
                    />
                    <i
                      style="padding: 0 15px"
                      class="el-icon-delete cursor-icon"
                      @click="handleDelete(scope.$index,scope.row)"
                    />
                  </template>
                </el-table-column>
              </el-table>
              <!-- table body end -->
            </el-scrollbar>
            <!-- scrollbar end -->
          </div>

        </el-col>
        <el-col :span="12">
          <div class="main-box" style="height: 574px">
            <div class="inline-col">
              <!-- tabs -->
              <el-tabs v-model="activeName">
                <el-tab-pane :key="'packageImage'" label="器械打包图片" name="packageImage">
                  <div style="margin-top:10px">
                    <packageImage />
                  </div>
                </el-tab-pane>
                <el-tab-pane label="包装教程" name="videoCourse">
                  <div style="margin-top:10px">
                    <!-- scrollbar -->
                    <el-scrollbar style="height:480px">
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
                </el-tab-pane>
              </el-tabs>
              <!-- tabs end -->
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 底部选择框 -->
      <div class="footer-box">
        <el-row :gutter="20">
          <el-col :span="2">
            有效范围
          </el-col>
          <el-col :span="5">
            <el-select v-model="select.range" placeholder="请选择">
              <el-option label="本科室及下级科室" value="本科室及下级科室" />
            </el-select>
          </el-col>
          <el-col :span="2">
            是否打包
          </el-col>
          <el-col :span="1">
            <el-checkbox v-model="select.selectList" label="isPacketing">
              <span v-if="isAble('isPacketing')">是</span>
              <span v-else>否</span>
            </el-checkbox>
          </el-col>
          <el-col :span="5">
            <el-select v-model="select.material" placeholder="请选择包装材料" :disabled="!isAble('isPacketing')">
              <el-option label="无纺布" value="无纺布" />
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2">
            物品分类
          </el-col>
          <el-col :span="5">
            <el-select v-model="select.classification" placeholder="请选择">
              <el-option label="供应用室使用" value="供应用室使用" />
            </el-select>
          </el-col>
          <el-col :span="2">
            是否清洗
          </el-col>
          <el-col :span="1">
            <el-checkbox v-model="select.selectList" label="isCleaning">
              <span v-if="isAble('isCleaning')">是</span>
              <span v-else>否</span>
            </el-checkbox>
          </el-col>
          <el-col :span="5">
            <el-select v-model="select.cleaningProgram" placeholder="请选择清洗程序" :disabled="!isAble('isCleaning')">
              <el-option label="P1" value="P1" />
              <el-option label="P2" value="P2" />
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2">
            有效天数
          </el-col>
          <el-col :span="5">
            <el-select v-model="select.valildDay" placeholder="请选择">
              <el-option label="1天" value="1" />
              <el-option label="7天" value="7" />
              <el-option label="14天" value="7" />
              <el-option label="30天" value="30" />
            </el-select>
          </el-col>
          <el-col :span="2">
            是否灭菌
          </el-col>
          <el-col :span="1">
            <el-checkbox v-model="select.selectList" label="isSterilizing">
              <span v-if="isAble('isSterilizing')">是</span>
              <span v-else>否</span>
            </el-checkbox>
          </el-col>
          <el-col :span="5">
            <el-select v-model="select.sterilizedProgram" placeholder="请选择灭菌程序" :disabled="!isAble('isSterilizing')">
              <el-option label="P1" value="P1" />
              <el-option label="P2" value="P2" />
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-select v-model="select.sterilizedMethod" placeholder="请选择灭菌方法" :disabled="!isAble('isSterilizing')">
              <el-option label="高温灭菌" value="高温灭菌" />
            </el-select>
          </el-col>
        </el-row>
      </div>
      <!-- 底部选择框结束 -->
      <div class="created">
        <el-button type="primary" size="" @click="createPackage">创建完成</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import packageImage from './packageImage'
import pictureCourse from './pictureCourse'
import videoCourse from './videoCourse'

export default {
  components: {
    myfilters,
    packageImage,
    videoCourse,
    pictureCourse
  },
  data() {
    return {
      // 底部选择框选项
      select: {
        range: '',
        classification: '供应用室使用',
        valildDay: '',
        selectList: ['isCleaning', 'isSterilizing'],
        material: '',
        cleaningProgram: '',
        sterilizedProgram: '',
        sterilizedMethod: ''
      },
      // 添加器械表格
      form: {
        machineName: '',
        count: ''
      },
      packageName: '', // 新包名称
      activeName: 'videoCourse', // tabs选项
      activeNames: 'pictureCourse', // collapse选项
      // 器械数据
      tableData: [
        {
          machineName: '纱块',
          count: 3
        },
        {
          machineName: '纱球',
          count: 5
        },
        {
          machineName: '化学指示卡',
          count: 1
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
    // 检测是否可以选择
    isAble(select) {
      return this.select.selectList.includes(select)
    },
    // 初始化表格
    formInit() {
      this.form = {
        machineName: '',
        count: ''
      }
    },
    // 添加器械按钮点击
    addMachine() {
      for (const i in this.form) {
        if (this.form[i] === '') {
          this.$message({
            message: '不能输入为空',
            type: 'error'
          })
          return
        }
      }
      this.tableData.unshift(this.form)
      this.formInit()
    },
    // 创建成功点击
    createPackage() {
      this.$router.go(-1)
      this.$message({
        message: '创建成功',
        type: 'success'
      })
    },
    // 删除图标点击
    handleDelete(index, row) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.tableData.splice(index, 1)
    },
    // ↑图标点击
    handleUp(index, row) {
      row.count++
    },
    // ↓图标点击
    handleDown(index, row) {
      if (row.count > 0) {
        row.count--
      }
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
.main-box{
  padding: 20px;
  border:1px solid rgba(216,216,216,1);
  background:#f6f6f6;
}
.footer-box{
  color: #999999;
  font-size: 14px;
  margin-top: 20px;
  padding: 24px 40px;
  border:1px solid rgba(216,216,216,1);
  background:#f6f6f6;
  .el-row {
    padding: 10px;
  }
  .el-col-2 {
    width: 80px;
    margin: 12px 0;
    color: #666;
  }
  span{
    color: #000000;
  }
}
.el-button  {
    padding: 12px;
}
::v-deep .el-form-item__label{
    text-align: left;
    padding: 0;
    color: #666;
    font-weight: normal;
}
::v-deep .el-input__inner{
    width: 100%;
    margin: 0;
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
}
.el-col-1{
    margin: 12px 0;
    width: 6.33333%;
}
::v-deep .created{
    margin-top: 20px;
    .el-button--primary{
        font-size: 20px;
    }
    .el-button {
        padding: 20px 60px;
    }
}
.cursor-icon {
  cursor: pointer;
}
</style>
