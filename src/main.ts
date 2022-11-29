import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import registerDirective from "./directives";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(registerDirective);

app.mount("#app");

// 注册全局指令
app.directive("ffocus", {
  mounted(el, bindings, VNode, preVNode) {
    console.log(el, bindings, VNode, preVNode);
    el.focus();
  },
});
