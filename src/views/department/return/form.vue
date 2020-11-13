<template>
  <div class="apply-contaniner">
    <myfilters
      title="退回申请单"
      :back-button="true"
      style="margin-bottom:20px"
    />
    <div class="box">
      <el-row style="margin-bottom:6px">
        <myfilters
          ref="applyFilters"
          title="退回清单"
          placeholder="请输入或扫描包编码"
          :search-content="true"
          content-type="tel"
          @contentBlur="contentBlur"
          @contentInput="checkInput"
        >
          <!-- <template slot="extent">
            <el-col :span="4">
              <el-input v-model="number" placeholder="数量" />
            </el-col>
          </template> -->
        </myfilters>
      </el-row>
      <el-table v-loading="listLoading" :data="applyData" style="width: 100%">
        <el-table-column label="序号" type="index" width="100" />
        <el-table-column prop="packet_id" label="编号" />
        <el-table-column prop="packetName" label="名称" />
        <el-table-column align="right">
          <template slot-scope="scope">
            <i class="el-icon-delete base-color delete-icon" @click="handleDelete(scope.$index,scope.row)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button :loading="buttonLoading" type="primary" style="height:50px;width:140px" @click="onSubmit">
      提交申请
    </el-button>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import api from '@/api'
export default {
  components: {
    myfilters
  },
  data() {
    return {
      buttonLoading: false,
      listLoading: true,
      applyData: []
    }
  },
  created() {
    this.fetchData()
    this.$nextTick((x) => {
      this.$refs.applyFilters.$refs.contentinput.focus()
    })
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.peoCarPage({ busiType: '3' }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.applyData = response.data.records
          this.listLoading = false
        }
      })
    },
    onSubmit() {
      if (this.applyData.length === 0) {
        this.$message({
          message: '提交申请为空',
          type: 'warning'
        })
        return
      } else {
        const shopCarIds = []
        this.applyData.forEach((item) => {
          shopCarIds.push(item.id)
        })
        this.buttonLoading = true
        api.toApplyReturn({ shopCarIds }).then(response => {
          console.log(response)
          if (response.code === '200' && response.data.busiCode === '1') {
            this.buttonLoading = false
            this.$message({
              message: '提交申请成功',
              type: 'success'
            })
          }
        })
      }
      this.applyData = []
      this.$router.back(-1)
    },
    checkInput(content) {
      if (content.length >= 15) {
        this.addClick()
      }
    },
    addClick() {
      const name = this.$refs.applyFilters.select.content
      if (name === '') {
        this.$message({
          message: '请输入或扫描包编码',
          type: 'warning'
        })
        this.$refs.applyFilters.$refs.contentinput.focus()
        return
      }
      /* if (this.applyCount === '') {
        this.$message({
          message: '请输入数量',
          type: 'warning'
        })
        return
      } */
      const applyForm = {
        applyCount: '1',
        busiType: '3',
        packetId: name
      }
      const isExisted = this.applyData.some(item => {
        if (item.packet_id === applyForm.packetId) {
          /* item.apply_count += parseInt(applyForm.applyCount) */
          return true
        } else {
          return false
        }
      })
      if (isExisted) {
        this.$message({
          message: '该包已申请',
          type: 'error'
        })
        this.$refs.applyFilters.select.content = ''
        return
      }
      api.getInstanceById({ id: name }).then(response => {
        console.log(response)
        if (response.data.status !== '3') {
          this.$message({
            message: '该包不可退回',
            type: 'error'
          })
          return
        }
        api.carAddstaff(applyForm).then(response => {
          // console.log(applyForm)
          console.log(response)
          if (response.code === '200' && response.data.busiCode === '1') {
          /* const isExisted = this.applyData.some(item => {
            if (item.packet_id === applyForm.packetId) {
              item.apply_count += parseInt(applyForm.applyCount)
              return true
            } else {
              return false
            }
          }) */
            this.applyData.unshift({
              id: response.data.id,
              packetName: response.data.packetName,
              packet_id: response.data.packetId
            })
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: response.data.msg,
              type: 'warning'
            })
          }
        })
      })
      /* this.applyCount = '' */
      this.$refs.applyFilters.select.content = ''
      this.$refs.applyFilters.$refs.contentinput.focus()
    },
    handleDelete(index, row) {
      api.carDeletestaff(row).then(response => {
        console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.applyData.splice(index, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    contentBlur() {
      this.$refs.applyFilters.$refs.contentinput.focus()
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
.delete-icon {
  font-size: 24px;
  cursor: pointer;
  margin-right: 20px;
}
::v-deep .el-form-item__label {
  font-weight: normal;
  text-align: left;
}
</style>
