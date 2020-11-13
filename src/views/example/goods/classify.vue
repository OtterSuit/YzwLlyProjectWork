<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      :title="title"
      :add-button="true"
      :search-content="true"
      placeholder="物品名称/编码"
      @contentChange="contentChange"
      @addClick="addClick"
    />
    <!-- 头部end -->
    <!-- 图片查看器 -->
    <el-image-viewer v-if="imgShow" :on-close="viewerClose" :url-list="srcList" />
    <!-- 图片查看器end -->
    <!-- table -->
    <el-table v-loading="listLoading" :data="tableData" style="width: 100%">
      <!-- 详细内部内容 start-->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="仓库">
              <span>{{ props.row.warehouse }}</span>
            </el-form-item>
            <el-form-item label="有效科室">
              <span>{{ props.row.effctiveDepartment }}</span>
            </el-form-item>
            <el-form-item label="最新入库单价">
              <span>{{ props.row.newestUnitPrice }}</span>
            </el-form-item>
            <el-form-item label="拼音编码">
              <span>{{ props.row.spellCode }}</span>
            </el-form-item>
            <el-form-item label="五笔编码">
              <span>{{ props.row.strokeCode }}</span>
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
              <span>{{ props.row.aliasSpellCode }}</span>
            </el-form-item>
            <el-form-item label="别名五笔码">
              <span>{{ props.row.aliasStrokeCode }}</span>
            </el-form-item>
            <el-form-item label="别名自定义码">
              <span>{{ props.row.aliasCustomCode }}</span>
            </el-form-item>
            <el-form-item label="零售单价">
              <span>{{ props.row.retailUnitPrice }}</span>
            </el-form-item>
            <el-form-item label="财务收费标记">
              <span>{{ ssd_common_boolean[props.row.financialChargeFlag] }}</span>
            </el-form-item>
            <el-form-item label="财务收费标准">
              <span>{{ ssd_common_boolean[props.row.financialChargeStandard] }}</span>
            </el-form-item>
            <el-form-item label="来源">
              <span>{{ props.row.source }}</span>
            </el-form-item>
            <el-form-item label="用途">
              <span>{{ props.row.usageInfo }}</span>
            </el-form-item>
            <el-form-item label="批文信息">
              <span>{{ props.row.approveImformation }}</span>
            </el-form-item>
            <el-form-item label="生产者">
              <span>{{ props.row.producer }}</span>
            </el-form-item>
            <el-form-item label="注册号">
              <span>{{ props.row.registerNumber }}</span>
            </el-form-item>
            <el-form-item label="特殊类别">
              <span>{{ props.row.specialCategory }}</span>
            </el-form-item>
            <el-form-item label="注册日期">
              <span>{{ props.row.registerDate }}</span>
            </el-form-item>
            <el-form-item label="到期日期">
              <span>{{ props.row.expireDate }}</span>
            </el-form-item>
            <el-form-item label="高值耗材标记">
              <span>{{ ssd_common_boolean[props.row.highValueflag] }}</span>
            </el-form-item>
            <el-form-item label="批次管理">
              <span>{{ ssd_common_boolean[props.row.batchManageFlag] }}</span>
            </el-form-item>
            <el-form-item label="招标项目">
              <span>{{ ssd_common_boolean[props.row.bidFlag] }}</span>
            </el-form-item>
            <el-form-item label="为一次性耗材">
              <span>{{ ssd_common_boolean[props.row.oneTime] }}</span>
            </el-form-item>
            <el-form-item label="按月计划入库">
              <span>{{ ssd_common_boolean[props.row.stockMonthlyFlag] }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 详细内部内容 end -->
      <el-table-column label="缩略图" align="center">
        <template slot-scope="scope">
          <img v-if="scope.row.images" style="width: 70px;cursor:pointer" :src="imgSrc(scope.row.images[0].url)" @click="imgClick(scope.$index,scope.row)">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="物品名称" />
      <el-table-column prop="itemCode" label="物品编码" />
      <el-table-column label="有效范围">
        <template slot-scope="scope">{{ ssd_effective_range[scope.row.effctiveRange] }}</template>
      </el-table-column>
      <el-table-column label="规格">
        <template slot-scope="scope">{{ ssd_specification[scope.row.spec] }}</template>
      </el-table-column>
      <el-table-column label="最小单位">
        <template slot-scope="scope">{{ ssd_measure_unit[scope.row.miniUnit] }}</template>
      </el-table-column>
      <el-table-column label="大包装单位" width="100">
        <template slot-scope="scope">{{ ssd_measure_unit[scope.row.largePackUnit] }}</template>
      </el-table-column>
      <el-table-column label="加价规则">
        <template slot-scope="scope">{{ ssd_markup_role[scope.row.markupRole] }}</template>
      </el-table-column>
      <el-table-column label="特殊耗材">
        <template slot-scope="scope">{{ ssd_common_boolean[scope.row.specialConsumableMark] }}</template>
      </el-table-column>
      <el-table-column label="是否打包">
        <template slot-scope="scope">{{ ssd_common_boolean[scope.row.packFlag] }}</template>
      </el-table-column>
      <el-table-column label="停用标记">
        <template slot-scope="scope">{{ ssd_common_boolean[scope.row.stopFlag] }}</template>
      </el-table-column>
      <el-table-column label="财务审核">
        <template slot-scope="scope">{{ ssd_common_boolean[scope.row.financialAuditFlag] }}</template>
      </el-table-column>
      <el-table-column prop="manufacturerName" label="生产厂家" />
      <el-table-column prop="supplyCompanyName" label="供货公司" />
      <el-table-column prop="miniFareCode" label="最小费用代码" />
      <el-table-column>
        <template slot-scope="scope">
          <el-dropdown trigger="click" class="dropdown" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-button size="mini" icon="el-icon-s-tools">
                操作
                <i class="el-icon-arrow-down el-icon--right" />
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
    <my-pagination :total="totalCount" methods="toconsuppliesPage" :conditions="conditions" />
    <!-- table end -->
    <!-- 图片上传弹窗 -->
    <el-dialog v-el-drag-dialog :visible.sync="dialogVisible" title="图片" width="800px">
      <div class="dialog-main img-main">
        <el-upload
          :multiple="true"
          :show-file-list="true"
          accept=".jpg, .jpeg, .png, .gif"
          :headers="{Authorization:token}"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          :before-upload="beforeUpload"
          class="editor-slide-upload"
          :action="action"
          list-type="picture-card"
          name="files"
        >
          <el-button size="small" type="primary">点击上传</el-button>
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
        <el-scrollbar :class="{scrollbarHidden:activeNames.length!==1}">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="100px"
            class="scrollbar-form"
          >
            <el-row type="flex" :gutter="20">
              <el-col :span="6">
                <el-form-item label="物品名称" prop="name">
                  <el-input v-model="form.name" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="物品编码" prop="itemCode">
                  <el-input v-model="form.itemCode" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="有效范围" prop="effctiveRange">
                  <el-select v-model="form.effctiveRange" placeholder>
                    <el-option
                      v-for="(val, key) in ssd_effective_range"
                      :key="val"
                      :label="val"
                      :value="key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="规格" prop="spec">
                  <el-select v-model="form.spec" placeholder>
                    <el-option
                      v-for="(val, key) in ssd_specification"
                      :key="val"
                      :label="val"
                      :value="key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" :gutter="20">
              <el-col :span="6">
                <el-form-item label="最小单位" prop="miniUnit">
                  <el-select v-model="form.miniUnit" placeholder>
                    <el-option
                      v-for="(val, key) in ssd_measure_unit"
                      :key="val"
                      :label="val"
                      :value="+key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="大包装单位" prop="largePackUnit">
                  <el-select v-model="form.largePackUnit" placeholder>
                    <el-option
                      v-for="(val, key) in ssd_measure_unit"
                      :key="val"
                      :label="val"
                      :value="key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="加价规则" prop="markupRole">
                  <el-select v-model="form.markupRole" placeholder>
                    <el-option
                      v-for="(val, key) in ssd_markup_role"
                      :key="val"
                      :label="val"
                      :value="key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="最小费用代码" prop="miniFareCode">
                  <el-input v-model="form.miniFareCode" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" :gutter="20">
              <el-col :span="6">
                <el-form-item label="特殊耗材标志" prop="specialConsumableMark">
                  <el-radio-group v-model="form.specialConsumableMark">
                    <el-radio
                      v-for="(val, key) in ssd_common_boolean"
                      :key="val"
                      :label="+key"
                    >{{ val }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="停用标记" prop="stopFlag">
                  <el-radio-group v-model="form.stopFlag">
                    <el-radio
                      v-for="(val, key) in ssd_common_boolean"
                      :key="val"
                      :label="+key"
                    >{{ val }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="生产厂家" prop="manufacturer">
                  <el-select
                    v-model="form.manufacturerName"
                    filterable
                    remote
                    reserve-keyword
                    placeholder=""
                    :remote-method="remoteMethodFactory"
                    :loading="loading"
                    @change="selectChange($event,'manufacturer','factoryOptions')"
                  >
                    <el-option
                      v-for="item in factoryOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="供货公司" prop="supplyCompany">
                  <el-select
                    v-model="form.supplyCompanyName"
                    filterable
                    remote
                    reserve-keyword
                    placeholder=""
                    :remote-method="remoteMethodCompany"
                    :loading="loading"
                    @change="selectChange($event,'supplyCompany','companyOptions')"
                  >
                    <el-option
                      v-for="item in companyOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" :gutter="20">
              <el-col :span="6">
                <el-form-item label="是否打包" prop="packFlag">
                  <el-radio-group v-model="form.packFlag">
                    <el-radio
                      v-for="(val, key) in ssd_common_boolean"
                      :key="val"
                      :label="+key"
                    >{{ val }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="财务审核标记" prop="financialAuditFlag">
                  <el-radio-group v-model="form.financialAuditFlag ">
                    <el-radio
                      v-for="(val, key) in ssd_common_boolean"
                      :key="val"
                      :label="+key"
                    >{{ val }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-collapse v-model="activeNames">
              <el-collapse-item title="更多信息" name="1">
                <el-row type="flex" :gutter="20">
                  <el-col :span="6">
                    <el-form-item label="拼音编码">
                      <el-input v-model="form.spellCode" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="五笔编码">
                      <el-input v-model="form.strokeCode" />
                    </el-form-item>
                  </el-col>
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
                </el-row>
                <el-row type="flex" :gutter="20">
                  <el-col :span="6">
                    <el-form-item label="别名">
                      <el-input v-model="form.alias" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="别名拼音码">
                      <el-input v-model="form.aliasSpellCode" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="别名五笔码">
                      <el-input v-model="form.aliasStrokeCode" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="别名自定义码">
                      <el-input v-model="form.aliasCustomCode" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex" :gutter="20">
                  <el-col :span="6">
                    <el-form-item label="有效科室">
                      <el-input v-model="form.effctiveDepartment" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="最新入库单价">
                      <el-input v-model="form.newestUnitPrice" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="零售单价">
                      <el-input v-model="form.retailUnitPrice" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="财务收费标记">
                      <el-radio-group v-model="form.financialChargeFlag">
                        <el-radio
                          v-for="(val, key) in ssd_common_boolean"
                          :key="val"
                          :label="+key"
                        >{{ val }}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex" :gutter="20">
                  <el-col :span="6">
                    <el-form-item label="财务收费标准">
                      <el-input v-model="form.financialChargeStandard" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="高值耗材标记">
                      <el-radio-group v-model.number="form.highValueflag">
                        <el-radio
                          v-for="(val, key) in ssd_common_boolean"
                          :key="val"
                          :label="+key"
                        >{{ val }}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="为一次性耗材">
                      <el-radio-group v-model="form.oneTime">
                        <el-radio
                          v-for="(val, key) in ssd_common_boolean"
                          :key="val"
                          :label="+key"
                        >{{ val }}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="来源">
                      <el-input v-model="form.source" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex" :gutter="20">
                  <el-col :span="6">
                    <el-form-item label="用途">
                      <el-input v-model="form.usageInfo" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="批文信息">
                      <el-input v-model="form.approveImformation" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="生产者">
                      <el-input v-model="form.producer" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="注册号">
                      <el-input v-model="form.registerNumber" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex" :gutter="20">
                  <el-col :span="6">
                    <el-form-item label="特殊类别">
                      <el-input v-model="form.specialCategory" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="注册日期">
                      <el-date-picker
                        v-model="form.registerDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="到期日期">
                      <el-date-picker
                        v-model="form.expireDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
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
                </el-row>
                <el-row type="flex" :gutter="20">
                  <el-col :span="6">
                    <el-form-item label="为招标项目">
                      <el-radio-group v-model="form.bidFlag">
                        <el-radio
                          v-for="(val, key) in ssd_common_boolean"
                          :key="val"
                          :label="+key"
                        >{{ val }}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="按月计划入库">
                      <el-radio-group v-model="form.stockMonthlyFlag">
                        <el-radio
                          v-for="(val, key) in ssd_common_boolean"
                          :key="val"
                          :label="+key"
                        >{{ val }}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="仓库">
                      <el-input v-model="form.warehouse" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="备注">
                      <el-input v-model="form.remark" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>
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
import myPagination from '@/components/MyPagination'
import api from '@/api'
import APIconfig from '@/api/APIconfig'
import { getToken } from '@/utils/auth'
const fileURL = api.fileURL

export default {
  components: { myfilters, myPagination },
  inject: ['reload'],
  data() {
    return {
      action: fileURL,
      activeNames: [],
      listLoading: false,
      rules: {
        effctiveRange: [
          { required: true, message: '请选择有效范围', trigger: 'blur' }
        ],
        financialAuditFlag: [
          { required: true, message: '请选择财务审核标记', trigger: 'blur' }
        ],
        itemCode: [
          { required: true, message: '请输入物品编码', trigger: 'blur' }
        ],
        largePackUnit: [
          { required: true, message: '请选择大包装单位', trigger: 'blur' }
        ],
        manufacturer: [
          { required: true, message: '请选择生产厂家', trigger: 'blur' }
        ],
        markupRole: [
          { required: true, message: '请选择加价规则', trigger: 'blur' }
        ],
        miniFareCode: [
          { required: true, message: '请输入最小费用代码', trigger: 'blur' }
        ],
        miniUnit: [
          { required: true, message: '请选择最小单位', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入物品名称', trigger: 'blur' }],
        packFlag: [
          { required: true, message: '请选择是否打包', trigger: 'blur' }
        ],
        spec: [{ required: true, message: '请选择物品规格', trigger: 'blur' }],
        specialConsumableMark: [
          { required: true, message: '请选择特殊耗材标志', trigger: 'blur' }
        ],
        stopFlag: [
          { required: true, message: '请选择停用标记', trigger: 'blur' }
        ],
        supplyCompany: [
          { required: true, message: '请选择供货公司', trigger: 'blur' }
        ]
      },
      imgShow: false,
      show: false,
      edit: false,
      editIndex: 0,
      dialogVisible: false,
      fileList: [],
      srcList: [],
      tableData: [],
      form: {},
      oldForm: {},
      ssd_common_boolean: null,
      ssd_effective_range: null,
      ssd_markup_role: null,
      ssd_measure_unit: null,
      ssd_specification: null,
      companyOptions: [],
      factoryOptions: [],
      loading: false,
      totalCount: 0,
      conditions: {
        itemType: null
      }
    }
  },
  computed: {
    title() {
      return this.$route.query.name
        ? this.$route.query.name + '物资管理'
        : '基础物资管理'
    },
    token() {
      const token = getToken()
      return `Bearer ${token}`
    }
  },
  watch: {
    '$route.query.id': {
      handler(val) {
        this.conditions.itemType = val
        this.listLoading = true
        api.toconsuppliesPage({ itemType: val }).then(response => {
          // console.log(response)
          if (response.code === '200' && response.data.busiCode === '1') {
            this.totalCount = response.data.totalCount
            this.tableData = response.data.records
            this.listLoading = false
          }
        })
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.conditions.itemType = this.$route.query.id
      this.listLoading = true
      api
        .toconsuppliesPage({ itemType: this.$route.query.id })
        .then(response => {
          // console.log(response)
          if (response.code === '200' && response.data.busiCode === '1') {
            this.ssd_common_boolean = response.data.dictData.ssd_common_boolean
            this.ssd_effective_range = response.data.dictData.ssd_effective_range
            this.ssd_markup_role = response.data.dictData.ssd_markup_role
            this.ssd_measure_unit = response.data.dictData.ssd_measure_unit
            this.ssd_specification = response.data.dictData.ssd_specification
            if (this.$route.query.id) {
              this.tableData = response.data.records
              this.totalCount = response.data.totalCount
            }
            this.listLoading = false
          }
        })
    },
    remoteMethodFactory(query) {
      if (query !== '') {
        this.loading = true
        api.toCompanyPage({ name: query }).then(response => {
          if (response.code === '200' && response.data.busiCode === '1') {
            this.factoryOptions = response.data.records
            this.loading = false
          }
        })
      } else {
        this.factoryOptions = []
      }
    },
    remoteMethodCompany(query) {
      if (query !== '') {
        this.loading = true
        api.toCompanyPage({ name: query }).then(response => {
          if (response.code === '200' && response.data.busiCode === '1') {
            this.companyOptions = response.data.records
            this.loading = false
          }
        })
      } else {
        this.companyOptions = []
      }
    },
    selectChange(select, str, options) {
      // console.log(select, str)
      const obj = this[options].find(item => {
        return item.name === select
      })
      this.form[str] = obj.id
    },
    // 操作下拉点击
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    // 图片查看器关闭
    viewerClose() {
      this.imgShow = false
    },
    imgSrc(imageInfo) {
      return `${APIconfig.baseUrl}/${imageInfo}`
    },
    imgClick(index, row) {
      this.srcList = []
      row.images.forEach(item => {
        this.srcList.push(this.imgSrc(item.url))
      })
      this.imgShow = true
    },
    // 上传
    handleUpload(index, row) {
      this.form = {
        busiId: row.id,
        busiType: '1'
      }
      this.fileList = []
      if (row.images) {
        row.images.forEach((item, index) => {
          const img = {
            uid: item.id,
            url: this.imgSrc(item.url)
          }
          this.fileList.push(img)
        })
      }
      this.dialogVisible = true
    },
    // 上传按钮
    handleSubmit() {
      this.reload()
      this.dialogVisible = false
    },
    // 上传成功
    handleSuccess(response, file) {
      if (!response.success) {
        return this.$message.error(response.errMsg)
      }
      this.form.imageInfo = response.resData[0].filePath
      api.toPostImage(this.form).then(res => {
        file.uid = res.data.id
        if (res.code === '200' && res.data.busiCode === '1') {
          // this.fileList.push(res.data)
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        }
      })
    },
    // 移除上传内容
    handleRemove(file) {
      api.deleteImage({ id: file.uid }).then(res => {
        if (res.code === '200' && res.data.busiCode === '1') {
          // const i = this.fileList.findIndex(val => {
          //   return val === file
          // })
          // this.fileList.splice(i, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    // 上传的动作
    beforeUpload(file) {
      const typeCheck = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!typeCheck) {
        this.$message.error('上传图片只支持 JPG 或PNG 格式!')
        return new Promise((resolve, reject) => {
          reject(false)
        })
      }
    },
    // 新增
    addClick() {
      this.edit = false
      this.form = {
        itemType: this.$route.query.id
      }
      this.show = true
    },
    // 新增弹窗确认按钮
    addSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          api.toAddsuppliesl(this.form).then(response => {
            // console.log(response)
            if (response.code === '200' && response.data.busiCode === '1') {
              this.reload()
              this.$message({
                message: '添加成功',
                type: 'success'
              })
            }
          })
          this.show = false
        }
      })
    },
    // 编辑弹窗确认
    editSubmit() {
      if (JSON.stringify(this.form) === JSON.stringify(this.oldForm)) {
        this.$message('无信息修改')
        this.show = false
        return
      }
      this.$refs.form.validate(async valid => {
        if (valid) {
          api.toRevisupplies(this.form).then(response => {
            // console.log(response)
            if (response.code === '200' && response.data.busiCode === '1') {
              this.reload()
              this.$message({
                message: '修改成功',
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
    // 编辑
    handleEdit(index, row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.oldForm = JSON.parse(JSON.stringify(row))
      this.edit = true
      this.editIndex = index
      this.show = true
    },
    // 删除
    handleDelete(index, row) {
      api.toDeletesupplies(row).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.tableData.splice(index, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    contentChange(content) {
      this.$set(this.conditions, 'keyword', content)
      this.$set(this.conditions, 'pageNo', 1)
      this.listLoading = true
      api
        .toconsuppliesPage(this.conditions)
        .then(response => {
          // console.log(response)
          this.tableData = response.data.records
          this.totalCount = response.data.totalCount
          this.listLoading = false
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
  min-height: 583px;
}
.img-main {
  padding-bottom: 30px;
}
.scrollbar-form {
  padding-top: 20px;
  padding-bottom: 0;
}
::v-deep .el-collapse {
  border: 0;
}
::v-deep .el-collapse-item {
  position: relative;
  .el-collapse-item__header {
    font-size: 14px;
    color: rgba(153, 153, 153, 1);
    line-height: 24px;
    height: 24px;
    padding-left: 30px;
    border-bottom: 0;
    margin-bottom: 20px;
  }
  .el-collapse-item__arrow {
    position: absolute;
    top: 6px;
    left: 10px;
    font-size: 14px;
    transform: rotate(-90deg);
  }
  .el-collapse-item__arrow.is-active {
    transform: rotate(90deg);
  }
  .el-collapse-item__wrap {
    border-bottom: 0;
  }
}
::v-deep .scrollbarHidden .el-scrollbar__bar {
  display: none;
}
::v-deep {
  .is-uploading,
  .is-ready,
  .el-list-leave,
  .el-list-enter,
  .el-list-leave-active{
    display: none;
  }
}
</style>
