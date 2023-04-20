import { h, ref, defineComponent, watchEffect, toRefs } from 'vue';
import { DESKTOPICON_IMG_STYLESHEET, DESKTOPICON_SPAN_STYLESHEET } from '../data';
import useCompScheduler from '@/store/componentScheduler';

export const HOCPluginDesktopComponent = (componentConfig) => {};

export const HOCPluginComponent = (isTaskBar, componentConfig) => {
  const store = useCompScheduler();
  return defineComponent({
    render(proxy) {
      // NOTE:
      const { type, uuid, appName, iconImg } = componentConfig;
      const { isMount, customZIndex } = toRefs(store.components.find((v) => v.uuid === uuid));
      const refImpl = ref(null);
      // const isExistNode = ref(isMount.value && customZIndex.value > 0);
      const isExistNode = ref(isMount.value);

      // MARK：maybe remove
      const removeNode = () => {
        console.log(store);
        componentConfig.isMount = false;
        componentConfig.customZIndex = -1;
        isExistNode.value = false;
        proxy.$forceUpdate();
      };

      const props = isTaskBar
        ? {
            onClick: () => {
              // isExistNode.value = !isExistNode.value;
              // console.log(1);
              if (isMount.value) {
                /// 已经挂载了, 如果是低层级最小化则提升层级
                if (customZIndex.value > 0) {
                  return;
                }
                console.log(componentConfig, isMount, customZIndex);
                store.toggleZIndexComponent(uuid);
              } else {
                /// 还没挂载
                store.syncShowComponentData(uuid);
                isExistNode.value = !isExistNode.value;
              }
            },
          }
        : Object.assign(
            {
              ondblclick: () => {
                if (isMount.value) {
                  /// 已经挂载了, 如果是低层级最小化则提升层级
                  if (customZIndex.value > 0) {
                    return;
                  }
                  console.log(componentConfig, isMount, customZIndex);
                  store.toggleZIndexComponent(uuid);
                } else {
                  /// 还没挂载
                  store.syncShowComponentData(uuid);
                  isExistNode.value = !isExistNode.value;
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
          // class: !isTaskBar && 'deskTopIcon'
        },
        [
          h(
            'div',
            props,
            h('img', {
              src: iconImg,
              style: !isTaskBar && DESKTOPICON_IMG_STYLESHEET,
            }),
            !isTaskBar &&
              h(
                'span',
                {
                  style: DESKTOPICON_SPAN_STYLESHEET,
                },
                appName
              )
          ),
          isExistNode.value
            ? h(type, {
                style: {
                  zIndex: customZIndex.value,
                },
                isMount: isExistNode.value,
                __SG_uuid: uuid,
              })
            : null,
        ]
      );
    },
  });
};
