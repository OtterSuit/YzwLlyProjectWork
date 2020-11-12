<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="任务列表"
      :content="content"
      placeholder="包名称/包编号"
      :search-content="true"
      :print-button="true"
      @contentChange="contentChange"
      @printClick="print"
    />
    <!-- 头部 end -->
    <!-- table -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column prop="packageNum" label="包编号" />
      <el-table-column prop="packageName" label="包名称" />
      <el-table-column prop="number" label="数量" />
      <el-table-column label="审核人/时间">
        <template slot-scope="scope">
          {{ scope.row.auditPerson }}
          <br>
          <span class="second-row">{{ scope.row.auditTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div :class="stateColor(scope.row.state)">
            <i :class="stateIcon(scope.row.state)" />
            {{ state(scope.row) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            slot="reference"
            size="mini"
            type="primary"
            @click="handleShow(scope.$index, scope.row)"
          >封包</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <el-dialog title="器械包标签打印" :visible.sync="printShow" width="95%">
      <div class="dialog-main">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="dialog-main-box">
              <div class="box-title">请选择器械包</div>
              <div style="height:470px">
                <el-table :data="tableData" style="width: 100%" class="hidden-table">
                  <el-table-column label="选择" align="center" width="100" />
                  <el-table-column label="包名称" width="200" />
                  <el-table-column label="数量" />
                </el-table>
                <el-scrollbar style="height:420px;background: #fff">
                  <el-table :data="tableData" style="width: 100%" :show-header="false">
                    <el-table-column align="center" width="100">
                      <template slot-scope="scope">
                        <el-radio
                          v-model="packageName"
                          :label="scope.row.packageNum"
                          class="hidden-radio"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column prop="packageName" width="200" />
                    <el-table-column prop="number" />
                  </el-table>
                </el-scrollbar>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="dialog-main-box">
              <div class="box-title">选择标签模板</div>
              <el-form ref="form" :model="form" label-width="80px">
                <el-row type="flex" justify="space-between">
                  <el-col :span="11">
                    <el-form-item label="标签大小">
                      <el-select v-model="form.size" placeholder="请选择标签大小">
                        <el-option label="小号 50x30mm" value="小号 50x30mm" />
                        <el-option label="中号 60x50mm" value="中号 60x50mm" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="标签样式">
                      <el-select v-model="form.style" placeholder="请选择标签样式">
                        <el-option label="模板样式1" value="模板样式1" />
                        <el-option label="模板样式2" value="模板样式2" />
                        <el-option label="模板样式3" value="模板样式3" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex" justify="space-between">
                  <el-col :span="11">
                    <el-form-item label="打印数量">
                      <el-input v-model="form.num" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="灭菌人">
                      <el-select v-model="form.antisepsisPerson" placeholder="请选择灭菌人">
                        <el-option label="李丽丽" value="李丽丽" />
                        <el-option label="张美丽" value="张美丽" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <el-row>
                <el-col :span="6">
                  <div class="label-title">标签预览</div>
                </el-col>
                <el-col :span="18">
                  <div class="label-box">
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <div class="label-box-title-top1">{{ form.packageName }}</div>
                        <div class="label-box-title-top2">{{ form.packageNum }}</div>
                      </el-col>
                      <el-col :span="12">
                        <img class="label-box-img" src="@/assets/images/erwm.png">
                      </el-col>
                    </el-row>
                    <div class="label-box-bottom">
                      <div class="label-box-bottom-content">封包人：{{ form.antisepsisPerson }}</div>
                      <div class="label-box-bottom-content">封包日期：{{ getDate() }}</div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="printShow=false">取消</el-button>
        <el-button type="primary" @click="printSubmit">确定打印</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="packageShow" width="95%" class="package-dialog">
      <template slot="title">
        <el-row>
          <el-col class="inline-col">
            <img class="dialog-title-img" :src="imgSrc" @click="imgShow=true">
          </el-col>
          <el-col class="inline-col">
            <el-row>
              <div class="dialog-title-top">{{ tableData[editIndex].packageName }}</div>
            </el-row>
            <el-row>
              <div class="dialog-title-bottom">包唯一码：{{ tableData[editIndex].packageNum }}</div>
            </el-row>
            <el-row>
              <div class="dialog-title-bottom">器械数量：{{ instrumentNum(instrumentData) }}</div>
            </el-row>
          </el-col>
          <el-col class="inline-col">
            <el-row class="title-right-row">
              <el-col :span="12">
                <div class="right-row-num">{{ tableData[editIndex].number }}</div>
                <div class="right-row-content">任务数量</div>
              </el-col>
              <el-col :span="12">
                <div class="right-row-num">{{ tableData[editIndex].complete }}</div>
                <div class="right-row-content">已完成</div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
      <div class="dialog-main">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="dialog-main-box">
              <div class="box-title">
                <span>请清点器械并打包</span>
                <el-button
                  v-if="tableData[editIndex].type&&tableData[editIndex].type==='foreign'&&tableData[editIndex].state!==1"
                  type="bgc"
                  size="mini"
                  style="float:right"
                  @click="unpackingClick"
                >拆包</el-button>
              </div>
              <div style="height:400px">
                <el-table :data="instrumentData" style="width: 100%" class="hidden-table">
                  <el-table-column label="序号" width="100" />
                  <el-table-column label="器械名称" />
                  <el-table-column label="数量" />
                </el-table>
                <el-scrollbar style="height:350px;background: #fff">
                  <el-table :data="instrumentData" style="width: 100%" :show-header="false">
                    <el-table-column type="index" width="100" />
                    <el-table-column>
                      <template slot-scope="scope">
                        <span
                          v-if="tableData[editIndex].type&&tableData[editIndex].type==='foreign'"
                        >【外】</span>
                        {{ scope.row.name }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="num" />
                  </el-table>
                </el-scrollbar>
              </div>
            </div>
          </el-col>
          <el-col :span="12" class="dialog-right">
            <div class="dialog-main-box">
              <el-row>
                <el-col class="inline-col">
                  <div class="box-title" style="margin-right:35px">打包指引教程</div>
                </el-col>
                <el-col class="inline-col">
                  <el-tabs v-model="activeName" style="height:40px">
                    <el-tab-pane label="图片" name="packageImage" />
                    <el-tab-pane label="视频" name="packageVideo" />
                  </el-tabs>
                </el-col>
              </el-row>
              <transition name="fade-transform" mode="out-in">
                <component :is="isComponent" />
              </transition>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="packageShow=false">取消</el-button>
        <el-button
          v-if="tableData[editIndex].complete===tableData[editIndex].number-1"
          type="primary"
          @click="packageSubmit(true)"
        >打包完成</el-button>
        <el-button
          v-else-if="tableData[editIndex].complete<tableData[editIndex].number-1"
          type="primary"
          @click="packageSubmit(false)"
        >打包完成，继续打包</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="unpackingShow" width="95%" class="unpacking-dialog">
      <template slot="title">
        <el-row>
          <el-col class="inline-col">
            <img class="dialog-title-img" :src="imgSrc" @click="imgShow=true">
          </el-col>
          <el-col class="inline-col">
            <el-row>
              <div class="dialog-title-top">{{ tableData[editIndex].packageName }}</div>
            </el-row>
            <el-row>
              <div class="dialog-title-bottom">包唯一码：{{ tableData[editIndex].packageNum }}</div>
            </el-row>
            <el-row>
              <div class="dialog-title-bottom">器械数量：{{ instrumentNum(instrumentData) }}</div>
            </el-row>
          </el-col>
          <el-col class="inline-col">
            <el-row class="title-right-row">
              <el-col :span="12">
                <div class="right-row-num">{{ editableTabs.length }}</div>
                <div class="right-row-content">任务数量</div>
              </el-col>
              <el-col :span="12">
                <div class="right-row-num">{{ complete }}</div>
                <div class="right-row-content">已完成</div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
      <div class="dialog-main">
        <el-row>
          <el-col>
            <div class="dialog-main-box">
              <div class="unpacking-button">
                <el-button
                  size="small"
                  icon="el-icon-circle-plus-outline"
                  @click="addTab"
                >
                  加包
                </el-button>
                <el-button
                  size="small"
                  type="bgc"
                  @click="unpackingCancel"
                >
                  取消拆包
                </el-button>
              </div>
              <el-tabs v-model="editableTabsValue" closable @tab-remove="removeTab">
                <el-tab-pane
                  v-for="(item,index) in editableTabs"
                  :key="item.name"
                  :label="'子包'+(index+1)"
                  :name="item.name"
                >
                  <div style="height:390px">
                    <el-table :data="item.instrumentData" style="width: 100%" class="hidden-table">
                      <el-table-column label="序号" width="100" />
                      <el-table-column label="器械名称" width="300" />
                      <el-table-column label="数量" width="100" />
                      <el-table-column>
                        <template slot="header">
                          {{ '子包'+(index+1)+'(数量)' }}
                          <span class="children-code">NO.{{ tableData[editIndex].packageNum }}-{{ index+1>=10?'0'+(index+1):'00'+(index+1) }}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-scrollbar style="height:340px;background: #fff">
                      <el-table :data="item.instrumentData" style="width: 100%" :show-header="false">
                        <el-table-column type="index" width="100" />
                        <el-table-column width="300">
                          <template slot-scope="scope">
                            【外】{{ scope.row.name }}
                          </template>
                        </el-table-column>
                        <el-table-column prop="num" width="100" />
                        <el-table-column>
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.number" placeholder="请输入数量" />
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-scrollbar>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-printer" type="primary" style="float:left" @click="childrenPrint">打印子包标签</el-button>
        <el-button type="bgc" @click="unpackingShow=false">取消</el-button>
        <el-button type="primary" @click="unpackingSubmit">打包完成</el-button>
      </div>
    </el-dialog>
    <el-image-viewer v-show="imgShow" :on-close="viewerClose" :url-list="[imgSrc]" />
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import { format } from '@/utils/index'
import packageImage from './packageImage'
import packageVideo from './packageVideo'

export default {
  components: {
    myfilters,
    packageImage,
    packageVideo
  },
  data() {
    return {
      activeName: 'packageImage',
      componentsList: {
        packageImage: 'packageImage',
        packageVideo: 'packageVideo'
      },
      imgShow: false,
      imgSrc: require('@/assets/images/qianzi.png'),
      editIndex: 0,
      instrumentData: [],
      tableData: [
        {
          packageNum: '1001',
          packageName: '糖足包',
          number: 12,
          complete: 9,
          auditPerson: '赵美丽',
          auditTime: '2020.08.10 09:52:38',
          state: 3
        },
        {
          packageNum: '10003',
          packageName: '脐穿包',
          number: 16,
          complete: 0,
          auditPerson: '赵美丽',
          auditTime: '2020.08.10 09:52:38',
          state: 2
        },
        {
          packageNum: '10004',
          packageName: '神一脑室引流包',
          number: 6,
          complete: 0,
          auditPerson: '赵美丽',
          auditTime: '2020.08.10 09:52:38',
          state: 2
        },
        {
          packageNum: '10005',
          packageName: '血透室缝合包',
          number: 10,
          complete: 0,
          auditPerson: '赵美丽',
          auditTime: '2020.08.10 09:52:38',
          state: 2
        },
        {
          packageNum: '20010',
          packageName: '外来器械包',
          number: 1,
          complete: 0,
          auditPerson: '赵美丽',
          auditTime: '2020.08.10 09:52:38',
          state: 2,
          type: 'foreign'
        }
      ],
      packageName: '1001',
      printShow: false,
      packageShow: false,
      unpackingShow: false,
      form: {},
      editableTabsValue: '',
      editableTabs: [],
      tabIndex: 0,
      complete: 0
    }
  },
  computed: {
    // 计算tableData有几条数据
    content() {
      return '共' + this.tableData.length + '条数据'
    },
    isComponent() {
      return this.componentsList[this.activeName]
    }
  },
  watch: {
    packageName: {
      handler(newValue, oldValue) {
        this.tableData.forEach(element => {
          if (element.packageNum === this.packageName) {
            this.form.num = element.number
            this.form.packageName = element.packageName
            this.form.packageNum = element.packageNum
            this.form.antisepsisPerson = '张美丽'
          }
        })
      }
    }
  },
  methods: {
    getDate() {
      return format('yyyy.MM.dd')
    },
    getEndDate() {
      const nowDateObj = new Date()
      const nowTimeStem = nowDateObj.getTime()
      const endTimeStem = nowTimeStem + 24 * 60 * 60 * 1000 * 10
      const endDateObj = new Date(endTimeStem)
      let month = endDateObj.getMonth() + 1
      month = month > 10 ? month : '0' + month
      let day = endDateObj.getDate()
      day = day > 10 ? day : '0' + day
      const endDateStr = endDateObj.getFullYear() + '.' + month + '.' + day
      return endDateStr
    },
    print() {
      this.printShow = true
      this.form = {
        size: '中号 60x50mm',
        style: '模板样式1',
        num: 12,
        packageName: '糖足包',
        packageNum: '1001',
        antisepsisPerson: '张美丽'
      }
    },
    printSubmit() {
      this.printShow = false
      this.$message({
        message: '打印成功',
        type: 'success'
      })
    },
    // 表格查看按钮
    handleShow(index, row) {
      this.packageShow = true
      this.editIndex = index
      if (row.type && row.type === 'foreign') {
        this.instrumentData = [
          {
            name: '威高上肢工具',
            num: 5
          },
          {
            name: '爱康骨髓泥工具',
            num: 5
          },
          {
            name: '德骼拜尔关节',
            num: 5
          },
          {
            name: '关节钻',
            num: 5
          },
          {
            name: 'PFNA髓内钉',
            num: 20
          }
        ]
      } else {
        this.instrumentData = [
          {
            name: '弯钳(16cm以上)',
            num: 1
          },
          {
            name: '有齿镊(16cm以上)',
            num: 1
          },
          {
            name: '无齿镊(16cm以上)',
            num: 1
          },
          {
            name: '大弯剪(16cm以上)',
            num: 1
          },
          {
            name: '五官小弯剪',
            num: 1
          },
          {
            name: '大官小直剪',
            num: 1
          },
          {
            name: '弯盘',
            num: 1
          },
          {
            name: '小杯',
            num: 1
          },
          {
            name: '纱块',
            num: 3
          }
        ]
      }
    },
    packageSubmit(bool) {
      if (this.tableData[this.editIndex].state === 2) {
        this.tableData[this.editIndex].state = 3
      }
      this.tableData[this.editIndex].complete += 1
      this.$message({
        message: '打包成功',
        type: 'success'
      })
      if (bool) {
        this.packageShow = false
        this.tableData[this.editIndex].state = 1
      }
    },
    unpackingClick() {
      this.packageShow = false
      this.unpackingShow = true
      this.editableTabsValue = '1'
      this.tabIndex = 1
      this.editableTabs = [{
        name: '1',
        instrumentData: [
          {
            name: '威高上肢工具',
            num: 5,
            number: ''
          },
          {
            name: '爱康骨髓泥工具',
            num: 5,
            number: ''
          },
          {
            name: '德骼拜尔关节',
            num: 5,
            number: ''
          },
          {
            name: '关节钻',
            num: 5,
            number: ''
          },
          {
            name: 'PFNA髓内钉',
            num: 20,
            number: ''
          }
        ]
      }]
    },
    unpackingCancel() {
      this.packageShow = true
      this.unpackingShow = false
    },
    unpackingSubmit() {
      for (let index = 0; index < this.editableTabs.length; index++) {
        const packageNum = this.tableData[this.editIndex].packageNum + '-' + (index + 1 >= 10 ? '0' + (index + 1) : '00' + (index + 1))
        const obj = {
          packageNum: packageNum,
          packageName: '外来器械包(拆' + (index + 1) + ')',
          number: 1,
          complete: 1,
          auditPerson: '赵美丽',
          auditTime: '2020.08.10 09:52:38',
          state: 1
        }
        this.tableData.push(obj)
      }
      this.editableTabs
      this.tableData.splice(this.editIndex, 1)
      this.unpackingShow = false
      this.$message({
        message: '打包成功',
        type: 'success'
      })
    },
    addTab() {
      const newTabName = ++this.tabIndex + ''
      this.editableTabs.push({
        name: newTabName,
        instrumentData: [
          {
            name: '威高上肢工具',
            num: 5,
            number: ''
          },
          {
            name: '爱康骨髓泥工具',
            num: 5,
            number: ''
          },
          {
            name: '德骼拜尔关节',
            num: 5,
            number: ''
          },
          {
            name: '关节钻',
            num: 5,
            number: ''
          },
          {
            name: 'PFNA髓内钉',
            num: 20,
            number: ''
          }
        ]
      })
      this.editableTabsValue = newTabName
    },
    removeTab(targetName) {
      const tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
    },
    childrenPrint() {
      this.$message({
        message: '打印成功',
        type: 'success'
      })
    },
    instrumentNum(instrument) {
      let num = 0
      instrument.forEach(i => {
        num += parseInt(i.num)
      })
      return num
    },
    viewerClose() {
      this.imgShow = false
    },
    // 输入框改变
    contentChange(content) {
      console.log(content)
    },
    // 状态标签文字
    state(row) {
      const stateMap = {
        '1': '封包完成',
        '2': '等待封包',
        '3': '正在封包，已完成' + row.complete + '包'
      }
      return stateMap[row.state]
    },
    // 状态的icon
    stateIcon(state) {
      const stateMap = {
        '1': 'el-icon-success',
        '2': 'el-icon-time',
        '3': 'icon-fengbao iconfont'
      }
      return stateMap[state]
    },
    // 状态颜色
    stateColor(state) {
      const stateMap = {
        '1': 'success-color',
        '2': 'base-color',
        '3': 'green-color'
      }
      return stateMap[state]
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.second-row {
  color: #999;
}
.green-color,
.green-color:hover {
  color: #40c9c6;
}
.dialog-main-box {
  position: relative;
  height: 550px;
  background: rgba(246, 246, 246, 1);
  border: 1px dotted rgba(175, 179, 192, 1);
  padding: 20px 25px;
  .box-title {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 16px;
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
.dialog-main {
  padding: 20px;
}
::v-deep .el-image-viewer__wrapper {
  z-index: 2002 !important;
}
::v-deep .hidden-radio .el-radio__label {
  display: none;
}
::v-deep .el-image-viewer__wrapper {
  z-index: 2501 !important;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
::v-deep .hidden-table .el-table__body-wrapper {
  display: none;
}
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
.label-title {
  font-size: 18px;
  color: #999;
}
.label-box {
  width: 464px;
  height: 344px;
  background-color: #fff;
  border-radius: 1px;
  color: black;
  border: 1px solid rgba(171, 171, 171, 1);
  .label-box-title-top1 {
    font-size: 26px;
    line-height: 40px;
    margin: 30px 0 20px 20px;
  }
  .label-box-title-top2 {
    font-size: 47px;
    line-height: 66px;
    margin-left: 20px;
  }
  .label-box-img {
    float: right;
    height: 200px;
    margin-top: 20px;
    margin-right: 20px;
    border: 1px solid rgba(155, 155, 155, 1);
  }
  .label-box-bottom {
    margin-top: 20px;
    height: 102px;
    padding-top: 9px;
    background: rgba(246, 246, 246, 1);
    .label-box-bottom-content {
      font-size: 24px;
      color: #666;
      text-align: center;
      line-height: 42px;
    }
  }
}
::v-deep .unpacking-dialog,
::v-deep .package-dialog {
  .el-dialog__header {
    height: 130px;
    padding: 20px;
  }
  .title-right-row {
    height: 90px;
    width: 240px;
    padding-top: 13px;
    background: #ececec;
    border-radius: 6px;
    border: 1px solid #d8d8d8;
    margin-left: 150px;
  }
  .right-row-num,
  .right-row-content {
    text-align: center;
  }
  .right-row-num {
    font-size: 34px;
    line-height: 45px;
  }
  .right-row-content {
    font-size: 14px;
    color: #666;
    line-height: 19px;
  }
  .dialog-main-box {
    height: 480px;
  }
}
::v-deep .package-dialog {
  .el-tabs__nav-wrap::after,
  .el-tabs__active-bar {
    display: none;
  }
  .el-tabs__item {
    padding: 0 10px;
    line-height: 28px;
  }
}
::v-deep .unpacking-dialog {
  .el-tabs__content {
    display: block;
  }
  .el-tabs__nav-wrap::after {
    display: none;
  }
  .el-input {
    width: 60%;
  }
  .el-tabs__item {
    padding: 0;
    width: 100px;
    font-size: 18px;
    .el-icon-close {
      color: rgba(153,153,153,0.5);
      &:hover {
        background-color:#f6f6f6;
      }
    }
  }
  #tab-1 {
    .el-icon-close,
    &:hover .el-icon-close {
      display: none;
    }
  }
  .el-tabs__active-bar {
    width: 30px !important;
    height: 3px;
    margin-left: 7px;
  }
  .el-tabs__header {
    margin-bottom: 10px;
  }
  .unpacking-button {
    position: absolute;
    right: 25px;
    z-index: 1;
    top: 24px;
  }
  .children-code {
    float: right;
    color: #AFB3C0;
  }
}
::v-deep .hidden-radio .el-radio__label {
  display: none;
}
</style>
