import ToastComponet from './vue-toast.vue'
import { error } from 'util';

// const toastPool = []
// const getAnInstance = () => {
//   if (toastPool.length > 0) {
//     const instance = toastPool[0]
//     toastPool.splice(0, 1)
//     return instance
//   }
//   return new ToastConstructor({
//     el: document.createElement('div')
//   })
// }
// const returnAnInstance = (instance) => {
//   if (instance) {
//     toastPool.push(instance)
//   }
// }
// const removeNode = (event) => {
//   if (event.target.parentNode) {
//     event.target.parentNode.removeChild(event.target)
//   }
// }
const Toast = {}
Toast.install = function (Vue, option = {}) {
  const gOptions = {
    duration: 3000
  }
  for (const key in option) {
    gOptions[key] = option[key]
  }
  Vue.prototype.$toast = function (options) {
    if (typeof options === 'object') {
      for (const key in options) {
        gOptions[key] = options[key]
      }
    }
    const ToastConstructor = Vue.extend(ToastComponet)
    const instance = new ToastConstructor().$mount(document.createElement('div'))
    instance.message = typeof options === 'string' ? options : options.message;
    instance.type = options.type || 'info'
    const callback = typeof options.callback === 'function' ? options.callback : '';
    instance.visible = true
    Vue.nextTick(() => {
      // 操作dom节点必须在dom生成之后，否者会出现闪烁
      document.body.appendChild(instance.$el)
      setTimeout(() => {
        instance.visible = false
        // 动画需要300毫秒的执行时间，动画执行完之后再移除节点
        setTimeout(()=>{
          document.body.removeChild(instance.$el)
          callback && callback()
        }, 300);
      }, gOptions.duration)
    })
  }
  // Vue.prototype.$toast['success'] = function (options) {
  //   Vue.prototype.$toast(options)
  // }
  // Vue.prototype.$toast['info'] = function (options) {
  //   Vue.prototype.$toast(options)
  // }
  // Vue.prototype.$toast['warn'] = function (options) {
  //   Vue.prototype.$toast(options)
  // }
  // Vue.prototype.$toast['error'] = function (options) {
  //   Vue.prototype.$toast(options)
  // }

  // 优化
  const handleArray = ['success', 'info', 'warn', 'error']
  handleArray.forEach((type) => {
    Vue.prototype.$toast[type] = function(options) {
      const option = {}
      if (typeof options === 'string' || options.type === 'undefined' || options.type === '') {
        option.message = options
        option.type = 'info'
      } else {
        option.message = options.message
        option.type = options.type
      }
      return Vue.prototype.$toast(options)
    }
  });
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Toast)
}
export default Toast