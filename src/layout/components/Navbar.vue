<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <i class="el-icon-refresh-right icon" style="cursor:pointer" @click="refresh()" />
      <router-link to="/systemSettings/myTodo">
        <el-badge :value="value" :max="99" class="item">
          <i class="iconfont icon-lingdang icon" />
        </el-badge>
      </router-link>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="!userInfo.avatar||userInfo.avatar===''||userInfo.avatar==='undefined'||userInfo.avatar==='null'" src="@/assets/images/noimg-01.jpg" class="pic_user">
          <img v-else :src="userInfo.avatar" class="pic_user">
          <span class="user"> {{ userInfo.name }}</span>
          <i class="el-icon-arrow-down down" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <router-link to="/systemSettings/myInfo">
            <el-dropdown-item>
              我的信息
            </el-dropdown-item>
          </router-link>
          <router-link to="/systemSettings/modifyPwd">
            <el-dropdown-item>
              密码修改
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getTodo } from '@/api/systemSettings/todo'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  inject: ['reload'],
  data() {
    return {
      value: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'sidebar'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getTodo().then(response => {
        // console.log(response)
        this.value = response.data.total
      })
    },
    refresh() {
      this.reload()
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 47px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
    line-height: 50px;
  }
  .pic_user{
    position: relative;
    top: 5px;
    // vertical-align: middle;
    width: 30px;
    border-radius: 100%;
    height: 30px;
  }
  .right-menu {
    padding: 5px 0;
    float: right;
    height: 100%;
    // line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    .todo {
      // float: right;
      display: inline-block;
    }
    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        // margin-top: 5px;
        cursor: pointer;
        // position: relative;
        height: 40px;
        padding: 0 10px;
        border-radius: 20px;
        background-color: #F0F2F5;
        // margin-top: 5px;
        .user{
          position: relative;
          top: -5px;
          line-height: 40px;
          display: inline-block;
          color: #666;
          // position: absolute;
          // right: -40px;
          // bottom: -13px;
          // width: 100px;
        }
        ::v-deep .el-icon-arrow-down {
          position: relative;
          top: -5px;
        }
        .down {
          margin-left: 5px;
          font-size: 12px;
          color: #666;
        }
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.icon {
  font-size: 28px;
  margin-right: 15px;
  color: #999;
}
::v-deep .el-badge {
  vertical-align: baseline;
}
.el-dropdown-menu {
  padding: 0;
}
</style>
<style>
.right-menu .el-badge__content.is-fixed {
    top: 10px;
    right: 28px;
}
</style>
