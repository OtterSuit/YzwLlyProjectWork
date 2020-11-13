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
              <MyQrcode text="标签模版样式1" class="erwm-img" :size="180" />
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
              <MyQrcode text="标签模版样式2" class="erwm-img" :size="180" />
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
                <el-table v-loading="listLoading" :data="tableData" style="width: 100%" class="hidden-table">
                  <el-table-column label="选择" align="center" width="100" />
                  <el-table-column label="编码" />
                  <el-table-column label="名称" />
                </el-table>
                <el-scrollbar class="scrollbar">
                  <el-table v-loading="listLoading" :data="tableData" style="width: 100%" :show-header="false">
                    <el-table-column align="center" width="100">
                      <template slot-scope="scope">
                        <el-checkbox
                          v-model="form.code"
                          :label="scope.row"
                          class="hidden-radio"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column prop="code" />
                    <el-table-column prop="name" />
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
                    <el-form-item label="标签样式">
                      <el-select v-model="form.style" placeholder="请选择标签样式">
                        <el-option label="模板样式1" :value="1" />
                        <el-option label="模板样式2" :value="2" />
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
                  <div v-show="form.style===1" class="label-main">
                    <div class="label-top">
                      <el-col :span="12" class="content-col">
                        <div class="equipment-name">设备名称</div>
                        <div class="equipment-code">10000</div>
                      </el-col>
                      <el-col :span="12" class="img-col">
                        <MyQrcode text="标签模版样式1" class="erwm-img" :size="180" />
                      </el-col>
                    </div>
                  </div>
                  <div v-show="form.style===2" class="label-main">
                    <div class="label-top">
                      <el-col :span="12" class="img-col">
                        <MyQrcode text="标签模版样式2" class="erwm-img" :size="180" />
                      </el-col>
                      <el-col :span="12" class="content-col content-col-2">
                        <div class="equipment-code">10000</div>
                        <div class="equipment-name">设备名称</div>
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
import MyQrcode from '@/components/MyQrcode'
import api from '@/api'

export default {
  components: {
    myfilters,
    MyQrcode
  },
  props: {
    activeIndex: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      printShow: false,
      tableData: [],
      form: {},
      totalCount: 0,
      listLoading: true
    }
  },
  watch: {
    activeIndex: {
      handler(newValue, oldValue) {
        this.listLoading = true
        api.toconstantPage({ constantType: this.activeIndex }).then(response => {
        // console.log(response)
          this.totalCount = response.data.totalCount
          this.tableData = response.data.records
          this.listLoading = false
        })
      }
    }
  },
  created() {
    // this.conditions.constantType = this.$route.query.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.toconstantPage({ constantType: this.activeIndex }).then(response => {
        // console.log(response)
        this.totalCount = response.data.totalCount
        this.tableData = response.data.records
        this.listLoading = false
      })
    },
    // 标签打印点击
    print() {
      this.printShow = true
      this.form = {
        style: 1,
        code: []
      }
    },
    // 确定打印点击
    printSubmit() {
      if (this.form.code.length === 0) {
        this.$message({
          message: '请选择设备',
          type: 'warning'
        })
        return
      }
      const form = {
        style: this.form.style,
        code: []
      }
      this.form.code.forEach(element => {
        form.code.push({
          name: element.name,
          code: element.code,
          id: element.id
        })
      })
      // console.log(form)

      const routeUrl = this.$router.resolve({
        path: '/print/equipmentPrint',
        query: {
          title: '设备标签打印',
          data: JSON.stringify(form)
        }
      })
      window.open(routeUrl.href, '_blank')
      this.printShow = false
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
  height: 240px;
  border: 1px solid #ababab;
  .label-top {
    background-color: #fff;
    padding: 20px;
    height: 238px;
  }
  .erwm-img {
    padding: 10px;
    float: left;
    height: 200px;
    border: 1px solid rgba(155, 155, 155, 1);
  }
  .equipment-name {
    font-size: 24px;
    line-height: 31px;
    margin-bottom: 20px;
  }
  .equipment-code {
    font-size: 30px;
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
  .scrollbar{
    height:420px;
    background: #fff
  }
}
::v-deep .hidden-radio .el-checkbox__label {
  display: none;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
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
