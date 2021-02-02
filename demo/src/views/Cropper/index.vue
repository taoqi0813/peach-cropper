<template>
  <div class="demo-container">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="cropper-wrapper">
          <peach-cropper ref="cropper" :options="options" />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="cropper-preview" :class="{'round': options.round}" />
      </el-col>
    </el-row>
    <div class="demo-control">
      <div class="upload-area">
        <el-upload
          class="upload-demo"
          drag
          action
          :before-upload="beforeUpload"
          :http-request="handleUpload"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
      </div>
      <div class="param-list">
        <el-form :inline="true" :model="options" class="demo-form-inline">
          <el-form-item label="viewMode">
            <el-select v-model="options.viewMode" placeholder="请选择">
              <el-option :label="0" :value="0" />
              <el-option :label="1" :value="1" />
              <el-option :label="2" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="dragMode">
            <el-select v-model="options.dragMode" placeholder="请选择">
              <el-option label="crop" value="crop" />
              <el-option label="move" value="move" />
              <el-option label="none" value="none" />
            </el-select>
          </el-form-item>
          <el-form-item label="cropW">
            <el-input v-model="options.cropW" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="cropH">
            <el-input v-model="options.cropH" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="modal">
            <el-switch v-model="options.modal" />
          </el-form-item>
          <el-form-item label="guides">
            <el-switch v-model="options.guides" />
          </el-form-item>
          <el-form-item label="center">
            <el-switch v-model="options.center" />
          </el-form-item>
          <el-form-item label="highlight">
            <el-switch v-model="options.highlight" />
          </el-form-item>
          <el-form-item label="background">
            <el-switch v-model="options.background" />
          </el-form-item>
          <el-form-item label="autoCropArea">
            <el-input-number
              v-model="options.autoCropArea"
              :step="0.1"
              :min="0.1"
              :max="1.0"
              :precision="1"
              label="autoCropArea"
            />
          </el-form-item>
          <el-form-item label="movable">
            <el-switch v-model="options.movable" />
          </el-form-item>
          <el-form-item label="cropBoxMovable">
            <el-switch v-model="options.cropBoxMovable" />
          </el-form-item>
          <el-form-item label="rotateTo">
            <el-input-number v-model="degree" label="rotateTo" @change="rotate" />
          </el-form-item>
          <el-form-item label="round">
            <el-switch v-model="options.round" />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PeachCropperDemo',
  data() {
    return {
      options: {
        img: require('@/assets/logo.png'),
        viewMode: 1,
        dragMode: 'move',
        cropW: 200,
        cropH: 128,
        round: false,
        autoCropArea: 1,
        modal: true,
        guides: true,
        center: true,
        highlight: true,
        background: true,
        movable: true,
        cropBoxMovable: true,
        preview: '.cropper-preview'
      },
      degree: 0
    }
  },
  mounted() {
    console.log('cropper:', this.$refs.cropper)
  },
  methods: {
    beforeUpload(file) {
      console.log('file:', file)
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isImg) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式')
        return false
      }
      const img = URL.createObjectURL(file)
      console.log('img:', img)
      this.options.img = img
      return true
    },
    handleUpload(event) {
      console.log('uploadEvent:', event)
    },
    formatTooltip(val) {
      return val / 100
    },
    rotate(val) {
      this.$refs.cropper.rotateTo(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.demo-container {
  width: 100vw;
  height: 100vh;
  padding: 20px;
  .cropper-wrapper {
    width: 100%;
    height: 400px;
  }
  .cropper-preview {
    // width: 200px;
    width: 100%;
    height: 200px;
    overflow: hidden;
    border: 1px solid #ccc;
  }
  .demo-control {
    display: flex;
    margin-top: 20px;
    .upload-area {
      margin-right: 20px;
    }
  }
}
.round {
  border-radius: 50%;
}
</style>
