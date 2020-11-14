<template>
  <div>
    <mybox class="urgency" :edit-box-show="true" title="紧急联系人" @editClick="editClick('emergencyContact')">
      <el-row>
        <el-col>
          <el-row>
            <el-col :span="6">
              <span class="label">紧急联系</span>
              <span class="content">{{ data.contacts }}</span>
            </el-col>
            <el-col :span="6">
              <span class="label">关系</span>
              <span class="content">{{ data.contactsRelation }}</span>
            </el-col>
            <el-col :span="6">
              <span class="label">联系电话</span>
              <span class="content">{{ data.contactsPhone }}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </mybox>

    <el-form ref="urgencyInfo" :model="info" label-width="80px">
      <el-dialog title="紧急联系人" :visible.sync="emergencyContact" width="800px">
        <div class="dialog-main">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="紧急联系">
                <el-input v-model="info.contacts" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="关系">
                <el-input v-model="info.contactsRelation" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="联系电话">
                <el-input v-model="info.contactsPhone" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="emergencyContact=false">取消</el-button>
          <el-button type="primary" @click="editSubmit('emergencyContact')">保存修改</el-button>
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
      emergencyContact: false,
      info: {}
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
      this.$parent.editSubmit(Info, 3)
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
</style>
