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
        <el-table-column label="项目" prop="project" />
        <el-table-column label="上月" prop="lastMonth" />
        <el-table-column label="本月" prop="thisMonth" />
        <el-table-column label="增长率" prop="upgrade" />
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
      title: '供应室工作量统计',
      tableData: [
        {
          project: '糖足包',
          lastMonth: 3018,
          thisMonth: 3414,
          upgrade: '19.7%'
        }
      ]
    }
  },
  methods: {
    dateChange(date) {
      console.log(date)
    },
    exportExcel() {
      const title = this.title
      import('@/vendor/Export2Excel').then(excel => {
        const multiHeader = [
          [`${title}`, '', '', '']
        ]
        const header = ['项目', '上月', '本月', '增长率']
        const filterVal = ['project', 'lastMonth', 'thisMonth', 'upgrade']
        const data = this.formatJson(filterVal)
        const merges = ['A1:D1']
        excel.export_json_to_excel({
          multiHeader,
          header,
          data,
          merges,
          filename: `${title}`
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
      a.download = `${this.title}.html`
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
        <div  style="margin:0 auto;width:1200px">
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

