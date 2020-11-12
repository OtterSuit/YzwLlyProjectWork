<template>
  <div>
    <RightPanel :click-not-close="true">
      <div class="drawer-main">
        <el-scrollbar>
          <div class="drawer-container">
            <div class="drawer-title">物资分类</div>
            <el-input v-model="filterText" class="xd_search" />
            <el-button type="primary" style="margin:0 0 10px 10px" @click="onFind">查找</el-button>
            <!-- 树 -->
            <el-tree
              ref="tree"
              :data="datas"
              node-key="id"
              :filter-node-method="filterNode"
              :expand-on-click-node="false"
              @node-click="handleNodeClick"
            >
              <div slot-scope="{node,data}" class="tree-node">
                <div class="tree-node">
                  <span class="node-tit">{{ data.label }}</span>
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
        </el-scrollbar>
      </div>
    </RightPanel>
    <!-- 添加编辑弹窗 -->
    <el-dialog v-el-drag-dialog title="分类信息" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="90px">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="分类名称">
                <el-input v-model="form.label" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="拼音码">
                <el-input v-model="form.pinyinWriting" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="五笔码">
                <el-input v-model="form.wubingWriting" />
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
                <el-input v-model="form.warehouse" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="有效范围">
                <el-select v-model="form.effectiveRange" placeholder>
                  <el-option
                    v-for="item in effectiveRange"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="财务分类">
                <el-select v-model="form.financial" placeholder>
                  <el-option
                    v-for="item in financial"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="按批次管理">
                <el-radio-group v-model="form.batch">
                  <el-radio label="是" />
                  <el-radio label="否" />
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="停用">
                <el-radio-group v-model="form.disable">
                  <el-radio label="是" />
                  <el-radio label="否" />
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="财务收费">
                <el-radio-group v-model="form.financialClassification">
                  <el-radio label="是" />
                  <el-radio label="否" />
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="备注">
                <el-input v-model="form.Mark" />
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

export default {
  components: {
    RightPanel
  },
  data() {
    return {
      show: false,
      form: {
        label: '',
        pinyinWriting: '',
        wubingWriting: '',
        customCode: '',
        countryCode: '',
        warehouse: '',
        effectiveRange: '',
        financial: '',
        batch: '',
        disable: '',
        financialClassification: '',
        Mark: ''
      },
      showSettings: true,
      filterText: '',
      datas: [
        {
          label: '刀类',
          children: [
            {
              label: '叉'
            },
            {
              label: '针'
            },
            {
              label: '刀'
            }
          ]
        },
        {
          label: '布类'
        },
        {
          label: '塑料'
        },
        {
          label: '玻璃制品'
        },
        {
          label: '木屑类'
        }
      ],
      financial: [
        {
          value: '医技诊疗',
          label: '医技诊疗'
        },
        {
          value: '临床诊疗',
          label: '临床诊疗'
        },
        {
          value: '化学试剂',
          label: '化学试剂'
        },
        {
          value: '配件',
          label: '配件'
        },
        {
          value: '办公产品',
          label: '办公产品'
        },
        {
          value: '低值易耗',
          label: '低值易耗'
        },
        {
          value: '被服材料',
          label: '被服材料'
        },
        {
          value: '测试',
          label: '测试'
        }
      ],
      effectiveRange: [
        {
          value: '全院',
          label: '全院'
        },
        {
          value: '本科室',
          label: '本科室'
        },
        {
          value: '本科室及下级科室',
          label: '本科室及下级科室'
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      editNode: null,
      editData: null,
      operation: null
    }
  },
  methods: {
    // 树右侧... 下拉点击
    handleCommand({ node, data, action }) {
      this.editNode = node
      this.editData = data
      this.operation = action
      if (action === 'insertAfter' || action === 'append') {
        this.form = {
          label: '',
          pinyinWriting: '',
          wubingWriting: '',
          customCode: '',
          countryCode: '',
          warehouse: '',
          effectiveRange: '',
          financial: '',
          batch: '',
          disable: '',
          financialClassification: '',
          Mark: ''
        }
      } else if (action === 'nodeClick') {
        this.form = JSON.parse(JSON.stringify(data))
      } else {
        this.remove(this.editNode, this.editData)
        return
      }
      this.show = true
    },
    // 弹窗确认点击
    submitClick() {
      this[this.operation](this.editNode, this.editData)
      this.show = false
    },
    // 树点击事件
    handleNodeClick(data) {
      // console.log(data.label)
      this.$parent.title = data.label + '物资管理'
    },
    // 查找按钮
    onFind() {
      this.$refs.tree.filter(this.filterText)
    },
    // 添加同级节点
    insertAfter(node, data) {
      const nodeList = node.parent.childNodes
      const curArr = node.parent.data.children || node.parent.data
      const index = curArr.findIndex(d => d.id === data.id) + 1
      // console.log(node)
      new Promise((resolve, reject) => {
        const newBrother = this.form
        newBrother.id = ++this.id
        newBrother.children = []
        curArr.splice(index, 0, newBrother)
        resolve()
      }).then(res => {
        // console.log(nodeList[index])
        nodeList[index].checked = true
      })
      this.$message({
        message: '添加同级节点成功',
        type: 'success'
      })
    },
    // 添加子节点
    append(node, data) {
      const nodeList = node.childNodes
      // console.log(nodeList)
      new Promise((resolve, reject) => {
        const newChild = this.form
        newChild.id = ++this.id
        newChild.children = []
        // const newChild = { id: ++this.id, label: '', children: [] }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
        resolve()
      }).then(res => {
        nodeList[nodeList.length - 1].checked = true
      })
      this.$message({
        message: '添加子节点成功',
        type: 'success'
      })
    },
    // 获取当前节点修改checked值
    nodeClick(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.$treeNodeId === node.id)
      children.splice(index, 1, this.form)
      this.$message({
        message: '编辑成功',
        type: 'success'
      })
    },
    // 删除节点
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.$treeNodeId === node.id)
      children.splice(index, 1)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    // 树过滤
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
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
</style>
