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
        <el-table-column label="项目明细" prop="detail" />
        <el-table-column label="数量" prop="count" />
        <el-table-column label="单价" prop="singlePrice" />
        <el-table-column label="金额" prop="totolPrice" />
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
      title: '质量监测统计',
      tableData: [
        {
          detail: '项目明细',
          count: 50,
          singlePrice: '1.00',
          totolPrice: '50.00'
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
        const header = ['项目明细', '数量', '单价', '金额']
        const filterVal = ['detail', 'count', 'singlePrice', 'totalPrice']
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

