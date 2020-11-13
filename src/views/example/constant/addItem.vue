<template>
  <div class="add-wrap">
    <div class="dialog-main">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-row type="flex" justify="space-between">
          <el-col :span="11">
            <el-form-item label="编号" prop="num">
              <el-input v-model="form.num" />
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
            <el-form-item label="有效性" prop="validFlag">
              <el-radio-group v-model="form.validFlag">
                <el-radio
                  v-for="(val, key) in ssdCommonBoolean"
                  :key="val"
                  :label="+key"
                >{{ val }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="11">
            <el-form-item label="拼音码">
              <el-input v-model="form.spellCode" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="五笔码">
              <el-input v-model="form.strokeCode" />
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
    },
    ssdCommonBoolean: {
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
        num: [
          { required: true, message: '请输入编号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        validFlag: [
          { required: true, message: '请选择有效性', trigger: 'blur' }
        ]
      },
      form: {},
      oldForm: {}
    }
  },
  computed: {},
  watch: {
    curForm: {
      deep: true,
      handler(val) {
        this.form = JSON.parse(JSON.stringify(val))
        this.oldForm = JSON.parse(JSON.stringify(val))
      }
    }
  },
  created() {},
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.curForm))
    this.oldForm = JSON.parse(JSON.stringify(this.curForm))
  },
  methods: {
    // 添加确认
    addSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
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
      if (JSON.stringify(this.form) === JSON.stringify(this.oldForm)) {
        this.$message('无信息修改')
        this.$parent.$parent.show = false
        return
      }
      this.$refs.form.validate(async valid => {
        if (valid) {
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
