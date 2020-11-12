<template>
  <div class="apply-contaniner">
    <myfilters
      title="借物申请单"
      content="NO.0033124"
      :back-button="true"
      style="margin-bottom:20px"
    />
    <el-form ref="form" :model="form" label-width="70px">
      <div class="box">
        <el-row style="margin-bottom:16px">
          <span class="title">向谁借？</span>
        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item label="目标科室">
              <el-select v-model="form.department" placeholder="请选择">
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
        <el-row>
          <el-col :span="13">
            <el-form-item label="归还时间" style="margin-bottom:0">
              <el-date-picker
                v-model="form.time"
                type="date"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="box">
        <el-row style="margin-bottom:6px">
          <myfilters
            ref="applyFilters"
            title="借物清单"
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
              <i class="el-icon-delete base-color delete-icon" @click="handleDelete(scope.$index,scope.row)" />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
    <el-button type="primary" style="height:50px;width:140px" @click="onSubmit">
      提交申请
    </el-button>
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
        department: '',
        time: '',
        applyData: []
      },
      number: '',
      department: [
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
.delete-icon {
  font-size: 24px;
  cursor: pointer;
  margin-right: 20px;
}
</style>
