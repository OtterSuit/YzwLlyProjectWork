<template>
  <div style="padding:30px">
    <div class="component">
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

      <table border="1" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th>宣教类型</th>
            <th>是否宣教</th>
            <th>宣教时间</th>
            <th>宣教护士</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableData" :key="item.type">
            <td>{{ type(item.type) }}</td>
            <td>{{ item.ifEdu }}</td>
            <td>{{ item.time }}</td>
            <td>{{ item.nurse }}</td>
          </tr>
        </tbody>
        <tbody v-if="info.example">
          <tr v-for="(item,index) in edu" :key="item.key">
            <td colspan="4" class="textLeft hover" style="padding:10px;line-height:25px;">
              <div class="edit" @click="eduEdit(item,index)">编辑</div>
              <div class="title">{{ item.title }}</div>
              <textarea v-model="item.content" disabled class="textarea" />
            </td>
          </tr>
        </tbody>
      </table>
      <el-dialog :title="eduContent.title" :visible.sync="show" width="800px">
        <div class="dialog-main">
          <el-alert
            class="alert"
            title="此为病区宣教模板，请谨慎修改！"
            type="warning"
            show-icon
            :closable="false"
          />
          <el-form ref="eduContent" :model="eduContent">
            <div class="main">
              <el-input
                v-model="eduContent.content"
                type="textarea"
                :autosize="{ minRows: 20, maxRows: 100}"
                resize="none"
              />
            </div>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="footClick(editIndex)">确认</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      show: false,
      title: '健康教育',
      tableData: [],
      edu: [
        {
          title: '入院宣教',
          content: `病区环境：
①病区走廊有热水间，24小时供应热水和微波炉热饭。
②请注意垃圾分类，生活垃圾请装入黑色生活垃圾袋，棉签、沾有血迹或体液的纸巾等医疗垃圾请装入黄色医疗垃圾袋。
③杂物库房配备有平车、轮椅，如需外出检查可以来护士站借用，用后及时归还以便他人使用。
④病房内有单独卫生间，洗手池，储物柜，热水供应，自备生活用品；当您有需要时可按床头铃呼叫护士站，卫生间内有紧急呼叫按钮。
⑤用餐方面，您可以去食堂一楼办理就诊卡在食堂就餐。或者电话预定，一日三餐食堂师傅送到科室。
病区制度：
①早上主任及医生会查房，对病情有疑问或情况汇报请早上告知医生，白天医生很忙，有急事可以找值班医生或责任护士。
②患者不能离开医院，有急事请告知医生，医生同意后方可离开，且外出注意保护自身安全。
③早晨护士会来床前抽血。
④护士会发大小便检查标本瓶，晨起留取第一次小便，大便随时有随时留取。大小便标本留取后告诉护士，放置在护士站标本架上以便及时送检。
⑤每张病床配有陪护椅，需要缴纳押金，每天会有工作人员定时开关锁，供家属使用。
⑥医院为无烟、禁烟场所，请病人及家属配合，不要在公共环境吸烟
⑦病区每天打扫消毒，地面湿滑，请注意安全，穿防滑鞋，防止跌倒。`
        },
        {
          title: '术前宣教',
          content: `病区环境：
①病区走廊有热水间，24小时供应热水和微波炉热饭。
②请注意垃圾分类，生活垃圾请装入黑色生活垃圾袋，棉签、沾有血迹或体液的纸巾等医疗垃圾请装入黄色医疗垃圾袋。
③杂物库房配备有平车、轮椅，如需外出检查可以来护士站借用，用后及时归还以便他人使用。
④病房内有单独卫生间，洗手池，储物柜，热水供应，自备生活用品；当您有需要时可按床头铃呼叫护士站，卫生间内有紧急呼叫按钮。
⑤用餐方面，您可以去食堂一楼办理就诊卡在食堂就餐。或者电话预定，一日三餐食堂师傅送到科室。
病区制度：
①早上主任及医生会查房，对病情有疑问或情况汇报请早上告知医生，白天医生很忙，有急事可以找值班医生或责任护士。
②患者不能离开医院，有急事请告知医生，医生同意后方可离开，且外出注意保护自身安全。
③早晨护士会来床前抽血。
④护士会发大小便检查标本瓶，晨起留取第一次小便，大便随时有随时留取。大小便标本留取后告诉护士，放置在护士站标本架上以便及时送检。
⑤每张病床配有陪护椅，需要缴纳押金，每天会有工作人员定时开关锁，供家属使用。
⑥医院为无烟、禁烟场所，请病人及家属配合，不要在公共环境吸烟
⑦病区每天打扫消毒，地面湿滑，请注意安全，穿防滑鞋，防止跌倒。`
        },
        {
          title: '术后宣教',
          content: `体位:椎管内麻醉患者，应平卧6-8小时，以防因脑脊液外渗导致头痛。
        全身麻醉尚未清醒者，取平卧位,头偏向一侧，以防口腔分泌物或呕吐物误吸入气道。6-8小时后改低半卧位，以减轻切口疼痛，并利于呼吸和引流。
切口护理:保持切口敷料清洁干燥，适当用腹带加压包扎，咳嗽时用双手按压切口。如感切口疼痛明显，请及时告知医护人员。
饮食:手术后6小时内（除局麻外）禁饮禁食，不能吃任何东西（包括水），禁食期间保持口腔清洁。
        6小时后根据医嘱进食，同时放慢进食速度，少量多餐，逐步恢复到正常饮食，进食后及时漱口。
饮食分类指导:流质饮食:水，米汤，豆浆，稀藕粉、果汁、蔬菜汁等。
        半流质饮食：米粥、面条汤，蒸蛋羹、馄饨、嫩豆腐、菜泥、果泥、香蕉等。
        软质饮食：软饭、面条、切碎煮熟的菜、肉等。
        普通饮食：正常饮食。
早期活动:手术后6小时内可在床上活动，如屈膝、抬脚等； 
        6小时后如果无头晕不适可下床活动，根据病情轻重和患者耐受程度循序渐进，起床时动作要缓慢，先沿床而坐、再床旁站立、室内慢步行走、最后至户外活动。
        早期下床活动可预防肺部并发症、下肢静脉血栓的形成、肠粘连及尿潴留等。
排泄:手术前请准备尿壶（男）、便盆（女），一般情况下术后6小时内须在床上大小便。
        手术前可适当训练床上大小便。手术后6小时如无头晕不适可下床大小便，但须有人搀扶，以防跌倒。如有尿（便）意时，请及时排尿（便）。
引流管须知:妥善固定，保持引流通畅，切勿滑脱、扭曲、折叠、压迫。
        床上翻身活动时注意保护引流管，避免滑脱。
        如需下床活动时，引流袋（球）位置应低于引流管口。
        引流管如有滑脱或引流液颜色变为鲜红色且量增多，立即通知医生、护士。
防跌倒:术后回病房后需拉上床栏，要有专人陪护，如需帮助时请使用呼叫铃。
        术后如要下床，要有人搀扶，起床时动作要缓慢，先在床边坐一会儿再下床活动。
        物品应尽量放入柜内，保持走道通畅。
        下床活动时请穿防滑拖鞋，合适尺码的衣裤，地面有水时，请告知医护人员。
呼吸功能锻炼:手术前进行呼吸功能锻炼，术后做深呼吸，行有效咳嗽。必要时行叩背，促进痰液排出。
        有效咳嗽要点：采取坐位或半坐卧位，身体稍前倾，以腹式呼吸深吸气，屏气3-5秒后进行2-3次短促有力咳嗽，运用腹肌的有力收缩将痰液排出，咳嗽时注意按压好伤口。
预防压疮:保持皮肤、床单位清洁和干燥。
        减少皮肤受压，定时翻身。
        在更换体位时要完全抬空身子,不要拖、拉。
        床上解大小便使用便盆时，动作要轻,防止损伤皮肤。
        早期进行活动。
        增加营养，平衡饮食。
预防血栓形成:鼓励术后早期离床活动，卧床期间进行肢体主动和被动运动，如腿部自主伸、屈活动，被动按摩腿部肌肉、屈腿和伸腿等。
        必要时穿弹力袜，遵医嘱使用间歇式充气压力治疗等，预防深静脉血栓形成。`
        },
        {
          title: '出院宣教',
          content: `病区环境：
①病区走廊有热水间，24小时供应热水和微波炉热饭。
②请注意垃圾分类，生活垃圾请装入黑色生活垃圾袋，棉签、沾有血迹或体液的纸巾等医疗垃圾请装入黄色医疗垃圾袋。
③杂物库房配备有平车、轮椅，如需外出检查可以来护士站借用，用后及时归还以便他人使用。
④病房内有单独卫生间，洗手池，储物柜，热水供应，自备生活用品；当您有需要时可按床头铃呼叫护士站，卫生间内有紧急呼叫按钮。
⑤用餐方面，您可以去食堂一楼办理就诊卡在食堂就餐。或者电话预定，一日三餐食堂师傅送到科室。
病区制度：
①早上主任及医生会查房，对病情有疑问或情况汇报请早上告知医生，白天医生很忙，有急事可以找值班医生或责任护士。
②患者不能离开医院，有急事请告知医生，医生同意后方可离开，且外出注意保护自身安全。
③早晨护士会来床前抽血。
④护士会发大小便检查标本瓶，晨起留取第一次小便，大便随时有随时留取。大小便标本留取后告诉护士，放置在护士站标本架上以便及时送检。
⑤每张病床配有陪护椅，需要缴纳押金，每天会有工作人员定时开关锁，供家属使用。
⑥医院为无烟、禁烟场所，请病人及家属配合，不要在公共环境吸烟
⑦病区每天打扫消毒，地面湿滑，请注意安全，穿防滑鞋，防止跌倒。`
        }
      ],
      oldContent: null,
      eduContent: {
        content: ``,
        title: ''
      },
      editIndex: ''
    }
  },
  created() {
    this.info = this.$route.params.info
    this.changeData()
  },
  methods: {
    changeData() {
      if (this.info.example) {
        this.tableData = [
          {
            type: '1',
            ifEdu: '/',
            time: '/',
            nurse: '/'
          },
          {
            type: '2',
            ifEdu: '/',
            time: '/',
            nurse: '/'
          },
          {
            type: '3',
            ifEdu: '/',
            time: '/',
            nurse: '/'
          },
          {
            type: '4',
            ifEdu: '/',
            time: '/',
            nurse: '/'
          }
        ]
      } else {
        this.tableData = [
          {
            type: '1',
            ifEdu: '是',
            time: '2020-6-1',
            nurse: '郭秀兰'
          },
          {
            type: '2',
            ifEdu: '是',
            time: '2020-6-1',
            nurse: '郭秀兰'
          },
          {
            type: '3',
            ifEdu: '是',
            time: '2020-6-1',
            nurse: '郭秀兰'
          },
          {
            type: '4',
            ifEdu: '否'
          }
        ]
      }
    },
    type(num) {
      let type = ''
      switch (num) {
        case '1':
          type = '入院宣教'
          break
        case '2':
          type = '术前宣教'
          break
        case '3':
          type = '术后宣教'
          break
        case '4':
          type = '出院宣教'
          break
        default:
          break
      }
      return type
    },
    // 编辑宣教内容
    eduEdit(item, index) {
      this.editIndex = index
      this.eduContent.content = JSON.parse(JSON.stringify(item.content))
      this.oldContent = JSON.parse(JSON.stringify(item.content))
      this.eduContent.title = item.title
      this.show = true
    },
    // 弹窗组件确认按钮
    footClick(index) {
      this.show = false
      if (JSON.stringify(this.eduContent.content) === JSON.stringify(this.oldContent)) {
        this.$message('无信息修改')
        return
      }
      this.edu[index].content = this.eduContent.content
      this.$message({
        message: '修改成功',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.table {
  padding: 30px;
}
.component {
  // margin: 30px 0px;
  padding: 0 30px;
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
table {
  width: 100%;
  margin: 0 auto;
  font-size: 14px;
  border-color: #ccc;
}
tbody, thead {
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
.hover {
  position: relative;
  .title {
    font-size: 18px;
    text-align: center;
  }
  .textarea {
    border-style:none;
    width:100%;
    height:350px;
    background-color: #fff;
    resize:none;
    line-height: 20px;
  }
  .edit {
    position: absolute;
    display: none;
    top: 0;
    right: 5px;
    font-size: 12px;
    color: #409eff;
    cursor: pointer;
  }
  &:hover {
    background-color: #f5f7fa;
    .edit {
      display: block;
    }
    .textarea {
      background-color: #f5f7fa;
    }
  }
}
.alert {
  width: 95%;
  margin: 0 auto 10px;
}
::v-deep .el-dialog__body {
  padding-bottom: 30px;
}
</style>

