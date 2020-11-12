<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="包信息维护"
      :add-button="true"
      addifo="新增"
      :search-content="true"
      placeholder="物品编码"
      add-icon="el-icon-circle-plus-outline"
      @addClick="addClick"
    />
    <!-- 头部end -->
    <!-- table -->
    <el-table :data="tableData" style="width: 100%">
      <!-- 详细 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="拼音码">
              <span>{{ props.row.pinyinWriting }}</span>
            </el-form-item>
            <el-form-item label="五笔码">
              <span>{{ props.row.wubingWriting }}</span>
            </el-form-item>
            <el-form-item label="自定义码">
              <span>{{ props.row.customCode }}</span>
            </el-form-item>
            <el-form-item label="规格">
              <span>{{ props.row.specifications }}</span>
            </el-form-item>
            <el-form-item label="单价">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="计量单位">
              <span>{{ props.row.unit }}</span>
            </el-form-item>
            <el-form-item label="是否打包">
              <span>{{ props.row.ifPackaging }}</span>
            </el-form-item>
            <el-form-item label="是否清洗">
              <span>{{ props.row.ifCleaning }}</span>
            </el-form-item>
            <el-form-item label="是否灭菌">
              <span>{{ props.row.ifSterilization }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 详细end -->
      <el-table-column label="缩略图" align="center">
        <template slot-scope="scope">
          <img
            style="width: 70px;cursor:pointer"
            :src="scope.row.url"
            @click="handleImg(scope.row.srcList)"
          >
        </template>
      </el-table-column>
      <el-table-column label="包名称" prop="package" />
      <el-table-column label="所属类别" prop="type" />
      <el-table-column label="包装材料" prop="materials" />
      <el-table-column label="有效天数" prop="effectiveDays" />
      <el-table-column label="标签大小" prop="labelSize" />
      <el-table-column label="附加费用" prop="surcharge" />
      <el-table-column label="清洗程序" prop="cleaningSequence" />
      <el-table-column label="灭菌程序" prop="sterilizationSequence" />
      <el-table-column label="灭菌方法" prop="sterilizationMethod" />
      <el-table-column label="备注" prop="instructions" width="180" />
      <el-table-column width="220">
        <template slot-scope="scope">
          <el-button
            size="mini"
            style="margin-right:5px"
            @click="handleDetails(scope.$index, scope.row, 'pbox')"
          >
            <i class="el-icon-tickets" /> 查看明细
          </el-button>
          <el-dropdown trigger="click" class="dropdown" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-button
                size="mini"
                icon="el-icon-s-tools"
              >操作<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                icon="el-icon-upload2"
                class="normal-color"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleUpload'
                }"
              >上传</el-dropdown-item>
              <el-dropdown-item
                icon="el-icon-edit-outline"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleEdit'
                }"
              >编辑</el-dropdown-item>
              <el-dropdown-item
                class="error-color"
                icon="el-icon-delete"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleDelete'
                }"
              >删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <!-- 新增包弹窗 -->
    <el-dialog v-el-drag-dialog title="包信息" :visible.sync="editShow" width="800px">
      <div class="dialog-main">
        <el-scrollbar>
          <el-form ref="form" :model="form" label-width="90px" class="scrollbar-form">
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-form-item label="包名称">
                  <el-input v-model="form.package" />
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
                <el-form-item label="规格">
                  <el-select v-model="form.specifications" placeholder="">
                    <el-option
                      v-for="item in specifications"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="单价">
                  <el-input v-model="form.price" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-form-item label="计量单位">
                  <el-select v-model="form.unit" placeholder="">
                    <el-option
                      v-for="item in specifications"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="包所属类别">
                  <el-select v-model="form.type" placeholder="">
                    <el-option
                      v-for="item in type"
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
                <el-form-item label="是否打包">
                  <el-radio-group v-model="form.ifPackaging">
                    <el-radio label="是" />
                    <el-radio label="否" />
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="包装材料">
                  <el-input v-model="form.materials" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-form-item label="有效天数">
                  <el-input v-model="form.effectiveDays" />
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="标签大小">
                  <el-select v-model="form.labelSize" placeholder>
                    <el-option
                      v-for="item in labelSize"
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
                <el-form-item label="附加费用">
                  <el-input v-model="form.surcharge" />
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="是否清洗">
                  <el-radio-group v-model="form.ifCleaning">
                    <el-radio label="是" />
                    <el-radio label="否" />
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-form-item label="是否灭菌">
                  <el-radio-group v-model="form.ifSterilization">
                    <el-radio label="是" />
                    <el-radio label="否" />
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="清洗程序">
                  <el-input v-model="form.cleaningSequence" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-form-item label="灭菌程序">
                  <el-input v-model="form.sterilizationSequence" />
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="灭菌方法">
                  <el-select v-model="form.sterilizationMethod" placeholder>
                    <el-option
                      v-for="item in sterilizationMethod"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注">
                  <el-input v-model="form.instructions" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-show="!edit" type="primary" @click="addSubmit">确认</el-button>
        <el-button v-show="edit" type="primary" @click="editSubmit">确认</el-button>
        <el-button type="bgc" @click="emptyClick">信息清空</el-button>
      </div>
    </el-dialog>
    <!-- 新增包弹窗end -->
    <!-- 上传弹窗 -->
    <el-dialog v-el-drag-dialog :visible.sync="dialogVisible" title="图片" width="800px">
      <div class="dialog-main img-main">
        <el-upload
          :multiple="true"
          :file-list="fileList"
          :show-file-list="true"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          class="editor-slide-upload"
          action="https://httpbin.org/post"
          list-type="picture-card"
        >
          <el-button size="small" type="primary">
            点击上传
          </el-button>
        </el-upload>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
    <!-- 上传弹窗end -->
    <!-- 图片查看器 -->
    <el-image-viewer
      v-show="imgShow"
      :on-close="viewerClose"
      :url-list="srcList"
    />
    <!-- 图片查看器end -->
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
      url: '',
      srcList: [],
      tbox: true,
      pbox: false,
      listObj: {},
      fileList: [],
      dialogVisible: false,
      code: '',
      tableData: [
        {
          package: '糖足包',
          pinyinWriting: 'pg',
          wubingWriting: 'eup',
          customCode: 'EBSSS010',
          specifications: '包',
          price: '20',
          unit: '包',
          type: '器械包',
          ifPackaging: '是',
          materials: '无纺布',
          effectiveDays: '30',
          labelSize: '中条码',
          surcharge: '0',
          ifCleaning: '是',
          ifSterilization: '是',
          cleaningSequence: 'P1',
          sterilizationSequence: 'P1',
          sterilizationMethod: '高温灭菌',
          instructions: '',
          url: require('@/assets/images/step7.jpg'),
          srcList: [
            require('@/assets/images/step7.jpg')
          ]
        },
        {
          package: '膀胱镜',
          pinyinWriting: 'pg',
          wubingWriting: 'eup',
          customCode: 'EBSSS010',
          specifications: '包',
          price: '20',
          unit: '包',
          type: '器械包',
          ifPackaging: '是',
          materials: '无纺布',
          effectiveDays: '30',
          labelSize: '中条码',
          surcharge: '0',
          ifCleaning: '是',
          ifSterilization: '是',
          cleaningSequence: 'P1',
          sterilizationSequence: 'P1',
          sterilizationMethod: '高温灭菌',
          instructions: '',
          url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3276390503,1782042866&fm=26&gp=0.jpg',
          srcList: [
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3276390503,1782042866&fm=26&gp=0.jpg'
          ]
        },
        {
          package: '膀胱镜',
          pinyinWriting: 'pg',
          wubingWriting: 'eup',
          customCode: 'EBSSS010',
          specifications: '包',
          price: '20',
          unit: '包',
          type: '器械包',
          ifPackaging: '是',
          materials: '无纺布',
          effectiveDays: '30',
          labelSize: '中条码',
          surcharge: '0',
          ifCleaning: '是',
          ifSterilization: '是',
          cleaningSequence: 'P1',
          sterilizationSequence: 'P1',
          sterilizationMethod: '高温灭菌',
          instructions: '',
          url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3276390503,1782042866&fm=26&gp=0.jpg',
          srcList: [
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3276390503,1782042866&fm=26&gp=0.jpg'
          ]
        }
      ],
      specifications: [
        {
          value: '包',
          label: '包'
        },
        {
          value: '件',
          label: '件'
        },
        {
          value: '个',
          label: '个'
        },
        {
          value: '根',
          label: '根'
        },
        {
          value: '瓶',
          label: '瓶'
        },
        {
          value: '盘',
          label: '盘'
        }
      ],
      type: [
        {
          value: '器械包',
          label: '器械包'
        },
        {
          value: '外来包',
          label: '外来包'
        },
        {
          value: '一次性包',
          label: '一次性包'
        },
        {
          value: '消毒包',
          label: '消毒包'
        },
        {
          value: '特殊包',
          label: '特殊包'
        },
        {
          value: '其他',
          label: '其他'
        }
      ],
      labelSize: [
        {
          value: '大条码',
          label: '大条码'
        },
        {
          value: '中条码',
          label: '中条码'
        },
        {
          value: '小条码',
          label: '小条码'
        }
      ],
      sterilizationMethod: [
        {
          value: '高温高压灭菌',
          label: '高温高压灭菌'
        },
        {
          value: '低温灭菌',
          label: '低温灭菌'
        }
      ],
      form: {
        package: '',
        pinyinWriting: '',
        wubingWriting: '',
        customCode: '',
        specifications: '',
        price: '',
        unit: '',
        type: '',
        ifPackaging: '',
        materials: '',
        effectiveDays: '',
        labelSize: '',
        surcharge: '',
        ifCleaning: '',
        ifSterilization: '',
        cleaningSequence: '',
        sterilizationSequence: '',
        sterilizationMethod: '',
        instructions: ''
      },
      oldForm: {},
      edit: false,
      editIndex: 0,
      editShow: false,
      title: '',
      imgShow: false
    }
  },
  methods: {
    // 新增包弹窗 信息清空按钮
    emptyClick() {
      this.form = {
        package: '',
        pinyinWriting: '',
        wubingWriting: '',
        customCode: '',
        specifications: '',
        price: '',
        unit: '',
        type: '',
        ifPackaging: '',
        materials: '',
        effectiveDays: '',
        labelSize: '',
        surcharge: '',
        ifCleaning: '',
        ifSterilization: '',
        cleaningSequence: '',
        sterilizationSequence: '',
        sterilizationMethod: '',
        instructions: ''
      }
    },
    // 图片查看器关闭
    viewerClose() {
      this.imgShow = false
    },
    // 图片查看器开启
    handleImg(src) {
      this.imgShow = true
      this.srcList = src
    },
    // 操作下拉的点击
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    // 上传
    handleUpload() {
      this.dialogVisible = true
    },
    // 查看所有图片是否上传完毕
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    // 上传弹窗确认按钮
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message({
          message: '请等待所有图片上传完毕',
          type: 'warning'
        })
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    // 上传成功
    handleSuccess(response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.files.file
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    // 移除上传内容
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    // 上传的动作
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    },
    // 查看明细
    handleDetails(index, row, box) {
      this.title = row.package + '明细'
      this.$router.push({
        name: 'packageDetails',
        params: { title: this.title }
      })
    },
    // 删除
    handleDelete(index, row) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.tableData.splice(index, 1)
    },
    // 新增
    addClick() {
      this.edit = false
      this.editShow = true
      this.form = {
        package: '',
        pinyinWriting: '',
        wubingWriting: '',
        customCode: '',
        specifications: '',
        price: '',
        unit: '',
        type: '',
        ifPackaging: '',
        materials: '',
        effectiveDays: '',
        labelSize: '',
        surcharge: '',
        ifCleaning: '',
        ifSterilization: '',
        cleaningSequence: '',
        sterilizationSequence: '',
        sterilizationMethod: '',
        instructions: ''
      }
    },
    // 新增弹窗确认按钮
    addSubmit() {
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.tableData.push(this.form)
      this.editShow = false
    },
    // 编辑
    handleEdit(index, row) {
      this.edit = true
      this.editShow = true
      this.form = JSON.parse(JSON.stringify(row))
      this.oldForm = JSON.parse(JSON.stringify(row))
      this.editIndex = index
    },
    // 编辑确认
    editSubmit() {
      this.editShow = false
      if (JSON.stringify(this.form) === JSON.stringify(this.oldForm)) {
        this.$message('无信息修改')
        return
      }
      this.$message({
        message: '修改成功',
        type: 'success'
      })
      this.tableData.splice(this.editIndex, 1, this.form)
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
::v-deep .demo-table-expand .el-form-item__label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 25%;
}
.dialog-main {
  padding: 0;
}
.img-main {
  padding: 30px 20px;
}
</style>
