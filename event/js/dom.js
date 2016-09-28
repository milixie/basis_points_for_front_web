window.onload = function(){
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

	//默认的冒泡的方式：
	var testDiv = document.getElementById('event-test'),
			testP = testDiv.getElementsByTagName('p')[0],
			testSpan = testP.getElementsByTagName('span')[0];

	testDiv.addEventListener('click', function(){
		alert('click div');
	});
	testP.addEventListener('click',function(){
		alert('click p');
	});
	testSpan.addEventListener('click',function(){
		alert('click span');
	});
	//result: click span -> click p -> click div

	//默认的捕获的方式：
	var testDivTrue = document.getElementById('event-test-true'),
			testPTrue = testDivTrue.getElementsByTagName('p')[0],
			testSpanTrue = testPTrue.getElementsByTagName('span')[0];

	testDivTrue.addEventListener('click', function(){
		alert('click div');
	},true);
	testPTrue.addEventListener('click',function(){
		alert('click p');
	},true);
	testSpanTrue.addEventListener('click',function(){
		alert('click span');
	},true);
	//result: click div -> click p -> click span

	//跨瀏覽器
	var a = document.getElementById('attach-event');
	var reColor = a.style.backgroundColor;

	function changeBg(ele){
		ele.style.backgroundColor = "red";
	}
	function reChangeBg(ele){
		ele.style.backgroundColor = 'blue';
	}
	if (a.addEventListener) {   //>IE8
		a.addEventListener('mouseover', function(){
			changeBg(a)
		});
		a.addEventListener('mouseout', function(){
			reChangeBg(a)
		});
	} else if (x.attachEvent) {   //<=IE8
		x.attachEvent('onmouseover', function(){
			changeBg(a)
		});
		x.attachEvent('onmouseout', function(){
			reChangeBg(a)
		});
	}

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

	function change(ele, flag) {
		if (flag) {
			ele.style.backgroundColor = 'green';
		} else {
			ele.style.backgroundColor = 'blue';
		}
	}

	var hand = document.getElementById('handler-test'),
			handBtns = hand.getElementsByTagName('button');

	function rand(){
		hand.innerHTML = '<button>add</button><button>reomve</button><p>完整的解决浏览器兼容性问题</p>' + Math.random();
	}

	eventUtil.addHandler(hand, 'mousemove', rand);
	eventUtil.removeHandler(hand, 'mousemout', rand);
}