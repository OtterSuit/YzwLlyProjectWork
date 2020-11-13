<template>
  <div>
    <RightPanel :click-not-close="true">
      <div class="drawer-main">
        <el-scrollbar>
          <div class="drawer-container">
            <div class="drawer-title">物资分类</div>
            <div v-if="datas.length===0" style="text-align:center">
              <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addClick">新增物资分类</el-button>
            </div>
            <div v-else>
              <el-input v-model="filterText" class="xd_search" placeholder="分类名称" />
              <el-button type="primary" style="margin:0 0 10px 10px" @click="onFind">查找</el-button>
              <!-- 树 -->
              <el-tree
                ref="tree"
                :data="datas"
                node-key="id"
                :filter-node-method="filterNode"
                :expand-on-click-node="false"
              >
                <div slot-scope="{node,data}" class="tree-node" @dblclick="handleNodeClick(data)">
                  <div class="tree-node">
                    <span class="node-tit">{{ data.name }}</span>
                    <span>
                      <el-dropdown trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                          <i class="el-icon-more more" />
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="{
                              node: node,
                              data: data,
                              action: 'insertAfter'
                            }"
                          >添加同级分类</el-dropdown-item>
                          <el-dropdown-item
                            :command="{
                              node: node,
                              data: data,
                              action: 'append'
                            }"
                          >添加子级分类</el-dropdown-item>
                          <el-dropdown-item
                            :command="{
                              node: node,
                              data: data,
                              action: 'nodeClick'
                            }"
                          >编辑</el-dropdown-item>
                          <el-dropdown-item
                            :command="{
                              node: node,
                              data: data,
                              action: 'remove'
                            }"
                          >删除</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </span>
                  </div>
                </div>
              </el-tree>
            <!-- 树end -->
            </div>
          </div>
        </el-scrollbar>
      </div>
    </RightPanel>
    <!-- 添加编辑弹窗 -->
    <el-dialog v-el-drag-dialog title="分类信息" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" :rules="rules" label-width="90px">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="分类名称" prop="classifyName">
                <el-input v-model="form.classifyName" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="拼音码">
                <el-input v-model="form.spellCode" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="五笔码">
                <el-input v-model="form.strokeCode" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="自定义码">
                <el-input v-model="form.customCode" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="国家编码">
                <el-input v-model="form.countryCode" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="所属仓库">
                <el-input v-model="form.ownWarehouse" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="有效范围">
                <el-select v-model="form.effctiveRange" placeholder="">
                  <el-option
                    v-for="(val, key) in ssd_effective_range"
                    :key="val"
                    :label="val"
                    :value="key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="财务分类">
                <el-select v-model="form.financialType" placeholder>
                  <el-option
                    v-for="(val, key) in ssd_financial_type"
                    :key="val"
                    :label="val"
                    :value="key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="按批次管理">
                <el-radio-group v-model="form.batchManageFlag">
                  <el-radio
                    v-for="(val, key) in ssd_common_boolean"
                    :key="val"
                    :label="+key"
                  >{{ val }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="停用">
                <el-radio-group v-model="form.stopFlag">
                  <el-radio
                    v-for="(val, key) in ssd_common_boolean"
                    :key="val"
                    :label="+key"
                  >{{ val }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="财务收费">
                <el-radio-group v-model="form.financialChargeFlag">
                  <el-radio
                    v-for="(val, key) in ssd_common_boolean"
                    :key="val"
                    :label="+key"
                  >{{ val }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="效期管理">
                <el-radio-group v-model="form.expireManageFlag">
                  <el-radio
                    v-for="(val, key) in ssd_common_boolean"
                    :key="val"
                    :label="+key"
                  >{{ val }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input v-model="form.remark" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitClick">确认</el-button>
        <el-button @click="show=false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 添加编辑弹窗end -->
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import api from '@/api'

export default {
  components: {
    RightPanel
  },
  inject: ['reload'],
  data() {
    return {
      rules: {
        classifyName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      show: false,
      form: {},
      oldForm: {},
      showSettings: true,
      filterText: '',
      datas: [],
      editNode: null,
      editData: null,
      operation: null,
      ssd_common_boolean: null,
      ssd_effective_range: null,
      ssd_financial_type: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.toconsuppliestree().then(response => {
        // console.log(response)
        this.ssd_common_boolean = response.data.dictData.ssd_common_boolean
        this.ssd_effective_range = response.data.dictData.ssd_effective_range
        this.ssd_financial_type = response.data.dictData.ssd_financial_type
        if (response.data.treeInfo.length === 0) {
          this.$message({
            message: '暂无物资分类，请添加',
            type: 'warning'
          })
          return
        }
        if (!this.$route.query.id) {
          this.$router.push({
            name: 'Goods',
            query: {
              id: response.data.treeInfo[0].id,
              name: response.data.treeInfo[0].name
            }
          })
        }
        // this.$parent.id = response.data.treeInfo[0].id
        // this.$parent.title = response.data.treeInfo[0].name + '物资管理'
        this.datas = response.data.treeInfo
      })
    },
    addClick() {
      this.form = {
        parentId: '0'
      }
      this.operation = 'addSubmit'
      this.show = true
    },
    addSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          api.toAddsuppliesltype(this.form).then(response => {
            // console.log(response)
            if (response.code === '200' && response.data.busiCode === '1') {
              this.reload()
              this.$message({
                message: '添加节点成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '添加失败，请重试',
                type: 'error'
              })
            }
          })
          this.show = false
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    // 树右侧... 下拉点击
    handleCommand({ node, data, action }) {
      this.editNode = node
      this.editData = data
      this.operation = action
      if (action === 'insertAfter') {
        this.form = {
          parentId: data.parentId
        }
      } else if (action === 'append') {
        this.form = {
          parentId: data.id
        }
      } else if (action === 'nodeClick') {
        api.toGetsuppliestype({ id: data.id }).then(response => {
          // console.log(response)
          this.oldForm = JSON.parse(JSON.stringify(response.data))
          this.form = response.data
          // this.datas = response.data.treeInfo
        })
      } else {
        this.remove(this.editNode, this.editData)
        return
      }
      this.show = true
    },
    // 弹窗确认点击
    submitClick() {
      this[this.operation](this.editNode, this.editData)
    },
    // 树点击事件
    handleNodeClick(data) {
      this.$router.push({
        name: 'Goods',
        query: {
          id: data.id,
          name: data.name
        }
      })
      // this.$parent.id = data.id
      // this.$parent.title = data.name + '物资管理'
    },
    // 查找按钮
    onFind() {
      this.$refs.tree.filter(this.filterText)
    },
    // 添加同级节点
    insertAfter(node, data) {
      this.$refs.form.validate(async valid => {
        if (valid) {
          api.toAddsuppliesltype(this.form).then(response => {
            // console.log(response)
            if (response.code === '200' && response.data.busiCode === '1') {
              const newBrother = {
                id: response.data.id,
                name: response.data.classifyName,
                parentId: response.data.parentId,
                children: null
              }
              const curArr = node.parent.data.children || node.parent.data
              curArr.push(newBrother)
              this.$message({
                message: '添加节点成功',
                type: 'success'
              })
            }
          })
          this.show = false
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    // 添加子节点
    append(node, data) {
      this.$refs.form.validate(async valid => {
        if (valid) {
          api.toAddsuppliesltype(this.form).then(response => {
            // console.log(response)
            if (response.code === '200' && response.data.busiCode === '1') {
              const newChild = {
                id: response.data.id,
                name: response.data.classifyName,
                parentId: response.data.parentId,
                children: null
              }
              if (data.children === null) {
                data.children = []
              }
              data.children.push(newChild)
              this.$message({
                message: '添加子节点成功',
                type: 'success'
              })
            }
          })
          this.show = false
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    // 获取当前节点修改checked值
    nodeClick(node, data) {
      if (JSON.stringify(this.form) === JSON.stringify(this.oldForm)) {
        this.$message('无信息修改')
        this.show = false
        return
      }
      this.$refs.form.validate(async valid => {
        if (valid) {
          api.toRevisuppliestype(this.form).then(response => {
            // console.log(response)
            if (response.code === '200' && response.data.busiCode === '1') {
              // this.tableData.splice(this.editIndex, 1, response.data)
              const parent = node.parent
              const children = parent.data.children || parent.data
              const index = children.findIndex(d => d.$treeNodeId === node.id)
              const editChild = {
                id: this.form.id,
                name: this.form.classifyName,
                parentId: this.form.parentId,
                children: children[index].children
              }
              children.splice(index, 1, editChild)
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
            }
          })
          this.show = false
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    // 删除节点
    remove(node, data) {
      api.toDeletesuppliestype(data).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          // this.tableData.splice(index, 1)
          const parent = node.parent
          const children = parent.data.children || parent.data
          const index = children.findIndex(d => d.$treeNodeId === node.id)
          children.splice(index, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    // 树过滤
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    }
  }
}
</script>
<style lang="scss" >
.xd_sumbi {
  width: 170px;
  height: 30px;
  .el-input__inner {
    height: 30px;
    line-height: 30px;
    margin-right: 5px;
  }
}
</style>
<style lang="scss" scoped>
.tree-node {
  width: 100%;
  height: 32px;
  line-height: 32px;
}
.drawer-title {
  height: 40px;
  margin-bottom: 10px;
  line-height: 40.8px;
  font-size: 18px;
}
.drawer-main {
  height: 100vh;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
}
::v-deep .el-dropdown {
  position: absolute;
  right: 0;
  top: -10px;
}
::v-deep .el-tree-node__content {
  position: relative;
  height: 32px;
}
.more {
  position: relative;
  top: 14px;
  right: 8px;
}
.xd_search {
  width: 262px;
}

.save-btn {
  height: 30px;
  line-height: 30px;
  padding: 0px 10px;
}
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
.node-tit {
  user-select: none
}
</style>
