//单例模式
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
