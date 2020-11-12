<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="维修/报废"
      :content="content"
      :choose-date="true"
      :choose-cleaning-box="true"
      addifo="添加记录"
      add-icon="el-icon-plus"
      :add-button="true"
      format="yyyy.MM.dd"
      placeholder="回收人/清洗人"
      :search-content="true"
      @addClick="addClick"
      @contentChange="contentChange"
      @dateChange="dateChange"
      @cleaningBoxChange="cleaningBoxChange"
    />
    <!-- 头部end -->
    <!-- table -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item v-if="rowLength(props.row.maintenance,'maintenance')!==0" label="维修">
              <span v-for="item in props.row.maintenance" :key="item.name">
                <span v-if="item.type==='maintenance'" class="expand-span">{{ item.name }}x{{ item.num }}</span>
              </span>
            </el-form-item>
            <el-form-item v-if="rowLength(props.row.maintenance,'scrap')!==0" label="报废">
              <span v-for="item in props.row.maintenance" :key="item.name">
                <span v-if="item.type==='scrap'" class="expand-span">{{ item.name }}x{{ item.num }}</span>
              </span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column label="清洗框/架">
        <template slot-scope="scope">
          {{ scope.row.cleaningBox }}<br>
          <span class="second-row">{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="清洗人/时间">
        <template slot-scope="scope">
          {{ scope.row.cleanPerson }}<br>
          <span class="second-row">{{ scope.row.cleanTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="维修">
        <template slot-scope="scope">
          {{ rowLength(scope.row.maintenance,'maintenance') }}
        </template>
      </el-table-column>
      <el-table-column label="报废">
        <template slot-scope="scope">
          {{ rowLength(scope.row.maintenance,'scrap') }}
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <!-- 弹窗 -->
    <el-dialog v-el-drag-dialog title="添加记录" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-scrollbar>
          <el-form ref="form" :model="form" label-width="80px" class="scrollbar-form">
            <el-row type="flex">
              <el-col :span="24">
                <el-form-item label="清洗架">
                  <el-select v-model="form.cleaningBox" placeholder="请选择">
                    <el-option
                      v-for="item in cleaningBoxOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-for="(item,index) in form.maintenance" :key="item.type+index" type="flex" :gutter="10">
              <el-col :span="12">
                <el-form-item label="器械名字">
                  <el-input v-model="item.name" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-input v-model="item.num" placeholder="请输入数量" />
              </el-col>
              <el-col :span="5">
                <el-select v-model="item.type" placeholder="请选择">
                  <el-option
                    label="维修"
                    value="maintenance"
                  />
                  <el-option
                    label="报废"
                    value="scrap"
                  />
                </el-select>
              </el-col>
              <el-col :span="1">
                <i class="el-icon-circle-plus-outline dialog-icon" @click="addItem" />
              </el-col>
              <el-col :span="1">
                <i v-show="index!==0" class="el-icon-delete dialog-icon" @click="deleteItem(item,index)" />
              </el-col>
            </el-row>
          </el-form>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="show=false">取消</el-button>
        <el-button type="primary" @click="addSubmit">确认</el-button>
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
      form: {
        cleaningBox: '',
        maintenance: [
          {
            name: '',
            num: '',
            type: 'maintenance'
          }
        ]
      },
      show: false,
      cleaningBoxOptions: [
        {
          value: '架01',
          label: '架01'
        },
        {
          value: '架02',
          label: '架02'
        },
        {
          value: '架03',
          label: '架03'
        },
        {
          value: '架04',
          label: '架04'
        }
      ],
      tableData: [
        {
          cleaningBox: '架01',
          code: 'MJJ001',
          cleanPerson: '赵美丽',
          cleanTime: '2020.08.10 09:45:32',
          maintenance: [
            {
              name: '五官小弯剪',
              num: 1,
              type: 'maintenance'
            },
            {
              name: '弯钳(16cm以上)',
              num: 1,
              type: 'scrap'
            },
            {
              name: '无齿镊(16cm以上)',
              num: 1,
              type: 'scrap'
            }
          ]
        },
        {
          cleaningBox: '架02',
          code: 'MJJ002',
          cleanPerson: '赵美丽',
          cleanTime: '2020.08.10 09:45:32',
          maintenance: [
            {
              name: '弯钳(16cm以上)',
              num: 1,
              type: 'scrap'
            }
          ]
        },
        {
          cleaningBox: '架04',
          code: 'MJJ004',
          cleanPerson: '赵美丽',
          cleanTime: '2020.08.10 09:45:32',
          maintenance: [
            {
              name: '五官小弯剪',
              num: 1,
              type: 'maintenance'
            },
            {
              name: '正畸剪',
              num: 1,
              type: 'maintenance'
            },
            {
              name: '无齿镊(16cm以上)',
              num: 1,
              type: 'maintenance'
            },
            {
              name: '眼科小剪',
              num: 1,
              type: 'maintenance'
            },
            {
              name: '弯止血钳',
              num: 1,
              type: 'maintenance'
            },
            {
              name: '弯钳(16cm以上)',
              num: 1,
              type: 'scrap'
            }
          ]
        }
      ]
    }
  },
  computed: {
    // 计算tableData有几条数据
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  methods: {
    // 返回维修和报废的数量
    rowLength(row, str) {
      let length = 0
      row.forEach(element => {
        if (element.type === str) {
          length += 1
        }
      })
      return length
    },
    // 添加记录按钮
    addClick() {
      this.form = {
        cleaningBox: '',
        maintenance: [
          {
            name: '',
            num: '',
            type: 'maintenance'
          }
        ]
      }
      this.show = true
    },
    // 添加记录弹窗确认按钮
    addSubmit() {
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.form.code = 'MJJ0' + this.form.cleaningBox.substring(1, 3)
      this.form.cleanPerson = '赵美丽'
      this.form.cleanTime = '2020.08.10 09:45:32'
      this.tableData.push(this.form)
      this.show = false
    },
    // 弹窗内添加器械名字右侧+添加按钮
    addItem() {
      this.form.maintenance.push({
        name: '',
        num: '',
        type: 'maintenance'
      })
    },
    // 弹窗内添加器械名字右侧删除按钮
    deleteItem(item, index) {
      this.form.maintenance.splice(index, 1)
    },
    // 输入框改变
    contentChange(content) {
      console.log(content)
    },
    // 时间改变
    dateChange(date) {
      console.log(date)
    },
    // 清洗框改变
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
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
::v-deep .demo-table-expand .el-form-item__label {
  width: 60px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.expand-span {
  margin-right: 30px;
}
.dialog-main {
  padding: 0;
  height: 420px;
}
.scrollbar-form {
  padding-top: 20px;
  padding-bottom: 0;
}
.dialog-icon {
  font-size: 16px;
  line-height: 40px;
  color: #999;
  cursor: pointer;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
