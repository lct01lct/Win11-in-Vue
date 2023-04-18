import { h } from 'vue';
import All from '@/component/index';

const getModules = () => {
  const map = [];
  for (const k in All) {
    map.push(h(All[k]));
  }
  return map;
};

/**
 *  render All Packages
 */
export default defineComponent({
  setup() {
    const data = getModules();

    const render = () => {
      return (
        <div>
          {data.map((c) => {
            return h(c);
          })}
        </div>
      );
    };
    return render;
  },
});
