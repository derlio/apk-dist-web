import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.prototype.axios = axios;

new Vue({
  render: h => h(App),
}).$mount('#app')
