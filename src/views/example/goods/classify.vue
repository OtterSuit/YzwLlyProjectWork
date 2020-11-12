<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      :title="title"
      addifo="新增"
      add-icon="el-icon-circle-plus-outline"
      :add-button="true"
      @addClick="addClick"
    />
    <!-- 头部end -->
    <!-- 图片查看器 -->
    <el-image-viewer
      v-show="imgShow"
      :on-close="viewerClose"
      :url-list="srcList"
    />
    <!-- 图片查看器end -->
    <!-- table -->
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <!-- 详细内部内容 start-->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="拼音编码">
              <span>{{ props.row.pinyinWriting }}</span>
            </el-form-item>
            <el-form-item label="五笔编码">
              <span>{{ props.row.wubingWriting }}</span>
            </el-form-item>
            <el-form-item label="自定义码 ">
              <span>{{ props.row.customCode }}</span>
            </el-form-item>
            <el-form-item label="国家编码 ">
              <span>{{ props.row.countryCode }}</span>
            </el-form-item>
            <el-form-item label="别名">
              <span>{{ props.row.alias }}</span>
            </el-form-item>
            <el-form-item label="别名拼音码">
              <span>{{ props.row.aliaspinyinCode }}</span>
            </el-form-item>
            <el-form-item label="别名五笔码">
              <span>{{ props.row.aliasWubiCode }}</span>
            </el-form-item>
            <el-form-item label="别名自定义码">
              <span>{{ props.row.aliasCustomCode }}</span>
            </el-form-item>
            <el-form-item label="零售单价">
              <span>{{ props.row.retailPrice }}</span>
            </el-form-item>
            <el-form-item label="大包装单价">
              <span>{{ props.row.rargePackage }}</span>
            </el-form-item>
            <el-form-item label="加价规则">
              <span>{{ props.row.markupRules }}</span>
            </el-form-item>
            <el-form-item label="最小费用代码">
              <span>{{ props.row.minimumCode }}</span>
            </el-form-item>
            <el-form-item label="财务收费标准">
              <span>{{ props.row.chargeSign }}</span>
            </el-form-item>
            <el-form-item label="停用标记">
              <span>{{ props.row.deactivateTag }}</span>
            </el-form-item>
            <el-form-item label="生产厂家">
              <span>{{ props.row.manufacturer }}</span>
            </el-form-item>
            <el-form-item label="供货公司">
              <span>{{ props.row.supplyCompany }}</span>
            </el-form-item>
            <el-form-item label="来源">
              <span>{{ props.row.comeFrom }}</span>
            </el-form-item>
            <el-form-item label="用途">
              <span>{{ props.row.application }}</span>
            </el-form-item>
            <el-form-item label="批文信息">
              <span>{{ props.row.approvalInformation }}</span>
            </el-form-item>
            <el-form-item label="生产者">
              <span>{{ props.row.producer }}</span>
            </el-form-item>
            <el-form-item label="注册号">
              <span>{{ props.row.registrationNum }}</span>
            </el-form-item>
            <el-form-item label="特殊类别">
              <span>{{ props.row.specialCategory }}</span>
            </el-form-item>
            <el-form-item label="注册日期">
              <span>{{ props.row.registrationDate }}</span>
            </el-form-item>
            <el-form-item label="到期日期">
              <span>{{ props.row.dateExpiry }}</span>
            </el-form-item>
            <el-form-item label="财务审核标记">
              <span>{{ props.row.financialAuditMark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 详细内部内容 end -->
      <el-table-column label="缩略图" align="center">
        <template slot-scope="scope">
          <img
            style="width: 70px;cursor:pointer"
            :src="scope.row.url"
            @click="handleImage(scope.row.srcList)"
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="itemName"
        label="物品名称"
      />
      <el-table-column
        prop="warehouse"
        label="仓库"
      />
      <el-table-column
        prop="effectiveRange"
        label="有效范围"
      />
      <el-table-column
        prop="standard"
        label="规格"
      />
      <el-table-column
        prop="smallestUnit"
        label="最小单位"
      />
      <el-table-column
        prop="unitPrice"
        label="最新入库单价"
        width="110"
      />
      <el-table-column
        prop="materialMark"
        label="特殊耗材标志"
        width="110"
      />
      <el-table-column
        prop="whetherPack"
        label="是否打包"
      />
      <el-table-column
        label="操作员"
        prop="operator"
      />
      <el-table-column
        label="操作日期"
        prop="operatorData"
      />
      <el-table-column
        label="备注"
        prop="mark"
      />
      <el-table-column align="center">
        <template slot-scope="scope">
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
    <!-- 图片上传弹窗 -->
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
    <!-- 图片上传弹窗end -->
    <!-- 新增编辑弹窗 -->
    <el-dialog v-el-drag-dialog title="物资信息" :visible.sync="show" width="1200px">
      <div class="dialog-main goods-main">
        <el-scrollbar>
          <el-form ref="form" :model="form" label-width="100px" class="scrollbar-form">
            <el-row type="flex" :gutter="20">
              <el-col :span="6">
                <el-form-item label="物品名称">
                  <el-input v-model="form.itemName" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="仓库">
                  <el-input v-model="form.warehouse" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="拼音编码">
                  <el-input v-model="form.pinyinWriting" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="五笔编码">
                  <el-input v-model="form.wubingWriting" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" :gutter="20">
              <el-col :span="6">
                <el-form-item label="自定义码">
                  <el-input v-model="form.customCode" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="国家编码">
                  <el-input v-model="form.countryCode" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="别名">
                  <el-input v-model="form.alias" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="别名拼音码">
                  <el-input v-model="form.aliaspinyinCode" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" :gutter="20">
              <el-col :span="6">
                <el-form-item label="别名五笔码">
                  <el-input v-model="form.aliasWubiCode" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="别名自定义码">
                  <el-input v-model="form.aliasCustomCode" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="有效范围">
                  <el-select v-model="form.effectiveRange" placeholder="">
                    <el-option label="供应室" value="供应室" />
                    <el-option label="护理部" value="护理部" />
                    <el-option label="物资部" value="物资部" />
                    <el-option label="信息科" value="信息科" />
                    <el-option label="其他" value="其他" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="规格">
                  <el-input v-model="form.standard" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" :gutter="20">
              <el-col :span="6">
                <el-form-item label="最小单位">
                  <el-select v-model="form.smallestUnit" placeholder="">
                    <el-option label="支" value="支" />
                    <el-option label="公斤" value="公斤" />
                    <el-option label="升" value="升" />
                    <el-option label="盘" value="盘" />
                    <el-option label="其他" value="其他" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="最新入库单价">
                  <el-input v-model="form.unitPrice" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="零售单价">
                  <el-input v-model="form.retailPrice" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="大包装单价">
                  <el-input v-model="form.rargePackage" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" :gutter="20">
              <el-col :span="6">
                <el-form-item label="加价规则">
                  <el-select v-model="form.markupRules" placeholder="">
                    <el-option label="不加价" value="不加价" />
                    <el-option label="按固定加" value="按固定加" />
                    <el-option label="按价格加" value="按价格加" />
                    <el-option label="按规格加" value="按规格加" />
                    <el-option label="其他" value="其他" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="最小费用代码">
                  <el-input v-model="form.minimumCode" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="财务收费标准">
                  <el-input v-model="form.chargeSign" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="停用标记">
                  <el-input v-model="form.deactivateTag" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" :gutter="20">
              <el-col :span="6">
                <el-form-item label="特殊耗材标志">
                  <el-input v-model="form.materialMark" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="生产厂家">
                  <el-input v-model="form.manufacturer" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="供货公司">
                  <el-input v-model="form.supplyCompany" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="来源">
                  <el-input v-model="form.comeFrom" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" :gutter="20">
              <el-col :span="6">
                <el-form-item label="用途">
                  <el-input v-model="form.application" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="批文信息">
                  <el-input v-model="form.approvalInformation" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="生产者">
                  <el-input v-model="form.producer" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="注册号">
                  <el-input v-model="form.registrationNum" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" :gutter="20">
              <el-col :span="6">
                <el-form-item label="特殊类别">
                  <el-select v-model="form.specialCategory" placeholder="">
                    <el-option label="分类1" value="分类1" />
                    <el-option label="分类2" value="分类2" />
                    <el-option label="分类3" value="分类3" />
                    <el-option label="分类4" value="分类4" />
                    <el-option label="分类5" value="分类5" />
                    <el-option label="分类6" value="分类6" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="注册日期">
                  <el-date-picker
                    v-model="form.registrationDate"
                    type="date"
                    :clearable="false"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="到期日期">
                  <el-date-picker
                    v-model="form.dateExpiry"
                    type="date"
                    :clearable="false"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否打包">
                  <el-radio-group v-model="form.whetherPack">
                    <el-radio label="是">是</el-radio>
                    <el-radio label="否">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" :gutter="20">
              <el-col :span="6">
                <el-form-item label="财务审核标记">
                  <el-radio-group v-model="form.financialAuditMark">
                    <el-radio label="是">是</el-radio>
                    <el-radio label="否">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item label="备注">
                  <el-input v-model="form.mark" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-show="!edit" type="primary" @click="addSubmit">确认</el-button>
        <el-button v-show="edit" type="primary" @click="editSubmit">确认</el-button>
      </div>
    </el-dialog>
    <!-- 新增编辑弹窗end -->
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'

export default {
  components: { myfilters },
  props: {
    title: {
      type: String,
      default: '基本物资管理'
    }
  },
  data() {
    return {
      imgShow: false,
      show: false,
      edit: false,
      editIndex: 0,
      dialogVisible: false,
      listObj: {},
      fileList: [],
      color: {
        type: String,
        default: '#1890ff'
      },
      url: require('@/assets/images/jiazi.png'),
      srcList: [],
      tableData: [
        {
          standard: '把',
          supplyCompany: '广州科密电子科技有效公司 ',
          unitPrice: '5 ',
          warehouse: '消毒区仓库',
          whetherPack: '是',
          wubingWriting: 'VB ',
          url: require('@/assets/images/jiazi.png'),
          srcList: [
            require('@/assets/images/jiazi.png')
          ],
          alias: '刀子',
          aliasCustomCode: 'dz',
          aliasWubiCode: 'dz',
          aliaspinyinCode: 'daozi',
          application: '',
          approvalInformation: '',
          chargeSign: '不收费',
          classification: '84',
          classificationCode: '087',
          comeFrom: '',
          consumables: '',
          countryCode: 'jd',
          customCode: 'jd',
          dateExpiry: '2022-04-20',
          deactivateTag: '是',
          effectiveDepartment: '',
          effectiveRange: '供应室',
          financialAuditMark: '是',
          itemCode: '0003223',
          itemName: '剪刀',
          manufacturer: '',
          markupRules: '不加价',
          materialMark: '是',
          minimumCode: 'gds',
          operator: '',
          operatorData: '2020-04-06',
          pinyinWriting: 'jiandao',
          producer: '',
          rargePackage: '5',
          rargePackageNum: '',
          rargePackagePrice: '',
          registrationDate: '2020-06-20',
          registrationNum: 'jd123',
          retailPrice: '5',
          smallestUnit: '支',
          specialCategory: '分类1'

        },
        {
          itemCode: '0003221',
          url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1431818232,2863263451&fm=26&gp=0.jpg',
          srcList: [
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1431818232,2863263451&fm=26&gp=0.jpg'
          ],
          warehouse: '消毒区仓库',
          itemName: '叉具',
          pinyinWriting: 'chaju',
          alias: ' 叉子',
          aliaspinyinCode: ' chazi',
          aliasCustomCode: 'dz',
          aliasWubiCode: 'dz',
          application: '',
          approvalInformation: '',
          chargeSign: '不收费',
          classification: '84',
          classificationCode: '087',
          comeFrom: '',
          consumables: '',
          countryCode: 'jd',
          customCode: 'jd',
          dateExpiry: '2022-04-20',
          deactivateTag: '是',
          effectiveDepartment: '',
          effectiveRange: '供应室',
          financialAuditMark: '是',
          manufacturer: '',
          markupRules: '不加价',
          materialMark: '是',
          minimumCode: 'gds',
          operator: '',
          operatorData: '2020-04-06',
          producer: '',
          rargePackage: '5',
          rargePackageNum: '',
          rargePackagePrice: '',
          registrationDate: '2020-06-20',
          registrationNum: 'jd123',
          retailPrice: '5',
          smallestUnit: '支',
          specialCategory: '分类1',
          standard: '把',
          supplyCompany: '广州科密电子科技有效公司 ',
          unitPrice: '5 ',
          whetherPack: '是',
          wubingWriting: 'VB'
        },
        {
          itemCode: '0003225',
          url: require('@/assets/images/qianzi.png'),
          srcList: [
            require('@/assets/images/qianzi.png')
          ],
          warehouse: '消毒区仓库',
          itemName: '钳具',
          pinyinWriting: 'qianju',
          alias: '钳子',
          aliaspinyinCode: 'qianzi',
          aliasCustomCode: 'dz',
          aliasWubiCode: 'dz',
          application: '',
          approvalInformation: '',
          chargeSign: '不收费',
          classification: '84',
          classificationCode: '087',
          comeFrom: '',
          consumables: '',
          countryCode: 'jd',
          customCode: 'jd',
          dateExpiry: '2022-04-20',
          deactivateTag: '是',
          effectiveDepartment: '',
          effectiveRange: '供应室',
          financialAuditMark: '是',
          manufacturer: '',
          markupRules: '不加价',
          materialMark: '是',
          minimumCode: 'gds',
          operator: '',
          operatorData: '2020-04-06',
          producer: '',
          rargePackage: '5',
          rargePackageNum: '',
          rargePackagePrice: '',
          registrationDate: '2020-06-20',
          registrationNum: 'jd123',
          retailPrice: '5',
          smallestUnit: '支',
          specialCategory: '分类1',
          standard: '把',
          supplyCompany: '广州科密电子科技有效公司 ',
          unitPrice: '5 ',
          whetherPack: '是',
          wubingWriting: 'VB'
        }],
      multipleSelection: [],
      form: {
        itemName: '',
        warehouse: '',
        effectiveRange: '',
        standard: '',
        smallestUnit: '',
        unitPrice: '',
        materialMark: '',
        whetherPack: '',
        operator: '',
        operatorData: '',
        mark: '',
        pinyinWriting: '',
        wubingWriting: '',
        customCode: '',
        countryCode: '',
        alias: '',
        aliaspinyinCode: '',
        aliasWubiCode: '',
        aliasCustomCode: '',
        retailPrice: '',
        rargePackage: '',
        markupRules: '',
        minimumCode: '',
        chargeSign: '',
        deactivateTag: '',
        manufacturer: '',
        supplyCompany: '',
        comeFrom: '',
        application: '',
        approvalInformation: '',
        producer: '',
        registrationNum: '',
        specialCategory: '',
        registrationDate: '',
        dateExpiry: '',
        financialAuditMark: ''
      }
    }
  },
  methods: {
    // 操作下拉点击
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    // 图片查看器关闭
    viewerClose() {
      this.imgShow = false
    },
    // 图片查看器开启
    handleImage(src) {
      this.imgShow = true
      this.srcList = src
    },
    // 上传
    handleUpload() {
      this.dialogVisible = true
    },
    // 查看所有图片是否上传完毕
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    // 上传按钮
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
    // 新增
    addClick() {
      this.edit = false
      this.form = {
        name: '',
        jobNum: '',
        hierarchy: ''
      }
      this.show = true
    },
    // 新增弹窗确认按钮
    addSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.tableData.push(this.form)
          this.show = false
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    // 编辑弹窗确认
    editSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.tableData.splice(this.editIndex, 1, this.form)
          this.show = false
          this.edit = false
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
      this.form = JSON.parse(JSON.stringify(row))
      this.edit = true
      this.editIndex = index
      this.show = true
    },
    // 删除
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
::v-deep .demo-table-expand .el-form-item__label {
  width: 100px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 25%;
}
.goods-main {
  padding: 0;
}
.img-main {
  padding-bottom: 30px;
}
.scrollbar-form {
  padding-top: 20px;
  padding-bottom: 0;
}
</style>
