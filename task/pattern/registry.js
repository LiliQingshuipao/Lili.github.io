/*
	内容：注册树模式
	作者：黎蕾
*/

/*注册树在程序中提供对象的存储或管理*/

/*注册树对象 变量有需要管理的对象的数组*/
var Registry = function(){
	var store = [];
}
/*向注册树添加对象*/
Registry.prototype.instance = function(o){
	var store = this.store;
	var isEx = false;
	for(var i in store){
		if(o.key == this.key){
			isEx = true;
		}
	}
	if(!isEx){
		store.push(o);
	}
	return this;
}
/*向注册树获取对象*/
Registry.prototype.get(key){
	var store = this.store;
	for(var i in store){
		if(this.key == key){
			return this;
			break;
		}
	}
	return false;
}
/*向注册树修改指定对象*/
Registry.prototype.set(key, value){
	var store = this.store;
	for(var i in store){
		if(this.key == key){
			this.value = value;
		}
	}
}