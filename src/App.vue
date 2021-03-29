<template>
  <img src="./assets/logo.png" class="logo">
  <h1>Hello Vue 3!/!=e</h1>
  <button @click="inc">Clicked {{ count }} times.</button>
  <div class="imageplace"></div>
  <div class="photo"></div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const inc = () => {
      count.value++
    }

    return {
      count,
      inc
    }
  }
}
</script>

<style scoped>

</style>
