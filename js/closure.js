var n = 10;  //全局变量
function f1(){
	console.log(n);
}
f1();

function f2 () {
	var m = 20;  //局部变量
}
// console.log(m);  //error

function f3 (){  //这就是个闭包
	var x = 2;
	function f4 (){
		console.log(x);
	}
	return f4();   //return后可以再外部读取到内部的值
}
f3();

function f5 () {
	var y = 8;
	addValue = function(){
		y++;
	}
	function f6(){
		console.log(y);
	}
	return f6;
}

var res = f5();
res();  //8
addValue();
res();  //9


var fname = "mili"
var info = {
	fname: "xie",
	getNameF: function() {
		return function(){
			return this.fname;
		}
	}
}
console.log(info.getNameF()());   //mili

var lname = "xie"
var info2 = {
	lname: "ha",
	getNameF: function() {
		var that = this;
		return function(){
			return that.lname;
		}
	}
}
console.log(info2.getNameF()());   //ha

var test_parent = function(){
	var name = "parent_name",
			parent_age = 40;
	var test_child = function(){
		var name = "child_name",
				child_age = 13;
		console.log(name,parent_age,child_age);
	} 
	test_child();
	console.log(name, parent_age);
	// console.log(child_age);  //error
}

test_parent();
// testResult();

//闭包的坑
for (var i = 0; i < 5; i ++){
	(function(index){
		setTimeout(function(){
			console.log(index);
		},5);
	})(i);
}

// 1.this：有对象直接指向对象
var myObject = {value: 100};
myObject.getValue = function () {
  console.log(this.value);  // 输出 100

  // 输出 { value: 100, getValue: [Function] }，
  // 其实就是 myObject 对象本身
  console.log(this);

  return this.value;
};

console.log(myObject.getValue()); // => 100

// 2.this：函数没有所属对象，则this指向全局
var myObject2 = {value2: 100};
myObject2.getValue2 = function () {
  var foo = function () {
    console.log(this.value2) // => undefined
    console.log(this);// 输出全局对象 global
  };

  foo();

  return this.value2;
};

console.log(myObject2.getValue2()); // => 100

// 3.this指向new构造函数
function Fun(name,value){
	this.name = name;
	this.value = value;
}
var f = new Fun('mili',24);
console.log(f.name, f.value);

// 4.this：apply，call，bind绑定：指向绑定的对象
var obj3 = {
	value4: 5
}
var foo = function(){
	console.log(this,this.value4);
}
foo(); //全局this, undefined
foo.apply(obj3);   //{value4: 5} 5
foo.call(obj3);   //{value4: 5} 5
var newFoo = foo.bind(obj3);
newFoo();  //{value4:5} 5


//经典面试题：作用域与闭包
// 1使用this指向
// function onMyLoad() {
// 	var clos = document.getElementById('closure-wrap');
// 	var arr = clos.children;
// 	for (var i = 0; i < arr.length; i ++ ){
// 		arr[i].index = i;
// 		arr[i].onclick = function(){
// 			alert(this.index);
// 		}
// 	}
// }
// onMyLoad()

//2:使用函数闭包
// function onMyLoad() {
// 	var clos = document.getElementById('closure-wrap');
// 	var arr = clos.children;
// 	for (var i = 0; i < arr.length; i ++ ){
// 		(function(index){
// 			arr[index].onclick = function(){
// 				alert(index);
// 			}
// 	})(i);
// 	}
// }
// onMyLoad()

// 3.使用匿名函数
function onMyLoad() {
	var clos = document.getElementById('closure-wrap');
	var arr = clos.children;
	for (var i = 0; i < arr.length; i ++ ){
		arr[i].onclick = (function(index){
			return function(){
				alert(index);
			}
		})(i);
	}
}
onMyLoad()
