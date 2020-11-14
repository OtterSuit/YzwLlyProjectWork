<template>
  <div v-loading="listLoading" class="preview-container">
    <div id="qrcode" class="preview-qrcode">
      <my-qrcode :text="url" />
      <div>
        <span>扫码填单</span>
        <span class="save-qrcode" @click="download">保存二维码</span>
      </div>
    </div>
    <el-row>
      <el-col :span="12" :offset="6" class="preview-main">
        <div class="title">{{ data.name }}</div>
        <div style="margin-bottom: 20px">
          <div
            v-for="(item, index) in instructionsArr"
            :key="item + index"
            class="content"
          >
            <div v-if="item !== ''">
              <div
                v-if="index !== 0 && instructionsArr[index - 1] === ''"
                class="indentText"
              >
                {{ item }}
              </div>
              <div v-else>
                {{ item }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="data.targetType === 1">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item
              v-if="satisfactionData.includes('1')"
              label="您的姓名"
            >
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item
              v-if="satisfactionData.includes('2')"
              label="您的性别"
            >
              <el-radio-group v-model="form.gender">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              v-if="satisfactionData.includes('3')"
              label="您的年龄"
            >
              <el-input v-model="form.age">
                <span slot="suffix">岁</span>
              </el-input>
            </el-form-item>
            <el-form-item
              v-if="satisfactionData.includes('4')"
              label="您的科室"
            >
              <el-input v-model="form.department" />
            </el-form-item>
            <el-form-item
              v-if="satisfactionData.includes('5')"
              label="联系电话"
            >
              <el-input v-model="form.phone" />
            </el-form-item>
          </el-form>
        </div>
        <div v-for="(item, index) in questionData" :key="item.title">
          <div class="type-title">
            {{ numberChinese(index) }}、{{ item.title }}
          </div>
          <div v-for="(element, i) in item.question" :key="element.name + i">
            <div class="question">{{ i + 1 }}、{{ element.name }}</div>
            <div v-if="element.type === 1" class="answer">
              <el-radio-group v-model="element.answer">
                <el-radio :label="1">很满意</el-radio>
                <el-radio :label="2">满意</el-radio>
                <el-radio :label="3">一般</el-radio>
                <el-radio :label="4">不满意</el-radio>
              </el-radio-group>
            </div>
            <div v-else-if="element.type === 2" class="input-answer">
              <el-input
                v-model="element.answer"
                type="textarea"
                resize="none"
                :autosize="{ minRows: 10 }"
                placeholder="请输入"
              />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '@/api'
import MyQrcode from '@/components/MyQrcode/index'
import { downloadImg } from '@/utils/index'
export default {
  components: {
    MyQrcode
  },
  data() {
    return {
      listLoading: true,
      satisfactionData: [],
      instructionsArr: [],
      questionData: [],
      data: {},
      form: {},
      url: null
    }
  },
  created() {
    this.url = `http://${window.location.host}/#/survey?id=${this.$route.params.id}`
    this.fetchData()
  },
  // mounted() {
  //   this.creatQrCode()
  // },
  methods: {
    fetchData() {
      this.listLoading = true
      api
        .getSatisfactionById({ id: this.$route.params.id })
        .then((response) => {
          if (response.success) {
            console.log('预览:', response)
            this.data = response.resData
            this.instructionsArr = response.resData.explanation
              ? response.resData.explanation.split(' ')
              : ['']
            this.satisfactionData = response.resData.patientSituation
              ? response.resData.patientSituation.split('|')
              : ['']
            this.handleData(response.resData.questions)
            this.listLoading = false
          }
        })
    },
    // 数据处理
    handleData(arr) {
      arr.forEach((v) => {
        const obj = {
          detailId: v.id,
          name: v.name,
          answer: null,
          type: v.type
        }
        let index
        const bool = this.questionData.some((j, i) => {
          if (j.title === v.title) {
            index = i
          }
          return j.title === v.title
        })
        if (bool) {
          this.questionData[index].question.push(obj)
        } else {
          this.questionData.push({
            title: v.title,
            question: [obj]
          })
        }
      })
    },
    numberChinese(num) {
      const chinese = {
        0: '一',
        1: '二',
        2: '三',
        3: '四'
      }
      return chinese[num]
    },
    // 保存图片
    download() {
      const imgdata = document.getElementById('qrcode').firstChild.lastChild.src
      downloadImg('jpg', imgdata, this.data.name)
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.preview-container {
  min-height: calc(100vh - 84px);
  background-color: #f0f2f5;
}
.preview-main {
  background-color: #fff;
  min-height: calc(100vh - 84px);
  padding: 30px 20px;
}
.preview-qrcode {
  position: fixed;
  z-index: 1;
  top: 104px;
  transition: all .28s;
  span {
    font-size: 14px;
    display: inline-block;
    line-height: 20px;
  }
  .save-qrcode {
    float: right;
    cursor: pointer;
    &:hover {
      color: #409EFF;
    }
  }
}
.openSidebar .preview-qrcode {
  left: calc(210px + 9vw - 21px);
}
.hideSidebar .preview-qrcode {
  left: calc(50px + 9vw - 5px);
}
.title {
  height: 31px;
  font-size: 24px;
  text-align: center;
  line-height: 31px;
  margin-bottom: 25px;
}
.content {
  font-size: 14px;
  line-height: 24px;
}
::v-deep .el-input__suffix {
  right: 10px;
}
.el-input__suffix span {
  display: inline-block;
  width: 25px;
  text-align: center;
}
.type-title {
  height: 24px;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 20px;
}
.question {
  font-size: 14px;
  margin-left: 37px;
  margin-bottom: 15px;
}
.answer {
  margin-left: 60px;
  margin-bottom: 20px;
}
.input-answer {
  margin-left: 37px;
  margin-bottom: 20px;
}
.preview-button {
  margin-left: 37px;
}
.indentText {
  text-indent: 28px;
}
</style>
