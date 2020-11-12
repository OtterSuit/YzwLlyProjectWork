<template>
  <div class="record-style">
    <!-- header -->
    <myfilters
      title="清洗质量记录表"
      content="NO.0033124"
      :back-button="true"
    />
    <!-- header end -->
    <div class="white-box">
      <div class="table">
        <!-- table -->
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            label="单号"
            prop="number"
          />
          <el-table-column
            label="检查者/时间"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.row.checker }} <br>
                <span class="second-row">
                  {{ scope.row.checkTime }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="清洗架"
            prop="cleaningBox"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.row.cleaningFrame }} <br>
                <span class="second-row">
                  {{ scope.row.cleaningBox }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="清洗人/时间"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.row.cleaner }} <br>
                <span class="second-row">
                  {{ scope.row.cleaningTime }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="清洗设备/程序"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.row.cleaningEquipment }} <br>
                <span class="second-row">
                  {{ scope.row.cleaningProgram }}
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- table end -->
      </div>
      <!-- 循环所有的清洗类型 -->
      <div v-for="item in recordData" :key="item.type" class="table">
        <!-- 清洗类型表格 -->
        <table>
          <tr>
            <!-- 清洗类型 -->
            <th rowspan="3" class="left-thead">{{ item.type }}</th>
            <!-- 循环所有的清洗部位 -->
            <td v-for="element in item.position" :key="element.positionName">
              <table class="table-border">
                <tr>
                  <td class="top-thead" :colspan="element.dirt.length">{{ element.positionName }}</td>
                </tr>
                <tr>
                  <!-- 循环所有的清洗污渍 -->
                  <td v-for="children in element.dirt" :key="children.dirtName">
                    {{ children.dirtName }}
                  </td>
                </tr>
                <tr class="width-10">
                  <!-- 循环所有的清洗污渍个数 -->
                  <td v-for="children in element.dirt" :key="children.dirtName">
                    {{ children.Num }}
                  </td>
                </tr>
              </table>
            </td>
            <!-- 合计 -->
            <td style="width: 12%;">
              <table class="table-border">
                <tr>
                  <td class="top-thead">合计</td>
                </tr>
                <tr>
                  <td rowspan="2">
                    {{ item.total }}
                  </td>
                </tr>
                <tr />
              </table>
            </td>
          </tr>
        </table>
      </div>
    </div>
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
      // 表格数据
      tableData: [{
        number: '0033124',
        checker: ' 赵美丽',
        checkTime: '2020.08.10 09.45.12',
        cleaningBox: 'MJJ001',
        cleaningFrame: '架01',
        cleaner: ' 赵美丽',
        cleaningTime: '2020.08.10 09.45.12',
        cleaningEquipment: '清洗机01',
        cleaningProgram: '清洗程序112'
      }],
      // 记录数据
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
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
table{
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
}
tr {
  height: 40px;
}
th{
  border: 1px solid rgba(235,238,245,1);
}
th,td{
  text-align: center;
  color: #666666;
  padding: 0;
}
.table-border {
  border-top: 1px solid rgba(235,238,245,1);
  td {
    border-right: 1px solid rgba(235,238,245,1);
    border-bottom: 1px solid rgba(235,238,245,1);
  }
}
.table{
  font-size:14px;
  margin-bottom: 20px;
  // margin: 20px;
}
.left-thead{
  width: 12%;
  background: #F6F6F6;
  color: #000000;
}
.top-thead{
  background: #F6F6F6;
}
.record-style{
  background-color:#F0F2F5;
  padding: 30px;
}
.white-box{
  background: #FFFFFF;
  padding: 20px 20px 10px;
}
.second-row {
  color: #999;
}
</style>
