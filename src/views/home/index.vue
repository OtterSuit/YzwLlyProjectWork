<template>
  <div style="padding:30px;background-color:#F0F2F5;">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">患者总数</div>
            <div class="card-panel-num">
              {{ data.peoples1 }}
              <span class="people">{{ data.Ppeoples1 }}</span>
            </div>
          </div>
          <el-row>
            <el-col :span="12">
              <div class="detail">新入患者</div>
              <div class="detail">{{ data.people1 }}</div>
            </el-col>
            <el-col :span="12">
              <div class="detail">出院患者</div>
              <div class="detail">{{ data.people2 }}</div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper dead">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">死亡人数</div>
            <div class="card-panel-num">
              {{ data.peoples2 }}
              <span class="dead">{{ data.Ppeoples2 }}</span>
            </div>
          </div>
          <el-row>
            <el-col :span="8">
              <div class="detail">病危人数</div>
              <div class="detail">{{ data.people3 }}</div>
            </el-col>
            <el-col :span="8">
              <div class="detail">病重人数</div>
              <div class="detail">{{ data.people4 }}</div>
            </el-col>
            <el-col :span="8">
              <div class="detail">手术人数</div>
              <div class="detail">{{ data.people5 }}</div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper nurse">
            <i class="iconfont icon-huli bigIcon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">特级护理</div>
            <div class="card-panel-num">
              {{ data.nurse }}
              <span class="nurse">{{ data.Pnurse }}</span>
            </div>
          </div>
          <el-row>
            <el-col :span="8">
              <div class="detail">一级护理</div>
              <div class="detail">{{ data.people6 }}</div>
            </el-col>
            <el-col :span="8">
              <div class="detail">二级护理</div>
              <div class="detail">{{ data.people7 }}</div>
            </el-col>
            <el-col :span="8">
              <div class="detail">三级护理</div>
              <div class="detail">{{ data.people8 }}</div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper tumble">
            <i class="iconfont icon-diedao bigIcon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">跌倒高风险人数</div>
            <div class="card-panel-num">
              {{ data.tumble }}
              <span class="tumble">{{ data.Ptumble }}</span>
            </div>
          </div>
          <el-row>
            <el-col :span="12">
              <div class="detail">压疮高风险人数</div>
              <div class="detail">{{ data.people9 }}</div>
            </el-col>
            <el-col :span="12">
              <div class="detail">坠床高风险人数</div>
              <div class="detail">{{ data.people10 }}</div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:20px">
      <el-col :span="18">
        <div class="card-middle">
          <span style="font-size:18px;">不良事件数量统计</span>
          <span style="font-size:12px;color:#999">本年度按月统计</span>
          <i class="el-icon-s-data echartsIcon" style="margin-right:30px" :class="{activeIcon:activeIcon==='bar'}" @click.prevent="activeIconChange('bar')" />
          <i class="iconfont icon-jurassic_curve echartsIcon" style="font-weight:900" :class="{activeIcon:activeIcon==='line'}" @click.prevent="activeIconChange('line')" />
          <m-line
            :echart-style="lineStyle"
            :opinion-data="info"
            :x="barX"
          />
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="card">
                <span class="title">科室分布</span>
                <el-form @click.native.prevent>
                  <el-date-picker
                    v-model="conditions.month1"
                    type="month"
                    size="mini"
                    :clearable="false"
                    prefix-icon="el-icon-arrow-down"
                  />
                </el-form>
                <m-pie
                  class="echart"
                  :echart-style="style"
                  :opinion="opinion1"
                  :radius="radius"
                  :opinion-data="data1"
                />
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card">
                <span class="title">分级分布</span>
                <el-form @click.native.prevent>
                  <el-date-picker
                    v-model="conditions.month2"
                    type="month"
                    :clearable="false"
                    size="mini"
                    prefix-icon="el-icon-arrow-down"
                  />
                </el-form>
                <m-pie
                  class="echart"
                  :echart-style="style"
                  :opinion="opinion2"
                  :radius="radius"
                  :opinion-data="data2"
                />
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card specialCard">
                <el-tabs v-model="activeName" @tab-click="handleClick" @click.native.prevent>
                  <el-tab-pane label="发生地点" name="first" />
                  <el-tab-pane label="发生时间" name="second" />
                </el-tabs>
                <el-form @click.native.prevent>
                  <el-date-picker
                    v-model="conditions.month3"
                    class="specialtime"
                    type="month"
                    :clearable="false"
                    size="mini"
                    prefix-icon="el-icon-arrow-down"
                  />
                </el-form>
                <m-pie
                  class="echart"
                  style="padding:0 20px"
                  :echart-style="style"
                  :opinion="opinion3"
                  :radius="radius"
                  :opinion-data="data3"
                />
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-middle-top">
          <div class="card-panel-icon-wrapper hushi">
            <i class="iconfont icon-hushiguanli bigIcon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">护士总数</div>
            <div class="card-panel-num">
              {{ data.peoples3 }}
            </div>
          </div>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="detail">护士长</div>
              <div class="detail">{{ data.people11 }}</div>
            </el-col>
            <el-col :span="6">
              <div class="detail">实习护士</div>
              <div class="detail">{{ data.people12 }}</div>
            </el-col>
            <el-col :span="6">
              <div class="detail">在岗护士</div>
              <div class="detail">{{ data.people13 }}</div>
            </el-col>
            <el-col :span="6" style="margin-bottom:10px">
              <div class="detail">休假护士</div>
              <div class="detail">{{ data.people14 }}</div>
            </el-col>
          </el-row>
          <m-pie
            class="echart"
            :echart-style="style"
            :opinion="opinion4"
            :radius="radius"
            :opinion-data="data4"
          />
        </div>
        <div class="card-middle-bottom">
          <span class="title">满意度调查</span>
          <el-date-picker
            v-model="conditions.month4"
            type="month"
            size="mini"
            :clearable="false"
            prefix-icon="el-icon-arrow-down"
          />
          <m-pie
            class="echart"
            :echart-style="style"
            :opinion="opinion5"
            :radius="radius"
            :opinion-data="data5"
          />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:20px">
      <el-col :span="24">
        <div class="card-bottom">
          <span class="title">质量指标</span>
          <el-date-picker
            v-model="conditions.month5"
            type="month"
            size="mini"
            :clearable="false"
            prefix-icon="el-icon-arrow-down"
          />
          <el-table
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              prop="word"
              label="病区"
            />
            <el-table-column
              prop="bed"
              label="床护比"
            />
            <el-table-column
              prop="nurse"
              label="护患比"
            />
            <el-table-column
              prop="average"
              label="平均护理时数"
            />
            <el-table-column
              prop="leave"
              label="离职率"
            />
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import mPie from '@/components/echart/pie'
import mLine from '@/components/echart/line'
export default {
  components: {
    mPie, mLine
  },
  data() {
    return {
      activeIcon: 'line',
      myChart: null,
      activeName: 'first',
      tableData: [
        {
          word: '急诊病区',
          bed: '1:0.2',
          nurse: '1:26',
          average: '22.66',
          leave: '15.69%'
        },
        {
          word: '儿科病区',
          bed: '1:0.3',
          nurse: '1:26',
          average: '18.65',
          leave: '14.82%'
        },
        {
          word: '中医病区',
          bed: '1:0.3',
          nurse: '1:24',
          average: '17.26',
          leave: '14.54%'
        },
        {
          word: '妇产科病区',
          bed: '1:0.3',
          nurse: '1:22',
          average: '16.78',
          leave: '13.29%'
        }
      ],
      conditions: {
        month1: Date.now(),
        month2: Date.now(),
        month3: Date.now(),
        month4: Date.now(),
        month5: Date.now()
      },
      data: {
        people1: 15,
        people2: 26,
        people3: 3,
        people4: 4,
        people5: 12,
        people6: 9,
        people7: 4,
        people8: 6,
        people9: 14,
        people10: 9,
        people11: 3,
        people12: 4,
        people13: 39,
        people14: 12,
        peoples1: 86,
        peoples2: 2,
        peoples3: 58,
        nurse: 3,
        tumble: 26,
        Ppeoples1: '↑ 2.6%',
        Ppeoples2: '↓ 0.4%',
        Pnurse: '↑ 1.62%',
        Ptumble: '↑ 2.42%'
      },
      lineStyle: {
        height: '270px',
        width: '100%'
      },
      info: [{
        name: '发生次数',
        type: 'line',
        data: [8, 7, 18, 12, 5, 3],
        smooth: true,
        areaStyle: {
          color: 'rgba(64, 158, 255,.4)'
        }
      }],
      barX: ['2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06'],
      opinion1: {
        textStyle: {
          color: '#8C8C8C'
        },
        left: 'auto',
        itemHeight: 9,
        data: [
          { name: '门诊室', icon: 'circle' },
          { name: '手术室', icon: 'circle' },
          { name: '供应室', icon: 'circle' }
        ]
      },
      opinion2: {
        left: 'auto',
        itemHeight: 9,
        textStyle: {
          color: '#8C8C8C'
        },
        data: [
          { name: '一级', icon: 'circle' },
          { name: '二级', icon: 'circle' },
          { name: '三级', icon: 'circle' },
          { name: '四级', icon: 'circle' }
        ]
      },
      opinion3: {
        textStyle: {
          color: '#8C8C8C'
        },
        left: 'auto',
        itemHeight: 9,
        data: [
          { name: '病房', icon: 'circle' },
          { name: '过道', icon: 'circle' },
          { name: '门诊', icon: 'circle' }
        ]
      },
      opinion4: {
        textStyle: {
          color: '#8C8C8C'
        },
        left: 'auto',
        itemHeight: 9,
        data: [
          { name: '大专', icon: 'circle' },
          { name: '本科', icon: 'circle' },
          { name: '硕士', icon: 'circle' }
        ]
      },
      opinion5: {
        textStyle: {
          color: '#8C8C8C'
        },
        left: 'auto',
        itemHeight: 9,
        data: [
          { name: '很满意', icon: 'circle' },
          { name: '满意', icon: 'circle' },
          { name: '一般', icon: 'circle' },
          { name: '不满意', icon: 'circle' }
        ]
      },
      data1: [
        { value: 64, name: '门诊室' },
        { value: 10, name: '手术室' },
        { value: 26, name: '供应室' }
      ],
      data2: [
        { value: 56, name: '一级' },
        { value: 24, name: '二级' },
        { value: 12, name: '三级' },
        { value: 8, name: '四级' }
      ],
      data3: [
        { value: 33, name: '病房' },
        { value: 40, name: '过道' },
        { value: 27, name: '门诊' }
      ],
      data4: [
        { value: 26, name: '大专' },
        { value: 10, name: '本科' },
        { value: 64, name: '硕士' }
      ],
      data5: [
        { value: 56, name: '很满意' },
        { value: 24, name: '满意' },
        { value: 12, name: '一般' },
        { value: 8, name: '不满意' }
      ],
      radius: ['40%', '55%'],
      style: {
        height: '250px',
        width: '100%'
      }
    }
  },
  created() {
    console.log(this)
    this.$store.dispatch('settings/changeTagsView', false)
  },
  methods: {
    // 不良事件图形类型转换
    activeIconChange(icon) {
      if (this.activeIcon === icon) return
      this.activeIcon = icon
      this.info[0].type = icon
    },
    // tabs栏切换时 动态刷新扇形图数据
    handleClick() {
      if (this.activeName === 'first') {
        this.data3 = [
          { value: 33, name: '病房' },
          { value: 40, name: '过道' },
          { value: 27, name: '门诊' }
        ]
        this.opinion3 = {
          left: 'auto',
          data: [
            { name: '病房', icon: 'circle' },
            { name: '过道', icon: 'circle' },
            { name: '门诊', icon: 'circle' }
          ]
        }
      } else {
        this.data3 = [
          { value: 40, name: '白天' },
          { value: 55, name: '夜班' }
        ]
        this.opinion3 = {
          left: 'auto',
          data: [
            { name: '白天', icon: 'circle' },
            { name: '夜班', icon: 'circle' }
          ]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-panel {
  height: 160px;
  padding: 20px;
  position: relative;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}
.people {
  color: #40c9c6;
}

.dead {
  color: #f9944a;
}

.nurse {
  color: #409eff;
}

.tumble {
  color: #29c06d;
}

.hushi {
  color: #F49299;
}

.card-panel-icon-wrapper {
  display: inline-block;
  // margin: 14px 0 0 14px;
  // padding: 16px;
}
.bigIcon {
  font-size: 54px;
}
.card-panel-icon {
  font-size: 54px;
}

.card-panel-description {
  // float: right;
  display: inline-block;
  // margin: 26px;
  margin-left: 20px;
  margin-bottom: 10px;

  .card-panel-text {
    // line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    margin-bottom: 12px;
  }

  .card-panel-num {
    font-size: 22px;
    font-weight: bold;
    span {
      font-size: 12px;
      font-weight: normal;
    }
  }
}
.detail {
  font-size: 12px;
  color: #333;
  margin-top: 13px;
}

.card-middle,
.card-middle-top,
.card-middle-bottom,
.card-bottom,
.card {
  padding: 20px;
  position: relative;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}
.card-middle {
  height: 633px;
}
.card-middle-top {
  height: 360px;
}
.card-middle-bottom {
  position: relative;
  height: 253px;
  margin-top: 20px;
}
.card-bottom {
  height: 340px;
}
.card {
  height: 272px;
  margin-top: 20px;
}
.specialCard {
  padding: 0;
}
.title {
  font-size: 18px;
  display: inline-block;
  margin-bottom: 10px;
}
.echart {
  margin: 0 auto;
}
.echartsIcon {
  float: right;
  width:40px;
  height:28px;
  background:rgba(244,244,245,1);
  border-radius:0px 3px 3px 0px;
  border:1px solid rgba(233,233,235,1);
  text-align: center;
  line-height: 28px;
  color: #BFCBD9;
  font-size: 18px;
  cursor: pointer;
  // margin-right: 20px;
}
.activeIcon {
  background:rgba(236,245,255,1);
  border:1px solid rgba(217,236,255,1);
  color: #409eff;
}
::v-deep .el-input__inner {
  width: 70px;
  cursor: pointer;
  // height: 20px;
  // padding: 0 10px!important;
  border: 0;
}
::v-deep .el-input__suffix{
  display: none;
}
::v-deep .el-input__prefix{
  left: 45px;
  top: 1px;
}
::v-deep .el-date-editor {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 16px;
  width: 70px;
}
::v-deep .specialtime {
  // right: 10px;
  top: 12px;
}
::v-deep .el-tabs__item {
  font-size: 18px;
  padding: 0 10px;
}
::v-deep .el-tabs__nav-scroll {
    padding: 5px 20px 0;
}
::v-deep .el-tabs__header {
  margin-bottom: 10px;
}
::v-deep .el-tabs__item.is-active {
  color: black;
}
::v-deep .el-tabs__item {
  color: #999;
}
::v-deep .el-input--suffix .el-input__inner {
  padding: 0;
}
</style>
