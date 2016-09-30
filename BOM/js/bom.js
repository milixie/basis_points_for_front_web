window.onload = function(){
	var windowSize = document.getElementById('window-size'),
			w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
			h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	windowSize.innerHTML = '浏览器宽度：' + w + 'px<br/>浏览器高度：' + h + 'px';

	function open(){
		window.open('http://www.baidu.com','_blank');
	}

	function close(){
		window.close();
	}

	document.getElementById('open-window').onclick = open;
	document.getElementById('close-window').onclick = close;

	var oMoveTo = document.getElementById('move-to'),
			open2 = document.getElementById('open-window-2');
	function openSmall(){
		mywindow = window.open('', '', 'width = 200, height = 100');
	}
	function moveWindow(){
		mywindow.moveTo(500,100);
		mywindow.focus();
	}

	open2.onclick = openSmall;
	oMoveTo.onclick = moveWindow;

	document.getElementById('screen-size').innerHTML = '可用的屏幕宽度' + screen.availWidth +'<br>可用的屏幕高度' + screen.availHeight;

	document.getElementById('location').innerHTML = 
		'location: ' + window.location + '<br>' + 
		'location.host: ' + window.location.host + '<br>' + 
		'location.hash: ' + window.location.hash + '<br>' + 
		'location.hostname: ' + window.location.hostname + '<br>' + 
		'location.href: ' + window.location.href + '<br>' + 
		'location.origin: ' + window.location.origin + '<br>' + 
		'location.port: ' + window.location.port + '<br>' + 
		'location.protocal: ' + window.location.protocal + '<br>' + 
		'location.search: ' + window.location.search + '<br>';

	var oHistory = document.getElementById('history'),
			oHistoryBtns = oHistory.getElementsByTagName('button');
	oHistory.innerHTML +=
		'history' + eval(window.history) + '<br>';

	oHistoryBtns[0].onclick = function(){window.history.back()};
	oHistoryBtns[1].onclick =function(){ window.history.forward()};

	var oNavigator = document.getElementById('navigator');
	var txtNavigator = "<p>浏览器代号: " + navigator.appCodeName + "</p>" 
										+ "<p>浏览器名称: " + navigator.appName + "</p>" 
										+ "<p>浏览器版本: " + navigator.appVersion + "</p>" 
										+ "<p>启用Cookies: " + navigator.cookieEnabled + "</p>" 
										+ "<p>硬件平台: " + navigator.platform + "</p>" 
										+ "<p>用户代理: " + navigator.userAgent + "</p>" 
										+ "<p>用户代理语言: " + navigator.systemLanguage + "</p>"; 
	oNavigator.innerHTML += txtNavigator;

	var oConfirm = document.getElementById('confirm');
	oConfirm.onclick = function(){
		window.confirm('请确认一下吧')
	}

	var oPrompt = document.getElementById('prompt'),
			oPromptBtn = oPrompt.getElementsByTagName('button')[0],
			oPromptP = oPrompt.getElementsByTagName('p')[0];

	oPromptBtn.onclick = function(){
		var name = prompt('请输入您的名字：');
		if (name != null && name != '') {
			oPromptP.innerHTML += name;
		}
	}

	var oSetInterval = document.getElementById('set-interval'),
			oShowInterval = document.getElementById('show-interval'),
			oSetIntervalBtn = oSetInterval.getElementsByTagName('button')[0];
	var oInterval;
	oInterval = setInterval(function(){
		oShowInterval.innerHTML += '<p>setInterval的用法，每隔2s函数运行一次</p>'
	},2000);

	oSetIntervalBtn.onclick = function(){
		clearInterval(oInterval);
	}

}