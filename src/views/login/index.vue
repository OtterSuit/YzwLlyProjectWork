<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <img src="@/assets/images/logo-icon.png" class="title-logo">
        <img src="../../assets/images/title.png" class="title">
      </div>
      <el-row type="flex" class="login-main">
        <el-col>
          <div class="login-title">请登陆</div>

          <el-form-item>
            <span class="svg-container">
              <i class="el-icon-user" />
            </span>
            <el-input
              ref="userName"
              v-model="loginForm.userName"
              placeholder="请输入用户名"
              name="userName"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <i class="el-icon-unlock" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              tabindex="2"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @mousedown="showPwd" @mouseup="hiddenPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <el-button :loading="loading" type="primary" style="width:150px;height:48px;margin-bottom:30px;" @click.native.prevent="handleLogin">登陆</el-button>
          <!-- <span class="forget">忘记密码？</span> -->
        </el-col>
      </el-row>
      <!-- <div class="tips">
        <span style="margin-right:20px;">userName: admin</span>
        <span> password: any</span>
      </div> -->

    </el-form>
  </div>
</template>

<script>
// import api from '@/api'
// import { validUsername } from '@/utils/validate'
// import Cookies from 'js-cookie'

export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userName: '',
        password: '',
        systemCode: 'ssd'
      },
      loginRules: {
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password'
    }
  },
  methods: {
    showPwd() {
      this.passwordType = ''
      window.addEventListener('mouseup', this.hiddenPwd)
    },
    hiddenPwd() {
      this.passwordType = 'password'
      window.removeEventListener('mouseup', this.hiddenPwd)
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async handleLogin() {
      // 验证登录
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */

$bg:#fff;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: black;
      // color: $light_gray;
      height: 47px;
      font-size:18px;
      // caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: black !important;
        height: 30px;
        margin-left: 10px;
        padding-left: 2px;
      }
    }
  }

  .el-form-item {
    width:400px;
    height:48px;
    background:rgba(255,255,255,1);
    border-radius:6px;
    border:1px solid rgba(233,233,235,1);
    color: black;
  }
}
</style>

<style lang="scss" scoped>
$bg:#123d77;
$dark_gray:#d1dde3;
$light_gray:#eee;

.login-container {
  position: relative;
  min-height: 100%;
  width: 100%;
  background-image: url("../../assets/images/bgimage.png");
  background-size: cover;
  overflow: hidden;

  .login-form {
    position: absolute;
    height: 480px;
    width: 640px;
    background-color: #f7f7f7;
    max-width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    overflow: hidden;
    border-radius: 10px;
    box-shadow:4px 4px 40px 0px rgba(0,0,0,0.2);
  }
  .login-main {
    background-image: url("../../assets/images/login-main.png");
    background-size: cover;
    height: 385px;
    padding: 38px 120px 0;

  }
  .login-title {
    margin-bottom: 26px;
    // width:100px;
    height:33px;
    font-size:24px;
    font-weight:400;
    color:rgba(92,172,255,1);
    line-height:33px;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    i {
      font-size: 24px;
    }
  }

  .title-container {
    position: relative;
    height: 95px;
    width: 640px;
    background-image: url("../../assets/images/loginTop.png");
    background-size: cover;
    padding: 28px 32px;
    // }
    .title {
      height: 40px;
      vertical-align: middle;
    }
    .title-logo {
      height: 48px;
      vertical-align: middle;
      margin-right: 15px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.forget {
  display: inline-block;
  color: rgba(92,172,255,1);
  font-size: 14px;
  margin-left: 80px;
  cursor: pointer;
  height: 20px;
  line-height: 20px;
  position: relative;
  top: 7px;
}
</style>
