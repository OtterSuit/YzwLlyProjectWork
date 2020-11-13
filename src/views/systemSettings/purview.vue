<template>
  <div style="padding:30px">
    <!-- <h3>岗位变动</h3> -->
    <!-- 添加表格上方过滤条件 -->
    <myfilters
      ref="myfilters"
      title="权限管理"
      :add-button="true"
      @addClick="addClick"
    />
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="fullName"
        label="角色名称"
      />
      <el-table-column
        prop="enCode"
        label="角色编码"
      />
      <!-- <el-table-column
        label="角色类型"
      >
        <template slot-scope="scope">
          {{ type(scope.row.type) }}
        </template>
      </el-table-column> -->
      <el-table-column
        prop="organizeName"
        label="归属机构"
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
      />
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
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-dropdown trigger="click" class="dropdown" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-button
                size="mini"
                icon="el-icon-s-tools"
              >操作
              </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                class="normal-color"
                icon="el-icon-s-tools"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handlePermissions'
                }"
              >权限</el-dropdown-item>
              <el-dropdown-item

                class="base-color"
                icon="el-icon-edit"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleEdit'
                }"
              >编辑</el-dropdown-item>
              <el-dropdown-item
                icon="el-icon-delete"
                class="error-color"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleDelete'
                }"
              >删除</el-dropdown-item>
              <!-- <el-dropdown-item
                v-if="!scope.row.isEnable"
                class="success-color"
                icon="el-icon-success"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handlePass'
                }"
              >启用</el-dropdown-item>
              <el-dropdown-item
                v-else
                class="warning-color"
                icon="el-icon-error"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleReject'
                }"
              >停用</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <my-pagination :total="totalCount" methods="getRoles" :page-size="10" page-no="PageIndex" :records="['resData','items']" />
    <el-dialog title="角色信息" :visible.sync="show" width="60%">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="角色名称" prop="fullName">
                <el-input v-model="form.fullName" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="角色编码" prop="enCode">
                <el-input v-model="form.enCode" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <!-- <el-col :span="11">
              <el-form-item label="角色类型">
                <el-select v-model="form.type" placeholder="">
                  <el-option label="系统角色" value="1" />
                  <el-option label="业务角色" value="2" />
                  <el-option label="其他角色" value="3" />
                </el-select>
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="11">
              <el-form-item label="排序" prop="sortCode">
                <el-input v-model="form.sortCode" />
              </el-form-item>
            </el-col> -->
            <el-col :span="11">
              <el-form-item label="归属机构" prop="organizeId">
                <el-select v-model="form.organizeId" placeholder="">
                  <!-- <el-option label="护理部" value="护理部" />
                  <el-option label="科室" value="科室" />
                  <el-option label="其他机构" value="其他机构" /> -->
                  <el-option label="消毒供应室" value="a401ceee-bbd5-485f-97b8-28b209da0399" />
                  <el-option label="手术室" value="9765dbdd-2f7a-427c-87a6-6562c9471cb3" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="备注">
                <el-input v-model="form.description" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="排序">
                <el-input v-model="form.sortCode" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="选项">
                <el-checkbox v-model="form.isEnable" label="启用" />
                <el-checkbox v-model="form.allowEdit" label="允许编辑" />
                <el-checkbox v-model="form.allowDelete" label="允许删除" />
              </el-form-item>
            </el-col>
          </el-row> -->
          <!-- <el-row type="flex" justify="space-between">
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input v-model="form.description" />
              </el-form-item>
            </el-col>
          </el-row> -->
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show=false">取消</el-button>
        <el-button v-show="!edit" type="primary" @click="addSubmit">确认</el-button>
        <el-button v-show="edit" type="primary" @click="editSubmit">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog title="权限设置" :visible.sync="permissionsShow" width="500px" top="50px">
      <div class="purview-main">
        <el-tree
          ref="tree"
          default-expand-all
          :check-strictly="true"
          :data="data"
          :props="props"
          :default-checked-keys="checkedKeys"
          node-key="tags"
          show-checkbox
          @check-change="handleCheckChange"
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="permissionsShow=false">取消</el-button>
        <el-button type="primary" @click="permissionsSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api'
import myfilters from '@/components/myfilters'
import myPagination from '@/components/MyPagination'
import { format } from '@/utils/index'
export default {
  components: {
    myfilters, myPagination
  },
  data() {
    return {
      organizeOptions: {
        'a401ceee-bbd5-485f-97b8-28b209da0399': '消毒供应室',
        '9765dbdd-2f7a-427c-87a6-6562c9471cb3': '手术室'
      },
      rules: {
        fullName: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        enCode: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        // nickName: [
        //   { required: true, message: '请输入昵称', trigger: 'blur' }
        // ],
        organizeId: [
          { required: true, message: '请输入科室', trigger: 'blur' }
        ]
      },
      props: {
        label: 'text',
        children: 'nodes'
      },
      data: [/* {
        tags: 'c8d93f3c-57b6-4249-a23e-fdd4a506f685:0',
        text: '消毒供应室系统',
        nodes: [
          {
            tags: '6f9a564a-8f70-4c4d-b318-7d9f5f2e900b:1',
            text: 'ssd首页'
          },
          {
            tags: '8c77da26-abf3-4472-9e56-199c805437e9:1',
            text: '基础数据',
            nodes: [
              {
                tags: 'ee10d95a-d52b-4694-a8db-8f5bb6a24a5c:2',
                text: '物资字典维护'
              },
              {
                tags: '7546335f-29ca-4542-8a53-d60cfd5be980:2',
                text: '常数维护'
              },
              {
                tags: '5492f370-062b-48bb-9ecc-ad7259067951:2',
                text: '供货公司维护'
              },
              {
                tags: 'fe811804-27bd-47ad-892b-114d7f66e80b:2',
                text: '条码打印'
              },
              {
                tags: '18f1acfd-c553-42ec-8ddb-e4124506964d:2',
                text: '包信息维护'
              }
            ]
          },
          {
            tags: '9f9f01e3-6c17-4f1e-9a44-49df58eb8b65:1',
            text: '器械回收',
            nodes: [
              {
                tags: 'b05c097e-b618-49d0-bba0-ce5481734335:2',
                text: '回收任务'
              },
              {
                tags: '31203dfd-9ff1-4e7d-a494-aac756a25d62:2',
                text: '已完成'
              },
              {
                tags: '1e0e1f74-a45b-4cfa-a67e-6f359a6cee2a:2',
                text: '缺损记录'
              }
            ]
          },
          {
            tags: 'b303466c-e9da-45ae-afc8-f8db8c2de537:1',
            text: '清洗消毒',
            nodes: [
              {
                tags: '090f0c26-2d3e-4838-8344-528dae0757fd:2',
                text: '任务列表'
              },
              {
                tags: '581ea97a-4d58-433f-b22a-36cc180ec46d:2',
                text: '已完成'
              },
              {
                tags: 'a1e4bbf6-4c03-45dc-a4e4-58ce62c21b30:2',
                text: '维修/报废'
              }
            ]
          },
          {
            tags: 'e2d58473-2496-46dd-87c6-0dfbedad1f0e:1',
            text: '审核装配',
            nodes: [
              {
                tags: 'c4f4c806-db18-429c-a87f-5babeeef7d42:2',
                text: '任务列表'
              },
              {
                tags: '13c61dac-2636-4abb-82bb-6a79be75605f:2',
                text: '已完成'
              },
              {
                tags: 'a5eab083-018e-4efd-8c1d-fcca3ec093a2:2',
                text: '清洗质量记录表'
              }
            ]
          },
          {
            tags: '55729db8-1b2a-4cf8-ac77-28e51d7b62fd:1',
            text: '审核封包',
            nodes: [
              {
                tags: 'de5b3e51-ed8b-4bfe-92ae-3ecf0251486b:2',
                text: '审核'
              },
              {
                tags: 'e1a8734b-68cc-4f10-bcb4-5403cf937ceb:2',
                text: '封包'
              },
              {
                tags: '583704ba-4871-4656-86b0-4f93ed64a4ab:2',
                text: '历史记录'
              }
            ]
          },
          {
            tags: '837e0392-a8aa-49fc-9b98-143b17a55f08:1',
            text: '灭菌',
            nodes: [
              {
                tags: '25a2bfb1-b963-41cb-9112-168caf66c598:2',
                text: '装载'
              },
              {
                tags: '6c2d647f-d860-4fe1-831d-f2c005f6a0e0:2',
                text: '任务列表'
              },
              {
                tags: '453c8f35-3ed1-468c-9942-21583edf820c:2',
                text: '历史记录'
              }
            ]
          },
          {
            tags: 'd5eb38fb-5f5d-490c-9f77-534801adcc28:1',
            text: '器械仓库',
            nodes: [
              {
                tags: 'b29eceb4-de60-43ae-bb97-7d23e41cf14c:2',
                text: '订单管理'
              },
              {
                tags: '70d671f9-d31b-4269-959e-4c0966b36c11:2',
                text: '包管理'
              }
            ]
          },
          {
            tags: 'c47077a2-0098-4826-be4c-cb13e512148e:1',
            text: '追溯管理'
          },
          {
            tags: '70ab7ac2-f8e7-4df7-91db-1f4f4872cfd1:1',
            text: '统计报表',
            nodes: [
              {
                tags: 'c00b24ad-0b21-4087-a8db-149d8f481274:2',
                text: '财务核算统计'
              },
              {
                tags: '8fcec24f-a797-4061-bc6d-09d907c39cea:2',
                text: '工作量统计'
              },
              {
                tags: 'bee7468b-6fb6-4be6-9f93-cf02ec46cd47:2',
                text: '质量监测统计'
              }
            ]
          },
          {
            tags: 'b89a5971-8229-42ee-bd78-50449ae81bf1:1',
            text: 'sss首页'
          },
          {
            tags: 'aea6b346-e4df-421c-8edc-5857f3180b3d:1',
            text: '申领管理'
          },
          {
            tags: '54fa3878-47fc-4f57-91d2-d86972b9dbb5:1',
            text: '回收管理'
          },
          {
            tags: '507ef512-fc6f-42f3-a409-9b0dcae70289:1',
            text: '退回管理'
          },
          {
            tags: 'a8782f85-64f5-4f0e-b906-38a127ce30eb:1',
            text: '系统设置',
            nodes: [
              {
                tags: 'e1dce89a-f0e1-4408-9c88-9e9f28b01e2b:2',
                text: '我的信息'
              },
              {
                tags: '2fa4c6c9-0194-4c87-b63a-f5915fcaf96d:1',
                text: '修改密码'
              },
              // {
              //   tags: 'f3b57f26-ecb8-4c60-9219-da1d82f88e04:2',
              //   text: '我的待办'
              // },
              {
                tags: 'faf24a00-0e43-4d88-8fc5-bc6db492dd2e:2',
                text: '权限管理'
              },
              {
                tags: '8c2c8ff7-baba-41ff-a688-c1ab69fa4974:2',
                text: '账号设置'
              }
            ]
          }
        ]
      } */],
      tableData: [],
      totalCount: 0,
      form: { },
      oldForm: null,
      show: false,
      permissionsShow: false,
      edit: false,
      editIndex: 0,
      checkedKeys: []
    }
  },
  inject: ['reload'],
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.getRoles().then(response => {
        // console.log(response)
        if (response.success === true) {
          this.tableData = response.resData.items
          this.totalCount = response.resData.totalItems
        }
      })
    },
    type(type) {
      const typeMap = {
        '1': '系统角色',
        '2': '业务角色',
        '3': '其他角色'
      }
      return typeMap[type]
    },
    handleCheckChange(data, checked, indeterminate) {
    },
    handlePermissions(index, row) {
      this.editIndex = index
      api.getRolesTree({ roleId: row.id }).then(res => {
        // console.log(res)
        if (res.success === true) {
          if (res.resData.length > 0) {
            this.data = [res.resData[1]]
            this.checkedKeys = []
            this.getCheckedKeys(this.data)
            // console.log(this.checkedKeys)
          }
        }
        this.permissionsShow = true
      })
    },
    getCheckedKeys(data) {
      data.forEach(item => {
        if (item.isChecked === true) {
          this.checkedKeys.push(item.tags)
        }
        if (item.nodes.length !== 0) {
          this.getCheckedKeys(item.nodes)
        }
      })
    },
    permissionsSubmit() {
      let keys = [...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()]
      // console.log(keys)
      // keys = keys.filter(item => {
      //   return item !== 'c8d93f3c-57b6-4249-a23e-fdd4a506f685:0'
      // })

      for (const value of keys) {
        if (value === 'faf24a00-0e43-4d88-8fc5-bc6db492dd2e:2') { // 如果设置了权限管理,则需要给予权限的所有功能
          const temp = ['201806141708257654:2', '201806130932038005:2', '201806130932356710:2', '201806130933236819:2', '201806130937163369:2', 'c8fef7e6-9908-409a-831f-f2cce5e57705:2', 'ebf4a59f-6004-44fa-a4ea-c89d5998b0de:2']
          keys = [...keys, ...temp]
        } else if (value === '8c2c8ff7-baba-41ff-a688-c1ab69fa4974:2') { // 如果设置了账号管理,则需要给予账号管理的所有功能,以及查看角色的功能
          const temp = ['201806141708443099:2', '2020010516263714244490:2', '2019121816133940871724:2', '201806151647007714:2', '201806151647238497:2', '201806151647431807:2', '201806141708257654:2']
          keys = [...keys, ...temp]
        } else if (value === 'e1dce89a-f0e1-4408-9c88-9e9f28b01e2b:2') { // 如果设置了我的信息,则需要给予查看信息的全部功能
          const temp = ['201806141708443099:2', '2020010516263714244490:3', '201806151647238497:3']
          keys = [...keys, ...temp]
        } else if (value === '2fa4c6c9-0194-4c87-b63a-f5915fcaf96d:2') { // 如果设置了修改密码,则需要给予修改密码的功能
          const temp = ['e6a7cffb-53e3-4be8-8c9c-36da448cfab6:3']
          keys = [...keys, ...temp]
        }
      }
      if (!keys.includes('b89a5971-8229-42ee-bd78-50449ae81bf1:1') && !keys.includes('6f9a564a-8f70-4c4d-b318-7d9f5f2e900b:1')) {
        return this.$message({
          type: 'error',
          message: '请至少选择一个首页'
        })
      }
      // if (keys.includes('faf24a00-0e43-4d88-8fc5-bc6db492dd2e:2')) {
      //   const temp = ['201806141708257654:2', '201806130932038005:2', '201806130932356710:2', '201806130933236819:2', '201806130937163369:2', 'c8fef7e6-9908-409a-831f-f2cce5e57705:2', 'ebf4a59f-6004-44fa-a4ea-c89d5998b0de:2']
      //   keys = [...keys, ...temp]
      //   console.log(keys)
      // }
      // if (keys.includes('8c2c8ff7-baba-41ff-a688-c1ab69fa4974:2')) {
      //   const temp = ['201806141708443099:2', '2020010516263714244490:2', '2019121816133940871724:2', '201806151647007714:2', '201806151647238497:2', '201806151647431807:2']
      //   keys = [...keys, ...temp]
      // }
      // if (keys.includes('e1dce89a-f0e1-4408-9c88-9e9f28b01e2b:2')) {
      //   const temp = ['201806141708443099:2', '2020010516263714244490:3', '201806151647238497:3']
      //   keys = [...keys, ...temp]
      // }
      // if (keys.includes('2fa4c6c9-0194-4c87-b63a-f5915fcaf96d:2')) {
      //   const temp = ['e6a7cffb-53e3-4be8-8c9c-36da448cfab6:3']
      //   keys = [...keys, ...temp]
      // }
      api.saveRolesTree({ roleId: this.tableData[this.editIndex].id, nodes: keys.join(',') }).then(res => {
        // console.log(res)
        if (res.success === true) {
          this.$message({
            message: '权限设置成功,请重新登陆生效',
            type: 'success'
          })
          this.permissionsShow = false
        }
      })
    },
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    /* handlePass(index, row) {
      row.options.push('1')
      this.$message({
        message: '启用成功',
        type: 'success'
      })
    },
    handleReject(index, row) {
      row.options.splice(row.options.indexOf('1'), 1)
      row.options.indexOf('1')
      this.$message({
        message: '停用成功',
        type: 'success'
      })
    }, */
    addClick() {
      this.show = true
      this.edit = false
      this.form = {
        // allowDelete: false,
        // allowEdit: false,
        // isEnable: true,
        category: 1,
        description: ''
      }
    },
    addSubmit() {
      console.log(this.$refs.form)
      this.$refs.form.validate(async valid => {
        if (valid) {
          api.addRoles(this.form).then(response => {
            // console.log(response)
            if (response.success === true) {
              this.$set(this.form, 'organizeName', this.organizeOptions[this.form.organizeId])
              this.$set(this.form, 'createTime', format('yyyy-MM-dd HH:mm:ss'))
              this.tableData.push(this.form)
              // console.log(this.form)
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.show = false
            }
          })
        } else {
          this.$message({
            message: '请正确填写',
            type: 'warning'
          })
        }
      })
    },
    editSubmit() {
      if (JSON.stringify(this.form) === JSON.stringify(this.oldForm)) {
        this.$message('无信息修改')
        this.show = false
        return
      }
      api.updataRoles(this.form).then(response => {
        // console.log(response)
        if (response.success === true) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.tableData.splice(this.editIndex, 1, this.form)
          this.show = false
        }
      })
    },
    handleEdit(index, row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.oldForm = JSON.parse(JSON.stringify(row))
      this.edit = true
      this.editIndex = index
      this.show = true
    },
    handleDelete(index, row) {
      api.deleteRoles({ id: row.id }).then(res => {
        // console.log(res)
        if (res.success === true) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.tableData.splice(index, 1)
        }
      })
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
.picture-span {
  cursor: pointer;
}
.el-dropdown-menu {
  padding: 0;
  margin-top: 0;
}
.el-dropdown-menu__item {
  padding: 0;
  text-align: center;
  width: 73px;
}
::v-deep .popper__arrow {
  display: none;
}
::v-deep .el-dialog__body {
  padding: 0;
}
.dialog-main {
  padding: 20px;
}
.purview-main {
  padding: 20px;
  height: 500px;
  overflow: scroll;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
