<template>
  <div v-loading="listLoading" class="archives-container">
    <myfilters title="绩效考核" content="2020年7月" />
    <mybox>
      <el-row type="flex" justify="space-between">
        <el-col :span="4" class="userImgBox">
          <img src="@/assets/images/meili.jpg" class="userImg">
        </el-col>
        <el-col :span="20">
          <el-row>
            <div class="name">{{ form.name }}</div>
          </el-row>
          <el-row class="row row-line-height">
            <el-col :span="8">
              <span class="label">工号</span>
              <span class="content">{{ form.workNum }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label">职员类别</span>
              <span class="content">{{ form.type }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label">病区</span>
              <span class="content">{{ form.ward }}</span>
            </el-col>
          </el-row>
          <el-row class="row-line-height">
            <el-col :span="8">
              <span class="label">职务</span>
              <span class="content">{{ form.duty }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label">职称</span>
              <span class="content">{{ form.office }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label">工龄</span>
              <span class="content">{{ form.seniority }}年</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </mybox>
    <mybox>
      <el-row type="flex" justify="space-between">
        <el-col :span="4">
          <span class="title">工作量考核</span>
        </el-col>
        <el-col :span="20">
          <el-row class="row-line-height row">
            <el-col :span="8">
              <span class="label">A班</span>
              <span class="content">{{ form.A }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label">P班</span>
              <span class="content">{{ form.P }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label">N班</span>
              <span class="content">{{ form.N }}</span>
            </el-col>
          </el-row>
          <el-row class="row-line-height">
            <el-col :span="8">
              <span class="label">责任班</span>
              <span class="content">{{ form.responsible }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label">医嘱班</span>
              <span class="content">{{ form.advice }}</span>
            </el-col>
            <el-col :span="8">
              <span class="label">机动班</span>
              <span class="content">{{ form.motor }}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </mybox>
    <mybox>
      <el-row type="flex" justify="space-between">
        <el-col :span="4">
          <span class="title">岗位考核</span>
        </el-col>
        <el-col :span="20">
          <el-row class="row-line-height">
            <el-col :span="8">
              <span class="label">工龄系数</span>
              <span class="content">
                {{ seniority(form.seniority) }}
                <span class="supplement">(1年=0.01)</span>
              </span>
            </el-col>
            <el-col :span="8">
              <span class="label">职称系数</span>
              <span class="content">
                {{ office(form.office) }}
                <span class="supplement">(护士=1.00 护师=1.10)</span>
              </span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </mybox>
    <mybox v-if="type===1">
      <el-row style="margin-bottom:16px">
        <span class="title">工作质量考核</span>
      </el-row>
      <el-row>
        <el-col>
          <el-row class="row">
            <el-col :span="6">
              <span class="label">岗位职责</span>
              <span class="content">{{ form.jobResponsibility }}分</span>
            </el-col>
            <el-col :span="6">
              <span class="label">基础护理</span>
              <span class="content">{{ form.basicNursing }}分</span>
            </el-col>
            <el-col :span="6">
              <span class="label">文书质量</span>
              <span class="content">{{ form.documentQuality }}分</span>
            </el-col>
            <el-col :span="6">
              <span class="label">理论知识</span>
              <span class="content">{{ form.theoreticalKnowledge }}分</span>
            </el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="6">
              <span class="label">技术能力</span>
              <span class="content">{{ form.technicalCapability }}分</span>
            </el-col>
            <el-col :span="6">
              <span class="label">业务学习</span>
              <span class="content">{{ form.vocationalStudy }}分</span>
            </el-col>
            <el-col :span="6">
              <span class="label">按时到岗</span>
              <span class="content">{{ form.arriveOnTime }}分</span>
            </el-col>
            <el-col :span="6">
              <span class="label">请假情况</span>
              <span class="content">{{ form.leaveSituation }}分</span>
            </el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="6">
              <span class="label">责任心</span>
              <span class="content">{{ form.responsibility }}分</span>
            </el-col>
            <el-col :span="6">
              <span class="label">仪表仪态</span>
              <span class="content">{{ form.appearance }}分</span>
            </el-col>
            <el-col :span="6">
              <span class="label">服务态度</span>
              <span class="content">{{ form.serviceAttitude }}分</span>
            </el-col>
            <el-col :span="6">
              <span class="label">轻微错误</span>
              <span class="content">
                <span v-if="form.hasSlightMistake">有(-4分)</span>
                <span v-else>无</span>
              </span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span class="label">严重错误</span>
              <span class="content">
                <span v-if="form.hasSeriousMistake">有(-6分并扣除当月奖金)</span>
                <span v-else>无</span>
              </span>
            </el-col>
            <el-col :span="12">
              <span class="label" style="width:88px">是否有加分项</span>
              <span class="content">
                <span v-if="form.hasExtraScore">有(+10分)</span>
                <span v-else>无</span>
              </span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </mybox>
    <mybox v-else>
      <el-row style="margin-bottom:16px">
        <span class="title">工作质量考核</span>
      </el-row>
      <el-row>
        <el-form ref="form" :model="form" label-width="70px">
          <el-col>
            <el-row class="row" :gutter="40">
              <el-col :span="6">
                <el-form-item label="岗位职责">
                  <el-select v-model="form.jobResponsibility" placeholder="请评分">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="基础护理">
                  <el-select v-model="form.basicNursing" placeholder="请评分">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="文书质量">
                  <el-select v-model="form.documentQuality" placeholder="请评分">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="理论知识">
                  <el-select v-model="form.theoreticalKnowledge" placeholder="请评分">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="row" :gutter="40">
              <el-col :span="6">
                <el-form-item label="技术能力">
                  <el-select v-model="form.technicalCapability" placeholder="请评分">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="业务学习">
                  <el-select v-model="form.vocationalStudy" placeholder="请评分">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="按时到岗">
                  <el-select v-model="form.arriveOnTime" placeholder="请评分">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="请假情况">
                  <el-select v-model="form.leaveSituation" placeholder="请评分">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="row" :gutter="40">
              <el-col :span="6">
                <el-form-item label="责任心">
                  <el-select v-model="form.responsibility" placeholder="请评分">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="仪表仪态">
                  <el-select v-model="form.appearance" placeholder="请评分">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="服务态度">
                  <el-select v-model="form.serviceAttitude" placeholder="请评分">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="轻微错误">
                  <el-radio-group v-model="form.hasSlightMistake">
                    <el-radio :label="false">无</el-radio>
                    <el-radio :label="true">有(-4分)</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="12">
                <el-form-item label="严重错误">
                  <el-radio-group v-model="form.hasSeriousMistake">
                    <el-radio :label="false">无</el-radio>
                    <el-radio :label="true">有(-6分并扣除当月奖金)</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否有加分项" label-width="100px">
                  <el-radio-group v-model="form.hasExtraScore">
                    <el-radio :label="false">无</el-radio>
                    <el-radio :label="true">有(+10分)</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-form>
      </el-row>
    </mybox>
    <el-button v-if="type===2" :loading="buttonLoading" icon="el-icon-circle-check" type="primary" @click="onSubmit">提交考核</el-button>
  </div>
</template>

<script>
import Mybox from '@/components/Mybox'
import myfilters from '@/components/myfilters'
import api from '@/api'
export default {
  components: {
    myfilters,
    Mybox
  },
  data() {
    return {
      imageUrl: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596082978973&di=629fe25a113868779d45ce15e4442ff7&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D3048870469%2C3649018965%26fm%3D214%26gp%3D0.jpg'
      ],
      form: {},
      options: [
        {
          value: '2',
          label: '2分'
        },
        {
          value: '4',
          label: '4分'
        },
        {
          value: '8',
          label: '8分'
        },
        {
          value: '10',
          label: '10分'
        }
      ],
      options1: [
        {
          value: '1',
          label: '1分'
        },
        {
          value: '2',
          label: '2分'
        },
        {
          value: '3',
          label: '3分'
        },
        {
          value: '4',
          label: '4分'
        },
        {
          value: '5',
          label: '5分'
        }
      ],
      listLoading: true,
      buttonLoading: false,
      type: 0
    }
  },
  created() {
    this.type = this.$route.params.type === 'details' ? 1 : 2
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getPerformanceAppraisalsById({ id: this.$route.params.id }).then(response => {
        if (response.success) {
          console.log('绩效查看', response)
          this.form = response.resData
          this.listLoading = false
        }
      })
    },
    seniority(s) {
      return parseInt(s) * 0.01
    },
    office(o) {
      if (o === '护理（士）') {
        return '1.00'
      } else {
        return '1.10'
      }
    },
    onSubmit() {
      this.buttonLoading = true
      this.form.userId = '53bb390b-a296-475e-b420-d33be54598df'
      api.postPerformanceAppraisals(this.form).then(response => {
        if (response.success) {
          this.$message({
            message: '提交考核成功',
            type: 'success'
          })
          this.$router.push({
            name: 'assessMain'
          })
        }
        this.buttonLoading = false
      })
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
i {
  vertical-align: middle;
}
.archives-container {
  padding: 30px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 84px);
}
.title {
  font-size: 18px;
  display: inline-block;
  color: rgba(153, 153, 153, 1);
  line-height: 24px;
}
.userImg {
  width: 118px;
  border-radius: 10px;
}
.name {
  color: black;
  font-size: 24px;
  margin-bottom: 23px;
  margin-left: 29px;
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
.row {
  margin-bottom: 20px;
}
.row-line-height {
  line-height: 24px;
}
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
  color: #666;
}
.supplement {
  font-size: 12px;
  color: #999;
  margin-left: 20px;
  line-height: 24px;
}
</style>
