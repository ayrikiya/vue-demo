/*
 * @Author: 王荣
 * @Date: 2022-07-08 10:08:19
 * @LastEditors: 王荣
 * @LastEditTime: 2022-07-12 16:00:04
 * @Description: 填写简介
 */

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";


declare module 'axios'{

  interface AxiosRequestConfig {
    // 因为在请求request和response阶段都能读取config
    // 利用这个特性我们可以借助config传输一些我们想传的信息
    // 例如请求何时开始 何时结束 计算出请求响应时间
    customData: {
      startTime?: number;
      endTime?: number;
      // 请求发出到返回到时间间隔
      resDuration?: number;
      
      // 信息弹窗的timer编号
      // 我的想法是在request阶段创建一个定时器，在一定时间后触发loading
      // 但是如果响应的时间在response阶段计算得出小于这个定时，那么就没必要展示loading状态 取消掉定时器
      // 为了解决一个想法
      // 比如在300ms内的响应, 对人是没有明显感知的，没必要加loading,加了也是最长300ms的loading然后加载完成取消loading，一闪而逝，体验很不好，显得很多余。
      loadingTimer?: number;
    };
    

  }
}

