<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" src="@/assets/images/logo-icon.png" class="sidebar-logo">
        <img v-else src="@/assets/images/title.png" class="sidebar-title">
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" src="@/assets/images/logo-icon.png" class="sidebar-logo">
        <img src="@/assets/images/title.png" class="sidebar-title">
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '慧扬消毒供应室',
      logo: 'icon-bianzu4'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    background-image: url('../../../assets/images/sidebarTitle.png');
    background-size: cover;

    & .sidebar-logo {
      height: 28px;
      margin-right: 6px;
      vertical-align: middle;
    }

    & .sidebar-title {
      width: 150px;
      line-height: 50px;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
