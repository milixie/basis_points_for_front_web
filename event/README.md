#事件

## 本章内容

- 理解事件流

- 使用事件处理程序

- 不同的事件类型

- 事件委托

- JSON/JSONP

一、事件流

事件流描述的是从页面中接受事件的顺序。

IE的事件流是事件冒泡流，而Netscape的事件流是事件捕获流

1、事件冒泡

事件冒泡，即事件最开始由最具体的元素(文档中嵌套层次最深的那个节点)接收，然后逐级向上转播至最不具体的节点(文档)。

2、事件捕获

事件捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点最后接收到事件。

二、事件处理程序

1、HTML事件处理程序
```
<div onclick="alert(1111)"></div>
<p onclick="display(this)"></p>
```

2、DOM0级事件处理程序
```
document.getElementById('wrap').onclick = function(){
	alert(111);
}
```

3、DOM2级事件处理程序

DOM2级事件定义了两个方法：用于处理指定和删除事件处理程序的操作：addEventListener()和removeEventListener()。它们都接收三个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。

4、IE事件处理程序

attachEvent()添加事件

detachEvent()删除事件

这两个方法接收相同的两个参数：事件处理程序名称与事件处理函数

5、跨浏览器的事件处理程序

```
//所有事件的兼容处理函数
	var eventUtil = {
		//添加句柄
		addHandler : function(ele, type, fun){
			if (ele.addEventListener) {
				ele.addEventListener(type, fun);
			} else if (ele.attachEvent) {
				ele.attachEvent('on' + type, fun);
			} else {
				ele['on' + type] = fun;
			}
		},
		//删除句柄
		removeHandler : function(ele, type, fun){
			if (ele.removeEventListener) {
				ele.removeEventListener(type, fun);
			} else if (ele.detachEvent) {
				ele.detachEvent('on' + type, fun);
			} else {
				ele['on' + type] = null;
			}
		},

		getEvent: function(event) {
			return event ? event : window.event;
		},
		//事件目标
		getEle: function(event) {
			event = event || window.event;
			return event.target || event.srcElement;
		},
		getType: function(event) {
			event = event || window.event;
			return event.type;
		},
		//阻止事件的默认行为
		preventDefault: function(event){
			event = event || window.event;
			if (event.preventDefault){
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
		},
		//阻止事件冒泡
		stopPropagtion: function(event){
			if (event.stopPropagtion){
				event.stopPropagtion();
			} else {
				event.cancelBubble = true;
			}
		}
	};
```

三、事件对象

事件对象event

1、DOM中的事件对象

(1)、type:获取事件类型

(2)、target：事件目标

(3)、stopPropagation() 阻止事件冒泡

(4)、preventDefault() 阻止事件的默认行为

2、IE中的事件对象

(1)、type:获取事件类型

(2)、srcElement：事件目标

(3)、cancelBubble=true阻止事件冒泡

(4)、returnValue=false阻止事件的默认行为


## 案例

`addEventListener()`方法

```language
element.addEventListener(event, function, useCapture);

event -> 'click','mouseover','mouseout','mouseevent',...

function -> 函数

useCapture -> true/false:true->事件使用捕获传递,false->使用默认的冒泡传递
```
使用普通的方式，没有封装
```
	var dom = document.getElementById('dom-wrap'),
			eventDom = document.getElementById('event-dom'),
			btns = eventDom.getElementsByTagName('button');

	function displayDate(){
		dom.innerHTML = parseInt(Math.random() * 100) + '<br/>' + Date();
	}

	btns[0].addEventListener('click',function(){
		dom.addEventListener('mousemove',displayDate);
	})	

	btns[1].addEventListener('click', function(){
		dom.removeEventListener('mousemove', displayDate);
	});
```
使用封装好的跨浏览器的函数
```
	var hand = document.getElementById('handler-test'),
			handBtns = hand.getElementsByTagName('button');

	function rand(){
		hand.innerHTML = '<button>add</button><button>reomve</button><p>完整的解决浏览器兼容性问题</p>' + Math.random();
	}

	eventUtil.addHandler(hand, 'mousemove', rand);
	eventUtil.removeHandler(hand, 'mousemout', rand);
```

# 事件委托
定义：允许我们不必为某些特定的节点添加事件监听器，而是将事件监听器添加到（这些节点的）某个parent节点上。事件监听器分析冒泡事件，去找到匹配的子节点元素，然后做出相应的事件响应

### 原生JavaScript：
```
window.onload = function(){
	var aHead = document.getElementById('home-head'),
			aLi = aHead.children;
	//DOM0级方式
	aHead.onclick = function(event){
		event = event || window.event;
		if (event.target.nodeName.toLowerCase() == 'li'){
			console.log(event.target.textContent);
		}
	}
	//DOM2级方式
	var aHead2 = document.getElementById('home-head-2'),
			aLi2 = aHead2.children;
	//DOM0级方式
	if (aHead2.addEventListener) {
		aHead2.addEventListener('click', function(event){
			for(var i = 0;i < aLi2.length; i++){
				if(event.target == aLi2[i]){
					alert(i+'//////');
				}
			}
		})
	} else if (aHead2.attachEvent) {
		aHead2.attachEvent('onclick', function(event){
			event = window.event;
			for(var i = 0;i < aLi2.length; i++){
				if (event.srcElement == aLi2[i]){
					alert(i + '???????????');
				}
			}
		})
	} else {
		aHead2.onclick = function(event){
			event = event || window.event;
			for(var i = 0;i < aLi2.length; i++){
				if (event.srcElement == aLi2[i]){
					alert(i + '????????');
				}
			}
		}
	}

}
```

### jQuery支持事件委托

- delegate() / undelegate()
```
oDelegate.delegate('li', 'click', function(e){
	e = e || window.event;
	console.log(e.target);
});
oUnBtn.on('click',function(){
	oDelegate.undelegate('li', 'click');
})
```
- on() / off()
```
oDelegate.on('click', 'li', function(e){
	e = e || window.event;
	console.log(e.target);
});
oUnBtn.on('click', function(){
	oDelegate.off('click', 'li');
})
```
- bind() / unbind()(勉强可以实现，但是不适合)

```
oDelegate.bind('click','li',function(e){
	e = e || window.e;
	if (e.target.nodeName.toLowerCase() == 'li'){
		console.log(e.target);
	}
})
oUnBtn.on('click', function(){
	oDelegate.unbind();
})
```

#JSON/JSONP

```
<div id="divCustomers"></div>
	<script>
		$.getJSON("http://www.runoob.com/try/ajax/jsonp.php?jsoncallback=?", function(data) {
			
			var html = '<ul>';
			for(var i = 0; i < data.length; i++){
				html += '<li>' + data[i] + '</li>';
			}
			html += '</ul>';
			
			$('#divCustomers').html(html); 
		});
	</script>
```