<template>
  <transition :name="transitionName">
    <div v-show="visible" :style="customStyle" class="back-to-ceiling" @click="btnClick">
      <i :class="icon" class="button-icon" />
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'el-icon-plus'
    },
    visibilityHeight: {
      type: Number,
      default: 400
    },
    customStyle: {
      type: Object,
      default: function() {
        return {
          right: '30px',
          bottom: '30px',
          background: '#409EFF'
        }
      }
    },
    transitionName: {
      type: String,
      default: 'fade'
    }
  },
  data() {
    return {
      visible: false,
      interval: null,
      isMoving: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    handleScroll() {
      this.visible = window.pageYOffset > this.visibilityHeight
    },
    btnClick() {
      this.$emit('btnClick')
    }
  }
}
</script>

<style scoped>
.button-icon {
  color: #fff;
  font-size: 32px;
  width: 52px;
  height: 52px;
  line-height: 52px;
}
.back-to-ceiling {
  border-radius: 52px;
  position: fixed;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.5s;
}

.back-to-ceiling:hover {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

.back-to-ceiling .Icon {
  fill: #9aaabf;
  background: none;
}
</style>
