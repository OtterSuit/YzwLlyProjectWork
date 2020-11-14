<template>
  <div class="step1-container">
    <div class="add-title">
      <span>第一步：问卷设置</span>
    </div>
    <el-row>
      <el-col :span="20">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="问卷名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入问卷名称" />
          </el-form-item>
          <el-form-item label="问卷说明" prop="explanation">
            <el-input
              v-model="form.explanation"
              type="textarea"
              resize="none"
              :autosize="{ minRows: 10}"
              placeholder="请输入问卷说明"
            />
          </el-form-item>
          <el-form-item label="调查对象" prop="targetType">
            <el-radio-group v-model="form.targetType">
              <el-radio
                v-for="(val, key) in satisfaction"
                :key="val"
                :label="+key"
              >{{ val }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="form.targetType===1" label="患者情况">
            <el-checkbox-group v-model="form.patientSituation">
              <el-checkbox
                v-for="(val, key) in patientSituation"
                :key="val"
                :label="+key"
              >{{ val }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div class="add-button">
          <el-button type="primary" @click="twoShow">下一步</el-button>
          <el-button @click="onCancel">取消</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { satisfaction, patientSituation } from '@/common/js/constants'
export default {
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入问卷名称', trigger: 'blur' }
        ],
        explanation: [
          { required: true, message: '请输入问卷说明', trigger: 'blur' }
        ],
        targetType: [
          { required: true, message: '请选择调查对象', trigger: 'blur' }
        ]
      },
      form: {
        name: '医院医疗服务满意度调查',
        explanation: `尊敬的患者朋友：
      为提高医院的医疗服务质量，营造更好的就医环境，我们敬请您利用几分钟时间填写本问卷的每一个问题。请您根据亲身感受，对您接触的医护人员的服务进行评价。如果您不方便，可由您的亲友或监护人协助您填写本问卷。本问卷采取不记名方式，对您的个人资料绝对保密，敬请放心做答。
      敬祝您早日康复！感谢您的支持！`,
        targetType: 1,
        patientSituation: [1, 2],
        questions: []
      },
      satisfaction: satisfaction,
      patientSituation: patientSituation
    }
  },
  created() {
    if (localStorage.getItem('satisfaction')) {
      this.form = JSON.parse(localStorage.getItem('satisfaction'))
    }
  },
  methods: {
    onCancel() {
      this.$router.push({
        name: 'Questionnaire'
      })
    },
    twoShow() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.patientSituation.sort((m, n) => {
            return m - n
          })
          localStorage.setItem('satisfaction', JSON.stringify(this.form))
          // console.log(this.form)
          this.$router.push({
            name: 'step2'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.step1-container {
  padding: 30px;
}
.add-title {
 height: 40px;
 line-height: 40px;
 font-size: 18px;
 margin-bottom: 20px;
}
.add-button {
  padding-left: 80px;
}
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
  color: #666;
}
::v-deep .el-radio__input.is-checked+.el-radio__label {
  color: #666;
}
</style>
