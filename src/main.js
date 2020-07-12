import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

import "@/assets/scss/custom.scss";

import VModal from "vue-js-modal";

import SweetModal from "sweet-modal-vue/src/plugin.js";

Vue.use(SweetModal);

Vue.use(VModal);

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
