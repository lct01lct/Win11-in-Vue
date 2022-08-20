export const handleInput = (flag, area) => {
  if (flag === '') {
    area.value = '';
    return;
  }

  // eslint-disable-next-line prefer-const
  let value = flag.split(' ');

  const actionOrigin = value.splice(0, 1)[0];

  // 如果是回退那么就不拆分
  const command = value.join(' ') === '../' ? '../' : value.join(' ').split('/');

  return {
    actionOrigin,
    command,
  };
};
