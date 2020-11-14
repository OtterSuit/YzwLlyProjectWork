<template>
  <div>
    <mybox class="body" :edit-box-show="true" title="身体信息" @editClick="editClick('bodyInformation')">
      <el-row>
        <el-col>
          <el-row class="row">
            <el-col :span="6">
              <span class="label">身高</span>
              <span class="content">{{ data.height }}cm</span>
            </el-col>
            <el-col :span="6">
              <span class="label">体重</span>
              <span class="content">{{ data.weight }}kg</span>
            </el-col>
            <el-col :span="6">
              <span class="label">工服尺寸</span>
              <span class="content">{{ data.clothseSize }}</span>
            </el-col>
            <el-col :span="6">
              <span class="label">健康情况</span>
              <span class="content">{{ data.health }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span class="label">鞋码</span>
              <span class="content">{{ data.shoeSize }}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </mybox>

    <el-form ref="bodyInfo" :model="info" label-width="80px">
      <el-dialog title="身体信息" :visible.sync="bodyInformation" width="800px">
        <div class="dialog-main">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="身高">
                <el-input v-model="info.height">
                  <span slot="suffix">cm</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="体重">
                <el-input v-model="info.weight">
                  <span slot="suffix">kg</span>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="工服尺寸">
                <el-select v-model="info.clothseSize" placeholder>
                  <el-option label="XS" value="XS" />
                  <el-option label="S" value="S" />
                  <el-option label="M" value="M" />
                  <el-option label="L" value="L" />
                  <el-option label="XL" value="XL" />
                  <el-option label="XXL" value="XXL" />
                  <el-option label="XXXL" value="XXXL" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="鞋码">
                <el-input v-model="info.shoeSize" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="24">
              <el-form-item label="健康情况">
                <el-radio-group v-model="info.health">
                  <el-radio label="健康">健康</el-radio>
                  <el-radio label="一般">一般</el-radio>
                  <el-radio label="较差">较差</el-radio>
                  <el-radio label="伤残">伤残</el-radio>
                  <el-radio label="其他">其他</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="bodyInformation=false">取消</el-button>
          <el-button type="primary" @click="editSubmit('bodyInformation')">保存修改</el-button>
        </div>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import Mybox from '@/components/Mybox'
export default {
  components: {
    Mybox
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      bodyInformation: false,
      info: {}
    }
  },
  methods: {
    // 修改按钮点击
    editClick(Info) {
      this.info = JSON.parse(JSON.stringify(this.data))
      this[Info] = true
    },
    // 修改弹窗确认按钮
    editSubmit(Info) {
      this.$parent.editSubmit(Info, 2)
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
</style>
