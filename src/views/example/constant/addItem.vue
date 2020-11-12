<template>
  <div class="add-wrap">
    <div class="dialog-main">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-row type="flex" justify="space-between">
          <el-col :span="11">
            <el-form-item label="编号" prop="No">
              <el-input v-model="form.No" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="编码" prop="code">
              <el-input v-model="form.code" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="11">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="有效性" prop="effective">
              <el-radio-group v-model="form.effective">
                <el-radio :label="true">有效</el-radio>
                <el-radio :label="false">无效</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="11">
            <el-form-item label="拼音码">
              <el-input v-model="form.pinyinCode" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="五笔码">
              <el-input v-model="form.wubingCode" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="11">
            <el-form-item label="自定义码">
              <el-input v-model="form.customCode" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="备注" prop="remark">
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
  </div>
</template>

<script>

export default {
  name: '',
  components: {},
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    curForm: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        No: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ]
      },
      form: {
        name: '',
        No: '',
        effective: true,
        useTime: '',
        remark: '',
        // pinyinCode: '',
        code: ''
      }
    }
  },
  computed: {},
  watch: {
    curForm: {
      deep: true,
      handler(val) {
        this.form = val
      }
    }
  },
  created() {},
  mounted() { this.form = this.curForm },
  methods: {
    // 添加确认
    addSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.$emit('addItem', this.form)
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    // 编辑确认
    editSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$emit('editItem', this.form)
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
<style lang='scss' scoped>
::v-deep .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before,
::v-deep  .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
  display: none;
}
.dialog-footer {
  background-color: #e9e9e9;
    height: 60px;
    padding: 10px 20px;
    border-radius: 0 0 20px 20px;
    box-shadow: 0px -1px 0px 0px #e9e9e9;
    .el-button {
      float: right;
    }
}
</style>
