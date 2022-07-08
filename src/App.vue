<!--
 * @Author: 王荣
 * @Date: 2022-05-31 15:40:57
 * @LastEditors: 王荣
 * @LastEditTime: 2022-06-06 16:14:38
 * @Description: 填写简介
-->
<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
// import axios from './request/axios';
import axios from 'axios';
const request = axios.create({
  // baseURL: 'http://localhost:7002/request'
})

// request.interceptors.response.use(response => {
//   // 2xx范围内状态码
//   setTimeout(() => {
//     // store.commit('setLoading', false)
//   }, 1000)
//   return response;
// }, err => {
//   // 超出2xx状态码触发错误处理
//   // 在error中要取到后端返回信息，必须要取err.response。被包装了一层。
//   const { response } = err;
//   const { data, status, statusText, headers, config, request } = response;
//   console.log('err', err)
//   console.log('err response', response)
//   return err;
//   // const { error } = err.response.data
//   // store.commit('setError', {status : true, message : error})
//   // store.commit('setLoading', false)
//   // return Promise.reject(err.response.data)

// })

console.log('//app请求前')
request.get('didi')
console.log('//app请求后')
console.log('app')

// axios.defaults.baseURL = 'http://localhost:7999/api/';
axios.get('dodo')

</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
