import axios from 'axios';
import router from '@/routes';
import nprogress from '@/utils/nprogress';
import { ElMessage } from 'element-plus';
import qs from 'qs';
import { userStore } from '@/store/userStore';

// export const OK_CODE = 200;
// export const UNAUTHORIZED = 401;
// export const NO_PERMISSION = 403;
axios.defaults.withCredentials = true;
const http = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: '/api',
  timeout: 50000,
});

// HTTP状态码
http.httpcode = {
  // 暂未登录或TOKEN已经过期
  UNAUTHORIZED: 401,
  // 没有相关权限
  FORBIDDEN: 403,
  // 上传参数异常
  PARAMS_INVALID: 9995,
  // ContentType错误
  CONTENT_TYPE_ERR: 9996,
  // 功能尚未实现
  API_UN_IMPL: 9997,
  // 服务器繁忙
  SERVER_BUSY: 9998,
  // 操作失败
  FAIL: 9999,
  // 操作成功
  SUCCESS: 10000,
};

// 拦截器
http.interceptors.request.use((config = {}) => {
  // 这里不能使用pinia，因为pinia在该文件可能为被vue初始化导致报错
  nprogress.start();
  try {
    const store = userStore();
    const token = store.getToken;
    if (token) {
      config.headers.common.Authorization = 'Bearer ' + token;
    }

    if (config.contentType === 'application/x-www-form-urlencoded') {
      config.data = config.data && qs.stringify(config.data);
    }
  } catch (e) {
    console.log(e);
  }
  return config;
});

http.interceptors.response.use(
  // (res) => {
  //   nprogress.done();
  //   const { code, msg } = res.data || {};
  //   if (code !== OK_CODE) {
  //     return Promise.reject(msg);
  //   }
  //   if (code === NO_PERMISSION) {
  //     router.push({ name: 'Login' }).then();
  //     return Promise.reject(msg);
  //   }
  //   return Promise.resolve(res);
  // },
  // (error) => {
  //   return Promise.reject(error);
  // }
  async (response) => {
    // HTTP响应状态码正常
    if (response.status === 200) {
      nprogress.done();
      if ('code' in response.data) {
        const store = userStore();
        const data = response.data;
        switch (data.code) {
          case http.httpcode.SUCCESS:
            // 将数据继续传递下去
            return Promise.resolve(data);
          case http.httpcode.FAIL:
            // 错误操作，将数据继续传递下去
            return Promise.resolve(data);
          case http.httpcode.FORBIDDEN:
            // 权限不足
            ElMessage.error('权限不够，请联系管理员');
            // 将数据继续传递下去
            return Promise.reject(data);
          case http.httpcode.UNAUTHORIZED:
            // 判断是否是超时
            if (typeof data.data === 'string' && data.data.indexOf('Jwt expired at') >= 0) {
              // 刷新凭证
              await store.reloadToken();
              // 设置为未加载
              store.setLoaded(false);
              // 跳转到主页
            } else {
              // 没有登录或登录已失效
              router.push('/');
              // 重置数据
              store.resetSaveData();
              ElMessage.warning('暂未登录或者登录已过期！');
            }
            // 将数据继续传递下去
            return Promise.reject(data);
          default:
            // 显示操作失败提示
            // ElMessage.error(response.data.message || "操作失败!!!");
            return Promise.reject(response);
        }
      }
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK')
      ElMessage.error('连接服务器失败!!!');
    return Promise.reject(error);
  }
);

/**
 * @param {String} method 请求方法
 * @param {String} url 接口地址
 * @param {Object} submitData 提交数据
 * @param {String} contentType 请求资源类型，默认json
 * @param {Object} options 配置项
 **/
export default (method, url, submitData, contentType = 'json', options) => {
  let file;
  switch (contentType) {
    case 'json':
      contentType = 'application/json';
      break;
    case 'form':
      contentType = 'application/x-www-form-urlencoded';
      break;
    case 'file':
      contentType = 'multipart/form-data';
      file = new FormData();
      file.append('file', submitData);
      submitData = file;
      break;
    default:
      contentType = 'application/json';
      break;
  }

  return new Promise((resolve, reject) => {
    const reqParams = {
      method,
      url,
      [method.toLowerCase() === 'get' || method.toLowerCase() === 'delete' ? 'params' : 'data']:
        submitData,
      contentType,
      ...options,
    };

    http(reqParams)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
