<template>
  <div style="padding:30px">
    <!-- <h3>岗位变动</h3> -->
    <!-- 添加表格上方过滤条件 -->
    <myfilters
      ref="myfilters"
      title="权限管理"
      :search-content="true"
      placeholder="角色名称/编码"
      :add-button="true"
      @addClick="addClick"
    />
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="character"
        label="角色名称"
      />
      <el-table-column
        prop="code"
        label="角色编码"
      />
      <el-table-column
        label="状态"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.options.includes('1')" class="success-color">
            <i class="el-icon-success" /> 启用
          </div>
          <div v-else class="warning-color">
            <i class="el-icon-error" /> 停用
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
      >
        <template slot-scope="{row}">
          {{ row.Description || '-' }}
        </template>
      </el-table-column>
      <el-table-column>
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
                v-if="scope.row.options.includes('2')"
                class="base-color"
                icon="el-icon-edit"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleEdit'
                }"
              >编辑</el-dropdown-item>
              <el-dropdown-item
                v-if="scope.row.options.includes('3')"
                icon="el-icon-delete"
                class="error-color"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleDelete'
                }"
              >删除</el-dropdown-item>
              <el-dropdown-item
                v-if="!scope.row.options.includes('1')"
                class="success-color"
                icon="el-icon-success"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handlePass'
                }"
              >启用</el-dropdown-item>
              <el-dropdown-item
                v-if="scope.row.options.includes('1')"
                class="warning-color"
                icon="el-icon-error"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleReject'
                }"
              >停用</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="角色信息" :visible.sync="show" width="1000px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="100px">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="角色名称">
                <el-input v-model="form.character" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="角色编码">
                <el-input v-model="form.code" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="选项">
                <el-checkbox-group v-model="form.options">
                  <el-checkbox label="1">有效</el-checkbox>
                  <el-checkbox label="2">允许编辑</el-checkbox>
                  <el-checkbox label="3">允许删除</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="备注">
                <el-input v-model="form.remarks" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show=false">取消</el-button>
        <el-button v-show="!edit" type="primary" @click="addSubmit">确认</el-button>
        <el-button v-show="edit" type="primary" @click="editSubmit">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog title="权限设置" :visible.sync="permissionsShow" width="500px" top="50px">
      <el-scrollbar style="height:400px">
        <div class="dialog-main">
          <el-tree
            default-expand-all
            :data="data"
            :props="props"
            show-checkbox
            @check-change="handleCheckChange"
          />
        </div>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button @click="permissionsShow=false">取消</el-button>
        <el-button type="primary" @click="permissionsSubmit">确认</el-button>
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
      props: {
        label: 'label',
        children: 'children'
      },
      data: [{
        label: '人员管理',
        children: [
          {
            label: '个人档案',
            children: [
              {
                label: '个人档案查看'
              },
              {
                label: '个人档案编辑'
              }
            ]
          },
          {
            label: '档案管理',
            children: [
              {
                label: '档案查看'
              },
              {
                label: '档案编辑'
              },
              {
                label: '档案删除'
              },
              {
                label: '档案审核'
              }
            ]
          },
          {
            label: '信息变动',
            children: [
              {
                label: '变动信息查看'
              },
              {
                label: '变动信息编辑'
              },
              {
                label: '变动信息删除'
              },
              {
                label: '变动信息审核'
              }
            ]
          },
          {
            label: '实习生管理',
            children: [
              {
                label: '轮转计划查看'
              },
              {
                label: '考核安排查看'
              },
              {
                label: '实习生评价科室'
              },
              {
                label: '科室评价实习生'
              }
            ]
          },
          {
            label: '进修生管理',
            children: [
              {
                label: '轮转计划查看'
              },
              {
                label: '考核安排查看'
              },
              {
                label: '进修生评价科室'
              },
              {
                label: '科室评价进修生'
              }
            ]
          },
          {
            label: '护士证书',
            children: [
              {
                label: '护士证书信息查看'
              },
              {
                label: '护士证书信息编辑'
              },
              {
                label: '护士证书信息删除'
              },
              {
                label: '护士证书信息新增'
              }
            ]
          },
          {
            label: '绩效管理',
            children: [
              {
                label: '个人绩效查看'
              },
              {
                label: '奖励记录查看'
              },
              {
                label: '惩罚记录查看'
              }
            ]
          }
        ]
      }
      ],
      tableData: [
        {
          character: '护理部主任',
          code: 'hlb_admin',
          type: '系统角色',
          attribution: '护理部',
          createTime: '2020-09-01',
          sorting: 1,
          options: ['1', '2', '3']
        },
        {
          character: '护士长',
          code: 'hsz_admin',
          type: '系统角色',
          attribution: '科室',
          createTime: '2020-09-01',
          sorting: 2,
          options: ['1', '2']
        },
        {
          character: '护士',
          code: 'hs_admin',
          type: '系统角色',
          attribution: '科室',
          createTime: '2020-09-01',
          sorting: 3,
          options: ['3']
        }
      ],
      form: {
      },
      oldForm: null,
      show: false,
      permissionsShow: false,
      edit: false,
      editIndex: 0
    }
  },
  methods: {
    handleCheckChange() {

    },
    handlePermissions(index, row) {
      this.editIndex = index
      this.permissionsShow = true
    },
    permissionsSubmit() {
      this.$message({
        message: '权限设置成功',
        type: 'success'
      })
    },
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    handlePass(index, row) {
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
    },
    addClick() {
      const d = new Date()
      this.edit = false
      this.form = {
        createTime: d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(),
        options: ['1']
      }
      this.show = true
    },
    addSubmit() {
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.tableData.push(this.form)
      this.show = false
    },
    editSubmit() {
      if (JSON.stringify(this.form) === JSON.stringify(this.oldForm)) {
        this.$message('无信息修改')
        this.show = false
        return
      }
      this.$message({
        message: '修改成功',
        type: 'success'
      })
      this.tableData.splice(this.editIndex, 1, this.form)
      this.show = false
    },
    handleEdit(index, row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.oldForm = JSON.parse(JSON.stringify(row))
      this.edit = true
      this.editIndex = index
      this.show = true
    },
    handleDelete(index, row) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.tableData.splice(index, 1)
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
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
