<template>
  <div class="add-wrap">
    <div class="dialog-main">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="患者姓名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="包条码" prop="barCode">
              <el-input v-model="form.barCode" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item v-if="page === 'outpatient'" label="唯一号" prop="unique">
              <el-input v-model="form.unique" />
            </el-form-item>
            <el-form-item v-if="page === 'hospitalized'" label="住院号" prop="inHospitalNo">
              <el-input v-model="form.inHospitalNo" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="门诊科室" prop="department">
              <el-input v-model="form.department" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="使用时间" prop="useTime">
              <!-- <el-input v-model="form.useTime" /> -->
              <el-date-picker
                v-model="form.useTime"
                format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="医生" prop="doctor">
              <el-input v-model="form.doctor" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="执行护士" prop="executeNurse">
              <el-input v-model="form.executeNurse" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="复查护士" prop="reviewNurse">
              <el-input v-model="form.reviewNurse" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="手术间" prop="operateRoom">
              <el-input v-model="form.operateRoom" />
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
    page: {
      type: String,
      default: 'outpatient' // outpatient是门诊，hospitalized是住院
    }
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        barCode: [
          { required: true, message: '请输入包条码', trigger: 'blur' }
        ],
        unique: [
          { required: true, message: '请输入唯一号', trigger: 'blur' }
        ],
        inHospitalNo: [
          { required: true, message: '请输入住院号', trigger: 'blur' }
        ]
      },
      form: {
        name: '',
        barCode: '',
        department: '',
        unique: '',
        useTime: '',
        doctor: '',
        executeNurse: '',
        reviewNurse: '',
        operateRoom: '',
        inHospitalNo: ''
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
</style>
