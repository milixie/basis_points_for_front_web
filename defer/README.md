- 异步加载

- 性能优化

- seo前端优化

# 异步加载

能让脚本延迟和异步执行的两个属性：defer and async

## defer
该属性使得浏览器能延迟脚本的执行，等文档完成解析后再按照他们在文档中出现的顺序再去下载解析，defer属性的script类似于将script放在body中

defer = true:延迟加载脚本，在文档完成解析完成开始执行，并且在DOMContentLoaded事件之前执行


## async
HTML5中新增的属性，作用是让脚本能异步加载

async = true: 异步加载脚本，下载完毕后再执行，在window的load事件之前执行完成

### 注意：

- 使用defer属性，最好是外部的script
- 使用defer、async的脚本禁止使用document.write()方法
- 当脚本尝试访问的样式属性可能尚未加载的样式表示，浏览器会禁止脚本的执行等待样式表加载完成，这等于样式表阻塞了脚本的执行，所以使用defer、async的脚本最好不要请求样式信息

## 其他异步加载js的方法

- 使用在dom中创建script标签(缺点是执行阶段会阻止也没渲染，延长了window.onload的时间)
```
function delayJs(src){
	var objScript = document.createElement('script');
	objScript.setAttribute('src', src);
	objScript.setAttribute('type', 'text/javascript');
	document.body.appendChild(objScript);
	return objScript;
}
```

- js异步下载+执行方案(不可以使用document.write()方法)
```
function loadJs(src, success) {
	var ele = delayJs(src);
	if ((navigator.userAgent.indexOf('MSIE') == -1) ? flase: true) {   //IE浏览器捕捉不到script.onload事件，需要借助script.onreadystatechange
		ele.onreadystatechange = function(){
			if (/loaded|complete/test(this.readyState)){
				success()
			}
		};
	} else {
		ele.onload = function(){
			success();
		}
	}
	ele.onerror = function(){}
}
```

- 通过ajax获取js内容，然后eval执行
```
var xhrObj = getXHRObject();
xhrObj.onreadystatechange = function(){
	if (xhrObj.readyState != 4)
		return;
	eval( xhrObj.responseText);
}
xhrObj.open('GET', 'a.js', true);
xhrObj.send('');
```

- 通过创建iframe，创建并插入iframe元素
```
var oIframe = document.createElement('iframe');
document.body.appendChild(oIframe);
var doc = oIframe.contentWindow.document;
doc.open().write('<body onload = "insertJS()">');
doc.close();
//存在跨域问题
```

# 性能优化

- 减少http请求

- 减少重排reflow和重绘repaint

- 使用json格式

- 高效使用HTML和css

-使用CDN加速，即内容分发网络

- 将css放到外部文件中，css放在head里，js放在尾部body中

- 压缩js，css，img（使用图片sprite技术）

- 注意控制cookie大小


## 减少http请求
1.使用合并图片、合并js、合并css的方法
2.图片较多的可以使用lazyload等技术

## 减少重排和重绘

重排：就是dom结构位置发生了变化，例如改变浏览器窗口大小，文字大小，内容改变，style属性变化等等

重绘：一个元素外观被改变了，但是没有影响到布局，比如颜色值，outline属性等

- 减少对dom的操作，例如：对dom元素的查询和修改，查询时可使用局部变量，循环时在循环结束后一次性写入等等

## 高效使用HTML和css
尽量使用语义化标签，减少HTML层结构；使用css的时候尽量少层层嵌套

## 使用CDN加速，即内容分发网络
使用缓存服务器，请求的时候直接请求离的比较近的缓存服务器，这样可以减少网络流量，负载，响应时间等等

# SEO前端优化

seo：搜索引擎优化，利用搜索引擎的搜索规则来提高网站在有关搜索引擎内的排名

1.设置title/meta标签
```
<title>mili</title>
<meta name="keywords" content="mili，前端，开发工程师，大学生，公司员工">
<meta name="description" content="https://github.com/milixie是mili的github账号，mili是前端开发工程师">
```

2.给img添加替代文本alt以及a标签使用`rel="nofollow"`使用title属性来告诉搜索引擎图片的内容
```
<a href="xxx" rel="nofollow" title="图片是mili开发者的主页博客logo图"><img src="logo.png" alt="mili主页logo"></a>
```

3.页面中有表格的时候，使用定义表格描述caption
```
<table>
	<caption>mili home page</caption>
	<tr>...</tr>
</table>
```

4.标题元素使用h1-h4来定义

5.去设置一个云标签（一个存放关键词的页面，类似于导航菜单）

6.给自己的网站做一个sitemap或者rss订阅

7.控制页面大小字100k以内

8.使用`b`/`i`/`strong`/`em`，`ul ol li`标签增强语义，可以多使用h5中的语义化标签

9.重要内容不要使用js、iframe、flash输出到页面中

10.使用robot.txt文件

11.控制外链个数，一个页面中的链接数不可以太少，并且最好不要超过100个

12.布局SEO：使得前端页面结构清晰，扁平化结构，代码不冗余；并且整个网站的目录结构也要扁平化，目录分类

13.导航SEO优化，（导航出现在头部，底部），面包屑导航

14.重要的HTML内容放在最前面，小蜘蛛会先抓取前面的代码

15.最好不要使用`display:none`，因为小蜘蛛会过滤掉它里面的内容


