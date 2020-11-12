<template>
  <div style="padding:30px">
    <!-- header -->
    <myfilters
      title="任务列表"
      :content="content"
      :choose-cleaning-box="true"
      :choose-cleaning-equipment="true"
      :search-content="true"
      format="yyyy.MM.dd"
      placeholder="清洗人"
      :choose-date="true"
      @cleaningBoxChange="cleaningBoxChange"
      @contentChange="contentChange"
      @dateChange="dateChange"
      @cleaningEquipmentChange="cleaningEquipmentChange"
    />
    <!-- header end -->
    <!-- table -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column label="清洗框/架">
        <template slot-scope="scope">
          <div>
            {{ scope.row.cleaningFrame }}
            <br>
            <span class="second-row">{{ scope.row.cleaningBox }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="清洗人/时间">
        <template slot-scope="scope">
          <div>
            {{ scope.row.cleaner }}
            <br>
            <span class="second-row">{{ scope.row.cleaningTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="清洗设备/程序">
        <template slot-scope="scope">
          <div>
            {{ scope.row.cleaningEquipment }}
            <br>
            <span class="second-row">{{ scope.row.cleaningProgram }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="审核状态">
        <template slot-scope="scope">
          <div :class="stateColor(scope.row.state)">
            <i :class="stateIcon(scope.row.state)" />
            {{ state(scope.row.state) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="120">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            style="margin-right:5px"
            @click="handleShow(scope.$index, scope.row)"
          >审核装配</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <!-- dialog -->
    <el-dialog :visible.sync="show" width="95%">
      <template slot="title">
        <span class="dialog-title">{{ row.cleaningFrame }}</span>
        <span class="dialog-content">{{ row.cleaningBox }}</span>
      </template>
      <div class="dialog-main">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="dialog-main-box">
              <div class="title">
                请清点核对器械数量
                <span class="dialog-mian-box-left">并将缺失/维修/报废的器械补齐</span>
              </div>
              <div style="height:470px">
                <!-- table header -->
                <el-table :data="dialogData" style="width: 100%" class="hidden-table">
                  <el-table-column label="序号" width="50" />
                  <el-table-column label="器械名称" width="200" />
                  <el-table-column label="应有数量" />
                  <el-table-column label="缺失" width="80" />
                  <el-table-column label="待维修" width="80" />
                  <el-table-column label="报废" width="80" />
                </el-table>
                <!-- table header end -->
                <!-- scrollbar -->
                <el-scrollbar style="height:420px;background: #fff">
                  <!-- table -->
                  <el-table :data="dialogData" style="width: 100%" :show-header="false">
                    <el-table-column type="index" width="50" />
                    <el-table-column width="200" prop="equipmentName" />
                    <el-table-column prop="count" />
                    <el-table-column width="80">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.missing" size="small" />
                      </template>
                    </el-table-column>
                    <el-table-column width="80">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.awaitingRepair" size="small" />
                      </template>
                    </el-table-column>
                    <el-table-column width="80">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.scrap" size="small" />
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- table end -->
                </el-scrollbar>
                <!-- scrollbar end -->
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="<!-- dialog-main-box -->">
              <div class="title">
                清洗质量记录表
                <span class="dialog-mian-box-right">NO.0033124</span>
              </div>
              <!-- scrollbar -->
              <el-scrollbar style="height:470px;">
                <!-- 循环所有清洗类型并检测是否被选择 -->
                <div v-for="(item,index) in form" :key="index" class="white-box" :class="{isCheck:check(item.type)}">
                  <el-form :ref="item" :model="item" label-width="60px">
                    <el-row>
                      <el-col :span="5">
                        <!-- checkbox -->
                        <div class="checkTitle">
                          <el-checkbox v-model="checkList" :label="item.type" />
                        </div>
                        <div
                          class="checkTitle"
                          style="margin:16px 0 0 25px"
                        >合计：{{ totalCount(item.position) }}</div>
                      </el-col>
                      <el-col :span="19">
                        <!-- 循环所有清洗类型的部位 -->
                        <div v-for="(t,i) in item.position" :key="i" style="margin-bottom:16px">
                          <el-row>
                            <el-col :span="4">
                              <div class="checkTitle">{{ t.positionName }}:</div>
                            </el-col>
                            <el-col :span="20">
                              <el-row :gutter="5">
                                <!-- 循环所有的清洗污渍 -->
                                <el-col v-for="(dirty,ind) in t.dirt" :key="ind" :span="8">
                                  <el-form-item :label="dirty.dirtName" :class="{formItemDisabled:!check(item.type)}">
                                    <el-input v-model.number="dirty.Num" size="mini" :disabled="!check(item.type)" />
                                  </el-form-item>
                                </el-col>
                              </el-row>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>
              </el-scrollbar>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="show=false">取消</el-button>
        <el-button type="primary" @click="signSubmit">确定</el-button>
      </div>
    </el-dialog>
    <!-- dialog end -->
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
      show: false, // dialog show
      row: [],
      checkList: ['管腔类', '窥类'], // checkbox selected
      form: [
        {
          type: '管腔类',
          total: 0,
          position: [
            {
              positionName: '盲端开口',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: ''
                },
                {
                  dirtName: '锈渍',
                  Num: ''
                },
                {
                  dirtName: '附着物',
                  Num: ''
                }
              ]
            },
            {
              positionName: '管腔内',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: ''
                },
                {
                  dirtName: '锈渍',
                  Num: ''
                },
                {
                  dirtName: '附着物',
                  Num: ''
                }
              ]
            }
          ]
        },
        {
          type: '窥类',
          total: 0,
          position: [
            {
              positionName: '螺钉',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: ''
                },
                {
                  dirtName: '锈渍',
                  Num: ''
                }
              ]
            },
            {
              positionName: '嘴部',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: ''
                },
                {
                  dirtName: '锈渍',
                  Num: ''
                }
              ]
            },
            {
              positionName: '凹位',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: ''
                },
                {
                  dirtName: '锈渍',
                  Num: ''
                }
              ]
            }
          ]
        },
        {
          type: '刮匙',
          total: 0,
          position: [
            {
              positionName: '匙圈',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: ''
                },
                {
                  dirtName: '锈渍',
                  Num: ''
                }
              ]
            },
            {
              positionName: '表面',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: ''
                },
                {
                  dirtName: '锈渍',
                  Num: ''
                }
              ]
            }
          ]
        },
        {
          type: '剪刀',
          total: 0,
          position: [
            {
              positionName: '轴节',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: ''
                },
                {
                  dirtName: '锈渍',
                  Num: ''
                }
              ]
            },
            {
              positionName: '刃面',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: ''
                },
                {
                  dirtName: '锈渍',
                  Num: ''
                }
              ]
            }
          ]
        },
        {
          type: '钳类',
          total: 0,
          position: [
            {
              positionName: '轴节',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: ''
                },
                {
                  dirtName: '锈渍',
                  Num: ''
                }
              ]
            },
            {
              positionName: '齿槽',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: ''
                },
                {
                  dirtName: '锈渍',
                  Num: ''
                }
              ]
            }
          ]
        },
        {
          type: '镊子',
          total: 0,
          position: [
            {
              positionName: '齿槽',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: ''
                },
                {
                  dirtName: '锈渍',
                  Num: ''
                }
              ]
            },
            {
              positionName: '缝隙',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: ''
                },
                {
                  dirtName: '锈渍',
                  Num: ''
                }
              ]
            },
            {
              positionName: '表面',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: ''
                },
                {
                  dirtName: '锈渍',
                  Num: ''
                }
              ]
            }
          ]
        }
      ],
      // dialog table Data
      dialogData: [
        {
          equipmentName: '卵圆钳(弯/直/有齿/无齿)',
          count: 50,
          missing: '',
          awaitingRepair: '',
          scrap: ''
        },
        {
          equipmentName: '弯钳(16cm以上)',
          count: 50,
          missing: '',
          awaitingRepair: '',
          scrap: ''
        },
        {
          equipmentName: '有齿镊(16cm以上)',
          count: 50,
          missing: '',
          awaitingRepair: '',
          scrap: ''
        },
        {
          equipmentName: '无齿镊(16cm以上)',
          count: 50,
          missing: '',
          awaitingRepair: '',
          scrap: ''
        },
        {
          equipmentName: '大弯剪(16cm以上)',
          count: 50,
          missing: '',
          awaitingRepair: '',
          scrap: ''
        },
        {
          equipmentName: '【外】威高上肢工具',
          count: 4,
          missing: '',
          awaitingRepair: '',
          scrap: ''
        },
        {
          equipmentName: '【外】德骼拜尔上肢',
          count: 6,
          missing: '',
          awaitingRepair: '',
          scrap: ''
        }
      ],
      // index table data
      tableData: [
        {
          cleaningFrame: '架01',
          cleaningBox: 'MJJ001',
          cleaner: '赵美丽',
          cleaningTime: '2020.08.10 09:45:32',
          cleaningEquipment: '清洗机01',
          cleaningProgram: '清洗程序112',
          state: '2'
        },
        {
          cleaningFrame: '架02',
          cleaningBox: 'MJJ002',
          cleaner: '赵美丽',
          cleaningTime: '2020.08.10 09:45:32',
          cleaningEquipment: '清洗机01',
          cleaningProgram: '清洗程序112',
          state: '2'
        }
      ]
    }
  },
  computed: {
    // index table data count
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  methods: {
    // 状态标签文字
    state(state) {
      const stateMap = {
        '1': '已审核装配',
        '2': '未审核装配'
      }
      return stateMap[state]
    },
    // 状态标签图标
    stateIcon(state) {
      const stateMap = {
        '1': 'el-icon-success',
        '2': 'el-icon-time'
      }
      return stateMap[state]
    },
    // 状态标签颜色
    stateColor(state) {
      const stateMap = {
        '1': 'success-color',
        '2': 'base-color'
      }
      return stateMap[state]
    },
    // 控制弹出框
    handleShow(index, row) {
      this.row = row
      this.show = true
    },
    // 检测dialog checkbox是否被选择
    check(item) {
      return this.checkList.includes(item)
    },
    // 计算清洗类型合计
    totalCount(position) {
      let total = 0
      position.forEach(v => {
        v.dirt.forEach(j => {
          if (j.Num !== '') {
            total += parseInt(j.Num)
          }
        })
      })
      return total
    },
    // dialog submit
    signSubmit() {
      this.row.state = '1'
      this.show = false
      this.$message({
        message: '审核装配成功',
        type: 'success'
      })
    },
    // 清洗框/架选择改变
    cleaningBoxChange(box) {
      console.log(box)
    },
    // 清洗设备选择改变
    cleaningEquipmentChange(equ) {
      console.log(equ)
    },
    // 清洗人输入框改变
    contentChange(content) {
      console.log(content)
    },
    // 时间改变
    dateChange(date) {
      console.log(date)
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .el-form-item__label {
  font-weight: normal;
  color: #666666;
}
::v-deep .el-checkbox__label {
  font-size: 18px;
  display: inline-block;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.5);
}
::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #000;
}
::v-deep .el-checkbox__input {
  line-height: unset;
  vertical-align:unset;
}
.title {
  font-size: 18px;
  line-height:24px;
  height: 24px;
  margin-bottom: 16px;
  .dialog-mian-box-right {
    font-size: 14px;
    color: #666666;
    margin-left: 15px;
  }
  .dialog-mian-box-left {
    font-size: 14px;
    color: #ff4c4c;
    margin-left: 15px;
  }
}
.second-row {
  color: #999;
}
::v-deep .dialog-main-box {
  height: 550px;
  background: rgba(246, 246, 246, 1);
  border: 1px dotted rgba(175, 179, 192, 1);
  padding: 20px 25px;
  .box-title {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 16px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
}
.white-box {
  padding: 20px;
  padding-bottom: 0;
  border-radius: 6px;
  margin-bottom: 20px;
  box-shadow:4px 4px 40px 0px rgba(0,0,0,0.05);
  background: #ffffff;
  color: rgba(0, 0, 0, 0.5);
}
.white-box:last-child {
  margin-bottom: 0;
}
.isCheck {
  color: #000000;
}
.dialog-main {
  padding: 20px;
}
.dialog-title {
  font-size:18px;
  line-height:24px;
  display: inline-block;
  margin-right: 16px;
}
.dialog-content {
  font-size:14px;
  color:#999;
  line-height:19px;
}
::v-deep .hidden-table .el-table__body-wrapper {
  display: none;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
.checkTitle {
  line-height: 40px;
}
::v-deep .formItemDisabled .el-form-item__label {
  color:rgba(102,102,102,.5);
}
</style>
