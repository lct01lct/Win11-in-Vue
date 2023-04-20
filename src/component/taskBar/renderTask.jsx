import { h, defineComponent, markRaw, toRaw } from 'vue';
import { HOCPluginComponent } from '../../utils/HOC';

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

// export default renderTask;
