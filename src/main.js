import 'cropperjs/dist/cropper.css'
import Cropper from './components/cropper/index.js';

const components = [
  Cropper
]

const install = function(Vue) {

  components.forEach(component => {
    Vue.component(component.name, component);
  });

};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '0.1.0',
  install,
  Cropper
};