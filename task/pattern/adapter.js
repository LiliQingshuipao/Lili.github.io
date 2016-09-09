/*
	内容： 适配器模式
	作者： 黎蕾
*/

/*adapter的基本例子*/

/*原有的接口或函数*/
/*
	var adaptee = function(p1,p2,p3)
*/
/*我们需要适配的函数*/
/*
	var object = {
		str1: "xxx",
		str2: "XXXX",
		str3: "xxxx",
	}
*/
/*适配器*/
/*
	var adapter = function(o){
		adaptee = function(o.str1, o.str2, o.str3);
	}
*/

/*需要传入的参数*/
var car = {
	name: 'Ford',
	size: '45',
	height: '45', 
}
/*传入对象的函数*/
function wheel(name, size){
	alert("the size of "name + "'s wheel is " +size);
}
/*适配器*/
var CarAdapter = function(o){
	wheel(o.name, o.size);
}
