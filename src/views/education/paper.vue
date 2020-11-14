<template>
  <div>
    <div class="title-top">{{ data.examName }}</div>
    <div class="content-top">
      <span
        v-if="paperType !== 5"
      >考试时间：{{ data.startTime }}至{{ data.endTime }}</span>
      <span>满分：{{ data.fullMarks }}分</span>
      <span v-if="data.singleNumber!==0">单选题：{{ data.singleNumber }}题</span>
      <span v-if="data.multipleNumber!==0">多选题：{{ data.multipleNumber }}题</span>
      <span v-if="data.qaNumber!==0">问答题：{{ data.qaNumber }}题</span>
    </div>
    <div v-if="paperType === 3 || paperType === 4" class="content-top-2">
      <mybox>
        <el-row>
          <el-col>
            <el-row>
              <el-col :span="6" :offset="paperType === 3 ? 3 : 0">
                <span class="label">考生姓名</span>
                <span class="content">{{ data.name }}</span>
              </el-col>
              <el-col :span="6">
                <span class="label">所属科室</span>
                <span class="content">{{ data.department }}</span>
              </el-col>
              <el-col :span="6">
                <span class="label">答题时间</span>
                <span class="content">{{ data.examTime }}</span>
              </el-col>
              <el-col v-if="paperType !== 3" :span="6">
                <span class="label">考试分数</span>
                <span class="content">{{ data.score }}</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </mybox>
    </div>
    <div v-if="data.hasSingle" class="single">
      <myfilters
        class="question-title"
        title="一、单项选择题"
        :content="singleContent"
      />
      <mybox
        v-for="(item, index) in viewData.single"
        :key="index"
        :edit-box-show="paperType === 2"
        edit-box-icon="el-icon-refresh"
        edit-box-content="切换"
        @editClick="editClick(item, index, 'single')"
      >
        <div class="question">{{ index + 1 }}.【单选】{{ item.itemName }}</div>
        <div v-if="paperType === 1 || paperType === 2">
          <div v-for="(v, k) in option" :key="k" class="answer">
            {{ k }}.&nbsp;&nbsp;{{ item[v] }}
            <span v-if="item.reference === k" class="correct">【答案】</span>
          </div>
        </div>
        <div v-else-if="paperType === 5">
          <el-radio-group v-model="item.answer">
            <el-radio
              v-for="(v, k) in option"
              :key="k"
              :label="k"
            >{{ k }}.&nbsp;&nbsp;{{ item[v] }}</el-radio>
          </el-radio-group>
        </div>
        <div v-else class="check-color">
          <el-radio-group
            v-model="item.answer"
            :class="item.reference === item.answer ? 'green' : 'red'"
          >
            <el-radio v-for="(v, k) in option" :key="k" :label="k" disabled>
              {{ k }}.&nbsp;&nbsp;{{ item[v] }}
              <span v-if="item.reference === k" class="correct">【答案】</span>
            </el-radio>
          </el-radio-group>
        </div>
      </mybox>
    </div>
    <div v-if="data.hasMultiple" class="multiple">
      <myfilters
        class="question-title"
        :title="data.hasSingle?'二、多项选择题':'一、多项选择题'"
        :content="multipleContent"
      />
      <mybox
        v-for="(item, index) in viewData.multiple"
        :key="index"
        :edit-box-show="paperType === 2"
        edit-box-icon="el-icon-refresh"
        edit-box-content="切换"
        @editClick="editClick(item, index, 'multiple')"
      >
        <div class="question">{{ index + 1 }}.【多选】{{ item.itemName }}</div>
        <div v-if="paperType === 1 || paperType === 2">
          <div v-for="(v, k) in option" :key="k" class="answer">
            {{ k }}.&nbsp;&nbsp;{{ item[v] }}
            <span
              v-if="item.reference.includes(k)"
              class="correct"
            >【答案】</span>
          </div>
        </div>
        <div v-else-if="paperType === 5">
          <el-checkbox-group v-model="item.answer">
            <el-checkbox
              v-for="(v, k) in option"
              :key="k"
              :label="k"
            >{{ k }}.&nbsp;&nbsp;{{ item[v] }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div v-else class="check-color">
          <el-checkbox-group v-model="item.answer">
            <el-checkbox
              v-for="(v, k) in option"
              :key="k"
              disabled
              :label="k"
              :class="item.reference.includes(k) ? 'green' : ''"
            >
              {{ k }}.&nbsp;&nbsp;{{ item[v] }}
              <span
                v-if="item.reference.includes(k)"
                class="correct"
              >【答案】</span>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </mybox>
    </div>
    <div v-if="data.hasQA" class="qa">
      <myfilters
        class="question-title"
        :title="QAtitle()"
        :content="qaContent"
      />
      <el-form ref="qa" :model="viewData">
        <mybox
          v-for="(item, index) in viewData.qa"
          :key="index"
          :edit-box-show="paperType === 2"
          edit-box-icon="el-icon-refresh"
          edit-box-content="切换"
          @editClick="editClick(item, index, 'qa')"
        >
          <div v-if="paperType === 1 || paperType === 2">
            <div class="question">
              {{ index + 1 }}.【问答】{{ item.itemName }}
            </div>
            <div class="blank-correct">参考答案：</div>
            <div class="blank-answer">{{ item.reference }}</div>
          </div>
          <div v-else-if="paperType === 5">
            <div class="question">
              {{ index + 1 }}.【问答】{{ item.itemName }}
            </div>
            <el-input
              v-model="item.answer"
              type="textarea"
              resize="none"
              :autosize="{ minRows: 5 }"
              placeholder="请输入"
            />
          </div>
          <div v-else class="input-inner-grey">
            <el-row>
              <el-col :span="18">
                <div class="question">
                  {{ index + 1 }}.【问答】{{ item.itemName }}
                </div>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="打分："
                  :prop="'qa.' + index + '.grade'"
                  :rules="gradeRule()"
                  label-width="80px"
                >
                  <el-input v-model.number="item.grade" :readonly="paperType !== 3">
                    <span slot="suffix">分</span>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-input
              v-model="item.answer"
              type="textarea"
              :readonly="true"
              resize="none"
              :autosize="{ minRows: 5 }"
            />
            <div
              class="showAnswer"
              :class="{ 'is-show-answer': item.showAnswer }"
              @click="item.showAnswer = !item.showAnswer"
            >
              显示参考答案
              <i class="el-icon-arrow-down" />
            </div>
            <transition name="fade-transform" mode="out-in">
              <el-input
                v-show="item.showAnswer"
                v-model="item.reference"
                type="textarea"
                :readonly="true"
                resize="none"
                :autosize="{ minRows: 5 }"
              />
            </transition>
          </div>
        </mybox>
      </el-form>
    </div>
  </div>
</template>

<script>
import Mybox from '@/components/Mybox'
import myfilters from '@/components/myfilters'
export default {
  components: {
    myfilters,
    Mybox
  },
  props: {
    // 1-普通查看 2-编辑 3-改卷 4-查看改卷详细 5-答题
    paperType: {
      type: Number,
      default: 1
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      option: {
        A: 'optionA',
        B: 'optionB',
        C: 'optionC',
        D: 'optionD'
      },
      viewData: {
        single: [],
        multiple: [],
        qa: []
      },
      singleContent: null,
      multipleContent: null,
      qaContent: null
    }
  },
  watch: {
    data: {
      handler(val) {
        this.handleData(val)
        this.countScore(val)
      },
      deep: true
    }
  },
  created() {
    this.handleData(this.data)
    this.countScore(this.data)
  },
  methods: {
    // 数据处理
    handleData(data) {
      const newData = JSON.parse(JSON.stringify(data))
      if (!newData.items) {
        return
      }
      newData.items.forEach((item) => {
        if (this.paperType === 2) {
          item.oldId = item.id
        }
        // 转大写
        if (item.itemType === 1 || item.itemType === 2) {
          if (item.reference) {
            item.reference = item.reference.toUpperCase()
          }
          if (item.answer) {
            item.answer = item.answer.toUpperCase()
          }
        }
        if (item.itemType === 1) {
          this.viewData.single.push(item)
        } else if (item.itemType === 2) {
          if (item.reference) {
            item.reference = item.reference.split('')
          }
          if (item.answer) {
            item.answer = item.answer.split('')
          }
          if (this.paperType === 5) {
            item.answer = []
          }
          this.viewData.multiple.push(item)
        } else if (item.itemType === 3) {
          if (this.paperType === 3 || this.paperType === 4) {
            this.$set(item, 'showAnswer', false)
          }
          this.viewData.qa.push(item)
        }
      })
    },
    // 小标题
    countScore(data) {
      if (data.hasSingle) {
        const singleTotal = data.singleNumber * data.singleScore
        this.singleContent = `共${data.singleNumber}题，每题${data.singleScore}分，共${singleTotal}分`
      }
      if (data.hasMultiple) {
        const multipleTotal = data.multipleNumber * data.multipleScore
        this.multipleContent = `共${data.multipleNumber}题，每题${data.multipleScore}分，共${multipleTotal}分`
      }
      if (data.hasQA) {
        const qaTotal = data.qaNumber * data.qaScore
        this.qaContent = `共${data.qaNumber}题，每题${data.qaScore}分，共${qaTotal}分`
      }
    },
    // 切换题目按钮
    editClick(item, index, typeArr) {
      this.$emit('editClick', item, index, typeArr)
    },
    // 改卷提交验证
    gradeRule() {
      var validatePass = (rule, value, callback) => {
        if (value > this.data.qaScore) {
          callback(new Error(`分数不能大于${this.data.qaScore}分`))
        } else {
          callback()
        }
      }
      return [
        { required: true, message: '请进行评分', trigger: 'blur' },
        { type: 'number', message: '分数必须为数字值', trigger: 'blur' },
        { validator: validatePass, trigger: 'blur' }
      ]
    },
    // 问答题标题
    QAtitle() {
      if (this.data.hasMultiple && this.data.hasSingle) {
        return '三、问答题'
      } else if (this.data.hasMultiple || this.data.hasSingle) {
        return '二、问答题'
      } else {
        return '一、问答题'
      }
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.title-top {
  height: 31px;
  font-size: 24px;
  line-height: 31px;
  text-align: center;
  margin-bottom: 14px;
}
.content-top {
  height: 19px;
  font-size: 14px;
  color: rgba(153, 153, 153, 1);
  text-align: center;
  line-height: 19px;
  margin-bottom: 20px;
  span {
    margin-right: 30px;
  }
}
.question {
  font-size: 18px;
  color: rgba(102, 102, 102, 1);
  line-height: 40px;
  height: 40px;
}
.answer {
  font-size: 14px;
  margin-top: 20px;
  margin-left: 5px;
}
.correct {
  color: #29c06d;
  margin-left: 10px;
}
.question-title {
  padding-bottom: 10px;
  margin-top: 30px;
}
.label {
  font-size: 14px;
  display: inline-block;
  width: 60px;
  text-align: end;
  margin-right: 10px;
  color: rgba(158, 174, 195, 1);
}
.content {
  font-size: 14px;
}
.qa {
  .showAnswer {
    margin-top: 20px;
    font-size: 14px;
    color: rgba(64, 158, 255, 1);
    cursor: pointer;
    display: inline-block;
    .el-icon-arrow-down {
      transition: transform 0.2s;
      transform: rotateZ(-90deg);
    }
  }
  .showAnswer.is-show-answer .el-icon-arrow-down {
    transform: rotateZ(0deg);
  }
  .blank-answer {
    font-size: 14px;
    line-height: 24px;
  }
  .blank-correct {
    color: #29c06d;
    margin: 20px 0 10px;
  }
}
::v-deep {
  .content-top-2 .box{
    padding-bottom: 20px;
  }
  .el-radio,
  .el-checkbox {
    display: block;
    font-size: 14px;
    margin-top: 20px;
  }
  .el-textarea {
    margin-top: 20px;
  }
  .check-color {
    .el-radio,
    .el-checkbox,
    .el-radio__input.is-disabled .el-radio__inner,
    .el-checkbox__input.is-disabled .el-checkbox__inner,
    .el-radio__input,
    .el-checkbox__input,
    .el-radio__input.is-disabled .el-radio__inner::after,
    .el-checkbox__input.is-disabled .el-checkbox__inner::after,
    .el-radio__input.is-disabled + span.el-radio__label,
    .el-checkbox__input.is-disabled + span.el-checkbox__label {
      cursor: default;
    }
    .el-radio__input.is-disabled .el-radio__inner,
    .el-checkbox__input.is-disabled .el-checkbox__inner {
      border-color: #dcdfe6;
      background-color: #fff;
    }
    .el-radio__input.is-disabled + span.el-radio__label,
    .el-checkbox__input.is-disabled + span.el-checkbox__label {
      color: #000;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
      border-color: #ff4c4c;
      background: #ff4c4c;
    }
    .green .el-radio__input.is-checked .el-radio__inner,
    .green.is-checked .el-checkbox__inner {
      border-color: #29c06d;
      background: #29c06d;
    }
    .green .el-radio__input.is-checked .el-radio__inner::after,
    .green.is-checked .el-checkbox__inner::after {
      background: #29c06d;
    }
    .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
      border-color: #fff;
    }
    .green .el-radio__input.is-checked + .el-radio__label,
    .green.is-checked .el-checkbox__label {
      color: #29c06d !important;
    }
    .red .el-radio__input.is-checked .el-radio__inner {
      border-color: #ff4c4c;
      background: #ff4c4c;
    }
    .red .el-radio__input.is-checked .el-radio__inner::after {
      background: #ff4c4c;
    }
    .red .el-radio__input.is-checked + .el-radio__label,
    .green .el-checkbox__label {
      color: #ff4c4c !important;
    }
    .green .el-checkbox__label .correct,
    .el-checkbox__input.is-checked + span.el-checkbox__label {
      color: #ff4c4c;
    }
    .green.is-checked .el-checkbox__label .correct {
      color: #29c06d;
    }
  }

  .input-inner-grey .el-textarea__inner {
    background: rgba(246, 246, 246, 1);
  }
  .el-input__suffix {
    right: 10px;
    color: #999;
  }
  .el-input__suffix span {
    display: inline-block;
    width: 25px;
    text-align: center;
  }
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
