import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

// Vueインスタンスを生成する！ => ルーティング, Store, レンダー関数の定義
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app'); // public/index.htmlにmount(上書き・上乗せ)

