import request from '@/services/request';

export const uploadFolderStruct = async (data) => {
  return await request({
    method: 'PATCH',
    url: '/folders',
    data,
  });
};
