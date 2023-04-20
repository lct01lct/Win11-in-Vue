import Start from '@/component/Start';
import Search from '@/component/Search/Search.vue';
// import LeftPane from '@/component/LeftPane/LeftPane';

export const toolSize = {
  viewSizeWidth: 800,
  viewSizeHeight: 500,
  left: document.body.clientWidth / 4,
  top: 150,
};

export const toggleTaskPublicData = {
  zIndex: 1,
  currentAppCount: [],
};

export const taskBarBottomPop = [
  {
    icon: 'home.png',
    name: 'startMenu',
    way: 'bottom',
    component: shallowRef(Start),
  },
  {
    icon: 'search.png',
    name: 'search',
    way: 'bottom',
    component: shallowRef(Search),
  },
  // {
  //   icon: 'widget.png',
  //   name: 'widget',
  //   way: 'left',
  //   // component: shallowRef(LeftPane),
  // },
];

export const taskBarData = reactive([
  {
    icon: 'settings.png',
    name: 'settingFullBox',
  },
  {
    icon: 'explorer.png',
    name: 'FolderFullBox',
  },
  {
    icon: 'edge.png',
    name: 'EdgeFullBox',
  },
  {
    icon: 'store.png',
    name: 'store',
  },
]);

export const deskTopData = [
  {
    icon: 'user.png',
    name: 'User',
    componentName: 'user',
    posIdx: 1,
  },
  {
    icon: 'bin1.png',
    name: '垃圾箱',
    componentName: 'Rubish',
    posIdx: 2,
  },
  {
    icon: 'settings.png',
    name: '设置',
    componentName: 'settingFullBox',
    posIdx: 3,
  },
  {
    icon: 'edge.png',
    name: 'Edge',
    componentName: 'EdgeFullBox',
    posIdx: 5,
  },
  {
    icon: 'store.png',
    name: 'store',
    componentName: 'store',
    posIdx: 6,
  },
];

export const DESKTOPICON_IMG_STYLESHEET = {
  width: '2em',
  height: '2em',
};

export const DESKTOPICON_SPAN_STYLESHEET = {
  textAlign: 'center',
  width: '100%',
  fontSize: '0.7em',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  userSelect: 'none',
  color: 'white',
  marginTop: '0.5em',
};
