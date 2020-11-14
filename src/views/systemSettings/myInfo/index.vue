<template>
  <div class="archives-container">
    <el-row>
      <el-col :span="10" :offset="7">
        <mybox class="user" title="我的信息">
          <el-row type="flex" justify="space-between">
            <el-col :span="6" class="userImgBox">
              <img src="@/assets/images/meili.jpg" class="userImg">
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
          </el-row>
          <el-row v-for="item in row" :key="item.label" class="row">
            <el-col :span="5" :offset="2">
              <div class="label">{{ item.label }}</div>
            </el-col>
            <el-col :span="15">
              <div>
                <el-input v-model="form[item.value]" class="edit-input" size="small" />
              </div>
            </el-col>
          </el-row>
        </mybox>
      </el-col>
    </el-row>
    <div style="text-align:center">
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button type="primary">取消</el-button>
    </div>
  </div>
</template>

<script>
// postArchives
import Mybox from '@/components/Mybox'
import { getUserArchives } from '@/api/people/archives'
export default {
  components: {
    Mybox
  },
  data() {
    return {
      row: [
        {
          label: '姓名',
          value: 'name'
        },
        {
          label: '性别',
          value: 'gender'
        },
        {
          label: '政治面貌',
          value: 'politics'
        },
        {
          label: '电话号码',
          value: 'phone'
        },
        {
          label: '民族',
          value: 'nation'
        },
        {
          label: '邮箱地址',
          value: 'email'
        },
        {
          label: '身份证号',
          value: 'idCard'
        },
        {
          label: '婚姻',
          value: 'marriage'
        },
        {
          label: '爱好',
          value: 'hobby'
        },
        {
          label: '特长',
          value: 'speciality'
        },
        {
          label: '籍贯',
          value: 'native'
        },
        {
          label: '现住地址',
          value: 'address'
        }
      ],
      form: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getUserArchives().then(response => {
        // console.log(response)
        this.form = response.data.items.user
        // this.form.status = '1'
      })
    },
    onSubmit() {
      this.$message({
        message: '修改成功',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
i {
  vertical-align: middle;
}
.archives-container {
  padding: 30px;
  background-color: #f0f2f5;
}
::v-deep .box .title {
  text-align: center;
  display: block;
  color: #666;
  font-size: 20px;
}
.user {
  .userImgBox {
    position: relative;
    width: 190px;
    margin: 0 auto 20px;
    .upload {
      position: absolute;
      top: 0;
      left: 0;
      display: none;
      ::v-deep .el-upload--picture-card {
        height: 190px;
        width: 190px;
        background-color: rgba(0, 0, 0, 0.7);
        border: 1px solid rgba(229, 229, 229, 1);
        border-radius: 190px;
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
    border-radius: 190px;
  }
}
.row {
  margin-bottom: 20px;
}
::v-deep .el-input__inner {
  padding: 0 10px;
  width: 90%;
}
.label,
.content {
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}
.label {
  color: rgba(158, 174, 195, 1);
}
</style>
