import Vue from 'vue'
import App from './App.vue'
//导入ElementUI插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//导入axios
import axios from 'axios'
//在Vue的原型中添加$axios
Vue.prototype.$axios = axios
//导入全局样式文件
import "./style/index.css"
//导入过滤器
import "./filters/timefilters"
Vue.config.productionTip = false
import router from './router/index'
//使用环境变量
// window.console.log(process.env.VUE_APP_URL)
//导入Vuex的store
import store from "../src/store/index"
//导入vue-quill-editor
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(VueQuillEditor)
//使用echarts
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
