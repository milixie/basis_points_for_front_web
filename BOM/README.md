# BOM浏览器对象模型

- window尺寸
- window方法

### window尺寸
```
//普通浏览器
window.innerWidth
window.innerHeight
//IE5-8
document.documentElement.clientWidth
document.documentElement.clientHeight
or
document.body.clientWidth
document.body.clientHeight
```
```
//兼容性
var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
```

### window方法
```
window.open()
window.close()
window.moveTo()
window.resizeTo()
```