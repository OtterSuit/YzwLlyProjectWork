<template>
  <div style="padding:30px;">
    <div class="leave-title">
      <span>请假申请</span>
    </div>
    <el-row>
      <el-col :span="20">
        <el-form ref="form" :model="form" :rules="rules" label-width="90px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="姓名">
                <el-input v-model="name" disabled>
                  <span slot="suffix">存假剩余:{{ leaveHours }}</span>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="开始时间" prop="startTime">
                <el-date-picker
                  v-model="form.startTime"
                  type="datetime"
                  :clearable="false"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="结束时间" prop="endTime">
                <el-date-picker
                  v-model="form.endTime"
                  type="datetime"
                  :clearable="false"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="请假时长" prop="leaveHours">
                <el-input v-model.number="form.leaveHours">
                  <span slot="suffix">小时</span>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="请假类型" prop="leaveType">
                <el-select v-model="form.leaveType" placeholder="">
                  <el-option
                    v-for="(val, key) in leaveType"
                    :key="val"
                    :label="val"
                    :value="+key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="请假事由" prop="leaveReason">
            <el-input v-model="form.leaveReason" type="textarea" />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div style="padding-left:90px">
      <el-button icon="el-icon-circle-check" type="primary" @click="onSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { leaveType } from '@/common/js/constants'
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (this.form.startTime && this.form.endTime) {
        const dis = this.time_dis(this.form.startTime, this.form.endTime)
        if (dis === false) {
          callback(new Error('开始时间必须小于结束时间!'))
        } else {
          this.form.leaveHours = +dis
          callback()
        }
      }
    }
    return {
      leaveType: leaveType,
      name: null,
      form: {
        startTime: '',
        endTime: '',
        leaveHours: '',
        leaveType: '',
        leaveReason: ''
      },
      rules: {
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'blur' },
          { validator: validatePass, trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'blur' },
          { validator: validatePass, trigger: 'change' }
        ],
        leaveHours: [
          { required: true, message: '请输入请假时长', trigger: 'change' },
          { type: 'number', message: '请假时长必须为数字值' }
        ],
        leaveType: [
          { required: true, message: '请选择请假类型', trigger: 'change' }
        ],
        leaveReason: [
          { required: true, message: '请输入请假理由', trigger: 'blur' }
        ]
      },
      leaveHours: '',
      buttonLoading: false
    }
  },
  created() {
    this.name = this.$store.getters.userInfo.name
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.getSavedHours().then(response => {
        if (response.success) {
          this.leaveHours = response.resData + '小时'
          console.log(response.resData)
        }
      })
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.buttonLoading = true
          api.postScheduleLeaves(this.form).then(response => {
            if (response.success) {
              this.buttonLoading = false
              this.$message({
                message: '提交成功',
                type: 'success'
              })
            }
          })
        }
      })
    },
    // 计算请假时长
    time_dis(startTime, endTime) {
      const dis = (Date.parse(endTime) - Date.parse(startTime)) / (60 * 60 * 1000)
      if (dis <= 0) return false
      return dis.toFixed(1)
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.el-input__suffix span {
  display: inline-block;
  text-align: center;
}
::v-deep .el-input__suffix {
  right: 10px;
  font-size: 12px;
}
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
.leave-title {
 height: 40px;
 line-height: 40px;
 font-size: 18px;
 margin-bottom: 20px;
}
</style>
