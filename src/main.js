import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 这个第三包引入即可，它会自动根据页面宽度设置网页基准字体大小
import 'amfe-flexible'

// 引入vant
import { NavBar, Field, Button, Notify, Tab, Tabs, List, PullRefresh, Tabbar, TabbarItem, Search, cell } from 'vant'

Vue.use(NavBar).use(Field).use(Button).use(Notify).use(Tab).use(Tabs).use(List).use(PullRefresh).use(Tabbar).use(TabbarItem).use(Search)
  .use(cell)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
