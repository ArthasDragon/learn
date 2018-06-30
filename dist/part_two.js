var _createClass = (function() {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);
		if (staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
})();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

//设计模式

//第四章   单例模式
// let __instance = (function() {
// 	let instance = null;
// 	return function(new_value) {
// 		if (new_value) {
// 			instance = new_value;
// 		}
// 		return instance;
// 	};
// })();
// class Singleton {
// 	constructor(name) {
// 		this.name = name;
// 		if (__instance()) {
// 			return __instance();
// 		}
// 		return __instance(this);
// 	}
// }
// let a = new Singleton("111");
// let b = new Singleton("222");
// console.log(a === b);

var Singleton = (function() {
	function Singleton(props) {
		_classCallCheck(this, Singleton);

		this.name = props;
	}

	_createClass(Singleton, null, [
		{
			key: "getInstance",
			value: function getInstance(props) {
				if (!Singleton.instance) {
					Singleton.instance = new Singleton(props);
				}
				return Singleton.instance;
			}
		}
	]);

	return Singleton;
})();

var a = Singleton.getInstance("111");
var b = Singleton.getInstance("222");
console.log(a === b);

//不用于创建对象的单例
// const getSingle = function(fn) {
//   let result = null
//   return function() {
//     return result || (result = fn.apply(this, arguments))
//   }
// }
// let bindEvent = getSingle(function() {
//   document.getElementById('div1').onclick = function() {
//     alert('click')
//   }
//   return true
// })
// let render = function() {
//   console.log('开始渲染列表')
//   bindEvent()
// }
// render()
// render()
// render()

// 第五章   策略模式
var strategies = {
	S: function S(salary) {
		return salary * 4;
	},
	A: function A(salary) {
		return salary * 3;
	},
	B: function B(salary) {
		return salary * 2;
	}
};
var calculateBonus = function calculateBonus(level, salary) {
	return strategies[level](salary);
};
console.log(calculateBonus("S", 20000)); // 输出：80000
console.log(calculateBonus("A", 10000)); // 输出：30000

//代理模式
var mult = function mult() {
	var a = 1;
	for (var i = 0, len = arguments.length; i < len; ++i) {
		a *= arguments[i];
	}
	return a;
};

var cacheProxy = function cacheProxy(fn) {
	var cache = {};
	return function() {
		var arr = Array.prototype.slice(arguments);
		if (cache.hasOwnProperty(arr)) {
			return cache[arr];
		}
		return fn.apply(this, arguments);
	};
};
