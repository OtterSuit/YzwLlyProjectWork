<template>
  <div class="archives-container">
    <el-row>
      <el-col :span="10" :offset="7">
        <mybox class="user">
          <el-row type="flex" justify="space-between">
            <el-col :span="6" class="userImgBox">
              <img v-if="!userInfo.avatar||userInfo.avatar===''||userInfo.avatar==='undefined'||userInfo.avatar==='null'" src="@/assets/images/noimg-01.jpg" class="userImg">
              <img v-else :src="userInfo.avatar" class="userImg">
            </el-col>
          </el-row>
          <el-row style="margin-bottom:16px">
            <span class="title">{{ userInfo.name }}</span>
          </el-row>
          <el-row class="row">
            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="原密码">
                <el-input v-model.trim="form.oldpassword" />
              </el-form-item>
              <el-form-item label="新密码">
                <el-input v-model.trim="form.password" />
              </el-form-item>
              <el-form-item label="重复新密码">
                <el-input v-model.trim="form.password2" />
              </el-form-item>
            </el-form>
          </el-row>
        </mybox>
      </el-col>
    </el-row>
    <div class="down_btn">
      <el-button class="return_btn" type="primary" @click="onSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
import Mybox from '@/components/Mybox'
import api from '@/api'
import { mapGetters } from 'vuex'
export default {
  name: 'Password',
  components: {
    Mybox
  },
  data() {
    return {
      form: {
        oldpassword: '',
        password: '',
        password2: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    onSubmit() {
      // console.log(this.form)
      api.postModifyPwd(this.form).then((res) => {
        console.log(res)
        // if (+res.data.busiCode === 1) {
        //   this.$message({
        //     message: '修改密码成功',
        //     type: 'success'
        //   })
        //   setTimeout(async() => {
        //     await this.$store.dispatch('user/logout')
        //     this.$router.push('/login')
        //   }, 2000)
        // } else {
        //   this.$message({
        //     message: res.data.msg,
        //     type: 'error'
        //   })
        // }
      }).catch((err) => {
        console.log(err)
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
  padding: 10vh 30px;
  background-color:#F0F2F5;
  min-height: calc(100vh - 50px);
}
.user {
  .userImgBox {
    position: relative;
    width: 190px;
    margin: 0 auto 20px;
  }
  .userImg {
    width: 190px;
    border-radius: 190px;
  }
  .title {
    font-size:20px;
    // color:rgba(153,153,153,1);
    line-height:24px;
    display: block;
    text-align: center;
  }
}
.line{
  text-align: center;
}
.down_btn{
  text-align: center;
}
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
</style>
