// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import filters from './filter';
// import $ from 'webpack-zepto';
import FastClick from 'fastclick';
// Vue.use(pulseLoader);

// 实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
FastClick.attach(document.body);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});
