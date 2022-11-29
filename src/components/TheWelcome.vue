<script setup lang="ts">
import { inject } from "vue";

const name = inject("name");
const count = inject("count");

const changeCount = () => {
  count.value++;
};
</script>

<template>
  <h1>子组件</h1>
  <p>{{ name }}</p>
  <p>{{ count }}</p>
  <button @click="changeCount">子组件改变count</button>
</template>
