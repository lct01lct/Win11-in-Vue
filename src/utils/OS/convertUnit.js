const units = ['B', 'KB', 'MB', 'GB', 'TB'];
const baseRadix = 1024;

/**
 * 根据不同单位求内存的和
 *
 * @param {String} num1 任意类型的单位
 * @param {String} num2 任意类型的单位
 * @returns {String} 单位为 B 的数据
 */
export const addStorageUnit = (num1, num2) => {
  num1 = getBytes(num1);
  num2 = getBytes(num2);

  return num1 + num2 + 'B';
};

/**
 * 内存占用率
 *
 * @param {String} usage 使用的内存，任意类型的单位
 * @param {String} totol 总内存，任意类型的单位
 * @returns {String} 百分比数据
 */
export const divStorageUnit = (usage, totol) => {
  return (getBytes(usage) / getBytes(totol)) * 100 + '%';
};

/**
 * 以合适的单位展示内存
 *
 * @param {String} num  任意类型的单位
 * @returns {String} 内存大小
 */
export const showProperUnit = (num) => {
  const res = separateUnit(num);
  let size = res.size;
  let index = units.indexOf(res.unit);
  while (size >= baseRadix) {
    size /= baseRadix;
    index++;
  }

  return size + units[index];
};

/**
 * 根据数据分离单位和内存大小数字
 *
 * @param {String} num 任意类型的单位
 * @returns {Array} 返回数字和单位的数组
 */
function separateUnit(num) {
  const res = {};
  res.size = parseFloat(num);
  res.unit = num.match(/[a-z|A-Z]+/gi)[0].toUpperCase();
  return res;
}

/**
 * 获取单位为字节的内存数据
 *
 * @param {String} num 任意类型的单位
 * @returns {Number} 没有单位的数据
 */
function getBytes(num) {
  // res is a obj contains size and unit(单位)
  const res = separateUnit(num);
  // 返回数组的索引作为次方
  const index = units.indexOf(res.unit);
  // return 原始的数据大小 * 1024的次方
  return res.size * Math.pow(baseRadix, index);
}
