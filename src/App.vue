<!--
 * @Author: 王荣
 * @Date: 2022-05-31 15:40:57
 * @LastEditors: 王荣
 * @LastEditTime: 2022-07-09 22:36:43
 * @Description: 填写简介
-->
<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import custom_axios from './request/class-axios'
import Top from './pages/top.vue'
console.log('app')
custom_axios.get('http://md.summeres.site/note/%E6%88%AA%E5%B1%8F2021-03-12%20%E4%B8%8B%E5%8D%8812.37.36.png').catch((err)=>{
  console.log('apperr')
})

</script>

<template>
  APP
  <Top></Top>
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
