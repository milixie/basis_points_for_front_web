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

GetInfo.prototype = {
	age: '18'
}
GetInfo.prototype.age = 16;   //修改年龄

var info = new GetInfo('mili', 'Xie', 4, '人要活得简单快乐！');
document.getElementById('constructor-wrap').innerHTML += 
	'<p>输出全名：' + info.firstname  + ' ' + info.lastname + '</p>' + 
	'<p>年级：' + info.grade + '</p>' + 
	'<p>年龄：' + info.age + '</p>' + 
	'<p>类型：' + info.species + '</p>' + 
	'<p>' + info.logo() + '</p>';

