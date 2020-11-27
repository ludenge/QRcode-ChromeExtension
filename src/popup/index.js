import Vue from "vue";
import AppComponent from "./App.vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.component("app-component", AppComponent);

new Vue({
  el: "#app",
  render: h => {
    return h(AppComponent);
  }
});
