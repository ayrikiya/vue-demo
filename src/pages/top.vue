<!--
 * @Author: 王荣
 * @Date: 2022-07-09 22:30:49
 * @LastEditors: 王荣
 * @LastEditTime: 2022-07-09 22:37:44
 * @Description: 填写简介
-->
<script setup>
import custom_axios from '../request/class-axios'
console.log('top')
custom_axios.get('http://md.summeres.site/note/%E6%88%AA%E5%B1%8F2021-03-12%20%E4%B8%8B%E5%8D%8812.37.36.png').catch((err)=>{
  console.log('toperr')
})
</script>

<template lang="">
  <div>
    top
  </div>
</template>

<style lang="">
  
</style>