<template>
  <div style="padding:30px">
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane name="admissionAssessment">
        <span slot="label">入院评估</span>
      </el-tab-pane>
      <el-tab-pane name="selfCareAssessment">
        <span slot="label">自理能力评估</span>
      </el-tab-pane>
      <el-tab-pane name="painAssessment">
        <span slot="label">疼痛评估</span>
      </el-tab-pane>
      <el-tab-pane name="pressureAssessment">
        <span slot="label">压疮风险评估</span>
      </el-tab-pane>
      <el-tab-pane name="fallAssessment">
        <span slot="label">跌倒风险评估</span>
      </el-tab-pane>
      <el-tab-pane name="pipelineAssessment">
        <span slot="label">管道脱落风险评估</span>
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
import admissionAssessment from './admissionAssessment'
import selfCareAssessment from './selfCareAssessment'
import painAssessment from './painAssessment'
import pressureAssessment from './pressureAssessment'
import fallAssessment from './fallAssessment'
import pipelineAssessment from './pipelineAssessment'

export default {
  components: {
    admissionAssessment, selfCareAssessment, painAssessment, pressureAssessment, fallAssessment, pipelineAssessment
  },
  data() {
    return {
      info: {},
      title: '入院患者护理评估单',
      activeName: 'admissionAssessment',
      componentsList: {
        admissionAssessment: 'admissionAssessment',
        selfCareAssessment: 'selfCareAssessment',
        painAssessment: 'painAssessment',
        pressureAssessment: 'pressureAssessment',
        fallAssessment: 'fallAssessment',
        pipelineAssessment: 'pipelineAssessment'
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
        case 'admissionAssessment':
          this.title = '入院患者护理评估单'
          break
        case 'selfCareAssessment':
          this.title = '自理能力评估单 '
          break
        case 'painAssessment':
          this.title = '住院患者疼痛评估单'
          break
        case 'pressureAssessment':
          this.title = '压疮风险评估单'
          break
        case 'fallAssessment':
          this.title = '住院患者跌倒、坠床风险评估表'
          break
        case 'pipelineAssessment':
          this.title = '管道滑脱危险因素评估表'
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
  margin: 30px 0;
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
::v-deep .el-radio__input.is-disabled+span.el-radio__label,::v-deep  .el-checkbox__input.is-disabled+span.el-checkbox__label {
  color: #666!important;
  cursor: default;
}
::v-deep .el-radio__input.is-disabled .el-radio__inner,::v-deep  .el-checkbox__input.is-disabled .el-checkbox__inner {
  cursor: default;
  border-radius: 0;
  background-color: #edf2fc;
}
::v-deep .el-radio__input.is-disabled .el-radio__inner::after, ::v-deep .el-checkbox__input.is-disabled .el-checkbox__inner::after {
  cursor: default;
  width: 4px;
  height: 8px;
  border-radius: 0;
}
::v-deep .el-radio__input.is-disabled.is-checked .el-radio__inner::after, ::v-deep .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
  background-color: #edf2fc;
  border: 1px solid #666;
  border-left: 0;
  border-top: 0;
  transform: rotate(45deg) scaleY(1);
  top: 1px;
  left: 4px;
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
