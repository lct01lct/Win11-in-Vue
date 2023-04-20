# 主页重构计划

## 架构演变方向
>
> 主页应用注册方式变为自动注册，采取插件化注册方式，自动化注册

```javascript
{Object.keys(Applications).map((key, idx) => {
    var WinApp = Applications[key];
    return <WinApp key={idx} />;
})}

```

[√]组件应该伪挂载，在不需要出现的时候不应该被渲染，毫无疑问这会拖垮首屏渲染

[√]思路是要将所有的组件和tabBar做联动，当点击的时候控制对应的组件显现，突然觉得和FWF forum做的有点像 - 通过nomalize HOC实现
[] 重构ToolsBar
    - [√]组件最小化不应该进行隐藏，而是隐藏层级，因为频繁的触发display：none会引起性能问题
    - [√]组件隐藏需要考虑是否进行display：none，因为关闭后可能短时间内不会再次打开
    + 如何实现全局联动，单纯依靠对象的引用特性难以达成需求，如果依靠响应式那么如何将scheduler数据流向全局？
    + [X]如果采用props那就意味着需要对所有的组件进行改动，这显然违背开闭原则
    + [√]如果采用store方式可以实现跨组件间共享数据，但是组件过多，是否会引起性能负担、
    + [X]如果采用依赖注入的方式依然可以实现跨组件共享数据，同时可以确保所有组件都能够正常接收，因为他们同属于一个依赖链，但是性能负担较大，如果大规模组件存在，难以保证

[] 重构taskBar
    - []底部栏根据你的配置决定是否固定 通过 Scheduler - isShowTaskBar实现
    - []底部栏要联动桌面 通过HOC实现
[]taskBar还需要考虑当前打开的app是否是taskBar固定的，如果是固定的就原地打开即可，如果不是就末位打开，按照时间戳排序（UI层消化）
[]
[]
[]
[]
[]
[]

[√]ToolsBar联动componentConfig【pinia.components】实现层级切换
[]ToolsBar 要首要缓存下pinia中的目标uuid

组件强制使用forceUpdate不会同步更新pinia，因此可以考虑在toolbar获取pinia值，然后同步更改
更改方式可以使用uuid
在removeNode时通过hideBox传递来的uuid，更新pinia的目标数据
在ondbclick的时候通过componentConfig的uuid更新pinia目标数据
taskbar同步消费currentShowTaskbar，数据按照时间戳进行排序
desktop要消费scheduler.components直接消费pinia的components即可
做到多向联动性是系统互联的基础

---

继续演变
> 为什么要继续演变？
> 因为如果继续采用HOC方案，那么目标应用在开启的时候需要打开两次，这不是一个好的结果
> 那么如何做到组件统一管理，且只渲染一次呢？
> 我的思路是仍然保留scheduler方案，HOC方案也可以继续得以保留，因为我觉得以HOC方案做组件的管理要更加单一化细粒度，各HOC各司其职
> 那么就需要taskBar做出让步了，因此taskBar的渲染方案并不是继续采用HOC方案，而是自己渲染出一套icon来
> 由于在index中会向其传入component数组，因此可以拿到img、appName、包括uuid，
> 这样的话在点击的时候就可以利用uuid进行内容的显示了

如何在组件隐藏的时候能同步taskbar样式
想起来很简单，因为如果是正在显示的话，一定是存在于currentShowComponent中的，如此一来，我需要在taskBar中做出操作
如何操作？
