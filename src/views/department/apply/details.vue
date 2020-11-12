<template>
  <div class="apply-contaniner">
    <myfilters title="物品申领单" content="NO.0033124" :back-button="true" style="margin-bottom:20px">
      <template slot="extent">
        <el-button type="bgc" icon="el-icon-upload">模板管理</el-button>
      </template>
    </myfilters>
    <el-form ref="form" :model="form" label-width="70px">
      <div class="box">
        <el-row style="margin-bottom:16px">
          <span class="title">单类别</span>
        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item label="申请类别">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item label="是否加急" style="margin-bottom:0">
              <el-radio-group v-model="form.urgent">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="box">
        <el-row style="margin-bottom:6px">
          <myfilters
            ref="applyFilters"
            title="申领清单"
            add-icon="el-icon-circle-plus-outline"
            addifo="添加"
            placeholder="器械包名称/编号"
            :search-content="true"
            :add-button="true"
            @addClick="addClick"
          >
            <template slot="extent">
              <el-col :span="4">
                <el-input v-model="number" placeholder="数量" />
              </el-col>
            </template>
          </myfilters>
        </el-row>
        <el-table :data="form.applyData" style="width: 100%">
          <el-table-column label="序号" type="index" width="100" />
          <el-table-column prop="packageNum" label="编号" />
          <el-table-column prop="packageName" label="名称" />
          <el-table-column label="数量">
            <template slot-scope="scope">
              <div>
                <el-input v-model="scope.row.number" placeholder="请输入" />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot-scope="scope">
              <i
                class="el-icon-delete base-color delete-icon"
                @click="handleDelete(scope.$index,scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
    <div>
      <el-button type="primary" style="height:50px;width:140px" @click="onSubmit">提交申请</el-button>
      <div class="template-button">
        <i class="iconfont icon-baocun" />
        存为模板
      </div>
    </div>
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
        type: '器械包申请',
        urgent: '0',
        applyData: []
      },
      number: '',
      typeOptions: [
        {
          value: '器械包申请',
          label: '器械包申请'
        },
        {
          value: '一次性物品申领',
          label: '一次性物品申领'
        },
        {
          value: '器械包换物申请',
          label: '器械包换物申请'
        },
        {
          value: '消毒物品申请',
          label: '消毒物品申请'
        },
        {
          value: '外来器械包申请',
          label: '外来器械包申请'
        },
        {
          value: '自定义器械包申请',
          label: '自定义器械包申请'
        }
      ]
    }
  },
  methods: {
    addClick() {
      const name = this.$refs.applyFilters.select.content
      if (name === '') {
        this.$message({
          message: '请输入器械包名称或编号',
          type: 'warning'
        })
        return
      }
      if (this.number === '') {
        this.$message({
          message: '请输入数量',
          type: 'warning'
        })
        return
      }
      const applyObj = {
        packageNum: name,
        packageName: name,
        number: this.number
      }
      this.form.applyData.push(applyObj)
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.number = ''
      this.$refs.applyFilters.select.content = ''
    },
    handleDelete(index, row) {
      this.form.applyData.splice(index, 1)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    onSubmit() {
      this.$message({
        message: '提交申请成功',
        type: 'success'
      })
      this.$router.back(-1)
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.apply-contaniner {
  padding: 30px 20px;
  background-color: #f0f2f5;
}
::v-deep .box {
  background: rgba(255, 255, 255, 1);
  box-shadow: 4px 4px 40px 0px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 20px 30px;
  margin-bottom: 20px;
  position: relative;
  .title {
    font-size: 18px;
    color: rgba(153, 153, 153, 1);
    line-height: 24px;
  }
}
::v-deep .el-form-item__label {
  font-weight: normal;
  text-align: left;
}
.delete-icon {
  font-size: 24px;
  cursor: pointer;
  margin-right: 20px;
}
.template-button {
  display: inline-block;
  color: #409eff;
  margin-left: 50px;
  transform: translateY(15px);
  cursor: pointer;
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
.search-input {
  width: 25%;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
