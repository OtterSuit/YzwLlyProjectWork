<template>
  <div>
    <mybox
      class="language"
      :edit-box-show="true"
      title="外语能力"
      edit-box-content="增加"
      edit-box-icon="el-icon-circle-plus-outline"
      @editClick="addClick('foreignLanguage')"
    >
      <el-row>
        <el-col>
          <el-row
            v-for="(item,index) in data"
            :key="item.key+'foreignLanguage'+index"
            class="rowbgc"
          >
            <div class="tools">
              <i class="el-icon-s-tools toolsIcon" />
              <div class="settingBox">
                <div class="settingBox-inner" @click="editArrayClick('foreignLanguage',index)">
                  <i class="el-icon-edit-outline" />
                  <span class="setting-content">修改</span>
                </div>
                <div class="settingBox-inner" @click="deleteClick('foreignLanguage', item.id)">
                  <i class="el-icon-delete" />
                  <span class="setting-content">删除</span>
                </div>
              </div>
            </div>
            <el-col :span="6">
              <span class="label">语种</span>
              <span class="content">{{ item.languages }}</span>
            </el-col>
            <el-col :span="6">
              <span class="label">已获证书</span>
              <span class="content">{{ item.certificateObtained }}</span>
              <i v-if="item.imageUrl" class="el-icon-picture picture" @click="imgClick(preImg+index+1)" />
            </el-col>
            <el-col :span="6">
              <span class="label">读写能力</span>
              <span class="content">{{ handleAbility(item.readWriteAbility) }}</span>
            </el-col>
            <el-col :span="6">
              <span class="label">运用能力</span>
              <span class="content">{{ handleAbility(item.applicationAbility) }}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </mybox>

    <el-form ref="languageInfo" :model="info" label-width="80px">
      <el-dialog title="外语能力" :visible.sync="foreignLanguage" width="800px">
        <div class="dialog-main">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="语种">
                <el-input v-model="info.languages" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="已获证书">
                <el-input v-model="info.certificateObtained" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="读写能力">
                <el-select v-model="info.readWriteAbility" placeholder>
                  <el-option label="精通" :value="1" />
                  <el-option label="熟练" :value="2" />
                  <el-option label="一般" :value="3" />
                  <el-option label="较差" :value="4" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="运用能力">
                <el-select v-model="info.applicationAbility" placeholder>
                  <el-option label="精通" :value="1" />
                  <el-option label="熟练" :value="2" />
                  <el-option label="一般" :value="3" />
                  <el-option label="较差" :value="4" />
                </el-select>
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
          <el-button @click="foreignLanguage=false">取消</el-button>
          <el-button v-show="edit" type="primary" @click="editArraySubmit('foreignLanguage')">保存修改</el-button>
          <el-button v-show="!edit" type="primary" @click="addSubmit('foreignLanguage')">确认新增</el-button>
        </div>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import Mybox from '@/components/Mybox'
import { ability } from '@/common/js/constants'
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
    },
    preImg: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      edit: false,
      editIndex: 0,
      foreignLanguage: false,
      info: {
        language: '',
        credential: '',
        readWrite: '',
        apply: ''
      },
      languageOld: {
        language: '',
        credential: '',
        readWrite: '',
        apply: ''
      }
    }
  },
  methods: {
    handleAbility(v) {
      return ability[v]
    },
    // 增加按钮点击
    addClick(Info) {
      this.edit = false
      this.info = JSON.parse(JSON.stringify(this.languageOld))
      this[Info] = true
    },
    // 新增弹窗确认按钮
    addSubmit(Info) {
      this.$parent.addSubmit(Info, 8)
    },
    // 删除按钮点击
    deleteClick(Info, id) {
      this.$parent.deleteClick(Info, 8, id)
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
      this.$parent.editSubmit(Info, 8, this.info.id)
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
