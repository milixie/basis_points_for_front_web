# JavaScript实现前端路由

以hash形式为例，当URL的hash发生变化时，触发hashchange注册的回调

第一种：
```
	(function(){
		function Router(){}
		Router.prototype.route = function(path, callback){
			var url = location.hash.slice(1) || '/';
			//刷新时的处理
			window.addEventListener('load', function(){
				if (url == path) {
					callback&&callback();
				}
			}, false);

			//hash变化时的处理
			window.addEventListener('hashchange', function(){
				url = location.hash.slice(1) || '/';
				if (url == path) {
					callback&&callback();
				}
			}, false);
		}

		window.Router = new Router();
	})();
```
第二种：
```
	(function(){

		function Router(){
			this.routes = {};
			this.currentUrl = '';
		}

		Router.prototype.route = function(path, callback){
			this.routes[path] = callback || function(){};
		};

		Router.prototype.refresh = function(){
			this.currentUrl = location.hash.slice(1) || '/';
			this.routes[this.currentUrl]();
		}

		Router.prototype.init = function(){
			window.addEventListener('load', this.refresh.bind(this), false);
			window.addEventListener('hashchange', this.refresh.bind(this), false);
		}

		window.Router = new Router();
		window.Router.init();
	})();
```
router实现方式:
```

	var content = document.querySelectorAll('.content');
	function loadContent(txt, bgColor) {
		content[0].innerHTML = txt;
		document.getElementsByTagName('div')[0].style.backgroundColor = bgColor;
	}

	Router.route('/', function(){
		loadContent('This is home page!', 'red');
	});

	Router.route('/info', function(){
		loadContent('This is information page!', 'blue');
	});

	Router.route('/signIn', function(){
		loadContent('This is sign in page!', 'green');
	});

	Router.route('/signUp', function(){
		loadContent('This is sign up page!', 'yellow');
	});

	Router.route('/address', function(){
		loadContent('This is address page', 'lightblue');
	});

	Router.route('/contact', function(){
		loadContent('This is contact us page', '#f40')
	});

```
