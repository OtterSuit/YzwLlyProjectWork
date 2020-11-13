<template>
  <div ref="qrCodeUrl" class="qrcode" />
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 135
    },
    colorDark: {
      type: String,
      default: '#000000'
    },
    colorLight: {
      type: String,
      default: '#ffffff'
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.creatQrCode()
  },
  methods: {
    creatQrCode() {
      new QRCode(this.$refs.qrCodeUrl, {
        text: this.text,
        width: this.size,
        height: this.size,
        colorDark: this.colorDark,
        colorLight: this.colorLight,
        correctLevel: QRCode.CorrectLevel.H
      })
    }
  }
}
</script>
