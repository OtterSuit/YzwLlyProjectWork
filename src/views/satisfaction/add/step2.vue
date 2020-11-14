<template>
  <div class="step2-container">
    <myfilters
      title="第二步：设置问卷问题"
      addifo="完成设计"
      :add-button="true"
      :add-span="4"
      add-icon="el-icon-circle-check"
      @addClick="addClick"
    >
      <template slot="extent">
        <el-button icon="el-icon-view" @click="previewShow">
          预览问卷
        </el-button>
        <el-button class="pre-button" @click="preClick">
          上一步
        </el-button>
      </template>
    </myfilters>
    <el-form ref="tableData" :model="data" label-width="0" :inline="true">
      <mybox v-for="(item,index) in data.tableData" :key="index">
        <div class="box-title">
          <span v-show="!item.edit">
            {{ item.title }}
            <i class="el-icon-edit-outline" @click="item.edit=true" />
          </span>
          <div v-show="item.edit">
            <el-form-item
              label=""
              :prop="'tableData.' + index + '.title'"
              :rules="{
                required: true, message: '标题不能为空', trigger: 'blur'
              }"
            >
              <el-input v-model="item.title" placeholder="请输入标题" />
            </el-form-item>
            <i class="el-icon-circle-check table-edit" @click="editTitleSubmit(item)" />
          </div>
        </div>
        <div v-if="item.question.length===0" class="no-data">
          <span>暂无数据，</span>
          <span class="no-data-add" @click="addQuestionClick(item,index)">点击添加</span>
        </div>
        <el-row v-for="(element,i) in item.question" :key="i" class="row">
          <el-col :span="1" class="checkbox-col">
            <el-checkbox v-model="element.choose" />
          </el-col>
          <el-col :span="21">
            <el-form-item
              label=""
              :prop="'tableData.' + index + '.question.'+ i + '.name'"
              :rules="nameCheck(element.choose)"
            >
              <el-input v-model="element.name" placeholder="请输入问题" :disabled="!element.choose" />
            </el-form-item>
          </el-col>
          <el-col :span="1" class="question-icon">
            <i class="el-icon-circle-plus-outline" @click="addQuestionClick(item,index)" />
          </el-col>
          <el-col :span="1" class="question-icon">
            <i class="el-icon-delete" @click="deleteClick(item,i)" />
          </el-col>
        </el-row>
      </mybox>
    </el-form>
    <fixed-button
      :visibility-height="100"
      icon="el-icon-view"
      :custom-style="{
        right: '15px',
        bottom: '164px',
        background: '#9B9B9B'
      }"
      @btnClick="previewShow"
    />
    <fixed-button
      :visibility-height="100"
      icon="el-icon-arrow-left"
      :custom-style="{
        right: '15px',
        bottom: '92px',
        background: '#9B9B9B'
      }"
      @btnClick="preClick"
    />
    <fixed-button
      :visibility-height="100"
      icon="el-icon-check"
      :custom-style="{
        right: '15px',
        bottom: '20px',
        background: '#409EFF'
      }"
      @btnClick="addClick"
    />
  </div>
</template>

<script>
import Mybox from '@/components/Mybox'
import myfilters from '@/components/myfilters'
import fixedButton from '@/components/fixedButton'
import api from '@/api'
export default {
  components: {
    myfilters, fixedButton, Mybox
  },
  data() {
    return {
      form: {},
      data: {
        tableData: [
          {
            title: '医疗环境设施',
            edit: false,
            question: [
              {
                name: '您对门诊(候诊区、诊室)的舒适情况',
                type: 1,
                choose: true
              },
              {
                name: '您对医院的卫生情况（干净、整洁）',
                type: 1,
                choose: true
              },
              {
                name: '您对医院的指示牌和门牌',
                type: 1,
                choose: true
              },
              {
                name: '您对医院食堂饭菜的质量',
                type: 1,
                choose: false
              }
            ]
          },
          {
            title: '医生服务态度',
            edit: false,
            question: [
              {
                name: '您对接诊医生的服务态度',
                type: 1,
                choose: true
              },
              {
                name: '您对医师倾听病人病情的耐心程度',
                type: 1,
                choose: true
              },
              {
                name: '您对医师检查的仔细程度、说明病情的详细程度',
                type: 1,
                choose: true
              },
              {
                name: '您对医师的医疗技术水平',
                type: 1,
                choose: true
              },
              {
                name: '您对医师的治疗效果',
                type: 1,
                choose: true
              },
              {
                name: '您对医生在决定检查和治疗方式前征求病人或家属的意见',
                type: 1,
                choose: false
              }
            ]
          },
          {
            title: '护士服务态度',
            edit: false,
            question: [
              {
                name: '您对护士的服务态度',
                type: 1,
                choose: true
              },
              {
                name: '您对护士长的服务态度',
                type: 1,
                choose: true
              },
              {
                name: '您对护士的护理技术水平',
                type: 1,
                choose: true
              },
              {
                name: '您对护士开展健康教育（告诉疾病常识、指导服药）',
                type: 1,
                choose: true
              },
              {
                name: '您对护士进行生活护理',
                type: 1,
                choose: true
              },
              {
                name: '您对护士的抽血技术',
                type: 1,
                choose: false
              },
              {
                name: '您对护士的打针（肌注、静脉滴注）技术',
                type: 1,
                choose: false
              }
            ]
          },
          {
            title: '意见或建议',
            edit: false,
            question: [
              {
                name: '您认为本院最需要加强或改进的方面是什么？',
                type: 2,
                choose: false
              },
              {
                name: '您对我院的其他工作有何好的建议？',
                type: 2,
                choose: true
              }
            ]
          }
        ]
      }

    }
  },
  created() {
    if (localStorage.getItem('satisfaction')) {
      this.form = JSON.parse(localStorage.getItem('satisfaction'))
    } else {
      this.$message({
        message: '请先完成第一步：问卷设置。',
        type: 'warning'
      })
      this.preClick()
    }
    if (localStorage.getItem('question')) {
      this.data.tableData = JSON.parse(localStorage.getItem('question'))
    }
  },
  methods: {
    // 完成设计
    addClick() {
      this.$refs.tableData.validate((valid) => {
        if (valid) {
          this.form.questions = []
          this.data.tableData.forEach(v => {
            v.question.forEach(j => {
              if (j.choose) {
                this.form.questions.push({
                  title: v.title,
                  name: j.name,
                  type: j.type
                })
              }
            })
          })
          this.form.patientSituation = this.form.patientSituation.join('|')
          // console.log(this.form)
          api.postSatisfaction(this.form).then(response => {
            if (response.success) {
              this.$message({
                message: '新建问卷成功',
                type: 'success'
              })
              this.$router.push({
                name: 'Questionnaire'
              })
            }
          })
        }
      })
    },
    // 问题字段校验
    nameCheck(choose) {
      if (choose) {
        return {
          required: true, message: '问题不能为空', trigger: 'blur'
        }
      } else {
        return {}
      }
    },
    // 修改标题
    editTitleSubmit(item) {
      if (item.title) {
        item.edit = false
      }
    },
    // 删除
    deleteClick(item, index) {
      item.question.splice(index, 1)
    },
    // 添加
    addQuestionClick(item, index) {
      item.question.push({
        question: '',
        type: index === 3 ? 2 : 1,
        choose: true
      })
    },
    // 上一步
    preClick() {
      localStorage.setItem('question', JSON.stringify(this.data.tableData))
      this.$router.push({
        name: 'step1'
      })
    },
    // 预览
    previewShow() {
      this.$refs.tableData.validate((valid) => {
        if (valid) {
          localStorage.setItem('question', JSON.stringify(this.data.tableData))
          this.$router.push({
            name: 'preview'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.pre-button {
  border-color: #409EFF;
  color: #409EFF;
}
.step2-container {
  background-color: #F0F2F5;
  padding: 30px;
}
.row {
  margin-bottom: 20px;
}
.checkbox-col {
  height: 40px;
  width: 20px;
  margin-right: 10px;
  line-height: 40px;
}
.box-title {
  height: 40px;
  line-height: 40px;
  font-size:18px;
  color:rgba(102,102,102,1);
  margin-bottom: 26px;
  i {
    color: #999;
    cursor: pointer;
  }
  .el-input {
    font-size: 18px;
  }
}
.question-icon {
  height: 40px;
  line-height: 40px;
  color: #999;
  i {
    font-size: 24px;
    margin-left: 20px;
    cursor: pointer;
  }
}
.no-data {
  text-align: center;
  font-size: 22px;
  color: #999;
  margin: 20px 0;
  &-add {
    color: #409EFF;
    cursor: pointer;
  }
}
::v-deep .el-form--inline .el-form-item {
  width: 100%;
  margin-bottom: 0;
  .el-form-item__content {
    width: 100%;
  }
}
</style>
