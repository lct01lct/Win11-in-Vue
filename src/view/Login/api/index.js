import request from '@/services/request';

const baseURL = '/users';

const login = async (data) => {
  return await request({
    method: 'post',
    url: baseURL + '/login',
    data,
  });
};

export default {
  login,
};
