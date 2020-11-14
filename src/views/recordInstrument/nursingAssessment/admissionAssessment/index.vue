<template>
  <div class="main">
    <table border="1" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <th colspan="6">社会信息内容</th>
        </tr>
        <tr>
          <td colspan="6">
            <div style="display:flex">
              <div class="flex">
                <span>联系电话：{{ form.phone }}</span>
              </div>
              <div class="flex">
                <span>身份证：{{ form.idCard }}</span>
              </div>
              <div class="flex">
                <span>职业：{{ form.occupation }}</span>
              </div>
              <div class="flex">
                <span>宗教：{{ form.religion }}</span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="6">
            <div style="display:flex">
              <div class="flex">
                <span>家庭地址：{{ form.address }}</span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="6">
            <div style="display:flex">
              <div class="flex">
                <span>紧急联系人：{{ form.urgency }}</span>
              </div>
              <div class="flex">
                <span>与紧急联系人关系：{{ form.relation }}</span>
              </div>
              <div class="flex">
                <span>紧急联系人电话：{{ form.urgencyPhone }}</span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th colspan="6">护理评估</th>
        </tr>
        <tr>
          <td colspan="1" style="width:100px">意识</td>
          <td colspan="5">
            <div style="display:flex">
              <div class="flex">
                <el-radio v-model="form.radio1" label="1" disabled>清醒</el-radio>
                <el-radio v-model="form.radio1" label="2" disabled>嗜睡</el-radio>
                <el-radio v-model="form.radio1" label="3" disabled>意识模糊</el-radio>
                <el-radio v-model="form.radio1" label="4" disabled>昏睡</el-radio>
                <el-radio v-model="form.radio1" label="5" disabled>浅昏迷</el-radio>
                <el-radio v-model="form.radio1" label="6" disabled>深昏迷</el-radio>
                <el-radio v-model="form.radio1" label="7" disabled>谵妄</el-radio>
                <el-radio v-model="form.radio1" label="8" disabled>镇静</el-radio>
                <el-radio v-model="form.radio1" label="9" disabled>痴呆</el-radio>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="1">语言能力</td>
          <td colspan="5">
            <div style="display:flex">
              <div class="flex">
                <el-radio v-model="form.radio2" label="1" disabled>正常</el-radio>
                <el-radio v-model="form.radio2" label="2" disabled>沟通障碍</el-radio>
                <el-radio v-model="form.radio2" label="3" disabled>失语</el-radio>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="1">视力</td>
          <td colspan="5">
            <div style="display:flex">
              <div class="flex">
                <span>
                  <el-radio v-model="form.radio3" label="1" disabled>正常</el-radio>
                  <el-radio v-model="form.radio3" label="2" disabled style="margin-right:0">异常</el-radio>
                  <span class="content" style="width:50%">{{ form.detail1 }}</span>
                </span>
              </div>
              <div class="flex">
                <span>听力：
                  <el-radio v-model="form.radio4" label="1" disabled>正常</el-radio>
                  <el-radio v-model="form.radio4" label="2" disabled style="margin-right:0">异常</el-radio>
                  <span class="content" style="width:50%">{{ form.detail2 }}</span>
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="1">口腔黏膜</td>
          <td colspan="5">
            <div style="display:flex">
              <div class="flex">
                <span>
                  <el-radio v-model="form.radio5" label="1" disabled>完好</el-radio>
                  <el-radio v-model="form.radio5" label="2" disabled>破损</el-radio>
                  <el-radio v-model="form.radio5" label="3" disabled style="margin-right:0">其他</el-radio>
                  <span class="content" style="width:50%">{{ form.detail3 }}</span>
                </span>
              </div>
              <div class="flex">
                <span>义齿：
                  <el-radio v-model="form.radio6" label="1" disabled>无</el-radio>
                  <el-radio v-model="form.radio6" label="2" disabled>有</el-radio>
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td rowspan="2" colspan="1">皮肤</td>
          <td colspan="5">
            <div style="display:flex">
              <div class="flex">
                <span>
                  <el-radio v-model="form.radio7" label="1" disabled>完好</el-radio>
                  <el-radio v-model="form.radio7" label="2" disabled style="margin-right:0">异常</el-radio>
                  <span class="content" style="width:60%">{{ form.detail4 }}</span>
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <div style="display:flex">
              <div class="flex">
                <span>压疮高危
                  <el-radio v-model="form.radio8" label="1" disabled>是</el-radio>
                  <el-radio v-model="form.radio8" label="2" disabled>否</el-radio>
                </span>
              </div>
              <div class="flex">
                <span>压疮评分
                  <span class="content" style="width:60%">{{ form.detail5 }}</span>（附表一）
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td rowspan="2" colspan="1">排泄情况</td>
          <td colspan="5">
            <div style="display:flex">
              <div class="flex">
                <span>小便：
                  <el-radio v-model="form.radio9" label="1" disabled>正常</el-radio>
                  <el-radio v-model="form.radio9" label="2" disabled>血尿</el-radio>
                  <el-radio v-model="form.radio9" label="3" disabled>蛋白尿</el-radio>
                  <el-radio v-model="form.radio9" label="4" disabled>失禁</el-radio>
                  <el-radio v-model="form.radio9" label="5" disabled>尿潴留</el-radio>
                  <el-radio v-model="form.radio9" label="6" disabled>保留尿管</el-radio>
                  <el-radio v-model="form.radio9" label="7" disabled>造口</el-radio>
                  <el-radio v-model="form.radio9" label="8" disabled>少尿</el-radio>
                  <el-radio v-model="form.radio9" label="9" disabled>多尿</el-radio>
                  <el-radio v-model="form.radio9" label="10" disabled>尿频</el-radio>
                  <el-radio v-model="form.radio9" label="11" disabled>尿急</el-radio>
                  <el-radio v-model="form.radio9" label="12" disabled>尿痛</el-radio>
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <div style="display:flex">
              <div class="flex">
                <span>大便：
                  <el-radio v-model="form.radio10" label="1" disabled>正常</el-radio>
                  <el-radio v-model="form.radio10" label="2" disabled>失禁</el-radio>
                  <el-radio v-model="form.radio10" label="3" disabled style="margin-right:0">腹泻</el-radio>
                  <span class="content" style="width:2%">{{ form.detail6 }}</span>次/日
                  <el-radio v-model="form.radio10" label="4" disabled style="margin-left:10px">便秘</el-radio>
                  <el-radio v-model="form.radio10" label="5" disabled>便血</el-radio>
                  <el-radio v-model="form.radio10" label="6" disabled>人工肛门</el-radio>
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="1">舒适</td>
          <td colspan="5">
            <div style="display:flex">
              <div class="flex">
                <span>疼痛：
                  <el-radio v-model="form.radio11" label="1" disabled>无</el-radio>
                  <el-radio v-model="form.radio11" label="2" disabled style="margin-right:0">有</el-radio>
                  （部位<span class="content" style="width:30%">{{ form.detail7 }}</span>）
                  其他<span class="content" style="width:30%">{{ form.detail8 }}</span>
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="1">心理状态</td>
          <td colspan="5">
            <div style="display:flex">
              <div class="flex">
                <span>
                  <el-radio v-model="form.radio12" label="1" disabled>稳定</el-radio>
                  <el-radio v-model="form.radio12" label="2" disabled>焦虑</el-radio>
                  <el-radio v-model="form.radio12" label="3" disabled>紧张</el-radio>
                  <el-radio v-model="form.radio12" label="4" disabled>恐惧</el-radio>
                  <el-radio v-model="form.radio12" label="5" disabled style="margin-right:0">其他</el-radio>
                  <span class="content" style="width:60%">{{ form.detail9 }}</span>
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="1">自理能力</td>
          <td colspan="5">
            <div style="display:flex">
              <div class="flex">
                <span>
                  <el-radio v-model="form.radio13" label="1" disabled>完全自理</el-radio>
                  <el-radio v-model="form.radio13" label="2" disabled>部份依赖</el-radio>
                  <el-radio v-model="form.radio13" label="3" disabled>完全依赖</el-radio>
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="1">生活习惯</td>
          <td colspan="5">
            <div style="display:flex">
              <div class="flex">
                <span>吸烟：
                  <el-radio v-model="form.radio14" label="1" disabled>否</el-radio>
                  <el-radio v-model="form.radio14" label="2" disabled>是</el-radio>
                </span>
              </div>
              <div class="flex">
                <span>饮酒：
                  <el-radio v-model="form.radio15" label="1" disabled>否</el-radio>
                  <el-radio v-model="form.radio15" label="2" disabled>是</el-radio>
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="1">睡眠</td>
          <td colspan="5">
            <div style="display:flex">
              <div class="flex">
                <span>
                  <el-radio v-model="form.radio16" label="1" disabled>正常</el-radio>
                  <el-radio v-model="form.radio16" label="2" disabled>多梦</el-radio>
                  <el-radio v-model="form.radio16" label="3" disabled>易醒</el-radio>
                </span>
              </div>
              <div class="flex">
                <span>药物辅助睡眠：
                  <el-radio v-model="form.radio17" label="1" disabled>无</el-radio>
                  <el-radio v-model="form.radio17" label="2" disabled style="margin-right:0">有</el-radio>
                  <span class="content" style="width:30%">{{ form.detail10 }}</span>
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="1">既往史</td>
          <td colspan="5">
            <div style="display:flex">
              <div class="flex">
                <span>
                  <el-checkbox-group v-model="form.checkbox1">
                    <el-checkbox label="1" disabled>高血压</el-checkbox>
                    <el-checkbox label="2" disabled>心脏病</el-checkbox>
                    <el-checkbox label="3" disabled>糖尿病</el-checkbox>
                    <el-checkbox label="4" disabled>脑血管病</el-checkbox>
                    <el-checkbox label="5" disabled>手术史</el-checkbox>
                    <el-checkbox label="6" disabled>精神病</el-checkbox>
                    <el-checkbox label="7" disabled>无</el-checkbox>
                    <el-checkbox label="8" disabled style="margin-right:0">其他</el-checkbox>
                    <span class="content" style="width:20%">{{ form.detail11 }}</span>
                  </el-checkbox-group>
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="1">过敏史</td>
          <td colspan="5">
            <div style="display:flex">
              <div class="flex">
                <span>
                  <el-radio v-model="form.radio18" label="1" disabled>无</el-radio>
                  <el-radio v-model="form.radio18" label="2" disabled style="margin-right:0">有：</el-radio>
                  药物<span class="content" style="width:20%">{{ form.detail12 }}</span>
                  食物<span class="content" style="width:20%">{{ form.detail13 }}</span>
                  其他<span class="content" style="width:20%">{{ form.detail14 }}</span>
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="6">
            <div style="display:flex">
              <div class="flex">
                <span>跌倒/坠床风险评估：跌倒/坠床高危
                  <el-radio v-model="form.radio19" label="1" disabled>是</el-radio>
                  <el-radio v-model="form.radio19" label="2" disabled>否</el-radio>
                  评估得分<span class="content" style="width:20%">{{ form.detail15 }}</span>（附表二）
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="6">
            <div style="display:flex">
              <div class="flex">
                <span>医疗费用：
                  <el-radio v-model="form.radio20" label="1" disabled>自费</el-radio>
                  <el-radio v-model="form.radio20" label="2" disabled>医保</el-radio>
                  <el-radio v-model="form.radio20" label="3" disabled>农合</el-radio>
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th colspan="6">入院宣教</th>
        </tr>
        <tr>
          <td colspan="6">
            <div style="display:flex">
              <div class="flex">
                <span>宣教：
                  <el-checkbox-group v-model="form.checkbox2">
                    <el-checkbox label="1" disabled>主管医生</el-checkbox>
                    <el-checkbox label="2" disabled>责任护士</el-checkbox>
                    <el-checkbox label="3" disabled>科主任</el-checkbox>
                    <el-checkbox label="4" disabled>护士长</el-checkbox>
                    <el-checkbox label="5" disabled>病房环境</el-checkbox>
                    <el-checkbox label="6" disabled>病房制度</el-checkbox>
                    <el-checkbox label="7" disabled>陪伴、探视制度</el-checkbox>
                    <el-checkbox label="8" disabled>健康指导</el-checkbox>
                  </el-checkbox-group>
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="6">
            <div style="display:flex">
              <div class="flex">
                <span>其他：{{ form.detail16 }}</span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>评估内容</td>
          <td>1分</td>
          <td>2分</td>
          <td>3分</td>
          <td>4分</td>
          <td>得分</td>
        </tr>
        <tr>
          <td>神经敏感度</td>
          <td>完全无知觉</td>
          <td>较为受限</td>
          <td>轻度受限</td>
          <td>不受限</td>
          <td>{{ form.point1 }}</td>
        </tr>
        <tr>
          <td>潮湿</td>
          <td>持久潮湿</td>
          <td>频繁潮湿</td>
          <td>偶尔潮湿</td>
          <td>几乎不潮湿</td>
          <td>{{ form.point2 }}</td>
        </tr>
        <tr>
          <td>活动</td>
          <td>卧床</td>
          <td>限于轮椅</td>
          <td>偶尔走动</td>
          <td>经常走动</td>
          <td>{{ form.point3 }}</td>
        </tr>
        <tr>
          <td>移动</td>
          <td>完全受限</td>
          <td>较为受限</td>
          <td>轻度受限</td>
          <td>不受限</td>
          <td>{{ form.point4 }}</td>
        </tr>
        <tr>
          <td>营养</td>
          <td>非常缺乏</td>
          <td>可能不足</td>
          <td>较充足</td>
          <td>充足</td>
          <td>{{ form.point5 }}</td>
        </tr>
        <tr>
          <td>摩擦/剪切力</td>
          <td>存在</td>
          <td>潜在</td>
          <td>不存在</td>
          <td />
          <td>{{ form.point6 }}</td>
        </tr>
        <tr>
          <td colspan="4">轻度危险：15~18分；中度危险13~14分<br>高度危险：10~12分；极度危险：9分以下</td>
          <td>总分</td>
          <td>{{ form.total }}</td>
        </tr>
      </tbody>
    </table>
    <div class="operation">
      <el-popconfirm
        v-show="form.status==='1'"
        icon-color="green"
        title="确认通过吗"
        @onConfirm="handlePass"
      >
        <el-button
          slot="reference"
          class="success-color"
          icon="el-icon-success"
        >通过
        </el-button>
      </el-popconfirm>
      <el-popconfirm
        v-show="form.status==='1'"
        icon-color="red"
        title="确认驳回吗"
        @onConfirm="handleReject"
      >
        <el-button
          slot="reference"
          class="error-color"
          icon="el-icon-error"
        >驳回</el-button>
      </el-popconfirm>
      <el-popconfirm
        v-show="form.status==='2'||form.status==='3'"
        icon-color="red"
        title="确认删除吗"
        @onConfirm="handleDelete"
      >
        <el-button
          slot="reference"
          class="normal-color"
          icon="el-icon-delete"
        >删除</el-button>
      </el-popconfirm>
    </div>
  </div>
</template>

<script>
// import { getAdmissionAssessment } from '@/api/recordInstrument/nursingAssessment'

export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          id: '',
          name: '',
          gender: '',
          age: '',
          department: '',
          diagnose: '',
          bedNum: '',
          hospitalNum: '',
          date: '',
          occupation: '',
          culture: '',
          marriage: '',
          way: ''
        }
      }
    }
  },
  data() {
    return {
      // tableData: [],
      form: {}
    }
  },
  watch: {
    info: {
      handler: function(val, oldval) {
        this.changeData()
      },
      deep: true
    }
  },
  created() {
    this.changeData()
  },
  methods: {
    changeData() {
      if (this.info.example) {
        this.form = {
          phone: '/',
          idCard: '/',
          occupation: '/',
          religion: '/',
          address: '/',
          urgency: '/',
          relation: '/',
          urgencyPhone: '/',
          radio1: '/',
          radio2: '/',
          radio3: '/',
          radio4: '/',
          radio5: '/',
          radio6: '/',
          radio7: '/',
          radio8: '/',
          radio9: '/',
          radio10: '/',
          radio11: '/',
          radio12: '/',
          radio13: '/',
          radio14: '/',
          radio15: '/',
          radio16: '/',
          radio17: '/',
          radio18: '/',
          radio19: '/',
          radio20: '/',
          radio21: '/',
          radio22: '/',
          checkbox1: [],
          checkbox2: [],
          detail1: '/',
          detail2: '/',
          detail3: '/',
          detail4: '/',
          detail5: '/',
          detail6: '/',
          detail7: '/',
          detail8: '/',
          detail9: '/',
          detail10: '/',
          detail11: '/',
          detail12: '/',
          detail13: '/',
          detail14: '/',
          detail15: '/',
          detail16: '/',
          point1: '/',
          point2: '/',
          point3: '/',
          point4: '/',
          point5: '/',
          point6: '/',
          total: '/'
        }
      } else {
        this.form = {
          phone: '13712345678',
          idCard: '44030119991231111X',
          occupation: '法师',
          religion: '中国共产党',
          address: '广东省广州市黄埔区美丽人间',
          urgency: '郭秀兰',
          relation: '母子',
          urgencyPhone: '13812345678',
          status: '1',
          radio1: '1',
          radio2: '1',
          radio3: '1',
          radio4: '1',
          radio5: '1',
          radio6: '1',
          radio7: '1',
          radio8: '1',
          radio9: '1',
          radio10: '1',
          radio11: '1',
          radio12: '1',
          radio13: '1',
          radio14: '1',
          radio15: '1',
          radio16: '1',
          radio17: '1',
          radio18: '1',
          radio19: '1',
          radio20: '1',
          radio21: '1',
          radio22: '1',
          checkbox1: ['1', '2', '3', '4'],
          checkbox2: ['1', '2', '3', '4'],
          detail1: '',
          detail2: '',
          detail3: '',
          detail4: '',
          detail5: 10,
          detail6: 3,
          detail7: '',
          detail8: '',
          detail9: '',
          detail10: '',
          detail11: '',
          detail12: '',
          detail13: '',
          detail14: '',
          detail15: 10,
          detail16: '',
          point1: '1',
          point2: '1',
          point3: '1',
          point4: '1',
          point5: '1',
          point6: '1',
          total: '6'
        }
      }
    },
    handlePass(index, row) {
      this.form.status = '2'
      this.$message({
        message: '通过成功',
        type: 'success'
      })
    },
    handleReject(index, row) {
      this.$message({
        message: '驳回成功',
        type: 'success'
      })
      this.form.status = '3'
    },
    handleDelete(index, row) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    tableStyle() {
      return {
        textAlign: 'center'
      }
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.main {
  position: relative;
  .flex {
    text-align: left;
    padding-left: 10px;
    flex: 1;
    // line-height: 45px;
  }
  span {
    font-size: 14px;
    color: #666;
  }
  .content {
    display: inline-block;
    text-align: center;
    border-bottom: 1px solid #999;
  }
}
.operation {
  margin-top: 10px;
  text-align: center;
}
table {
  width: 100%;
  margin: 0 auto;
  font-size: 14px;
  border-color: #ccc;
}
tbody {
  color: #606266;
}
tr {
  height: 45px;
}
td {
  text-align: center;
}
.el-radio {
  margin-right: 15px;
}
.el-checkbox-group {
  display: inline;
}
</style>
