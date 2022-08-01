import { defineComponent } from 'vue';
import './jsxCss.scss';

export default defineComponent({
  props: ['data'],
  setup(props) {
    const data = props.data;
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
                        src={`src/assets/img/setting/assetsImg/default/img0.jpg`}
                        class="systemThemeImg"
                      />
                      <div class="message">
                        <p>Liber-V</p>
                        <p>NS14A8</p>
                        <p>Rename</p>
                      </div>
                    </div>
                    <div class="right">
                      <div class="column">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/9/94/M_box.svg"
                          height={20}
                          alt=""
                        />
                        <p>
                          Microsoft 365
                          <br />
                          <span class="column_lower">View benefits</span>
                        </p>
                      </div>
                      <div class="column" onClick={() => setPage('Windows Update')}>
                        <img src="src/assets/img/setting/Windows Update.webp" alt="" height={20} />
                        <p>
                          Windows Update
                          <br />
                          <span class="column_lower">You're up to date</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );

              case 'subHeading':
              case 'spacer':
                return (
                  <div key={value} class={value.type}>
                    {value.name}
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
