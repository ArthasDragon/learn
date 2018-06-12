//第二章  this   apply   call
//2.1 this    start
//1.对象的方法调用
var obj = {
	a: 1,
	getA: function getA() {
		console.log(this === obj); // 输出：true
		console.log(this.a); // 输出: 1
	}
};
obj.getA();

//2.普通函数调用
function Person() {
	this.name = "john";
	this.getName = function() {
		return this.name;
	};
}
var getName = new Person().getName;
console.log(getName());
console.log(new Person().getName());

//3.构造器调用
function MyPerson1() {
	this.name = "person";
	return "haha";
}
function MyPerson2() {
	this.name = "person";
	return {
		name: "haha"
	};
}
console.log(new MyPerson1().name);
console.log(new MyPerson2().name);

//4.  Function.prototype.call 或 Function.prototype.apply 调用
var myObj = {
	name: "myobj",
	getName: function getName() {
		console.log(this.name);
	}
};
var haha = { name: "hehe" };
myObj.getName.call(haha);

//this    end

//2.2  call  apply   bind
Function.prototype.bind = function() {
	//bind   js实现
	var self = this;
	var context = [].shift.call(arguments);
	var args = [].slice.call(arguments);
	return function() {
		return self.apply(context, [].concat.call(args, [].slice.call[arguments]));
	};
};

//第三章   闭包和高阶函数
//3.1  闭包
//变量的搜索由内而外

//作用1   封装变量
var mult = (function() {
	var cache = {};
	return function() {
		var args = [].join.call(arguments, ",");
		if (cache[args]) {
			return cache[args];
		}
		var a = 1;
		for (var i = 1, l = arguments.length; i < l; ++i) {
			a = a * arguments[i];
		}
		return (cache[args] = a);
	};
})();

//作用2  延续局部变量寿命

//3.2   高阶函数
// 高阶函数是指至少满足下列条件之一的函数。
//   函数可以作为参数被传递；
//   函数可以作为返回值输出。

//函数作为参数传递  回调函数、Array.prototype.sort

//函数作为返回值输出   判断数据类型、单例模式、高阶函数

//柯里化
var currying = function currying(fn) {
	var args = [];
	return function() {
		if (arguments.length === 0) {
			return fn.apply(this, args);
		} else {
			[].push.apply(args, arguments);
			return arguments.callee;
		}
	};
};

//uncurrying
Function.prototype.uncurrying = function() {
	var self = this;
	return function() {
		var obj = Array.prototype.shift.call(arguments);
		return self.apply(obj, arguments);
	};
};

//函数节流
var throttle = function throttle(fn, interval) {
	var first_time = true;
	var timer;
	return function() {
		var self = this;
		var args = arguments;
		if (first_time) {
			fn.apply(this, arguments);
			return (first_time = false);
		}
		if (timer) {
			return false;
		}
		setTimeout(function() {
			clearTimeout(timer);
			timer = null;
			fn.apply(self, args);
		}, interval || 500);
	};
};

//分时函数
var timeChunk = function timeChunk(arr, fn, count) {
	var timer;
	var doCircle = function doCircle() {
		for (var i = 0; i < Math.min(count || 1, arr.length); ++i) {
			fn(arr.shift());
		}
	};
	return function() {
		timer = setInterval(function() {
			if (arr.length === 0) {
				return clearInterval(timer);
			}
			doCircle();
		}, 200);
	};
};

//惰性加载函数
var _addEvent = function addEvent(elem, type, handler) {
	if (window.addEventListener) {
		_addEvent = function addEvent(elem, type, handler) {
			elem.addEventListener(type, handler, false);
		};
	} else if (window.attachEvent) {
		_addEvent = function addEvent(elem, type, handler) {
			elem.attachEvent("on" + type, handler);
		};
	}
	_addEvent(elem, type, handler);
};
