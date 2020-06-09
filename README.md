# peach-cropper
> 基于cropperjs封装的图片裁剪Vue组件，增加圆形裁剪功能，适用于PC和移动端。<br>
> A cropper component for Vue.js based on cropperjs, add round crop function, available for PC & mobile.

## 快速上手 | Getting started
### 安装 | Installation
```
npm install -S peach-cropper

```
### 在main.js引用 | In Main.js:  
```
import PeachCropper from 'peach-cropper'
Vue.use(PeachCropper)
```

### 用法 | Usage
```
<peach-cropper ref="cropper" :options="options" />
```

### 配置 | Options

+ cropW
  - 输出图片的宽度 | output image width
  - 类型: Number | Type: Number
  - 默认值: 128 | Default: 128
  
+ cropH
  - 输出图片的高度 | output image height
  - 类型: Number | Type: Number
  - 默认值: 128 | Default: 128
  
+ type
  - 输出图片的类型 | output image type
  - 类型: String | Type: String
  - 默认值: 'jpeg' | Default: 'jpeg'
  - 可选值: 'jpeg/png/webp' | Options: 'jpeg/png/webp'

+ round
  - 是否启用圆形裁剪 | use round size
  - 类型: Boolean | Type: Boolean
  - 默认值: false | Default: false
  - 启用圆形裁剪时，会将cropW和cropH中的最小值作为直径形成裁剪框 | when round=true, use min(cropW,cropH) as diameter of the round image

#### 其他的配置详见cropperjs文档，https://github.com/fengyuanchen/cropperjs | More options see cropperjs documents, https://github.com/fengyuanchen/cropperjs

> cropperjs中aspectRatio和initialAspectRatio参数将不再有效，根据cropW和cropH自动计算比例 | aspectRatio & initialAspectRatio in cropperjs are unavailable any more, it'll calculate scale with cropW & cropH


### 方法 | Methods
#### getDataURL()
+ 返回值 | return value: 
  - 类型: String | Type: String
  - 图片base64编码 | base64 code of image


## 例子 | Example
```
const base64 = this.$refs.cropper.getDataURL()
```

## 注意 | Notice
在组件外面放置容器，设置容器的宽高 | set a parent wrapper for this component to change size