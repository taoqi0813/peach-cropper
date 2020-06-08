<template>
  <div class="container" :class="{'round': options.round}">
    <img ref="cropper" :src="options.img" alt="加载失败">
    <slot name="footer">

    </slot>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
export default {
  name: 'VueCropper',
  props: {
    cropW: {
      type: String || Number,
      default: '128'
    },
    cropH: {
      type: String || Number,
      default: '128'
    },
    round: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: function(){
        return {

        }
      }
    },
  },
  watch: {
    options: {
      handler(){
        this.initCropper()
      },
      deep:true //true 深度监听
    }
  },
  data(){
    return{
      cropper: null,
      cropperOptions: {
        cropW: 128,
        cropH: 128,
        round: false,
        type: 'jpeg'
      }
    }
  },
  mounted(){
    this.initCropper()
  },
  beforeDestroy(){
    this.cropper.destroy()
  },
  methods:{
    initCropper(){
      if (this.cropper) {
        this.cropper.destroy()
      }
      this.cropperOptions = {
      ...this.cropperOptions,
      ...this.options
    }
    if(this.cropperOptions.round){
      let diameter = Math.min(this.cropperOptions.cropW, this.cropperOptions.cropH)
      this.cropperOptions.cropW = diameter
      this.cropperOptions.cropH = diameter
    }
    this.cropperOptions.aspectRatio = this.cropperOptions.cropW / this.cropperOptions.cropH
    this.$nextTick(()=>{
      this.cropper = new Cropper(this.$refs.cropper, this.cropperOptions)
    })
    },
    getRoundedCanvas(sourceCanvas) {
      var canvas = document.createElement('canvas')
      var context = canvas.getContext('2d')
      var width = sourceCanvas.width
      var height = sourceCanvas.height
      canvas.width = width
      canvas.height = height
      context.beginPath()
      context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI)
      context.strokeStyle = 'rgba(0,0,0,0)'
      context.stroke()
      context.clip()
      context.drawImage(sourceCanvas, 0, 0, width, height)
      return canvas
    },
    getCroppedCanvas() {
      let afterImg
      let cropW = parseInt(this.cropperOptions.cropW)
      let cropH = parseInt(this.cropperOptions.cropH)
      // 输出格式
      let type = this.cropperOptions.type
      if(type !== 'jpeg' && type !== 'png' && type !== 'webp'){
        console.error('type可选值为：jpeg/png/webp')
        return
      }
      if(this.cropperOptions.round){
        // 圆形裁剪
        const roundCanvas = this.getRoundedCanvas(this.cropper.getCroppedCanvas({
          width: cropW,
          height: cropH
        }))
        afterImg = roundCanvas.toDataURL('image/' + type)
      } else {
        afterImg = this.cropper.getCroppedCanvas({
          width: cropW,
          height: cropH
        }).toDataURL('image/' + type)
      }
      return afterImg
    }
  }
}
</script>
<style scoped>
.container{
  position: relative;
  text-align: center;
  width: 100%;
  height: 100%;
}
</style>
<style>
.container.round .cropper-crop-box{
  border-radius: 50%;
  overflow: hidden;
}
</style>