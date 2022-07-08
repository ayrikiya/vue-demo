/*
 * @Author: 王荣
 * @Date: 2022-06-08 17:05:41
 * @LastEditors: 王荣
 * @LastEditTime: 2022-07-08 13:56:09
 * @Description: 类写法创建自定义axios
 */
// export {}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// import {
//   mesLoading,
//   mesError,
//   mesSuccess,
//   mesWarning,
// } from "src/util/message/message";

// 基本返回数据格式 (response.data的类型)
interface BaseResponseData<T> {
  code: number;
  data: T;
  message?: string;
}

class CustomAxios {
  // create: (config?: AxiosRequestConfig) => CustomAxios;

  instance: AxiosInstance;
  defaultInterceptors: { requestId?: any; responseId?: any };
  // defaults: AxiosRequestConfig

  constructor(instanceConfig?: AxiosRequestConfig) {
    // this.defaults = instanceConfig;

    // this.interceptors = {
    //   request: new InterceptorManager(),
    //   response: new InterceptorManager()
    // };
    this.defaultInterceptors = {};
    this.instance = this.getInstance(instanceConfig);
  }

  create = (config?: AxiosRequestConfig) => {
    return new CustomAxios(config);
  };

  getInstance(config?: AxiosRequestConfig): AxiosInstance {
    const instance = axios.create(
      Object.assign(
        {},
        {
          timeout: 1000 * 8,
        },
        config
      )
    );

    // 每次请求 加loading和error
    this.defaultInterceptors.requestId = instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 通过vuex管理全局弹窗状态 初看起来有点小题大作，但弹窗的状态放在哪个组件中都不合适，即使放在根组件，如果子组件有修改弹窗状态的需求，父子传值也一点不优雅。
        // store.commit('setLoading', true)
        // store.commit('setError', {status : false, message : ''})
        // mesLoading("加载中", "search_mes");
        // 拦截器计算响应时间
        config.metadata = {
          startTime: Number(new Date()),
          endTime: Number(new Date()),
        };

        return config;
      }
    );

    this.defaultInterceptors.responseId = instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 2xx范围内状态码触发成功处理
        let { data, status, statusText, headers, config, request } = response;

        setTimeout(() => {
          // store.commit('setLoading', false)
          // console.log("1dfafsdgsdfgas");
          // mesSuccess("加载完成", "search_mes");
        }, 500);

        // 拦截器计算响应时间
        config.metadata = {
          startTime: config.metadata?.startTime as number,
          endTime: Number(new Date()),
        };
        // 响应时间 毫秒
        const resDuration = config.metadata.endTime - config.metadata.startTime;
        console.log("响应时间", resDuration);

        return response;
      },
      (err) => {
        // 超出2xx状态码触发错误处理
        // 在error中要取到后端返回信息，必须要取err.response。被包装了一层。
        const { response } = err;
        const { data, status, statusText, headers, config, request } = response;

        // console.log("err", err);
        // console.log("err response", response);

        // 拦截器计算响应时间
        config.metadata.endTime = Number(new Date());
        // 响应时间 毫秒
        const resDuration = config.metadata.endTime - config.metadata.startTime;
        console.log("响应时间", resDuration);

        // const { error } = err.response.data
        // store.commit('setError', {status : true, message : error})
        // store.commit('setLoading', false)
        // return Promise.reject(err.response.data)
        setTimeout(() => {
          // store.commit('setLoading', false)
          // console.log("1dfafsdgsdfgas");
          // mesError(err?.message || "请求失败", "search_mes");
        }, 500);

        // 这里必须是返回一个reject的promise， 这样才会走axios.request在then函数中的catch
        // 如果是return err; 也会then当作成功处理。
        return Promise.reject(err);
      }
    );

    return instance;
  }

  request<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance.request<BaseResponseData<T>>(config).then(
        (response) => {
          let { data, status, statusText, headers, config, request } = response;

          if (status === 200 && data.code === 0) {
            resolve(data.data);
          } else {
            setTimeout(() => {
              // store.commit('setLoading', false)
              // console.log("1dfafsdgsdfgas");
              // mesError(data?.message || "请求失败", "search_mes");
            }, 500);
            console.log("成功但不是200", response);
            reject(data);
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>(
      Object.assign({}, config, {
        method: "GET",
        url: url,
      })
    );
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>(
      Object.assign({}, config, {
        method: "DELETE",
        url: url,
      })
    );
  }

  head<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>(
      Object.assign({}, config, {
        method: "HEAD",
        url: url,
      })
    );
  }

  options<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>(
      Object.assign({}, config, {
        method: "OPTIONS",
        url: url,
      })
    );
  }

  post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>(
      Object.assign({}, config, {
        method: "POST",
        url: url,
        data: data,
      })
    );
  }

  put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>(
      Object.assign({}, config, {
        method: "PUT",
        url: url,
        data: data,
      })
    );
  }
  patch<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>(
      Object.assign({}, config, {
        method: "PATCH",
        url: url,
        data: data,
      })
    );
  }
}

function createInstance(config?: AxiosRequestConfig) {
  let instance = new CustomAxios(config);
  // instance.create = function create(config?: AxiosRequestConfig) {
  //   return createInstance(config);
  // };
  return instance;
}

const custom_axios = createInstance();

export default custom_axios;
