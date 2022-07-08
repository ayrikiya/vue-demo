/*
 * @Author: 王荣
 * @Date: 2022-07-08 10:08:19
 * @LastEditors: 王荣
 * @LastEditTime: 2022-07-08 10:16:14
 * @Description: 填写简介
 */
/*
 * @Author: 王荣
 * @Date: 2022-06-16 14:38:28
 * @LastEditors: 王荣
 * @LastEditTime: 2022-06-16 14:41:49
 * @Description: 填写简介
 */

import axios, { AxiosInstance, AxiosRequestConfig as IAxiosRequestConfig, AxiosResponse } from "axios";


declare module 'axios'{

  interface AxiosRequestConfig {
    metadata?: {
      startTime: number;
      endTime: number;
    };
  }
}

