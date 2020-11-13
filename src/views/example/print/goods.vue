<template>
  <div>
    <!-- 头部 -->
    <myfilters
      title="无菌物品标签"
      :print-button="true"
      @printClick="print"
    />
    <!-- 头部end -->
    <el-alert :closable="false" type="warning" show-icon class="alert-margin">
      <template slot="title">
        <span>标签纸类型：PET不干胶标签纸(中)</span>
        <span style="margin-left:20px">尺寸：60mmx50mm</span>
      </template>
    </el-alert>
    <el-row>
      <div class="label-col">
        <div class="label-title">
          <div>封包标签模版样式1</div>
        </div>
        <div class="label-main">
          <div class="label-top">
            <el-col :span="12">
              <div class="packet-name">包名称</div>
              <div class="packet-code">10000</div>
            </el-col>
            <el-col :span="12" class="img-col">
              <img :src="erwmURL" class="erwm-img">
            </el-col>
          </div>
          <div class="label-bottom">
            <div class="packet-bottom">封包人： 示例姓名</div>
            <div class="packet-bottom">封包日期： 2020.01.01</div>
          </div>
        </div>
      </div>
      <div class="label-col">
        <div class="label-title">
          <div>封包标签模版样式2</div>
        </div>
        <div class="label-main">
          <div class="label-top">
            <el-col :span="12" class="img-col">
              <img :src="erwmURL" class="erwm-img">
            </el-col>
            <el-col :span="12">
              <div class="packet-name">包名称</div>
              <div class="packet-code">10000</div>
            </el-col>
          </div>
          <div class="label-bottom">
            <div class="packet-bottom">封包人： 示例姓名</div>
            <div class="packet-bottom">封包日期： 2020.01.01</div>
          </div>
        </div>
      </div>
    </el-row>
    <el-row>
      <div class="label-col">
        <div class="label-title">
          <div>灭菌标签模版样式1</div>
        </div>
        <div class="label-main">
          <div class="label-top">
            <el-col :span="12">
              <div class="sterilization-name">灭菌有效天数</div>
              <div class="sterilization-daysNum">
                <span class="daysNum">30</span>
                <span class="daysUnit">天</span>
              </div>
              <div class="sterilization-date">失效日期：2020.02.02</div>
              <div class="sterilization-date">灭菌日期：2020.03.01</div>
            </el-col>
            <el-col :span="12" class="img-col">
              <img :src="erwmURL" class="erwm-img">
            </el-col>
          </div>
          <div class="label-bottom">
            <div class="sterilization-bottom-top">灭菌设备000</div>
            <div class="sterilization-bottom-bottom">
              <span>炉次：00</span>
              <span class="span-right">灭菌人：示例姓名</span>
            </div>
          </div>
        </div>
      </div>
    </el-row>
    <el-dialog title="无菌物品标签打印" :visible.sync="printShow" width="95%">
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
                <el-scrollbar class="scrollbar">
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
                    <el-form-item label="打印数量">
                      <el-input-number
                        v-model="form.num"
                        controls-position="right"
                        :min="1"
                      />
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
                      <el-col :span="12">
                        <div class="packet-name">{{ form.packageName }}</div>
                        <div class="packet-code">{{ form.packageNum }}</div>
                      </el-col>
                      <el-col :span="12" class="img-col">
                        <img :src="erwmURL" class="erwm-img">
                      </el-col>
                    </div>
                    <div class="label-bottom">
                      <div class="packet-bottom">封包人： {{ form.auditPerson }}</div>
                      <div class="packet-bottom">封包日期： {{ form.auditTime }}</div>
                    </div>
                  </div>
                  <div v-show="form.style==='模板样式2'" class="label-main">
                    <div class="label-top">
                      <el-col :span="12" class="img-col">
                        <img :src="erwmURL" class="erwm-img">
                      </el-col>
                      <el-col :span="12">
                        <div class="packet-name">{{ form.packageName }}</div>
                        <div class="packet-code">{{ form.packageNum }}</div>
                      </el-col>
                    </div>
                    <div class="label-bottom">
                      <div class="packet-bottom">封包人： {{ form.auditPerson }}</div>
                      <div class="packet-bottom">封包日期： {{ form.auditTime }}</div>
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
      tableData: [
        {
          packageNum: '1001',
          packageName: '糖足包',
          number: 12,
          auditPerson: '赵美丽',
          auditTime: '2020.08.10'
        },
        {
          packageNum: '10003',
          packageName: '脐穿包',
          number: 16,
          auditPerson: '赵美丽',
          auditTime: '2020.08.10'
        },
        {
          packageNum: '10004',
          packageName: '神一脑室引流包',
          number: 6,
          auditPerson: '赵美丽',
          auditTime: '2020.08.10'
        },
        {
          packageNum: '10005',
          packageName: '血透室缝合包',
          number: 10,
          auditPerson: '赵美丽',
          auditTime: '2020.08.10'
        },
        {
          packageNum: '20010',
          packageName: '外来器械包',
          number: 1,
          auditPerson: '赵美丽',
          auditTime: '2020.08.10'
        }
      ],
      form: {},
      printShow: false,
      packageName: '1001',
      erwmURL: require('../../../assets/images/erwm.png')
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
            this.form.auditPerson = element.auditPerson
            this.form.auditTime = element.auditTime
          }
        })
      }
    }
  },
  methods: {
    print() {
      this.printShow = true
      this.form = {
        style: '模板样式1',
        num: this.tableData[0].number,
        packageName: this.tableData[0].packageName,
        packageNum: this.tableData[0].packageNum,
        auditPerson: this.tableData[0].auditPerson,
        auditTime: this.tableData[0].auditTime
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
  height: 100%;
}
.label-main {
  width: 472px;
  height: 394px;
  border: 1px solid #ababab;
  .label-top {
    background-color: #fff;
    padding: 20px;
    height: 247px;
  }
  .label-bottom {
    height: 145px;
    padding: 20px;
    background-color: #f6f6f6;
  }
  .erwm-img {
    height: 200px;
    border: 1px solid #9b9b9b;
  }
  .packet-name {
    font-size: 30px;
    line-height: 40px;
    margin-bottom: 20px;
  }
  .packet-code {
    font-size: 50px;
    line-height: 66px;
  }
  .packet-bottom {
    font-size: 30px;
    color: #666;
    line-height: 42px;
    margin-bottom: 10px;
  }
  .sterilization-name {
    font-size: 20px;
    line-height: 26px;
    margin-bottom: 6px;
  }
  .sterilization-daysNum {
    .daysNum {
      font-size: 80px;
      line-height: 106px;
    }
    .daysUnit {
      font-size: 30px;
      margin-left: 10px;
      line-height: 40px;
    }
  }
  .sterilization-date {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 6px;
  }
  .sterilization-bottom-top {
    font-size: 30px;
    line-height: 42px;
    margin-bottom: 10px;
  }
  .sterilization-bottom-bottom {
    font-size: 26px;
    color: #666666;
    line-height: 42px;
    .span-right {
      float: right;
    }
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
::v-deep .hidden-radio .el-radio__label {
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
