<template>
  <div id="print" style="padding:30px">
    <myfilters
      :title="title"
      :choose-date="true"
      :export1-button="true"
      date-type="month"
      format="yyyy年M月"
      @dateChange="dateChange"
      @exportExcel="exportExcel"
      @exportPDF="exportPDF"
      @exportHTML="exportHTML"
    />
    <div ref="html">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="100px" align="center" />
        <el-table-column label="评价指标" prop="evaluate" width="400px" />
        <el-table-column label="上月(%)" prop="lastMonth" />
        <el-table-column label="本月(%)" prop="thisMoth" />
        <el-table-column label="备注" prop="remark" />
      </el-table>
    </div>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import htmlToPdf from '@/vendor/Export2Pdf'
export default {
  components: {
    myfilters
  },
  data() {
    return {
      title: '不良事件报告统计',
      tableData: [
        {
          evaluate: '不正确的灭菌方式、灭菌程序发生率',
          lastMonth: 0,
          thisMoth: 0,
          remark: ''
        },
        {
          evaluate: '手术器械未能及时处理发生率',
          lastMonth: 0,
          thisMoth: 0,
          remark: ''
        },
        {
          evaluate: '丢失器械率',
          lastMonth: 0,
          thisMoth: 0,
          remark: ''
        },
        {
          evaluate: '监测不合格率',
          lastMonth: 0,
          thisMoth: 0,
          remark: ''
        },
        {
          evaluate: '湿包率',
          lastMonth: 0,
          thisMoth: 0,
          remark: ''
        },
        {
          evaluate: '贵重医疗器械损坏或丢失率',
          lastMonth: 0,
          thisMoth: 0,
          remark: ''
        },
        {
          evaluate: '发放质量不合格的无菌包发生率',
          lastMonth: 0,
          thisMoth: 0,
          remark: ''
        },
        {
          evaluate: '无菌物品发放错误率',
          lastMonth: 0,
          thisMoth: 0,
          remark: ''
        },
        {
          evaluate: '各室漏水引起无菌物品质量安全隐患或供应不及时率',
          lastMonth: 0,
          thisMoth: 0,
          remark: ''
        }
      ]
    }
  },
  methods: {
    dateChange(date) {
      console.log(date)
    },
    exportExcel() {
      import('@/vendor/Export2Excel').then(excel => {
        const multiHeader = [
          [`${this.title}`, '', '', '']
        ]
        const header = ['评价指标', '上月(%)', '本月(%)', '备注']
        const filterVal = ['evaluate', 'lastMonth', 'thisMoth', 'remark']
        const data = this.formatJson(filterVal)
        const merges = ['A1:D1']
        excel.export_json_to_excel({
          multiHeader,
          header,
          data,
          merges,
          filename: `${this.title}`
        })
      })
    },
    formatJson(filterVal) {
      return this.tableData.map(v => {
        return filterVal.map(j => {
          return v[j]
        })
      }
      )
    },
    exportPDF() {
      htmlToPdf.downloadPDF(document.querySelector('#print'), `${this.title}`)
    },
    exportHTML() {
      const a = document.createElement('a')
      const url = window.URL.createObjectURL(
        new Blob([this.getHtml()], {
          type: ''
        })
      )
      a.href = url
      a.download = `${this.title}` + '.html'
      a.click()
      window.URL.revokeObjectURL(url)
    },
    getHtml() {
      const template = this.$refs.html.innerHTML
      const title = this.title
      const html = `
      <!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>${title}</title>
        <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
        <style>
          .el-table__body, .el-table__footer, .el-table__header{
            table-layout: auto
          }
          table {
            width: 100%!important;
          }
        </style>
        </head>
        <body>
        <div class="resume_preview_page" style="margin:0 auto;width:1200px">
        <h2>${title}</h2>
        ${template}
        </div>
        </body>
        </html>`
      return html
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

