<!--
 * @Author: 王荣
 * @Date: 2022-05-31 15:40:57
 * @LastEditors: 王荣
 * @LastEditTime: 2022-06-06 16:16:43
 * @Description: 填写简介
-->
<script setup>
import { ref } from 'vue'
// import axios from 'axios';
import axios from '../request/axios';
// axios.defaults.baseURL = 'http://localhost:7001/api/'
// const request = axios.create({
//   baseURL: 'http://localhost:8000/api/'
// })

console.log('hello')
defineProps({
  msg: String
})

const count = ref(0)

console.log('//hello请求前')
axios.get('/dada')
console.log('//hello请求后')

</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
