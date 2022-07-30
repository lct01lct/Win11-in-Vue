import axios from 'axios';
import router from 'router';
import useUserStore from 'store/userStore';

const http = axios.create({
  // baseURL: import.meta.env.VITE_BACKEND,
  baseURL: '/api',
  timeout: 5000,
});

http.httpCode = {
  SUCCESS: 200, // 成功
  CREAETED: 201, // 创建成功
  DELETEED: 204, // 删除成功
  UNAUTHORIZED: 401, // 没有权限
};

http.interceptors.request.use((config) => {
  const userStore = useUserStore();
  const token = userStore.getToken;

  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (err) => {
    const res = err.response;
    if (res.status === http.httpCode.UNAUTHORIZED) {
      // 权限不够，返回登录页
      router.push('/');
      return Promise.reject(res);
    }
    return Promise.reject(err);
  }
);

const request = (params) => {
  const reqMethod = params.method.toLowerCase();
  if (reqMethod === 'get' || reqMethod === 'delete') {
    params.param = params.data;
    delete params.data;
  }

  return new Promise((resolve, reject) => {
    http(params)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.data));
  });
};

export default request;
