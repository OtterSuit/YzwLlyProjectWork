<template>
  <div class="apply-contaniner">
    <myfilters title="物品申领单" content="NO.0033124" :back-button="true" style="margin-bottom:20px">
      <template slot="extent">
        <el-button type="bgc" icon="el-icon-upload">模板管理</el-button>
      </template>
    </myfilters>
    <el-form ref="form" :model="form" label-width="70px">
      <div class="box">
        <el-row style="margin-bottom:16px">
          <span class="title">单类别</span>
        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item label="申请类别">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item label="是否加急" style="margin-bottom:0">
              <el-radio-group v-model="form.urgent">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="box">
        <el-row style="margin-bottom:16px">
          <span class="title">手术信息</span>
        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item label="病人姓名">
              <el-input
                v-model="form.patient"
                placeholder="请双击选择，或单击输入"
                @dblclick.native="patientClick"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item label="手术名称" style="margin-bottom:0">
              <el-input
                v-model="form.surgery"
                placeholder="请双击选择，或单击输入"
                @dblclick.native="surgeryClick"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="box">
        <el-row style="margin-bottom:6px">
          <myfilters
            ref="applyFilters"
            title="申领清单"
            add-icon="el-icon-circle-plus-outline"
            addifo="添加"
            placeholder="器械包名称/编号"
            :search-content="true"
            :add-button="true"
            @addClick="addClick"
          >
            <template slot="extent">
              <el-col :span="4">
                <el-input v-model="number" placeholder="数量" />
              </el-col>
            </template>
          </myfilters>
        </el-row>
        <el-table :data="form.applyData" style="width: 100%">
          <el-table-column label="序号" type="index" width="100" />
          <el-table-column prop="packageNum" label="编号" />
          <el-table-column prop="packageName" label="名称" />
          <el-table-column label="数量">
            <template slot-scope="scope">
              <div>
                <el-input v-model="scope.row.number" placeholder="请输入" />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot-scope="scope">
              <i
                class="el-icon-delete base-color delete-icon"
                @click="handleDelete(scope.$index,scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
    <div>
      <el-button type="primary" style="height:50px;width:140px" @click="onSubmit">提交申请</el-button>
      <div class="template-button">
        <i class="iconfont icon-baocun" />
        存为模板
      </div>
    </div>
    <el-dialog title="病人信息" :visible.sync="patientShow" width="95%">
      <div class="dialog-main">
        <div class="dialog-main-box">
          <el-input v-model="name" class="search-input" placeholder="病人姓名/住院号" />
          <el-button icon="el-icon-search" type="primary">搜索</el-button>
          <div style="height:410px">
            <el-table :data="patientData" style="width: 100%" class="hidden-table">
              <el-table-column label="选择" align="center" width="100" />
              <el-table-column label="住院号" />
              <el-table-column label="病人姓名" />
              <el-table-column label="诊断" />
            </el-table>
            <el-scrollbar style="height:360px;background: #fff">
              <el-table :data="patientData" style="width: 100%" :show-header="false">
                <el-table-column align="center" width="100">
                  <template slot-scope="scope">
                    <el-radio
                      v-model="patientName"
                      :label="scope.row.name"
                      class="hidden-radio"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="住院号" prop="hospitalNum" />
                <el-table-column label="病人姓名" prop="name" />
                <el-table-column label="诊断" prop="diagnosis" />
              </el-table>
            </el-scrollbar>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="patientSubmit">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog title="手术信息" :visible.sync="surgeryShow" width="95%">
      <div class="dialog-main">
        <div class="dialog-main-box">
          <el-input v-model="name" class="search-input" placeholder="手术名称/编号" />
          <el-button icon="el-icon-search" type="primary">搜索</el-button>
          <div style="height:410px">
            <el-table :data="surgeryData" style="width: 100%" class="hidden-table">
              <el-table-column label="选择" align="center" width="100" />
              <el-table-column label="手术名称" />
              <el-table-column label="手术编号" />
            </el-table>
            <el-scrollbar style="height:360px;background: #fff">
              <el-table :data="surgeryData" style="width: 100%" :show-header="false">
                <el-table-column align="center" width="100">
                  <template slot-scope="scope">
                    <el-radio
                      v-model="surgeryName"
                      :label="scope.row.name"
                      class="hidden-radio"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="手术名称" prop="name" />
                <el-table-column label="手术编号" prop="surgeryNum" />
              </el-table>
            </el-scrollbar>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="surgerySubmit">确认</el-button>
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
      form: {
        type: '器械包申请',
        urgent: '0',
        patient: '',
        surgery: '',
        applyData: []
      },
      number: '',
      typeOptions: [
        {
          value: '器械包申请',
          label: '器械包申请'
        },
        {
          value: '一次性物品申领',
          label: '一次性物品申领'
        },
        {
          value: '器械包换物申请',
          label: '器械包换物申请'
        },
        {
          value: '消毒物品申请',
          label: '消毒物品申请'
        },
        {
          value: '外来器械包申请',
          label: '外来器械包申请'
        },
        {
          value: '自定义器械包申请',
          label: '自定义器械包申请'
        }
      ],
      patientData: [
        {
          hospitalNum: '146975',
          name: '王亚飞',
          diagnosis: '冠心病'
        },
        {
          hospitalNum: '463178',
          name: '陈娜',
          diagnosis: '糖尿病'
        },
        {
          hospitalNum: '974354',
          name: '吕军',
          diagnosis: '慢性支气管炎'
        },
        {
          hospitalNum: '694357',
          name: '马桂英',
          diagnosis: '肠梗阻'
        },
        {
          hospitalNum: '147652',
          name: '田秀兰',
          diagnosis: '肺癌'
        }
      ],
      patientShow: false,
      name: '',
      patientName: '',
      surgeryShow: false,
      surgeryName: '',
      surgeryData: [
        {
          name: '阑尾切除术',
          surgeryNum: '1354'
        },
        {
          name: '胆囊切除术',
          surgeryNum: '4697'
        },
        {
          name: '胃切除术',
          surgeryNum: '9746'
        },
        {
          name: '幽门成形术',
          surgeryNum: '3459'
        },
        {
          name: '关节固定术',
          surgeryNum: '7563'
        },
        {
          name: '骨瘤切除术',
          surgeryNum: '4698'
        },
        {
          name: '筋膜切开术',
          surgeryNum: '3469'
        }
      ]
    }
  },
  methods: {
    addClick() {
      const name = this.$refs.applyFilters.select.content
      if (name === '') {
        this.$message({
          message: '请输入器械包名称或编号',
          type: 'warning'
        })
        return
      }
      if (this.number === '') {
        this.$message({
          message: '请输入数量',
          type: 'warning'
        })
        return
      }
      const applyObj = {
        packageNum: name,
        packageName: name,
        number: this.number
      }
      this.form.applyData.push(applyObj)
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.number = ''
      this.$refs.applyFilters.select.content = ''
    },
    handleDelete(index, row) {
      this.form.applyData.splice(index, 1)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    onSubmit() {
      this.$message({
        message: '提交申请成功',
        type: 'success'
      })
      this.$router.back(-1)
    },
    patientClick() {
      this.patientShow = true
    },
    patientSubmit() {
      if (this.patientName === '') {
        this.$message({
          message: '请选择病人',
          type: 'warning'
        })
        return
      }
      this.form.patient = this.patientName
      this.patientShow = false
    },
    surgeryClick() {
      this.surgeryShow = true
    },
    surgerySubmit() {
      if (this.surgeryName === '') {
        this.$message({
          message: '请选择手术',
          type: 'warning'
        })
        return
      }
      this.form.surgery = this.surgeryName
      this.surgeryShow = false
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.apply-contaniner {
  padding: 30px 20px;
  background-color: #f0f2f5;
}
::v-deep .box {
  background: rgba(255, 255, 255, 1);
  box-shadow: 4px 4px 40px 0px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 20px 30px;
  margin-bottom: 20px;
  position: relative;
  .title {
    font-size: 18px;
    color: rgba(153, 153, 153, 1);
    line-height: 24px;
  }
}
::v-deep .el-form-item__label {
  font-weight: normal;
  text-align: left;
}
.delete-icon {
  font-size: 24px;
  cursor: pointer;
  margin-right: 20px;
}
.template-button {
  display: inline-block;
  color: #409eff;
  margin-left: 50px;
  transform: translateY(15px);
  cursor: pointer;
}
.dialog-main-box {
  position: relative;
  height: 500px;
  background: rgba(246, 246, 246, 1);
  border: 1px dotted rgba(175, 179, 192, 1);
  padding: 20px 25px;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
::v-deep .hidden-table .el-table__body-wrapper {
  display: none;
}
::v-deep .hidden-radio .el-radio__label {
  display: none;
}
.dialog-main {
  padding: 20px;
}
.search-input {
  width: 25%;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
