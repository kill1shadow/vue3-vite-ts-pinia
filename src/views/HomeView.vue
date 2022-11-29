<script setup lang="ts">
import { provide, ref, readonly } from "vue";
import TheWelcome from "../components/TheWelcome.vue";

const name = ref("lxm");
let count = ref(100);

// provide("name", readonly(name));
// provide("count", readonly(count));

provide("name", name);
provide("count", count);
const changeCount = () => {
  count.value++;
};
</script>

<template>
  <main>
    <TheWelcome />
    <button @click="changeCount">改变count</button>
  </main>
</template>
