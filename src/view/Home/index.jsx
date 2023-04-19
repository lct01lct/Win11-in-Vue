import { h } from 'vue';
import All from '../../scheduler/apps';
import { scheduler } from '../../scheduler/index';
import { HOCPluginComponent } from '../../utils/HOC';
import styles from './index.module.scss';

export const getModules = () => {
  console.log(scheduler);
  const map = [];
  for (const k in All) {
    map.push(h(All[k]));
  }
  console.log(map);
  return map;
};

/**
 *  render All Packages
 */
export default defineComponent({
  setup() {
    const data = scheduler.components;

    const renderQueue = data.map((c) => {
      return h(HOCPluginComponent(false, c), {
        class: styles.deskTopIcon,
      });
    });

    const render = () => {
      return (
        <div>
          {renderQueue.map((c) => {
            console.log('re run');
            return h(c);
          })}
        </div>
      );
    };
    return render;
  },
});
