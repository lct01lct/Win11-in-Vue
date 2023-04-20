import { h, defineComponent, inject } from 'vue';
import styles from './index.module.scss';

export default defineComponent({
  props: {
    item: {
      type: Object,
    },
  },
  setup(props) {
    const { appName, iconImg, uuid } = props.item;
    const triggerShow = inject('triggerShow');

    const render = () => {
      return h(
        'div',
        {
          class: styles.taskBarIcon,
          onClick: () => triggerShow(uuid),
        },
        [
          h(
            'div',
            h('img', {
              src: iconImg,
            })
          ),
        ]
      );
    };
    return render;
  },
});
