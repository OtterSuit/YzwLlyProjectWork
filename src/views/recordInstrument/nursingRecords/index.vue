<template>
  <div style="padding:30px">
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane name="generalRecords">
        <span slot="label">一般护理记录</span>
      </el-tab-pane>
      <el-tab-pane name="criticalRecords">
        <span slot="label">重症护理记录</span>
      </el-tab-pane>
    </el-tabs>
    <div class="component">
      <transition name="fade-transform" mode="out-in">
        <component :is="isComponent" :info="info" style="margin-top:70px" />
      </transition>
      <div class="sibling">
        <div class="title">{{ title }}</div>
        <div style="display:flex">
          <div class="flex">
            <span>姓名：</span>
            <span class="content">{{ info.name }}</span>
          </div>
          <div class="flex">
            <span>性别：</span>
            <span class="content">{{ info.gender }}</span>
          </div>
          <div class="flex">
            <span>年龄：</span>
            <span class="content">{{ info.age }}岁</span>
          </div>
          <div class="flex">
            <span>入院时间：</span>
            <span class="content">{{ info.date }}</span>
          </div>
          <div class="flex">
            <span>入院方式：</span>
            <span class="content">{{ info.way }}</span>
          </div>
        </div>
        <div style="display:flex;margin-bottom:10px">
          <div class="flex">
            <span>科室：</span>
            <span class="content">{{ info.department }}</span>
          </div>
          <div class="flex">
            <span>床号：</span>
            <span class="content">{{ info.bedNum }}</span>
          </div>
          <div class="flex">
            <span>住院号：</span>
            <span class="content">{{ info.hospitalNum }}</span>
          </div>
          <div class="specialFlex">
            <span>诊断：</span>
            <span class="content">{{ info.diagnose }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import generalRecords from './generalRecords'
import criticalRecords from './criticalRecords'

export default {
  components: {
    generalRecords, criticalRecords
  },
  data() {
    return {
      info: {},
      title: '一般护理记录单',
      activeName: 'generalRecords',
      componentsList: {
        generalRecords: 'generalRecords',
        criticalRecords: 'criticalRecords'
      }
    }
  },
  computed: {
    isComponent() {
      return this.componentsList[this.activeName]
    }
  },
  created() {
    this.info = this.$route.params.info
  },
  methods: {
    tabClick() {
      switch (this.activeName) {
        case 'generalRecords':
          this.title = '一般护理记录单'
          break
        case 'criticalRecords':
          this.title = '重症护理记录'
          break
      }
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.table {
  padding: 30px;
}
.component {
  margin: 30px 0px;
  padding: 20px 0;
  // border: 1px solid #ccc;
  position: relative;
  .flex {
    flex: 1;
    margin-bottom: 5px;
    span {
      display: inline-block;
      width: 35%;
      text-align: end;
      font-size: 14px;
      color: #666;
    }
    .content {
      width: 60%;
      text-align: center;
      border-bottom: 1px solid #999;
    }
  }
  .specialFlex {
    flex: 2;
    span{
      display: inline-block;
      width: 17.5%;
      text-align: end;
      font-size: 14px;
      color: #666;
    }
    .content {
      width: 80%;
      text-align: center;
      border-bottom: 1px solid #999;
    }
  }
  .title {
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
  }
}

.fade-enter-active + .sibling,
.fade-leave-active + .sibling {
  transition: opacity 0.28s;
}

.fade-enter  + .sibling,
.fade-leave-active + .sibling {
  opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active + .sibling,
.fade-transform-enter-active + .sibling{
  transition: all .5s;
}

.fade-transform-enter + .sibling {
  opacity: 0;
  // transform: translateY(-30px);
}

.fade-transform-leave-to + .sibling {
  opacity: 0;
  // transform: translateY(30px);
}
.sibling {
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
