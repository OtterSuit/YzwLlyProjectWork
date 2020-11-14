<template>
  <div style="padding:30px;">
    <myfilters
      ref="myfilters"
      title="护理敏感指标数据统计表"
      :add-button="true"
      :choose-date="true"
      date-type="month"
      @addClick="addClick"
    >
      <template slot="titleExtent">
        <div class="urfto" @click="toOther('https://www.wjx.cn/jq/83923041.aspx')">省级、国家级护理质量数据平台上报网站 </div>
      </template>
    </myfilters>
    <el-table
      :data="tableData"
      style="width: 100%"
      :cell-style="tableStyle"
      :header-cell-style="tableStyle"
      border
    >
      <el-table-column
        prop="classifyt"
        label="科室"
        width="100"
        fixed
      />
      <el-table-column
        prop="collectively"
        width="100"
      >
        <template slot="header">
          住院患者<br>总床位数
        </template>
      </el-table-column>
      <el-table-column
        prop="actualBed"
        width="100"
      >
        <template slot="header">
          实际开放<br>床位数
        </template>
      </el-table-column>
      <el-table-column
        label="护士总数"
        prop="totalNurses"
        width="100"
      />
      <el-table-column
        label="床护比"
        prop="bedCare"
        width="100"
      />
      <el-table-column label="护患比">
        <el-table-column
          prop="dayCare"
          width="100"
        >
          <template slot="header">
            白班<br>护患比
          </template>
        </el-table-column>
        <el-table-column
          prop="smallNight"
          width="100"
        >
          <template slot="header">
            小夜班<br>护患比
          </template>
        </el-table-column>
        <el-table-column
          prop="bigNight"
          width="100"
        >
          <template slot="header">
            大夜班<br>护患比
          </template>
        </el-table-column>
        <el-table-column
          prop="allDay"
          width="100"
        >
          <template slot="header">
            每天平均<br>护患比
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="护理时数">
        <el-table-column
          prop="accumulativeCare"
          width="100"
        >
          <template slot="header">
            累计护理<br>时数/小时
          </template>
        </el-table-column>
        <el-table-column
          prop="everyDay"
          width="100"
        >
          <template slot="header">
            每住院患者<br>24小时平均<br>护理时数
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="管道">
        <el-table-column
          prop="pipelineOff"
          width="100"
        >
          <template slot="header">
            管道脱落<br>例次数
          </template>
        </el-table-column>
        <el-table-column
          prop="pipelineRetention"
          width="100"
        >
          <template slot="header">
            管道留置<br>总日数
          </template>
        </el-table-column>
        <el-table-column
          prop="unplannedExtubation"
          width="100"
        >
          <template slot="header">
            非计划<br>拔管率‰
          </template>
        </el-table-column>
        <el-table-column
          prop="indwellingCatheter"
          width="100"
        >
          <template slot="header">
            留置尿管<br>发生感染<br>例次数
          </template>
        </el-table-column>
        <el-table-column
          prop="urinaryCatheterDays"
          width="100"
        >
          <template slot="header">
            尿管留置<br>总日数
          </template>
        </el-table-column>
        <el-table-column
          prop="urinaryCatheterInfection"
          width="100"
        >
          <template slot="header">
            导尿管相关<br>尿路感染<br>发生率‰
          </template>
        </el-table-column>
        <el-table-column
          prop="CVCRelatedInfections"
          width="100"
        >
          <template slot="header">
            CVC<br>相关感染<br>发生例次数
          </template>
        </el-table-column>
        <el-table-column
          prop="CVCRelatedBlood"
          width="110"
        >
          <template slot="header">
            CVC<br>相关血液<br>感染发生率‰
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="约束">
        <el-table-column
          prop="patientRestraintDays"
          width="110"
        >
          <template slot="header">
            住院患者<br>身体约束日数
          </template>
        </el-table-column>
        <el-table-column
          prop="physicalRestraintRate"
          width="110"
        >
          <template slot="header">
            住院患者<br>身体约束率%
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="跌倒">
        <el-table-column
          label="跌倒发生例次数"
          prop="numberFalls"
          width="100"
        >
          <template slot="header">
            跌倒发生<br>例次数
          </template>
        </el-table-column>
        <el-table-column
          prop="hospitalizedPatients"
          width="110"
        >
          <template slot="header">
            住院患者<br>跌倒发生率‰
          </template>
        </el-table-column>
        <el-table-column
          prop="numberInjuries"
          width="100"
        >
          <template slot="header">
            跌倒发生<br>伤害次数
          </template>
        </el-table-column>
        <el-table-column
          prop="fallInjuryRate"
          width="110"
        >
          <template slot="header">
            住院患者<br>跌倒伤害率%
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="压力性损伤">
        <el-table-column
          prop="pressureInjuriesOne"
          width="110"
        >
          <template slot="header">
            院内压力性<br>损伤发生例数
          </template>
        </el-table-column>
        <el-table-column
          prop="pressureHospital"
          width="110"
        >
          <template slot="header">
            住院患者<br>院内压力性<br>损伤发生率%
          </template>
        </el-table-column>
        <el-table-column
          prop="patientTwohospitalized"
          width="110"
        >

          <template slot="header">
            住院患者<br>2期及以上<br>院内压力性<br>损伤发生率%
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="离职">
        <el-table-column
          label="离职人数"
          prop="departuresPeo"
          width="100"
        />
        <el-table-column
          label="护士离职率%"
          prop="departuresNurse"
          width="110"
        />
      </el-table-column>
      <el-table-column width="200">
        <template slot-scope="scope">
          <el-button
            slot="reference"
            size="mini"
            icon="el-icon-edit-outline"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-popconfirm
            icon-color="red"
            title="确认删除吗"
            @onConfirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button
              slot="reference"
              size="mini"
              icon="el-icon-delete"
            >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="敏感指标统计" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="0px">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="科室">
                <el-input v-model="form.classifyt" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="住院患者总床位数">
                <el-input v-model="form.collectively" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="实际开放床位数">
                <el-input v-model="form.actualBed" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="护士总数">
                <el-input v-model="form.totalNurses" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="床护比">
                <el-input v-model="form.bedCare" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="白班护患比">
                <el-input v-model="form.dayCare" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="小夜班护患比">
                <el-input v-model="form.smallNight" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="大夜班护患比">
                <el-input v-model="form.bigNight" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="每天平均护患比">
                <el-input v-model="form.allDay" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="累计护理时数">
                <el-input v-model="form.accumulativeCare">
                  <span slot="suffix">小时</span>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="每住院患者24小时平均护理时数">
                <el-input v-model="form.everyDay" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="管道脱落例次数">
                <el-input v-model="form.pipelineOff" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="管道留置总日数">
                <el-input v-model="form.pipelineRetention" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="非计划拔管率">
                <el-input v-model="form.unplannedExtubation">
                  <span slot="suffix">‰</span>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="留置尿管发生感染例次数">
                <el-input v-model="form.indwellingCatheter" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="尿管留置总日数">
                <el-input v-model="form.urinaryCatheterDays" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="导尿管相关尿路感染发生率">
                <el-input v-model="form.urinaryCatheterInfection">
                  <span slot="suffix">‰</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="CVC相关感染发生例次数">
                <el-input v-model="form.CVCRelatedInfections" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="CVC相关血液感染发生率">
                <el-input v-model="form.CVCRelatedBlood">
                  <span slot="suffix">‰</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="住院患者身体约束日数">
                <el-input v-model="form.patientRestraintDays" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="住院患者身体约束率">
                <el-input v-model="form.physicalRestraintRate">
                  <span slot="suffix">%</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="跌倒发生例次数">
                <el-input v-model="form.numberFalls" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="住院患者跌倒发生率">
                <el-input v-model="form.hospitalizedPatients">
                  <span slot="suffix">‰</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="跌倒发生伤害次数">
                <el-input v-model="form.numberInjuries" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="住院患者跌倒伤害率">
                <el-input v-model="form.fallInjuryRate">
                  <span slot="suffix">%</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="院内压力性损伤发生例数">
                <el-input v-model="form.pressureInjuriesOne" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="住院患者院内压力性损伤发生率">
                <el-input v-model="form.pressureHospital">
                  <span slot="suffix">%</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="住院患者2期及以上院内压力性损伤发生率">
                <el-input v-model="form.patientTwohospitalized">
                  <span slot="suffix">%</span>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="离职人数">
                <el-input v-model="form.departuresPeo" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="护士离职率">
                <el-input v-model="form.departuresNurse">
                  <span slot="suffix">%</span>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-show="!edit" type="primary" @click="addSubmit">确认</el-button>
        <el-button v-show="edit" type="primary" @click="editSubmit">确认</el-button>
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
      show: false,
      edit: false,
      editIndex: 0,
      tableData: [
        {
          classifyt: '外科',
          collectively: '50',
          actualBed: '48',
          totalNurses: '23',
          bedCare: '1:0.3',
          dayCare: '1:3',
          smallNight: '1:10',
          bigNight: '1:15',
          allDay: '1:8',
          accumulativeCare: '380',
          everyDay: '9',
          pipelineOff: '50',
          pipelineRetention: '102',
          unplannedExtubation: '31',
          indwellingCatheter: '6',
          urinaryCatheterDays: '99',
          urinaryCatheterInfection: '32',
          CVCRelatedInfections: '11',
          CVCRelatedBlood: '12',
          patientRestraintDays: '356',
          physicalRestraintRate: '24',
          numberFalls: '55',
          hospitalizedPatients: '34',
          numberInjuries: '65',
          fallInjuryRate: '24',
          pressureInjuriesOne: '76',
          pressureHospital: '18',
          patientTwohospitalized: '15',
          departuresPeo: '3',
          departuresNurse: '10'
        }, {
          classifyt: '内科',
          collectively: '50',
          actualBed: '48',
          totalNurses: '23',
          bedCare: '1:0.3',
          dayCare: '1:3',
          smallNight: '1:10',
          bigNight: '1:15',
          allDay: '1:8',
          accumulativeCare: '380',
          everyDay: '9',
          pipelineOff: '50',
          pipelineRetention: '102',
          unplannedExtubation: '31',
          indwellingCatheter: '6',
          urinaryCatheterDays: '99',
          urinaryCatheterInfection: '32',
          CVCRelatedInfections: '11',
          CVCRelatedBlood: '12',
          patientRestraintDays: '356',
          physicalRestraintRate: '24',
          numberFalls: '55',
          hospitalizedPatients: '34',
          numberInjuries: '65',
          fallInjuryRate: '24',
          pressureInjuriesOne: '76',
          pressureHospital: '18',
          patientTwohospitalized: '15',
          departuresPeo: '3',
          departuresNurse: '10'
        }, {
          classifyt: '儿科',
          collectively: '50',
          actualBed: '48',
          totalNurses: '23',
          bedCare: '1:0.3',
          dayCare: '1:3',
          smallNight: '1:10',
          bigNight: '1:15',
          allDay: '1:8',
          accumulativeCare: '380',
          everyDay: '9',
          pipelineOff: '50',
          pipelineRetention: '102',
          unplannedExtubation: '31',
          indwellingCatheter: '6',
          urinaryCatheterDays: '99',
          urinaryCatheterInfection: '32',
          CVCRelatedInfections: '11',
          CVCRelatedBlood: '12',
          patientRestraintDays: '356',
          physicalRestraintRate: '24',
          numberFalls: '55',
          hospitalizedPatients: '34',
          numberInjuries: '65',
          fallInjuryRate: '24',
          pressureInjuriesOne: '76',
          pressureHospital: '18',
          patientTwohospitalized: '15',
          departuresPeo: '3',
          departuresNurse: '10'
        }
      ],
      form: {
        classifyt: '',
        collectively: '',
        actualBed: '',
        totalNurses: '',
        bedCare: '',
        dayCare: '',
        smallNight: '',
        bigNight: '',
        allDay: '',
        accumulativeCare: '',
        everyDay: '',
        pipelineOff: '',
        pipelineRetention: '',
        unplannedExtubation: '',
        indwellingCatheter: '',
        urinaryCatheterDays: '',
        urinaryCatheterInfection: '',
        CVCRelatedInfections: '',
        CVCRelatedBlood: '',
        patientRestraintDays: '',
        physicalRestraintRate: '',
        numberFalls: '',
        hospitalizedPatients: '',
        numberInjuries: '',
        fallInjuryRate: '',
        pressureInjuriesOne: '',
        pressureHospital: '',
        patientTwohospitalized: '',
        departuresPeo: '',
        departuresNurse: ''
      },
      oldForm: null
    }
  },
  // created() {
  //   this.fetchData()
  // },
  methods: {
    addClick() {
      this.edit = false
      this.form = {
        classifyt: '',
        collectively: '',
        actualBed: '',
        totalNurses: '',
        bedCare: '',
        dayCare: '',
        smallNight: '',
        bigNight: '',
        allDay: '',
        accumulativeCare: '',
        everyDay: '',
        pipelineOff: '',
        pipelineRetention: '',
        unplannedExtubation: '',
        indwellingCatheter: '',
        urinaryCatheterDays: '',
        urinaryCatheterInfection: '',
        CVCRelatedInfections: '',
        CVCRelatedBlood: '',
        patientRestraintDays: '',
        physicalRestraintRate: '',
        numberFalls: '',
        hospitalizedPatients: '',
        numberInjuries: '',
        fallInjuryRate: '',
        pressureInjuriesOne: '',
        pressureHospital: '',
        patientTwohospitalized: '',
        departuresPeo: '',
        departuresNurse: ''
      }
      this.show = true
    },
    addSubmit() {
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.tableData.push(this.form)
      this.show = false
    },
    editSubmit() {
      this.show = false
      if (JSON.stringify(this.form) === JSON.stringify(this.oldForm)) {
        this.$message('无信息修改')
        return
      }
      this.$message({
        message: '修改成功',
        type: 'success'
      })
      this.tableData.splice(this.editIndex, 1, this.form)
    },
    handleEdit(index, row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.oldForm = JSON.parse(JSON.stringify(row))
      this.edit = true
      this.editIndex = index
      this.show = true
    },
    handleDelete(index, row) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.tableData.splice(index, 1)
    },
    tableStyle() {
      return {
        textAlign: 'center'
      }
    },
    // 跳转国家级护理质量数据平台上报网站
    toOther(url) {
      window.location.href = url
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .el-input__suffix {
  right: 10px;
  color: #aaa;
}
.el-input__suffix span {
  display: inline-block;
  text-align: center;
  font-size: 12px;
}
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
::v-deep .el-form-item__label {
    display: contents !important;
    float: none !important;
}
.urfto{
  display: inline;
  left: 210px;
  top: 2px;
  position: absolute;
  text-decoration:underline;
  color: #409EFF;
  cursor: pointer;
  z-index: 9;
}
</style>
