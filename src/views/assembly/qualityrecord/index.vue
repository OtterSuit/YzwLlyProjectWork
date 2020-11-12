<template>
  <div style="padding:30px">
    <!-- header -->
    <myfilters
      title="清洗资料记录表"
      :content="content"
      :choose-cleaning-box="true"
      :search-content="true"
      format="yyyy.MM.dd"
      placeholder="单号/检查者"
      :choose-date="true"
      @cleaningBoxChange="cleaningBoxChange"
      @contentChange="contentChange"
      @dateChange="dateChange"
    >
      <template slot="extent">
        <el-button
          type="grey"
          style="margin-left:5px"
          icon="el-icon-tickets"
          @click="exportClick"
        >月度汇总表</el-button>
      </template>
    </myfilters>
    <!-- header end -->
    <!-- table -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column label="单号" prop="number" />
      <el-table-column label="检查者/时间">
        <template slot-scope="scope">
          <div>
            {{ scope.row.checker }}
            <br>
            <span class="second-row">{{ scope.row.checkTime }}</span>
          </div>
        </template>
      </el-table-column>
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
      <el-table-column label="不合格数量" prop="unqualifiedQuantity" />
      <el-table-column width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleDetails(scope.row.id, scope.row)"
          >
            <i class="el-icon-tickets" /> 查看详细
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
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
      row: [],
      title: '',
      // table data
      tableData: [
        {
          number: '0033124',
          checker: '赵美丽',
          checkTime: '2020.08.10 09.45.12',
          cleaningBox: 'MJJ001',
          cleaningFrame: '架01',
          cleaner: '赵美丽',
          cleaningTime: '2020.08.10 09.45.12',
          unqualifiedQuantity: '2'
        },
        {
          number: '0033124',
          checker: '赵美丽',
          checkTime: '2020.08.10 09.45.12',
          cleaningBox: 'MJJ001',
          cleaningFrame: '架01',
          cleaner: '赵美丽',
          cleaningTime: '2020.08.10 09.45.12',
          unqualifiedQuantity: '2'
        }
      ],
      // 记录单记录
      recordData: [
        {
          type: '管腔类',
          total: 8,
          position: [
            {
              positionName: '盲端开口',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: 1
                },
                {
                  dirtName: '锈渍',
                  Num: 2
                },
                {
                  dirtName: '附着物',
                  Num: 1
                }
              ]
            },
            {
              positionName: '管腔内',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: 1
                },
                {
                  dirtName: '锈渍',
                  Num: 2
                },
                {
                  dirtName: '附着物',
                  Num: 1
                }
              ]
            }
          ]
        },
        {
          type: '窥类',
          total: 8,
          position: [
            {
              positionName: '螺钉',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: 1
                },
                {
                  dirtName: '锈渍',
                  Num: 2
                }
              ]
            },
            {
              positionName: '嘴部',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: 1
                },
                {
                  dirtName: '锈渍',
                  Num: 1
                }
              ]
            },
            {
              positionName: '凹位',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: 2
                },
                {
                  dirtName: '锈渍',
                  Num: 1
                }
              ]
            }
          ]
        },
        {
          type: '刮匙',
          total: 5,
          position: [
            {
              positionName: '匙圈',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: 1
                },
                {
                  dirtName: '锈渍',
                  Num: 2
                }
              ]
            },
            {
              positionName: '表面',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: 1
                },
                {
                  dirtName: '锈渍',
                  Num: 1
                }
              ]
            }
          ]
        },
        {
          type: '剪刀',
          total: 5,
          position: [
            {
              positionName: '轴节',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: 1
                },
                {
                  dirtName: '锈渍',
                  Num: 2
                }
              ]
            },
            {
              positionName: '刃面',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: 1
                },
                {
                  dirtName: '锈渍',
                  Num: 1
                }
              ]
            }
          ]
        },
        {
          type: '钳类',
          total: 5,
          position: [
            {
              positionName: '轴节',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: 1
                },
                {
                  dirtName: '锈渍',
                  Num: 2
                }
              ]
            },
            {
              positionName: '齿槽',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: 1
                },
                {
                  dirtName: '锈渍',
                  Num: 1
                }
              ]
            }
          ]
        },
        {
          type: '镊子',
          total: 8,
          position: [
            {
              positionName: '齿槽',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: 1
                },
                {
                  dirtName: '锈渍',
                  Num: 2
                }
              ]
            },
            {
              positionName: '缝隙',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: 1
                },
                {
                  dirtName: '锈渍',
                  Num: 1
                }
              ]
            },
            {
              positionName: '表面',
              dirt: [
                {
                  dirtName: '污渍',
                  Num: 2
                },
                {
                  dirtName: '锈渍',
                  Num: 1
                }
              ]
            }
          ]
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
    // 输出记录表点击
    exportClick() {
      import('@/vendor/Export2Excel').then(excel => {
        const multiHeader = [
          ['器械清洗质量记录表', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['日期', '管腔类', '', '', '', '', '', '', '窥类', '', '', '', '', '', '', '刮匙', '', '', '', '', '剪刀', '', '', '', '', '钳类', '', '', '', '', '镊子', '', '', '', '', '', '', '检查者签名'],
          ['', '盲端开口', '', '', '管腔内', '', '', '合计', '螺钉', '', '嘴部', '', '凹位', '', '合计', '匙圈', '', '表面', '', '合计', '轴节', '', '刃面', '', '合计', '轴节', '', '齿槽', '', '合计', '齿槽', '', '缝隙', '', '表面', '', '合计', '']
        ]
        const header = ['', '污渍', '锈渍', '附着物', '污渍', '锈渍', '附着物', '', '污渍', '锈渍', '污渍', '锈渍', '污渍', '锈渍', '', '污渍', '锈渍', '污渍', '锈渍', '', '污渍', '锈渍', '污渍', '锈渍', '', '污渍', '锈渍', '污渍', '锈渍', '', '污渍', '锈渍', '污渍', '锈渍', '污渍', '锈渍', '', '']
        const filterVal = [
          'index',
          'number',
          'checker',
          'checkTime',
          'cleaningBox',
          'cleaningFrame',
          'cleaner',
          'cleaningTime',
          'unqualifiedQuantity'
        ]
        const merges = ['A1:AL1', 'A2:A4', 'B2:H2', 'I2:O2', 'P2:T2', 'U2:Y2', 'Z2:AD2', 'AE2:AK2', 'AL2:AL4', 'B3:D3', 'E3:G3', 'I3:J3', 'K3:L3', 'M3:N3', 'P3:Q3', 'R3:S3', 'U3:V3', 'W3:X3', 'Z3:AA3', 'AB3:AC3', 'AE3:AF3', 'AG3:AH3', 'AI3:AJ3']
        const data = this.formatJson(filterVal)
        console.log(data)
        excel.export_json_to_excel({
          multiHeader,
          header,
          merges,
          data,
          filename: '器械清洗质量记录表'
        })
      })
    },
    // 格式化数据
    formatJson(filterVal) {
      const arr = []
      this.tableData.forEach(v => {
        const row = []
        row.push(v.checkTime)
        this.recordData.forEach(i => {
          i.position.forEach(j => {
            j.dirt.forEach(k => {
              row.push(k.Num)
            })
          })
          row.push(i.total)
        })
        row.push(v.checker)
        arr.push(row)
      })
      return arr
    },
    // 查看详细
    handleDetails(index, row) {
      this.$router.push({ path: '/assembly/qualityrecord/record' })
    },
    // 输入框改变
    contentChange(content) {
      console.log(content)
    },
    // 日期选择改变
    dateChange(date) {
      console.log(date)
    },
    // 清洗框/架选择改变
    cleaningBoxChange(cleaningBox) {
      console.log(cleaningBox)
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.second-row {
  color: #999;
}
</style>
