<template>
  <div>
    <mybox class="user" :edit-box-show="true" title="个人信息" @editClick="editClick('personalInformation')">
      <i class="iconfont statusIcon" :class="iconClass()" />
      <el-row type="flex" justify="space-between">
        <el-col :span="6" class="userImgBox">
          <img :src="data.headIcon?data.headIcon:defaultHead" class="userImg">
          <el-upload
            class="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :show-file-list="false"
          >
            <i class="iconfont icon-shangchuan uploadIcon" />
            <div class="el-upload__text">更换头像</div>
          </el-upload>
        </el-col>
        <el-col :span="18">
          <el-row>
            <div class="name">{{ data.realName }}</div>
          </el-row>
          <el-row class="row">
            <el-col :span="8">
              <span class="label">性别</span>
              <span class="content">{{ data.gender==1 ? '男' : '女' }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label">政治面貌</span>
              <span class="content">{{ data.politicCountenance }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label">电话号码</span>
              <span class="content">{{ data.mobilePhone }}</span>
            </el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="8">
              <span class="label">民族</span>
              <span class="content">{{ data.nation }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label">邮箱地址</span>
              <span class="content">{{ data.email }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label">身份证号</span>
              <span class="content">{{ data.idNumber }}</span>
            </el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="8">
              <span class="label">婚姻</span>
              <span class="content">{{ data.marriage==1? '未婚' : '已婚' }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label">爱好</span>
              <span class="content">{{ data.hobby }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label">特长</span>
              <span class="content">{{ data.specialty }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <span class="label">籍贯</span>
              <span class="content">{{ data.nativePlace }}</span>
            </el-col>
            <el-col :span="16">
              <span class="label">现住地址</span>
              <span class="content">{{ data.address }}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </mybox>

    <el-form ref="userInfo" :model="info" label-width="80px">
      <el-dialog title="个人信息" :visible.sync="personalInformation" width="800px">
        <div class="dialog-main">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="姓名">
                <el-input v-model="info.realName" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="性别">
                <el-radio-group v-model="info.gender">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="民族">
                <el-input v-model="info.nation" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="婚姻">
                <el-radio-group v-model="info.marriage">
                  <el-radio :label="1">未婚</el-radio>
                  <el-radio :label="2">已婚</el-radio>
                  <el-radio :label="3">已婚已育</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="政治面貌">
                <el-input v-model="info.politicCountenance" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="电话号码">
                <el-input v-model="info.mobilePhone" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="身份证号">
                <el-input v-model="info.idNumber" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="邮箱地址">
                <el-input v-model="info.email" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="籍贯">
                <el-input v-model="info.nativePlace" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="爱好">
                <el-input v-model="info.hobby" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="现住地址">
                <el-input v-model="info.address" type="textarea" resize="none" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="特长">
                <el-input v-model="info.specialty" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="personalInformation=false">取消</el-button>
          <el-button type="primary" @click="editSubmit('personalInformation')">保存修改</el-button>
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
    },
    status: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      personalInformation: false,
      defaultHead: '@/assets/images/meili.jpg',
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
      this.$parent.editSubmit(Info, 1)
    },
    // 个人信息icon
    iconClass() {
      if (this.status === 2) {
        return ['icon-weishenhe']
      } else if (this.status === 4) {
        return ['icon-yishenhe']
      } else if (this.status === 3) {
        return ['icon-beibohui']
      }
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
::v-deep .user {
  .userImgBox {
    position: relative;
    width: 190px;
    .upload {
      position: absolute;
      top: 0;
      left: 0;
      display: none;
      .el-upload--picture-card {
        height: 190px;
        width: 190px;
        background-color: rgba(0, 0, 0, 0.7);
        border: 1px solid rgba(229, 229, 229, 1);
        border-radius: 10px;
        line-height: 30px;
        padding: 65px 0;
      }
      .uploadIcon,
      .el-upload__text {
        color: #fff;
      }
    }
    &:hover .upload {
      display: block;
    }
  }
  .userImg {
    width: 190px;
    border-radius: 10px;
  }
  .name {
    color: black;
    font-size: 24px;
    margin-bottom: 23px;
    margin-left: 29px;
  }
  .statusIcon {
    position: absolute;
    top: 41px;
    right: 30px;
    font-size: 74px;
  }
  .icon-beibohui {
    color: #f56c6c;
  }
  .icon-weishenhe {
    color: #e6a23c;
    font-size: 96px;
    top: 28px;
  }
  .icon-yishenhe {
    color: #67c23a;
  }
}
</style>
