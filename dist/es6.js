var arr = [2, 5, 65, 88, 99];
var iterator = function iterator() {
	var i = 0;
	var self = this;
	return {
		next: function next() {
			return { value: i++, done: i > self.length };
		}
	};
};
Array.prototype[Symbol.iterator] = iterator;
console.log([].concat(arr));
