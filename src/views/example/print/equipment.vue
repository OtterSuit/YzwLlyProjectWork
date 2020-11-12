<template>
  <div>
    <!-- 头部 -->
    <myfilters
      title="设备标签"
      :print-button="true"
      @printClick="print"
    />
    <!-- 头部end -->
    <el-alert :closable="false" type="warning" show-icon class="alert-margin">
      <template slot="title">
        <span>标签纸类型：PET不干胶标签纸(小)</span>
        <span style="margin-left:20px">尺寸：50mmx30mm</span>
      </template>
    </el-alert>
    <el-row>
      <div class="label-col">
        <div class="label-title">
          <div>标签模版样式1</div>
        </div>
        <div class="label-main">
          <div class="label-top">
            <el-col :span="12" class="content-col">
              <div class="equipment-name">设备名称</div>
              <div class="equipment-code">10000</div>
            </el-col>
            <el-col :span="12" class="img-col">
              <img :src="erwmURL" class="erwm-img">
            </el-col>
          </div>
        </div>
      </div>
      <div class="label-col">
        <div class="label-title">
          <div>标签模版样式2</div>
        </div>
        <div class="label-main">
          <div class="label-top">
            <el-col :span="12" class="img-col">
              <img :src="erwmURL" class="erwm-img">
            </el-col>
            <el-col :span="12" class="content-col content-col-2">
              <div class="equipment-code">10000</div>
              <div class="equipment-name">设备名称</div>
            </el-col>
          </div>
        </div>
      </div>
    </el-row>
    <el-dialog title="设备标签打印" :visible.sync="printShow" width="95%">
      <div class="dialog-main">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="dialog-main-box">
              <div class="box-title">请选择设备</div>
              <div style="height:470px">
                <el-table :data="tableData" style="width: 100%" class="hidden-table">
                  <el-table-column label="选择" align="center" width="100" />
                  <el-table-column label="设备类别" width="200" />
                  <el-table-column label="数量" />
                </el-table>
                <el-scrollbar style="height:420px;background: #fff">
                  <el-table :data="tableData" style="width: 100%" :show-header="false">
                    <el-table-column align="center" width="100">
                      <template slot-scope="scope">
                        <el-radio
                          v-model="name"
                          :label="scope.row.code"
                          class="hidden-radio"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" width="200" />
                    <el-table-column prop="number" />
                  </el-table>
                </el-scrollbar>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="dialog-main-box">
              <div class="box-title">设置标签</div>
              <el-form ref="form" :model="form" label-width="80px">
                <el-row type="flex" justify="space-between">
                  <el-col :span="11">
                    <el-form-item label="打印数量">
                      <el-input v-model="form.num" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="标签样式">
                      <el-select v-model="form.style" placeholder="请选择标签样式">
                        <el-option label="模板样式1" value="模板样式1" />
                        <el-option label="模板样式2" value="模板样式2" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <el-row>
                <el-col :span="4">
                  <div class="label-title">标签预览</div>
                </el-col>
                <el-col :span="20">
                  <div v-show="form.style==='模板样式1'" class="label-main">
                    <div class="label-top">
                      <el-col :span="12" class="content-col">
                        <div class="equipment-name">{{ form.name }}</div>
                        <div class="equipment-code">{{ form.code }}</div>
                      </el-col>
                      <el-col :span="12" class="img-col">
                        <img :src="erwmURL" class="erwm-img">
                      </el-col>
                    </div>
                  </div>
                  <div v-show="form.style==='模板样式2'" class="label-main">
                    <div class="label-top">
                      <el-col :span="12" class="img-col">
                        <img :src="erwmURL" class="erwm-img">
                      </el-col>
                      <el-col :span="12" class="content-col content-col-2">
                        <div class="equipment-code">{{ form.code }}</div>
                        <div class="equipment-name">{{ form.name }}</div>
                      </el-col>
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
      erwmURL: require('../../../assets/images/erwm.png'),
      printShow: false,
      tableData: [
        {
          code: '10001',
          name: '清洗架',
          number: 12
        },
        {
          code: '10002',
          name: '清洗锅',
          number: 16
        },
        {
          code: '10003',
          name: '灭菌架',
          number: 6
        },
        {
          code: '10004',
          name: '灭菌锅',
          number: 10
        },
        {
          code: '10005',
          name: '清洗程序',
          number: 1
        },
        {
          code: '10006',
          name: '灭菌程序',
          number: 1
        }
      ],
      name: '1001',
      form: {}
    }
  },
  watch: {
    name: {
      handler(newValue, oldValue) {
        this.tableData.forEach(element => {
          if (element.code === this.name) {
            this.form.num = element.number
            this.form.name = element.name
            this.form.code = element.code
          }
        })
      }
    }
  },
  methods: {
    print() {
      this.printShow = true
      this.name = this.tableData[0].code
      this.form = {
        style: '模板样式1',
        num: this.tableData[0].number,
        name: this.tableData[0].name,
        code: this.tableData[0].code
      }
    },
    printSubmit() {
      this.printShow = false
      this.$message({
        message: '打印成功',
        type: 'success'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.alert-margin {
  margin-bottom: 30px;
}
.label-title {
  font-size: 14px;
  font-weight: bold;
  color: #666666;
  line-height: 19px;
  margin-bottom: 20px;
}
.label-col {
  padding: 0 10px;
  display: inline-block;
  margin-bottom: 40px;
}
.img-col {
  width: 196px;
}
.content-col {
  width: calc(100% - 196px);
}
.content-col-2 {
  padding-left: 15px;
}
.label-main {
  width: 394px;
  height: 236px;
  border: 1px dotted #ababab;
  .label-top {
    background-color: #fff;
    padding: 20px;
    height: 234px;
  }
  .erwm-img {
    width: 196px;
    border: 1px solid #9b9b9b;
  }
  .equipment-name {
    font-size: 24px;
    line-height: 31px;
    margin-bottom: 20px;
  }
  .equipment-code {
    font-size: 46px;
    line-height: 61px;
    margin-bottom: 30px;
  }
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
::v-deep .hidden-radio .el-radio__label {
  display: none;
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
  font-weight: normal;
}
</style>
