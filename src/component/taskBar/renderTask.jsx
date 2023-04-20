import { h, defineComponent, inject, toRefs } from 'vue';
import useCompScheduler from '@/store/componentScheduler';
import styles from './index.module.scss';

const isFixComponent = () => {};
const store = useCompScheduler();

export const renderFixTask = defineComponent({
  props: {
    item: {
      type: Object,
    },
  },
  setup(props) {
    const isSideOfFixComponent = props.item.order; // MARK: 存在即意味着是fixed的app
    let { appName, iconImg, uuid } = props.item;
    const triggerShow = inject('triggerShow');
    let render = null;

    if (isSideOfFixComponent) {
      const { isHide } = toRefs(store.currentShowComponent.find((v) => v.uuid === uuid));
      iconImg = props.item.component.iconImg;
      render = () => {
        return h(
          'div',
          {
            class: `${styles.taskBarIcon} ${isHide.value ? styles.back : styles.active}`,
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
    } else {
      render = () => {
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
    }

    return render;
  },
});

export const renderSideTask = defineComponent({
  props: {
    item: {
      type: Object,
    },
  },
  setup(props) {
    const { appName, iconImg, uuid } = props.item.component;
    const triggerShow = inject('triggerShow');
    const { isHide, order } = toRefs(store.currentShowComponent.find((v) => v.uuid === uuid));
    const render = () => {
      return h(
        'div',
        {
          class: `${styles.taskBarIcon} ${isHide.value ? styles.back : styles.active}`,
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
