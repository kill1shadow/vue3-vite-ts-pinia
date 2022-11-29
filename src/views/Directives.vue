<template>
  <div
    class="top"
    ref="top"
  >
    <!-- <input
      type="text"
      ref="input"
    > -->
    <input
      type="text"
      v-focus.aaa="'zyjlxm'"
    >
    <h2 v-format-time="'MM/DD/YYYY HH:mm:ss'">{{ timestamp }}</h2>
    <h2 v-format-time>{{ timestamp }}</h2>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
const top = ref(null);
console.log(top);
// 1. 默认实现自定义指令方式
// const input = ref();
// onMounted(() => {
//   input.value.focus();
// });

// 2. 注册一个局部的自定义指令，需要以小写v开头
// vue3 directives的生命周期钩子函数   created  beforeMount mounted  updated beforeUpdate beforeUnmounte  Unmounted
const vFocus = {
  // bindings总包含当前自定义指令后所带的值以及对应的修饰符
  mounted(el: { focus: () => void }, bindings: any, vNode: any, preVNode: any) {
    console.log(el, bindings, vNode, preVNode);
    el.focus();
  },
};

// 3. 注册全局指令， 详见main.ts
const timestamp = new Date().getTime();
</script>

<style lang="scss" scoped>
</style>
