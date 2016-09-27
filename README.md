# 前端开发基础知识点总结

[TOC]

## 数据类型
### string
`var name = "bill"`

### number
`var n = 2`

### boolean
`var flag = true`

### null
清空变量 `cars = null`

### undefined
`var x;`

### object
`var obj = document.getElementById("wrap")`
```language
var obj = {
	firstname: "Bill",
	lastname:　"Gates",
	id : "333"
}
name = obj.lastname;
name = obj["lastname"];
```

### array(也是一种object对象)
`var arr = [2,4,1,5]`
```language
var cars = new Array();
cars[0] = "Volvo";
cars[1] = "Audi";
cars[2] = "BMW";
```
`var cars = new Array("Volvo", "Audi", "BWM");`

**5种原始数据类型是：Number/string/boolean/null/undefined**

**一种object对象类型：Function Array Date**



### 声明变量类型
```language
var name = new String;
var x = new Number;
var y = new Boolean;
var cars = new Array;
var p = new Object;
```

### 测试数据类型

1.typeof  适合基本类型以及function检测，遇到null失效
```
typeof xxx
typeof NaN   //number
typeof null  //object
```
2.instanceof：适合自定义对象，可以用来检测原生对象，在不同的iframe和window间检测时失效
`obj instanceof Object(Function必须是函数对象)   //判断对象obj是否在原型链上`

3.[[Class]]
通过{}.toString拿到，社和内置对象和基元类型，遇到null和undefined失效
```
Object.prototype.toString.apply(xxx)
Object.prototype.toString.apply(function(){})   //[object Function]
```

`constructor`
`duck type`

### 隐形数据转换
```
num - 0   //转换成数字number
num + ""   //转换成字符串string
```

## 表达式
1.原始表达式
```
3.14 "test"   //常量，直接量
null, this, true  //关键字
i,j,m,n   //变量
10 * 3   //复合表达式
```
2.初始化表达式
`[1,2]   //equal  new Array(1,2)`
`{x: 1, y:2}  //equal  obj = new Object();  obj.x = 1;  obj.y = 2`

3.函数表达式
`var f = function(){};  (function(){})()`

4.属性访问表达式
`obj.x   //访问对象属性`

5.调用表达式
`f()   //调用`

6.对象创建表达式
`new F(1,2);  new Object;`

## 运算符
### 1.加法运算符
```language
1+1   //2
true + true  // 2
'1' + '1'  // '11'
'1' + 1 // '11'
```
1.如果运算子是对象，先自动转成原始类型的值（即先执行该对象的`valueOf`方法，如果结果还不是原始类型的值，再执行`toString`方法；如果对象是Date实例，则先执行`toString`方法）。
2.两个运算子都是原始类型的值以后，只要有一个运算子是字符串，则两个运算子都转为字符串，执行字符串连接运算。
3.否则，两个运算子都转为数值，执行加法运算。
```language
'1' + {foo: 'bar'} // "1[object Object]"
'1' + 1 // "11"
'1' + true // "1true"  '1'+true.toString()
'1' + [1] // "11"  '1'+[1].toString()
```

#### 注意：字符串 + 数字 与 数字 + 字符串 计算结果可能不太一样，例如：
```language
'3' + 4 + 5  // '345'
3 + 4 + '5' //  '75'
```
加法运算符会将其他类型的值，自动转换为字符串，然后再执行连接运算
```language
[1, 2] + [3]
// "1,23"

// 等同于
String([1, 2]) + String([3])
// '1,2' + '3'
```
加法运算符一定有左右两个运算子，如果只有右边一个运算子，就是另一个运算符，叫做“数值运算符”。
```language
+ - 3 // 等同于 +(-3)
+ 1 + 2 // 等同于 +(1 + 2)
+ '1' // 1
```
加法运算符以外的其他算术运算符（减法，除法，乘法），都不会发生重载，他们的规则是：所有运算子一律为数值，再进行相应的数学运算
```language
1 - '2' // -1
1 * '2' // 2
1 / '2' // 0.5

var now = new Date();
typeof (now + 1) // "string"
typeof (now - 1) // "number"
```
### 2.算术运算符
九个算术运算符
```language
加法运算符（Addition）：x + y
减法运算符（Subtraction）： x - y
乘法运算符（Multiplication）： x * y
除法运算符（Division）：x / y
余数运算符（Remainder）：x % y
自增运算符（Increment）：++x 或者 x++
自减运算符（Decrement）：--x 或者 x--
数值运算符（Convert to number）： +x
负数值运算符（Negate）：-x
```

### 3.余数运算符
```language
12 % 7  // 5
-1 % 3   // -1
1 % -3   // 1
// 注意：运算结果的正负号由第一个运算子的正负号决定
```
为了得到正确的负数的余数值，需要先使用绝对值函数
```language
function isOdd (n) {
	return Math.abs(n % 2) === 1;
}
isOdd(-5);  // true
isOdd(-6);  // false
```
也可以用于浮点数的运算符
```language
9.6 % 6.5  //  3.0999999999999996
```

### 4.自增和自减运算符
```language
var x = 2;
x ++   // 2
x  // 3
x -- //3
x  //2
-- x // 1
x  //1
++ x //2
x  //2
```

### 5.数值运算符，负数运算符
数值运算符（+）同样使用加号，但是加法运算符是二元运算符，需要两个操作数，但是数值运算符是一元运算符，只需要一个操作数
数值运算符的作用在于==可以将任何值转化为数值（与Number（）函数的作用相同）==
```language
+true  //1
+[0] //0
+[9]  //9
+{name}  //NaN
```
负数值运算符（-），也同样具有将一个值转为数值的功能，只不过得到的值正负相反。连用两个负数值运算符，等同于数值运算符
```language
var x = 1;
-x // -1
-(-x) // 1
```

### 6.赋值运算符
常见的赋值运算符就是 = 
表达式 x = y 表示将 y 的值赋给x
复合赋值运算符
```language
x += y // 等同于 x = x + y
x -= y // 等同于 x = x - y
x *= y // 等同于 x = x * y
x /= y // 等同于 x = x / y
x %= y // 等同于 x = x % y
x >>= y // 等同于 x = x >> y
x <<= y // 等同于 x = x << y
x >>>= y // 等同于 x = x >>> y
x &= y // 等同于 x = x & y
x |= y // 等同于 x = x | y
x ^= y // 等同于 x = x ^ y
```

### 比较运算符
返回一个boolean值，表示是否满足比较条件
`2 > 1 //true`
```language
== 相等
=== 严格相等
!= 不相等
!== 严格不相等
< 小于
<= 小于或等于
> 大于
>= 大于或等于
```
算法：
> 1. 如果运算子是对象，先自动转成原始类型的值（即先执行该对象的valueOf方法，如果结果还不是原始类型的值，再执行toString方法）。
> 2. 如果两个运算子都是字符串，则按照字典顺序比较（实际上是比较Unicode码点）。
> 3. 否则，将两个运算子都转成数值，再进行比较。


```language
[2] > [1] // true
// 等同于 '[2]' > '[1]'

[2] > [11] // true
// 等同于 '[2]' > '[11]'

{x: 2} > {x: 1} // false
// 等同于 '[object Object]' > '[object Object]'
```


#### 原始值的比较：

```language
5 > '4' // true
// 等同于 5 > 4

true > false // true
// 等同于 1 > 0

2 > true // true
// 等同于 2 > 1
```
#### 字符串的比较：按照字典顺序进行比较
`'cat' > 'dog'  // false`
JavaScript引擎内部首先比较首字符的Unicode编号，如果相等，再比较第二个字符的Unicode编号，以此类推。
`'cat' > 'CAT'  //true'`
上面代码中，小写的c的Unicode编号（99）大于大写的C的Unicode编号（67），所以返回true
由于，JavaScript的所有字符都有Unicode编号，因此汉字也可以比较。
`'大' > '小' // false`
上面代码中，“大”的Unicode编号是22823，“小”是23567，因此返回false。

#### 严格相等运算符
`== && ===` 
比对规则：
严格`===`
1.不同类型的值直接返回false
```language
1 === '1'  //false
true === 'true'  //false
```
2.同一类的原始类型值
` 1 === 0×1  // true`
比较十进制1与十六进制的1，类型和值相同，返回true
*注意：NaN与任何值都不相等，包括自身*
`NaN === NaN   //false`
3.同一类型的复合类型值
两个复合类型（对象，数组，函数）的数据比较时，不是比较他们的值是否相等，而是比较他们是否指向同一个对象
```language
{} === {}  //false
[] === []   //false
(function (){} === function (){})  //false
```
**原因：对于复合类型的值，严格相等运算比较的是他们是否引用同一个内存地址**
如果两个变量引用同一个对象，则他们相等
```language
var a = {};
var b = a;
b === a //true
```
注意：对于两个对象的比较，严格相等运算符比较的是地址，而大于或小于运算符比较的是值
```language
new Date() > new Date()  //false  比较值
new Date() < new Date()  //false 比较值
new Date() === new Date()  //false 比较地址
```
undefined 和 null 与自身严格相等
```language
undefined === undefined //true
null === null // true
```

#### 相等运算符
比较不同类型的数据时，相等运算符先进行数据转换，在进行比较
1.原始类型的值，先转换成数值类型
```language
1 == true  //true
0 == false // true
'true' == true  //false
// Number('true') === Number(true)
// NaN === 1
'' == 0 //true
'' == false // true
'\n 12345 \t' == 12345 // true
```
2.对象与原始类型的值比较
```language
[1] == 1 // true
// 等同于 Number([1]) == 1

[1] == '1' // true
// 等同于 String([1]) == Number('1')

[1] == true // true
// 等同于 Number([1]) == Number(true)
```
3.undefined 和 null 与其他类型(object)的值比较时，结果都为false，他们互相比较时结果为true
```language
false == null // false
false == undefined // false

0 == null // false
0 == undefined // false

undefined == null // true
```

**比较规则：类型相同时直接比较，类型不同时先转换成相同类型再进行比较**

### 布尔运算符
```language
取反运算符：!
且运算符：&&
或运算符：||
三元运算符：?:
```
1.取反运算符
规则是，只有以下六个值取反后为true，其他都为false
```language
undefined
null
NaN
0
false
''   //注意这里是空字符串
```
取反运算符有自动转换Boolean值的作用，连续使用两次则可以转换类型
`!!(x)   //等于 Boolean(x)`
2.且运算符（&&）
运算规则：先看第一个，如果为true，则再看第二个,并且返回的是第二个运算子的值；如果为false，则直接返回第一个运算子的值，不再看第二个
```language
't' && '' // ''
't' && 'f' //'f'
'' && 'f' // ''
var x = 2;
(2 - 2) && (x += 3) // 0
x   //2
//并没有执行 x+= 3
true && 'foo' && '' && 4 && 'foo' && true  // ''
```
3.或运算符（||）
运算规则：如果第一个为true，则返回第一个运算子的值，不用看第二个，如果第一个为false，则返回第二个运算子的值
```language
't' || '' // "t"
't' || 'f' // "t"
'' || 'f' // "f"
'' || '' // ""
false || 0 || '' || 4 || 'foo' || true //4
```
4.三元条件运算符（?:）
运算规则：如果第一个表达式的布尔为true，则返回第二个值，否则，返回第三个值
`'x' ? 3:2 // 3`

#### 位运算符
用于对二进制位进行计算
```language
或运算（or）：符号为|，表示若两个二进制位都为0，则结果为0，否则为1。

与运算（and）：符号为&，表示若两个二进制位都为1，则结果为1，否则为0。

否运算（not）：符号为~，表示对一个二进制位取反。

异或运算（xor）：符号为^，表示若两个二进制位不相同，则结果为1，否则为0。

左移运算（left shift）：符号为<<，将一个二进制值向左移动指定位数，相当于乘以2的指定次方

右移运算（right shift）：符号为>>，将一个二进制值向右移动指定位数，相当于除以2的指定次方

带符号位的右移运算（zero filled right shift）：符号为>>>，详见下文解释。
```
**注意：位运算符只对整数起作用，如果一个运算子不是整数，则先自动转换为整数再执行运算**
对于number型
```language
0 | 3 //3
0 & 3 //0
3 | 5 //7
3 & 5 //1
-8.9 | 0 //-8
~3 // -4 (简单记忆：一个数与自身的取反值相加，等于-1)
~~3   //3
~~6.878 //6
7 << 2 // 28  相当于 7乘以2的2次方
7 >> 2  // 1 相当于 7除以2的2次方
```
对于其他类型：先调用Number函数
```language
// 以下例子相当于~Number('011')
~'011'  // -12
~'42 cats' // -1
~'0xcafebabe' // 889275713
~'deadbeef' // -1

// 以下例子相当于~~Number('011')
~~'011';        // 11
~~'42 cats';    // 0
~~'0xcafebabe'; // -889275714
~~'deadbeef';   // 0

~~[] // 0
~~NaN // 0
~~null // 0
```
异或运算：
两个的二进制值，相同为0，不同为1，最后得到的结果
```language
var a = 10;
var b = 99;

a ^= b, b ^= a, a ^= b;

a // 99
b // 10
```

#### 其他运算符
1.void
```language
void 0   //undefined
void(0) //undefined
void 4 + 7   // 等同于(void 4) + 7   NaN
```
void常用于a链接中，防止页面跳转

2.逗号运算符
用于对两个表达式求值，并返回后一个表达式的值
```language
'a', 'b' // "b"

var x = 0;
var y = (x++, 10);
x // 1
y // 10
```

3.delete运算符
```
var obj = {x: 2};
obj.x   //2
delete obj.x;
obj.x   //undefined
```

4.in运算符
```
window.x = 1;
'x' in window  //true
```

5.new运算符

6.this运算符

7.instanceof运算符

8.typeof运算符

优先级
![http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/8.png](http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/8.png)


## 语句
1.块语句，block
```
for(var i = 0; i < 7; i++){
	var str = 'he';
	console.log(str);
}
//**没有块级作用域:在这里i可以在外面访问到**
console.log(i);  // 8
```
2.声明语句：var
```
var a = 2;
var a = b = 3;   //equal var a = 3; b = 3;
function foo(){
	var a1 = b1 = 4;
}
foo();
console.log(a1,b1);  // undefined,4  a1是局部变量，b1是全局变量
```
3.try catch
```
try {
	throw 'text'
} catch (ex) {
	console.log(ex);  //text
} finally {   //肯定会执行
	console.log('pass')
}
//执行顺序：catch->try->finally
try{
	try{
		throw new Error('oops');
	}
	finally {
		console.log('finally');
	}
}
catch (ex) {
	console.error('outer')
}
//执行顺序：finally -> catch -> try
![http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/9.png](http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/9.png)

原图： <a href="http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/9.png">http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/9.png</a>

4.function
```
//函数声明
f()
function f(){}
//函数表达式
var fe = function(){}
```

5.for in
```
var arr = [1,23,3];
for (i in arr) {}
```
**
存在的问题：
1.顺序不确定
2.enumerable为false时不会出现
3.for in对象属性会受原型链的影响
**

6.switch
```
switch(a) {
	case 1: 
		console.log(1);
		// break;
	case 2:
		console.log(2);
	default:
		console.log(3);
}
//有break的话会停止执行后面的，如果没有则会继续往下执行

7.循环
```
while(x){}
do{}while(x)
for(var i = 0; i < 5;i ++){}
```
8.with:修改当前作用域（不建议使用）
```
with({x: 1}){}
with(document.forms[0]){
	console.log(name.value)
}
```

8.严格模式
```
'use strict'
```
- 不允许使用with
- 不允许未声明的变量被赋值
arguments[0]变为参数的静态副本
```
function (a) {
	arguments[0] = 10;
	console.log(a);
}(1);   // 10

function (a){
	'use strict';
	arguments[0] = 10;
	console.log(a);
}(1);   //1

function (a) {
	'use strict'
	arguments[0].x = 10;
	console.log(a.x);
}({x:1})  //10
```
- delete参数、函数名会报错；delete不可配置的属性会报错
- 对象字面量重复属性名报错
```
function(){
	'use strict'
	var obj = {x:2,x:1};
}   //报错
```
- 禁止八进制
`console.log(0123);   //报错`

- eval,arguments变为关键字，不能作为变量名，函数名
```
'use strict';
function eval(){}
//报错
```
- eval独立作用域
```
function(){
	'use strict';
	eval('var e = 2');
	console.log(e);
	//报错
}
```

![http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/10.png](http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/10.png)
原图：<a href="http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/10.png">http://7xj5et.com1.z0.glb.clouddn.com/github/img/prototype/10.png</a>







































