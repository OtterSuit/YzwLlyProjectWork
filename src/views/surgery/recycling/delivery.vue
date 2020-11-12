<template>
  <div class="apply-contaniner">
    <myfilters
      title="发货"
      content="NO.0033124"
      :back-button="true"
      style="margin-bottom:20px"
    />
    <el-form ref="form" :model="form" label-width="70px">
      <div class="box">
        <el-row style="margin-bottom:16px">
          <span class="title">订单信息</span>
        </el-row>
        <el-row class="row">
          <el-col :span="6">
            <span class="label">发货科室</span>
            <span class="content">{{ data.deliveryDepartment }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">申请人</span>
            <span class="content">{{ data.applicant }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">申请时间</span>
            <span class="content">{{ data.applyTime }}</span>
          </el-col>
        </el-row>
      </div>
      <div class="box">
        <el-row style="margin-bottom:6px">
          <myfilters
            title="物品清单"
          >
            <template slot="extent">
              <el-button type="bgc" size="mini" @click="inspection">
                <i class="iconfont icon-saoma" />
                扫码验货
              </el-button>
            </template>
          </myfilters>
        </el-row>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="序号" type="index" width="100" />
          <el-table-column prop="packageNum" label="编号" />
          <el-table-column prop="packageName" label="名称" />
          <el-table-column prop="number" label="数量" />
          <el-table-column align="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleDetails(scope.$index,scope.row)">
                <i class="el-icon-tickets" />
                查看详细
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="box">
        <el-row style="margin-bottom:16px">
          <span class="title">收货信息</span>
        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item label="送货人">
              <el-input v-model="form.deliveryman" placeholder="请输入或扫描工牌" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item label="收货人">
              <el-input v-model="form.consignee" placeholder="请输入或扫描工牌" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item label="目标科室" style="margin-bottom:0">
              <el-select v-model="form.department" placeholder="请选择" disabled>
                <el-option
                  v-for="item in department"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <el-button type="primary" style="height:50px;width:140px" @click="onSubmit">
      提交申请
    </el-button>
    <el-dialog title="物品详细" :visible.sync="goodsShow" width="800px">
      <div class="dialog-main">
        <div class="dialog-main-box">
          <div style="height:450px">
            <el-table :data="goodsData" style="width: 100%" class="hidden-table">
              <el-table-column label="序号" type="index" />
              <el-table-column label="编号" />
              <el-table-column label="名称" />
            </el-table>
            <el-scrollbar style="height:400px;background: #fff">
              <el-table :data="goodsData" style="width: 100%" :show-header="false">
                <el-table-column label="序号" type="index" />
                <el-table-column label="编号" prop="packageNum" />
                <el-table-column label="名称" prop="packageName" />
              </el-table>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="show" width="95%">
      <template slot="title">
        <span>验货</span>
        <span class="tinytitle">请扫描需要验货的器械包条码</span>
      </template>

      <div class="dialog-main">
        <div class="dialog-box">
          <el-table :data="dialogData" style="100%" class="hidden-table">
            <el-table-column label="序号" width="150px" />
            <el-table-column label="包编码" width="260px" />
            <el-table-column label="包名称" />
          </el-table>
          <div style="width:390px; margin:15px 150px">
            <el-input v-model="dialogCoding" placeholder="请输入或扫描包编码" @change="codeChange" />
          </div>
          <el-scrollbar style="height:410px;background: #fff">
            <el-table :data="dialogData" style="100%" :show-header="false">
              <el-table-column type="index" width="150px" />
              <el-table-column prop="packageCoding" width="260px" />
              <el-table-column prop="packageName" />
              <el-table-column width="100px">
                <template slot-scope="scope">
                  <i
                    class="el-icon-delete"
                    @click="handleDelete(scope.$index,scope.row)"
                  />
                </template>
              </el-table-column>
            </el-table>
          </el-scrollbar>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="show=false">取消</el-button>
        <el-button type="primary" @click="handleSign">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'

export default {
  components: {
    myfilters
  },
  data() {
    return {
      form: {
        deliveryman: '',
        consignee: '',
        department: '消毒供应室 回收中心'
      },
      department: [
        {
          value: '消毒供应室 回收中心',
          label: '消毒供应室 回收中心'
        },
        {
          value: '内科',
          label: '内科'
        },
        {
          value: '儿科',
          label: '儿科'
        },
        {
          value: '妇科',
          label: '妇科'
        },
        {
          value: '耳鼻咽喉科',
          label: '耳鼻咽喉科'
        },
        {
          value: '男科',
          label: '男科'
        },
        {
          value: '外科',
          label: '外科'
        }
      ],
      data: {
        deliveryDepartment: '妇一科',
        applicant: '张美华',
        applyTime: '2020.08.10 09:54:12'
      },
      tableData: [
        {
          packageNum: '10001',
          packageName: '糖足包',
          number: 2
        },
        {
          packageNum: '10002',
          packageName: '脐穿包',
          number: 2
        }
      ],
      goodsShow: false,
      show: false,
      goodsData: [
        {
          packageNum: '101',
          packageName: '糖足包'
        },
        {
          packageNum: '102',
          packageName: '糖足包'
        }
      ],
      dialogCoding: '',
      dialogData: [
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        }
      ]
    }
  },
  methods: {

    onSubmit() {
      this.$message({
        message: '提交申请成功',
        type: 'success'
      })
      this.$router.back(-1)
    },
    handleDetails(index, row) {
      this.goodsShow = true
    },
    inspection() {
      this.show = true
    },
    handleDelete(index, row) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.dialogData.splice(index, 1)
    },
    codeChange() {
      const obj = {
        packageCoding: this.dialogCoding,
        packageName: '糖足包 '
      }
      this.dialogCoding = ''
      this.dialogData.push(obj)
    },
    handleSign() {
      this.$message({
        message: '验货成功',
        type: 'success'
      })
      this.show = false
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.apply-contaniner {
  padding: 30px 20px;
  background-color:#F0F2F5;
  min-height: calc(100vh - 50px);
}
::v-deep .box {
  background:rgba(255,255,255,1);
  box-shadow:4px 4px 40px 0px rgba(0,0,0,0.05);
  border-radius:6px;
  padding: 20px 30px;
  margin-bottom: 20px;
  position: relative;
  .title {
    font-size:18px;
    color:rgba(153,153,153,1);
    line-height:24px;
  }
}
::v-deep .el-form-item__label {
  font-weight: normal;
  text-align: left;
}
.label {
  font-size:14px;
  display: inline-block;
  width: 60px;
  text-align: end;
  margin-right: 10px;
  color:rgba(158,174,195,1);
}
.content {
  font-size:14px;
}
.row {
  margin-bottom: 20px;
}
.code-img {
  height: 128px;
  float: right;
}
.dialog-main-box {
  position: relative;
  height: 500px;
  background: rgba(246, 246, 246, 1);
  border: 1px dotted rgba(175, 179, 192, 1);
  padding: 20px 25px;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
::v-deep .hidden-table .el-table__body-wrapper {
  display: none;
}
::v-deep .hidden-radio .el-radio__label {
  display: none;
}
.dialog-main {
  padding: 20px;
}
.tinytitle{
  font-size: 14px;
  color: #FF4C4C;
  margin-left:15px ;
}
.dialog-box{
  border:1px solid rgba(216,216,216,1);
}
.el-icon-delete {
  font-size: 24px;
  cursor: pointer;
  color: #999;
}
</style>
