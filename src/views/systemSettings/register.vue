<template>
  <div style="padding:30px">
    <!-- 添加表格上方过滤条件 -->
    <myfilters
      title="账号信息"
      :add-button="true"
      @addClick="addClick"
    >
      <!-- <template slot="extent">
        <el-button icon="el-icon-refresh" type="primary" @click="rewritePassword">
          重置密码
        </el-button>
      </template> -->
    </myfilters>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <!-- :cell-style="tableStyle"
      :header-cell-style="tableStyle"
      highlight-current-row
      @current-change="handleCurrentChange" -->
      <el-table-column
        prop="account"
        label="账号"
      />
      <el-table-column
        prop="realName"
        label="姓名"
      />
      <el-table-column
        prop="departmentName"
        label="科室"
      />
      <el-table-column
        prop="dutyName"
        label="岗位"
      />
      <el-table-column
        label="权限角色"
        width="150"
      >
        <template slot-scope="scope">
          {{ rolesOptions[scope.row.roleId] }}
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="mobilePhone"
        label="手机号"
      /> -->
      <!-- <el-table-column
        label="状态"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.isEnable" class="success-color">
            <i class="el-icon-success" /> 启用
          </div>
          <div v-else class="warning-color">
            <i class="el-icon-error" /> 停用
          </div>
        </template>
      </el-table-column> -->
      <el-table-column width="200" align="right">
        <template slot-scope="scope">
          <el-button
            slot="reference"
            size="mini"
            icon="el-icon-edit-outline"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-popconfirm
            icon-color="red"
            title="确认删除吗"
            @onConfirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button
              slot="reference"
              size="mini"
              icon="el-icon-delete"
            >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <my-pagination :total="totalCount" methods="getUserAccount" :page-size="10" page-no="PageIndex" :records="['resData','items']" />

    <!-- <div style="text-align:center;margin-top:10px">
      <el-pagination
        class="page"
        :page-size="pageSize"
        :pager-count="5"
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
      />
    </div> -->
    <el-dialog title="账号信息" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="账号" prop="account">
                <el-input v-model="form.account" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="姓名" prop="realName">
                <el-input v-model="form.realName" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="性别" prop="gender">
                <el-select v-model="form.gender">
                  <el-option label="男" :value="1" />
                  <el-option label="女" :value="0" />

                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="昵称">
                <el-input v-model="form.nickName" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="科室" prop="departmentId">
                <el-select v-model="form.departmentId">
                  <el-option label="消毒供应室" value="a401ceee-bbd5-485f-97b8-28b209da0399" />
                  <el-option label="手术室" value="9765dbdd-2f7a-427c-87a6-6562c9471cb3" />

                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="岗位" prop="dutyId">
                <el-select v-model="form.dutyId">
                  <el-option label="医生" value="d917d0a6-f74b-4046-96cf-b00ea0e8e444" />
                  <el-option label="护士长" value="41fe8c97-6695-4078-ab01-c726386d6b15" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="权限角色" prop="roleId">
                <el-select v-model="form.roleId">
                  <el-option
                    v-for="(value,index) in rolesOptions"
                    :key="index"
                    :label="value"
                    :value="index"
                  />
                  <!-- <el-option label="护理部主任" value="护理部主任" />
                  <el-option label="护士长" value="护士长" />
                  <el-option label="护士" value="护士" /> -->
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="生日" prop="birthday">
                <el-input v-model="form.birthday" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="手机" prop="mobilePhone">
                <el-input v-model="form.mobilePhone" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="Email" prop="email">
                <el-input v-model="form.email" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="岗位">
                <el-select v-model="form.dutyName">
                  <el-option label="护理部主任" value="护理部主任" />
                  <el-option label="护士长" value="护士长" />
                  <el-option label="护士" value="护士" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="权限角色">
                <el-select v-model="form.roleName">
                  <el-option label="护理部主任" value="护理部主任" />
                  <el-option label="护士长" value="护士长" />
                  <el-option label="护士" value="护士" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="描述" prop="description">
                <el-input
                  v-model="form.description"
                  type="textarea"
                />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="11">
              <el-form-item label="选项">
                <el-checkbox v-model="form.isAdministrator" label="系统管理员" />
                <el-checkbox v-model="form.isEnable" label="有效" />
              </el-form-item>
            </el-col> -->
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-show="!edit" type="primary" @click="addSubmit">确认</el-button>
        <el-button v-show="edit" type="primary" @click="editSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import myPagination from '@/components/MyPagination'
import api from '@/api'
export default {
  components: {
    myfilters, myPagination
  },
  data() {
    return {
      show: false,
      edit: false,
      editIndex: 0,
      tableData: [],
      totalCount: 0,
      table: [],
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        // nickName: [
        //   { required: true, message: '请输入昵称', trigger: 'blur' }
        // ],
        departmentId: [
          { required: true, message: '请输入科室', trigger: 'blur' }
        ],
        dutyId: [
          { required: true, message: '请输入岗位', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请输入权限角色', trigger: 'blur' }
        ]
      },
      form: {},
      oldForm: null,
      userId: '', // 重置密码需要传的Userid
      rolesOptions: null,
      departmentOptions: {
        'a401ceee-bbd5-485f-97b8-28b209da0399': '消毒供应室',
        '9765dbdd-2f7a-427c-87a6-6562c9471cb3': '手术室'
      },
      dutyOptions: {
        'd917d0a6-f74b-4046-96cf-b00ea0e8e444': '医生',
        '41fe8c97-6695-4078-ab01-c726386d6b15': '护士长'
      }
    }
  },
  created() {
    api.getRoles({ pageSize: '100' }).then(response => {
      if (response.success === true) {
        this.rolesOptions = {}
        response.resData.items.forEach(item => {
          this.$set(this.rolesOptions, item.id, item.fullName)
        })
      }
    })
    // 获取全部的账号信息
    this.fetchData()
  },
  methods: {
    // 获取全部账号信息
    fetchData() {
      api.getUserAccount().then(response => {
        if (response.success === true) {
          this.tableData = response.resData.items
          this.totalCount = response.resData.totalItems
        }
      })
    },
    addClick() {
      this.edit = false
      this.form = {
        id: null,
        headIcon: null,
        gender: 1,
        birthday: null,
        mobilePhone: null,
        email: null,
        organizeId: 'ab18a691-899b-4311-833a-84bd50416204',
        description: null
      }
      this.show = true
    },
    addSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          api.addUserAccount(this.form).then(response => {
            // console.log(response)
            if (response.success === true) {
              this.$set(this.form, 'departmentName', this.departmentOptions[this.form.departmentId])
              this.$set(this.form, 'dutyName', this.dutyOptions[this.form.dutyId])
              this.tableData.push(this.form)
              this.totalCount += 1
              this.show = false
              this.$message({
                message: '添加成功',
                type: 'success'
              })
            }
          })
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    // 编辑
    handleEdit(index, row) {
      this.oldForm = JSON.parse(JSON.stringify(row))
      this.form = JSON.parse(JSON.stringify(row))
      this.edit = true
      this.editIndex = index
      this.show = true
      // 把该行对应的用户id存起来
    },
    editSubmit() {
      if (JSON.stringify(this.form) === JSON.stringify(this.oldForm)) {
        this.$message('无信息修改')
        this.show = false
        return
      }
      this.$refs.form.validate(async valid => {
        if (valid) {
          console.log(this.form)
          // 如果表单验证成功则调用接口
          api.updataAccount(this.form).then(response => {
            // console.log(response)
            if (response.success === true) {
              this.tableData.splice(this.editIndex, 1, this.form)
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.show = false
            }
          })
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    handleDelete(index, row) {
      const form = JSON.parse(JSON.stringify(row))
      form.isDelete = true
      api.deleteAccount(form).then(response => {
        // console.log(response)
        if (response.success === true) {
          this.tableData.splice(index, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    // 选择要操作的一行重置密码
    // handleCurrentChange(index, row) {
    //   this.userId = index.id
    // },
    // 重置密码
    // rewritePassword() {
    //   if (this.userId !== '') {
    //     this.$confirm('此操作将重置改用户的密码, 是否继续?', '重置密码提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       api.reSetpassword({ userId: this.userId }).then(response => {
    //         console.log(response)
    //         this.$message({
    //           showClose: true,
    //           message: '重置密码成功!密码重置为' + response.errMsg,
    //           type: 'success',
    //           duration: 0
    //         })
    //       })
    //     }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消此操作'
    //       })
    //     })
    //   } else {
    //     this.$message({
    //       message: '对不起,请选择要重置密码的一个用户',
    //       type: 'warning'
    //     })
    //   }
    // },
    // label居中
    tableStyle() {
      return {
        textAlign: 'center'
      }
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
</style>
