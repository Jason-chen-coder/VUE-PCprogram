import Vue from 'vue'
import App from './App.vue'
//导入ElementUI插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//导入全局样式文件
import "./style/index.css"
Vue.config.productionTip = false
import router from './router/index'
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
