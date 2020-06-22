<template>
  <div class="peach-cropper-container" :class="{'round': options.round}">
    <img ref="cropper" :src="options.img" alt="加载失败">
    <slot name="footer">

    </slot>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
export default {
  name: 'PeachCropper',
  props: {
    options: {
      type: Object,
      default: function(){
        return {

        }
      }
    }
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
    crop(){
      return this.cropper.crop()
    },
    reset(){
      return this.cropper.reset()
    },
    clear(){
      return this.cropper.clear()
    },
    replace(url,hasSameSize = false){
      return this.cropper.replace(url,hasSameSize)
    },
    enable(){
      return this.cropper.enable()
    },
    disable(){
      return this.cropper.disable()
    },
    destroy(){
      return this.cropper.destroy()
    },
    move(offsetX,offsetY = undefined){
      return this.cropper.move(offsetX,offsetY)
    },
    moveTo(x,y = undefined){
      return this.cropper.moveTo(x,y)
    },
    zoom(ratio){
      return this.cropper.zoom(ratio)
    },
    zoomTo(ratio,pivot = {}){
      return this.cropper.zoomTo(ratio,pivot)
    },
    rotate(degree){
      return this.cropper.rotate(degree)
    },
    rotateTo(degree){
      return this.cropper.rotateTo(degree)
    },
    scale(scaleX,scaleY = undefined){
      return this.cropper.scale(scaleX,scaleY)
    },
    scaleX(scaleX){
      return this.cropper.scaleX(scaleX)
    },
    scaleY(scaleY){
      return this.cropper.scaleY(scaleY)
    },
    getData(rounded = false){
      return this.cropper.getData(rounded)
    },
    setData(data){
      return this.cropper.setData(data)
    },
    getContainerData(){
      return this.cropper.getContainerData()
    },
    getImageData(){
      return this.cropper.getImageData()
    },
    getCanvasData(){
      return this.cropper.getCanvasData()
    },
    setCanvasData(data){
      return this.cropper.setCanvasData(data)
    },
    getCropBoxData(){
      return this.cropper.getCropBoxData()
    },
    setCropBoxData(data){
      return this.cropper.setCropBoxData(data)
    },
    getCroppedCanvas(options = {}){
      return this.cropper.getCroppedCanvas(options)
    },
    setAspectRatio(aspectRatio){
      return this.cropper.setAspectRatio(aspectRatio)
    },
    setDragMode(mode = 'none'){
      return this.cropper.setDragMode(mode)
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
    getDataURL() {
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
.peach-cropper-container{
  position: relative;
  text-align: center;
  width: 100%;
  height: 100%;
}
</style>
<style>
.peach-cropper-container.round .cropper-crop-box{
  border-radius: 50%;
  overflow: hidden;
}
</style>