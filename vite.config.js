/*
 * @Author: 王荣
 * @Date: 2022-05-31 15:40:57
 * @LastEditors: 王荣
 * @LastEditTime: 2022-07-08 14:37:37
 * @Description: 填写简介
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0'
  }
})
