//object exercise
window.onload = function(){
	var obj = {
		name: 'Tom',
		id: 2232,
		age: 18,
		sex: 'man',
		from: 'china'
	}
	var output = '<br/>姓名：' + obj.name + '<br/>' 
								+ '编号：' + obj.id + '<br/>'
								+ '年龄：' + obj.age + '<br/>'
								+ '性别：' + obj.sex + '<br/>'
								+ '国籍：' + obj.from;
	document.getElementById('obj-wrap').innerHTML += '<hr/>' + output;
	var object = [{
		name: 'Tom',
		id: 2232,
		age: 18,
		sex: 'man',
		from: 'china'
	},{
		name: 'Tina',
		id: 2322,
		age: 14,
		sex: 'woman',
		from: 'china'
	},{
		name: 'Mili',
		id: 1232,
		age: 18,
		sex: 'woman',
		from: 'china'
	}]
	for(var i = 0; i < object.length; i++){
		var temp = '<br/>姓名：' + object[i].name + '<br/>' 
								+ '编号：' + object[i].id + '<br/>'
								+ '年龄：' + object[i].age + '<br/>'
								+ '性别：' + object[i].sex + '<br/>'
								+ '国籍：' + object[i].from;
		document.getElementById('obj-wrap').innerHTML += '<hr/>' + temp;
	}

	var object2 = [{
		name: 'HaHa',
		id: 2132,
		age: 18,
		sex: 'man',
		from: 'England',
		fullname: function(){
			return this.name + ' Muss';
		}
	},{
		name: 'Tina',
		id: 2322,
		age: 14,
		sex: 'woman',
		from: 'china',
		fullname: function(){
			return this.name + ' Muss';
		}
	},{
		name: 'Mili',
		id: 1232,
		age: 18,
		sex: 'woman',
		from: 'china',
		fullname: function(){
			return this.name + ' Muss';
		}
	}]

	function writeEle(obj){
		var t = '<br/>姓名：' + obj.name + '<br/>' 
						+ '编号：' + obj.id + '<br/>'
						+ '年龄：' + obj.age + '<br/>'
						+ '性别：' + obj.sex + '<br/>'
						+ '国籍：' + obj.from + '<br/>'
						+ '全名：' + obj.fullname();
		document.getElementById('obj-wrap').innerHTML += '<hr/>' + t;
	}
	object2.forEach(writeEle);


}