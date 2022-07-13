/*
 * @Author: 王荣
 * @Date: 2022-06-08 17:05:41
 * @LastEditors: 王荣
 * @LastEditTime: 2022-07-12 16:17:15
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
interface BaseResponseData<T = any> {
  code: number;
  data: T;
  message?: string;
}

class CustomAxios {
  // create: (config?: AxiosRequestConfig) => CustomAxios;
  instance: AxiosInstance;
  // 默认设置的拦截器 
  // 不需要的话可以后续通过this.instance.interceptors.request.eject(id)取消掉
  defaultInterceptors: { requestId?: any; responseId?: any };
  timer: number;
  constructor(instanceConfig?: AxiosRequestConfig) {
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
        // store.commit('setError', {status : true, message : error})
        // mesLoading("加载中", "search_mes");
        // mesSuccess("加载完成", "search_mes");
        // mesError(data?.message || "请求失败", "search_mes");
        
        // 自定义的一些数据 需要config作为载体由请求转发到响应处理 
        // 拦截器计算响应时间
        // loading定时器
        config.customData = {
          startTime: +new Date(),
          loadingTimer: setTimeout(() => {
            console.log('*******加载loading')
          }, 200),
        };
        

        return config;
      }
    );

    // 响应拦截
    this.defaultInterceptors.responseId = instance.interceptors.response.use(
      (response: AxiosResponse<BaseResponseData>) => {
        // 2xx范围内状态码触发成功处理
        let { data, status, statusText, headers, config, request } = response;

        // 拦截器计算响应时间
        config.customData = {
          ...config.customData,
          endTime: +new Date(),
          // 响应时间 毫秒
          resDuration: +new Date() - (config.customData.startTime as number),
        };
        console.log('响应时间', config.customData.resDuration)
        // loading是否取消定时
        if(config.customData.resDuration as number < 200){
          // 如果计算响应时间小于设定定时 说明响应很快 不需要loading
          console.log('取消loading定时')
          clearTimeout(config.customData.loadingTimer)
        }else{
          // 如果响应时间大于设定定时 loading已经加载了一段时间 现在有响应 取消掉loading
          console.log('取消加载loading')
        }

        //根据前后端约定进行一些是否正确返回的判断
        if (status === 200 && data.code === 0) {
          // 弹出加载成功信息
          // store.commit('setSuccess', true)
          // mesSuccess("加载完成", "search_mes");
          return response;
        } else {
          console.log("成功但不是200", response);
          // 这里是后端约定的错误处理，会在response.data里处理
          // 例如： response.data = {data: '', code: 1, message: '查询参数类型错误'}

          // 弹出加载警告信息
          // store.commit('setWarning', true)
          // mesWarning(response.data.message, "search_mes");
          return Promise.reject(response);

        }

        // return response;
      },
      (err) => {
        // 超出2xx状态码触发错误处理
        // 在error中要取到后端返回信息，必须要取err.response。被包装了一层。
        const { response } = err;
        const { data, status, statusText, headers, config, request } = response;

        // 拦截器计算响应时间
        config.customData = {
          ...config.customData,
          endTime: +new Date(),
          // 响应时间 毫秒
          resDuration: +new Date() - (config.customData.startTime as number),
        };
        // loading是否取消定时
        if(config.customData.resDuration as number < 40){
          // 如果计算响应时间小于40ms 说明响应很快 不需要loading
          console.log('取消loading定时显示')
        }else{
          // 如果响应时间大于40ms loading已经加载了一段时间 现在有响应 取消掉loading
          console.log('取消加载loading')
        }
        
        // 这里是非后端约定的错误处理，可能是服务器错误等，会在response.data里处理
        // 这里response.data可能直接就是错误提示 response.data = '服务器错误404'

        // 这里必须是返回一个reject的promise， 这样才会走axios.request在then函数中的catch
        // 如果是return err; 也会then当作成功处理。
        return Promise.reject(response);
      }
    );

    return instance;
  }

  request<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance.request<BaseResponseData<T>>(config).then(
        (response) => {
          let { data, status, statusText, headers, config, request } = response;
        
          // if (status === 200 && data.code === 0) {
          //   resolve(data.data);
          // } else {
          //   // setTimeout(() => {
          //     // store.commit('setLoading', false)
          //     // console.log("1dfafsdgsdfgas");
          //     // mesError(data?.message || "请求失败", "search_mes");
          //   // }, 500);
          //   console.log("成功但不是200", response);
          //   reject(data);
          // }
          resolve(data.data)
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
