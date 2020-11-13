<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      ref="myfilters"
      title="供货公司维护"
      :add-button="true"
      :search-content="true"
      placeholder="公司名称"
      @contentChange="contentChange"
      @addClick="addClick"
    />
    <!-- 头部end -->
    <!-- table -->
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
      <!-- 公司详细 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="拼音码">
              <span>{{ props.row.spellCode }}</span>
            </el-form-item>
            <el-form-item label="五笔码">
              <span>{{ props.row.strokeCode }}</span>
            </el-form-item>
            <el-form-item label="自定义码">
              <span>{{ props.row.customCode }}</span>
            </el-form-item>
            <el-form-item label="传真">
              <span>{{ props.row.fax }}</span>
            </el-form-item>
            <el-form-item label="公司网址">
              <span>{{ props.row.website }}</span>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <span>{{ props.row.companyEmail }}</span>
            </el-form-item>
            <el-form-item label="联系人邮箱">
              <span>{{ props.row.contactEmail }}</span>
            </el-form-item>
            <el-form-item label="ISO信息">
              <span>{{ props.row.isoMessage }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 公司详细end -->
      <el-table-column
        prop="name"
        label="公司名称"
      />
      <el-table-column
        label="公司类别"
      >
        <template slot-scope="scope">
          {{ ssd_company_type[scope.row.companyType] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="legalPerson"
        label="公司法人"
      />
      <el-table-column
        prop="companyTelephone"
        label="公司电话"
      />
      <el-table-column
        prop="companyAddress"
        label="公司地址"
      />
      <el-table-column
        prop="contact"
        label="联系人"
      />
      <el-table-column
        prop="depositBank"
        label="开户银行"
      />
      <el-table-column
        prop="accountNumber"
        label="开户账户"
      />
      <el-table-column
        prop="taxDeduction"
        label="政策扣税"
      />
      <el-table-column width="220">
        <template slot-scope="scope">
          <el-dropdown trigger="click" class="dropdown" style="margin-right:5px" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-button
                size="mini"
                icon="el-icon-tickets"
              >详细<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'licenseShow'
                }"
              >许可证</el-dropdown-item>
              <el-dropdown-item
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'contractShow'
                }"
              >合同</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown trigger="click" class="dropdown" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-button
                size="mini"
                icon="el-icon-s-tools"
              >操作
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                icon="el-icon-edit-outline"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleEdit'
                }"
              >编辑</el-dropdown-item>
              <el-dropdown-item
                class="error-color"
                icon="el-icon-delete"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleDelete'
                }"
              >删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <my-pagination :total="totalCount" methods="toCompanyPage" :conditions="conditions" />
    <!-- 公司编辑新增弹窗 -->
    <el-dialog v-el-drag-dialog title="供货公司" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="公司名称" prop="name">
                <el-input v-model="form.name" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="公司类别" prop="companyType">
                <el-select v-model="form.companyType" placeholder="">
                  <el-option
                    v-for="(val,key) in ssd_company_type"
                    :key="val"
                    :label="val"
                    :value="key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="公司电话" prop="companyTelephone">
                <el-input v-model="form.companyTelephone" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="公司地址" prop="companyAddress">
                <el-input v-model="form.companyAddress" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="开户银行" prop="depositBank">
                <el-input v-model="form.depositBank" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="开户账户" prop="accountNumber">
                <el-input v-model="form.accountNumber" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="公司法人" prop="legalPerson">
                <el-input v-model="form.legalPerson" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="联系人" prop="contact">
                <el-input v-model="form.contact" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="政策扣税" prop="taxDeduction">
                <el-input v-model="form.taxDeduction" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="联系人邮箱">
                <el-input v-model="form.contactEmail" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="拼音编码">
                <el-input v-model="form.spellCode" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="五笔编码">
                <el-input v-model="form.strokeCode" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="自定义编码">
                <el-input v-model="form.customCode" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="传真">
                <el-input v-model="form.fax" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="公司网址">
                <el-input v-model="form.website" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="公司邮箱">
                <el-input v-model="form.companyEmail" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="ISO信息">
                <el-input v-model="form.isoMessage" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="备注">
                <el-input v-model="form.remark" />
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
    <!-- 公司编辑新增弹窗end -->
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import myPagination from '@/components/MyPagination'
import api from '@/api'

export default {
  components: {
    myfilters, myPagination
  },
  data() {
    return {
      listLoading: true,
      rules: {
        name: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        accountNumber: [
          { required: true, message: '请输入开户账号', trigger: 'blur' }
        ],
        companyAddress: [
          { required: true, message: '请输入公司地址', trigger: 'blur' }
        ],
        companyTelephone: [
          { required: true, message: '请输入公司电话', trigger: 'blur' }
        ],
        companyType: [
          { required: true, message: '请输入公司类别', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        depositBank: [
          { required: true, message: '请输入开户银行', trigger: 'blur' }
        ],
        legalPerson: [
          { required: true, message: '请输入公司法人', trigger: 'blur' }
        ],
        taxDeduction: [
          { required: true, message: '请输入政策扣税', trigger: 'blur' }
        ]
      },
      show: false,
      edit: false,
      editIndex: 0,
      tableData: [],
      ssd_company_type: null,
      form: {},
      oldForm: null,
      totalCount: 0,
      conditions: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.toCompanyPage().then(response => {
        this.totalCount = response.data.totalCount
        this.ssd_company_type = response.data.dictData.ssd_company_type
        this.tableData = response.data.records
        this.listLoading = false
      })
    },
    // 新增按钮
    addClick() {
      this.edit = false
      this.form = {}
      this.show = true
    },
    // 新增弹窗确认
    addSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          api.toAddcompany(this.form).then(response => {
            if (response.code === '200' && response.data.busiCode === '1') {
              this.tableData.push(response.data)
              this.$message({
                message: '添加成功',
                type: 'success'
              })
            }
          })
          this.show = false
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    // 编辑弹窗确认
    editSubmit() {
      if (JSON.stringify(this.form) === JSON.stringify(this.oldForm)) {
        this.$message('无信息修改')
        this.show = false
        return
      }
      this.$refs.form.validate(async valid => {
        if (valid) {
          api.toRevisecompany(this.form).then(response => {
            // console.log(response)
            if (response.code === '200' && response.data.busiCode === '1') {
              this.tableData.splice(this.editIndex, 1, response.data)
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            }
          })
          this.show = false
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    // 操作
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    // 许可证
    licenseShow(index, row) {
      this.$router.push({
        name: 'license',
        query: {
          id: row.id
        }
      })
    },
    // 合同
    contractShow(index, row) {
      this.$router.push({
        name: 'contract',
        query: {
          id: row.id
        }
      })
    },
    // 删除
    handleDelete(index, row) {
      api.toDeletecompany(row).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.tableData.splice(index, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    // 编辑
    handleEdit(index, row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.oldForm = JSON.parse(JSON.stringify(row))
      this.edit = true
      this.editIndex = index
      this.show = true
    },
    contentChange(content) {
      this.$set(this.conditions, 'name', content)
      this.$set(this.conditions, 'pageNo', 1)
      this.listLoading = true
      api
        .toCompanyPage(this.conditions)
        .then(response => {
          // console.log(response)
          this.tableData = response.data.records
          this.totalCount = response.data.totalCount
          this.listLoading = false
        })
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .demo-table-expand .el-form-item__label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 25%;
}
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
</style>
