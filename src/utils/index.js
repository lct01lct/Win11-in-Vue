import { toggleTaskPublicData } from '../data';

/**
 * 功能： 在data目录中共同维护一个最高层级的索引值，
 *      每次调用此函数，返回当前最大的索引级数返回给
 *      调用者，同时维护该数据++
 * 思路：每次调用就说明，多开一个层级，比如说：现在有两个应用，那么层级就是
 *      2，再次开启新的application，就意味着要比前两个层级大！为3
 * @author("闫德强")
 * @return number
 */
export const topZindex = () => {
  return ++toggleTaskPublicData.zIndex;
};

/**
 * function：切换task显示将其透明度设置为-1，并维护公共数据，表明
 *          当前页面上显示的application数字减一
 * @author(闫德强)
 * @return void
 */
export const relizeZindex = () => {
  --toggleTaskPublicData.zIndex;
};

/**
 * @author(闫德强)
 * @param {*} target 目标组件元素
 *
 * 传入目标元素，在此说明：约定底部栏的name和各组件的类名同名
 * 所以，可以直接获取到该组件，并显示
 */
export const showBox = (target) => {
  target.style.zIndex = topZindex();
  target.classList.add('showBox');
  target.classList.remove('hideBox');
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
  target.style.zIndex = -1;
  target.classList.remove('showBox');
  target.classList.add('hideBox');
  relizeZindex();

  const item = document.querySelector(`#${e}`);

  if (!flag) {
    item.style.borderBottom = '0';
  } else {
    item.style.borderBottom = '3px solid black';
  }
};
