<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      ref="myfilters"
      title="供货公司维护"
      :add-button="true"
      addifo="新增"
      add-icon="el-icon-circle-plus-outline"
      @addClick="addClick"
    />
    <!-- 头部end -->
    <!-- table -->
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <!-- 公司详细 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="拼音码">
              <span>{{ props.row.pinyinCode }}</span>
            </el-form-item>
            <el-form-item label="五笔码">
              <span>{{ props.row.wubiCode }}</span>
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
              <span>{{ props.row.mailbox }}</span>
            </el-form-item>
            <el-form-item label="联系人邮箱">
              <span>{{ props.row.contactEmail }}</span>
            </el-form-item>
            <el-form-item label="ISO信息">
              <span>{{ props.row.iso }}</span>
            </el-form-item>
            <el-form-item label="政策扣税">
              <span>{{ props.row.deduction }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 公司详细end -->
      <el-table-column
        prop="Name"
        label="公司名称"
      />
      <el-table-column
        prop="category"
        label="公司法人"
      />
      <el-table-column
        prop="telephone"
        label="公司电话"
      />
      <el-table-column
        prop="address"
        label="公司地址"
      />
      <el-table-column
        prop="contact"
        label="联系人"
      />
      <el-table-column
        prop="account"
        label="开户银行"
      />
      <el-table-column
        prop="credit"
        label="开户账户"
      />
      <el-table-column
        prop="remark"
        label="备注"
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
    <!-- 头部end -->
    <!-- 公司编辑新增弹窗 -->
    <el-dialog v-el-drag-dialog title="供货公司" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="100px">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="公司名称">
                <el-input v-model="form.Name" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="拼音编码">
                <el-input v-model="form.pinyinCode" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="五笔编码">
                <el-input v-model="form.wubiCode" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="自定义编码">
                <el-input v-model="form.customCode" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="公司法人">
                <el-input v-model="form.category" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="公司电话">
                <el-input v-model="form.telephone" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="公司地址">
                <el-input v-model="form.address" />
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
                <el-input v-model="form.mailbox" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="联系人">
                <el-input v-model="form.contact" />
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
              <el-form-item label="ISO信息">
                <el-input v-model="form.iso" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="开户银行">
                <el-input v-model="form.account" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="开户账户">
                <el-input v-model="form.credit" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="政策扣税">
                <el-input v-model="form.deduction" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="space-between">
            <el-col :span="24">
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

export default {
  components: {
    myfilters
  },
  data() {
    return {
      tbox: true,
      cbox: false,
      lbox: false,
      show: false,
      edit: false,
      editIndex: 0,
      tableData: [
        {
          Name: '广州市穗丰日用品有限公司',
          pinyinCode: 'gzsdfryp',
          wubiCode: 'gzsdfryp ',
          customCode: 'gzsdfryp',
          category: '李晓彤',
          address: '广州市海珠区滨江中路89号1208',
          telephone: '85645342',
          fax: '85645342',
          website: 'www.suifen.cn',
          mailbox: 'admin@uifen.cn',
          contact: '郭彩霞',
          contactEmail: 'guocaixia@uifen.cn',
          iso: '2353259349058392878',
          account: '中国银行滨江中路支行',
          credit: '60034903403403434',
          deduction: '33%',
          remark: '穗丰的产品'
        },
        {
          Name: '广州市穗丰日用品有限公司',
          pinyinCode: 'gzsdfryp',
          wubiCode: 'gzsdfryp ',
          customCode: 'gzsdfryp',
          category: '李晓彤',
          address: '广州市海珠区滨江中路89号1208',
          telephone: '85645342',
          fax: '85645342',
          website: 'www.suifen.cn',
          mailbox: 'admin@uifen.cn',
          contact: '郭彩霞',
          contactEmail: 'guocaixia@uifen.cn',
          iso: '2353259349058392878',
          account: '中国银行滨江中路支行',
          credit: '60034903403403434',
          deduction: '33%',
          remark: '穗丰的产品'
        },
        {
          Name: '广州市穗丰日用品有限公司',
          pinyinCode: 'gzsdfryp',
          wubiCode: 'gzsdfryp ',
          customCode: 'gzsdfryp',
          category: '李晓彤',
          address: '广州市海珠区滨江中路89号1208',
          telephone: '85645342',
          fax: '85645342',
          website: 'www.suifen.cn',
          mailbox: 'admin@uifen.cn',
          contact: '郭彩霞',
          contactEmail: 'guocaixia@uifen.cn',
          iso: '2353259349058392878',
          account: '中国银行滨江中路支行',
          credit: '60034903403403434',
          deduction: '33%',
          remark: '穗丰的产品'
        }
      ],
      title: '',
      form: {
        pinyinCode: '',
        wubiCode: '',
        customCode: '',
        fax: '',
        website: '',
        mailbox: '',
        contactEmail: '',
        iso: '',
        deduction: '',
        Name: '',
        category: '',
        telephone: '',
        address: '',
        contact: '',
        account: '',
        credit: '',
        remark: ''
      },
      oldForm: null
    }
  },
  // created() {
  //   this.fetchData()
  // },
  methods: {
    // 新增按钮
    addClick() {
      this.edit = false
      this.form = {
        pinyinCode: '',
        wubiCode: '',
        customCode: '',
        fax: '',
        website: '',
        mailbox: '',
        contactEmail: '',
        iso: '',
        deduction: '',
        Name: '',
        category: '',
        telephone: '',
        address: '',
        contact: '',
        account: '',
        credit: '',
        remark: ''
      }
      this.show = true
    },
    // 新增弹窗确认
    addSubmit() {
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.tableData.push(this.form)
      this.show = false
    },
    // 编辑弹窗确认
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
    // 操作
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    // 许可证
    licenseShow(index, row) {
      this.title = row.Name + '许可证'
      this.$router.push({
        name: 'license',
        params: { title: this.title }
      })
    },
    // 合同
    contractShow(index, row) {
      this.title = row.Name + '合同'
      this.$router.push({
        name: 'contract',
        params: { title: this.title }
      })
    },
    // 删除
    handleDelete(index, row) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.tableData.splice(index, 1)
    },
    // 编辑
    handleEdit(index, row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.oldForm = JSON.parse(JSON.stringify(row))
      this.edit = true
      this.editIndex = index
      this.show = true
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
