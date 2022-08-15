// v-dc 双击

export const directiveName = 'dc';
export default {
  created: (el, binding) => {
    let count = 0;
    let startTime = 0;
    let endTime = 0;
    let timer = null;

    el.addEventListener('click', function (event) {
      startTime = new Date();

      count++;
      if (count === 1) {
        startTime = new Date().getTime();
      }
      if (count === 2) {
        endTime = new Date().getTime();
      }

      if (startTime && endTime && endTime - startTime < 400 && count === 2) {
        // 双击
        binding.value();
      }

      if (!timer) {
        timer = setTimeout(() => {
          startTime = 0;
          endTime = 0;
          count = 0;
          clearTimeout(timer);
          timer = null;
        }, 500);
      } else {
        console.log('别点了');
      }
    });
  },
  update: (el, binding) => {},
};
