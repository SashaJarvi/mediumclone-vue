import Vue from 'vue';

import dateToLocale from '@/filters/date-to-locale';
import router from './router';
import store from './store';

import App from './App.vue';

import './assets/css/main.css';

Vue.config.productionTip = false;

Vue.filter('date', dateToLocale);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
