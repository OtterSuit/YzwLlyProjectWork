<template>
  <div class="reportForm">
    <el-form ref="form" :model="form">
      <div class="box">
        <el-row style="margin-bottom:16px">
          <span class="title">基本信息</span>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="上报病区" label-width="70px">
              <el-input v-model="form.ward" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="事件编号" label-width="90px">
              <el-input v-model="form.num" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="-- 医院" label-width="60px">
              <el-input v-model="form.hospital" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="-- 护理部" label-width="80px">
              <el-input v-model="form.nursing" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="发生时间" label-width="70px">
              <el-date-picker
                v-model="form.date"
                type="date"
                :clearable="false"
                value-format="yyyy-MM-dd"
                placeholder=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="20px">
              <el-select v-model="form.department" placeholder="">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="科系" label-width="50px">
              <el-input v-model="form.system" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="--" label-width="30px">
              <el-input v-model="form.system1" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="科" label-width="30px">
              <el-input v-model="form.branch" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 患者信息 -->
      <div class="box">
        <el-row style="margin-bottom:16px">
          <span class="title">患者信息</span>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="姓名" label-width="50px">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="性别" label-width="50px">
              <el-select v-model="form.gender" placeholder="">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="年龄" label-width="50px">
              <el-input v-model="form.age" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="床号" label-width="50px">
              <el-input v-model="form.bedNum" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="住院号" label-width="60px">
              <el-input v-model="form.hospitalNum" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <!-- 当事人信息 -->
      <div class="box">
        <el-row style="margin-bottom:16px">
          <span class="title">当事人信息</span>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="层级" label-width="50px">
              <el-select v-model="form.level" placeholder="">
                <el-option label="护士（初级）" value="护士（初级）" />
                <el-option label="护师（初级）" value="护师（初级）" />
                <el-option label="中级主管护师" value="中级主管护师" />
                <el-option label="副主任护师副高级职称" value="副主任护师副高级职称" />
                <el-option label="主任护师正高级职称" value="主任护师正高级职称" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="工作年限" label-width="80px">
              <el-input v-model="form.year">
                <span slot="suffix">年</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="班次" label-width="50px">
              <el-input v-model="form.shift" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注" label-width="50px">
              <el-input v-model="form.remarks" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <!-- 发现人 -->
      <div class="box">
        <el-row style="margin-bottom:16px">
          <span class="title">发现人</span>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-radio v-model="form.finder" label="本人">本人</el-radio>
          </el-col>
          <el-col :span="4">
            <el-radio v-model="form.finder" label="其他护理人员">其他护理人员</el-radio>
          </el-col>
          <el-col :span="4">
            <el-radio v-model="form.finder" label="患者">患者</el-radio>
          </el-col>
          <el-col :span="4">
            <el-radio v-model="form.finder" label="患者家属">患者家属</el-radio>
          </el-col>
          <el-col :span="4">
            <el-radio v-model="form.finder" label="医生">医生</el-radio>
          </el-col>
          <el-col :span="4">
            <el-radio v-model="form.finder" label="其他人员">其他人员</el-radio>
          </el-col>
        </el-row>
      </div>
      <!-- 类别 -->
      <div class="box">
        <el-row style="margin-bottom:16px">
          <span class="title">类别</span>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-cascader
              v-model="form.type"
              style="display:block"
              :options="type"
            />
          </el-col>
        </el-row>
      </div>
      <!-- 级别 -->
      <div class="box">
        <el-row style="margin-bottom:16px">
          <span class="title">级别</span>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-radio v-model="form.grade" label="I级">I级</el-radio>
          </el-col>
          <el-col :span="4">
            <el-radio v-model="form.grade" label="II级">II级</el-radio>
          </el-col>
          <el-col :span="4">
            <el-radio v-model="form.grade" label="III级">III级</el-radio>
          </el-col>
          <el-col :span="4">
            <el-radio v-model="form.grade" label="IV级">IV级</el-radio>
          </el-col>
        </el-row>
      </div>
      <div class="box">
        <el-row style="margin-bottom:16px">
          <span class="title">事件描述</span>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="事件经过" label-width="90px">
              <el-input
                v-model="form.course"
                type="textarea"
                :autosize="{ minRows: 2}"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="造成的影响" label-width="90px">
              <el-input
                v-model="form.affect"
                type="textarea"
                :autosize="{ minRows: 2}"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="处理情况" label-width="90px">
              <el-input
                v-model="form.process"
                type="textarea"
                :autosize="{ minRows: 2}"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="预防措施" label-width="90px">
              <el-input
                v-model="form.provision"
                type="textarea"
                :autosize="{ minRows: 2}"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div>
      <el-button type="primary" @click="onSubmit">提交上报信息</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      options: [{
        value: '内科'
      }, {
        value: '外科'
      }, {
        value: '儿科'
      }, {
        value: '妇科'
      }, {
        value: '男科'
      }],
      type: [
        {
          value: '不良治疗',
          label: '不良治疗',
          children: [
            {
              value: '给药错误',
              label: '给药错误'
            },
            {
              value: '输血错误',
              label: '输血错误'
            },
            {
              value: '医疗感染暴发',
              label: '医疗感染暴发'
            },
            {
              value: '手术身份部位识别错误',
              label: '手术身份部位识别错误'
            },
            {
              value: '体内遗留手术器械',
              label: '体内遗留手术器械'
            },
            {
              value: '输液输血反应',
              label: '输液输血反应'
            }
          ]
        },
        {
          value: '意外事件',
          label: '意外事件',
          children: [
            {
              value: '跌倒',
              label: '跌倒'
            },
            {
              value: '坠床',
              label: '坠床'
            },
            {
              value: '走失',
              label: '走失'
            },
            {
              value: '烫伤',
              label: '烫伤'
            },
            {
              value: '烧伤',
              label: '烧伤'
            },
            {
              value: '自残',
              label: '自残'
            },
            {
              value: '自杀',
              label: '自杀'
            },
            {
              value: '火灾',
              label: '火灾'
            },
            {
              value: '失窃',
              label: '失窃'
            },
            {
              value: '喷破体温表',
              label: '喷破体温表'
            },
            {
              value: '约束不良',
              label: '约束不良'
            }
          ]
        },
        {
          value: '医患沟通事件',
          label: '医患沟通事件',
          children: [
            {
              value: '医患争吵',
              label: '医患争吵'
            },
            {
              value: '身体攻击',
              label: '身体攻击'
            },
            {
              value: '打架',
              label: '打架'
            },
            {
              value: '暴力行为',
              label: '暴力行为'
            }
          ]
        },
        {
          value: '饮食、皮肤护理不良事件',
          label: '饮食、皮肤护理不良事件',
          children: [
            {
              value: '误吸/室息',
              label: '误吸/室息'
            },
            {
              value: '咽入异物',
              label: '咽入异物'
            },
            {
              value: '院内压疮',
              label: '院内压疮'
            },
            {
              value: '医源性皮肤损伤',
              label: '医源性皮肤损伤'
            }
          ]
        },
        {
          value: '不良辅助诊查、病人转运事件',
          label: '不良辅助诊查、病人转运事件',
          children: [
            {
              value: '身份识别错误',
              label: '身份识别错误'
            },
            {
              value: '标本丢失',
              label: '标本丢失'
            },
            {
              value: '检查或运送中或后病情突变或出现意外',
              label: '检查或运送中或后病情突变或出现意外'
            }
          ]
        },
        {
          value: '管道护理不良事件',
          label: '管道护理不良事件',
          children: [
            {
              value: '管道滑脱',
              label: '管道滑脱'
            },
            {
              value: '病人自拔',
              label: '病人自拔'
            }
          ]
        },
        {
          value: '职业暴露',
          label: '职业暴露',
          children: [
            {
              value: '医护人员针刺伤',
              label: '医护人员针刺伤'
            },
            {
              value: '医护人员割伤',
              label: '医护人员割伤'
            }
          ]
        },
        {
          value: '公共设施事件',
          label: '公共设施事件',
          children: [
            {
              value: '医院建筑毁损',
              label: '医院建筑毁损'
            },
            {
              value: '病房设施故障',
              label: '病房设施故障'
            },
            {
              value: '蓄意破坏',
              label: '蓄意破坏'
            },
            {
              value: '有害物质泄露',
              label: '有害物质泄露'
            }
          ]
        },
        {
          value: '医疗设备器械事件',
          label: '医疗设备器械事件',
          children: [
            {
              value: '医疗材料故障',
              label: '医疗材料故障'
            },
            {
              value: '仪器故障',
              label: '仪器故障'
            },
            {
              value: '器械不符合无菌要求',
              label: '器械不符合无菌要求'
            }
          ]
        },
        {
          value: '供应室不良事件',
          label: '供应室不良事件',
          children: [
            {
              value: '消毒物品未达要求',
              label: '消毒物品未达要求'
            },
            {
              value: '热源试验阳性',
              label: '热源试验阳性'
            },
            {
              value: '操作中发现器械包器械物品不符',
              label: '操作中发现器械包器械物品不符'
            }
          ]
        }
      ]
    }
  },
  created() {
    if (this.$route.params.form) {
      this.form = this.$route.params.form
    }
  },
  methods: {
    onSubmit() {
      this.$router.back(-1)
      this.$message({
        message: '提交成功',
        type: 'success'
      })
    }
  }
}
</script>
<style>
.reportForm .el-radio__input .el-radio__inner,.reportForm  .el-checkbox__input .el-checkbox__inner {
  border-radius: 0;
  background-color: #edf2fc;
  border-color: #DCDFE6;
}
.reportForm .el-radio__input .el-radio__inner::after {
  width: 4px;
  height: 8px;
  border-radius: 0;
}
.reportForm .el-radio__input.is-checked .el-radio__inner::after, .reportForm .el-checkbox__input.is-checked .el-checkbox__inner::after {
  background-color: #edf2fc;
  border: 1px solid #666;
  border-left: 0;
  border-top: 0;
  transform: rotate(45deg) scaleY(1);
  top: 1px;
  left: 4px;
}
</style>
<style lang="scss" type="text/scss" scoped>

.box {
  background:rgba(255,255,255,1);
  box-shadow:4px 4px 40px 0px rgba(0,0,0,0.05);
  border-radius:6px;
  padding: 20px 30px;
  margin-bottom: 20px;
  position: relative;
}
.reportForm {
  background-color:#F0F2F5;
  padding: 30px;
  // padding-bottom: 0;
}
.unit {
  display: block;
  font-size: 14px;
  padding-left: 5px;
  color: #606266;
  line-height: 40px;
  height: 40px;
}
.title {
  font-size:18px;
  line-height:24px;
  color: rgba(153, 153, 153, 1);
}
::v-deep .el-form-item__label {
  font-weight: normal;
}
::v-deep .el-input__suffix {
  right: 10px;
  color: #C0C4CC;
}
.el-input__suffix span {
  display: inline-block;
  width: 25px;
  text-align: center;
}
</style>
