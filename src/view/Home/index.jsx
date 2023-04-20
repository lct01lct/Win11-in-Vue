import { h, toRefs, toRaw, computed, reactive } from 'vue';
// import All from '../../scheduler/apps';
// import { scheduler } from '../../scheduler/index';

import styles from './index.module.scss';

/**
 *  render All Packages
 */
export default defineComponent({
  props: {
    list: {
      type: Array,
    },
  },
  setup(props) {
    const { list } = toRefs(props);

    const render = () => {
      return (
        <div>
          {list.value.map((c) => {
            console.log('re run');
            return h(c);
          })}
        </div>
      );
    };
    return render;
  },
});
