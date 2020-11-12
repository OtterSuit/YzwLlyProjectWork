<template>
  <div class="particulars-container" style="padding:30px">
    <myfilters title="申请单详情" :content="content" :back-button="true" />
    <div class="box">
      <div class="tab_contain">
        <el-table :data="[row]" style="width: 100%">
          <el-table-column label="申请科室" prop="department" />
          <el-table-column label="任务类别" prop="taskCategory" />
          <el-table-column label="单号" prop="number" />
          <el-table-column label="包数量" prop="packageNum" />
          <el-table-column label="申请人/时间" width="170">
            <template slot-scope="scope">
              {{ scope.row.applyPerson }}
              <br>
              <span class="second-row">{{ scope.row.applyTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="当前状态">
            <template slot-scope="scope">
              {{ scope.row.person }}【{{ stateTop(scope.row.state) }}】
              <br>
              <span class="second-row">{{ scope.row.time }}</span>
            </template>
          </el-table-column>
        </el-table>
        <img class="pic_user" src="@/assets/images/erwm.png" alt>
      </div>
    </div>

    <!-- 第二个表格 -->

    <div class="box">
      <el-table :data="listData" style="width: 100%" :cell-style="cellStyle">
        <el-table-column label="包图片" align="center">
          <template slot-scope="scope">
            <img
              style="width: 70px;cursor:pointer"
              :src="scope.row.img"
              @click="imgClick(scope.$index,scope.row)"
            >
          </template>
        </el-table-column>
        <el-table-column prop="packageName" label="包名称" />
        <el-table-column prop="packageCode" label="包唯一码" />
        <el-table-column label="回收状态">
          <template slot-scope="scope">
            <div :class="recyclingStatusColor(scope.row.recyclingStatus)">
              <i :class="recyclingStatusIcon(scope.row.recyclingStatus)" />
              {{ recyclingStatus(scope.row.recyclingStatus) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="清洗框/架" class-name="status-col" width="400">
          <template slot-scope="scope">
            <div v-if="scope.row.cleaningBox!==''">
              <el-tag type="success">{{ scope.row.cleaningBox }}</el-tag>
            </div>
            <div v-else class="base-color">
              <i class="el-icon-time" />
              未分类
            </div>
          </template>
        </el-table-column>
        <el-table-column align="right" width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.recyclingStatus !=='3'&&scope.row.cleaningBox!==''"
              size="mini"
              @click="handleEdit(scope.$index,scope.row)"
            >修改</el-button>
            <el-button
              v-if="scope.row.recyclingStatus !=='3'&&scope.row.cleaningBox===''"
              size="mini"
              type="success"
              @click="handleClassification(scope.$index,scope.row)"
            >分类</el-button>
            <el-button
              v-if="scope.row.recyclingStatus ==='3'"
              type="primary"
              size="mini"
              @click="handleSign(scope.$index,scope.row)"
            >
              <i class="el-icon-check" /> 签收
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹出窗口 -->
    <el-dialog :visible.sync="show" width="95%">
      <template slot="title">
        <el-row>
          <el-col class="inline-col">
            <img
              class="dialog-title-img"
              :src="listData[editIndex].img"
              @click="imgClick(editIndex,editRow)"
            >
          </el-col>
          <el-col class="inline-col">
            <el-row>
              <div class="dialog-title-top">{{ listData[editIndex].packageName }}</div>
            </el-row>
            <el-row>
              <div class="dialog-title-bottom">包唯一码：{{ listData[editIndex].packageCode }}</div>
            </el-row>
            <el-row>
              <div class="dialog-title-bottom">器械数量：{{ listData[editIndex].recyclingStatus }}</div>
            </el-row>
          </el-col>
        </el-row>
      </template>
      <div class="dialog-main">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="dialog-main-box">
              <div class="box-title">请清点器械包</div>
              <div style="height:400px">
                <el-table :data="packageData" style="width: 100%" class="hidden-table">
                  <el-table-column label="器械名称" width="200" />
                  <el-table-column label="数量" />
                  <el-table-column label="状态" width="300" />
                </el-table>
                <el-scrollbar style="height:350px;background: #fff">
                  <el-table :data="packageData" style="width: 100%" :show-header="false">
                    <el-table-column prop="name" width="200" />
                    <el-table-column prop="num" />
                    <el-table-column width="300">
                      <template slot-scope="scope">
                        <el-radio-group v-model="scope.row.status">
                          <el-radio label="1">正常</el-radio>
                          <el-radio label="2">缺失</el-radio>
                          <el-radio label="3">损坏</el-radio>
                        </el-radio-group>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-scrollbar>
              </div>
            </div>
          </el-col>
          <el-col :span="12" class="dialog-right">
            <div class="dialog-main-box">
              <div class="box-title">选择清洗框/架</div>
              <el-radio-group v-model="cleaningBox">
                <el-radio label="架01" border />
                <el-radio label="架02" border />
                <el-radio label="架03" border />
                <el-radio label="架04" border />
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="show=false">取消</el-button>
        <el-button type="primary" @click="signSubmit">确定</el-button>
      </div>
    </el-dialog>

    <el-image-viewer v-show="imgShow" :on-close="viewerClose" :url-list="[srcList]" />
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
      row: {
        department: '儿二科',
        taskCategory: '退货申请单',
        number: '251412',
        packageNum: '3',
        applyPerson: '张春兰',
        applyTime: '2020.08.10 09:42:52',
        state: '2',
        person: '张海东',
        time: '2020.08.10 09:45:16'
      },
      srcList: null,
      imgShow: false,
      show: false,
      listData: [
        {
          img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3670282122,1749891040&fm=26&gp=0.jpg',
          packageName: '膀胱镜包',
          packageCode: '00238322',
          recyclingStatus: '1',
          cleaningBox: '架01',
          packageData: [
            {
              name: '卵圆钳(弯/直/有齿/无齿)',
              num: 1,
              status: '1'
            },
            {
              name: '大弯钳(18CM)',
              num: 1,
              status: '1'
            },
            {
              name: '大弯钳(18CM)',
              num: 1,
              status: '1'
            },
            {
              name: '组织剪(弯)',
              num: 1,
              status: '1'
            },
            {
              name: '中碗',
              num: 1,
              status: '1'
            },
            {
              name: '治疗碗',
              num: 1,
              status: '1'
            },
            {
              name: '小杯',
              num: 1,
              status: '1'
            }
          ]
        },
        {
          img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3670282122,1749891040&fm=26&gp=0.jpg',
          packageName: '膀胱镜包',
          packageCode: '00238322',
          recyclingStatus: '1',
          cleaningBox: ''
        },
        {
          img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3670282122,1749891040&fm=26&gp=0.jpg',
          packageName: '膀胱镜包',
          packageCode: '00238322',
          recyclingStatus: '2',
          cleaningBox: '架04',
          packageData: [
            {
              name: '卵圆钳(弯/直/有齿/无齿)',
              num: 1,
              status: '1'
            },
            {
              name: '大弯钳(18CM)',
              num: 1,
              status: '2'
            },
            {
              name: '大弯钳(18CM)',
              num: 1,
              status: '3'
            },
            {
              name: '组织剪(弯)',
              num: 1,
              status: '1'
            },
            {
              name: '中碗',
              num: 1,
              status: '1'
            },
            {
              name: '治疗碗',
              num: 1,
              status: '1'
            },
            {
              name: '小杯',
              num: 1,
              status: '1'
            }
          ]
        },
        {
          img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3670282122,1749891040&fm=26&gp=0.jpg',
          packageName: '膀胱镜包',
          packageCode: '00238322',
          recyclingStatus: '3',
          cleaningBox: ''
        }
      ],
      cleaningBox: '',
      packageData: [],
      editIndex: 0,
      editRow: null
    }
  },
  computed: {
    content() {
      return '共' + this.listData.length + '条数据'
    }
  },
  methods: {
    imgClick(index, row) {
      this.imgShow = true
      this.srcList = row.img
    },
    viewerClose() {
      this.imgShow = false
    },
    cellStyle({ columnIndex }) {
      if (columnIndex === 1) {
        return {
          color: '#409EFF'
        }
      }
    },
    stateTop(state) {
      const stateMap = {
        '1': '已签收',
        '2': '正在送货'
      }
      return stateMap[state]
    },
    recyclingStatus(state) {
      const stateMap = {
        '1': '已签收',
        '2': '缺/损',
        '3': '未签收'
      }
      return stateMap[state]
    },
    recyclingStatusIcon(state) {
      const stateMap = {
        '1': 'el-icon-success',
        '2': 'el-icon-warning',
        '3': 'el-icon-time'
      }
      return stateMap[state]
    },
    recyclingStatusColor(state) {
      const stateMap = {
        '1': 'success-color',
        '2': 'error-color',
        '3': 'base-color'
      }
      return stateMap[state]
    },
    handleSign(index, row) {
      row.recyclingStatus = '1'
      this.$message({
        message: '签收成功',
        type: 'success'
      })
    },
    signSubmit() {
      if (this.cleaningBox.length === 0) {
        this.$message({
          message: '请至少选择一个清洗框/架',
          type: 'warning'
        })
        return
      }
      this.$set(this.editRow, 'cleaningBox', this.cleaningBox)
      this.$set(this.editRow, 'packageData', this.packageData)
      let status = '1'
      this.packageData.forEach(element => {
        if (element.status !== '1') {
          status = '2'
          return
        }
      })
      this.$set(this.editRow, 'recyclingStatus', status)
      this.$message({
        message: '分类成功',
        type: 'success'
      })
      this.show = false
    },
    // 分类按钮
    handleClassification(index, row) {
      this.show = true
      this.editIndex = index
      this.editRow = row
      this.packageData = [
        {
          name: '卵圆钳(弯/直/有齿/无齿)',
          num: 1,
          status: '1'
        },
        {
          name: '大弯钳(18CM)',
          num: 1,
          status: '1'
        },
        {
          name: '大弯钳(18CM)',
          num: 1,
          status: '1'
        },
        {
          name: '组织剪(弯)',
          num: 1,
          status: '1'
        },
        {
          name: '中碗',
          num: 1,
          status: '1'
        },
        {
          name: '治疗碗',
          num: 1,
          status: '1'
        },
        {
          name: '小杯',
          num: 1,
          status: '1'
        }
      ]
      this.cleaningBox = ''
    },
    handleEdit(index, row) {
      this.show = true
      this.editIndex = index
      this.editRow = row
      this.packageData = row.packageData
      this.cleaningBox = row.cleaningBox
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.particulars-container {
  padding: 30px;
  background-color: #f0f2f5;
}
.second-row {
  color: #999;
}
.tab_contain {
  display: flex;
  .pic_user {
    width: 115px;
    height: 115px;
    margin-left: 20px;
  }
}
.dialog-title-top {
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 15px;
}
.dialog-title-bottom {
  color: #999;
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 8px;
}
.dialog-main-box {
  height: 480px;
  background: rgba(246, 246, 246, 1);
  border: 1px dotted rgba(175, 179, 192, 1);
  padding: 20px 25px;
  .box-title {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 16px;
  }
}
.dialog-main {
  padding: 20px;
}
.inline-col {
  display: inline-block;
  width: auto;
}
.dialog-title-img {
  height: 90px;
  cursor: pointer;
  border-radius: 6px;
  margin-right: 20px;
}
.box {
  background: rgba(255, 255, 255, 1);
  box-shadow: 4px 4px 40px 0px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 20px 30px;
  margin-bottom: 20px;
  position: relative;
}
::v-deep .el-dialog__header {
  height: 130px;
  padding: 20px;
}
::v-deep .el-image-viewer__wrapper {
  z-index: 2002 !important;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
::v-deep .hidden-table .el-table__body-wrapper {
  display: none;
}
::v-deep .dialog-right {
  .el-radio__input {
    position: absolute;
    top: -3px;
    left: -3px;
    display: none;
  }
  .el-radio__input.is-checked {
    display: block;
  }
  .el-radio.is-bordered {
    border-color: rgba(233, 233, 235, 1);
    color: #a5a7ac;
  }
  .el-radio.is-bordered.is-checked {
    border-color: rgba(225, 243, 216, 1);
    background-color: #e1f3d8;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #69c33e;
  }
  .el-radio__input.is-checked .el-radio__inner {
    background-color: #29c06d;
    border-color: #29c06d;
  }
  .el-radio:focus:not(.is-focus):not(:active):not(.is-disabled)
    .el-radio__inner {
    box-shadow: none;
  }
  .el-radio__input.is-checked .el-radio__inner::after {
    background-color: #29c06d;
  }
}
</style>
