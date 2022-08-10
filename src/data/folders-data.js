export default [
  {
    name: 'Windows (C:)',
    memory: '16GB',
    children: [
      {
        name: 'Adobe',
        children: [],
      },
      {
        name: 'Office',
        children: [],
      },
      {
        name: 'DeskTop',
        children: [],
      },
      {
        extension: 'html',
        name: 'index',
        size: '10GB',
      },
    ],
  },
  {
    name: 'Data (D:)',
    memory: '160GB',
    children: [
      {
        name: 'Music',
        children: [
          {
            name: 'QQ Music',
            children: [
              {
                name: '周杰伦的专辑',
                children: [
                  {
                    extension: 'mp4',
                    name: '青花瓷',
                    size: '100GB',
                  },
                  {
                    extension: 'mp4',
                    name: '一路向北',
                    size: '56KB',
                  },
                ],
              },
            ],
          },
          {
            name: 'Cloud Music',
            children: [
              {
                name: '周杰伦的专辑',
                children: [
                  {
                    extension: 'mp4',
                    name: '青花瓷',
                    size: '56KB',
                  },
                  {
                    extension: 'mp4',
                    name: '一路向北',
                    size: '56KB',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        extension: 'html',
        name: 'index',
        size: '20KB',
      },
    ],
  },
];
