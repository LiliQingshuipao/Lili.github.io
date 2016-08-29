/*
	内容：观察者模式
	作者：黎蕾
*/
/*实现方式： 原型*/
/*实现事例：报纸订阅*/

/*报纸对象 里面的变量为订阅者的数组*/
function Paper = function(){
	this.customers = [];
}
/*报纸发送信息*/
Paper.prototype.sendPaper = function(data){
	for(var i in this.customers){
		this.customers[i].receive(data);
	}
}
/*定义订阅者对象*/
var Customer = function(o){
	this.name = o.name;
}
/*订阅者加入报纸数组*/
Customer.prototype.subscribe = function(p){
	var customers = p.customers;
	var issubs= false;
	for(var i in customers){
		if(customers[i] == this){
			issubs = true;
			break;
		}
	}
	if(!issubs){
		customers.push(p);
	}
	return this;
}
/*订阅者接收信息的方式*/
Customer.prototype.receive = function(data){
	console.log(this.name +"receive" +data.info);
}
/*使用方式*/
/*定义报纸*/
var paperA = new Paper();
var paperB = new Paper();

/*定义订阅者*/
var c1 = new Customer({name: "John"});
var c2 = new Customer({name:'Jack'});
var c3 = new Customer({name: 'Ann'});

/*订阅报纸*/

c1.subscribe(paperA);
c2.subscribe(paperA);
c2.subscribe(paperB);
c3.subscribe(paperB);

/*报纸发送信息*/
paperA.sendPaper({info: "this is a good day!"});
paperB.sendPaper({info: "welcome to this new world!"});
