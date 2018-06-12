function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

//单例模式
var __instance = (function() {
	var instance = null;
	return function(new_value) {
		if (new_value) {
			instance = new_value;
		}
		return instance;
	};
})();

var Singleton = function Singleton(name) {
	_classCallCheck(this, Singleton);

	this.name = name;
	if (__instance()) {
		return __instance();
	}
	return __instance(this);
};
//   single
//   getSingle() {
//     if (!this.single) {
//       this.single = new Singleton()
//     }
//     return this.single
//   }

var a = new Singleton("111");
var b = new Singleton("222");
console.log(a === b);
