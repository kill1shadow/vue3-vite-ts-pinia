<template>
  <div class="about">
    <h1>{{ count }}</h1>
    <h1>{{ result.age }}</h1>
    <h1>{{ arr }}</h1>
    <h1>{{ arr1 }}</h1>
    <h1>{{ fullName }}</h1>
    <h1>{{ info }}</h1>
    {{ address }}
    <h1 ref="title">hahaha</h1>
    <button @click="changeMsg()">改变msg信息</button>
    <button @click="changeGirlName">改变girlName信息</button>
    <button @click="changeInfo">改变info信息</button>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  toRefs,
  computed,
  watchEffect,
  watch,
  onMounted,
} from "vue";
let count = ref(0);
interface ParamOption {
  age?: number;
  name: string;
  address: any;
}

let result = reactive({
  age: 16,
  name: "zyj",
  address: { title: "南京南站", fee: 516 },
});

let arr: Array<string> = reactive([]);
let arr1: [string | number] = [1];

let { name, address } = toRefs(result);

function changeMsg() {
  if (result.age) {
    result.age++;
  }
  arr.push(`${result.age}`);
  arr1.push(2);
}

// computed
const firstName = ref("Kobe");
const lastName = ref("brant");

const fullName = computed(() => {
  return firstName.value + lastName.value;
});

// watchEffect： 自动收集响应式的依赖
const girlName = ref("lxm");
const age = ref(18);
// 刚开始的时候会立即执行一次 收集对应数据的响应式依赖  返回值是一个函数  用于停止侦听
const stop = watchEffect(
  (onInvalidate) => {
    // 根据age和name两个变量发送网络请求  如果当age短时间内进行多次变化时，上一次请求的响应结果还没接收就已经发送下一次请求，   实际上应该在变量再次发生变化的时候应该清除上一次的请求
    // 模拟发送网络请求
    const timer = setTimeout(() => {
      console.log("我是网络请求");
    }, 2000);
    onInvalidate(() => {
      // 在这个函数中清除额外的副作用   即清除上一次请求
      // request.cancel()
      clearTimeout(timer);
      console.log("onInvalidate");
    });

    console.log("girlName", girlName.value, "age", age.value);
  },
  // 如果在监听函数中需要用到dom元素，那么就需要第二个参数  flush
  // 值： 1.pre   默认值，在挂载阶段以前   2.post  在dom挂载完之后或更新完之后  3. sync  官方不建议用
  {
    flush: "post",
  }
);

const changeGirlName = () => {
  girlName.value = girlName.value + "1";
  age.value++;
  if (age.value > 25) {
    stop();
  }
};

// 在setup中根据ref获取dom元素
const title = ref(null);
// 将title作为dom元素上ref的值，挂载后会自动将值赋给title
onMounted(() => {
  console.log("我是挂载阶段");
  console.dir(title.value);
});

// watch 监听
const info = reactive({ name: "lxm", age: 18 });
const refInfo = ref("asd");
const changeInfo = () => {
  info.name = "zyj";
  info.age++;
  refInfo.value = "电饭锅电饭锅";
};
// 侦听reactive对象
watch(info, (newVal, oldVal) => {
  // reactive新旧值都是一样的，都是reactive对象
  console.log("newVal", newVal, "oldVal", oldVal);
});
// 如果希望newVal和oldVal是一个普通的对象
watch(
  () => {
    return { ...info };
  },
  (newVal, oldVal) => {
    // reactive新旧值都是一样的，都是reactive对象
    console.log("newVal", newVal, "oldVal", oldVal);
  }
);

watch(refInfo, (newVal, oldVal) => {
  // ref对象 返回的是  ref的对象的value  而不是ref对象本身
  console.log("newVal", newVal, "oldVal", oldVal);
});

// 侦听对象中的某一个属性
watch(
  () => info.age,
  (newVal, oldVal) => {
    console.log("newVal", newVal, "oldVal", oldVal);
  }
);

// 侦听对象中多个属性
watch(
  [() => info.name, () => info.age],
  ([newVal, newVal1], [oldVal, oldVal1]) => {
    console.log("newVal", newVal, "oldVal", newVal1);
    console.log("oldVal", oldVal, "oldVal1", oldVal1);
  }
);

// deep，immediate参数
watch(
  () => info.age,
  (newVal, oldVal) => {
    console.log("newVal", newVal, "oldVal", oldVal);
  },
  { deep: true, immediate: true }
);
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    /* display: flex;
    align-items: center; */
  }
}
</style>
