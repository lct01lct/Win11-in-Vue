# 主页重构计划

## 架构演变方向
>
> 主页应用注册方式变为自动注册，通过`apps`导出所有`app`，后续大范围重构可以构建`monorepo`，将`app`分包发布，具体形式类似于组件库那种？

```javascript
{Object.keys(Applications).map((key, idx) => {
    var WinApp = Applications[key];
    return <WinApp key={idx} />;
})}

```

[√]组件应该伪挂载，在不需要出现的时候不应该被渲染，否则毫无疑问这会拖垮首屏渲染

[√]将所有的组件和`taskBar`做联动，当点击的时候控制对应的组件显现。通过`nomalize HOC`实现

### 1. 重构`ToolsBar`

- [√]组件最小化不应该进行隐藏，而是隐藏层级，因为频繁的触发`display：none`会引起性能问题
- [√]组件关闭需要考虑是否进行`display：none`，因为关闭后可能短时间内不会再次打开
- [√]组件关闭最小化与否通过调用`scheduler`的方法实现

### 2. 如何实现全局联动？

> 单纯依靠对象的引用特性难以达成需求，如果依靠响应式那么如何将`scheduler`数据流向全局？

- [X]如果采用`props`那就意味着需要对所有的组件进行改动，这显然违背开闭原则
- [X]如果采用依赖注入的方式依然可以实现跨组件共享数据，同时可以确保所有组件都能够正常接收，因为他们同属于一个依赖链，但是性能负担较大，如果大规模组件存在，难以保证性能
- [√]如果采用`store`方式可以实现跨组件间共享数据

### 3. 重构`taskBar`

- 底部栏根据你的配置决定是否固定 通过 `Scheduler` - `isShowTaskBar`实现
- 底部栏要联动桌面 通过`HOC`实现
- taskBar还需要考虑当前打开的`app`是否是`taskBar`固定的，如果是固定的就原地打开即可，如果不是就末位打开，按照时间戳排序（UI层消化）

[√]`ToolsBar`联动`pinia.components`实现层级切换
[]`ToolsBar` 要首要缓存下`pinia`中的目标`uuid`

在`ondbclick`的时候通过`componentConfig`的`uuid`更新`pinia`目标数据
`taskbar`同步消费`currentShowTaskbar`，数据按照时间戳进行排序
`desktop`要消费`scheduler.components`直接消费`pinia`的`components`即可
做到多向联动性是系统互联的基础

---

继续演变
> 为什么要继续演变？

因为如果继续采用`HOC`方案，那么目标应用在开启的时候需要打开两次，这不是一个好的结果

> 那么如何做到组件统一管理，且只渲染一次呢？

我的思路是仍然保留`scheduler`方案，`HOC`方案也可以继续得以保留，因为我觉得以`HOC`方案做组件的管理要更加单一化细粒度，各`HOC`各司其职

那么就需要`taskBar`做出让步了，因此`taskBar`的渲染方案并不是继续采用`HOC`方案，而是自己渲染出一套`icon`来

由于在`view/home/index.vue`中会向其（`taskBar`）传入`component`数组，因此可以拿到`img`、`appName`、包括`uuid`，

这样的话在点击的时候就可以利用`uuid`进行内容的显示了

> 如何在组件隐藏的时候能同步`taskbar`样式

想起来很简单，因为如果是正在显示的话，一定是存在于`currentShowComponent`中的，如此一来，我需要在`taskBar`中做出操作

> 如何操作？

要分为不同的考虑方式
> `taskBar`的显示数据源分为两个部分：`fixTaskBarComponent`和`currentShowComponent`
> 因此需要考虑：

1. 如果是`fixTaskBarComponent`的任务显示无论`order`与否都是原地显示的
2. 如果不是`fixTaskBarComponent`中的任务显示就需要根据`order`进行排序，`order`越小距离左侧越近（这个地方写死还是做动态化）

因此渲染还需要依赖于`currentShowComponent`，对于隐藏（非关闭）的组件来讲，它仍然还存在于`currentShowComponent`中，因此这个时候需要根据`isHide`判断（需要分区域考虑了）是否隐藏，对当前显示的和隐藏的内容所应用的类是不同的比如显示的是长蓝色条，隐藏的是白色的条

所以在`components/taskbar.vue`的`computed`阶段就需要进行划分了，将不是`fixTaskBarComponent`的任务划分出来，这部分是需要用`order`排序的（这个保留与否有待思考，因为感觉不太美观）

只要不是`fixTaskBarComponent`的内容就直接根据`isHide`处理就好了
