import { defineComponent } from 'vue';
import { handleRename } from '@/utils';
import userStore from '@/store/userStore/index.js';
import './jsxCss.scss';

export default defineComponent({
  props: ['data'],
  // emits:[],
  setup(props) {
    const data = props.data;

    const store = userStore();

    const themeImgData = [
      {
        name: 'default',
      },
      {
        name: 'dark',
      },
      {
        name: 'moon',
      },
      {
        name: 'stream',
      },
      {
        name: 'color',
      },
      {
        name: 'color1',
      },
    ];

    // 主题的切换，需要：切换本地store的图片路径
    // 切换被选择的图片的类名，实现被选中状态
    const toggleTheme = (e) => {
      const model = e.target.getAttribute('payload');
      store.toggleTheme(model);
    };

    const rename = () => {
      handleRename();
    };

    const render = () => {
      return (
        <ul class="settingMainBodyList">
          {data.map((value) => {
            switch (value.type) {
              case 'sysTop':
                return (
                  <div key={value} class={value.type}>
                    <div class="left">
                      {/* 图片时动态的，应该存储在store，此处先做死数据 */}
                      <img
                        src={`src/assets/img/setting/assetsImg/default/${store.getTheme}.jpg`}
                        class="systemThemeImg"
                      />
                      <div class="message">
                        {/* 此处的数据应为store中，先在此做死数据 */}
                        <p>{store.getUsername}</p>
                        <p>NS14A8</p>
                        <p onClick={rename}>Rename</p>
                      </div>
                    </div>
                    <div class="right">
                      <div class="column">
                        <div>
                          <span>Microsoft 365</span>
                          <span class="column_lower">View benefits</span>
                        </div>
                      </div>
                      <div class="column" onClick={() => setPage('Windows Update')}>
                        <img src="src/assets/img/setting/Windows Update.webp" alt="" height={20} />
                        <div>
                          <span>Windows Update</span>
                          <span class="column_lower">You're up to date</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              case 'title square':
              case 'subHeading':
              case 'spacer':
                return (
                  <div key={value} class={value.type}>
                    {value.name}
                  </div>
                );
              case 'title thin-blue':
                return (
                  <div key={value} class={value.type}>
                    {value.name}
                  </div>
                );
              case 'netTop':
                return (
                  <div key={value} class={value.type}>
                    <div>
                      <img src="src/assets/img/setting/wifi1.png" />
                      <div class="message">
                        <h2>WiFi</h2>
                        <p>Connected, secured</p>
                      </div>
                    </div>
                    <div>
                      <img class="warning" src="src/assets/img/setting/warning.jpg" />
                      <div class="message">
                        <h3>Properties</h3>
                        <p>Public network 5 Ghz</p>
                      </div>
                    </div>
                    <div>
                      <img class="warning" src="src/assets/img/setting/warning.jpg" />
                      <div class="message">
                        <h3>Data Usage</h3>
                        <p>{Math.round(Math.random() * 100)}GB, last 30 days</p>
                      </div>
                    </div>
                  </div>
                );
              case 'personaliseTop':
                return (
                  <div key={value} class={value.type}>
                    <div>
                      <img
                        class="CurrentImg"
                        src={`src/assets/img/setting/assetsImg/default/${store.$state.themeSrc}.jpg`}
                      />
                    </div>
                    <div>
                      <h3>Select a theme to apply</h3>
                      <div class="themeSelect">
                        {themeImgData.map((value) => {
                          return (
                            <img
                              onClick={toggleTheme}
                              payload={value.name}
                              src={`src/assets/img/setting/assetsImg/default/${value.name}.jpg`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              case 'accountsTop':
                return (
                  <div key={value} class={value.type}>
                    <img src="src/assets/img/setting/defAccount.png" />
                    <div className="message">
                      <span>{store.getUsername}</span>
                      <span>Local Account</span>
                      <span>Administrator</span>
                    </div>
                  </div>
                );
              case 'timeTop':
                return (
                  <div key={value} class={value.type}>
                    <h1>
                      {new Date().toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false,
                      })}
                    </h1>
                  </div>
                );
              case 'updateTop':
                return (
                  <div key={value} class={value.type}>
                    <div>
                      <img src="src/assets/img/setting/update.png" />
                      <div>
                        <span>You're up to date</span>
                        <span>Last checked: Today</span>
                      </div>
                    </div>
                    <div>
                      <button>Check for updates</button>
                    </div>
                  </div>
                );
              default:
                return (
                  <li key={value}>
                    {/* <img src={`src/assets/img/setting/${value.icon}.png`} /> */}
                    <div class="descMessage">
                      <span class="descMessage-name">{value.name}</span>
                      <span class="descMessage-desc">{value.desc}</span>
                    </div>
                  </li>
                );
            }
          })}
        </ul>
      );
    };
    return render;
  },
});
