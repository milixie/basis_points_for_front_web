# 前端开发基础知识点总结

## 数据类型
### string
`var name = "bill"`
### number
`var n = 2`
### boolean
`var flag = true`
### array
`var arr = [2,4,1,5]`
```language
var cars = new Array();
cars[0] = "Volvo";
cars[1] = "Audi";
cars[2] = "BMW";
```
`var cars = new Array("Volvo", "Audi", "BWM");`

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
### null
清空变量 `cars = null`
### undefined
`var x;`

### 声明变量类型
```language
var name = new String;
var x = new Number;
var y = new Boolean;
var cars = new Array;
var p = new Object;
```

测试数据类型
`typeof xxx`

