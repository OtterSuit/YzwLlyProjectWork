<template>
  <div style="padding:30px">
    <myfilters
      title="器械管理"
      :content="content"
      :instorage-button="true"
      :outbound-button="true"
      :choose-status="true"
      :status-options="statusOptions"
      :search-content="true"
      placeholder="器械编号/名称"
      @outboundClick="outboundClick"
      @instorageClick="instorageClick"
      @statusChange="statusChange"
      @contentChange="contentChange"
    />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column label="编号" prop="code" />
      <el-table-column label="类别" prop="type" />
      <el-table-column label="名称" prop="name" />
      <el-table-column label="总数量" prop="total" />
      <el-table-column label="库存" prop="inventory" />
      <el-table-column label="出库" prop="outbound" />
      <el-table-column>
        <template slot-scope="scope">
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
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleDetails'
                }"
              >查看详细</el-dropdown-item>
              <el-dropdown-item
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleInstorage'
                }"
              >入库</el-dropdown-item>
              <el-dropdown-item
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleOutbound'
                }"
              >出库</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-el-drag-dialog title="出库" :visible.sync="outboundShow" width="600px">
      <div class="dialog-main">
        <el-form ref="outbound" :model="outbound" label-width="70px" :rules="rules">
          <el-row v-if="edit">
            <div class="dialog-name">{{ outbound.name }}</div>
            <div class="dialog-code">{{ outbound.code }}</div>
          </el-row>
          <el-row v-if="!edit" style="margin-top:10px">
            <el-col :span="22" :offset="1">
              <el-form-item label="器械名称" prop="name">
                <el-input v-model="outbound.name" placeholder="请输入" />
              </el-form-item>
            </el-col>
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
          <el-row v-if="edit">
            <div class="dialog-name">{{ instorage.name }}</div>
            <div class="dialog-code">{{ instorage.code }}</div>
          </el-row>
          <el-row v-if="!edit" style="margin-top:10px">
            <el-col :span="22" :offset="1">
              <el-form-item label="器械名称" prop="name">
                <el-input v-model="instorage.name" placeholder="请输入" />
              </el-form-item>
            </el-col>
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

export default {
  components: {
    myfilters
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入器械名称', trigger: 'blur' }
        ],
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
      outbound: {},
      instorageShow: false,
      instorage: {},
      edit: false,
      row: null,
      tableData: [
        {
          code: '10001',
          type: '常规器械',
          name: '有齿镊',
          total: 500,
          inventory: 120,
          outbound: 380
        },
        {
          code: '10001',
          type: '常规器械',
          name: '有齿镊',
          total: 500,
          inventory: 120,
          outbound: 380
        },
        {
          code: '10001',
          type: '专科器械',
          name: '五官小直剪',
          total: 500,
          inventory: 120,
          outbound: 380
        },
        {
          code: '10001',
          type: '一次性物资',
          name: '纱球',
          total: 5000,
          inventory: 4000,
          outbound: 1000
        }
      ],
      statusOptions: [
        {
          value: '全部类别',
          label: '全部类别'
        },
        {
          value: '常规器械',
          label: '常规器械'
        },
        {
          value: '专科器械',
          label: '专科器械'
        },
        {
          value: '一次性物资',
          label: '一次性物资'
        }
      ]
    }
  },
  computed: {
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  methods: {
    outboundClick() {
      this.edit = false
      this.outboundShow = true
      this.outbound = {
        name: '',
        outboundNum: '',
        logo: ''
      }
    },
    outboundSubmit() {
      this.$refs.outbound.validate((valid) => {
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
      this.edit = false
      this.instorageShow = true
      this.instorage = {
        name: '',
        instorageNum: ''
      }
    },
    instorageSubmit() {
      this.$refs.instorage.validate((valid) => {
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
    },
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    handleDetails(index, row) {
      this.$router.push({
        name: 'equipmentDetail',
        params: { title: row.name }
      })
    },
    handleInstorage(index, row) {
      this.edit = true
      this.row = row
      this.instorageShow = true
      this.instorage = {
        code: row.code,
        name: row.name,
        instorageNum: ''
      }
    },
    handleOutbound(index, row) {
      this.edit = true
      this.row = row
      this.outboundShow = true
      this.outbound = {
        code: row.code,
        name: row.name,
        outboundNum: '',
        logo: ''
      }
    },
    statusChange(status) {
      console.log(status)
    },
    contentChange(content) {
      console.log(content)
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
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
