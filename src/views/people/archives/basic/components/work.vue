<template>
  <div>
    <mybox class="work" :edit-box-show="true" title="在职信息" @editClick="editClick('jobInformation')">
      <el-row>
        <el-col>
          <el-row class="row">
            <el-col :span="6">
              <span class="label">工号</span>
              <span class="content">{{ data.jobNum }}</span>
            </el-col>
            <el-col :span="6">
              <span class="label">职务</span>
              <span class="content">{{ handleJobPost(data.jobPost) }}</span>
            </el-col>
            <el-col :span="6">
              <span class="label">用工形式</span>
              <span class="content">{{ handleHireWay(data.hireWay) }}</span>
            </el-col>
            <el-col :span="6">
              <span class="label">入职时间</span>
              <span class="content">{{ data.entryTime }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span class="label">病区</span>
              <span class="content">{{ data.ward }}</span>
            </el-col>
            <el-col :span="6">
              <span class="label">职称</span>
              <span class="content">{{ handleJobTitleType(data.jobTitleType) }}</span>
            </el-col>
            <el-col :span="6">
              <span class="label">职员类型</span>
              <span class="content">{{ handleUserType(data.userType) }}</span>
            </el-col>
            <el-col :span="6">
              <span class="label">工龄</span>
              <span class="content">{{ data.workYear }}年</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </mybox>

    <el-form ref="workInfo" :model="info" label-width="80px">
      <el-dialog title="在职信息" :visible.sync="jobInformation" width="800px">
        <div class="dialog-main">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="工号">
                <el-input v-model="info.jobNum" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="职务">
                <el-select v-model="info.jobPost" placeholder>
                  <el-option label="护士" :value="1" />
                  <el-option label="护士长" :value="2" />
                  <el-option label="护理部主任" :value="3" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="用工形式">
                <el-select v-model="info.hireWay" placeholder>
                  <el-option label="合同" :value="1" />
                  <el-option label="临时工" :value="2" />
                  <el-option label="非全日制用工" :value="3" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="入职时间">
                <el-date-picker
                  v-model="info.entryTime"
                  :clearable="false"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="病区">
                <el-input v-model="info.ward" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="职称">
                <el-select v-model="info.jobTitleType" placeholder>
                  <el-option label="护理（士）" :value="1" />
                  <el-option label="护理（师）" :value="2" />
                  <el-option label="主管护理（师）" :value="3" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="职员类型">
                <el-select v-model="info.userType" placeholder>
                  <el-option label="在职人员" :value="1" />
                  <el-option label="实习生" :value="2" />
                  <el-option label="进修生" :value="3" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="工龄">
                <el-input v-model="info.workYear">
                  <span slot="suffix">年</span>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="jobInformation=false">取消</el-button>
          <el-button type="primary" @click="editSubmit('jobInformation')">保存修改</el-button>
        </div>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import Mybox from '@/components/Mybox'
import { jobPost, jobTitleType, hireWay, userType } from '@/common/js/constants'
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
      jobInformation: false,
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
      this.$parent.editSubmit(Info, 4)
    },
    // 处理职位
    handleJobPost(v) {
      return jobPost[v]
    },
    // 处理职称
    handleJobTitleType(v) {
      return jobTitleType[v]
    },
    // 处理用过形式
    handleHireWay(v) {
      return hireWay[v]
    },
    handleUserType(v) {
      return userType[v]
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
</style>
