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
