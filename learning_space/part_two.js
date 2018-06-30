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

class Singleton {
	constructor(props) {
		this.name = props;
	}
	static getInstance(props) {
		if (!Singleton.instance) {
			Singleton.instance = new Singleton(props);
		}
		return Singleton.instance;
	}
}
let a = Singleton.getInstance("111");
let b = Singleton.getInstance("222");
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
let strategies = {
	S: function(salary) {
		return salary * 4;
	},
	A: function(salary) {
		return salary * 3;
	},
	B: function(salary) {
		return salary * 2;
	}
};
let calculateBonus = function(level, salary) {
	return strategies[level](salary);
};
console.log(calculateBonus("S", 20000)); // 输出：80000
console.log(calculateBonus("A", 10000)); // 输出：30000

//代理模式
let mult = function() {
	let a = 1;
	for (let i = 0, len = arguments.length; i < len; ++i) {
		a *= arguments[i];
	}
	return a;
};

let cacheProxy = function(fn) {
	let cache = {};
	return function() {
		let arr = Array.prototype.slice(arguments);
		if (cache.hasOwnProperty(arr)) {
			return cache[arr];
		}
		return fn.apply(this, arguments);
	};
};
console.log(cacheProxy(mult)(1, 2, 3, 4));
