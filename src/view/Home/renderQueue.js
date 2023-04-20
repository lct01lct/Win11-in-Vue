import { toRaw } from 'vue';
import { HOCPluginComponent } from '../../utils/HOC';
import styles from './index.module.scss';

export default (props) => {
  props = toRaw(props);

  let renderQueue = () => {
    return props.map((c) => {
      return h(HOCPluginComponent(false, c), {
        class: styles.deskTopIcon,
      });
    });
  };

  return renderQueue();

  //   store.$subscribe(() => {
  //     data = store.components;
  //   });

  //   const render = () => {
  //     return (
  //       <div>
  //         {renderQueue.value.map((c) => {
  //           console.log('re run');
  //           return h(c);
  //         })}
  //       </div>
  //     );
  //   };
  //   return render;
};
