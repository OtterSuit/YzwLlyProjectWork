<template>
  <div>
    <mybox class="credit" :edit-box-show="true" title="学分卡信息" @editClick="editClick('creditCard')">
      <el-row>
        <el-col>
          <el-row>
            <el-col :span="6">
              <span class="label">卡号</span>
              <span class="content">{{ data.cardNumber }}</span>
            </el-col>
            <el-col :span="6">
              <span class="label">已有学分</span>
              <span class="content">{{ data.credits }}</span>
            </el-col>
            <el-col :span="6">
              <span class="label">年度差额</span>
              <span class="content">{{ data.annualBalance }}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </mybox>

    <el-form ref="creditInfo" :model="info" label-width="80px">
      <el-dialog title="学分卡信息" :visible.sync="creditCard" width="800px">
        <div class="dialog-main">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="卡号">
                <el-input v-model="info.cardNumber" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="已有学分">
                <el-input v-model="info.credits" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="年度差额">
                <el-input v-model="info.annualBalance" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="creditCard=false">取消</el-button>
          <el-button type="primary" @click="editSubmit('creditCard')">保存修改</el-button>
        </div>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import Mybox from '@/components/Mybox'
export default {
  components: {
    Mybox
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      creditCard: false,
      info: {
        cardNumber: '',
        ICnum: '',
        existingNum: '',
        balance: ''
      }
    }
  },
  methods: {
    // 修改按钮点击
    editClick(Info) {
      this.info = JSON.parse(JSON.stringify(this.data))
      this[Info] = true
    },
    // 修改弹窗确认按钮
    editSubmit(Info) {
      this.$parent.editSubmit(Info, 9)
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
</style>
