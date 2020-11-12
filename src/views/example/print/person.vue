<template>
  <div>
    <!-- 头部 -->
    <myfilters
      title="人员标签"
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
              <div class="person-name">人员名称</div>
              <div class="person-code">0123</div>
              <div class="person-department">科室名称</div>
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
          <div class="label-top label-top-right">
            <el-col :span="12" class="img-col">
              <img :src="erwmURL" class="erwm-img">
            </el-col>
            <el-col :span="12" class="content-col content-col-2">
              <div class="person-name">人员名称</div>
              <div class="person-code">0123</div>
              <div class="person-department">科室名称</div>
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
              <div class="box-title">请选择人员</div>
              <div style="height:470px">
                <el-table :data="tableData" style="width: 100%" class="hidden-table">
                  <el-table-column label="选择" align="center" width="100" />
                  <el-table-column label="人员姓名" width="200" />
                  <el-table-column label="科室名称" />
                </el-table>
                <el-scrollbar style="height:420px;background: #fff">
                  <el-table :data="tableData" style="width: 100%" :show-header="false">
                    <el-table-column align="center" width="100">
                      <template slot-scope="scope">
                        <el-checkbox
                          v-model="name"
                          :label="scope.row.code"
                          class="hidden-radio"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" width="200" />
                    <el-table-column prop="department" />
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
                        <div class="person-name">{{ form.name }}</div>
                        <div class="person-code">{{ form.code }}</div>
                        <div class="person-department">{{ form.department }}</div>
                      </el-col>
                      <el-col :span="12" class="img-col">
                        <img :src="erwmURL" class="erwm-img">
                      </el-col>
                    </div>
                  </div>
                  <div v-show="form.style==='模板样式2'" class="label-main">
                    <div class="label-top label-top-right">
                      <el-col :span="12" class="img-col">
                        <img :src="erwmURL" class="erwm-img">
                      </el-col>
                      <el-col :span="12" class="content-col content-col-2">
                        <div class="person-name">{{ form.name }}</div>
                        <div class="person-code">{{ form.code }}</div>
                        <div class="person-department">{{ form.department }}</div>
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
          name: '赵美丽',
          department: '内科'
        },
        {
          code: '10002',
          name: '李文利',
          department: '内科'
        },
        {
          code: '10003',
          name: '肖泽彬',
          department: '内科'
        },
        {
          code: '10004',
          name: '王子豪',
          department: '内科'
        },
        {
          code: '10005',
          name: '郑嘉璇',
          department: '内科'
        },
        {
          code: '10006',
          name: '黄豫',
          department: '内科'
        }
      ],
      name: [],
      form: {}
    }
  },
  methods: {
    print() {
      this.printShow = true
      this.form = {
        style: '模板样式1',
        code: '10001',
        name: '赵美丽',
        department: '内科'
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
  .label-top-right {
    padding-right: 0;
  }
  .erwm-img {
    width: 196px;
    border: 1px solid #9b9b9b;
  }
  .person-name {
    font-size: 36px;
    line-height: 47px;
    margin-bottom: 20px;
  }
  .person-code {
    font-size: 40px;
    line-height: 52px;
    margin-bottom: 20px;
  }
  .person-department {
    font-size: 24px;
    line-height: 31px;
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
::v-deep .hidden-radio .el-checkbox__label {
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
