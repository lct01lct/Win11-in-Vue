import request from '@/services/request.js';
import userStore from '@/store/userStore';
const store = userStore();

const baseURL = '/users';

export const getUsers = async () => {
  const res = await request({
    method: 'GET',
    url: baseURL,
  });
  if (res.status === 'success') {
    store.setUsername(res.data.name);
  }
};
