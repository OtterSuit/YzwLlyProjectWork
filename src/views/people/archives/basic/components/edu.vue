<template>
  <div>
    <mybox
      class="edu"
      :edit-box-show="true"
      title="教育经历"
      edit-box-content="增加"
      edit-box-icon="el-icon-circle-plus-outline"
      @editClick="addClick('educationExperience')"
    >
      <el-row>
        <el-col>
          <div v-for="(item,index) in data" :key="item.key+'educationExperience'+index" class="rowbgc">
            <div class="tools">
              <i class="el-icon-s-tools toolsIcon" />
              <div class="settingBox">
                <div class="settingBox-inner" @click="editArrayClick('educationExperience', index)">
                  <i class="el-icon-edit-outline" />
                  <span class="setting-content">修改</span>
                </div>
                <div class="settingBox-inner" @click="deleteClick('educationExperience', item.id)">
                  <i class="el-icon-delete" />
                  <span class="setting-content">删除</span>
                </div>
              </div>
            </div>
            <el-row>
              <el-col :span="9">
                <span class="label">学校名称</span>
                <span class="content">{{ item.schoolName }}</span>
              </el-col>
              <el-col :span="6">
                <span class="label">专业</span>
                <span class="content">{{ item.major }}</span>
              </el-col>
              <el-col :span="6">
                <span class="label">学历</span>
                <span class="content">{{ handleDegree(item.degree) }}</span>
              </el-col>
              <el-col :span="3">
                <div v-if="item.isHighest" class="eduIcon">
                  <i class="el-icon-success" />
                  <span>最高学历</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9">
                <span class="label">起始时间</span>
                <span class="content">{{ item.startTime }} 至 {{ item.endTime }}</span>
              </el-col>
              <el-col :span="6">
                <span class="label">学制</span>
                <span class="content">{{ handleSchoolSys(item.schoolSys) }}</span>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </mybox>

    <el-form ref="eduInfo" :model="info" label-width="80px">
      <el-dialog title="教育经历" :visible.sync="educationExperience" width="800px">
        <div class="dialog-main">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="学校名称">
                <el-input v-model="info.schoolName" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="学历">
                <el-select v-model="info.degree" placeholder>
                  <el-option label="博士" :value="1" />
                  <el-option label="硕士" :value="2" />
                  <el-option label="本科" :value="4" />
                  <el-option label="专科" :value="5" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="专业">
                <el-input v-model="info.major" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="学制">
                <el-select v-model="info.schoolSys" placeholder>
                  <el-option label="全日制" :value="1" />
                  <el-option label="专升本" :value="2" />
                  <el-option label="自考" :value="3" />
                  <el-option label="网络教育" :value="4" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="起始时间">
                <el-row type="flex" justify="space-between">
                  <el-col :span="11">
                    <el-date-picker
                      v-model="info.startTime"
                      :clearable="false"
                      value-format="yyyy-MM-dd"
                    />
                  </el-col>
                  <el-col :span="2">
                    <div class="time-middle">至</div>
                  </el-col>
                  <el-col :span="11">
                    <el-date-picker
                      v-model="info.endTime"
                      :clearable="false"
                      value-format="yyyy-MM-dd"
                    />
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="是否为最高学历" label-width="120px">
                <el-radio-group v-model="info.isHighest">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="educationExperience=false">取消</el-button>
          <el-button v-show="edit" type="primary" @click="editArraySubmit('educationExperience')">保存修改</el-button>
          <el-button v-show="!edit" type="primary" @click="addSubmit('educationExperience')">确认新增</el-button>
        </div>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import Mybox from '@/components/Mybox'
import { schoolSys, degree } from '@/common/js/constants'
export default {
  components: {
    Mybox
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      edit: false,
      editIndex: 0,
      educationExperience: false,
      info: {
        schoolName: '',
        career: '',
        education: '',
        enrollment: '',
        leaveTime: '',
        systme: '',
        ifHeight: ''
      },
      eduOld: {
        schoolName: '',
        career: '',
        education: '',
        enrollment: '',
        leaveTime: '',
        systme: '',
        ifHeight: ''
      }
    }
  },
  methods: {
    // 增加按钮点击
    addClick(Info) {
      this.edit = false
      this.info = JSON.parse(JSON.stringify(this.eduOld))
      this[Info] = true
    },
    // 新增弹窗确认按钮
    addSubmit(Info) {
      this.$parent.addSubmit(Info, 6)
    },
    // 删除按钮点击
    deleteClick(Info, id) {
      this.$parent.deleteClick(Info, 6, id)
    },
    // 工作经历、教育经历、专业技能、外语能力部分修改点击
    editArrayClick(Info, index) {
      this.info = JSON.parse(JSON.stringify(this.data[index]))
      this.editIndex = index
      this.edit = true
      this[Info] = true
    },
    // 工作经历、教育经历、专业技能、外语能力部分修改弹窗确认
    editArraySubmit(Info) {
      this.$parent.editSubmit(Info, 6, this.info.id)
    },
    // 处理学历
    handleDegree(v) {
      return degree[v]
    },
    // 处理学制
    handleSchoolSys(v) {
      return schoolSys[v]
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.edu {
  .eduIcon {
    font-size: 14px;
    color: #409eff;
  }
  .rowbgc {
    height: 88px;
  }
}
</style>
