<template>
  <div class="box">
    <div v-if="editBoxShow" class="editBox" @click="editClick">
      <i :class="editBoxIcon" />
      <span>{{ editBoxContent }}</span>
      <div class="editBoxBg" />
    </div>
    <el-row v-if="title!==''">
      <span class="title">{{ title }}</span>
    </el-row>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    editBoxShow: {
      type: Boolean,
      default: false
    },
    editBoxIcon: {
      type: String,
      default: 'el-icon-edit-outline'
    },
    editBoxContent: {
      type: String,
      default: '修改'
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    editClick() {
      this.$emit('editClick')
    }
  }
}

</script>
<style lang="scss" type="text/scss" scoped>
  .box {
    background: rgba(255, 255, 255, 1);
    box-shadow: 4px 4px 40px 0px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    padding: 20px 30px 30px;
    margin-bottom: 20px;
    position: relative;
    .title {
      font-size: 18px;
      display: inline-block;
      margin-bottom:16px;
      color: rgba(153, 153, 153, 1);
      line-height: 24px;
    }
    .editBox {
      width: 70px;
      height: 24px;
      background: rgba(64, 158, 255, 1);
      box-shadow: -4px 4px 10px 0px rgba(0, 0, 0, 0.1);
      border-radius: 4px 0px 0px 4px;
      position: absolute;
      top: 20px;
      right: 0;
      color: #fff;
      padding: 2px 6px;
      display: none;
      .editBoxBg {
        width: 70px;
        height: 24px;
        position: absolute;
        top: 0;
        left: 0;
        cursor: pointer;
        z-index: 5;
      }
      span {
        font-size: 12px;
        display: inline-block;
        height: 16px;
        line-height: 16px;
      }
    }
    &:hover .editBox {
      display: block;
    }
  }
</style>
