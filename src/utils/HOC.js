import { h, ref, defineComponent, watchEffect } from 'vue';
import { DESKTOPICON_IMG_STYLESHEET, DESKTOPICON_SPAN_STYLESHEET } from '../data';
import useCompScheduler from '@/store/componentScheduler';

export const HOCPluginDesktopComponent = (componentConfig) => {};

export const HOCPluginComponent = (isTaskBar, componentConfig) => {
  const store = useCompScheduler();
  return defineComponent({
    render(proxy) {
      const { type, uuid, appName, iconImg, isMount, customZIndex } = componentConfig;
      const refImpl = ref(null);
      const isShow = ref(isMount && customZIndex > 0);

      /**
       *  利用闭包特性，componentConfig自动互联
       */
      const removeNode = () => {
        console.log(store);
        componentConfig.isMount = false;
        componentConfig.customZIndex = -1;
        isShow.value = false;
        proxy.$forceUpdate();
      };

      // watchEffect(() => {
      //   console.log('isShow has changed', isShow);
      // });

      const props = isTaskBar
        ? {
            onClick: () => {
              isShow.value = !isShow.value;
            },
          }
        : Object.assign(
            {
              ondblclick: () => {
                if (isMount) {
                  /// 已经挂载了, 如果是低层级最小化则提升层级
                  console.log(componentConfig, isMount, customZIndex);
                } else {
                  /// 还没挂载
                  componentConfig.isMount = true;
                  isShow.value = !isShow.value;
                  componentConfig.customZIndex = uuid + 1;
                }
              },
            },
            {
              style: {
                display: 'flex',
                flexDirection: 'column',
                justContent: 'center',
                alignItems: 'center',
              },
            }
          );

      watchEffect(() => {
        // NOTE: 暂用引用数据特性同步更新
        if (refImpl.value && !componentConfig.$$$refImpl) {
          componentConfig.$$$refImpl = refImpl.value.children[1];
          componentConfig.removeNode = removeNode;
        }
      });

      return h(
        'div',
        {
          ref: refImpl,
        },
        [
          h(
            'div',
            props,
            h('img', {
              src: iconImg,
              style: DESKTOPICON_IMG_STYLESHEET,
            }),
            h(
              'span',
              {
                style: DESKTOPICON_SPAN_STYLESHEET,
              },
              appName
            )
          ),
          isShow.value
            ? h(type, {
                style: {
                  display: isShow.value ? 'block' : 'none',
                  zIndex: customZIndex,
                },
                isMount: isShow.value,
              })
            : null,
        ]
      );
    },
  });
};
