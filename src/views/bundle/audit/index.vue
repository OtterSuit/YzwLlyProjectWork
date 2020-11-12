<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="审核"
      :content="content"
      :choose-date="true"
      :choose-cleaning-box="true"
      format="yyyy.MM.dd"
      placeholder="装配人"
      :search-content="true"
      @contentChange="contentChange"
      @dateChange="dateChange"
      @cleaningBoxChange="cleaningBoxChange"
    />
    <!-- 头部 end -->
    <!-- table -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column label="清洗框/架">
        <template slot-scope="scope">
          {{ scope.row.cleaningBox }}<br>
          <span class="second-row">{{ scope.row.cleaningBoxCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="装配人/时间">
        <template slot-scope="scope">
          {{ scope.row.assemblyPerson }}<br>
          <span class="second-row">{{ scope.row.assemblyTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="instrumentNum" label="器械数量" />
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div :class="stateColor(scope.row.state)">
            <i :class="stateIcon(scope.row.state)" />
            {{ state(scope.row.state) }}
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
          >审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <!-- 弹窗 -->
    <el-dialog :visible.sync="show" width="95%">
      <template slot="title">
        <span class="dialog-title">{{ tableData[editIndex].cleaningBox }}</span>
        <span class="dialog-content">{{ tableData[editIndex].cleaningBoxCode }}</span>
      </template>
      <div class="dialog-main">
        <el-row>
          <el-col>
            <div class="dialog-main-box">
              <div>
                <span class="box-title">请清点核对器械数量</span>
                <span class="box-title-right">共
                  <span>{{ instrumentNum() }}</span>
                  件器械</span>
              </div>
              <div style="height:470px">
                <el-table :data="instrumentData" style="width: 100%" class="hidden-table">
                  <el-table-column label="序号" />
                  <el-table-column label="器械名称" />
                  <el-table-column label="数量" />
                </el-table>
                <el-scrollbar style="height:420px;background: #fff">
                  <el-table :data="instrumentData" style="width: 100%" :show-header="false">
                    <el-table-column type="index" width="100" />
                    <el-table-column prop="name" />
                    <el-table-column prop="num" />
                  </el-table>
                </el-scrollbar>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="show=false">取消</el-button>
        <el-button type="primary" @click="auditSubmit">审核通过</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗end -->
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
      tableData: [
        {
          cleaningBox: '架01',
          cleaningBoxCode: 'MJJ001',
          assemblyPerson: '赵美丽',
          assemblyTime: '2020.08.10 09:52:38',
          instrumentNum: 260,
          state: 2
        },
        {
          cleaningBox: '架02',
          cleaningBoxCode: 'MJJ002',
          assemblyPerson: '赵美丽',
          assemblyTime: '2020.08.10 09:52:38',
          instrumentNum: 260,
          state: 2
        }
      ],
      instrumentData: [
        {
          name: '卵圆钳(弯/直/有齿/无齿)',
          num: 50
        },
        {
          name: '弯钳(16cm以上)',
          num: 50
        },
        {
          name: '有齿镊(16cm以上)',
          num: 50
        },
        {
          name: '无齿镊(16cm以上)',
          num: 50
        },
        {
          name: '大弯剪(16cm以上)',
          num: 50
        },
        {
          name: '【外】威高上肢工具',
          num: 4
        },
        {
          name: '【外】德骼拜尔上肢',
          num: 6
        }
      ],
      show: false,
      editIndex: 0
      // row: []
    }
  },
  computed: {
    // 计算tableData有几条数据
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  methods: {
    handleShow(index, row) {
      // this.row = row.detail
      this.show = true
      this.editIndex = index
    },
    auditSubmit() {
      this.tableData[this.editIndex].state = 1
      this.$message({
        message: '审核成功',
        type: 'success'
      })
      this.show = false
    },
    instrumentNum() {
      let num = 0
      this.instrumentData.forEach(element => {
        num += parseInt(element.num)
      })
      return num
    },
    // 状态标签文字
    state(state) {
      const stateMap = {
        '1': '已审核',
        '2': '等待审核'
      }
      return stateMap[state]
    },
    // 状态的icon
    stateIcon(state) {
      const stateMap = {
        '1': 'el-icon-success',
        '2': 'el-icon-time'
      }
      return stateMap[state]
    },
    // 状态颜色
    stateColor(state) {
      const stateMap = {
        '1': 'success-color',
        '2': 'base-color'
      }
      return stateMap[state]
    },
    // 输入框改变
    contentChange(content) {
      console.log(content)
    },
    // 时间改变
    dateChange(date) {
      console.log(date)
    },
    cleaningBoxChange(box) {
      console.log(box)
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.second-row {
  color: #999;
}
.dialog-main {
  padding: 20px;
}
.dialog-main-box {
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
::v-deep .hidden-table .el-table__body-wrapper {
  display: none;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
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
.box-title-right {
  float: right;
  font-size:14px;
  color:#666;
  line-height:19px;
  span {
    font-size:24px;
    color:black;
    line-height:31px;
    display: inline-block;
    margin: 0 10px;
  }
}
</style>
