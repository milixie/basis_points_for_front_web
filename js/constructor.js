function Person () {
	this.species = '火星人';
	this.age = '18';
}

function School(){}
School.prototype.schoolName = "山东财经大学";

// var F = function(){}
// F.prototype = School.prototype;

function GetInfo (firstname, lastname, grade, word) {
	// Person.apply(this, arguments);   //1.继承Person构造函数
	this.firstname = firstname;
	this.lastname = lastname;
	this.grade = grade;
	this.logo = function(){
		return ('我的名言是：' + word);
	}
}

// GetInfo.prototype = {
// 	age: '18'
// }
// GetInfo.prototype.age = 16;   //修改年龄

// GetInfo.prototype = new Person();  //2.继承构造函数Person

// GetInfo.prototype = School.prototype;  //3.使用直接继承prototype

// GetInfo.prototype = new F();  //4.使用空对象作为中介

// GetInfo.prototype.constructor = GetInfo;  //指向它的构造函数,如果没有的话下面的info会指向Person构造函数

//封装成函数
// function extend (Child, Parent) {
// 	var F = function(){}
// 	F.prototype = Parent.prototype;
// 	Child.prototype = new F();
// 	Child.prototype.constructor = Child;
// 	Child.uber = Parent.prototype;  //为子对象设置一个uber属性，这个属性直接指向父元素的prototype属性，这等于在子对象上打开一条通道，可以直接调用父对象的方法。这一行放在这里，只是为了实现继承的完备性，纯属备用性质。
// }

// extend(GetInfo, School);

//5.使用拷贝继承
function extend2 (Child, Parent) {
	var p = Parent.prototype;
	var c = Child.prototype;
	for (var i in p) {
		c[i] = p[i];
	}
	c.uber = p;
}

extend2(GetInfo, School);


var info = new GetInfo('mili', 'Xie', 4, '人要活得简单快乐！');
console.log(info.constructor);
document.getElementById('constructor-wrap').innerHTML += 
	'<p>输出全名：' + info.firstname  + ' ' + info.lastname + '</p>' + 
	'<p>年级：' + info.grade + '</p>' + 
	// '<p>年龄：' + info.age + '</p>' + 
	// '<p>类型：' + info.species + '</p>' + 
	'<p>学校：' + info.schoolName + '</p>' + 
	'<p>' + info.logo() + '</p>';


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



