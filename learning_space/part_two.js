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

//第六章    代理模式
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

//第七章    迭代器模式
let each = function(arr, fn) {
	let len = arr.length;
	let i = -1;
	while (++i < len) {
		fn.call(arr[i], arr[i], i);
	}
};
each([1, 2, 3, 4], function(item, i) {
	console.log(item, i);
});

//内部迭代器
// let compare = function(arr1,arr2){
// 	if(arr1.length !== arr2.length){
// 		throw new Error('arr1和arr2不相等')
// 	}
// 	each(arr1,function(item,i){
// 		if(item!==arr2[i]){
// 			throw new Error(`arr1和arr2不相等`)
// 		}
// 	})
// 	console.log('arr1和arr2相等')
// }
// compare([1,2,3],[1,2,4])

//外部迭代器
var Iterator = function(obj) {
	let curr_index = 0;
	let next = function() {
		return ++curr_index;
	};
	let isDone = function() {
		return curr_index >= obj.length;
	};

	let getCurrItem = function() {
		return obj[curr_index];
	};

	return {
		next: next,
		isDone: isDone,
		getCurrItem: getCurrItem
	};
};

let compare = function(iterator1, iterator2) {
	while (!iterator1.isDone() && !iterator2.isDone()) {
		if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
			return console.warn("iterator1 和 iterator2 不相等");
		}
		iterator1.next();
		iterator2.next();
	}
	console.log("iterator1 和 iterator2 相等");
};

let iterator1 = Iterator([1, 2, 3]);
let iterator2 = Iterator([1, 2, 4]);
compare(iterator1, iterator2);
