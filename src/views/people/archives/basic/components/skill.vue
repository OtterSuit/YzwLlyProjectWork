<template>
  <div>
    <mybox
      class="skill"
      :edit-box-show="true"
      title="专业技能"
      edit-box-content="增加"
      edit-box-icon="el-icon-circle-plus-outline"
      @editClick="addClick('professionalSkill')"
    >
      <el-row>
        <el-col>
          <el-row v-for="(item,index) in data" :key="item.key+'professionalSkill'+index" class="rowbgc">
            <div class="tools">
              <i class="el-icon-s-tools toolsIcon" />
              <div class="settingBox">
                <div class="settingBox-inner" @click="editArrayClick('professionalSkill',index)">
                  <i class="el-icon-edit-outline" />
                  <span class="setting-content">修改</span>
                </div>
                <div class="settingBox-inner" @click="deleteClick('professionalSkill', item.id)">
                  <i class="el-icon-delete" />
                  <span class="setting-content">删除</span>
                </div>
              </div>
            </div>
            <el-col :span="6">
              <span class="label">证书名称</span>
              <span class="content">{{ item.certificateName }}</span>
              <i v-if="item.imageUrl" class="el-icon-picture picture" @click="imgClick(index+1)" />
            </el-col>
            <el-col :span="6">
              <span class="label">级别</span>
              <span class="content">{{ item.certificateLevel }}</span>
            </el-col>
            <el-col :span="6">
              <span class="label">获得日期</span>
              <span class="content">{{ item.obtainTime }}</span>
            </el-col>
            <el-col :span="6">
              <span class="label">失效日期</span>
              <span class="content">{{ item.invalidTime }}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </mybox>

    <el-form ref="skillInfo" :model="info" label-width="80px">
      <el-dialog title="专业技能" :visible.sync="professionalSkill" width="800px">
        <div class="dialog-main">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="证书名称">
                <el-input v-model="info.certificateName" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="级别">
                <el-input v-model="info.certificateLevel" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="获得日期">
                <el-date-picker
                  v-model="info.obtainTime"
                  :clearable="false"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="失效日期">
                <el-date-picker
                  v-model="info.invalidTime"
                  :clearable="false"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="24">
              <el-form-item label="证书图片">
                <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :limit="1"
                >
                  <i class="el-icon-upload" />
                  <div class="el-upload__text">
                    将图片拖到此处，或
                    <em>点击上传</em>
                  </div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="professionalSkill=false">取消</el-button>
          <el-button v-show="edit" type="primary" @click="editArraySubmit('professionalSkill')">保存修改</el-button>
          <el-button v-show="!edit" type="primary" @click="addSubmit('professionalSkill')">确认新增</el-button>
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
      professionalSkill: false,
      info: {},
      skillOld: {
        certificateName: '',
        certificateLevel: '',
        obtainTime: '',
        invalidTime: ''
      }
    }
  },
  methods: {
    // 增加按钮点击
    addClick(Info) {
      this.edit = false
      this.info = JSON.parse(JSON.stringify(this.skillOld))
      this[Info] = true
    },
    // 新增弹窗确认按钮
    addSubmit(Info) {
      this.$parent.addSubmit(Info, 7)
    },
    // 删除按钮点击
    deleteClick(Info, id) {
      this.$parent.deleteClick(Info, 7, id)
    },
    // 工作经历、教育经历、专业技能、外语能力部分修改点击
    editArrayClick(Info, index) {
      console.log(Info, index, this.data)
      this.info = JSON.parse(JSON.stringify(this.data[index]))
      console.log(this.info)
      this.editIndex = index
      this.edit = true
      this[Info] = true
    },
    // 工作经历、教育经历、专业技能、外语能力部分修改弹窗确认
    editArraySubmit(Info) {
      this.$parent.editSubmit(Info, 7, this.info.id)
    },
    imgClick(i) {
      this.$parent.imgShow = true
      this.$parent.dijizhang = i
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
</style>
