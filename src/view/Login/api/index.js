import request from '@/services/request';

const baseURL = '/users';

export const login = async (data) => {
  return await request({
    method: 'post',
    url: baseURL + '/login',
    data,
  });
};
