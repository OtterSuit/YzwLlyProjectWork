<template>
  <div style="padding:30px">
    <myfilters
      title="档案管理"
      :choose-status="true"
      :choose-department="true"
      @statusChange="statusChange($event)"
      @departmentChange="departmentChange($event)"
    >
      <template #extent2>
        <el-col :span="4">
          <el-select v-model="type" placeholder="请选择职员类别" @change="typeChange($event)">
            <el-option label="在职人员" value="1" />
            <el-option label="实习生" value="2" />
            <el-option label="进修生" value="3" />
          </el-select>
        </el-col>
      </template>
    </myfilters>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column width="100">
        <template slot-scope="scope">
          <img class="pic_user" :src="scope.row.headIcon" alt="user">
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="realName"
      />
      <el-table-column
        label="工号"
        prop="jobNum"
      />
      <el-table-column
        label="职务"
      >
        <template slot-scope="scope">
          <span>{{ handleJobPost(scope.row.jobPost) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="职员类别"
      >
        <template slot-scope="scope">
          <span>{{ handleUserType(scope.row.userType) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="修改日期"
        width="150"
        prop="archivesModifyTime"
      />
      <el-table-column
        label="护士执业证书"
        prop="archivesModifyTime"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.hasCertificates ? '有' : '无' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.archivesState" :class="archivesState[scope.row.archivesState].color">
            <i :class="archivesState[scope.row.archivesState].icon" />
            {{ archivesState[scope.row.archivesState].name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-document"
            @click="handleEdit(scope.$index, scope.row)"
          >查看</el-button>
          <el-dropdown trigger="click" class="dropdown" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-button
                size="mini"
                icon="el-icon-s-tools"
                :disabled="scope.row.archivesState!=2"
              >操作
                <!-- <i class="el-icon-arrow-down el-icon--right" /> -->
              </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                class="success-color"
                icon="el-icon-success"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handlePass'
                }"
              >通过</el-dropdown-item>
              <el-dropdown-item
                class="error-color"
                icon="el-icon-error"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleReject'
                }"
              >驳回</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="total>pageSize" style="text-align:center;margin-top:10px">
      <el-pagination
        class="page"
        :page-size="pageSize"
        :pager-count="5"
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import { getArchivesList, passArchives, rejectArchives, deleteArchives } from '@/api/people/archives'
import { jobPost, userType, archivesState } from '@/common/js/constants'
import api from '@/api'

export default {
  components: {
    myfilters
  },
  data() {
    return {
      archivesState: archivesState,
      type: '',
      oldTable: [],
      tableData: [],
      table: [],
      total: 100,
      pageSize: 20,
      conditions: { userType: 0, archivesState: 0 }, // 分页配置
      src: [
        require('@/assets/images/meili.jpg'),
        require('@/assets/images/hs2.jpg'),
        require('@/assets/images/hs3.jpg'),
        require('@/assets/images/hs4.jpg'),
        require('@/assets/images/hs5.jpg')
      ]
    }
  },
  created() {
    // this.fetchData()
    this.getArchivesManage()
  },
  methods: {
    fetchData() {
      getArchivesList().then(response => {
        console.log(response)
        this.table = response.data.items
        this.oldTable = JSON.parse(JSON.stringify(this.table))
        this.total = response.data.total
        this.tableData = this.table.slice(0, this.pageSize)
      })
    },
    async getArchivesManage() {
      const res = await api.getArchivesManage(this.conditions)
      console.log(res)
      this.table = res.resData.items
      this.oldTable = JSON.parse(JSON.stringify(this.table))
      this.total = res.resData.total
      this.tableData = this.table.slice(0, this.pageSize)
    },
    async putArchivesManage(id, operation) {
      const res = await api.putArchivesManage({ id, operation })
      console.log(res)
    },
    avatar(index) {
      const i = index % 5
      return this.src[i]
    },
    // 详细
    handleEdit(index, row) {
      this.$router.push({
        name: 'archivesBasic',
        query: {
          id: row.id
        }
      })
    },
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    // 通过
    handlePass(index, row) {
      this.putArchivesManage(1)
      passArchives().then(response => {
        if (response.code === 20000) {
          this.$message({
            message: '通过成功',
            type: 'success'
          })
          this.tableData[index].status = '2'
        }
      })
    },
    // 驳回
    handleReject(index, row) {
      console.log(index, row)
      this.putArchivesManage(row.id, 2)
      rejectArchives().then(response => {
        if (response.code === 20000) {
          this.$message({
            message: '驳回成功',
            type: 'success'
          })
          this.tableData[index].status = '3'
        }
      })
    },
    // 删除
    handleDelete(index, row) {
      deleteArchives().then(response => {
        if (response.code === 20000) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.tableData.splice(index, 1)
        }
      })
    },
    statusChange(status) {
      console.log(status)
      const arr = []
      this.$set(this.conditions, 'archivesState', status)
      this.$set(this.conditions, 'PageIndex', 1)
      console.log(this.oldTable, this.conditions)
      this.oldTable.forEach(item => {
        console.log()
        if (+item.archivesState === +this.conditions.archivesState && (+item.userType === +this.conditions.userType || !this.conditions.userType)) {
          arr.push(item)
        }
      })
      this.total = arr.length
      this.table = arr
      console.log(this.table)
      this.tableData = this.table.slice(0, this.pageSize)
    },
    // 职员类别选择
    typeChange(type) {
      console.log(type)
      const arr = []
      this.$set(this.conditions, 'userType', type)
      this.$set(this.conditions, 'PageIndex', 1)
      console.log(this.oldTable, this.conditions)
      this.oldTable.forEach(item => {
        if ((+item.archivesState === +this.conditions.archivesState || !this.conditions.archivesState) && +item.userType === +this.conditions.userType) {
          arr.push(item)
        }
      })
      this.total = arr.length
      this.table = arr
      console.log(this.table)
      this.tableData = this.table.slice(0, this.pageSize)
    },
    // 查询科室
    departmentChange(department) {
      console.log(department)
      this.$set(this.conditions, 'departmentId', department)
      this.$set(this.conditions, 'PageIndex', 1)
      this.getArchivesManage()
    },
    // 分页
    currentChange(page) {
      this.tableData = this.table.slice((page - 1) * this.pageSize, page * this.pageSize)
    },
    skill(row) {
      let bool = false
      row.forEach(i => {
        if (i.certificateName === '护士执业证书') {
          bool = true
          return
        }
      })
      return bool ? '有' : '无'
    },
    // 处理职位
    handleJobPost(v) {
      return jobPost[v]
    },
    handleUserType(v) {
      return userType[v]
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.el-button {
  height: 30px;
}
.pic_user {
  height:42px;
  border-radius: 42px;
  border:1px solid rgba(216,216,216,1);
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
</style>
