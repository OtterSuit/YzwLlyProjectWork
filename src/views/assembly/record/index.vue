<template>
  <div class="record-contaniner">
    <!-- header -->
    <myfilters
      title="清洗质量记录表"
      :content="content"
      :back-button="true"
    />
    <!-- header end -->
    <div class="white-box">
      <div class="table">
        <!-- table -->
        <el-table
          v-loading="listLoading"
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            label="单号"
            prop="id"
          />
          <el-table-column
            label="检查者/时间"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.row.assembleUser }} <br>
                <span class="second-row">
                  {{ scope.row.assembleTime }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="清洗架"
            prop="cleaningBox"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.row.cleanboxName }} <br>
                <span class="second-row">
                  {{ scope.row.cleaningBox }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="清洗人/时间"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.row.cleanUser }} <br>
                <span class="second-row">
                  {{ scope.row.cleanTime }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="清洗设备/程序"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.row.cleanEquipmentName }} <br>
                <span class="second-row">
                  {{ scope.row.cleanProgramName }}
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- table end -->
      </div>
      <!-- 循环所有的清洗类型 -->
      <div v-for="item in recordData" :key="item.groupId" v-loading="listLoading" class="table">
        <!-- 清洗类型表格 -->
        <table>
          <tr>
            <!-- 清洗类型 -->
            <th rowspan="3" class="left-thead">{{ item.groupName }}</th>
            <!-- 循环所有的清洗部位 -->
            <td v-for="element in item.items" :key="element.code">
              <table class="table-border">
                <tr>
                  <td class="top-thead" :colspan="2+element.isShowAttach">{{ element.name }}</td>
                </tr>
                <tr>
                  <!-- 循环所有的清洗污渍 -->
                  <!-- <td v-for="children in element.dirt" :key="children.dirtName">
                    {{ children.dirtName }}
                  </td> -->
                  <td>污渍</td>
                  <td>锈渍</td>
                  <td v-if="element.isShowAttach===1">附着物</td>
                </tr>
                <tr class="width-10">
                  <!-- 循环所有的清洗污渍个数 -->
                  <!--  <td v-for="children in element.dirt" :key="children.dirtName">
                    {{ children.Num }}
                  </td> -->
                  <td>
                    {{ element.stainCount }}
                  </td>
                  <td>
                    {{ element.rustCount }}
                  </td>
                  <td v-if="element.isShowAttach===1">
                    {{ element.attachCount }}
                  </td>
                </tr>
              </table>
            </td>
            <!-- 合计 -->
            <td style="width: 12%;">
              <table class="table-border">
                <tr>
                  <td class="top-thead">合计</td>
                </tr>
                <tr>
                  <td rowspan="2">
                    {{ totalCount(item.items) }}
                  </td>
                </tr>
                <tr />
              </table>
            </td>
          </tr>
        </table>
      </div>
    </div>
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
      // 表格数据
      tableData: [],
      // 记录数据
      recordData: [],
      listLoading: true
    }
  },
  computed: {
    content() {
      return this.$route.query.id
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getAssembleQtInfosPage({ id: this.$route.query.id }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.tableData = response.data.records
          this.recordData = JSON.parse(this.tableData[0].recordJson)
          // console.log(this.recordData)
          this.listLoading = false
        }
      })
    },
    totalCount(items) {
      let totalCount = 0
      items.forEach(element => {
        totalCount += (element.attachCount + element.rustCount + element.stainCount)
      })
      return totalCount
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
table{
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
}
tr {
  height: 40px;
}
th{
  border: 1px solid rgba(235,238,245,1);
}
th,td{
  text-align: center;
  color: #666666;
  padding: 0;
}
.table-border {
  border-top: 1px solid rgba(235,238,245,1);
  td {
    border-right: 1px solid rgba(235,238,245,1);
    border-bottom: 1px solid rgba(235,238,245,1);
  }
}
.table{
  font-size:14px;
  margin-bottom: 20px;
  // margin: 20px;
}
.left-thead{
  width: 12%;
  background: #F6F6F6;
  color: #000000;
}
.top-thead{
  background: #F6F6F6;
}
.record-contaniner{
  background-color:#F0F2F5;
  padding: 30px;
  min-height: calc(100vh - 50px);
}
.white-box{
  background: #FFFFFF;
  padding: 20px 20px 10px;
}
.second-row {
  color: #999;
}
</style>
