<template>
  <div style="padding:30px">
    <!-- <h3>岗位变动</h3> -->
    <!-- 添加表格上方过滤条件 -->
    <myfilters
      ref="myfilters"
      title="护士证书"
      :add-button="true"
      :search-name="true"
      :choose-department="true"
      @addClick="addClick"
    />
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="realName"
        label="姓名"
      />
      <el-table-column
        prop="jobNum"
        label="工号"
      />
      <el-table-column
        prop="certificateName"
        label="证书名称"
      />
      <el-table-column
        prop="certificateNumber"
        label="证书编号"
      />
      <el-table-column
        prop="obtainTime"
        label="首次注册时间"
      />
      <el-table-column
        prop="invalidTime"
        label="有效期"
      />
      <el-table-column label="获取证书（图）">
        <template v-if="scope.row.imageUrl" slot-scope="scope">
          <span class="picture-span" @click="imgShow = true">
            <i class="el-icon-picture picture" />查看证书
          </span>
        </template>
      </el-table-column>
      <el-table-column width="200" label="操作">
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
    <el-dialog title="护士证书信息" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="100px">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="姓名">
                <el-input v-model="form.realName" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="工号">
                <el-input v-model="form.jobNum" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="证书名称">
                <el-input v-model="form.certificateName" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="证书编号">
                <el-input v-model="form.certificateNumber" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="首次注册时间">
                <el-date-picker
                  v-model="form.obtainTime"
                  type="date"
                  :clearable="false"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="有效期">
                <el-date-picker
                  v-model="form.invalidTime"
                  type="date"
                  :clearable="false"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="证书图片">
                <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :limit="1"
                >
                  <i class="el-icon-upload" />
                  <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                </el-upload>
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
    <el-image-viewer v-show="imgShow" :on-close="viewerClose" :url-list="imageUrl" />
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
      imageUrl: [
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=964473761,301795141&fm=26&gp=0.jpg'
      ],
      imgShow: false,
      tableData: [],
      form: {
      },
      oldForm: null,
      show: false,
      edit: false,
      editIndex: 0
    }
  },
  mounted() {
    this.getProfessional()
  },
  methods: {
    // 获取护士证书
    async getProfessional() {
      const res = await api.getProfessional()
      this.tableData = res.resData.items
      console.log('护士证书：', this.tableData)
      const imageUrls = []
      this.tableData.forEach((v) => {
        imageUrls.push(v.imageUrl)
      })
      this.imageUrl = imageUrls
    },
    viewerClose() {
      this.imgShow = false
    },
    addClick() {
      this.edit = false
      this.form = {}
      this.show = true
    },
    async addSubmit() {
      this.form.userId = '53bb390b-a296-475e-b420-d33be54598df'
      await api.addProfessional(this.form)
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.tableData.push(this.form)
      this.show = false
    },
    async editSubmit() {
      if (JSON.stringify(this.form) === JSON.stringify(this.oldForm)) {
        this.$message('无信息修改')
        this.show = false
        return
      }
      this.form.userId = '53bb390b-a296-475e-b420-d33be54598df'
      await api.editProfessional(this.form)
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
    async handleDelete(index, row) {
      console.log(row.id)
      await api.delProfessional({ id: row.id })
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
</style>
