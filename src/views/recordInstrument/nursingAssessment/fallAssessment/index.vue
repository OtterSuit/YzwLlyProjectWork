<template>
  <div class="main">
    <table border="1" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <td colspan="12" class="textLeft">评估时机：新入院/转科时所有患者；病情变化时随时评估</td>
        </tr>
        <tr>
          <td colspan="3">日期</td>
          <td style="width:90px">{{ tableData[0].date }}</td>
          <td style="width:90px">{{ tableData[1].date }}</td>
          <td style="width:90px">{{ tableData[2].date }}</td>
          <td style="width:90px">{{ tableData[3].date }}</td>
          <td style="width:90px">{{ tableData[4].date }}</td>
          <td style="width:90px">{{ tableData[5].date }}</td>
          <td style="width:90px">{{ tableData[6].date }}</td>
          <td style="width:90px">{{ tableData[7].date }}</td>
          <td style="width:90px">{{ tableData[8].date }}</td>
        </tr>
        <tr>
          <td colspan="3">时间</td>
          <td>{{ tableData[0].time }}</td>
          <td>{{ tableData[1].time }}</td>
          <td>{{ tableData[2].time }}</td>
          <td>{{ tableData[3].time }}</td>
          <td>{{ tableData[4].time }}</td>
          <td>{{ tableData[5].time }}</td>
          <td>{{ tableData[6].time }}</td>
          <td>{{ tableData[7].time }}</td>
          <td>{{ tableData[8].time }}</td>
        </tr>
        <tr>
          <td style="width:50px" />
          <td>跌倒/坠床风险因素</td>
          <td style="width:50px">评分</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td>1</td>
          <td class="textLeft">3个月内有跌倒史</td>
          <td>0/1</td>
          <td>{{ tableData[0].score1 }}</td>
          <td>{{ tableData[1].score1 }}</td>
          <td>{{ tableData[2].score1 }}</td>
          <td>{{ tableData[3].score1 }}</td>
          <td>{{ tableData[4].score1 }}</td>
          <td>{{ tableData[5].score1 }}</td>
          <td>{{ tableData[6].score1 }}</td>
          <td>{{ tableData[7].score1 }}</td>
          <td>{{ tableData[8].score1 }}</td>
        </tr>
        <tr>
          <td>2</td>
          <td class="textLeft">意识障碍（嗜睡谵妄/幻觉/幻听/痴呆）</td>
          <td>0/1</td>
          <td>{{ tableData[0].score2 }}</td>
          <td>{{ tableData[1].score2 }}</td>
          <td>{{ tableData[2].score2 }}</td>
          <td>{{ tableData[3].score2 }}</td>
          <td>{{ tableData[4].score2 }}</td>
          <td>{{ tableData[5].score2 }}</td>
          <td>{{ tableData[6].score2 }}</td>
          <td>{{ tableData[7].score2 }}</td>
          <td>{{ tableData[8].score2 }}</td>
        </tr>
        <tr>
          <td>3</td>
          <td class="textLeft">感觉缺失（黑朦/视物异常/聋等）</td>
          <td>0/1</td>
          <td>{{ tableData[0].score3 }}</td>
          <td>{{ tableData[1].score3 }}</td>
          <td>{{ tableData[2].score3 }}</td>
          <td>{{ tableData[3].score3 }}</td>
          <td>{{ tableData[4].score3 }}</td>
          <td>{{ tableData[5].score3 }}</td>
          <td>{{ tableData[6].score3 }}</td>
          <td>{{ tableData[7].score3 }}</td>
          <td>{{ tableData[8].score3 }}</td>
        </tr>
        <tr>
          <td>4</td>
          <td class="textLeft">眩晕/体位性低血压</td>
          <td>0/1</td>
          <td>{{ tableData[0].score4 }}</td>
          <td>{{ tableData[1].score4 }}</td>
          <td>{{ tableData[2].score4 }}</td>
          <td>{{ tableData[3].score4 }}</td>
          <td>{{ tableData[4].score4 }}</td>
          <td>{{ tableData[5].score4 }}</td>
          <td>{{ tableData[6].score4 }}</td>
          <td>{{ tableData[7].score4 }}</td>
          <td>{{ tableData[8].score4 }}</td>
        </tr>
        <tr>
          <td>5</td>
          <td class="textLeft">其他：手术后/使用镇静（或麻醉）药物</td>
          <td>0/1</td>
          <td>{{ tableData[0].score5 }}</td>
          <td>{{ tableData[1].score5 }}</td>
          <td>{{ tableData[2].score5 }}</td>
          <td>{{ tableData[3].score5 }}</td>
          <td>{{ tableData[4].score5 }}</td>
          <td>{{ tableData[5].score5 }}</td>
          <td>{{ tableData[6].score5 }}</td>
          <td>{{ tableData[7].score5 }}</td>
          <td>{{ tableData[8].score5 }}</td>
        </tr>
        <tr>
          <td>6</td>
          <td class="textLeft">移动或平衡能力减弱（肢体乏力/有步态问题/移动时需要他人协助或手杖、助行器等辅助装置）</td>
          <td>0/1</td>
          <td>{{ tableData[0].score6 }}</td>
          <td>{{ tableData[1].score6 }}</td>
          <td>{{ tableData[2].score6 }}</td>
          <td>{{ tableData[3].score6 }}</td>
          <td>{{ tableData[4].score6 }}</td>
          <td>{{ tableData[5].score6 }}</td>
          <td>{{ tableData[6].score6 }}</td>
          <td>{{ tableData[7].score6 }}</td>
          <td>{{ tableData[8].score6 }}</td>
        </tr>
        <tr>
          <td>7</td>
          <td class="textLeft">频繁入厕（2小时内）</td>
          <td>0/1</td>
          <td>{{ tableData[0].score7 }}</td>
          <td>{{ tableData[1].score7 }}</td>
          <td>{{ tableData[2].score7 }}</td>
          <td>{{ tableData[3].score7 }}</td>
          <td>{{ tableData[4].score7 }}</td>
          <td>{{ tableData[5].score7 }}</td>
          <td>{{ tableData[6].score7 }}</td>
          <td>{{ tableData[7].score7 }}</td>
          <td>{{ tableData[8].score7 }}</td>
        </tr>
        <tr>
          <td>8</td>
          <td class="textLeft">自身活动受限，但不接受医护人员或家属帮助</td>
          <td>0/1</td>
          <td>{{ tableData[0].score8 }}</td>
          <td>{{ tableData[1].score8 }}</td>
          <td>{{ tableData[2].score8 }}</td>
          <td>{{ tableData[3].score8 }}</td>
          <td>{{ tableData[4].score8 }}</td>
          <td>{{ tableData[5].score8 }}</td>
          <td>{{ tableData[6].score8 }}</td>
          <td>{{ tableData[7].score8 }}</td>
          <td>{{ tableData[8].score8 }}</td>
        </tr>
        <tr>
          <td colspan="3">总分</td>
          <td>{{ tableData[0].total }}</td>
          <td>{{ tableData[1].total }}</td>
          <td>{{ tableData[2].total }}</td>
          <td>{{ tableData[3].total }}</td>
          <td>{{ tableData[4].total }}</td>
          <td>{{ tableData[5].total }}</td>
          <td>{{ tableData[6].total }}</td>
          <td>{{ tableData[7].total }}</td>
          <td>{{ tableData[8].total }}</td>
        </tr>
        <tr>
          <td colspan="12" class="textLeft" style="padding:10px;line-height:25px">
            说明：1、总分=1分，提示患者有跌倒/坠床风险，总分≥2分，提示患者有跌倒/坠床的高风险；<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、卧床患者仅评估第2项和第8项。其余项目用“W”表示，不计分值，卧床＞48小时患者，第一次下床应再次评估
          </td>
        </tr>
        <tr>
          <td colspan="12" class="textLeft" style="padding:10px;line-height:25px">
            预防措施：存在跌倒/坠床风险患者，应在实施常规预防措施的基础上给予针对性预防措施
          </td>
        </tr>
        <tr>
          <td colspan="3">常规预防措施</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td>1</td>
          <td class="textLeft" colspan="2">使患者熟悉环境</td>
          <td>{{ tableData[0].normal1 }}</td>
          <td>{{ tableData[1].normal1 }}</td>
          <td>{{ tableData[2].normal1 }}</td>
          <td>{{ tableData[3].normal1 }}</td>
          <td>{{ tableData[4].normal1 }}</td>
          <td>{{ tableData[5].normal1 }}</td>
          <td>{{ tableData[6].normal1 }}</td>
          <td>{{ tableData[7].normal1 }}</td>
          <td>{{ tableData[8].normal1 }}</td>
        </tr>
        <tr>
          <td>2</td>
          <td class="textLeft" colspan="2">保证病区各区域整洁、光线充足，夜间使用夜灯</td>
          <td>{{ tableData[0].normal2 }}</td>
          <td>{{ tableData[1].normal2 }}</td>
          <td>{{ tableData[2].normal2 }}</td>
          <td>{{ tableData[3].normal2 }}</td>
          <td>{{ tableData[4].normal2 }}</td>
          <td>{{ tableData[5].normal2 }}</td>
          <td>{{ tableData[6].normal2 }}</td>
          <td>{{ tableData[7].normal2 }}</td>
          <td>{{ tableData[8].normal2 }}</td>
        </tr>
        <tr>
          <td>3</td>
          <td class="textLeft" colspan="2">保证病区各处扶手坚固耐用</td>
          <td>{{ tableData[0].normal3 }}</td>
          <td>{{ tableData[1].normal3 }}</td>
          <td>{{ tableData[2].normal3 }}</td>
          <td>{{ tableData[3].normal3 }}</td>
          <td>{{ tableData[4].normal3 }}</td>
          <td>{{ tableData[5].normal3 }}</td>
          <td>{{ tableData[6].normal3 }}</td>
          <td>{{ tableData[7].normal3 }}</td>
          <td>{{ tableData[8].normal3 }}</td>
        </tr>
        <tr>
          <td>4</td>
          <td class="textLeft" colspan="2">保证病区地面清洁干燥，迅速清洁所有泼溅物</td>
          <td>{{ tableData[0].normal4 }}</td>
          <td>{{ tableData[1].normal4 }}</td>
          <td>{{ tableData[2].normal4 }}</td>
          <td>{{ tableData[3].normal4 }}</td>
          <td>{{ tableData[4].normal4 }}</td>
          <td>{{ tableData[5].normal4 }}</td>
          <td>{{ tableData[6].normal4 }}</td>
          <td>{{ tableData[7].normal4 }}</td>
          <td>{{ tableData[8].normal4 }}</td>
        </tr>
        <tr>
          <td>5</td>
          <td class="textLeft" colspan="2">保证病床、椅子及床头柜高度合适，并踩上脚刹固定</td>
          <td>{{ tableData[0].normal5 }}</td>
          <td>{{ tableData[1].normal5 }}</td>
          <td>{{ tableData[2].normal5 }}</td>
          <td>{{ tableData[3].normal5 }}</td>
          <td>{{ tableData[4].normal5 }}</td>
          <td>{{ tableData[5].normal5 }}</td>
          <td>{{ tableData[6].normal5 }}</td>
          <td>{{ tableData[7].normal5 }}</td>
          <td>{{ tableData[8].normal5 }}</td>
        </tr>
        <tr>
          <td>6</td>
          <td class="textLeft" colspan="2">指导患者穿着合适衣裤，着防滑、舒适、合脚的鞋</td>
          <td>{{ tableData[0].normal6 }}</td>
          <td>{{ tableData[1].normal6 }}</td>
          <td>{{ tableData[2].normal6 }}</td>
          <td>{{ tableData[3].normal6 }}</td>
          <td>{{ tableData[4].normal6 }}</td>
          <td>{{ tableData[5].normal6 }}</td>
          <td>{{ tableData[6].normal6 }}</td>
          <td>{{ tableData[7].normal6 }}</td>
          <td>{{ tableData[8].normal6 }}</td>
        </tr>
        <tr>
          <td>7</td>
          <td class="textLeft" colspan="2">将个人物品放在患者安全可及范围</td>
          <td>{{ tableData[0].normal7 }}</td>
          <td>{{ tableData[1].normal7 }}</td>
          <td>{{ tableData[2].normal7 }}</td>
          <td>{{ tableData[3].normal7 }}</td>
          <td>{{ tableData[4].normal7 }}</td>
          <td>{{ tableData[5].normal7 }}</td>
          <td>{{ tableData[6].normal7 }}</td>
          <td>{{ tableData[7].normal7 }}</td>
          <td>{{ tableData[8].normal7 }}</td>
        </tr>
        <tr>
          <td>8</td>
          <td class="textLeft" colspan="2">教会患者使用呼叫铃，保证呼叫铃在可及范围</td>
          <td>{{ tableData[0].normal8 }}</td>
          <td>{{ tableData[1].normal8 }}</td>
          <td>{{ tableData[2].normal8 }}</td>
          <td>{{ tableData[3].normal8 }}</td>
          <td>{{ tableData[4].normal8 }}</td>
          <td>{{ tableData[5].normal8 }}</td>
          <td>{{ tableData[6].normal8 }}</td>
          <td>{{ tableData[7].normal8 }}</td>
          <td>{{ tableData[8].normal8 }}</td>
        </tr>
        <tr>
          <td>9</td>
          <td class="textLeft" colspan="2">安全转运患者，静止时将轮椅、平车的轮子锁住</td>
          <td>{{ tableData[0].normal9 }}</td>
          <td>{{ tableData[1].normal9 }}</td>
          <td>{{ tableData[2].normal9 }}</td>
          <td>{{ tableData[3].normal9 }}</td>
          <td>{{ tableData[4].normal9 }}</td>
          <td>{{ tableData[5].normal9 }}</td>
          <td>{{ tableData[6].normal9 }}</td>
          <td>{{ tableData[7].normal9 }}</td>
          <td>{{ tableData[8].normal9 }}</td>
        </tr>
        <tr>
          <td colspan="3">选择针对性预防措施</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td>1</td>
          <td class="textLeft" colspan="2">加强患者及家属的防跌倒意识教育</td>
          <td>{{ tableData[0].choose1 }}</td>
          <td>{{ tableData[1].choose1 }}</td>
          <td>{{ tableData[2].choose1 }}</td>
          <td>{{ tableData[3].choose1 }}</td>
          <td>{{ tableData[4].choose1 }}</td>
          <td>{{ tableData[5].choose1 }}</td>
          <td>{{ tableData[6].choose1 }}</td>
          <td>{{ tableData[7].choose1 }}</td>
          <td>{{ tableData[8].choose1 }}</td>
        </tr>
        <tr>
          <td>2</td>
          <td class="textLeft" colspan="2">鼓励患者佩戴眼镜和助听器，行走勿太快</td>
          <td>{{ tableData[0].choose2 }}</td>
          <td>{{ tableData[1].choose2 }}</td>
          <td>{{ tableData[2].choose2 }}</td>
          <td>{{ tableData[3].choose2 }}</td>
          <td>{{ tableData[4].choose2 }}</td>
          <td>{{ tableData[5].choose2 }}</td>
          <td>{{ tableData[6].choose2 }}</td>
          <td>{{ tableData[7].choose2 }}</td>
          <td>{{ tableData[8].choose2 }}</td>
        </tr>
        <tr>
          <td>3</td>
          <td class="textLeft" colspan="2">告知有家属/护士协调方可下床，指导正确使用助听装置</td>
          <td>{{ tableData[0].choose3 }}</td>
          <td>{{ tableData[1].choose3 }}</td>
          <td>{{ tableData[2].choose3 }}</td>
          <td>{{ tableData[3].choose3 }}</td>
          <td>{{ tableData[4].choose3 }}</td>
          <td>{{ tableData[5].choose3 }}</td>
          <td>{{ tableData[6].choose3 }}</td>
          <td>{{ tableData[7].choose3 }}</td>
          <td>{{ tableData[8].choose3 }}</td>
        </tr>
        <tr>
          <td>4</td>
          <td class="textLeft" colspan="2">按医嘱留陪护一名，在夜间将陪人床紧邻病床放置</td>
          <td>{{ tableData[0].choose4 }}</td>
          <td>{{ tableData[1].choose4 }}</td>
          <td>{{ tableData[2].choose4 }}</td>
          <td>{{ tableData[3].choose4 }}</td>
          <td>{{ tableData[4].choose4 }}</td>
          <td>{{ tableData[5].choose4 }}</td>
          <td>{{ tableData[6].choose4 }}</td>
          <td>{{ tableData[7].choose4 }}</td>
          <td>{{ tableData[8].choose4 }}</td>
        </tr>
        <tr>
          <td>5</td>
          <td class="textLeft" colspan="2">上床栏，指导患者及家属正确使用病栏</td>
          <td>{{ tableData[0].choose5 }}</td>
          <td>{{ tableData[1].choose5 }}</td>
          <td>{{ tableData[2].choose5 }}</td>
          <td>{{ tableData[3].choose5 }}</td>
          <td>{{ tableData[4].choose5 }}</td>
          <td>{{ tableData[5].choose5 }}</td>
          <td>{{ tableData[6].choose5 }}</td>
          <td>{{ tableData[7].choose5 }}</td>
          <td>{{ tableData[8].choose5 }}</td>
        </tr>
        <tr>
          <td>6</td>
          <td class="textLeft" colspan="2">协助擦浴、开餐、二便护理，必要时提供床边尿壶或便椅</td>
          <td>{{ tableData[0].choose6 }}</td>
          <td>{{ tableData[1].choose6 }}</td>
          <td>{{ tableData[2].choose6 }}</td>
          <td>{{ tableData[3].choose6 }}</td>
          <td>{{ tableData[4].choose6 }}</td>
          <td>{{ tableData[5].choose6 }}</td>
          <td>{{ tableData[6].choose6 }}</td>
          <td>{{ tableData[7].choose6 }}</td>
          <td>{{ tableData[8].choose6 }}</td>
        </tr>
        <tr>
          <td>7</td>
          <td class="textLeft" colspan="2">经患者或家属同意使用安全带或约束带</td>
          <td>{{ tableData[0].choose7 }}</td>
          <td>{{ tableData[1].choose7 }}</td>
          <td>{{ tableData[2].choose7 }}</td>
          <td>{{ tableData[3].choose7 }}</td>
          <td>{{ tableData[4].choose7 }}</td>
          <td>{{ tableData[5].choose7 }}</td>
          <td>{{ tableData[6].choose7 }}</td>
          <td>{{ tableData[7].choose7 }}</td>
          <td>{{ tableData[8].choose7 }}</td>
        </tr>
        <tr>
          <td>8</td>
          <td class="textLeft" colspan="2">卧床＞48小时，营养不良患者，先在床上进行肌肉力量训练循序渐进活动；第一次下床时，遵循“三慢”原则</td>
          <td>{{ tableData[0].choose8 }}</td>
          <td>{{ tableData[1].choose8 }}</td>
          <td>{{ tableData[2].choose8 }}</td>
          <td>{{ tableData[3].choose8 }}</td>
          <td>{{ tableData[4].choose8 }}</td>
          <td>{{ tableData[5].choose8 }}</td>
          <td>{{ tableData[6].choose8 }}</td>
          <td>{{ tableData[7].choose8 }}</td>
          <td>{{ tableData[8].choose8 }}</td>
        </tr>
        <tr>
          <td>9</td>
          <td class="textLeft" colspan="2">其他</td>
          <td>{{ tableData[0].choose9 }}</td>
          <td>{{ tableData[1].choose9 }}</td>
          <td>{{ tableData[2].choose9 }}</td>
          <td>{{ tableData[3].choose9 }}</td>
          <td>{{ tableData[4].choose9 }}</td>
          <td>{{ tableData[5].choose9 }}</td>
          <td>{{ tableData[6].choose9 }}</td>
          <td>{{ tableData[7].choose9 }}</td>
          <td>{{ tableData[8].choose9 }}</td>
        </tr>
        <tr>
          <td colspan="3">护士签名</td>
          <td>{{ tableData[0].sign }}</td>
          <td>{{ tableData[1].sign }}</td>
          <td>{{ tableData[2].sign }}</td>
          <td>{{ tableData[3].sign }}</td>
          <td>{{ tableData[4].sign }}</td>
          <td>{{ tableData[5].sign }}</td>
          <td>{{ tableData[6].sign }}</td>
          <td>{{ tableData[7].sign }}</td>
          <td>{{ tableData[8].sign }}</td>
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
// import { getFallAssessment } from '@/api/recordInstrument/nursingAssessment'

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
      tableData: [],
      form: {
        status: '1'
      }
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
        this.form.status = null
        this.tableData = [
          {
            date: '/',
            time: '/',
            score1: '/',
            score2: '/',
            score3: '/',
            score4: '/',
            score5: '/',
            score6: '/',
            score7: '/',
            score8: '/',
            total: '/',
            normal1: '/',
            normal2: '/',
            normal3: '/',
            normal4: '/',
            normal5: '/',
            normal6: '/',
            normal7: '/',
            normal8: '/',
            normal9: '/',
            choose1: '/',
            choose2: '/',
            choose3: '/',
            choose4: '/',
            choose5: '/',
            choose6: '/',
            choose7: '/',
            choose8: '/',
            choose9: '/',
            sign: '/'
          },
          {
            date: '/',
            time: '/',
            score1: '/',
            score2: '/',
            score3: '/',
            score4: '/',
            score5: '/',
            score6: '/',
            score7: '/',
            score8: '/',
            total: '/',
            normal1: '/',
            normal2: '/',
            normal3: '/',
            normal4: '/',
            normal5: '/',
            normal6: '/',
            normal7: '/',
            normal8: '/',
            normal9: '/',
            choose1: '/',
            choose2: '/',
            choose3: '/',
            choose4: '/',
            choose5: '/',
            choose6: '/',
            choose7: '/',
            choose8: '/',
            choose9: '/',
            sign: '/'
          },
          {
            date: '/',
            time: '/',
            score1: '/',
            score2: '/',
            score3: '/',
            score4: '/',
            score5: '/',
            score6: '/',
            score7: '/',
            score8: '/',
            total: '/',
            normal1: '/',
            normal2: '/',
            normal3: '/',
            normal4: '/',
            normal5: '/',
            normal6: '/',
            normal7: '/',
            normal8: '/',
            normal9: '/',
            choose1: '/',
            choose2: '/',
            choose3: '/',
            choose4: '/',
            choose5: '/',
            choose6: '/',
            choose7: '/',
            choose8: '/',
            choose9: '/',
            sign: '/'
          },
          {
            date: '/',
            time: '/',
            score1: '/',
            score2: '/',
            score3: '/',
            score4: '/',
            score5: '/',
            score6: '/',
            score7: '/',
            score8: '/',
            total: '/',
            normal1: '/',
            normal2: '/',
            normal3: '/',
            normal4: '/',
            normal5: '/',
            normal6: '/',
            normal7: '/',
            normal8: '/',
            normal9: '/',
            choose1: '/',
            choose2: '/',
            choose3: '/',
            choose4: '/',
            choose5: '/',
            choose6: '/',
            choose7: '/',
            choose8: '/',
            choose9: '/',
            sign: '/'
          },
          {
            date: '/',
            time: '/',
            score1: '/',
            score2: '/',
            score3: '/',
            score4: '/',
            score5: '/',
            score6: '/',
            score7: '/',
            score8: '/',
            total: '/',
            normal1: '/',
            normal2: '/',
            normal3: '/',
            normal4: '/',
            normal5: '/',
            normal6: '/',
            normal7: '/',
            normal8: '/',
            normal9: '/',
            choose1: '/',
            choose2: '/',
            choose3: '/',
            choose4: '/',
            choose5: '/',
            choose6: '/',
            choose7: '/',
            choose8: '/',
            choose9: '/',
            sign: '/'
          },
          {
            date: '/',
            time: '/',
            score1: '/',
            score2: '/',
            score3: '/',
            score4: '/',
            score5: '/',
            score6: '/',
            score7: '/',
            score8: '/',
            total: '/',
            normal1: '/',
            normal2: '/',
            normal3: '/',
            normal4: '/',
            normal5: '/',
            normal6: '/',
            normal7: '/',
            normal8: '/',
            normal9: '/',
            choose1: '/',
            choose2: '/',
            choose3: '/',
            choose4: '/',
            choose5: '/',
            choose6: '/',
            choose7: '/',
            choose8: '/',
            choose9: '/',
            sign: '/'
          },
          {
            date: '/',
            time: '/',
            score1: '/',
            score2: '/',
            score3: '/',
            score4: '/',
            score5: '/',
            score6: '/',
            score7: '/',
            score8: '/',
            total: '/',
            normal1: '/',
            normal2: '/',
            normal3: '/',
            normal4: '/',
            normal5: '/',
            normal6: '/',
            normal7: '/',
            normal8: '/',
            normal9: '/',
            choose1: '/',
            choose2: '/',
            choose3: '/',
            choose4: '/',
            choose5: '/',
            choose6: '/',
            choose7: '/',
            choose8: '/',
            choose9: '/',
            sign: '/'
          },
          {
            date: '/',
            time: '/',
            score1: '/',
            score2: '/',
            score3: '/',
            score4: '/',
            score5: '/',
            score6: '/',
            score7: '/',
            score8: '/',
            total: '/',
            normal1: '/',
            normal2: '/',
            normal3: '/',
            normal4: '/',
            normal5: '/',
            normal6: '/',
            normal7: '/',
            normal8: '/',
            normal9: '/',
            choose1: '/',
            choose2: '/',
            choose3: '/',
            choose4: '/',
            choose5: '/',
            choose6: '/',
            choose7: '/',
            choose8: '/',
            choose9: '/',
            sign: '/'
          },
          {
            date: '/',
            time: '/',
            score1: '/',
            score2: '/',
            score3: '/',
            score4: '/',
            score5: '/',
            score6: '/',
            score7: '/',
            score8: '/',
            total: '/',
            normal1: '/',
            normal2: '/',
            normal3: '/',
            normal4: '/',
            normal5: '/',
            normal6: '/',
            normal7: '/',
            normal8: '/',
            normal9: '/',
            choose1: '/',
            choose2: '/',
            choose3: '/',
            choose4: '/',
            choose5: '/',
            choose6: '/',
            choose7: '/',
            choose8: '/',
            choose9: '/',
            sign: '/'
          }
        ]
      } else {
        this.form.status = '1'
        this.tableData = [
          {
            date: '2020-6-1',
            time: '15:00',
            score1: '1',
            score2: '1',
            score3: '1',
            score4: '1',
            score5: '1',
            score6: '1',
            score7: '1',
            score8: '1',
            total: '8',
            normal1: '1',
            normal2: '1',
            normal3: '1',
            normal4: '1',
            normal5: '1',
            normal6: '1',
            normal7: '1',
            normal8: '1',
            normal9: '1',
            choose1: '1',
            choose2: '1',
            choose3: '1',
            choose4: '1',
            choose5: '1',
            choose6: '1',
            choose7: '1',
            choose8: '1',
            choose9: '1',
            sign: '郭秀兰'
          },
          {
            date: '2020-6-1',
            time: '15:00',
            score1: '1',
            score2: '1',
            score3: '1',
            score4: '1',
            score5: '1',
            score6: '1',
            score7: '1',
            score8: '1',
            total: '8',
            normal1: '1',
            normal2: '1',
            normal3: '1',
            normal4: '1',
            normal5: '1',
            normal6: '1',
            normal7: '1',
            normal8: '1',
            normal9: '1',
            choose1: '1',
            choose2: '1',
            choose3: '1',
            choose4: '1',
            choose5: '1',
            choose6: '1',
            choose7: '1',
            choose8: '1',
            choose9: '1',
            sign: '郭秀兰'
          },
          {
            date: '2020-6-1',
            time: '15:00',
            score1: '1',
            score2: '1',
            score3: '1',
            score4: '1',
            score5: '1',
            score6: '1',
            score7: '1',
            score8: '1',
            total: '8',
            normal1: '1',
            normal2: '1',
            normal3: '1',
            normal4: '1',
            normal5: '1',
            normal6: '1',
            normal7: '1',
            normal8: '1',
            normal9: '1',
            choose1: '1',
            choose2: '1',
            choose3: '1',
            choose4: '1',
            choose5: '1',
            choose6: '1',
            choose7: '1',
            choose8: '1',
            choose9: '1',
            sign: '郭秀兰'
          },
          {
            date: '2020-6-1',
            time: '15:00',
            score1: '1',
            score2: '1',
            score3: '1',
            score4: '1',
            score5: '1',
            score6: '1',
            score7: '1',
            score8: '1',
            total: '8',
            normal1: '1',
            normal2: '1',
            normal3: '1',
            normal4: '1',
            normal5: '1',
            normal6: '1',
            normal7: '1',
            normal8: '1',
            normal9: '1',
            choose1: '1',
            choose2: '1',
            choose3: '1',
            choose4: '1',
            choose5: '1',
            choose6: '1',
            choose7: '1',
            choose8: '1',
            choose9: '1',
            sign: '郭秀兰'
          },
          {
            date: '2020-6-1',
            time: '15:00',
            score1: '1',
            score2: '1',
            score3: '1',
            score4: '1',
            score5: '1',
            score6: '1',
            score7: '1',
            score8: '1',
            total: '8',
            normal1: '1',
            normal2: '1',
            normal3: '1',
            normal4: '1',
            normal5: '1',
            normal6: '1',
            normal7: '1',
            normal8: '1',
            normal9: '1',
            choose1: '1',
            choose2: '1',
            choose3: '1',
            choose4: '1',
            choose5: '1',
            choose6: '1',
            choose7: '1',
            choose8: '1',
            choose9: '1',
            sign: '郭秀兰'
          },
          {
            date: '2020-6-1',
            time: '15:00',
            score1: '1',
            score2: '1',
            score3: '1',
            score4: '1',
            score5: '1',
            score6: '1',
            score7: '1',
            score8: '1',
            total: '8',
            normal1: '1',
            normal2: '1',
            normal3: '1',
            normal4: '1',
            normal5: '1',
            normal6: '1',
            normal7: '1',
            normal8: '1',
            normal9: '1',
            choose1: '1',
            choose2: '1',
            choose3: '1',
            choose4: '1',
            choose5: '1',
            choose6: '1',
            choose7: '1',
            choose8: '1',
            choose9: '1',
            sign: '郭秀兰'
          },
          {
            date: '2020-6-1',
            time: '15:00',
            score1: '1',
            score2: '1',
            score3: '1',
            score4: '1',
            score5: '1',
            score6: '1',
            score7: '1',
            score8: '1',
            total: '8',
            normal1: '1',
            normal2: '1',
            normal3: '1',
            normal4: '1',
            normal5: '1',
            normal6: '1',
            normal7: '1',
            normal8: '1',
            normal9: '1',
            choose1: '1',
            choose2: '1',
            choose3: '1',
            choose4: '1',
            choose5: '1',
            choose6: '1',
            choose7: '1',
            choose8: '1',
            choose9: '1',
            sign: '郭秀兰'
          },
          {
            date: '2020-6-1',
            time: '15:00',
            score1: '1',
            score2: '1',
            score3: '1',
            score4: '1',
            score5: '1',
            score6: '1',
            score7: '1',
            score8: '1',
            total: '8',
            normal1: '1',
            normal2: '1',
            normal3: '1',
            normal4: '1',
            normal5: '1',
            normal6: '1',
            normal7: '1',
            normal8: '1',
            normal9: '1',
            choose1: '1',
            choose2: '1',
            choose3: '1',
            choose4: '1',
            choose5: '1',
            choose6: '1',
            choose7: '1',
            choose8: '1',
            choose9: '1',
            sign: '郭秀兰'
          },
          {
            date: '2020-6-1',
            time: '15:00',
            score1: '1',
            score2: '1',
            score3: '1',
            score4: '1',
            score5: '1',
            score6: '1',
            score7: '1',
            score8: '1',
            total: '8',
            normal1: '1',
            normal2: '1',
            normal3: '1',
            normal4: '1',
            normal5: '1',
            normal6: '1',
            normal7: '1',
            normal8: '1',
            normal9: '1',
            choose1: '1',
            choose2: '1',
            choose3: '1',
            choose4: '1',
            choose5: '1',
            choose6: '1',
            choose7: '1',
            choose8: '1',
            choose9: '1',
            sign: '郭秀兰'
          }
        ]
      }
    },
    modalClick() {
      this.show = false
    },
    handleShow(index, row) {
      this.form = row
      this.show = true
    },
    handlePass(index, row) {
      this.tableData[index].status = '2'
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
      this.tableData[index].status = '3'
    },
    handleDelete(index, row) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.tableData.splice(index, 1)
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
    flex: 1;
  }
  span {
    font-size: 14px;
    color: #666;
  }
  .content {
    display: inline-block;
    width: 65%;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }
}
table {
  width: 100%;
  margin: 0 auto;
  font-size: 14px;
  border-color: #ccc;
}
thead th {
  background-color: #F5F7FA;
  color: #909399;
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
.textLeft {
  padding: 0 10px;
  text-align: left;
}
.operation {
  margin-top: 10px;
  text-align: center;
}
</style>
