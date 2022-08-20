import { toggleTaskPublicData } from '../data';
import request from '@/services/request';
import { MessageBox } from '@/plugin/Win10UI';
import userStore from '@/store/userStore';
import { taskBarData } from '@/data';

/**
 * 功能： 在data目录中共同维护一个最高层级的索引值，
 *      每次调用此函数，返回当前最大的索引级数返回给
 *      调用者，同时维护该数据++
 * 思路：每次调用就说明，多开一个层级，比如说：现在有两个应用，那么层级就是
 *      2，再次开启新的application，就意味着要比前两个层级大！为3
 * @author("闫德强")
 * @return number
 */
export const topZindex = (target) => {
  toggleTaskPublicData.currentAppCount.map((value) => {
    value.style.zIndex = toggleTaskPublicData.zIndex;
  });
  toggleTaskPublicData.currentAppCount.push(target);
  return ++toggleTaskPublicData.zIndex;
};

export const searchMaxZindex = () => {};

/**
 * function：切换task显示将其透明度设置为-1，并维护公共数据，表明
 *          当前页面上显示的application数字减一
 * @author(闫德强)
 * @return void
 */
export const relizeZindex = (target) => {
  toggleTaskPublicData.currentAppCount.map((value, i, array) => {
    const originClass = value.getAttribute('class');
    const targetClass = target.getAttribute('class');
    if (originClass === targetClass) {
      array.splice(i, 1);
    }
  });
  --toggleTaskPublicData.zIndex;
};

/**
 * @author(闫德强)
 * @param {*} target 目标组件元素
 *
 * 传入目标元素，在此说明：约定底部栏的name和各组件的类名同名
 * 所以，可以直接获取到该组件，并显示
 */
export const showBox = (target, name) => {
  if (!target) return;
  target.style.zIndex = topZindex(target);

  target.classList.add('showBox');
  target.classList.remove('hideBox');

  if (name) {
    let flag;
    taskBarData.map((value) => {
      if (value.name === name) {
        flag = true;
      }
    });
    if (flag) {
      return;
    }
    taskBarData.push({
      icon: `${name}.png`,
      name,
    });
  }
};

/**
 * @author(闫德强)
 * @param {*} flag 是否最小化或者关闭
 * @param {*} target 目标组件
 * @param {*} e 底部栏名字，是一个类
 *
 * 根据是否为最小化或者关闭，决定是否给borderBottom
 * 由于底部栏的id和组件的类名同名，所以可以同时操作是否显示borderBottom
 */
export const hideBox = (flag, target, e) => {
  if (!target) return;

  target.style.zIndex = -1;
  target.classList.remove('showBox');
  target.classList.add('hideBox');
  relizeZindex(target);

  const item = document.querySelector(`#${e}`);

  if (!flag) {
    item.style.borderBottom = '0';
  } else {
    item.style.borderBottom = '3px solid black';
  }
};

/**
 * 处理更改用户名
 * @returns void
 */
export const handleRename = async () => {
  const store = userStore();
  const rename = await MessageBox.prompt({
    showCancelBtn: true,
    cancelBtnText: '取消',
    confirmBtnText: '确定',
    title: '重命名你的账户',
    content: `当前用户名为 ${store.getUsername}`,
  }).catch(() => {});

  if (!rename) {
    return;
  }

  const res = await request({
    method: 'patch',
    data: {
      rename,
    },
    url: '/users',
  });

  if (res.status === 'success') {
    store.setUsername(rename);
  }
};
