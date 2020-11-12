<template>
  <div style="padding:30px">
    <!-- header -->
    <myfilters
      title="任务列表"
      :content="content"
      :search-content="true"
      :add-button="true"
      addifo="开始装载"
      add-icon="el-icon-first-aid-kit"
      placeholder="包名称/包编号"
      @addClick="startLoading"
      @contentChange="contentChange"
    />
    <!-- header end -->
    <!-- table -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100px" />
      <el-table-column label="包编号" prop="packageCoding" width="150px" />
      <el-table-column label="包名称" prop="packageName" />
      <el-table-column label="数量" prop="count" width="150px" />
      <el-table-column label="封包人/时间">
        <template slot-scope="scope">
          <div>
            {{ scope.row.packagePerson }}
            <br>
            <span class="second-row">{{ scope.row.packageTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="审核状态">
        <template slot-scope="scope">
          <div :class="stateColor(scope.row.state)">
            <i :class="stateIcon(scope.row.state)" />
            {{ state(scope.row) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="120">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-tickets"
            size="mini"
            style="margin-right:5px"
            @click="handleShow(scope.$index, scope.row)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <!-- 查看详细弹出框 -->
    <el-dialog :visible.sync="packageShow" width="95%">
      <template slot="title">
        <span style="font-size:18px">{{ row.packageName }}</span>
        <span class="tiny-text">共{{ row.count }}包</span>
      </template>
      <div class="dialog-main" style="height:1000px">
        <!-- table header -->
        <el-table :data="row.package" style="width: 100%" class="hidden-table">
          <el-table-column label="序号" width="150px" />
          <el-table-column label="包名称" width="250px" />
          <el-table-column label="包编码" width="250px" />
          <el-table-column label="选择灭菌设备" />
        </el-table>
        <!-- table header end -->
        <!-- scrollbar -->
        <el-scrollbar style="height:500px;background: #fff">
          <!-- table body -->
          <el-table :data="row.package" style="width:100%" :show-header="false">
            <el-table-column type="index" width="150px" />
            <el-table-column prop="packageName" width="250px" />
            <el-table-column prop="packageCoding" width="250px" />
            <el-table-column width="250px">
              <template slot-scope="scope">
                <el-select v-model="scope.row.equipment" placeholder="请选择" @change="equipmentChange(scope.row.equipment)">
                  <el-option
                    v-for="item in equipmentOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column />
          </el-table>
          <!-- table body end -->
        </el-scrollbar>
        <!-- scrollbar end -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="packageShow=false">取消</el-button>
        <el-button
          type="primary"
          @click="packageSubmit()"
        >确定装载</el-button>
      </div>
    </el-dialog>
    <!-- 查看详细弹出框结束 -->
    <!-- 开始装载弹出框 -->
    <el-dialog title="请选择灭菌设备" :visible.sync="equipmentShow" width="950px">
      <div class="dialog-main" style="height:500px;">
        <div>
          <el-radio-group v-model="equipmentChoice">
            <el-radio label="灭菌设备010" />
            <el-radio label="灭菌设备011" />
            <el-radio label="灭菌设备012" />
            <el-radio label="灭菌设备015" />
            <el-radio label="灭菌设备021" />
            <el-radio label="灭菌设备026" />
            <el-radio label="灭菌设备031" />
          </el-radio-group>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" style="width: 100px" @click="equipmentShow=false">取消</el-button>
        <el-button
          type="primary"
          style="width: 150px"
          @click="equipmentSubmit()"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 开始装载弹出框结束 -->
    <!-- 灭菌设备装载弹出框 -->
    <el-dialog :visible.sync="loadingShow" width="95%">
      <template slot="title">
        <span style="font-size:18px">{{ equipmentChoice }}</span>
        <span class="tiny-text" style="color: #FF4C4C">请扫描需要装载的器械包条码，完成后再扫码</span>
      </template>
      <div class="dialog-main">
        <!-- table header -->
        <el-table :data="dialogData" style="100%" class="hidden-table">
          <el-table-column label="序号" width="150px" />
          <el-table-column label="包编码" width="260px" />
          <el-table-column label="包名称" />
        </el-table>
        <!-- table header end -->
        <!-- scrollbar -->
        <el-scrollbar style="height:480px;background: #fff">
          <div style="width:390px; margin:15px 150px">
            <el-input v-model="dialogCoding" placeholder="请输入或扫描包编码" />
          </div>
          <!-- table body  -->
          <el-table :data="dialogData" style="100%" :show-header="false">
            <el-table-column type="index" width="150px" />
            <el-table-column prop="packageCoding" width="260px" />
            <el-table-column prop="packageName" />
            <el-table-column width="100px">
              <template slot-scope="scope">
                <i
                  class="el-icon-delete base-color delete-icon"
                  @click="handleDelete(scope.$index,scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
          <!-- table body end -->
        </el-scrollbar>
        <!-- scrollbar end -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="loadingShow=false">取消</el-button>
        <el-button
          type="primary"
          @click="loadingSubmit()"
        >确定装载</el-button>
      </div>
    </el-dialog>
    <!-- 灭菌设备装载弹出框结束 -->
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
      packageShow: false, // 查看详细弹出框
      equipmentShow: false, // 灭菌设备弹出框
      loadingShow: false, // 灭菌设备装载弹出框
      dialogCoding: '', // 输入码
      equipmentChoice: '灭菌设备012', // 灭菌设备选择
      // table data
      tableData: [
        {
          packageCoding: 10001,
          packageName: '糖足包',
          count: 12,
          complete: 9,
          packagePerson: '赵美丽',
          packageTime: '2020.08.10 09:45:32',
          state: '3',
          // 查看包数据
          package: [
            {
              packageName: '糖足包',
              packageCoding: 1001,
              equipment: '灭菌设备012'
            },
            {
              packageName: '糖足包',
              packageCoding: 1001,
              equipment: ''
            },
            {
              packageName: '糖足包',
              packageCoding: 1001,
              equipment: ''
            },
            {
              packageName: '糖足包',
              packageCoding: 1001,
              equipment: ''
            },
            {
              packageName: '糖足包',
              packageCoding: 1001,
              equipment: ''
            },
            {
              packageName: '糖足包',
              packageCoding: 1001,
              equipment: ''
            },
            {
              packageName: '糖足包',
              packageCoding: 1001,
              equipment: ''
            },

            {
              packageName: '糖足包',
              packageCoding: 1001,
              equipment: ''
            },
            {
              packageName: '糖足包',
              packageCoding: 1001,
              equipment: ''
            },
            {
              packageName: '糖足包',
              packageCoding: 1001,
              equipment: ''
            },
            {
              packageName: '糖足包',
              packageCoding: 1001,
              equipment: ''
            },
            {
              packageName: '糖足包',
              packageCoding: 1001,
              equipment: ''
            }
          ]
        },
        {
          packageCoding: '10003',
          packageName: '脐穿包',
          count: 16,
          complete: 0,
          packagePerson: '赵美丽',
          packageTime: '2020.08.10 09:45:32',
          state: '2',
          package: []
        },
        {
          packageCoding: '10004',
          packageName: '神一脑室引流包',
          count: 6,
          complete: 0,
          packagePerson: '赵美丽',
          packageTime: '2020.08.10 09:45:32',
          state: '2',
          package: []
        },
        {
          packageCoding: '10005',
          packageName: '血透室缝合包',
          count: 10,
          complete: 0,
          packagePerson: '赵美丽',
          packageTime: '2020.08.10 09:45:32',
          state: '2',
          package: []
        },
        {
          packageCoding: '20010',
          packageName: '外来器械包',
          count: 1,
          complete: 1,
          packagePerson: '赵美丽',
          packageTime: '2020.08.10 09:45:32',
          state: '1',
          package: []
        }
      ],
      // 设备选择选项
      equipmentOptions: [
        {
          value: '灭菌设备010',
          label: '灭菌设备010'
        },
        {
          value: '灭菌设备011',
          label: '灭菌设备011'
        },
        {
          value: '灭菌设备012',
          label: '灭菌设备012'
        },
        {
          value: '灭菌设备015',
          label: '灭菌设备015'
        },
        {
          value: '灭菌设备021',
          label: '灭菌设备021'
        },
        {
          value: '灭菌设备026',
          label: '灭菌设备026'
        },
        {
          value: '灭菌设备031',
          label: '灭菌设备031'
        }
      ],
      // 装载数据
      dialogData: [
        {
          packageCoding: 1001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 1001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 1001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 1001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 1001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 1001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 1001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 1001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 1001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 1001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 1001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 1001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 1001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 1001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 1001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 1001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 1001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 1004,
          packageName: '神一脑室引流包 '
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
    // 状态标签文字
    state(row) {
      const stateMap = {
        '1': '装载完成',
        '2': '等待装载',
        '3': '正在装载，已完成' + row.complete + '包'
      }
      return stateMap[row.state]
    },
    // 状态标签图标
    stateIcon(state) {
      const stateMap = {
        '1': 'el-icon-success',
        '2': 'el-icon-time',
        '3': 'icon-zhuangpei iconfont'
      }
      return stateMap[state]
    },
    // 状态标签颜色
    stateColor(state) {
      const stateMap = {
        '1': 'success-color',
        '2': 'base-color',
        '3': 'green-color'
      }
      return stateMap[state]
    },
    // 查看按钮
    handleShow(index, row) {
      this.packageShow = true
      this.row = row
    },
    // 设备选择改变
    equipmentChange(equipment) {
      console.log(equipment)
    },
    // 查看弹出框确定
    packageSubmit() {
      let count = 0
      this.row.package.forEach(element => {
        if (element.equipment !== '') {
          count++
        }
      })
      this.row.complete = count
      if (count !== 0) {
        this.row.state = '3'
      }
      this.packageShow = false
    },
    // 开始装载弹出框确定
    equipmentSubmit() {
      this.equipmentShow = false
      this.loadingShow = true
    },
    // 开始装载按钮点击
    startLoading() {
      this.equipmentShow = true
    },
    // 删除图标点击
    handleDelete(index, row) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.dialogData.splice(index, 1)
    },
    // 开始装载
    loadingSubmit() {
      this.$message({
        message: '装载成功',
        type: 'success'
      })
      this.loadingShow = false
    },
    // 输入框输入改变
    contentChange(content) {
      console.log(content)
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .el-radio{
  margin: 30px;
  .el-radio__input.is-checked+.el-radio__label {
    background: #F0F9EB;
    color: #69C33E;
  }
  .el-radio__label {
    border-radius:3px;
    padding: 10px 28px;
    font-size: 18px;
    background: #F4F4F5;
  }
  .el-radio__input.is-checked .el-radio__inner {
    display: block;
  }
  .el-radio__inner {
    position: absolute;
    top: -22px;
    left: 3px;
    display: none;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #29C06D;
    background: #29C06D;
  }
  .el-radio__input.is-checked .el-radio__inner::after{
    background-color: #29C06D;
  }
}

.tiny-text{
  font-size: 12px;
  color: #999999;
  padding-left: 15px;
}
.green-color,
.green-color:hover {
  color: #40c9c6;
}
::v-deep .hidden-table .el-table__body-wrapper {
  display: none;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
.delete-icon {
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
}
</style>
