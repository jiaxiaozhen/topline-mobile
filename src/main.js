import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 这个第三包引入即可，它会自动根据页面宽度设置网页基准字体大小
import 'amfe-flexible'

// 引入vant
import { NavBar, Field, Button, Notify, Tab, Tabs, List, PullRefresh, Tabbar,
  TabbarItem, Search, cell, Toast, Popup, Icon, Grid, GridItem } from 'vant'
// 表单验证
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'
import Vddl from 'vddl'

Vue.use(Vddl)
Vue.use(VeeValidate, {
  // 禁用change、blur事件的验证
  events: ''
})
Validator.localize('zh_CN', zhCN)
Vue.use(NavBar).use(Field).use(Button).use(Notify).use(Tab).use(Tabs).use(List)
  .use(PullRefresh).use(Tabbar).use(TabbarItem).use(Search).use(cell).use(Toast)
  .use(Popup).use(Icon).use(Grid).use(GridItem)

Vue.prototype.$sleep = (time) => {
  return new Promise((resolve, reject) => {
    window.setTimeout(resolve, time)
  })
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
