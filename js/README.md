# 构造函数
## 构造函数的继承
1.使用`apply(this, arguments)`
```language
function Person () {
	this.species = '火星人';
}
function GetInfo (firstname, lastname, grade, word) {
	Person.apply(this, arguments);   //继承Person构造函数
	this.firstname = firstname;
	this.lastname = lastname;
	this.grade = grade;
	this.logo = function(){
		return ('我的名言是：' + word);
	}
}
```
2.使用`prototype`模式
```language
GetInfo.prototype = new Person();  //继承构造函数Person

GetInfo.prototype.constructor = GetInfo;  //指向它的构造函数,如果没有的话下面的info会指向Person构造函数

```

3.使用直接继承`prototype`
```language
function School(){}
School.prototype.name = "山东财经大学";

GetInfo.prototype = School.prototype;  //使用直接继承prototype

GetInfo.prototype.constructor = GetInfo;  //指向它的构造函数,如果没有的话下面的info会指向Person构造函数

```

4.使用空对象作为中介
```language
var F = function(){}
F.prototype = School.prototype;

GetInfo.prototype = new F();  //4.使用空对象作为中介

GetInfo.prototype.constructor = GetInfo;  //指向它的构造函数,如果没有的话下面的info会指向Person构造函数

```
将其封装成函数
```language
//封装成函数
function extend (Child, Parent) {
	var F = function(){}
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.uber = Parent.prototype;  //为子对象设置一个uber属性，这个属性直接指向父元素的prototype属性，这等于在子对象上打开一条通道，可以直接调用父对象的方法。这一行放在这里，只是为了实现继承的完备性，纯属备用性质。
}

extend(GetInfo, School);
```

5.使用拷贝继承
```
function extend2 (Child, Parent) {
	var p = Parent.prototype;
	var c = Child.prototype;
	for (var i in p) {
		c[i] = p[i];
	}
	c.uber = p;
}

extend2(GetInfo, School);
```

## 非构造函数的继承

```

//非构造函数的继承

var Color = {
	color: '白色'
}

// var Dog = {
// 	dogType: '獒犬'
// }

//要做到两个普通对象之间继承，即要让獒犬是白色
// 方法一：可以使用一个object的函数
//把子对象的prototype属性，指向父对象，从而使得子对象与父对象连在一起
function object(obj) {
	function F() {}
	F.prototype = obj;
	return new F();
}
//使用的时候，第一步先在父对象的基础上，生成子对象：
var Dog = object(Color);
//然后，再加上子对象本身的属性
Dog.dogType = '獒犬';

console.log(Dog.color);  //白色
// 方法二：浅拷贝

function extendCopy (p) {
	var c = {};
	for (var i in p) {
		c[i] = p[i];
	}
	c.uber = p;
	return c;
}

var Cat = extendCopy(Color);

Cat.catType = '波斯猫';

console.log(Cat.color);

Color.filter = ['0.4', '0.6', '0.9'];

var Duck = extendCopy(Color);

Duck.filter.push('0.8');

console.log(Duck.filter);    //["0.4", "0.6", "0.9", "0.8"]
console.log(Color.filter);   //["0.4", "0.6", "0.9", "0.8"]

//方法三：深拷贝
function deepCopy (p, c) {
	var c = c || {};
	for(var i in p) {
		if (typeof p[i] === 'object') {
			c[i] = (p[i].constructor === Array) ? [] : {};
			deepCopy(p[i], c[i]);
		} else {
			c[i] = p[i];
		}
	}
	return c;
}

var Pig = deepCopy(Color);

Pig.filter.push('0.22');

console.log(Color.filter, Pig.filter);
```


# 闭包
理解全局变量和局部变量
函数里面套函数，里面的函数可以调用外面函数的所有变量，但是外面函数不可以调用里面的局部变量，可以使用return的方法将函数内部的值返回

*闭包的作用：1.可以读取函数内部的变量，2.让这些变量的值始终保持在内存中*
```language
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

```

注意点：
1.闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页性能问题，在IE中可能会导致内存泄漏，解决方法就是在退出函数之前，将不使用的局部变量全部删除
2.闭包会在父函数外部，改变父函数内部变量的值，在使用的时候不要随便去改变内部变量的值

**闭包的坑**
```language
for (var i = 0; i < 5; i ++ ) {
	setTimeout(function(){
		console.log(i);
	}, 5);
}
```
这样输的结果为5个5
解决方法：
```language
for(var i = 0; i < 5; i ++) {
	(function(index){
		setTimeout(function(){
			console.log(index)
		},5)
	})(i);
}
```
输出的结果是0,1,2,3,4

### this
- 有对象就指向调用对象
- 没调用对象就指向全局对象
- 用new构造就指向新对象
- 通过apply或者call或者bind来改变this的所指
1.有对象
```language
var obj = {
	value: 100
}
obj.getValue = function(){
	console.log(this.value); //100
	console.log(this);  //obj本身
	return this.value;
}

console.log(obj.getValue());  //100
```
2.没有对象
```language
var obj = {
	value : 100
}
obj.getValue = function(){
	var f = function(){
		console.log(this.value); //undefined
		console.log(this);  //全局
	}
	f();
	return this.value;
}
console.log(obj.getValue());  //100
```
3.构造函数中的this: 指向新对象
```language
function Fun(name,value){
	this.name = name;
	this.value = value;
}
var f = new Fun('mili',24);
console.log(f());
```
4.this：apply，call，bind绑定：指向绑定的对象
```
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
```

经典面试题：作用域与闭包
1使用this指向
```
function onMyLoad() {
	var clos = document.getElementById('closure-wrap');
	var arr = clos.children;
	for (var i = 0; i < arr.length; i ++ ){
		arr[i].index = i;
		arr[i].onclick = function(){
			alert(this.index);
		}
	}
}
onMyLoad()
```

2:使用函数闭包
```
function onMyLoad() {
	var clos = document.getElementById('closure-wrap');
	var arr = clos.children;
	for (var i = 0; i < arr.length; i ++ ){
		(function(index){
			arr[index].onclick = function(){
				alert(index);
			}
	})(i);
	}
}
onMyLoad()
```

// 3.使用匿名函数
```
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
```

更多解决方法：
[https://segmentfault.com/a/1190000003818163](http://segmentfault.com/a/1190000003818163)

# OOP，面向对象编程
OOP方法论：
继承，封装，多态，抽象

# 原型链
### 继承：基于原型的继承
![http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/1.png](http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/1.png)

![http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/2.png](http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/2.png)

```language
function Person(name, age, eyes){
	this.name = name;
	this.age = age;
	this.eyes = eyes;
}

Person.prototype.arm_num = 2;
Person.prototype.leg_num = 2;

Person.prototype.walk = function(){
	console.log(this.name + ' is walking...');
}

Person.prototype.say = function(){
	console.log(this.name + ' is saying hi to everyone ');
}

Person.prototype.hi = function(){
	console.log(this.name + ' is saying hi to everyone and his/her age is ' + this.age);
}

function Student(name, age, eyes, grade){
	this.grade = grade;
	// Person.bind(this, name, age);
	Person.call(this, name, age, eyes);
	//继承Person中定义的一些对象值
}

Student.prototype = Object.create(Person.prototype);
//如果直接使用Student.prototype = Person.prototype的话，会直接修改掉Person，所以需要使用Object.create()
Student.prototype.constructor = Student;

Student.prototype.hi = function(){
	console.log(this.name + ' is saying hi to everyone and his/her age is ' + this.age + ', and he/her is in ' + this.grade + '. His eyes are ' + this.eyes);
}
// 这里的hi函数会覆盖掉Person中的hi函数

Student.prototype.learn = function(subject){
	console.log(this.name + ' is saying hi to everyone and his/her age is ' + this.age + ', and he/her is in ' + this.grade + ' and he/her is learning ' + subject);
}

var st1 = new Student('Tom', 16, 'black', '286 classroom');
st1.say = function(){
	console.log(this.name + ' is saying new class with her/his firends');
}
st1.eyes = 'blue';
st1.hi();
st1.walk();
st1.say();
st1.learn('English');
```
![http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/3.png](http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/3.png)

bosn的原型是Student.prototype

改变prototype

![http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/4.png](http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/4.png)

Student.prototype.x = 1;  //x的值被修改或者是新增了x的属性值，起到了效果
Student.prototype = {y : 2}  //直接修改prototype属性的话是没有任何效果的，因为bosn已经指向了原先的Student

内置构造器的prototype
![http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/5.png](http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/5.png)
```language
Object.prototype.x = 1;
//相当于给终端的Object增加了一个x属性值
//遍历的时候会遍历出来
//使用defineProperty去间接设置，使得对象属性不可枚举，不可配置，遍历的时候不会遍历出来
```

创建对象-new/原型链
![http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/6.png](http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/6.png)
```language
typeof obj.toString  //是查找的Object.prototype
'z' in obj;  //true 'z'在obj的本身对象或者是原型上，所以必然返回的是true
obj.hasOwnProperty('z');  //false  判断'z'是否是在obj本身的对象上，使用的就是hasOwnProperty()
```
#### 实现继承的方式
```
1.Student.prototype = Person.prototype;
2.Student.prototype = new Person()
3.Student.prototype = Object.create(Person.prototype)
if (!Object.create) {
	Object.create = function(proto){
		function F(){}
		F.prototype = proto;
		return new F;
	}
}

```
#### instanceof
```
obj instanceof fun   //判断fun是否是obj的原型链上的原型
```
![http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/7.png](http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/7.png)






















