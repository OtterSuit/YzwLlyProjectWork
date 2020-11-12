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
      title: '质量评价指标统计',
      tableData: [
        {
          evaluate: '消毒隔离制度与措施的执行率100%',
          lastMonth: 100,
          thisMoth: 100,
          remark: ''
        },
        {
          evaluate: '无菌物品合格率100%',
          lastMonth: 100,
          thisMoth: 100,
          remark: ''
        },
        {
          evaluate: '湿包发生率 0',
          lastMonth: 0,
          thisMoth: 0.01,
          remark: ''
        },
        {
          evaluate: '器械清洗合格率≥95%',
          lastMonth: 96.2,
          thisMoth: 98.7,
          remark: ''
        },
        {
          evaluate: '消毒物品合格率≥100%',
          lastMonth: 100,
          thisMoth: 100,
          remark: ''
        },
        {
          evaluate: '消毒方式选择不正确发生率 0',
          lastMonth: 0,
          thisMoth: 0,
          remark: ''
        },
        {
          evaluate: '回收器械丢失发生率 0',
          lastMonth: 0,
          thisMoth: 0,
          remark: ''
        },
        {
          evaluate: '无菌包装密闭合格率',
          lastMonth: 99.5,
          thisMoth: 100,
          remark: ''
        },
        {
          evaluate: '无菌包内未放化学指示卡不合格发生率',
          lastMonth: 0.03,
          thisMoth: 0.01,
          remark: ''
        },
        {
          evaluate: '无菌包标识合格率',
          lastMonth: 99.5,
          thisMoth: 96.5,
          remark: ''
        },
        {
          evaluate: '无菌包内器械种类错误发生率',
          lastMonth: 0,
          thisMoth: 0,
          remark: ''
        },
        {
          evaluate: '无菌包内器械缺失发生率',
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
::v-deep.el-table--enable-row-transition .el-table__body td{
    padding: 20px 0
}
</style>

