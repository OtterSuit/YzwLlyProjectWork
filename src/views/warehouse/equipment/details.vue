<template>
  <div class="details-container">
    <myfilters
      :title="title"
      :back-button="true"
      :instorage-button="true"
      :outbound-button="true"
      @outboundClick="outboundClick"
      @instorageClick="instorageClick"
    />
    <el-collapse v-model="activeCollapse">
      <el-collapse-item title="基本信息" name="基本信息" class="top-box">
        <el-row type="flex" justify="space-between">
          <el-col :span="5" class="userImgBox">
            <img src="@/assets/images/jiazi.png" class="details-img">
          </el-col>
          <el-col :span="20">
            <el-row class="row">
              <el-col :span="6">
                <span class="label">物品名称</span>
                <span class="content">{{ form.name }}</span>
              </el-col>
              <el-col :span="6">
                <span class="label">拼音编码</span>
                <span class="content">{{ form.spellCode }}</span>
              </el-col>
              <el-col :span="6">
                <span class="label">五笔编码</span>
                <span class="content">{{ form.wubingWriting }}</span>
              </el-col>
              <el-col :span="6">
                <span class="label">自定义码</span>
                <span class="content">{{ form.customCode }}</span>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="6">
                <span class="label">物品别名</span>
                <span class="content">{{ form.alias }}</span>
              </el-col>
              <el-col :span="6">
                <span class="label">拼音编码</span>
                <span class="content">{{ form.aliasSpellCode }}</span>
              </el-col>
              <el-col :span="6">
                <span class="label">五笔编码</span>
                <span class="content">{{ form.aliasStrokeCode }}</span>
              </el-col>
              <el-col :span="6">
                <span class="label">自定义码</span>
                <span class="content">{{ form.aliasCustomCode }}</span>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="6">
                <span class="label">物品规格</span>
                <span class="content">{{ form.spec }}</span>
              </el-col>
              <el-col :span="6">
                <span class="label">包装单位</span>
                <span class="content">{{ form.largePackUnit }}</span>
              </el-col>
              <el-col :span="6">
                <span class="label">零售单价</span>
                <span class="content">{{ form.retailUnitPrice }}</span>
              </el-col>
              <el-col :span="6">
                <span class="label">国标码</span>
                <span class="content">{{ form.countryCode }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <span class="label">最小单位</span>
                <span class="content">{{ form.miniUnit }}</span>
              </el-col>
              <el-col :span="6">
                <span class="label">包装数量</span>
                <span class="content">{{ form.packageNum }}</span>
              </el-col>
              <el-col :span="6">
                <span class="label">大包装价</span>
                <span class="content">{{ form.rargePackage }}</span>
              </el-col>
              <el-col :span="6">
                <span class="label">最新进价</span>
                <span class="content">{{ form.newestUnitPrice }}</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="分类信息" name="分类信息" class="other-box">
        <el-row class="row">
          <el-col :span="5">
            <span class="label">物品分类</span>
            <span class="content">{{ form.classification }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">所属库房</span>
            <span class="content">{{ form.supplyCompany }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">库存数量</span>
            <span class="content">{{ form.inventory }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">打包标识</span>
            <span class="content">{{ form.packFlag }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">财务收费</span>
            <span class="content">{{ form.financialChargeFlag }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <span class="label">有效范围</span>
            <span class="content">{{ form.effctiveRange }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">费用类别</span>
            <span class="content">{{ form.costCategories }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">特列类别</span>
            <span class="content">{{ form.specialCategory }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">耗材标识</span>
            <span class="content">{{ form.materialIdentification }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">财务审核</span>
            <span class="content">{{ form.financialAuditFlag }}</span>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="出/入库信息" name="出/入库信息" class="other-box">
        <el-tabs v-model="activeTabs" @tab-click="tabClick">
          <el-tab-pane label="全部" name="all" />
          <el-tab-pane label="出库" name="outbound" />
          <el-tab-pane label="入库" name="instorage" />
        </el-tabs>
        <el-table ref="table" v-loading="listLoading" :data="tableData" style="width: 100%">
          <el-table-column label="序号" type="index" width="100" />
          <el-table-column label="出/入库" prop="inAndOut" />
          <el-table-column label="数量" prop="number" />
          <el-table-column label="操作人" prop="operator" />
          <el-table-column label="操作时间" prop="saveDate" />
          <el-table-column label="操作标识" prop="identification" />
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="厂商信息" name="厂商信息" class="other-box">
        <el-row>
          <el-col :span="5">
            <span class="label">生产厂商</span>
            <span class="content">{{ form.manufacturer }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">到期日期</span>
            <span class="content">{{ form.expireDate }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">注册日期</span>
            <span class="content">{{ form.registerDate }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">注册号</span>
            <span class="content">{{ form.registerNumber }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">厂商标识</span>
            <span class="content">{{ form.Identification }}</span>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="供货公司" name="供货公司" class="other-box">
        <el-row class="row">
          <el-col :span="5">
            <span class="label">公司名称</span>
            <span class="content">{{ form.Name }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">公司编码</span>
            <span class="content">{{ form.Code }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">拼音编码</span>
            <span class="content">{{ form.pinyinCode }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">五笔编码</span>
            <span class="content">{{ form.wubiCode }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">自定义码</span>
            <span class="content">{{ form.customCode }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <span class="label">公司法人</span>
            <span class="content">{{ form.category }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">公司电话</span>
            <span class="content">{{ form.telephone }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">公司邮箱</span>
            <span class="content">{{ form.mailbox }}</span>
          </el-col>
          <el-col :span="10">
            <span class="label">公司地址</span>
            <span class="content">{{ form.address }}</span>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="合同信息" name="合同信息" class="other-box">
        <el-row class="row">
          <el-col :span="5">
            <span class="label">合同编号</span>
            <span class="content">{{ form.Code }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">签订日期</span>
            <span class="content">{{ form.signDate }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">操作员</span>
            <span class="content">{{ form.operator }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">操作日期</span>
            <span class="content">{{ form.saveDate }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">合同状态</span>
            <span class="content">{{ form.status }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <span class="label">合同类别</span>
            <span class="content">{{ form.Type }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">到期日期</span>
            <span class="content">{{ form.expireDate }}</span>
          </el-col>
          <el-col :span="10">
            <span class="label">公司名称</span>
            <span class="content">{{ form.Name }}</span>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <el-dialog v-el-drag-dialog title="出库" :visible.sync="outboundShow" width="600px">
      <div class="dialog-main">
        <el-form ref="outbound" :model="outbound" label-width="70px" :rules="rules">
          <el-row>
            <div class="dialog-name">{{ outbound.name }}</div>
            <div class="dialog-code">{{ outbound.code }}</div>
          </el-row>
          <el-row>
            <el-col :span="22" :offset="1">
              <el-form-item label="出库数量" prop="outboundNum">
                <el-input v-model.number="outbound.outboundNum" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22" :offset="1">
              <el-form-item label="出库标识" prop="logo">
                <el-select v-model="outbound.logo" placeholder="请选择">
                  <el-option label="配包" value="配包" />
                  <el-option label="过期" value="过期" />
                  <el-option label="损坏" value="损坏" />
                  <el-option label="丢失" value="丢失" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="outboundShow=false">取消</el-button>
        <el-button type="primary" @click="outboundSubmit">确定出库</el-button>
      </div>
    </el-dialog>
    <el-dialog v-el-drag-dialog title="入库" :visible.sync="instorageShow" width="600px">
      <div class="dialog-main">
        <el-form ref="instorage" :model="instorage" label-width="70px" :rules="rules">
          <el-row>
            <div class="dialog-name">{{ instorage.name }}</div>
            <div class="dialog-code">{{ instorage.code }}</div>
          </el-row>
          <el-row>
            <el-col :span="22" :offset="1">
              <el-form-item label="入库数量" prop="instorageNum">
                <el-input v-model.number="instorage.instorageNum" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="instorageShow=false">取消</el-button>
        <el-button type="primary" @click="instorageSubmit">确定入库</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import api from '@/api'
export default {
  components: {
    myfilters
  },
  data() {
    return {
      listLoading: true,
      rules: {
        outboundNum: [
          { required: true, message: '请输入出库数量', trigger: 'blur' },
          { type: 'number', message: '出库数量必须为数字值' }
        ],
        logo: [
          { required: true, message: '请选择出库标识', trigger: 'blur' }
        ],
        instorageNum: [
          { required: true, message: '请输入入库数量', trigger: 'blur' },
          { type: 'number', message: '入库数量必须为数字值' }
        ]
      },
      outboundShow: false,
      outbound: {
        code: '10001',
        name: '有齿镊',
        outboundNum: '',
        logo: ''
      },
      instorageShow: false,
      instorage: {},
      form: {/*
        base: {
          itemName: '有齿镊',
          pinyinWriting: 'YCN',
          wubingWriting: 'EHQ',
          customCode: 'YCN',
          alias: '镊子',
          aliaspinyinCode: 'NZ',
          aliasWubiCode: 'QB',
          aliasCustomCode: 'QB',
          standard: '135mm',
          unit: '包',
          retailPrice: '0.0000',
          countryCode: '0000',
          smallestUnit: '个',
          packageNum: '100',
          rargePackage: '0.0000',
          unitPrice: '0.0000'
        },
        classification: {
          classification: '常规器械',
          warehouse: '消毒供应室',
          inventory: '500',
          packageLogo: '打包',
          financeCharges: '是',
          effectiveRange: '本科室',
          costCategories: '默认',
          specialCategories: '无',
          materialIdentification: '常用',
          financialAudit: '是'
        },
        tableData: [
          {
            inAndOut: '入库',
            number: '1000',
            operator: '张美美',
            saveDate: '2020.08.10 09:32:41',
            identification: '申购入库'
          },
          {
            inAndOut: '出库',
            number: '500',
            operator: '张美美',
            saveDate: '2020.08.10 09:32:41',
            identification: '配包'
          },
          {
            inAndOut: '出库',
            number: '500',
            operator: '张美美',
            saveDate: '2020.08.10 09:32:41',
            identification: '配包'
          },
          {
            inAndOut: '入库',
            number: '1000',
            operator: '张美美',
            saveDate: '2020.08.10 09:32:41',
            identification: '申购入库'
          }
        ],
        vendor: {
          vendorName: '慧扬建康科技有限公司',
          dueDate: '2020年08月10日',
          registrationDate: '2020年08月10日',
          registrationCode: '暂无',
          Identification: '默认'
        },
        company: {
          companyName: '慧扬建康科技有限公司',
          companyCode: 'HY23232315',
          pinyinCode: 'HYJK',
          wubiCode: 'DDRR',
          customCode: 'AFAEFW',
          category: '慧扬健康',
          telephone: '020-82511729',
          mailbox: 'HY@wisefly.cn',
          address: '广州市黄埔区茅岗路鱼珠智谷C03'
        },
        contract: {
          contractCode: 'HT98234782312',
          signDate: '2020年08月10日',
          operator: '张美美',
          saveDate: '2020年08月10日',
          status: '未到期',
          contractType: '销售合同',
          expireDate: '2030年08月09日',
          companyName: '慧扬健康科技有限公司'
        } */
      },
      tableData: [
        /* {
          inAndOut: '入库',
          number: '1000',
          operator: '张美美',
          saveDate: '2020.08.10 09:32:41',
          identification: '申购入库'
        },
        {
          inAndOut: '出库',
          number: '500',
          operator: '张美美',
          saveDate: '2020.08.10 09:32:41',
          identification: '配包'
        },
        {
          inAndOut: '出库',
          number: '500',
          operator: '张美美',
          saveDate: '2020.08.10 09:32:41',
          identification: '配包'
        },
        {
          inAndOut: '入库',
          number: '1000',
          operator: '张美美',
          saveDate: '2020.08.10 09:32:41',
          identification: '申购入库'
        } */
      ],
      title: '',
      activeTabs: 'all',
      activeCollapse: ['基本信息', '分类信息', '出/入库信息']
    }
  },
  created() {
    this.title = this.$route.params.title
    this.fetchData()
  },
  methods: {
    // 获取物资
    fetchData() {
      this.listLoading = true
      api.toGetsupplies({ id: '745969622049619968' }).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          this.form = response.data
        }
        console.log(response)
      })
      this.listLoading = false
    },
    tabClick() {
      if (this.activeTabs === 'all') {
        this.tableData = this.form.tableData
        return
      }
      const obj = {
        outbound: '出库',
        instorage: '入库'
      }
      const arr = []
      this.form.tableData.forEach(v => {
        if (v.inAndOut === obj[this.activeTabs]) {
          arr.push(v)
        }
      })
      this.tableData = arr
    },
    outboundClick() {
      this.outboundShow = true
      this.outbound = {
        code: '10001',
        name: '有齿镊',
        outboundNum: '',
        logo: ''
      }
    },
    outboundSubmit() {
      this.$refs.outbound.validate(async valid => {
        if (valid) {
          this.$message({
            message: '出库成功',
            type: 'success'
          })
          this.outboundShow = false
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    instorageClick() {
      this.instorageShow = true
      this.instorage = {
        code: '10001',
        name: '有齿镊',
        outboundNum: '',
        logo: ''
      }
    },
    instorageSubmit() {
      this.$refs.instorage.validate(async valid => {
        if (valid) {
          this.$message({
            message: '入库成功',
            type: 'success'
          })
          this.instorageShow = false
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.details-container {
  padding: 30px;
  background-color:#F0F2F5;
  min-height: calc(100vh - 50px);
}
::v-deep .el-collapse-item {
  background:rgba(255,255,255,1);
  box-shadow:4px 4px 40px 0px rgba(0,0,0,0.05);
  border-radius:6px;
  padding: 20px 30px;
  margin-bottom: 20px;
  position: relative;
  .el-collapse-item__header {
    font-size:18px;
    color:rgba(153,153,153,1);
    line-height:24px;
    height: 24px;
    border-bottom: 0;
  }
  .el-collapse-item__arrow {
    position: absolute;
    top: 26px;
    left: 10px;
    font-size: 14px;
    transform: rotate(-90deg);
  }
  .el-collapse-item__arrow.is-active {
    transform: rotate(90deg);
  }
  .el-collapse-item__wrap {
    border-bottom: 0;
  }
  .el-collapse-item__content {
    padding: 16px 0 10px;
  }

}
::v-deep {
  .el-tabs__nav-wrap::after,
  .el-tabs__active-bar {
    display: none;
  }
  .el-tabs__item {
    padding: 0 10px;
    line-height: 28px;
    color: #999;
  }
  .el-tabs{
    position: absolute;
    top: 20px;
    left: 167px;
  }
  .el-tabs__item.is-active {
    color: #409EFF;
  }
}
.label {
  font-size:14px;
  display: inline-block;
  width: 60px;
  text-align: end;
  margin-right: 10px;
  color:rgba(158,174,195,1);
}
.content {
  font-size:14px;
}
.row {
  margin-bottom: 20px;
}
.details-img {
  height: 150px;
  border-radius:10px;
}
::v-deep .top-box{
  .el-col-5 {
    width: 20%;
  }
  .el-col-20 {
    width: 80%;
  }
}
::v-deep .other-box {
  .el-col-5 {
    width: 20%;
  }
  .el-col-10 {
    width: 40%;
  }
}
::v-deep .el-form-item__label {
  // text-align: left;
  font-weight: normal;
}
.dialog-main {
  height: 280px;
  padding-top: 38px;
  padding-bottom: 0;
}
::v-deep .el-form-item {
  margin-bottom: 25px;
}
.dialog-name {
  font-size:24px;
  line-height:31px;
  text-align: center;
}
.dialog-code {
  text-align: center;
  margin-top: 11px;
  margin-bottom: 38px;
  font-size:14px;
  color:rgba(153,153,153,1);
  line-height:19px;
}
::v-deep .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before,
::v-deep .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
  display: none;
}
</style>
