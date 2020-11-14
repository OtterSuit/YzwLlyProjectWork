<template>
  <div>
    <mybox
      class="workExp"
      :edit-box-show="true"
      title="工作经历"
      edit-box-content="增加"
      edit-box-icon="el-icon-circle-plus-outline"
      @editClick="addClick('workExperience')"
    >
      <el-row>
        <el-col>
          <el-row
            v-for="(item,index) in data"
            :key="index"
            class="rowbgc"
          >
            <div class="tools">
              <i class="el-icon-s-tools toolsIcon" />
              <div class="settingBox">
                <div class="settingBox-inner" @click="editArrayClick('workExperience',index)">
                  <i class="el-icon-edit-outline" />
                  <span class="setting-content">修改</span>
                </div>
                <div class="settingBox-inner" @click="deleteClick('workExperience',item.id)">
                  <i class="el-icon-delete" />
                  <span class="setting-content">删除</span>
                </div>
              </div>
            </div>
            <el-col :span="5">
              <span class="label">单位名称</span>
              <span class="content">{{ item.unitName }}</span>
            </el-col>
            <el-col :span="5">
              <span class="label">职务</span>
              <span class="content">{{ handleJobPost(item.jobPost) }}</span>
            </el-col>
            <el-col :span="5">
              <span class="label">工作科室</span>
              <span class="content">{{ item.department }}</span>
            </el-col>
            <el-col :span="9">
              <span class="label">任职时间</span>
              <span class="content">{{ item.startTime }} 至 {{ item.endTime }}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </mybox>

    <el-form ref="workExpInfo" :model="info" label-width="80px">
      <el-dialog title="工作经历" :visible.sync="workExperience" width="800px">
        <div class="dialog-main">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="单位名称">
                <el-input v-model="info.unitName" />
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
              <el-form-item label="工作科室">
                <el-select v-model="info.department" placeholder>
                  <el-option label="内科" value="内科" />
                  <el-option label="外科" value="外科" />
                  <el-option label="儿科" value="儿科" />
                  <el-option label="妇科" value="妇科" />
                  <el-option label="牙科" value="牙科" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="任职时间">
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
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="workExperience=false">取消</el-button>
          <el-button v-show="edit" type="primary" @click="editSubmit('workExperience')">保存修改</el-button>
          <el-button v-show="!edit" type="primary" @click="addSubmit('workExperience')">确认新增</el-button>
        </div>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import Mybox from '@/components/Mybox'
import { jobPost } from '@/common/js/constants'
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
      workExperience: false,
      info: {},
      workExpOld: {
        unitName: '',
        jobPost: '',
        department: '',
        startTime: '',
        endTime: ''
      }
    }
  },
  methods: {
    // 处理职位
    handleJobPost(v) {
      return jobPost[v]
    },
    // 增加按钮点击
    addClick(Info) {
      this.edit = false
      this.info = JSON.parse(JSON.stringify(this.workExpOld))
      this[Info] = true
    },
    // 新增弹窗确认按钮
    addSubmit(Info) {
      this.$parent.addSubmit(Info, 5)
    },
    // 删除按钮点击
    deleteClick(Info, id) {
      this.$parent.deleteClick(Info, 5, id)
    },
    // 工作经历、教育经历、专业技能、外语能力部分修改点击
    editArrayClick(Info, index) {
      this.info = JSON.parse(JSON.stringify(this.data[index]))
      this.editIndex = index
      this.edit = true
      this[Info] = true
    },
    // 工作经历、教育经历、专业技能、外语能力部分修改弹窗确认
    editSubmit(Info) {
      const { id } = this.info
      this.$parent.editSubmit(Info, 5, id)
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
</style>
