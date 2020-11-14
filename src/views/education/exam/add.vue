<template>
  <div>
    <div class="add-left">
      <el-scrollbar style="height:100%">
        <div class="left-main">
          <div class="left-main-title">
            <span>护理部</span>
          </div>
          <el-collapse v-model="activeNames">
            <el-collapse-item v-for="item in tableData" :key="item.department" :name="item.department">
              <template slot="title">
                <i :class="activeNames.includes(item.department)?'el-icon-minus':'el-icon-plus'" class="left-icon" />
                <span class="department">{{ item.department }}</span>
                <transition name="fade-transform" mode="out-in">
                  <span v-show="activeNames.includes(item.department)" class="all-department" @click.stop="allClick(item.children)">全选</span>
                </transition>
              </template>
              <div
                v-for="element in item.children"
                :key="element.name"
                class="nurse"
                :class="form.participants.includes(element.userId)?'nurse-bgc':''"
                @click="addClick(element.userId)"
              >
                <img :src="element.avatar" class="avatar">
                <span class="nurse-name">{{ element.name }}</span>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-scrollbar>
    </div>
    <div class="add-right">
      <div style="height:40px;line-height:40.8px;margin-bottom:20px">
        <span style="font-size:18px;">新建考试计划</span>
        <span style="font-size:12px;color:#999">每项都必须填写</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="参加人员" prop="participants" class="participants">
          <el-select
            v-model="form.participants"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择参加人员"
            popper-class="join-popper"
          >
            <el-option
              v-for="item in options"
              :key="item.userId"
              :label="item.name"
              :value="item.userId"
            />
            <span slot="prefix">{{ joinPrefix }}</span>
          </el-select>
        </el-form-item>
        <el-form-item label="考试名称" prop="examName">
          <el-input
            v-model="form.examName"
            placeholder="请输入考试名称"
          />
        </el-form-item>
        <div class="input-100">
          <el-row v-for="(item,index) in typeOptions" :key="item.number" class="row">
            <el-form-item
              label="题型设置"
              class="form-inline first-item"
              :class="index!==0?'hidden-label':''"
              :prop="item.number"
              :rules="chooseCheck(form[item.type],`${item.name}数量`)"
            >
              <div class="type-inline">
                <el-checkbox v-model="form[item.type]">{{ item.name }}</el-checkbox>
              </div>
              <div class="type-inline">
                <el-input v-model.number="form[item.number]" :disabled="!form[item.type]" />
              </div>
            </el-form-item>
            <el-form-item
              label="题，每题"
              :class="!form[item.type]?'disabled-text':''"
              class="form-inline second-label"
              label-width="70px"
              :prop="item.score"
              :rules="chooseCheck(form[item.type],`${item.name}分数`)"
            >
              <div class="type-inline">
                <el-input v-model.number="form[item.score]" :disabled="!form[item.type]" />
              </div>
              <div class="type-inline" :class="!form[item.type]?'disabled-text':''">
                分，共{{ form[item.score]*form[item.number] }}分
              </div>
            </el-form-item>
            <div v-if="index===0" class="total-score">
              考试满分<span>{{ totalScore() }}</span>分
            </div>
          </el-row>
        </div>
        <div class="input-200">
          <el-row v-for="(item,index) in form.itemBanks" :key="index" class="row">
            <el-form-item
              label="题库设置"
              class="form-inline"
              :class="index!==0?'hidden-label':''"
              style="margin-right:8px"
              :prop="'itemBanks.' + index + '.itemBankId'"
              :rules="{
                required: true, message: '请输入题库名称', trigger: 'change'
              }"
            >
              <remote-select remote-placeholder="请输入题库名称" methods="getQuestionBanks" label="name" query-key="name" @remoteChange="remoteChange($event,index)" />
            </el-form-item>
            <el-form-item
              label="占比"
              class="form-inline second-label"
              label-width="45px"
              :prop="'itemBanks.' + index + '.proportion'"
              :rules="[{required: true, message: '请输入题目占比', trigger: 'blur'},
                       { type: 'number', message: `题目占比必须为数字值` }]"
            >
              <div class="type-inline">
                <el-input v-model.number="item.proportion" placeholder="请输入题目占比">
                  <span slot="suffix">%</span>
                </el-input>
              </div>
              <i class="el-icon-circle-plus-outline examTypes-icon" @click="addExamTypes" />
              <i v-if="index!==0" class="el-icon-delete examTypes-icon" @click="delExamTypes(index)" />
            </el-form-item>
          </el-row>
          <el-form-item label="考试时间" prop="startTime" class="form-inline" style="margin-right:8px">
            <el-date-picker
              v-model="form.startTime"
              :clearable="false"
            />
          </el-form-item>
          <el-form-item
            label="至"
            prop="endTime"
            label-width="45px"
            class="form-inline second-label"
          >
            <el-date-picker
              v-model="form.endTime"
              :clearable="false"
            />
          </el-form-item>
        </div>
      </el-form>
      <div class="add-button">
        <el-button type="primary" :loading="buttonLoading" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import RemoteSelect from '@/components/RemoteSelect'
import api from '@/api'
// import { compareTime } from '@/utils/index'
export default {
  components: {
    RemoteSelect
  },
  data() {
    const validatePass = (rule, value, callback) => {
      // const dis_now = compareTime(value, 0)
      var d = new Date()
      var v = new Date(value)
      const now = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      value = v.getFullYear() + '-' + (v.getMonth() + 1) + '-' + v.getDate()
      // console.log(now, value)
      const dis_now = this.time_dis(now, value)
      if (!dis_now) {
        callback(new Error('时间必须大于当前时间'))
        return
      }
      if (this.form.startTime && this.form.endTime) {
        const dis = this.time_dis(this.form.startTime, this.form.endTime)
        if (!dis) {
          callback(new Error('开始时间必须小于结束时间'))
        } else {
          callback()
        }
      }
    }
    return {
      rules: {
        participants: [
          { type: 'array', required: true, message: '请选择参加人员', trigger: 'change' }
        ],
        examName: [
          { required: true, message: '请输入考试名称', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择考试开始时间', trigger: 'blur' },
          { validator: validatePass, trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择考试结束时间', trigger: 'blur' },
          { validator: validatePass, trigger: 'change' }
        ]
      },
      form: {
        hasSingle: true,
        singleNumber: 20,
        singleScore: 1,
        hasMultiple: false,
        multipleNumber: null,
        multipleScore: null,
        hasQA: false,
        qaNumber: null,
        qaScore: null,
        examName: '',
        participants: [],
        startTime: '',
        endTime: '',
        itemBanks: [
          {
            itemBankId: '',
            proportion: ''
          }
        ]
      },
      buttonLoading: false,
      typeOptions: [
        { number: 'singleNumber', score: 'singleScore', type: 'hasSingle', name: '单选题' },
        { number: 'multipleNumber', score: 'multipleScore', type: 'hasMultiple', name: '多选题' },
        { number: 'qaNumber', score: 'qaScore', type: 'hasQA', name: '问答题' }
      ],
      listLoading: true,
      activeNames: [],
      options: [],
      tableData: [
        {
          department: '护理管理部',
          children: [
            {
              userId: '53bb390b-a296-475e-b420-d33be54598df',
              avatar: require('../../../assets/images/hs2.jpg'),
              name: '王大锤'
            },
            {
              userId: 'f03ec9f5-538d-452f-bc80-8537166732dc',
              avatar: require('../../../assets/images/hs3.jpg'),
              name: '哆咪呀'
            },
            {
              userId: '72fe719f-61f4-46a4-9cb6-a4a268c3032d',
              avatar: require('../../../assets/images/hs5.jpg'),
              name: '小陈'
            }
          ]
        }
      ]
    }
  },
  computed: {
    joinPrefix() {
      return '已选' + this.form.participants.length + '人'
    }
  },
  watch: {
    'form.hasSingle': {
      handler(val) {
        if (!val) {
          this.$refs.form.clearValidate(['singleNumber', 'singleScore'])
        }
      }
    },
    'form.hasMultiple': {
      handler(val) {
        if (!val) {
          this.$refs.form.clearValidate(['multipleNumber', 'multipleScore'])
        }
      }
    },
    'form.hasQA': {
      handler(val) {
        if (!val) {
          this.$refs.form.clearValidate(['qaNumber', 'qaScore'])
        }
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      // api.getEducationPersons().then(response => {
      //   if (response.success) {
      //     console.log('新增考试计划-人员：', response)
      //     this.tableData = response.resData.items
      //     this.listLoading = false
      //   }
      // })
      this.tableData.forEach(item => {
        item.children.forEach(element => {
          this.options.push(element)
        })
      })
    },
    // 题库名称模糊查询
    remoteChange(remote, index) {
      this.form.itemBanks[index].itemBankId = remote
    },
    // 增加题库设置
    addExamTypes() {
      this.form.itemBanks.push({
        itemBankId: '',
        proportion: ''
      })
    },
    // 删除题库设置
    delExamTypes(index) {
      this.form.itemBanks.splice(index, 1)
    },
    // 提交
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.form.hasSingle && !this.form.hasMultiple && !this.form.hasQA) {
            this.$message({
              message: '请至少选择一种题型',
              type: 'warning'
            })
            return
          }
          const total = this.form.itemBanks.reduce(function(prev, next) {
            return prev + next.proportion
          }, 0)
          if (total !== 100) {
            this.$message({
              message: '题目占比相加必须为100%',
              type: 'warning'
            })
            return
          }
          this.buttonLoading = true
          const form = JSON.parse(JSON.stringify(this.form))
          form.participants = []
          this.form.participants.forEach(v => {
            form.participants.push({
              userId: v
            })
          })
          this.typeOptions.forEach(j => {
            if (!form[j.type]) {
              form[j.score] = form[j.number] = 0
            }
          })
          api.postEducation(form).then(response => {
            console.log(response)
            this.buttonLoading = false
            if (response.success) {
              this.$message({
                message: '新建成功',
                type: 'success'
              })
              this.$router.push({
                name: 'examTable'
              })
            }
          })
        }
      })
    },
    // 取消
    onCancel() {
      this.$router.push({
        name: 'examTable'
      })
    },
    // 全选护士
    allClick(children) {
      children.forEach(item => {
        if (!this.form.participants.includes(item.userId)) {
          this.form.participants.push(item.userId)
        }
      })
    },
    // 选择护士
    addClick(userId) {
      if (!this.form.participants.includes(userId)) {
        this.form.participants.push(userId)
      } else {
        const i = this.form.participants.indexOf(userId)
        this.form.participants.splice(i, 1)
      }
    },
    // 计算总分
    totalScore() {
      let total = 0
      if (this.form.hasSingle) {
        total += this.form.singleNumber * this.form.singleScore
      }
      if (this.form.hasMultiple) {
        total += this.form.multipleNumber * this.form.multipleScore
      }
      if (this.form.hasQA) {
        total += this.form.qaNumber * this.form.qaScore
      }
      return total
    },
    // 返回校验规则
    chooseCheck(choose, str) {
      if (choose) {
        return [{ required: true, message: `请输入${str}`, trigger: 'blur' },
          { type: 'number', message: `${str}必须为数字值` }
        ]
      } else {
        return { type: 'number', message: `${str}必须为数字值` }
      }
    },
    // 计算时间间隔
    time_dis(startTime, endTime) {
      const dis = (Date.parse(endTime) - Date.parse(startTime))
      if (dis < 0) return false
      return true
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.add-left {
  height: calc(100vh - 50px);
  box-shadow:0px 2px 4px 0px rgba(0,0,0,0.1);
  background:rgba(240,242,245,1);
  overflow-y: auto;
  width: 15%;
  position: fixed;
}
.add-right {
  margin-left: calc(15% + 30px);
  padding: 30px;
}
.left-main-title{
  height:40px;
  line-height:40.8px;
  font-size: 18px;
  margin-top: 20px;
  margin-left: 20px;
}
.department {
  font-size:14px;
  font-weight:bold;
  color:rgba(0,0,0,1);
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
::v-deep .el-collapse-item__arrow{
  display: none;
}
::v-deep .el-collapse-item__header,
::v-deep .el-collapse-item__wrap{
  background:rgba(240,242,245,1);
  position: relative;
}
::v-deep .el-collapse-item__header {
  margin-left: 20px;
}
::v-deep .el-select__tags {
  width: 90%;
}
.left-icon {
  height: 16px;
  width: 16px;
  text-align: center;
  line-height: 16px;
  font-size: 10px;
  border: 1px solid #999;
  color: #999;
  border-radius: 2px;
  margin-right: 10px;
}
.avatar {
  height:32px;
  border:1px solid rgba(216,216,216,1);
  border-radius: 32px;
  vertical-align: middle;
  margin-right: 10px;
}
.nurse {
  padding-left: 20px;
  height: 44px;
  line-height: 44px;
  cursor: pointer;
  .nurse-name {
  font-size:14px;
  color:rgba(0,0,0,1);
  }
}
.all-department {
  font-size:14px;
  color:rgba(64,158,255,1);
  position: absolute;
  right: 15px;
}
.nurse-bgc {
  background-color: #fff;
}
::v-deep .el-select .el-input__suffix{
  display: none;
}
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
  color: #666;
}
::v-deep .el-select .el-input__prefix {
  right: 13px;
  left: auto;
  color:rgba(175,179,192,1);
}
::v-deep .participants .el-input--prefix .el-input__inner {
  padding-left: 15px;
}
::v-deep .first-item .el-form-item__error {
  left: 80px;
}
.type-inline {
  display: inline-block;
  margin-right: 10px;
}
.row {
  position: relative;
}
::v-deep .hidden-label .el-form-item__label {
  display: none;
}
.add-button {
  padding-left: 80px;
}
::v-deep .el-checkbox__input.is-checked+.el-checkbox__label {
  color: black;
}
::v-deep .second-label .el-form-item__label {
  color: #000;
  text-align: center;
}
::v-deep .second-label.disabled-text .el-form-item__label {
  color: #bbb;
}
::v-deep .el-input__suffix {
  right: 10px;
}
// ::v-deep .disabled-text .el-form-item__error {
//   display: none;
// }
.disabled-text,
::v-deep .el-checkbox__label {
  color: #bbb;
}
.total-score {
  color:#666;
  float: right;
  span {
    font-size: 30px;
    margin: 0 10px;
  }
}
::v-deep .el-tag.el-tag--info {
  background:rgba(236,245,255,1);
  color: #409EFF;
  position: relative;
  padding-right: 17px;
}
::v-deep .el-select .el-tag__close.el-icon-close {
  background:rgba(236,245,255,1);
  color: #409EFF;
  position: absolute;
  right: 0;
  top: 0;
}
.examTypes-icon {
  vertical-align: middle;
  font-size: 22px;
  margin: 0 5px;
  cursor: pointer;
  color: #999;
}
::v-deep .form-inline {
  display: inline-block;
}
::v-deep .input-200 .el-input__inner {
  width: 200px;
}
::v-deep .input-100 .el-input__inner {
  width: 100px;
}
::v-deep .el-form-item__error{
  white-space: nowrap;
}
</style>
<style>
.join-popper {
  display: none;
}
</style>
