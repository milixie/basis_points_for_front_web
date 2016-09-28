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

	var oDelegate = $('.delegate-jquery'),
			oUnBtn = $('.un-delegate');

	//方法一：on()/off()
	/*oDelegate.on('click', 'li', function(e){
		e = e || window.event;
		console.log(e.target);
	});
	oUnBtn.on('click', function(){
		oDelegate.off('click', 'li');
	})*/
	//方法二：delegate()/undelegate()
	oDelegate.delegate('li', 'click', function(e){
		e = e || window.event;
		console.log(e.target);
	});
	oUnBtn.on('click',function(){
		oDelegate.undelegate('li', 'click');
	})

	//方法三(勉强可以实现，但是不适合)：bind()/unbind()
	/*oDelegate.bind('click','li',function(e){
		e = e || window.e;
		if (e.target.nodeName.toLowerCase() == 'li'){
			console.log(e.target);
		}
	})
	oUnBtn.on('click', function(){
		oDelegate.unbind();
	})*/

}