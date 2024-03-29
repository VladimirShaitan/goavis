import Vue from 'vue';
import App from './App.vue';
import router from './assets/js/router.js';


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');



