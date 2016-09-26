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
}

Student.prototype = Object.create(Person.prototype);
//如果直接使用Student.prototype = Person.prototype的话，会直接修改掉Person，所以需要使用Object.create()
Student.prototype.constructor = Student;

Student.prototype.hi = function(){
	console.log(this.name + ' is saying hi to everyone and his/her age is ' + this.age + ', and he/her is in ' + this.grade + '. His eyes are ' + this.eyes);
}

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

//获取st1的原型
var st1_proto = Object.getPrototypeOf(st1);
console.log('st1的原型是：' + st1_proto);

console.log(Object.getPrototypeOf(st1) === Student.prototype); //true











