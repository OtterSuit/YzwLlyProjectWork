<template>
  <div id="tags-view-container" class="tags-view-container">
    <el-page-header :class="{hiddenBack:!showBack}" content="详情页面" @back="goBack(backName)">
      <template slot="content">
        <scroll-pane ref="scrollPane" class="tags-view-wrapper">
          <router-link
            v-for="tag in visitedViews"
            ref="tag"
            :key="tag.path"
            :class="isActive(tag)?'active':''"
            :to="{ path: tag.path }"
            tag="span"
            class="tags-view-item"
          >{{ tag.title }}</router-link>
        </scroll-pane>
      </template>
    </el-page-header>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'

export default {
  components: { ScrollPane },
  data() {
    return {}
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    showBack() {
      return this.$store.state.tagsView.showBack
    },
    backName() {
      return this.$store.state.tagsView.backName
    }
  },
  methods: {
    isActive(route) {
      if (this.$route.meta.activeTagsView) {
        return route.path === this.$route.meta.activeTagsView
      }
      return route.path === this.$route.path
    },
    goBack(backName) {
      if (backName === '') {
        this.$router.back(-1)
      } else {
        this.$router.push({
          name: backName
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-page-header {
    padding-left: 10px;
    color: #999;
  }
  .el-page-header__left {
    margin-right: 20px;
    .el-icon-back {
      line-height: 35px;
      font-size: 14px;
      color: #999;
    }
    &::after {
      right: -15px;
    }
  }
  .el-page-header__title {
    line-height: 34px;
    font-size: 13px;
  }
  .hiddenBack.el-page-header {
    padding-left: 0;
  }
  .hiddenBack .el-page-header__left {
    display: none;
  }
}
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #409eff;
        color: #fff;
        border-color: #409eff;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
